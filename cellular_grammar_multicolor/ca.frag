precision mediump float;
uniform sampler2D tex;
uniform sampler2D backbuffer;
uniform float tick;
uniform float divisions;
uniform float u_time;
uniform vec2 u_resolution;
uniform float midi[64];

#define t u_time
#define f tick
#define res u_resolution
#define o gl_FragColor
#define FC gl_FragCoord.xy
#define PI 3.1415926536

#define LEVELS 2.

#pragma glslify: snoise2D = require(../modules/math/glsl-noise/simplex/2d.glsl)
#pragma glslify: snoise3D = require(../modules/math/glsl-noise/simplex/3d.glsl)

#define rnd(x) fract(54321.987 * sin(987.12345 * x))
// #define T(dx,dy) (texture2D(prevStateCells,fract((FC.xy+vec2(dx,dy))/res)).rgb)

void main() {
    vec2 uv = FC.xy / u_resolution;
    #define func(n0, n1, n2, n3, n4, i) rnd(( \
    n0 + \
        pow(LEVELS, 1.) * n1 + \
        pow(LEVELS, 2.) * n2 + \
        pow(LEVELS, 3.) * n3 + \
        pow(LEVELS, 4.) * n3 +pow(LEVELS, 5.) * n4) / pow(LEVELS, 6.) + i + .01 * floor(tick / 50.) + .121) 

    // uv = abs(uv - .5) + .5;
    float size = 1. / pow(2., 5.); // from the previous iteration, in the backbuffer 
    // float quadId = rnd(length(floor((mod(uv, size) / size * 3. - 1.5) + .5)));
    uv = floor(uv / size) * size + size / 2.;

    float n0 = floor(texture2D(tex, fract(uv)).r * LEVELS) / LEVELS;
    float n1 = floor(texture2D(tex, fract(uv - vec2(size, 0))).r * LEVELS) / LEVELS;
    float n2 = floor(texture2D(tex, fract(uv - vec2(0, size))).r * LEVELS) / LEVELS;
    float n3 = floor(texture2D(tex, fract(uv + vec2(size, 0))).r * LEVELS) / LEVELS;
    float n4 = floor(texture2D(tex, fract(uv + vec2(0, size))).r * LEVELS) / LEVELS;
    // vec4 n0 = step(.5, texture2D(tex, fract(uv)));
    // vec4 n1 = step(.5, texture2D(tex, fract(uv - vec2(size, 0))));
    // vec4 n2 = step(.5, texture2D(tex, fract(uv - vec2(0, size))));
    // vec4 n3 = step(.5, texture2D(tex, fract(uv + vec2(size, 0))));
    // vec4 n4 = step(.5, texture2D(tex, fract(uv + vec2(0, size))));

    if(tick > 10.) {
    // if(mod(tick, 10.) < 2.) {
        n0 = floor(texture2D(backbuffer, fract(uv)).r * LEVELS) / LEVELS;
        n1 = floor(texture2D(backbuffer, fract(uv - vec2(size, 0))).r * LEVELS) / LEVELS;
        n2 = floor(texture2D(backbuffer, fract(uv - vec2(0, size))).r * LEVELS) / LEVELS;
        n3 = floor(texture2D(backbuffer, fract(uv + vec2(size, 0))).r * LEVELS) / LEVELS;
        n4 = floor(texture2D(backbuffer, fract(uv + vec2(0, size))).r * LEVELS) / LEVELS;
    }

    // vec2 quadrant = floor(mod(uv, vec2(size)) / size * mix(2.,1.,step(.1,rnd(func(n0, n1, n2, n3, n4, 1.1)))) );
    float quadId = 1.;//quadrant.x + 2. * quadrant.y;

    o = vec4(floor(func(n0, n1, n2, n3, n4, quadId) * LEVELS) / LEVELS);
    // o = vec4(step(.5, func(n0, n1, n2, n3, n4, quadId)));
}