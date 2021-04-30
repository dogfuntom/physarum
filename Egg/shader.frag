#version 300 es
precision mediump float;
uniform sampler2D u_texture;
out vec4 outColor;

uniform float tick;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

#define MAX_STEPS 150
#define MAX_DIST 20.
#define EPSILON 0.003
#define PI 3.14159265
#define BLUE 2.

// #pragma glslify: crystall = require('../modules/sdf/crystall')
#pragma glslify: rot = require('../modules/math/rotate2D') 
// #pragma glslify: cellular = require('../modules/math/cellularNoise3d') 
// #pragma glslify: box = require('glsl-sdf-box') 
#pragma glslify: rnd = require(glsl-random) 
#pragma glslify: hsv = require(glsl-hsv2rgb) 
#pragma glslify: snoise3D = require(glsl-noise/simplex/3d) 
#pragma glslify: snoise2D = require(glsl-noise/simplex/2d) 
// #pragma glslify: torus = require(primitive-torus) 



float rnd (float x) {return rnd(vec2(x));}



vec3 hsv(float h, float s, float v){
    vec4 t = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(vec3(h) + t.xyz) * 6.0 - vec3(t.w));
    return v * mix(vec3(t.x), clamp(p - vec3(t.x), 0.0, 1.0), s);
}


mat3 colors = mat3(#F8D9C4, #F64271, #142738);
// vec3 colors[5] = vec3[5](#F8D9C4, #F2A297, #F64271, #CA1542, #142738);
vec3 col;

float map(vec3 p)
{
  p.y+=.2;
  p.xz*=rot(u_time);
  col=hsv(.4 * (snoise3D(p + snoise2D(p.yy)) * .5 + .5) + .2, .3, 1.) * (normalize(p) * .5 + .5);
  p.x = length(p.xz)*1.1;
  float ra = 1.;
  float rb = .5;
  const float k = sqrt(3.0);
  p.x = abs(p.x);
  float r =ra-rb;
  return ((p.y<0.0)?length(vec2(p.x,p.y))-r:(k*(p.x+r)<p.y)?length(vec2(p.x,p.y-k*r)):length(vec2(p.x+r,p.y))-2.0*r)-rb;
}

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
vec2 getDist(vec3 p) {
    p.xz *= rot(-u_mouse.x * 4.);
    // p.xy *= rot(PI/ 4.);
    
    return vec2(map(p), BLUE);
}
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

vec2 rayMarch(vec3 ro, vec3 rd) {
    float d = 0.;
    float info = 0.;
    float minAngleToObstacle = 1e10;
    int i;
    for(i = 0; i < MAX_STEPS; i++) {
        vec2 distToClosest = getDist(ro + rd * d);
        minAngleToObstacle = min(minAngleToObstacle, atan(distToClosest.x, d));
        d += distToClosest.x;
        info = distToClosest.y;
        if(abs(distToClosest.x) < EPSILON || d > MAX_DIST) {
            break;
        }
    }
    return vec2(d, i);
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

// float[3] f = float[3](1., 2., 3.);
// vec3 colors[5] = vec3[5](#F8D9C4, #F2A297, #F64271, #CA1542, #142738);

void main() {
    vec2 uv = (gl_FragCoord.xy * 2. - u_resolution)/min(u_resolution.x, u_resolution.y);
    vec3 ro = vec3(0., 0., -6.);
    float zoom = 1.100;

    vec3 rd = getRayDir(uv, ro, vec3(0), 3.);

    vec2 rm = rayMarch(ro, rd);
    float d = rm[0];
    float i = rm[1];

    vec3 colorBg = vec3(1);//.4*(vec3(sin(length(uv) - u_time),sin(length(uv) - u_time + 2.*PI/3.),sin(length(uv) - u_time + 2.*PI*2./3.)) * .5 + .5);
    vec3 color = colorBg;
    vec3 light = vec3(50, 20, 50);
    vec3 p = ro + rd * d;
    if(d < MAX_DIST) {
        color = clamp(col, 0., 1.) * colors;// * (dot(n, vec3(1,1,-1)) * .5 + .5);
        outColor = vec4(color, 1);
        outColor.a = smoothstep(30., 10., i);
    }
}
