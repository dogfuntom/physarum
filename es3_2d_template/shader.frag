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
#pragma glslify: snoise3D= require(./node_modules/glsl-noise/simplex/3d.glsl) 
#pragma glslify: snoise2D= require(./node_modules/glsl-noise/simplex/2d.glsl) 
#pragma glslify: rot = require('../modules/math/rotate2D.glsl') 
#pragma glslify: random = require(glsl-random) 
#define rnd(x) random(vec2(x+.1))
#define PI 3.14159265
vec2 uv;
#define sabs(p) sqrt((p)*(p)+1.)
#define smin(a,b) (a+b-sabs(a-b))*.5
#define smax(a,b) (a+b+sabs(a-b))*.5

#define f(x) (.5 + .31 * sin(x * PI * 2. * ceil(rnd(id + .5 + 5.) * 3.) + (id + 2. + params[3]) * PI * 2.))

void main() {
    uv = (gl_FragCoord.xy * 2. - u_resolution) / u_resolution.y;
    uv = uv * .5 + .5;
    uv *= viewbox.zw;
    uv += viewbox.xy;
    vec2 uvI = uv;

    float scale = 2.;
    float tileSize = 8.;

    uv = fract(uv * scale);
    vec2 cr = floor(uv * tileSize);
    uv = fract(uv * tileSize) - .5;
    // vec2 crId = vec2(snoise2D(vec2(cr.x+params[0]+99.,cr.y+uvI.x*.1+u_time*.1)), snoise2D(vec2(cr.y+params[0],cr.x+u_time*.1+uvI.y*.1)));

    // vec2 crId = vec2(
    //     snoise2D(vec2(cr.x+99.*params[0]+99.,cr.y+log(length(uv*uv))*.01+u_time*.1)),
    //     snoise2D(vec2(cr.y+99.*params[0],cr.x+log(length(uv*uv))*.01+u_time*.1))
    // );
    // float id = mix(crId.x, crId.y, step(crId.x,crId.y));
    // outColor=palette[int(id*5.)];

    vec2 crId = vec2(rnd(cr.x + params[0]), rnd(cr.y + params[0] + .1));
    float cond = step(snoise2D(vec2(cr.x + params[0] + 00., cr.x + log(length(uv * uv)) * .01 + u_time * .1)), snoise2D(vec2(cr.y + params[0] + 99., cr.y + log(length(uv * uv)) * .01 + u_time * .1)));
    float id = mix(crId.x, crId.y, cond);
    outColor = palette[int(id * 5.)];

    outColor.a = 1.;
}