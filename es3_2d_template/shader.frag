#version 300 es
precision mediump float;
uniform sampler2D u_texture;
out vec4 outColor;

/*
TODO

Добавить ХЕН-обвес. Можно скопировать из п5:
- клик для новой работы
- переключение по таймеру
*/

uniform float tick;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec4 palette[5];

uniform float params[4];

// #pragma glslify: hsv = require(glsl-hsv2rgb) 
// #pragma glslify: noise= require(glsl-noise/simplex/4d) 
#pragma glslify: rot = require('../modules/math/rotate2D.glsl') 
#pragma glslify: random = require(glsl-random) 
#define rnd(x) random(vec2(x))
#define MAX_STEPS 100
#define MAX_DIST 100.
#define EPSILON 1e-4

void main() {
    vec2 uv = (gl_FragCoord.xy * 2. - u_resolution) / min(u_resolution.x, u_resolution.y);
    vec2 uvInit = uv;
    if(abs(uv.x) > 1. || abs(uv.y) > 1.)
        discard;

    float id = 0.;
    float k = 1.;
    uv = abs(uv);
    for(float i = 0.; i++ < 5.;) {
        // stop recursion
        if(i < 1. + params[0] * 2. || rnd(id + .5) < .2 + params[1] * .4)
            id += k * (step(1. / 3., uv.x) + step(1. / 3., uv.y));
        //add waves
        if(i == 1. || i < params[2] * 5. || rnd(id + .5) < .2 + params[3] * .4)
            // id += floor((uv.x) - u_time);
            id += floor(length(uv) * 1. - u_time * (rnd(id+.8) - .5) + id * 123.321 + i * 12.321) / 8.;
        k /= 3.;
        uv *= 3.;
        uv = mod(uv + 1., 2.) - 1.;
        uv = abs(uv);
    }
    // id = floor(id * 10. - u_time - length(uvInit * uvInit));
    vec4 c1 = palette[int(rnd(id) * 5.)];
    vec4 c2 = palette[int(rnd(id + .1) * 5.) % 5];
    float sand = rnd(length(floor((uvInit - 1.) * 243.) / 243.) + .0 * fract(u_time));
    // outColor = mix(c1, c2, sand+fract(-u_time+((atan(uvInit.y,uvInit.x)/6.283+.5)/1. +length(uvInit))*floor((rnd(id)-.5)*10.) + id*999.));
    // outColor = mix(c1, c2, sand+fract(-u_time+((atan(uvInit.y,uvInit.x)/6.283+.5)/1. +length(uvInit))*floor((rnd(id)-.5)*10.) + id*999.));
    outColor = mix(c1, c2, .5 + .5 * cos(length(uvInit) * 10. + u_time * (rnd(id) - .5)) + sand * .2);
    outColor.a = 1.;
}
