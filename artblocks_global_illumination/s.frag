precision highp float;
#define BLOCKS_NUMBER_MAX 60
varying vec2 uv;
uniform float t;
uniform int blocksNumber;
uniform vec3 positions[BLOCKS_NUMBER_MAX];
uniform vec3 sizes[BLOCKS_NUMBER_MAX];
uniform ivec3 colors[BLOCKS_NUMBER_MAX];
uniform int types[BLOCKS_NUMBER_MAX];
uniform float rotations[BLOCKS_NUMBER_MAX];
uniform float u_bg_pow;
uniform vec3 palette[20];
// uniform vec2 mouse;
uniform vec2 u_res;
uniform sampler2D backbuffer;
uniform float camScale;
uniform vec2 camOffset;
uniform vec2 camAng;
uniform int r_colorScheme;
uniform float gs;
uniform float height;
uniform int r_studShape;
#define PI 3.1415
#define rnd(x) fract(54321.987 * sin(987.12345 * mod(x,12.34567)))
#define rot(a) mat2(cos(a),-sin(a),sin(a),cos(a))
#define STEPS 4e2
#define EPS .001
#define box(p,s) (length(p - clamp(p, -(s)/2., (s)/2.)) - cornerR * 1.4)
// float smax(float d1, float d2, float k) {
//     float h = clamp(.5 - .5 * (d2 - d1) / k, .0, 1.);
//     return mix(d2, d1, h) + k * h * (1. - h);
// }

ivec3 colIds;
float gl;

float cyl(vec3 p, vec3 s, float cornerR) {
    // s.x — height
    // s.y — thickness
    // s.x — radius
    p.y -= clamp(p.y, -s.x, s.x);
    float len = length(p.xz) - s.z;
    len -= clamp(len, -s.y, s.y);
    float cyl = length(vec2(len, p.y)) - cornerR;
    return cyl;
}

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

int eye;

float dist(vec3 p) {
    colIds = ivec3(0, 0, -1);
    p.x = abs(p.x);
    float res = p.y + 1.; // floor plane
    for(int i = 0; i < BLOCKS_NUMBER_MAX; i++) {
        eye = 0;
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
            block = box(pb, sizes[i] - 2. * (cornerR + gap));
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

        if(types[i] == 6) { // pillar
            float cyl_ = length(pb.zx) - .15;
            float sph = cyl(pb + vec3(0, sizes[i].y - .5, 0) / 2., vec3(.2, .25, .2), cornerR);
            // float sph = length(pb) - .45;
            block = max(block, min(cyl_, sph));
        }

        // studs
        if(types[i] != 6) {
            vec3 ps = pb;
            vec2 l = sizes[i].xz;
            ps.xz += (l - 1.) / 2.;
            ps.xz = ps.xz - clamp(floor(ps.xz + .5), vec2(0.), l - 1.);
            float h = .24;
            float stud = (r_studShape == 1) ? abs(length(ps.xz) - .28 + .05) - .05 : length(ps.xz) - .28;
            stud = max(stud, abs(ps.y - sizes[i].y / 2. - h / 2.) - h / 2.);
            block = min(stud, block);
        }

        if(types[i] == 3 || types[i] == 4) { // beak
            // pb.z *= -1.;
            vec3 pe = pb;
            pe.z += .55;
            pe.yz *= rot(PI * .26);
            if(types[i] == 3)
                pe.yz *= rot(-PI / 2.);
            block = max(block, -pe.z);
        }

        if(types[i] == 7) { // eye
            // pb.z -= .5;
            // block = box(pb - vec3(0, 0, .5), vec3(1));
            // pb.zy *= rot(PI / 2.);
            // pb.y+=.25;
            float eye_ = cyl(pb, vec3(.2, .25, .2), cornerR);
            block = eye_;
            if(eye_ < EPS) {
                // eye = int(step(.3, length(pb.xz) - length(pb.xz * 2. - vec2(2)) / 3.));
                eye = 1;
                //-int(min(step(-.3,-),step(.3,)));
            }
            // block = max(block, min(cyl, sph));
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

        // pride
        if(r_colorScheme == 2)
            // col = sin(p.y*6.28/height+palette[0].r*6.28 - vec3(0, PI * 2. / 3., PI * 4. / 3.)) * .4 + .6;
            col = sin(length(p)/max(gs,height)*6.28*2.  - vec3(0, PI * 2. / 3., PI * 4. / 3.)) * .5 + .5;
            // p*=.3;
            // col = sin(8.*dot(sin(p), cos(p.zxy))  - vec3(0, PI * 2. / 3., PI * 4. / 3.)) * .5 + .5;

        if(eye == 1) {
            col = vec3(0);
            vec3 pe = p + fract(gs / 2.);
            pe = fract(pe) - .5;
            col += step(.3, length(pe.xz));
            col += step(-.1, -length(pe.xz + .1));
        }

        if(colIds.z == -1) {
            o = palette[0];
            if(r_colorScheme == 2)
                // o = vec3(o.r*.5);
                o = vec3(.2);
            if(sin(length(pow(uv_, vec2(u_bg_pow))) * 32.) > 0.)
                o *= .95;
        } else {
            // shading
            o = (min(1.5, 14. / j) * .2 + .8) * (dot(norm(p), normalize(vec3(0, 1, 1))) * .2 + .8) * col;
            // glare
            o += pow(dot(norm(p), normalize(vec3(0, 3, 1))), 40.);
        }
    }

    // gazya
    if(r_colorScheme == 3)
        o = (vec3(10. / j));

    gl_FragColor = mix(texture2D(backbuffer, uv * vec2(1, -1) * .5 + .5), vec4(o, 1), 1. / (t + 1.));
}