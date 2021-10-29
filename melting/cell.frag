precision mediump float;
uniform sampler2D backbuffer;
uniform float tick;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
varying vec2 uv;
uniform float midi[64];

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

    float speed = midi[12] * .1;
    vec2 offset = speed * (texture2D(backbuffer, uv).rg * 2. - 1.);
    // if(rnd(length(floor(uv*8.))) > .5) offset.xy = offset.yx;

    vec2 n = vec2(0);
    // noise += snoise3D(vec3(uv * 20., t)) * midi[4];
    n.x += snoise3D(vec3(uv * 100.*midi[0], u_time * midi[7])) * midi[4];
    n.x += snoise3D(vec3(uv * 100.*midi[1], u_time * midi[7])) * midi[5];
    n.x += snoise3D(vec3(uv * 100.*midi[2], u_time * midi[7])) * midi[6];
    n.x *= mix(0.,cos((length(uv * 2. - 1.) + u_time*(midi[7]-.5))*100.*midi[3]),midi[11]);

    n.y += snoise3D(vec3(uv * 100.*midi[0], u_time * midi[7]) + 9.) * midi[4];
    n.y += snoise3D(vec3(uv * 100.*midi[1], u_time * midi[7]) + 9.) * midi[5];
    n.y += snoise3D(vec3(uv * 100.*midi[2], u_time * midi[7]) + 9.) * midi[6];
    n.y *= mix(0.,cos((length(uv * 2. - 1.) + u_time*(midi[7]-.5))*100.*midi[3]),midi[11]);

    o = mix(texture2D(backbuffer, fract(uv + offset)), n.xyyy * .5 + .5, midi[15]);
    // o = noise;

    o.a = 1.;
}