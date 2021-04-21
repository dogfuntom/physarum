precision mediump float;
uniform sampler2D u_texture;
precision mediump float;

uniform float tick;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

#define MAX_STEPS 100
#define MAX_DIST 200.
#define EPSILON 0.0001
#define PI 3.14159265
#define IVORY 1.
#define BLUE 2.
#define BLACK 3.

#define PHI (sqrt(5.)*0.5 + 0.5)

#pragma glslify: spiralTransform = require('../modules/space/spiralTransform')

mat2 Rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

float sdBox(vec3 p, vec3 b) {
    vec3 q = abs(p) - b;
    return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
}

float opSmoothUnion(float d1, float d2, float k) {
    float h = clamp(0.5 + 0.5 * (d2 - d1) / k, 0.0, 1.0);
    return mix(d2, d1, h) - k * h * (1.0 - h);
}

float opSmoothSubtraction(float d1, float d2, float k) {
    float h = clamp(0.5 - 0.5 * (d1 + d2) / k, 0.0, 1.0);
    return mix(d1, -d2, h) + k * h * (1.0 - h);
}

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
vec2 getDist(vec3 p) {
    vec2 sp = spiralTransform(p.xy * 10., 1., .5, u_time);
    // p.z = mod(p.z, 1.)-.5;
    float cyl = max(length(p.xz) - 2.5, abs(p.y)-.3);
    return vec2(((length(vec3(sp-.5, p.z))-.4)), BLUE);
    // float spheres = length(p) - .1;
    // // for(int i = 0; i < 4; i++) {
    // //     vec3 ps = p;
    // //     // ps *= 2.;
    // //     ps += vec3(1. * sin(u_time * 1.5 + 10. * float(i)), 1. * sin(u_time * 2.5 + 10. * float(i) + 10.), 1. * sin(u_time * 3.5 + 10. * float(i) + 2.));
    // //     spheres = opSmoothUnion(spheres, length(ps) - .5, 1.5);
    // // }
    // // for(int i = 0; i < 4; i++) {
    // //     vec3 ps = p;
    // //     // ps *= 2.;
    // //     ps += vec3(1. * sin(u_time * 1.7 + 20. * float(i)), 1. * sin(u_time * 2.3 + 20. * float(i) + 10.), 1. * sin(u_time * 3.1 + 20. * float(i) + 2.));
    // //     spheres = opSmoothSubtraction(spheres, length(ps) - .5, 1.5);
    // // }
    // return vec2(spheres, BLUE);
}
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

vec3 rayMarch(vec3 ro, vec3 rd) {
    float d = 0.;
    float info = 0.;
    //float glow = 0.;
    float minAngleToObstacle = 1e10;
    for(int i = 0; i < MAX_STEPS; i++) {
        vec2 distToClosest = getDist(ro + rd * d);
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
    vec3 n = getDist(p).x - vec3(getDist(p - e.xyy).x, getDist(p - e.yxy).x, getDist(p - e.yyx).x);
    return normalize(n);
}

vec3 getRayDirection(vec3 ro, vec2 uv, vec3 lookAt) {
    vec3 rd;
    rd = normalize(vec3(uv - vec2(0, 0.), 1.));
    vec3 lookTo = lookAt - ro;
    float horizAngle = acos(dot(lookTo.xz, rd.xz) / length(lookTo.xz) * length(rd.xz));
    rd.xz *= Rot(horizAngle);
    return rd;
}

vec3 getRayDir(vec2 uv, vec3 p, vec3 l, float z) {
    vec3 f = normalize(l - p), r = normalize(cross(vec3(0, 1, 0), f)), u = cross(f, r), c = f * z, i = c + uv.x * r + uv.y * u, d = normalize(i);
    return d;
}

void main() {
    vec2 uv = (gl_FragCoord.xy * 2. - u_resolution)/min(u_resolution.x, u_resolution.y);
    // vec2 uv = gl_FragCoord.xy /u_resolution;
    vec3 ro = vec3(-u_mouse.x * 4. + 2., -u_mouse.y * 4. + 2., -5.);
    float zoom = 1.100;

    vec3 rd = getRayDir(uv, ro, vec3(0), 1.);

    vec3 rm = rayMarch(ro, rd);
    float d = rm[0];
    float info = rm[1];

    float color_bw = 0.;
    vec3 colorBg = .4*(vec3(sin(length(uv) - u_time),sin(length(uv) - u_time + 2.*PI/3.),sin(length(uv) - u_time + 2.*PI*2./3.)) * .5 + .5);
    vec3 color = colorBg;
    vec3 light = vec3(50, 20, 50);
    vec3 p = ro + rd * d;
    if(d < MAX_DIST) {
        vec3 n = getNormal(p);
        color = vec3(n * 0.5 + 0.5);
        color_bw = .5 + .5 * dot(n, normalize(light - p));
        vec3 dirToLight = normalize(light - p);
        vec3 rayMarchLight = rayMarch(p + dirToLight * .06, dirToLight);
        float distToObstable = rayMarchLight.x;
        float distToLight = length(light - p);

        // smooth shadows
        float shadow = smoothstep(0.0, .15, rayMarchLight.z / PI);
        color_bw *= .5 + .5 * shadow;

        // reflection
        vec3 ref = reflect(rd, n);
        color += 1. * pow(dot(rd, ref / 2.), 2.);

        color += rd * .5 + .5;//texture(iChannel0, ref).xyz; FIXME
    }

    gl_FragColor = vec4(color, 1);

}
