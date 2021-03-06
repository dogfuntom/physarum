precision mediump float;
uniform sampler2D backbuffer;
uniform sampler2D tex_conway;
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

    vec2 uvN = gl_FragCoord.xy / u_resolution;
    vec2 uv = (gl_FragCoord.xy * 2. - u_resolution) / min(u_resolution.x, u_resolution.y);

    float speed = midi[12] * .1;
    vec2 offset = speed * (texture2D(backbuffer, uvN).rg * 2. - 1.);

    // if(rnd(length(floor(uvN*8.))) > .5) offset.xy = offset.yx;

    vec2 n = vec2(0);
    // noise += snoise3D(vec3(uv * 20., t)) * midi[4];
    n.x += snoise3D(vec3(uvN * 100. * midi[0], sin(PI * 2. * u_time * floor(3. * midi[7])))) * midi[4];
    n.x += snoise3D(vec3(uvN * 100. * midi[1], sin(PI * 2. * u_time * floor(5. * midi[7])))) * midi[5];
    n.x += snoise3D(vec3(uvN * 100. * midi[2], sin(PI * 2. * u_time * floor(8. * midi[7])))) * midi[6];

    n.y += snoise3D(vec3(uvN * 100. * midi[0], sin(PI * 2. * u_time * floor(3. * midi[7]))) + 9.) * midi[4];
    n.y += snoise3D(vec3(uvN * 100. * midi[1], sin(PI * 2. * u_time * floor(5. * midi[7]))) + 9.) * midi[5];
    n.y += snoise3D(vec3(uvN * 100. * midi[2], sin(PI * 2. * u_time * floor(8. * midi[7]))) + 9.) * midi[6];

    o = mix(texture2D(backbuffer, fract(uvN + offset)), n.xyyy * .5 + .5, midi[15]);

    // vec2 U = uv;
    // U += 1.;
    // U /= 2.;
    // vec2 conway = vec2(texture2D(tex_conway, U).r, 0);
    // o = mix(o, conway.xyyy, midi[16 + 15]* .01);
    // // // o = noise;

    o.a = 1.;
}