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

    float id = 1.*floor(length(uvInit*uvInit)*1.-u_time)/8.;
    float k = 1.;
    uv = abs(uv);
    for(float i = 0.; i++ < 5.;) {
        if(i<2. || rnd(id) < .7)
        // if(i<3. || rnd(id) < .7)
            id += k * (step(1. / 3., uv.x) + step(1. / 3., uv.y));
        k /= 3.;
        uv *= 3.;
        uv = mod(uv + 1., 2.) - 1.;
        uv = abs(uv);
    }
    id=floor(id*10.-u_time-length(uvInit*uvInit));
    outColor += palette[int(rnd(id)*5.)];
    // outColor += vec4(rnd(id + .1), rnd(id + .2), rnd(id + .3), 1);
    outColor.a = 1.;
}
