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
float sdf(vec3 p, float id, vec2 size) {
    vec3 pw = p;
    // pw.y += size.y * .3 * sin(u_time + pw.z);
    // pw.x += size.x * .3 * sin(u_time + pw.z);
    // pw.xy *= rot(pw.z * .1 * sin(u_time + id * 99.));
    // pw.xy*=rot(u_mouse.x*2.-1.+  pw.z*.1*sin(u_time+id*99.));
    pw.xy = abs(pw.xy);
    pw.xy -= size;
    if(pw.x < pw.y)
        pw.xy = pw.yx;
    float walls = -pw.x;

    // p.z -= min(size.x, size.y)*8.+1.;//sin(u_time + id * 99.) * .5 + .5 - .85;
    float s = 1.;
    float sp;
    // for(float i = 0.; i < 7.; i++) {
    //     // sp = (length(p) - .5) / s;
    //     // if(i > size * 10.)
    //     //     break;
    //     p *= 2.3;
    //     s *= 2.3;
    //     p = abs(p);
    //     p -= vec3(.5);
    //     p.yz *= rot(1. - id * 99. + u_time + i * 2.);
    //     p.xz *= rot(id * 99. + u_time + i * .1);
    // }
    sp = (length(p) - .5) / s;
    // sp = mix(sp, (length(p) - .5) / s, fract(size * 10.));

    if(sp < walls) {
        tex = 1;
        return sp;
    } else {
    tex = 0;
    return walls;
    }
}

#define f(x) (.5 + .3 * sin(x*(floor(id*3.)+3.+id*99.)*.001+params[0]*100.))

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
    vec2 uvTile = vec2(0);

    for(int i = 0; i < 12; i++) {
        int dir = i % 2;
        // int dir = (rnd(id + .4) < .5) ? 0 : 1;
        float splitP = split;
        float condition = step(splitP, uv[dir]);
        id = mix(rnd(id + .1), rnd(id + .2), condition);
        split = mix(f(splitP * 8. + id * 99.), 1. - f(splitP * 8. - id * 99.), condition);
        uvTile[dir] += mix(0., size[dir] * splitP, condition);
        size[dir] *= mix(splitP, 1. - splitP, condition);
        uv[dir] = mix(uv[dir] / splitP, (uv[dir] - splitP) / (1. - splitP), condition);
    }
    uvTile += size / 2.;
    uvTile = uvTile * 2. - 1.;

    uv = uv * 2. - 1.;
    uv *= size / (size.x + size.y) * 2.;
    // uv *= size/min(size.x,size.y);
    float i, d, e = 1.;
    vec3 p;
    for(; i++ < 199. && e > .0001;) {
        p = normalize(vec3(uv, 1. + .0 * rnd(uv))) * d;
        p.z -= 1.;
        d += e = sdf(p, id, size);
    }

    int i1 = int(pow(rnd(params[0] + id), 1.) * paletteN);
    int i2 = (i1 + 1 + int(pow(rnd(params[0] + id + .1), 1.) * (paletteN - 2.))) % int(paletteN);

    vec4 c1 = palette[i1];
    vec4 c2 = palette[i2];

    float isWhite = 1. - smoothstep(.6, .9, length(uvTile));
    // float isWhite = floor(id * 2.);
    // outColor += mix(c1, c2, float(tex));
    outColor = c1;
    // if(tex == 0) {
    if(fract(p.z * 10. + u_time * 2.) < .5)
        outColor = c2;
    // }
    // outColor = c2 * 3. / i;
    // outColor *=sqrt(i/99.);
    outColor = mix(outColor, vec4(isWhite), smoothstep(-.1, .5, d));
    // outColor = vec4(length(uvTile)/sqrt(2.));
    // outColor *= mix(c2 * .8, c1, 3. / i);// * 9. / i;

    // vec2 uvFrame = uv;
    // uvFrame = abs(uvFrame);
    // uvFrame = -uvFrame;
    // uvFrame = uvFrame * .5 + .5;
    // float frame = min(uvFrame.x * size.x, uvFrame.y * size.y);
    // frame = smoothstep(.0, .001, frame);
    // outColor*=frame;

    outColor.a = 1.;
}