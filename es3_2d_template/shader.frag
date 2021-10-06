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
// #pragma glslify: rot = require('../modules/math/rotate2D.glsl') 
#pragma glslify: random = require(glsl-random) 
#define rnd(x) random(vec2(x+.1))
#define PI 3.14159265
vec2 uv;
// #define sabs(p) sqrt((p)*(p)+1.)
// #define smin(a,b) (a+b-sabs(a-b))*.5
// #define smax(a,b) (a+b+sabs(a-b))*.5

// #define f(x) (.5 + .31 * sin(x * PI * 2. * ceil(rnd(id + .5 + 5.) * 3.) + (id + 2. + params[3]) * PI * 2.))

#define col(c) cos((c*fr + off) * 2. * PI) * mul + add

void main() {
vec3 off = vec3(2.538, params[2], 0.168);
vec3 fr = vec3(0.388, 0.388, 0.296);
vec3 mul = vec3(0.659, 0.438, 0.328);
vec3 add = vec3(0.938, 0.328, 0.718);
    uv = (gl_FragCoord.xy * 2. - u_resolution) / min(u_resolution.y, u_resolution.x);
    uv = uv * .5 + .5;
    uv *= viewbox.zw;
    uv += viewbox.xy;
    vec2 uvI = uv;

    uv += 1e-4;
    float id = .1;
    float shadow = 1.;
    int dir;
    for(float i = 0.; i < 2.; i++) {
        // uv = uvI;

        float scale = 1.;//ceil(rnd(params[2] + i + id) * 4.)+1.;
        // scale = mix(1., scale, min(i, 1.));
        float tileSize = 4.;//ceil(rnd(params[1] + i + id) * 4.) + 1.;
        // if(id < params[3])
        //     tileSize.xy = tileSize.yx;
        // tileSize = mix(1., tileSize, min(i, 1.));

        // uv = fract(uv * scale);
        vec2 cr = floor(uv * tileSize);
        uv = fract(uv * tileSize) - .5;

        vec2 crId = vec2(rnd(cr.x + params[0] + id), rnd(cr.y + params[0] + .1 + id));

        float frame = .1;//log(length(uv * uv)) * .1 / scale + u_time * .1 * (id-.5) + (id+params[3]) * 99.;
        // shadow *= min(pow(1.-(fract(frame)),.2), 1.);
        float cond = step(snoise2D(vec2(cr.x + params[0] + 00., cr.x + frame)), snoise2D(vec2(cr.y + params[0] + 99., cr.y + frame)));
        id = mix(crId.x, crId.y, cond);
        dir = int(mix(0., 1., cond));

        if(rnd(id)<.5)break;
    }

    int i1 = int(rnd(params[0] + id) * 3.);
    int i2 = (i1 + 1 + int(rnd(params[0] + id + .1) * 1.)) % 3;
    vec4 c1 = vec4(col(rnd(id)), 1.);
    vec4 c2 = vec4(col(rnd(id + .1)), 1.);
    // vec4 c1 = palette[i1];
    // vec4 c2 = palette[i2];

    float sand = rnd(length(floor((uvI - 1.) * 512.) / 512.) + fract(u_time)) * .2;

    outColor = mix(c1, c2, uv[dir] * .5 + .5 + sand) * shadow;

    if(id<.2)outColor*=sin(uv[dir]*8. + u_time + rnd(uv[1-dir]+u_time)*.3)*1.+1.;

    outColor.a = 1.;
}