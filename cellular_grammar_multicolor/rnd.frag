precision mediump float;
uniform sampler2D backbuffer;
uniform float tick;
uniform float u_time;
uniform vec2 u_resolution;

#define t u_time
#define f tick
#define res u_resolution
#define o gl_FragColor
#define FC gl_FragCoord.xy
#define PI 3.1415926536

#define rnd(x) fract(54321.987 * sin(987.12345 * x))

void main() {
    vec2 uv = FC.xy / u_resolution;
    float splits = pow(2., 5.);
    float size = 1. / splits; // from the previous iteration, in the backbuffer 
    uv = floor(uv / size) * size;
    float uvSerial = uv.x*splits+uv.y;
    uv = vec2(floor(uvSerial/8.), fract(uvSerial/splits));
    gl_FragColor += rnd(length(uv + vec2(0, .1)));// + mod(tick, PI));
    // gl_FragColor = fract(gl_FragColor+tick/1000.);
}