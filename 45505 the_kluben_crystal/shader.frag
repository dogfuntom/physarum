precision mediump float;
uniform sampler2D u_texture;

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

#pragma glslify: crystall = require('../modules/sdf/crystall')
#pragma glslify: rot = require('../modules/math/rotate2D') 
#pragma glslify: box = require('glsl-sdf-box') 
#pragma glslify: rnd = require(glsl-random) 
#pragma glslify: hsv = require(glsl-hsv2rgb) 
// #pragma glslify: noise= require(glsl-noise/simplex/4d) 
// #pragma glslify: torus = require(primitive-torus) 



float rnd (float x) {return rnd(vec2(x));}

float cyl (vec3 p) {return length(p.xz) - .5;}

float torus(vec3 p, float rBig, float rSmall) {
    float r = length(p.xy) - rBig;
    r = fract(r)-.5;
    return length(vec2(r, p.z)) - rSmall;
}

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
vec2 getDist(vec3 p) {
    p.xz *= rot(-u_mouse.x * 4.);
    p.xy *= rot(u_mouse.y * 4.);
    float cr = crystall(p, u_time * .1);
    return vec2(cr, BLUE);
}
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

vec3 rayMarch(vec3 ro, vec3 rd) {
    float d = 0.;
    float info = 0.;
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
    rd.xz *= rot(horizAngle);
    return rd;
}

vec3 getRayDir(vec2 uv, vec3 p, vec3 l, float z) {
    vec3 f = normalize(l - p), r = normalize(cross(vec3(0, 1, 0), f)), u = cross(f, r), c = f * z, i = c + uv.x * r + uv.y * u, d = normalize(i);
    return d;
}

float pseudoNormRnd (float x) {
    return tan((rnd(x)-.5)*3.1415)/10.+.5;
}

vec3 getColorByIndex(int index) {
    if (index == 0) return #ffc93c;
    if (index == 1) return #dbf6e9;
    if (index == 2) return #9ddfd3;
    if (index == 3) return #31326f;
    // if (index == 4) return #081D23;
    // if (index == 5) return #FEF3F2;
    return #FFFFFF;
}







vec3 getColor(vec3 p) {
    // p.y *= 1.;
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



// const mediump float colors[3] = float[3](2.5, 7.0, 1.5);
// float[3](2.5, 7.0, 1.5);
// vec3 BUCP[4];

// BUCP[] = vec3(0);
// = vec3[4](vec3(0,0,0), vec3(0,0,0), vec3(0,0,0), vec3(0,0,0));
// vec3 colors[5] = vec3[5](vec3(0), vec3(0), vec3(0), vec3(0), vec3(0));

void main() {
    vec2 uv = (gl_FragCoord.xy * 2. - u_resolution)/min(u_resolution.x, u_resolution.y);
    vec3 ro = vec3(0., 0., -6.);
    float zoom = 1.100;


    vec3 rd = getRayDir(uv, ro, vec3(0), 3.);

    vec3 rm = rayMarch(ro, rd);
    float d = rm[0];
    float info = rm[1];

    vec3 colorBg = vec3(1);//.4*(vec3(sin(length(uv) - u_time),sin(length(uv) - u_time + 2.*PI/3.),sin(length(uv) - u_time + 2.*PI*2./3.)) * .5 + .5);
    vec3 color = colorBg;
    vec3 light = vec3(50, 20, 50);
    vec3 p = ro + rd * d;
    if(d < MAX_DIST) {
        vec3 n = getNormal(p);
        vec3 dirToLight = normalize(light - p);
        vec3 rayMarchLight = rayMarch(p + dirToLight * .06, dirToLight);

        // reflection
        vec3 ref = reflect(rd, n);
        color = getColor(ref * .5 + .5);// + pow(dot(n, vec3(1,1,-1)) * .5 + .5, 40.);

        // color += ;//texture(iChannel0, ref).xyz; FIXME
    }

    gl_FragColor = vec4(color, 1);
    // gl_FragColor.a += 1.;

}
