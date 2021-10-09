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
    uv = uv * 2. - 1.;
    vec2 uvI = uv;

    if(abs(uv.x) > 1.)
        discard;
    float id = params[0] * 16.;
    float c = 0.;

    for(float i = 0.; i < 8.; i++) {
        float sc = 2.;
        if(i == 0.)
            sc = 1.;
        if(i > 2.) {
            if(rnd(id + i) < .5)
                break;
        }

        uv = uv * .5 + .5;
        // id = rnd(id + c + floor(uv.x * sc) * .01 + floor(uv.y * sc) * .02) * 16.;
        id = rnd(id + c) * 16.;
        uv = fract(uv * sc);
        uv = uv * 2. - 1.;

        vec2 uvS = uv;
        if(id < 1.)
            c = step(.5, fract((uvS.x + uvS.y - u_time) * .2));
        else if(id < 2.)
            c = step(.5 + sin(u_time) * .3, length(uvS));
        else if(id < 3.) {
            uvS *= .35;
            c = step(.5, fract(abs(uvS).x + abs(uvS).y - u_time));
        } else if(id < 4.)
            c = step(.0, sin(uvS.x * 4. - (asin(sin(uvS.y * 2. * PI)) - u_time * 4.) * .2 * 2. * PI));
        else if(id < 5.)
            c = step(.001, length(uvS - clamp(uvS, -.7, .7)));
        else if(id < 6.)
            c = step(.0, sin(uvS.x * 8. - sin((uvS.y - u_time) * 2. * PI) * .2 * 2. * PI));
        else if(id < 7.)
            c = step(1., fract(uvS.x - u_time) * .5 + abs(uvS).y * .5 + .5);
        else if(id < 8.) {
            uvS *= rot(sin(length(uvS) + u_time));
            c = step(.5, fract(length(uvS) * 1. + atan(uvS.y, uvS.x) / 2. / PI - u_time));
        } else if(id < 9.)
            c = 1. - step(-.7, -abs(uvS.x)) * step(-.7, -abs((uvS * rot(PI / 3.)).x)) * step(-.7, -abs((uvS * rot(-PI / 3.)).x));
        else if(id < 10.)
            c = 1. - step(-.4, (uvS.x)) * step(-.4, -((uvS * rot(PI / 3.)).x)) * step(-.4, -((uvS * rot(-PI / 3.)).x));
        else if(id < 11.)
            c = step(.0, fract(uvS.x - u_time)-.5);
        else if(id < 12.) {
            uvS += sin(u_time * vec2(2., 1.) + vec2(0, PI)) * .4;
            c = step(.0, abs(uvS.x)-.25) * step(.0, abs(uvS.y)-.25);
        } else if(id < 13.) {
            uvS *= rot(u_time);
            c = step(.0, length(uvS) + .2 * sin(atan(uvS.y, uvS.x) * 8.)-.7);
        } else if(id < 14.)
            c = step(.0, fract(length(uvS) - u_time)-.5);
        else if(id < 15.) {
            uvS *= rot(u_time);
            c = step(.0, abs(uvS).y - .02 / abs(uvS).x);
        } else if(id < 16.) {
            uvS *= rot(u_time);
            c = step(.0, length(uvS * uvS)-.5);
        }
    }

    int i1 = int(rnd(params[0] + id) * 3.);
    int i2 = (i1 + 1 + int(rnd(params[0] + id + .1) * 1.)) % 3;
    vec4 c1 = palette[i1];
    vec4 c2 = palette[i2];
    float sand = rnd(length(floor((uvI - 1.) * 512.) / 512.) + fract(u_time)) * .2;
    outColor = mix(c1, c2, c);
    outColor.a = 1.;
}