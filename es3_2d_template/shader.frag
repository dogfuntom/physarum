#version 300 es
precision mediump float;
uniform sampler2D u_texture;
out vec4 outColor;

uniform float tick;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec4 palette[5];
uniform vec4 viewbox;
uniform float params[4];

// #pragma glslify: hsv = require(glsl-hsv2rgb) 
// #pragma glslify: noise= require(glsl-noise/simplex/4d) 
#pragma glslify: rot = require('../modules/math/rotate2D.glsl') 
#pragma glslify: random = require(glsl-random) 
#define rnd(x) random(vec2(x))
#define PI 3.14159265

vec2 uv;

vec2 cicada(float ang) {
    float left, right;
    float prime1 = 5., prime2 = 7., prime3 = 3.; // var
    float idRay = rnd(floor(ang / prime1) + floor(ang / prime2) + floor(ang / prime3));
    left = max(floor(ang / prime1) * prime1, max(floor(ang / prime2) * prime2, floor(ang / prime3) * prime3));
    right = min(ceil(ang / prime1) * prime1, min(ceil(ang / prime2) * prime2, ceil(ang / prime3) * prime3));
    ang = (ang - left) / (right - left);
    return vec2(idRay, ang);
}

void main() {
    uv = (gl_FragCoord.xy * 2. - u_resolution) / u_resolution.y;
    uv = uv * .5 + .5;
    uv *= viewbox.zw;
    uv += viewbox.xy;
    uv = uv * 2. - 1.;
    // uv = uv * .5 + .5;
    vec2 uvInit = uv;

    float id = 0.1;

    //raymarching
    float i = 0., d = 0., e = .1, emin = 999.;
    vec3 p;
    float radius = .5 + .1 * rnd(.2 + params[0]);
    for(; i++ < 50. && e > .001 && d < 10.;) {
        p = normalize(vec3(uv, 1)) * d;
        p.z -= 1.;
        float s1 = 10. + 40. * params[3];
        float s2 = 5. + 20. * params[2];
        vec3 pg = p * s1;
        pg += u_time;
        e = .5 * dot(sin(pg), cos(pg.zxy)) / s1;
        pg = p * s2;
        pg += u_time * .3;
        e = .5 * dot(sin(pg), cos(pg.zxy)) / s2;
        e += length(p) - radius;
        d += e;
        emin = min(emin, e);
    }
    // if(rnd(floor(d*16.)+id)>.5)

    float blobLayers = 16. + 64. * params[1] * params[1] * params[1] * params[1];
    float dd = d * (3. + blobLayers) + params[0];
    float idBlob = 1. - floor(d * blobLayers) / blobLayers;
    // // end of rm

    float ang = atan(uv.y, uv.x) / 2. / PI + .5;
    ang += .01 * sin(length(uv) / (.1 + params[2]) + .3 * u_time);
    ang += .03 * cos(length(uv) / (.1 + params[3] * 10.) - .1 * u_time);
    ang = fract(ang);
    // ang += u_time * 1. * (rnd(id + params[3]) - .5);
    ang = ang * (20. + 135. * (params[1])); // var
    vec2 angFloorFract = cicada(ang);
    ang = angFloorFract[1];
    float idRay = angFloorFract[0];
    idRay = pow(idRay,params[3]*.8+.2);
    idRay = idRay * .9 * radius;

    id = rnd(max(idBlob, idRay));

    outColor += id;

    int i1 = int(rnd(params[0] + id) * 5.);
    int i2 = (i1 + 1 + int(rnd(params[0] + id + .1) * 3.)) % 5;
    vec4 c1 = palette[i1];
    vec4 c2 = palette[i2];
    float sand = (rnd(length(floor((uvInit - 1.) * 128.) / 128.))*2.-1.)*.1;

    if(idBlob > idRay)
        outColor = mix(c1, c2, fract(dd)+sand);
    else {
    //     vec2 uvRay = vec2(fract(50. + 50. * rnd(idRay) * length(uv)) * 2. - 1., ang * 2. - 1.);
        vec2 uvRay = vec2(50. * (.1 + rnd(idRay)) * length(uv) + u_time, ang * 2. - 1.);
        vec2 uvFloorFract = cicada(uvRay.x + .1);
        float shadeLines = uvFloorFract.y;
        float shadeLines2 = uvRay.y / rnd(.1 + uvFloorFract.x);
        float shadeCircles = step(.5, length(vec2(uvFloorFract.y * 2. - 1., uvRay.y)));
        float shade = shadeLines2;// mix(shadeCircles, shadeLines, rnd(idRay + .1) < .5);
        // ang = mix(ang, 1.-ang, step(.5,rnd(idRay + .1)));
        // outColor = mix(c1, c2, ang);
        outColor = mix(c1, c2, ang) * shade;
    }
    // // outColor = mix(c1, c2, ang);
    // // outColor = mix(c1, c2, fract(emin));
    // // outColor = mix(c1, c2, sin(ang * 10. + sand));
    // // outColor = mix(c1, c2, .5 + .5 * cos(length(uvInit) * 10. + u_time * (rnd(id) - .5)) + sand * .2);
    // outColor.a = 1.;

}