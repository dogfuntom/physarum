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

// #pragma glslify: spiralTransform = require('../modules/space/spiralTransform')
#pragma glslify: box = require('glsl-sdf-box') 
#pragma glslify: rnd = require(glsl-random) 
#pragma glslify: hsv = require(glsl-hsv2rgb) 
// #pragma glslify: noise= require(glsl-noise/simplex/4d) 
// #pragma glslify: torus = require(primitive-torus) 


float rnd (float x) {return rnd(vec2(x));}

mat2 Rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

float cyl (vec3 p) {return length(p.xz) - .5;}

float torus(vec3 p, float rBig, float rSmall) {
    float r = length(p.xy) - rBig;
    r = fract(r)-.5;
    return length(vec2(r, p.z)) - rSmall;
}

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
vec2 getDist(vec3 p) {
    // p.y += noise(vec4(p * .2, u_time + u_mouse.x));
    // p.x += noise(vec4(p * .2, u_time + u_mouse.x));
    // p.z += noise(vec4(p * .2, u_time + u_mouse.x));
    // return vec2(box(p, vec3(1., 4., 1.)), BLUE);
    // p.xy = spiralTransform(p.xy);
    // float a =  atan(p.y, p.x);
    return vec2(torus(p, 2., .3) * .6, BLUE);
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
    rd.xz *= Rot(horizAngle);
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
    // p.y += noise(vec4(p * .2, u_time + u_mouse.x));
    // p.x += noise(vec4(p * .2, u_time + u_mouse.x));
    // p.z += noise(vec4(p * .2, u_time + u_mouse.x));
    float r = length(p.xy) - 2.;
    float idRing = floor(r) + 3.;
    float idTimeAndRing = floor(u_time + rnd(idRing));

    // vec3 colTransform = vec3(1.5,1.7,10.5);
    // vec3 colTransform = vec3(2.);
    vec3 colTransform = vec3(3.);

    float a = ((atan(p.y, p.x) / 2. / 3.1415) + .5);
    p.y = fract(a + u_time*(.1 * (rnd(idTimeAndRing)-.5))) * 3.1415;

    float pixel = rnd(length(floor(vec3(a, r, p.z)*100. + vec3(100, 200, 300))));
    float id = floor(p.y / 3.1415 * 10.1 * idRing + rnd(idRing) + pixel * .1);
    float fr = fract(p.y / 3.1415 * 10.1 * idRing + rnd(idRing) + pixel * .1);

    float hue = pseudoNormRnd(id + idRing * 100.);
    float saturation1 = pseudoNormRnd(id+.2 + idRing * 100.);// < .4 ? 0. : 1.;
    float brightness1 = pseudoNormRnd(id+.3 + idRing * 100.);// < .4 ? 0. : 1.;
    float saturation2 = pseudoNormRnd(id+.4 + idRing * 100.);// < .4 ? 0. : 1.;
    float brightness2 = pseudoNormRnd(id+.5 + idRing * 100.);// < .4 ? 0. : 1.;
    vec3 col1 = hsv(vec3(hue,      saturation1, brightness1));
    vec3 col2 = hsv(vec3(hue + .2, saturation2, brightness2));
    float mixer = fract(fr);
    return colTransform * mix(col1, col2, mixer);
}




void main() {
    vec2 uv = (gl_FragCoord.xy * 2. - u_resolution)/min(u_resolution.x, u_resolution.y);
    vec3 ro = vec3(-u_mouse.x * 4. + 2., -u_mouse.y * 4. + 2., -5.);
    float zoom = 1.100;


    vec3 rd = getRayDir(uv, ro, vec3(0), 1.);

    vec3 rm = rayMarch(ro, rd);
    float d = rm[0];
    float info = rm[1];

    float color_bw = 0.;
    vec3 colorBg = vec3(1);//.4*(vec3(sin(length(uv) - u_time),sin(length(uv) - u_time + 2.*PI/3.),sin(length(uv) - u_time + 2.*PI*2./3.)) * .5 + .5);
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
        color = getColor(p);// * clamp(dot(n, vec3(1,1,-1)) * .2 + .8, 0., 1.);

        // color += ;//texture(iChannel0, ref).xyz; FIXME
    }

    gl_FragColor = vec4(color, 1);

}
