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

vec3 hsv(float h, float s, float v) {
    vec4 t = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(vec3(h) + t.xyz) * 6.0 - vec3(t.w));
    return v * mix(vec3(t.x), clamp(p - vec3(t.x), 0.0, 1.0), s);
}

vec2 uv;

float isOAboveL(float id_l, float id_o) {
    return step(rnd(params[3] * .6 + .2), fract(rnd(id_l * .001 + id_o) + .1 * params[1] * sin(u_time * params[2] - length(uv))));
}

void main() {
    uv = (gl_FragCoord.xy * 2. - u_resolution) / u_resolution.y;
    uv = uv * .5 + .5;
    uv *= viewbox.zw;
    uv += viewbox.xy;
    uv = uv * 2. - 1.;

    // outColor += hsv(rnd(id),rnd(id+.1),rnd(id+.2));
    float t = u_time;
    float sandRes = pow(2.,6.+params[3]*2.);
    vec2 uvf = floor(uv * sandRes) / sandRes + vec2(99., 999.);
    t += .5 * rnd(length(uvf) + fract(u_time));

    uv.y+=t*.1;
    uv*=pow(rnd(params[3]),8.)*.5+1.;
    // uv/=dot(uv,uv);
    // // uv.x+=params[2]*(params[0]*2.-1.);
    // uv.y+=params[2]*(params[1]*2.-1.);
    // uv/=dot(uv,uv);
    uv = uv * .5 + .5;
    float id = rnd(length(floor(uv)));
    uv=fract(uv);
    id += segments[int(floor(uv.x * N) + N * floor(uv.y * N))];

    uv.y *= rnd(id + .3);
    uv.y += .01 * sin(uv.x * N / (rnd(id + .2) * .9 + .1) + t * .01 + id * 99.) + t * (rnd(id + .1) - .5) * .02 / rnd(id + .4);
    float col = smoothstep(0., 1., fract(uv.y*id+uv.y * N / (id * .5 + .5)));
    // outColor += col;

    vec4 c1 = palette[int(rnd(id) * 5.)];
    vec4 c2 = palette[int(rnd(id + .1) * 5.) % 5];
    // float sand = rnd(vec2(length(floor((normalize(uv) - 1.) * 243.) / 243.) + .0 * fract(u_time), floor(ang * 1000.) / 1000.));
    outColor = mix(c1, c2, col);
    outColor.a = 1.;

}
