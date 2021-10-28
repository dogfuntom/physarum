precision mediump float;
uniform sampler2D backbuffer;
uniform float tick;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
varying vec2 uv;

#define t u_time
#define f tick
#define res u_resolution
#define o gl_FragColor
#define FC gl_FragCoord.xy

#pragma glslify: snoise2D = require(../modules/math/glsl-noise/simplex/2d.glsl)
#pragma glslify: snoise3D = require(../modules/math/glsl-noise/simplex/3d.glsl)

#define rnd(d) fract(sin(length(FC.xy+d)*99.))
// #define T(dx,dy) (texture2D(prevStateCells,fract((FC.xy+vec2(dx,dy))/res)).rgb)

void main() {

    vec2 uv = FC.xy / res;

    float d = .1;

    o = texture2D(backbuffer, fract(uv + vec2(0, d) * (texture2D(backbuffer, uv).r * 2. - 1.)));

    float noise = (snoise3D(vec3(uv * 3., u_time)) + snoise2D(uv * 8.) * .5 + snoise2D(uv * 30.) * .1) * .5 + .5;
    noise *= cos(length(uv*2.-1.));
    o = mix(o, vec4(noise), .1);


    o.a = 1.;
}