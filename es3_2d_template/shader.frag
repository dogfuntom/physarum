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

    // if(abs(uv.x) > 1.)
    //     discard;
    float id = params[0] * 13.;
    float c = 0.;
    float shadow = 1.;

    for(float i = 0.; i < 8.; i++) {
        float sc = 2.;
        if(i == 0.)
            sc = 1.;
        if(i > 1.) {
            if(rnd(id + i) < .5)
                break;
        }

        uv = uv * .5 + .5;
        // id = rnd(id + c + floor(uv.x * sc) * .01 + floor(uv.y * sc) * .02) * 16.;
        // id = floor(u_mouse.x * 16.);//
        id = rnd(id + floor(c)) * 13.;
        uv = fract(uv * sc);
        uv = uv * 2. - 1.;

        vec2 uvS = uv;
        if(id < 1.)
            c = (fract(uvS.x + uvS.y - u_time) / 2. - u_time);
        else if(id < 2.)
            c = length(uvS * uvS) - u_time;
        else if(id < 3.) {
            uvS *= .35;
            c = abs(uvS).x + abs(uvS).y - u_time;
        } else if(id < 4.)
            // c = sin(uvS.x * 4. - (asin(sin(uvS.y * 2. * PI)) * 4.) * .05 * 2. * PI)*.5 - u_time;
            c = asin(sin((uvS.x - .2 * (asin(sin(uvS.y * 2. * PI)) * 4.) * .05 * 2. * PI - u_time) * 2. * PI)) * .25 - u_time;
        else if(id < 5.)
            c = max(abs(uvS.x), abs(uvS.y)) - u_time;
        else if(id < 6.)
            c = fract(uvS.x - sin(uvS.y * 2. * PI) * .4) - u_time;
        else if(id < 7.)
            c = fract((uvS.x - u_time) * .5 + abs(uvS).y * .5) + .5 - 1. - u_time;
        else if(id < 8.) {
            uvS *= rot(u_time);
            // c = fract(abs(uvS).y - .02 / abs(uvS).x - u_time);
            // c = fract(min(1. / abs(uvS).y, 1. / abs(uvS).x) - u_time);
            c = pow(abs(uv.x * uv.y) / length(uv), .5) * 2. - u_time;
        } else if(id < 9.)
            c = min(min((-abs(uvS.x) + .7), (-abs((uvS * rot(PI / 3.)).x) + .7)), (-abs((uvS * rot(-PI / 3.)).x) + .7)) + u_time;
        else if(id < 10.)
            c = length(uvS) - u_time - .5;
        else if(id < 11.)
            c = uvS.x - u_time;
        else if(id < 12.) {
            // uvS += sin(u_time * vec2(2., 1.) + vec2(0, PI)) * .4;
            uvS = uvS * .5 + .5;
            uvS = pow(uvS, (pow(vec2(2.), sin(u_time*vec2(1,2)+vec2(PI/2.,0)))));
            uvS = uvS * 2. - 1.;
            c = min((abs(uvS.x) - .25), (abs(uvS.y) - .25)) * 2. + u_time;
        } else if(id < 13.) {
            // uvS *= rot(u_time);
            c = length(uvS) + .2 * cos(atan(uvS.y, uvS.x) * 8.) * length(uvS) - .7 - u_time;
        }// else if(id < 14.)
            // c = min(min((uvS.x + .4), (-((uvS * rot(PI / 3.)).x) + .4)), (-((uvS * rot(-PI / 3.)).x) + .4)) + u_time;
        // else if(id < 15.) {
        //     uvS *= rot(sin(length(uvS) + u_time));
        //     c = length(uvS) * 1. + atan(uvS.y, uvS.x) / 2. / PI - u_time;
        // }
        //  else if(id < 16.) {
        //     // uvS *= rot(u_time);
        //     c = length(uvS)-.5 + sin(u_time) * .3;
        // }

        shadow *= pow(fract(c), .4) * 1.2;
    }

    int i1 = int(rnd(params[0] + id) * 3.);
    int i2 = (i1 + 1 + int(rnd(params[0] + id + .1) * 1.)) % 3;
    vec4 c1 = palette[i1];
    vec4 c2 = palette[i2];
    float sand = rnd(length(floor((uvI - 1.) * 512.) / 512.) + fract(u_time));
    outColor = mix(c1, c2, fract(c)+sand) * shadow;
    outColor.a = 1.;
}