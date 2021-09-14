#version 300 es
precision mediump float;
uniform sampler2D u_texture;
out vec4 outColor;

#define paletteN 5.

uniform float tick;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform vec4 palette[5];
uniform vec4 viewbox;
uniform float params[5];

// #pragma glslify: hsv = require(glsl-hsv2rgb) 
// #pragma glslify: noise= require(glsl-noise/simplex/4d) 
#pragma glslify: rot = require('../modules/math/rotate2D.glsl') 
#pragma glslify: random = require(glsl-random) 
#define rnd(x) random(vec2(x))
#define PI 3.14159265
vec2 uv;

int tex = 0;
float sdf(vec3 p, float id, vec2 size) {
    vec3 pw = p;
    pw.xy = abs(pw.xy);
    pw.xy -= size;
    if(pw.x < pw.y)
        pw.xy = pw.yx;
    float walls = -pw.x;
    return walls;
}

#define f(x) (.5 + .3 * sin(x*PI*2. * (floor(id * 3.) + 3.) * .01 + (params[0] + id) * 99.))

void main() {
    uv = (gl_FragCoord.xy * 2. - u_resolution) / u_resolution.y;
    uv = uv * .5 + .5;

    uv *= viewbox.zw;
    uv += viewbox.xy;
    uv = uv * 2. - 1.;

    float id = params[0];
    float idInit = id;

    vec2 uvInit = uv;
    uv = uv * .5 + .5;

    id = 1.;
    float split = f(u_time);

    vec2 size = vec2(1);
    vec2 uvTile = vec2(0);

    for(int i = 0; i < 16; i++) {
        int dir = i % 2;
        // int dir = (rnd(id + .4) < .5) ? 0 : 1;
        float splitP = split;
        float condition = step(splitP, uv[dir]);
        id = mix(rnd(id + .1), rnd(id + .2), condition);
        split = mix(f(splitP * 8. + id * 99.), 1. - f(splitP * 8. - id * 99.), condition);
        uvTile[dir] += mix(0., size[dir] * splitP, condition);
        size[dir] *= mix(splitP, 1. - splitP, condition);
        uv[dir] = mix(uv[dir] / splitP, (uv[dir] - splitP) / (1. - splitP), condition);
    }
    uvTile += size / 2.;
    uvTile = uvTile * 2. - 1.;

    uv = uv * 2. - 1.;
    uv *= size / (size.x + size.y) * 2.;
    float i, d, e = 1.;
    vec3 p;
    for(; i++ < 99. && e > .0001;) {
        p = normalize(vec3(uv, 1. + .0 * rnd(uv))) * d;
        // p.z -= 1.;
        d += e = sdf(p, id, size);
    }

    int i1 = int(pow(rnd(params[0] + id), 1.) * paletteN);
    int i2 = (i1 + 1 + int(pow(rnd(params[0] + id + .1), 1.) * (paletteN - 2.))) % int(paletteN);

    vec4 c1 = palette[i1];
    vec4 c2 = palette[i2];

    // float isWhite = sin(length(uvTile)*8.-u_time*4.)*.5+.5;
    float isWhite = 1. - smoothstep(.6, .9, length(uvTile));
    outColor = c1;
    if(fract(p.z * 10. + u_time * 0.) < .5) {
        outColor = c2;
        // outColor=vec4(1);
    }
    // outColor = mix(outColor, vec4(isWhite), smoothstep(-.1, .5, d));

    // float obj = -.1-smoothstep(.1,.2,length(uvTile)*min(size.x, size.y));//-pow((length(uvInit) * 16.) / 16.,8.);
    float obj = -.1-pow((length(uvInit) * 16.) / 16.,8.);
    if((-p.z * 16.)/16. < obj) {
        outColor = vec4(1.);//-vec4(floor(length(uvInit) * 16.) / 16.);
        float depth = (length(uvInit) * 16.) / 16.;
        // outColor = vec4(1);//mix(vec4(1),c1,smoothstep(1.,0.,depth));
        outColor = mix(vec4(1),c1,smoothstep(1.,0.,depth));
    } else {
    }

    outColor.a = 1.;
}