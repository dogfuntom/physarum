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
uniform bool dartTheme;
uniform float params[5];

// #pragma glslify: hsv = require(glsl-hsv2rgb) 
// #pragma glslify: noise= require(glsl-noise/simplex/4d) 
// #pragma glslify: rot = require('../modules/math/rotate2D.glsl') 
#pragma glslify: random = require(glsl-random) 
#define rnd(x) random(vec2(x))
#define PI 3.14159265
vec2 uv;

#define f(x) (.5 + .31 * sin(x * PI * 2. * ceil(rnd(id + .5 + 5.) * 3.) + (id + 2. + params[3]) * PI * 2.))

void main() {
    uv = (gl_FragCoord.xy * 2. - u_resolution) / u_resolution.y;
    uv = uv * .5 + .5;
    uv *= viewbox.zw;
    uv += viewbox.xy;
    // uv = uv * 2. - 1.;
    vec2 uvI = uv;

    float shift = rnd(floor(uv.y*1024.)+fract(u_time))-.5;
    uv.x+=pow(shift,4.+params[2]*8.)*sign(shift)*6.*params[2];

    float id = 1.;
    float idS = 0.;
    float idK = 1.;
    float t = u_time * .03 * params[3] + length(u_mouse.x + u_mouse.y) * .1;// - pow(rnd(uv - fract(u_time) + a), 4.) * .01;
    float split = f(t);

    vec2 size = vec2(1);
    vec2 uvTile = vec2(0);

    for(int i = 0; i < 8 + int(5. * params[2]); i++) {
        int dir = 1 - i % 2;
        // if(i == 0)
        //     uv[dir] = mix(uv[dir], uv[dir] * split, u_mouse.x);
        float shift = .01 * t;//u_mouse.x;//.0 * sin(t * 2. * PI + id * 99.);
        // float shift = t * sign(id-.5);
        // uv[dir] = fract(uv[dir] + shift);
        // int dir = (rnd(id + .4) < .5) ? 0 : 1;
        float splitP = split;
        float condition = step(splitP, uv[dir]);
        idS += mix(0., 1., condition) / pow(2., float(i));
        id = mix(rnd(id + .1), rnd(id + .2), condition);
        split = mix(f(splitP * 6. + id * 99.), 1. - f(splitP * 6. - id * 99.), condition);
        uvTile[dir] += mix(0., size[dir] * splitP, condition);
        // uvTile[dir] = fract(uvTile[dir] + mix(0., size[dir] * splitP, condition) + shift * size[dir] * splitP);
        size[dir] *= mix(splitP, 1. - splitP, condition);

        uv[dir] = mix(uv[dir] / splitP, (uv[dir] - splitP) / (1. - splitP), condition);
    }
    uvTile += size / 2.;
    uvTile = uvTile * 2. - 1.;

    float msize = min(size.x, size.y);
    uv = uv * 2. - 1.;
    uv *= size / msize;
    uv = uv * .5 + .5;
    uv = uv * 2. - 1.;

    outColor += smoothstep(.99, .99 - .005 / msize, length(uv));
    vec2 dir = normalize(u_mouse * 2. - 1. - uvTile);
    float holeR = params[1] * 1. + .2;//sin(99.*(id+params[1])+u_time*(id+.5))*.3+1.1;
    // float holeR = params[1]*1.5;//sin(99.*(id+params[1])+u_time*(id+.5))*.3+1.1;
    holeR = mix(holeR, 4., 1. - smoothstep(.9, .85, length(uvTile)));
    outColor -= smoothstep(holeR, holeR - .005 / msize, length(uv - dir * .5 * pow(length(u_mouse * 2. - 1. - uvTile), .3)) * 1.5);// * step(.1, abs(fract(u_time * id + uv.y) * 2. - 1.));
    outColor = clamp(outColor, 0., 1.);
    // outColor *= pow(sin(uvI.y * 256.*2.*PI)*.5+.5, .2);

    if(!dartTheme) outColor=1.-outColor;

    outColor.a = 1.;
}