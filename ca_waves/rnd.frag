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

void main() {
    vec2 uv = FC.xy / u_resolution;
    float size = 1. / pow(2., 1. + 2.); // from the previous iteration, in the backbuffer 
    uv = floor(uv / size) * size;
    float uvSerial = uv.x*8.+uv.y;
    uv = vec2(floor(uvSerial/8.), fract(uvSerial/8.));
    float v = length(uv + vec2(0, .1));
    o.rgb = vec3(rnd(v), rnd(v+.0), rnd(v+.0));
    o.rgb = fract(o.rgb + u_time * .01*params[2] + vec3(0,1,2)*params[3]); // почему-то деградирует, как синус
}