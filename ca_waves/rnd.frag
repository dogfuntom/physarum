#version 300 es
precision mediump float;
uniform sampler2D backbuffer;
uniform float tick;
uniform float u_time;
uniform vec2 u_resolution;
uniform float params[4];
out vec4 o;

#define t u_time
#define f tick
#define res u_resolution
#define FC gl_FragCoord.xy
#define PI 3.1415926536

#define rnd(x) fract(54321.987 * sin(987.12345 * fract(x) + params[0]))

// #pragma glslify: snoise2D = require(../modules/math/glsl-noise/simplex/2d.glsl)
#pragma glslify: snoise3D = require(../modules/math/glsl-noise/simplex/3d.glsl)

void main() {
    // vec2 uv = FC.xy / u_resolution;
    // float size = 1. / pow(2., 1. + 2.); // from the previous iteration, in the backbuffer 
    // uv = floor(uv / size) * size;
    // float uvSerial = uv.x*8.+uv.y;
    // uv = vec2(floor(uvSerial/8.), fract(uvSerial/8.));
    // float v = length(uv + vec2(0, .1));
    // o.rgb = vec3(rnd(v), rnd(v+.0), rnd(v+.0));
    // o.rgb = fract(o.rgb + u_time * .01*params[2] + vec3(0,1,2)*params[3]); // почему-то деградирует, как синус

    // vec2 uv = (FC.xy * 2. - u_resolution) / u_resolution;
    // o.r = length(uv*.5+vec2(rnd(params[0]+.0),rnd(params[0]+.1))*.8-.4);
    // o.g = length(uv*.5+vec2(rnd(params[0]+.1),rnd(params[0]+.2))*.8-.4);
    // o.b = length(uv*.5+vec2(rnd(params[0]+.3),rnd(params[0]+.4))*.8-.4);

    vec2 uv = FC.xy / u_resolution;
    o.r = .5 + .5 * snoise3D(vec3(uv * 2., t * .01));
    o.g = .5 + .5 * snoise3D(vec3(uv * 2., t * .01 + .1 * params[0]));
    o.b = .5 + .5 * snoise3D(vec3(uv * 2., t * .01 + .1 * params[1]));
}