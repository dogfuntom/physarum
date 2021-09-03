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

float isOAboveL(float id_l, float id_o) {
    return step(rnd(params[3]*.6+.2), rnd(id_l * .001 + id_o));
}

void main() {
    vec2 uv = (gl_FragCoord.xy * 2. - u_resolution) / min(u_resolution.x, u_resolution.y);
    vec2 uvInit = uv;

    float id;
    float ang = atan(uv.y, uv.x) / PI / 2. + .5;

    float n_l = 8. + pow(rnd(params[0]),1.5) * 150.;
    float n_o = 8. + pow(rnd(params[1]),1.5) * 150.;
    // float id_o = floor(length(uv) * n_o) / n_o;
    //     float n_l = rnd(params[0]) * 200.;
    // float n_o = rnd(params[1]) * 200.;
    float len = pow(length(uv / 2.) + .1, 4. * params[0] + 4. * params[0] * .5 * params[1] * sin(length(uv * 8.) - 4. * u_time));
    float id_o = floor(len * n_o) / n_o;
    float id_l = floor(ang * n_l) / n_l;
// float id_l = floor(ang * n_l) / n_l;

    id = mix(id_l, id_o, isOAboveL(id_l, id_o));
    float edges_l = smoothstep(.0, .01, fract(ang * n_l)) - smoothstep(.99, 1., fract(ang * n_l));
    float edges_o = smoothstep(.0, .01, fract(length(uv) * n_o)) - smoothstep(.99, 1., fract(length(uv) * n_o));

    float edges = mix(edges_l, edges_o, isOAboveL(id_l, id_o));
    // float shade = smooth;

    if(isOAboveL(id_l, id_o) == 1. && isOAboveL(fract(id_l + 1. / n_l), id_o) == 0.) {
        edges *= smoothstep(1., 0., fract(ang * n_l));
    }
    if(isOAboveL(id_l, id_o) == 1. && isOAboveL(fract(id_l - 1. / n_l), id_o) == 0.) {
        edges *= smoothstep(0., 1., fract(ang * n_l));
    }
    if(isOAboveL(id_l, id_o) == 0. && isOAboveL(id_l, fract(id_o + 1. / n_o)) == 1.) {
        edges *= smoothstep(1., 0., fract(length(uv) * n_o));
    }
    if(isOAboveL(id_l, id_o) == 0. && isOAboveL(id_l, fract(id_o - 1. / n_o)) == 1.) {
        edges *= smoothstep(0., 1., fract(length(uv) * n_o));
    }
    edges = pow(edges, .4);

    // // outColor.rgb += rnd(id);//hsv(id-u_time*.1,1.,1.);
    // outColor.rgb = hsv(rnd(id), 1., 1.) * edges;
    // outColor.a = 1.;
    vec4 c1 = palette[int(rnd(id) * 5.)];
    vec4 c2 = palette[int(rnd(id + .1) * 5.) % 5];
    float sand = rnd(vec2(length(floor((length(uvInit) - 1.) * 243.) / 243.) + .0 * fract(u_time),floor(ang*1000.)/1000.));
    outColor = mix(c1, c2, .5 + .5 * cos(length(uvInit) * 10. + u_time * (rnd(id) - .5)) + sand * .2) * edges;
    outColor.a = 1.;

}
