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

void main() {
    uv = (gl_FragCoord.xy * 2. - u_resolution) / u_resolution.y;
    uv = uv * .5 + .5;

    uv *= viewbox.zw;
    uv += viewbox.xy;
    uv = uv * 2. - 1.;

    float id = params[0];
    float idInit = id;

    uv = uv * .5 + .5;

    id = rnd(id + floor(id + .8)) * .8 + .1;
    // uv = fract(uv) - .5;

    vec2 uvInit = uv;

    vec2 size = vec2(1);
    vec2 uvTile = vec2(0);

    for(int i = 0; i < 8; i++) {
        int dir = i % 2;//(rnd(id + .4) < .5) ? 0 : 1;
        if(min(size[dir] * id, size[dir] * (1. - id)) < .1)
            continue;

        // float t = 0.;//u_time * (rnd(id) - .5) * .1;
        // float fl = floor(fract(uv[dir] + t) * N);
        // id = rnd(id + fl);
        // uv[dir] = fract(fract(uv[dir] + t) * N);
        // uvTile[dir] += fl/N*size[dir];

        float idP = id;
        id = mix(rnd(idP), rnd(idP + .1), step(idP, uv[dir]));
        size[dir] *= mix(idP, 1. - idP, step(idP, uv[dir]));
        uv[dir] = mix(uv[dir] / idP, (uv[dir] - idP) / (1. - idP), step(idP, uv[dir]));

        // if(rnd(id + .7) < params[2] * .5)
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
    // float smin = sqrt(min(size.x, size.y));
    // float frameWidth = 1. / 3. * smin;
    float frameWidth = 1. / 8.;
    float frame = min(uvFrame.x * size.x / frameWidth, uvFrame.y * size.y / frameWidth);
    frame = floor(frame / frameWidth) * frameWidth;
    // frame = pow(frame, .3);
    // frame -= .5 * frameWidth;

    float wave = uv.y*2.-1. + sin(uv.x*8.*id+u_time*4.*(rnd(id+.1)-.5)+99.*id)*.5;//999.;//floor((uv.y - sin(uv.x * 16. + u_time * 8. * (rnd(id + .1) - .5)) * size.y * .5 + .5) * 8.) / 8.;
    wave = abs(wave);

    // float depth;
    float shade;
    if(frame < wave) {
        // id = rnd(id + frame);
        // shade = pow(frame * 2., .5);
        // outColor += shade;

        int i1 = int(pow(rnd(params[0] + id), 1.) * paletteN);
        int i2 = (i1 + 1 + int(pow(rnd(params[0] + id + .1), 1.) * (paletteN - 2.))) % int(paletteN);

        vec4 c1 = palette[i1];
        vec4 c2 = palette[i2];

        // vec4 waveCol = mix(c1, c2, step(.5,rnd(id)));
        // vec4 frameCol = mix(c1, c2, step(.5,rnd(id)));

        outColor = mix(c1, c2, frame);

    } else {
        // id = rnd(id + wave);

        int i1 = int(pow(rnd(params[0] + id+.1), 1.) * paletteN);
        int i2 = (i1 + 1 + int(pow(rnd(params[0] + id + .2), 1.) * (paletteN - 2.))) % int(paletteN);

        vec4 c1 = palette[i1];
        vec4 c2 = palette[i2];

        // vec4 waveCol = mix(c1, c2, step(.5,rnd(id)));
        // vec4 frameCol = mix(c1, c2, step(.5,rnd(id)));

        outColor = mix(c1, c2, cos(wave*4.)*.5+.5);


        // outColor += 1.-wave;
    }

    // outColor *= step(0., frame);

    // outColor.b = 1.;
    // outColor *= wave;
    outColor.a = 1.;
}