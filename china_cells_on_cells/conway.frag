precision mediump float;
uniform sampler2D backbuffer;
uniform sampler2D texture;
uniform float tick;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float midi[64];

#define t u_time
#define f tick
#define res u_resolution
#define o gl_FragColor
#define FC gl_FragCoord.xy
#define PI 3.1415926536

#pragma glslify: snoise2D = require(../modules/math/glsl-noise/simplex/2d.glsl)
#pragma glslify: snoise3D = require(../modules/math/glsl-noise/simplex/3d.glsl)

#define rnd(d) fract(sin(length(FC.xy+d)*99.))
// #define T(dx,dy) (texture2D(prevStateCells,fract((FC.xy+vec2(dx,dy))/res)).rgb)

void main() {
    o = vec4(0);
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float self = texture2D(backbuffer, fract(uv)).r;
    float n = 0.;
    n += texture2D(backbuffer, fract(uv + vec2( 1, 1)/u_resolution)).r;
    n += texture2D(backbuffer, fract(uv + vec2( 0, 1)/u_resolution)).r;
    n += texture2D(backbuffer, fract(uv + vec2(-1, 1)/u_resolution)).r;
    n += texture2D(backbuffer, fract(uv + vec2( 1, 0)/u_resolution)).r;
    n += texture2D(backbuffer, fract(uv + vec2(-1, 0)/u_resolution)).r;
    n += texture2D(backbuffer, fract(uv + vec2( 1,-1)/u_resolution)).r;
    n += texture2D(backbuffer, fract(uv + vec2( 0,-1)/u_resolution)).r;
    n += texture2D(backbuffer, fract(uv + vec2(-1,-1)/u_resolution)).r;
    if(self == 0.){
        if(n == 3.) o+=1.;
    }
    else{
        if(n == 2. || n == 3.){
            o+=1.;
        }
    }

    if(f<100.)
        o = texture2D(texture, uv);
    
    o.a = 1.;
}