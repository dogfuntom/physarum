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

    id = rnd(id + floor(id + .8));
    // uv = fract(uv) - .5;

    vec2 uvI = uv;

    uv = uv * 2. - 1.;
    // uv.y+=;
    float sc = 1.;//mix(.63,1.,min(1.,abs(uv.x)));
    uv.y = mix(uv.y, (uv.y * sc - min(0., abs(uv.x) * 1.25 - .37)), step(0., uv.y));
    uv = abs(uv);
    if(uv.y < uv.x)
        uv.xy = uv.yx;
    uv.x /= uv.y;
    float M = smoothstep(.8, 1.2, uv.y * 2.);
    uv.y = fract(uv.y * 2.);

    // outColor.rg = uv * M;
    // outColor.b = M;
    // outColor.a += 1.;

    vec2 size = vec2(1);
    vec2 uvTile = vec2(0);
    float t;

    for(int i = 0; i < 6; i++) {
        float N = 2. + floor(3. * rnd(id + .2));
        int dir = (rnd(id + .4) < params[1]) ? 0 : 1;
        if(i == 0)
            dir = 0;
        // int dir = i % 2;//(rnd(id + .4) < .5) ? 0 : 1;
        if(size[dir] / N < .01)
            break;

        t = u_time * (rnd(id) - .5) * .5;
        float fl = floor(fract(uv[dir] + t) * N);
        id = rnd(id + fl);
        uv[dir] = fract(fract(uv[dir] + t) * N);
        uvTile[dir] += fl / N * size[dir];
        size[dir] /= N;

        if(i > 1 && rnd(id + .7) < params[2])
            break;
    }
    uvTile += size / 2.;

    int i1 = int(pow(rnd(params[0] + id), 1.) * paletteN);
    int i2 = (i1 + 1 + int(pow(rnd(params[0] + id + .1), 1.) * (paletteN - 2.))) % int(paletteN);

    vec4 c1 = palette[i1];
    vec4 c2 = palette[i2];

    int dir = (rnd(id + .4) < .5) ? 0 : 1;
    float sand = .03 * (rnd(floor(uv[1 - dir] * 1000. * size[1 - dir])) * 2. - 1.);
    outColor = mix(c1, c2, uv[dir] + sand);
    outColor = mix(outColor, vec4(1), pow(fract(t / (.3 + params[3]) + id + fract(uv[int(floor(rnd(id + .5) - params[3] + 1.))] * ceil(4. * id))), 4.));
    outColor = mix(outColor, vec4(1), smoothstep(.8, .0, uvTile.y));
    outColor *= step(0.1, M * smoothstep(0., 1., fract(uvTile.y * floor(1. + 2. * params[0]) * .5 + params[2] + rnd(id) * params[3] + uv.y * .2 - t * 4. * (id - .5))));
    // outColor *= id * .5 + .5;
    // if() uv.xy=uv.yx;
    outColor.a = 1.;
}