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
uniform float params[5];

// #pragma glslify: hsv = require(glsl-hsv2rgb) 
// #pragma glslify: noise= require(glsl-noise/simplex/4d) 
#pragma glslify: rot = require('../modules/math/rotate2D.glsl') 
#pragma glslify: random = require(glsl-random) 
#define rnd(x) random(vec2(x))
#define PI 3.14159265
vec2 uv;

vec2 cicada(float x) {
    float left, right;
    float prime1 = 5., prime2 = 7., prime3 = 3.; // var
    float id = rnd(floor(x / prime1) + floor(x / prime2) + floor(x / prime3) + .1);
    left = max(floor(x / prime1) * prime1, max(floor(x / prime2) * prime2, floor(x / prime3) * prime3));
    right = min(ceil(x / prime1) * prime1, min(ceil(x / prime2) * prime2, ceil(x / prime3) * prime3));
    x = (x - left) / (right - left);
    return vec2(id, x);
}

void main() {
    uv = (gl_FragCoord.xy * 2. - u_resolution) / u_resolution.y;
    uv = uv * .5 + .5;

    uv *= viewbox.zw;
    uv += viewbox.xy;
    uv = uv * 2. - 1.;

    float id = params[0];
    float idInit = id;

    uv = uv * .5 + .5;

    id = rnd(id + floor(id + .8));
    uv = fract(uv) - .5;

    vec2 uvInit = uv;
    uv = vec2(fract(atan(uv.y, uv.x) / 2. / PI + rnd(id + .6)), length(uv));

    vec2 size = vec2(1);
    for(int i = 0; i < 4; i++) {
        float N = 2. + floor(10. * rnd(id + .2));
        int dir = (rnd(id + .4) < .5) ? 0 : 1;
        if(size[dir]/N<.01) break;

        float t = u_time * (rnd(id) - .5) * .1;
        id = rnd(id + floor(fract(uv[dir] + t) * N));
        uv[dir] = fract(fract(uv[dir] + t) * N);
        size[dir]/=N;

        if(rnd(id + .7) < params[2] * .5)
            break;
    }
    vec2 uv1 = uv;
    float id1 = id;
    vec2 size1 = size;
    id = idInit + .1;

    uv = uvInit;
    size=vec2(1);
    for(int i = 0; i < 4; i++) {
        float N = 2. + floor(10. * rnd(id + .2));
        int dir = (rnd(id + .4) < .5) ? 0 : 1;
        if(size[dir]/N<.01) break;

        float t = u_time * (rnd(id) - .5) * .1;
        id = rnd(id + floor(fract(uv[dir] + t) * N));
        uv[dir] = fract(fract(uv[dir] + t) * N);
        size[dir]/=N;

        uv[1 - dir] = fract(uv[1 - dir] + id);
        if(rnd(id + .7) < params[1] * .5)
            break;
    }

    // if(rnd(id + id1) > sin(length(uvInit)*8.+u_time)*.5+.5) {
    //     id = id1;
    //     uv = uv1;
    //     size = size1;
    // }

    int i1 = int(pow(rnd(params[0] + id), 1.) * paletteN);
    int i2 = (i1 + 1 + int(pow(rnd(params[0] + id + .1), 1.) * (paletteN - 2.))) % int(paletteN);

    vec4 c1 = palette[i1];
    vec4 c2 = palette[i2];



    int dir = (rnd(id + .4) < .5) ? 0 : 1;
    float sand = .03*(rnd(floor(uv[1-dir]*1000.*size[1-dir]))*2.-1.);
    outColor = mix(c1, c2, uv[dir] + sand) * id;
    outColor.a = 1.;
}