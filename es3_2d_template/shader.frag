#version 300 es
precision mediump float;
uniform sampler2D u_texture;
out vec4 outColor;

#define paletteN 5.

uniform float tick;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec4 palette[5];
uniform vec4 viewbox;
uniform float params[5];

// #pragma glslify: hsv = require(glsl-hsv2rgb) 
// #pragma glslify: noise= require(glsl-noise/simplex/4d) 
#pragma glslify: rot = require('../modules/math/rotate2D.glsl') 
#pragma glslify: random = require(glsl-random) 
#define rnd(x) random(vec2(x))
#define PI 3.14159265
vec2 uv;

int tex = 0;
float sdf(vec3 p, float id) {
    vec3 pw = p;
    pw.xy = abs(pw.xy);
    if(pw.x > pw.y)
        pw.xy = pw.yx;
    float walls = -pw.y + .5;

    float s = 1.;
    for(float i = 0.; i < 8.; i++) {
        p *= 2.3;
        s *= 2.3;
        p = abs(p);
        p -= vec3(.5);
        p.xz *= rot(id * 99. + u_time);
        p.yz *= rot(1. - id * 99. + u_time);
    }
    float sp = (length(p) - .5) / s;

    if(sp < walls) {
        return sp;
    } else {
        return walls;
    }
}

#define f(x) (.5 + .3 * sin(x*(floor(id*3.)+3.+id*99.+params[0]*100.)*.001))

void main() {
    uv = (gl_FragCoord.xy * 2. - u_resolution) / u_resolution.y;
    uv = uv * .5 + .5;

    uv *= viewbox.zw;
    uv += viewbox.xy;
    uv = uv * 2. - 1.;

    float id = params[0];
    float idInit = id;

    uv = uv * .5 + .5;

    // id = rnd(id + floor(id + .8)) * .8 + .1;
    id = 1.;
    float split = f(u_time);
    // uv = fract(uv) - .5;

    vec2 uvInit = uv;

    vec2 size = vec2(1);

    for(int i = 0; i < 4; i++) {
        int dir = i % 2;//(rnd(id + .4) < .5) ? 0 : 1;
        // if(min(size[dir] * id, size[dir] * (1. - id)) < .01)
        //     continue;

        float splitP = split;
        id = mix(rnd(id + .1), rnd(id + .2), step(splitP, uv[dir]));
        split = mix(f(split * 8. + id * 99.), 1. - f(split * 8. - id * 99.), step(splitP, uv[dir]));
        size[dir] *= mix(splitP, 1. - splitP, step(splitP, uv[dir]));
        uv[dir] = mix(uv[dir] / splitP, (uv[dir] - splitP) / (1. - splitP), step(splitP, uv[dir]));

        // if(rnd(id + .7) < params[2] * .3)
        //     break;
    }
    // uvTile += size / 2.;

    // int dir = (rnd(id + .4) < .5) ? 0 : 1;
    // float sand = .03*(rnd(floor(uv[1-dir]*1000.*size[1-dir]))*2.-1.);
    // outColor = mix(c1, c2, uv[dir] + sand) * step(0.5,smoothstep(0.,1.,fract(length(uvTile-.5)+rnd(id)*.2+uv.x*.2+u_time)));
    // // outColor += ;
    // outColor.a = 1.;

    vec2 uvFrame = uv * 2. - 1.;
    uvFrame = abs(uvFrame);
    uvFrame = -uvFrame;
    uvFrame = uvFrame * .5 + .5;
    float smin = sqrt(min(size.x, size.y));
    float frameWidth = 1. / 3. * smin;

    uv = uv * 2. - 1.;
    float i, d, e = 1.;
    vec3 p;
    for(; i++ < 99. && e > .01;) {
        p = normalize(vec3(uv, 1)) * d;
        p.z -= 1.;//+sin(u_time+id*99.);
        d += e = sdf(p, id);
    }

    int i1 = int(pow(rnd(params[0] + id), 1.) * paletteN);
    int i2 = (i1 + 1 + int(pow(rnd(params[0] + id + .1), 1.) * (paletteN - 2.))) % int(paletteN);

    vec4 c1 = palette[i1];
    vec4 c2 = palette[i2];

    outColor += mix(c1, c2, pow(i / 20., 1.));

    // // float frameWidth = 1. / 8.;
    // float frame = min(uvFrame.x * size.x / frameWidth, uvFrame.y * size.y / frameWidth);
    // frame = floor(frame / frameWidth) * frameWidth;
    // // frame = pow(frame, .3);
    // // frame -= .5 * frameWidth;

    // float wave = uv.y * 2. - 1. + sin(uv.x * 8. * (rnd(id-.1)*.5+.5) + u_time * 4. * (rnd(id + .1) - .5) + 99. * id) * .5;
    // wave = abs(wave);

    // // float depth;
    // float shade;
    // if(frame < wave) {
    //     // id = rnd(id + frame);
    //     // shade = pow(frame * 2., .5);
    //     // outColor += shade;

    //     // vec4 waveCol = mix(c1, c2, step(.5,rnd(id)));
    //     // vec4 frameCol = mix(c1, c2, step(.5,rnd(id)));

    //     outColor = mix(c1, c2, frame);

    // } else {
    //     // id = rnd(id + wave);

    //     float wid = floor(wave / frameWidth) * frameWidth;
    //     float wfr = fract(wave / frameWidth);

    //     int i1 = int(pow(rnd(params[0] + id + wid), 1.) * paletteN);
    //     int i2 = (i1 + 1 + int(pow(rnd(params[0] + id + wid + .1), 1.) * (paletteN - 2.))) % int(paletteN);

    //     vec4 c1 = palette[i1];
    //     vec4 c2 = palette[i2];

    //     // vec4 waveCol = mix(c1, c2, step(.5,rnd(id)));
    //     // vec4 frameCol = mix(c1, c2, step(.5,rnd(id)));

    //     shade =  1. / max(1., wave*4.);
    //     outColor = mix(c1, c2, wfr);// * shade;

    //     // outColor += 1.-wave;
    // }

    // outColor *= step(0., frame);

    // outColor.b = 1.;
    // outColor *= wave;
    outColor.a = 1.;
}