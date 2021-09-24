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
#pragma glslify: snoise3D= require(./node_modules/glsl-noise/simplex/3d.glsl) 
#pragma glslify: snoise2D= require(./node_modules/glsl-noise/simplex/2d.glsl) 
#pragma glslify: rot = require('../modules/math/rotate2D.glsl') 
#pragma glslify: random = require(glsl-random) 
#define rnd(x) random(vec2(x))
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

    float id = params[3];
    float idS = 0.;
    float t = params[0];//u_time * .03 * params[3] + length(u_mouse.x + u_mouse.y) * .1;// - pow(rnd(uv - fract(u_time) + a), 4.) * .01;
    float split = f(t);

    vec2 size = vec2(1);
    vec2 uvTile = vec2(0);

    for(int i = 0; i < 4 + int(4. * params[2] * params[2] * params[2] * params[2]); i++) {
        int dir = 1 - i % 2;
        if(size[dir] < .5*rnd(length(size)))
            break;
        float splitP = split;
        float condition = step(splitP, uv[dir]);
        idS += mix(0., 1., condition) / pow(2., float(i));
        id = mix(rnd(id + .1), rnd(id + .2), condition);
        split = mix(f(splitP * 6. + id * 99.), 1. - f(splitP * 6. - id * 99.), condition);
        uvTile[dir] += mix(0., size[dir] * splitP, condition);
        size[dir] *= mix(splitP, 1. - splitP, condition);

        uv[dir] = mix(uv[dir] / splitP, (uv[dir] - splitP) / (1. - splitP), condition);
    }
    uvTile += size / 2.;
    uvTile = uvTile * 2. - 1.;

    vec2 uvII = uvI;
    uvI *= 2. + 2. * id;
    uvI += 999.*(id+params[0]);
    vec3 p = vec3(uvI, u_time * .01 + floor(id * 8.));
    p += snoise3D(p) * .1;
    uv = uv * 2. - 1.;
    float frame = length(uv * uv * uv * uv);
    float col = smoothstep(-1.5, .5*abs(snoise3D(p)), (snoise3D(p * .3) * (.8 + .2 * sin(u_time*.1 + uvI.y)) +
        snoise3D(p) * (.9 + .2 * sin(u_time*.01 + 1. + uvI.x)) +
        snoise3D(p * 1.3) * (.5 * sin(u_time * .02 + length(uvI))) +
        snoise3D(p * 2.3) * .3 +
        snoise3D(p * 3.3) * .2 +
        snoise3D(p * 5.3) * .1 +
        snoise3D(p * 10.3) * .05 +
        abs(pow(snoise3D(p*(vec2(1., 3.+4.*rnd(id+.4)) * rot(id*2.*PI)).xyx * (8.+8.*rnd(id+.3))),.3))*.1+
        abs(pow(snoise3D(99.+p*(vec2(1., 3.+3.*rnd(id+.4)) * rot(id*2.*PI)).xyx * (8.+8.*rnd(id+.3))),.3))*.1+
        abs(pow(snoise3D(999.+p*(vec2(1., 3.+1.4*rnd(id+.4)) * rot(id*2.*PI)).xyx * (8.+8.*rnd(id+.3))),.3))*.1+
        -id*params[3]+
        (0. - frame*frame*2.) +
        0.));
    col=col*col;
    outColor.rgb+=clamp(col,0.,1.);
    outColor.a = 1.;
}