#version 300 es
precision mediump float;
uniform sampler2D u_texture;
out vec4 outColor;

uniform float tick;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec4 palette[5];

uniform float params[4];

// #pragma glslify: hsv = require(glsl-hsv2rgb) 
// #pragma glslify: noise= require(glsl-noise/simplex/4d) 
#pragma glslify: rot = require('../modules/math/rotate2D.glsl') 
#pragma glslify: random = require(glsl-random) 
#define rnd(x) random(vec2(x))
#define PI 3.14159265

vec3 hsv(float h, float s, float v) {
    vec4 t = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(vec3(h) + t.xyz) * 6.0 - vec3(t.w));
    return v * mix(vec3(t.x), clamp(p - vec3(t.x), 0.0, 1.0), s);
}

vec2 uvface; // uv mapped onto cubes
vec3 crf; // column, row, face

void cubes(vec2 uv) {
    // uv *= .9;
    uv.y *= sqrt(3.);
    uv *= rot(PI * 3. / 4.);
    uv.y += 1.;

    crf.y = floor((uv.y + floor(uv.x) + 1.) / 3.);
    crf.x = floor(uv.y / 3. - floor(uv.x) / 3. - uv.x / 3.);

    vec2 uvf = floor(uv);
    //front
    uvface = fract(uv - vec2(0, uv.x)), crf.z = 0.;
    //right
    if(mod(floor(uv.x - uv.y) - uvf.y - 1., 3.) == 2.)
        uvface = fract(uv - vec2(uv.y, 0)), crf.z = 1.;
    //top
    if(mod(uvf.x + uvf.y + 1., 3.) == 0.)
        uvface = fract(uv), crf.z = 2.;
    uvface = uvface * 2. - 1.;
}

void main() {
    vec2 uv = (gl_FragCoord.xy * 2. - u_resolution) / min(u_resolution.x, u_resolution.y);
    vec2 uvInit = uv;

    float zoom = 1. + rnd(params[2] + .1);
    cubes(uv * zoom);
    float shade = ((crf.z + 1.) / 3.);
    float id;
    id = length(crf * vec3(.12, .43, .11) + params[3]);
    float t = u_time / 80. * (rnd(id) + 2.) + 99. * rnd(.1 + params[1] + id);
    float offset = smoothstep(.0, .01, fract(t)) - smoothstep(.5, .51, fract(t));
    offset = mix(offset, 1. - offset, step(.5, rnd(id + params[2])));
    if(step(offset * 2. - 1., uvface.x) > 0.) {
        zoom *= 2. + floor(rnd(params[2] + .1) * 3.);
        cubes(uv * zoom);
        id = length(crf * vec3(.12, .43, .11));
        t = u_time / 80. * (rnd(id) + 2.) + 99. * rnd(.1 + params[1] + id);
        offset = smoothstep(.0, .01, fract(t)) - smoothstep(.5, .51, fract(t));
        offset = mix(offset, 1. - offset, step(.5, rnd(id + params[2])));
        shade = mix(((crf.z + 1.) / 3.), shade, .5);
        if(step(offset * 2. - 1., uvface.x) > 0.) {
            zoom *= 2.5;// + floor(rnd(params[2] + .1) * 2.);
            cubes(uv * zoom);
            shade = mix(((crf.z + 1.) / 3.), shade, .5);
        }
    }

    int i1 = int(rnd(params[0] + length(crf)) * 5.);
    int i2 = (i1 + 1 + int(rnd(params[0] + length(crf)) * 3.)) % 5;
    vec4 c1 = palette[i1];
    vec4 c2 = palette[i2];
    float sand = rnd(length(floor((uvInit - 1.) * 243.) / 243.) + .0 * fract(u_time));
    outColor = mix(c1, c2, .5 + .5 * cos(length(uvInit) * 10. + 4. * u_time * (rnd(length(crf)) - .5)) + sand * .2/* + shade*PI*2./3.*/);
    outColor *= shade;
    outColor.a = 1.;
}
