#version 300 es
precision mediump float;
uniform sampler2D u_texture;
out vec4 outColor;

uniform float tick;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec4 palette[5];
uniform vec4 viewbox;
uniform float segments[576];
uniform float N;

uniform float params[4];

// #pragma glslify: hsv = require(glsl-hsv2rgb) 
// #pragma glslify: noise= require(glsl-noise/simplex/4d) 
#pragma glslify: rot = require('../modules/math/rotate2D.glsl') 
#pragma glslify: random = require(glsl-random) 
#define rnd(x) random(vec2(x))
#define PI 3.14159265

vec2 uv;

float getId(vec2 p) {
    return segments[int(floor(p.x * N + .00001) + N * floor(p.y * N))];
}

void main() {
    uv = (gl_FragCoord.xy * 2. - u_resolution) / u_resolution.y;
    uv = uv * .5 + .5;
    uv *= viewbox.zw;
    uv += viewbox.xy;
    uv = uv * 2. - 1.;
    uv = uv * .5 + .5;

    float id = 0.;

    id = getId(uv);
    float shade = 1.;
    if(abs(id - getId(uv - vec2(1. / N, 0.)))>1e-6)
        shade *= step(params[0] * .8 + .1, fract(uv.x * N));

    uv.y *= rnd(id + .3);
    uv.y += .01 * sin(uv.x * N / (rnd(id + .2) * .9 + .1) + u_time * .01 + id * 99.) + u_time * (rnd(id + .1) - .5) * .02 / rnd(id + .4);
    float col = smoothstep(0., 1., fract(uv.y * id + uv.y * N / (id * .5 + .5)));

    vec4 c1 = palette[int(rnd(id) * 5.)];
    vec4 c2 = palette[int(rnd(id + .1) * 5.) % 5];
    outColor = mix(c1, c2, col);
    outColor *= shade;
    outColor.a = 1.;
}