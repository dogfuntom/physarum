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

vec3 hsv(float h, float s, float v){
    vec4 t = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(vec3(h) + t.xyz) * 6.0 - vec3(t.w));
    return v * mix(vec3(t.x), clamp(p - vec3(t.x), 0.0, 1.0), s);
}


void main() {
    vec2 uv = (gl_FragCoord.xy * 2. - u_resolution) / min(u_resolution.x, u_resolution.y);
    vec2 uvInit = uv;
    // if(abs(uv.x) > 1. || abs(uv.y) > 1.)
    //     discard;

    // float id = 0.;
    // float k = 1.;
    // uv = abs(uv);
    // for(float i = 0.; i++ < 5.;) {
    //     // stop recursion
    //     if(i < 1. + params[0] * 2. || rnd(id + .5) < .2 + params[1] * .4)
    //         id += k * (step(1. / 3., uv.x) + step(1. / 3., uv.y));
    //     //add waves
    //     if(i == 1. || i < params[2] * 5. || rnd(id + .5) < .2 + params[3] * .4)
    //         // id += floor((uv.x) - u_time);
    //         id += floor(uv.x * 1. - u_time * (rnd(id+.8) - .5) + id * 123.321 + i * 12.321) / 8.;
    //         // id += floor(((rnd(id+.9)<.5)?uv.x:uv.y) * 1. - u_time * (rnd(id+.8) - .5) + id * 123.321 + i * 12.321) / 8.;
    //     k /= 3.;
    //     uv *= 3.;
    //     uv = mod(uv + 1., 2.) - 1.;
    //     uv = abs(uv);
    // }
    // vec4 c1 = palette[int(rnd(id) * 5.)];
    // vec4 c2 = palette[int(rnd(id + .1) * 5.) % 5];
    // float sand = rnd(length(floor((uvInit - 1.) * 243.) / 243.) + .0 * fract(u_time));
    // outColor = mix(c1, c2, .5 + .5 * cos(length(uvInit) * 10. + u_time * (rnd(id) - .5)) + sand * .2);
    // outColor.a = 1.;

    uv*=4.;
    uv.y *= sqrt(3.);
    uv *= rot(PI * 3. / 4.);
    uv *= 2.;
    uv.y += 1.;

    vec3 crf; // column, row, face
    crf.y = floor((uv.y + floor(uv.x) + 1.) / 3.);
    crf.x = floor(uv.y / 3. - floor(uv.x) / 3. - uv.x / 3.);

    vec2 uvf = floor(uv);
    //front
    outColor.rg = fract(uv - vec2(0, uv.x)), crf.z = 0.;
    //right
    if(mod(floor(uv.x - uv.y) - uvf.y - 1., 3.) == 2.)
        outColor.rg = fract(uv - vec2(uv.y, 0)), crf.z = 1.;
    //top
    if(mod(uvf.x + uvf.y + 1., 3.) == 0.)
        outColor.rg = fract(uv), crf.z = 2.;

    float dist = length(vec3(crf.x, crf.y, -crf.x - crf.y));
    outColor.b = 1.;
    outColor.rgb *= hsv(rnd(length(crf.xy) + floor(u_time * 3. - dist / 8.)), .5, 2.);
    outColor *= (crf.z + 1.) / 3. * (1. - fract(u_time * 3. - dist / 8.));

}
