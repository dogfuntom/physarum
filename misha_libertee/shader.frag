precision mediump float;
uniform sampler2D u_texture;
precision mediump float;

uniform float tick;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

#define MAX_STEPS 100
#define MAX_DIST 200.
#define EPSILON 0.01
#define PI 3.14159265
#define IVORY 1.
#define BLUE 2.
#define BLACK 3.

#define PHI (sqrt(5.)*0.5 + 0.5)

// #pragma glslify: spiralTransform = require('../modules/space/spiralTransform')
#pragma glslify: box = require('glsl-sdf-box') 
#pragma glslify: rnd = require(glsl-random) 
#pragma glslify: hsv = require(glsl-hsv2rgb) 
#pragma glslify: noise= require(glsl-noise/classic/3d) 

float stuff(vec3 p){
    float width = .8 + .3 * noise(vec3(p * 2. * noise(vec3(p * .2 + vec3(u_time))) + vec3(u_time)));
    return length(vec2(length(p.xy)-3., length(p.zy)-3.))-width;
}

float rnd (float x) {return rnd(vec2(x));}

mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
vec2 getDist(vec3 p) {
    p.xz *= rot(u_time);
    // // p.y += noise(vec4(p * .2, u_time + u_mouse.x));
    // p.x += .2 * noise(p);
    // p.z += .2 * noise(p);
    // float s = 1.;
    // for(int i = 0; i < 3; i++){
    //     p = abs(p);
    //     p-= vec3(.65, 1.2, 2.5).yzx;
    //     p.xy *= rot(.2 + .2 * sin(u_time));
    //     p.yz *= rot(- .2 + .2 * sin(u_time + PI*.5));
    //     p*=1.8;
    //     s*=1.8;
    // }

    // // return vec2((length(p) - .005) / s, BLUE);

    // return vec2(box(p, vec3(.65, 1.2, 2.5).yzx * 2.) / s, BLUE);
    // return vec2(box(p, vec3(.65, 1.2, 2.5).yzx + .3 * noise(vec3(p * 2. * noise(vec3(p * .2 + vec3(u_time))) + vec3(u_time))))-.02, BLUE);
    return vec2(stuff(p)*.8, BLUE);
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

vec3 getColor(vec3 p) {
    vec3 col1 = #EEDC79;
    vec3 col2 = #403F3B;
    p*=2.;
    // float n = step(.3, noise(vec4(p, u_time) + noise(vec4(p + 10., u_time))));
    float n = step(.3, noise(vec3(p) + noise(vec3(p + 10.))));
    return mix(col1, col2, n);
}




void main() {
    vec2 uv = (gl_FragCoord.xy * 2. - u_resolution)/min(u_resolution.x, u_resolution.y);
    // vec3 ro = vec3(-u_mouse.x * 40. + 20., -u_mouse.y * 4. + 2., -20.);
    vec3 ro = vec3(0, 0, -20.);
    float zoom = 1.100;


    vec3 rd = getRayDir(uv, ro, vec3(0), 3.);

    vec3 rm = rayMarch(ro, rd);
    float d = rm[0];
    float info = rm[1];

    float color_bw = 0.;
    vec3 colorBg = vec3(0);//.4*(vec3(sin(length(uv) - u_time),sin(length(uv) - u_time + 2.*PI/3.),sin(length(uv) - u_time + 2.*PI*2./3.)) * .5 + .5);
    vec3 color = colorBg;
    vec3 light = vec3(50, 20, 50);
    vec3 p = ro + rd * d;
    if(d < MAX_DIST) {
        vec3 n = getNormal(p);
        // color = vec3(n * 0.5 + 0.5);
        // color_bw = .5 + .5 * dot(n, normalize(light - p));
        vec3 dirToLight = normalize(light - p);
        vec3 rayMarchLight = rayMarch(p + dirToLight * .06, dirToLight);
        float distToObstable = rayMarchLight.x;
        float distToLight = length(light - p);

        // smooth shadows
        float shadow = smoothstep(0.0, .15, rayMarchLight.z / PI);
        color_bw *= .5 + .5 * shadow;

        // reflection
        vec3 ref = reflect(rd, n);
        color = getColor(p) * clamp(dot(n, vec3(1,1,-1)) * .5 + .5, 0., 1.);

        // color += ;//texture(iChannel0, ref).xyz; FIXME
    }

    gl_FragColor = vec4(color, 1);

}
