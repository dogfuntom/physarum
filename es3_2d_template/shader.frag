#version 300 es
precision mediump float;
uniform sampler2D u_texture;
out vec4 outColor;

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
#define PI 3.14159265

vec3 hsv(float h, float s, float v) {
    vec4 t = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(vec3(h) + t.xyz) * 6.0 - vec3(t.w));
    return v * mix(vec3(t.x), clamp(p - vec3(t.x), 0.0, 1.0), s);
}

void main() {
    vec2 uv = (gl_FragCoord.xy * 2. - u_resolution) / min(u_resolution.x, u_resolution.y);
    vec2 uvInit = uv;

    float id;
    float ang = atan(uv.y, uv.x) / PI / 2. + .5;
    
    float id_o = rnd(floor(length(uv) * 50.) / 50.);
    float id_l = rnd(floor(ang * 200.) / 200.);
    id = mix(id_l, id_o, step(sin(length(uv*4.)-u_time)*.5+.5, rnd(id_o+id_l)));

    outColor.rgb = hsv(id,length(uv),1.);
    outColor.a = 1.;
}
