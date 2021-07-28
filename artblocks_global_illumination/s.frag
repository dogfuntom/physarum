precision highp float;
#define BLOCKS_NUMBER_MAX 100
varying vec2 uv;
uniform float t;
uniform int blocksNumber;
uniform vec3 positions[BLOCKS_NUMBER_MAX];
uniform vec3 sizes[BLOCKS_NUMBER_MAX];
uniform ivec3 colors[BLOCKS_NUMBER_MAX];
uniform int types[BLOCKS_NUMBER_MAX];
uniform float rotations[BLOCKS_NUMBER_MAX];
uniform vec3 palette[20];
// uniform vec2 mouse;
uniform vec2 u_res;
uniform sampler2D backbuffer;
uniform float camScale;
uniform vec2 camOffset;
uniform vec2 camAng;
#define PI 3.1415
#define rnd(x) fract(54321.987 * sin(987.12345 * mod(x,12.34567)))
#define rot(a) mat2(cos(a),-sin(a),sin(a),cos(a))
#define STEPS 4e2
#define EPS .001
float smax(float d1, float d2, float k) {
    float h = clamp(.5 - .5 * (d2 - d1) / k, .0, 1.);
    return mix(d2, d1, h) + k * h * (1. - h);
}

ivec3 colIds;
float gl;

vec2 random2f() {
    vec2 rn = vec2(rnd(length(uv) - t), rnd(length(uv) - t - .1));
    float k = .5;
    vec2 a;
    a.x = .5 * pow(2.0 * ((rn.x < 0.5) ? rn.x : 1.0 - rn.x), k);
    a.y = .5 * pow(2.0 * ((rn.y < 0.5) ? rn.y : 1.0 - rn.y), k);
    rn.x = (rn.x < 0.5) ? a.x : 1.0 - a.x;
    rn.y = (rn.y < 0.5) ? a.y : 1.0 - a.y;
    return rn * 2. - 1.;
}

// vec2 random2f() {
//     return fract(sin(vec2(dot(mod(uv + t, 12.3457), vec2(127.1, 311.7)), dot(mod(uv + t, 12.3457), vec2(269.5, 183.3)))) * 43758.5453);
// }

float dist(vec3 p) {
    colIds = ivec3(0, 0, -1);
    p.x = abs(p.x);
    float res = p.y + 1.; // floor plane
    for(int i = 0; i < BLOCKS_NUMBER_MAX; i++) {
        if(i >= blocksNumber)
            break;
        vec3 pb = p;
        pb -= positions[i];
        pb.xz *= rot(rotations[i] * PI / 2.);

        // box
        float cornerR = .01;//.025;//.05;
        float gap = .01;
        float block;
        if(types[i] == 0 || types[i] == 3 || types[i] == 4 || types[i] == 5 || types[i] == 6 || types[i] == 7) {
            block = length(pb - clamp(pb, -sizes[i] / 2. + cornerR + gap, sizes[i] / 2. - cornerR - gap)) - cornerR * 1.4;
        } else if(types[i] == 1) { // cyl
            block = max(length(pb.xz) - .5, abs(pb.y) - .5);
        } else if(types[i] == 2) { // ball
            block = length(pb) - .52;
        }

        if(types[i] == 5) {
            float cyl = length(pb.zy) - .5;
            float box = max(abs(pb.z) - .5, abs(pb.y + sizes[i].y / 2.) - 1.);
            float hole = min(cyl, box);
            block = max(block, -hole);
        }

        if(types[i] == 6) {
            float cyl = length(pb.zx) - .2;
            float sph = length(pb + vec3(0, sizes[i].y, 0) / 2.) - .45;
            block = max(block, min(cyl, sph));
        }

        // studs
        if(types[i] != 6) {
            vec3 ps = pb;
            vec2 l = sizes[i].xz;
            ps.xz += (l - 1.) / 2.;
            ps.xz = ps.xz - clamp(floor(ps.xz + .5), vec2(0.), l - 1.);
            float h = .24;
            float stud = max(abs(length(ps.xz) - .28 + .05) - .05, abs(ps.y - sizes[i].y / 2. - h / 2.) - h / 2.);
            block = min(stud, block);
        }

        if(types[i] == 3 || types[i] == 4) { // beak
            // pb.z *= -1.;
            pb.z += .55;
            pb.yz *= rot(PI * .26);
            if(types[i] == 3)
                pb.yz *= rot(-PI / 2.);
            block = max(block, -pb.z);
        }

        if(block < res) {
            res = block;
            colIds = colors[i];
        }
        if(res < EPS)
            break;
    }
    return res;
}

vec3 norm(vec3 p) {
    vec2 e = vec2(.01, 0.);
    return normalize(vec3(dist(p + e.xyy) - dist(p - e.xyy), dist(p + e.yxy) - dist(p - e.yxy), dist(p + e.yyx) - dist(p - e.yyx)));
}

void main() {
    gl = 0.;
    float d = 0., e = 1e9, ep, j;
    float camDist = 400.;
    vec2 uv_ = uv + random2f() * 1.5 / u_res;
    vec3 p, ro = vec3(uv_ * camScale + camOffset, -camDist), rd = vec3(0, 0, .9 + .1 * rnd(length(uv_))), o;
    bool outline = false;
    for(float i = 0.; i < STEPS; i++) {
        j = i;
        p = d * rd + ro;
        p.z -= camDist;
        p.yz *= rot(camAng.x);
        p.xz *= rot(camAng.y);
        d += e = dist(p);
        if(ep < e && e < .01) {
            // gl_FragColor = vec4(0);
            outline = true;
            break;
        }
        ep = e;
        if(colIds.x > 0) { // if not floor, glow!
            // gl +=  pow(.0000001 * e, .4);
        }
        if(e < EPS)
            break;
    }
    if(!outline) {
        vec3 col1, col2;
        for(int j = 0; j < 20; j++) {
            if(colIds[0] == j)
                col1 = palette[j];
            if(colIds[1] == j)
                col2 = palette[j];
        }

        vec3 col = col1;

        // Texturing
        //
        // layers
        if(colIds.z == 1)
            if(sin(p.y * PI * 3.) > 0.)
                col = col2;
        if(colIds.z == 2)
            if(sin((p.x + fract(positions[0].x - sizes[0].x / 2.)) * PI * 2. * 1.5) > 0.)
                col = col2;

        // shading
        o = (min(1.5, 14. / j) * .2 + .8) * (dot(norm(p), normalize(vec3(-1, 1, 0))) * .2 + .8) * col;
        // glare
        o += pow(dot(norm(p), normalize(vec3(-1, 3, 0))), 40.);

        if(colIds.z == -1) {
            if(sin(length(uv_ * uv_ * uv_ * uv_) * 32.) > 0.)
                o *= .95;
        }
    }

    // gazya
    // o = (vec3(10. / j));

    gl_FragColor = mix(texture2D(backbuffer, uv * vec2(1, -1) * .5 + .5), vec4(o, 1), 1. / (t + 1.));
}