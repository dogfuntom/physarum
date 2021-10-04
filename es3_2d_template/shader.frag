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
    uv = (gl_FragCoord.xy * 2. - u_resolution) / min(u_resolution.y, u_resolution.x);
    uv = uv * .5 + .5;
    uv *= viewbox.zw;
    uv += viewbox.xy;
    vec2 uvI = uv;

    // uv=abs(uv);
    uv += 1e-4;
    float id = 1.;
    float shadow = 1.;
    for(float i = 0.; i < 3.; i++) {
        uv = uvI;

        if(rnd(id)<.5 && i > 1.)break;

        float scale = i + ceil(rnd(params[2] + i + id) * 4.);
        scale = mix(1., scale, min(i, 1.));
        float tileSize = i + ceil(rnd(params[1] + i + id) * 8.);
        tileSize = mix(1., tileSize, min(i, 1.));

        uv = fract(uv * scale);
        vec2 cr = floor(uv * tileSize);
        uv = fract(uv * tileSize) - .5;

        vec2 crId = vec2(rnd(cr.x + params[0] + id), rnd(cr.y + params[0] + .1 + id));

        uv*=rot(u_time*(id-.5)+id*99.);
        float frame = log(length(uv * uv)) * .1 / scale + u_time * .1 * (id-.5) + id * 99.;
        shadow *= min(frame, 1.);
        float cond = step(snoise2D(vec2(cr.x + params[0] + 00., cr.x + frame)), snoise2D(vec2(cr.y + params[0] + 99., cr.y + frame)));
        id = mix(crId.x, crId.y, cond);
    }

    int i1 = int(rnd(params[0] + id) * 3.);
    int i2 = (i1 + 1 + int(rnd(params[0] + id + .1) * 1.)) % 3;
    vec4 c1 = palette[i1];
    vec4 c2 = palette[i2];

    float sand = rnd(length(floor((uvI - 1.) * 512.) / 512.) + fract(u_time)) * .2;

    outColor = mix(c1, c2, uv.x * .5 + .5 + sand) * shadow;

    outColor.a = 1.;
}