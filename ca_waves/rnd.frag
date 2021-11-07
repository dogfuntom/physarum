#version 300 es
precision mediump float;
uniform sampler2D backbuffer;
uniform float tick;
uniform float u_time;
uniform vec2 u_resolution;
out vec4 o;

#define t u_time
#define f tick
#define res u_resolution
#define FC gl_FragCoord.xy
#define PI 3.1415926536

#define rnd(x) fract(54321.987 * sin(987.12345 * x))

void main() {
    vec2 uv = FC.xy / u_resolution;
    float size = 1. / pow(2., 1. + 2.); // from the previous iteration, in the backbuffer 
    uv = floor(uv / size) * size;
    float uvSerial = uv.x*8.+uv.y;
    uv = vec2(floor(uvSerial/8.), fract(uvSerial/8.));
    o += rnd(length(uv + vec2(0, .1)));// + mod(tick, PI));
    // o = fract(gl_FragColor+tick/1000.);
}