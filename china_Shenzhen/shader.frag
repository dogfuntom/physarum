#version 300 es
precision mediump float;
uniform sampler2D prevStateCells;
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
    // return -length(p.xy) + .05;
    vec3 pw = p;
    pw.xy = abs(pw.xy);
    pw.xy -= size;
    if(pw.x < pw.y)
        pw.xy = pw.yx;
    float walls = -pw.x;
    return walls;
}

#define f(x) (.5 + .3 * sin(x * PI * 2. * ceil(rnd(id + .5 + 5.) * 3.) + (id + 2.) * PI * 2.))

void main() {
    #define AA 1.
    vec4 color;
    for(float a = 0.; a < AA * AA; a++) {

        uv = (gl_FragCoord.xy * 2. - u_resolution) / u_resolution;
        // uv = (gl_FragCoord.xy * 2. - u_resolution) / u_resolution.y;
        uv = uv * .5 + .5;
        uv *= viewbox.zw;
        uv += viewbox.xy;
        uv = uv * 2. - 1.;

        // uv += 1. / u_resolution * (vec2(rnd(gl_FragCoord.xy + fract(u_time) + a * .3), rnd(gl_FragCoord.xy + fract(u_time) + a * .3 + .1)) - .5);
        float t = u_time;// - pow(rnd(uv - fract(u_time) + a), 4.) * .01;

	/////////////////////////////////////////

        float id = params[0];
        float idInit = id;

        vec2 uvInit = uv;
        uv = uv * .5 + .5;

        id = 1.;
        float split = f(t);

        vec2 size = vec2(1);
        vec2 uvTile = vec2(0);

        for(int i = 0; i < 13; i++) {
            int dir = 1 - i % 2;

            float shift = .01*t;//u_mouse.x;//.0 * sin(t * 2. * PI + id * 99.);
            // float shift = t * sign(id-.5);
            // uv[dir] = fract(uv[dir] + shift);
        // int dir = (rnd(id + .4) < .5) ? 0 : 1;
            float splitP = split;
            float condition = step(splitP, uv[dir]);
            id = mix(rnd(id + .1), rnd(id + .2), condition);
            split = mix(f(splitP * 6. + id * 99.), 1. - f(splitP * 6. - id * 99.), condition);
            uvTile[dir] += mix(0., size[dir] * splitP, condition);
            // uvTile[dir] = fract(uvTile[dir] + mix(0., size[dir] * splitP, condition) + shift * size[dir] * splitP);
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

        outColor = c1;
        if(fract(p.z * 10. + t * 8. + id * 99.) < .5) {
            outColor = c2;
        }

        // outColor = mix(outColor, vec4(1), smoothstep(0., .1 + .8 * pow(length(uvTile), 8.), d));
        // outColor *= 1.-pow(length(uvTile) / sqrt(2.), 2.);
        uvTile = normalize(uvTile) * length(uvTile) * (.8 + .4 * id);
        uvTile = abs(uvTile);

        outColor *= pow(fract(max(uvTile.x, uvTile.y) * 2. - t * 8.), 2.) * smoothstep(.4, 0., d);
        outColor *= 1.3;

        // outColor.rg=uvTile;

        // outColor *= step(.5, fract(max(uvTile.x, uvTile.y) * 2. - t * 8. * .01)) * smoothstep(.4, 0., d);
        // outColor *= fract(length(uvTile) - t * 8. * .01) * smoothstep(.4, 0., d);
        // outColor *= (.2 + .9 * smoothstep(-.9, .9, sin(length(uvTile) * PI * 2. - t * PI * 2. * .01))) * smoothstep(.4, 0., d);
	/////////////////////////////////////////

        color += clamp(outColor, 0., 1.);
    }
    color /= float(AA * AA);
    outColor = color;
    outColor.a = 1.;

    if(u_time > .1) outColor = texture(prevStateCells, uv*.5+.4);
}