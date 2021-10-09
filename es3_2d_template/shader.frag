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
uniform bool dartTheme;
uniform float params[5];

// #pragma glslify: hsv = require(glsl-hsv2rgb) 
// #pragma glslify: snoise3D= require(./node_modules/glsl-noise/simplex/3d.glsl) 
#pragma glslify: snoise2D= require(./node_modules/glsl-noise/simplex/2d.glsl) 
#pragma glslify: rot = require('../modules/math/rotate2D.glsl') 
#pragma glslify: random = require(glsl-random) 
#define rnd(x) random(vec2(x+.1))
#define PI 3.14159265
vec2 uv;

#define col(c) cos((c*fr + off) * 2. * PI) * mul + add

void main() {
    uv = (gl_FragCoord.xy * 2. - u_resolution) / min(u_resolution.y, u_resolution.x);
    uv = uv * .5 + .5;
    uv *= viewbox.zw;
    uv += viewbox.xy;
    vec2 uvI = uv * 2. - 1.;

    if(abs(uv.x) > 1.)
        discard;
    float id = floor(uv.x * 4.) / 4.;
    id += floor(uv.y * 4.) / 4. / 4.;
    uv = fract(uv * 4.) * 2. - 1.;
    id *= 16.;
    float c;

    if(id < 1.)
        c = step(.5, fract((uv.x + uv.y - u_time) * .2));
    else if(id < 2.)
        c = step(.5 + sin(u_time) * .3, length(uv));
    else if(id < 3.) {
        uv *= .35;
        c = step(.5, fract(abs(uv).x + abs(uv).y - u_time));
    } else if(id < 4.)
        c = step(.0, sin(uv.x * 4. - (asin(sin(uv.y * 2. * PI)) - u_time * 4.) * .2 * 2. * PI));
    else if(id < 5.)
        c = step(.001, length(uv - clamp(uv, -.7, .7)));
    else if(id < 6.)
        c = step(.0, sin(uv.x * 8. - sin((uv.y - u_time) * 2. * PI) * .2 * 2. * PI));
    else if(id < 7.)
        c = step(1., fract(uv.x - u_time) * .5 + abs(uv).y * .5 + .5);
    else if(id < 8.) {
        uv *= rot(sin(length(uv) + u_time));
        c = step(.5, fract(length(uv) * 1. + atan(uv.y, uv.x) / 2. / PI - u_time));
    } else if(id < 9.)
        c = 1. - step(-.7, -abs(uv.x)) * step(-.7, -abs((uv * rot(PI / 3.)).x)) * step(-.7, -abs((uv * rot(-PI / 3.)).x));
    else if(id < 10.)
        c = 1. - step(-.4, (uv.x)) * step(-.4, -((uv * rot(PI / 3.)).x)) * step(-.4, -((uv * rot(-PI / 3.)).x));
    else if(id < 11.)
        c = step(.5, fract(uv.x - u_time));
    else if(id < 12.) {
        uv += sin(u_time * vec2(2., 1.) + vec2(0, PI)) * .4;
        c = step(.25, abs(uv.x)) * step(.25, abs(uv.y));
    } else if(id < 13.) {
        uv *= rot(u_time);
        c = step(.7, length(uv) + .2 * sin(atan(uv.y, uv.x) * 8.));
    } else if(id < 14.)
        c = step(.5, fract(length(uv) - u_time));
    else if(id < 15.) {
        uv *= rot(u_time);
        c = step(.0, abs(uv).y - .02 / abs(uv).x);
    } else if(id < 16.) {
        uv *= rot(u_time);
        c = step(.5, length(uv * uv));
    } else
        c = id / 16.;

    int i1 = int(rnd(params[0] + id) * 3.);
    int i2 = (i1 + 1 + int(rnd(params[0] + id + .1) * 1.)) % 3;
    vec4 c1 = palette[i1];
    vec4 c2 = palette[i2];
    float sand = rnd(length(floor((uvI - 1.) * 512.) / 512.) + fract(u_time)) * .2;
    outColor = mix(c1, c2, c);
    outColor.a = 1.;
}