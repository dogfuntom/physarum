#version 300 es
precision mediump float;
uniform sampler2D u_texture;
out vec4 outColor;

#define paletteN 5.
#define EPSILON .0001
#define MAX_DIST 100.
#define MAX_STEPS 500

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
// #define sabs(x) sqrt(x*x+1e-2)

vec2 uv;

#define TEX_BLUE 1
#define TEX_WALL 2

#define f(x) (.5 + (.3 + .1 * rnd(params[1])) * sin((x * .01) * PI * 2. * ceil(rnd(id + params[3]) * 3.) + (id + 2. + params[4] + u_mouse[0] * id) * PI * 2.))

#define sabs(p)sqrt(p*p+1e-2)

vec2 sfold(vec2 p) {
    vec2 v = normalize(vec2(1, -1));
    float g = dot(p, v);
    return p - (g - sabs(g)) * v;
}

vec2 dist(vec3 p) {

    // p.z -= 8.;

    float id = 1.;
    float t = u_time * .001;
    float split = f(t);

    vec2 size = vec2(1);
    // vec2 uvTile = vec2(0);
    p.xy = p.xy * .5 + .5;

    for(int i = 0; i < 4 + int(8. * params[1]); i++) {
        int dir = 1 - i % 2;
        // if(size[dir] < .01)
        //     break;
        float shift = .01 * t;//u_mouse.x;//.0 * sin(t * 2. * PI + id * 99.);
        // float shift = t * sign(id-.5);
        // uv[dir] = fract(uv[dir] + shift);
    // int dir = (rnd(id + .4) < .5) ? 0 : 1;
        float splitP = split;
        float condition = step(splitP, p[dir]);
        // idS += mix(0., 1., condition) / pow(2., float(i));
        id = mix(rnd(id + .1), rnd(id + .2), condition);
        split = mix(f(splitP * 6. + id * 99.), 1. - f(splitP * 6. - id * 99.), condition);
        // uvTile[dir] += mix(0., size[dir] * splitP, condition);
        // uvTile[dir] = fract(uvTile[dir] + mix(0., size[dir] * splitP, condition) + shift * size[dir] * splitP);
        size[dir] *= mix(splitP, 1. - splitP, condition);

        p[dir] = mix(p[dir] / splitP, (p[dir] - splitP) / (1. - splitP), condition);
    }
    // uvTile += size / 2.;
    // uvTile = uvTile * 2. - 1.;

    // p.xy *= size;// / min(size.x, size.y);
    p.xy = p.xy * 2. - 1.;

    // float radius = .01;
    // p.xy-=clamp(-1.+radius/size, 1.-radius/size, p.xy);
    // vec2 cubes = vec2((length(p) - radius), id);
    p = abs(p) - vec3(1., 1., 1.);
    p.xz = sfold(p.xz);
    p.yz = sfold(p.yz);
    p.xy = sfold(p.xy);

    vec2 cubes = vec2(p.x * min(size.x, size.y), id);

    return cubes;
}

vec3 rayMarch(vec3 ro, vec3 rd) {
    float d = 0.;
    float info = 0.;
    float minAngleToObstacle = 1e10;
    for(int i = 0; i < MAX_STEPS; i++) {
        vec2 distToClosest = dist(ro + rd * d);
        minAngleToObstacle = min(minAngleToObstacle, atan(distToClosest.x, d));
        d += distToClosest.x;
        info = distToClosest.y;
        if(abs(distToClosest.x) < EPSILON || d > MAX_DIST) {
            break;
        }
    }
    return vec3(d, info, minAngleToObstacle);
}

vec3 getNormal(vec3 p) {
    vec2 e = vec2(EPSILON, 0.);
    vec3 n = dist(p).x - vec3(dist(p - e.xyy).x, dist(p - e.yxy).x, dist(p - e.yyx).x);
    return normalize(n);
}

vec3 getRayDirection(vec3 ro, vec2 uv, vec3 lookAt) {
    vec3 rd;
    rd = normalize(vec3(uv - vec2(0, 0.), 1.));
    vec3 lookTo = lookAt - ro;
    float horizAngle = acos(dot(lookTo.xz, rd.xz) / length(lookTo.xz) * length(rd.xz));
    rd.xz *= rot(horizAngle);
    return rd;
}

vec3 getRayDir(vec2 uv, vec3 p, vec3 l, float z) {
    vec3 f = normalize(l - p), r = normalize(cross(vec3(0, 1, 0), f)), u = cross(f, r), c = f * z, i = c + uv.x * r + uv.y * u, d = normalize(i);
    return d;
}

void main() {
    uv = (gl_FragCoord.xy * 2. - u_resolution) / u_resolution.y;
    uv = uv * .5 + .5;

    uv *= viewbox.zw;
    uv += viewbox.xy;
    uv = uv * 2. - 1.;

    vec3 ro = vec3(0., 0., -2.);
    float zoom = 1.;

    vec3 rd = getRayDir(uv, ro, vec3(0), zoom);// * (rnd(uv) * .2 + .8);

    vec3 rm = rayMarch(ro, rd);
    float d = rm[0];
    float info = rm[1];

    vec3 colorBg = vec3(1);
    vec3 color;// = colorBg;
    vec3 light = vec3(50, 50, -80);
    // light.xz *= rot(u_time);
    vec3 p = ro + rd * d;
    vec3 rayMarchLight, n;
    if(d < MAX_DIST) {
        n = getNormal(p);
        vec3 dirToLight = normalize(p * vec3(1, 1, 0));
        rayMarchLight = rayMarch(p + dirToLight * .01, dirToLight);
        // reflection
        // vec3 ref = reflect(rd, n);
        // color = getColor(ref * .5 + .5);// + pow(dot(n, vec3(1,1,-1)) * .5 + .5, 40.);
        color += dot(n, dirToLight) * .5 + .5;
        // if(rayMarchLight.x<10.){
        color *= smoothstep(.0, .4, rayMarchLight.z);
        // }
        int colIndex1 = int(floor(5. * rnd(rm.y)));
        int colIndex2 = int(floor(5. * rnd(rm.y - .1)));

        vec4 col1 = palette[colIndex1];
        vec4 col2 = palette[colIndex2];
        float mixer = n.x * .5 + .5;
        // outColor.rgb += dot(n, vec3(-1)) * .5 + .5;
        outColor = mix(col1, col2, mixer);
        // outColor.rgb *= n.x * .5 + .5;
    }

    outColor.a = 1.;
// outColor = vec4(1, 0, 1, 1);
}
