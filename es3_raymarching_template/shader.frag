#version 300 es
precision mediump float;
uniform sampler2D u_texture;
out vec4 outColor;

#define paletteN 5.
#define EPSILON .0001
#define MAX_DIST 100.
#define MAX_STEPS 100

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

#define TEX_BLUE 1
vec2 dist(vec3 p) {

    // p.xz*=rot(u_time);
    vec2 po = vec2(atan(p.y+EPSILON, p.x)/2./PI+.5, length(p.xy));

    p.xy=po;
    p.y-=1.5;

    float s = 1.;
    for(float i = 0.; i < 2.; i++) {
        p.yz *= 2.;
        s *=    2.;
        p.yz = abs(p.yz);
        p.yz -= vec2(.8);
        p.yz *= rot(u_time+p.x*2.*PI*4.+i*PI/8.);
    }

    vec2 circle;
    circle.x = (length(vec2(p.yz))-.9)/s;
    circle.y = float(TEX_BLUE);
    return circle;
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

vec3 getColorByIndex(int index) {
    if (index == 0) return #ffc93c;
    if (index == 1) return #dbf6e9;
    if (index == 2) return #9ddfd3;
    if (index == 3) return #31326f;
    return #FFFFFF;
}

vec3 getColor(vec3 p) {
    p.y += sin(p.y) * 10.;
    float pixel = rnd(length(floor(p*1000. + vec3(100, 200, 300))));
    float id = floor(p.y + pixel * 1.2);
    float fr = fract(p.y + pixel * 1.2);

    int colIndex1 = int(floor(4. * rnd(id)));
    int colIndex2 = int(floor(4. * rnd(id)));

    vec3 col1 = getColorByIndex(colIndex1);
    vec3 col2 = getColorByIndex(colIndex2);
    float mixer = fract(fr);
    return mix(col1, col2, mixer);
}

void main() {
    uv = (gl_FragCoord.xy * 2. - u_resolution) / u_resolution.y;
    uv = uv * .5 + .5;

    uv *= viewbox.zw;
    uv += viewbox.xy;
    uv = uv * 2. - 1.;

    vec3 ro = vec3(0., 0., -6.);
    float zoom = 1.100;

    vec3 rd = getRayDir(uv, ro, vec3(0), 3.);

    vec3 rm = rayMarch(ro, rd);
    float d = rm[0];
    float info = rm[1];

    vec3 colorBg = vec3(1);
    vec3 color;// = colorBg;
    vec3 light = vec3(50, 20, 50);
    vec3 p = ro + rd * d;
    if(d < MAX_DIST) {
        vec3 n = getNormal(p);
        // vec3 dirToLight = normalize(light - p);
        // vec3 rayMarchLight = rayMarch(p + dirToLight * .06, dirToLight);
        // reflection
        // vec3 ref = reflect(rd, n);
        // color = getColor(ref * .5 + .5);// + pow(dot(n, vec3(1,1,-1)) * .5 + .5, 40.);
        color += n*.5+.5;
    }

    outColor = vec4(color, 1);
}
