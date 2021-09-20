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
#define sabs(x) sqrt(x*x+1e-2)

vec2 uv;

vec2 p2d(vec2 polar) {
    float alpha = polar.x;
    float R = polar.y;
    float x = sin(alpha) * R;
    float y = cos(alpha) * R;
    return vec2(x, y);
}

vec2 d2p(vec2 decart) {
    float alpha = atan(decart.x, decart.y);
    float R = length(decart);
    return vec2(alpha, R);
}

vec2 snowflakeSymmetry(vec2 p, float rays) {
    vec2 ar = d2p(p);
    float astep = 2. * 3.1415 / rays;
    float a = ar.x, r = ar.y;
    a = mod(a, astep);
    a -= astep / 2.;
    a = abs(a);
    p = p2d(vec2(a, r));
    return p;
}

#define TEX_BLUE 1
#define TEX_WALL 2

#define f(x) (.5 + \
                (.3 + .1*rnd(params[1])) * \
                sin( \
                    (x*.01) * PI * 2. * ceil(rnd(id + params[3]) * 3.) + \
                    (id + 2. + params[4] + u_mouse[0]*id) * PI * 2.))

vec2 dist(vec3 p) {
    // p.xz *= rot(u_mouse.x*2.*PI);
    // vec3 sizeW = vec3(2., 2., .5);
    // vec3 pw = p - clamp(-sizeW / 2., sizeW / 2., p);
    // vec2 wall = vec2(length(pw) - .01, TEX_WALL);

    // p.xy/=dot(p.xy, p.xy);

    // p.xy *= rot(p.z * .1);
    // p.z = sin(p.z*(params[0]*.5+.5)+params[4]);

    // p.yx = vec2(atan(p.y + EPSILON, p.x) / 2. / PI + .5, length(p.xy));
    // p.x = mod(p.x, 8.);
    // p.y += 1.9;// - 2. * params[2];

    // p.xz *= rot(p.y * 2. * PI * floor(4.*params[3])) * sign(rnd(params[1])-.5);
    p.xz*=1.;
    p.y*=.1;
    p.zy = p.yz;
    float id = 1.;
    // float idS = 0.;
    // float idK = 1.;
    float t = p.z;// - pow(rnd(uv - fract(u_time) + a), 4.) * .01;
    float split = f(t);

    vec2 size = vec2(1);
    // vec2 uvTile = vec2(0);
    p.xy = p.xy * .5 + .5;

    for(int i = 0; i < 5 + int(4. * params[1]); i++) {
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

    p.xy *= size / min(size.x, size.y);
    p.xy = p.xy * 2. - 1.;

    vec2 holes = vec2((length(p.xy) - .25) * .3 / 4. * min(size.x, size.y), id);

    return holes;
    // return wall.x > holes.x ? wall : holes;

    // vec2 wall = vec2(max(abs(p.z)-.01, -length(p.xy)+1.),TEX_WALL);
    // vec2 po = vec2(atan(p.y+EPSILON, p.x)/2./PI+.5, length(p.xy));

    // p.xy=po;
    // p.y-=1.; 

    // float s = 1.;
    // for(float i = 0.; i < 2.; i++) {
    //     p.yz *= 3.+.5*sin(u_time);
    //     s *=    3.+.5*sin(u_time);
    //     p.yz = snowflakeSymmetry(p.yz,floor(3.+4.*rnd(i+.1)));
    //     p.yz -= vec2(.2+.1*sin(u_time));
    //     p.yz *= rot(u_time*i);
    // }

    // vec2 circle;
    // p.yz -= clamp(p.yz,-.4,.7);
    // circle.x = (length(vec2(p.yz))-.01)/s;
    // circle.y = float(TEX_BLUE);
    // return circle.x<wall.x? circle: wall;
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

// vec3 getColor(vec3 p) {
//     p.y += sin(p.y) * 10.;
//     float pixel = rnd(length(floor(p*1000. + vec3(100, 200, 300))));
//     float id = floor(p.y + pixel * 1.2);
//     float fr = fract(p.y + pixel * 1.2);

//     int colIndex1 = int(floor(4. * rnd(id)));
//     int colIndex2 = int(floor(4. * rnd(id)));

//     vec3 col1 = getColorByIndex(colIndex1);
//     vec3 col2 = getColorByIndex(colIndex2);
//     float mixer = fract(fr);
//     return mix(col1, col2, mixer);
// }

void main() {
    uv = (gl_FragCoord.xy * 2. - u_resolution) / u_resolution.y;
    uv = uv * .5 + .5;

    uv *= viewbox.zw;
    uv += viewbox.xy;
    uv = uv * 2. - 1.;

    vec3 ro = vec3(0., 0., -6.);
    float zoom = 1.100;

    vec3 rd = getRayDir(uv, ro, vec3(0), 4.)*(rnd(uv)*.2+.8);

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
    }

    int colIndex1 = int(floor(5. * rnd(rayMarchLight.y)));
    int colIndex2 = int(floor(5. * rnd(rayMarchLight.y-.1)));

    vec4 col1 = palette[colIndex1];
    vec4 col2 = palette[colIndex2];
    float mixer = color.r;
    outColor = mix(col1, col2, mixer);
    outColor.rgb *= n.x*.5+.5;

    outColor.a = 1.;
    // outColor = vec4(color, 1);
}
