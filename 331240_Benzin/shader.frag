#version 300 es
precision mediump float;
uniform sampler2D u_texture;
out vec4 outColor;

#define paletteN 5.

uniform float tick;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
// uniform vec4 palette[5];
uniform vec4 viewbox;
// uniform float params[5];

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

    for(float i = 1.; i < 50.; i++) {
        float width = rnd(i) * .2 + .8;
        uv -= u_mouse.x * .4 - .2;
        uv.y += smoothstep(-width * .5, width * .5, uv.x) * sin(u_time * .13 + 3. + i) * .5;
        uv += u_mouse.x * .4 - .2;
        uv *= rot(i);
    }

    outColor.rgb = -sin((length(uv) * .5 - u_time*.1 + u_mouse.y + vec3(0, .13, .66) + 10.) * 2. * PI) * vec3(.5, .2, .2) + vec3(.5, .5, .5);
    outColor *= smoothstep(4., 0., pow(length(uv), .7)) * 1.8;
    outColor = clamp(outColor, 0., 1.);
    outColor.a = 1.;
}