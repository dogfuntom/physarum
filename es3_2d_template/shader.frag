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
    float id;
    float k = 1.;
    for(float i = 0.; i++ < 4.;) {
        uv = abs(uv);
        id += k * (step(1. / 3., uv.x) + step(1. / 3., uv.y));
        k/=3.;
        uv*=3.;
        uv=fract(uv);
    }
    outColor = vec4(rnd(id + .1), rnd(id + .2), rnd(id + .3), 1);
    outColor.a = 1.;
}
