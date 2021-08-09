precision highp float;
#define BLOCKS_NUMBER_MAX 60
#define PI 3.1415
#define S smoothstep
#define V vec3
#define v vec2
#define rnd(x) fract(54321.987 * sin(987.12345 * mod(x,12.34567)))
#define rot(a) mat2(cos(a),-sin(a),sin(a),cos(a))
#define STEPS 4e2
#define EPS .001
#define box(p,s) (length(p - clamp(p, -(s)/2., (s)/2.)) - cornerR * 1.4)

varying v uv;
uniform V positions[BLOCKS_NUMBER_MAX];
uniform V sizes[BLOCKS_NUMBER_MAX];
uniform ivec3 colors[BLOCKS_NUMBER_MAX];
uniform int types[BLOCKS_NUMBER_MAX];
uniform float rotations[BLOCKS_NUMBER_MAX];
uniform V palette[20];
// uniform v mouse;
uniform v u_res;
uniform sampler2D b;
uniform float camScale;
uniform v camOffset;
uniform v camAng;
uniform float t;
uniform int r_studShape;
// float smax(float d1, float d2, float k) {
//     float h = clamp(.5 - .5 * (d2 - d1) / k, .0, 1.);
//     return mix(d2, d1, h) + k * h * (1. - h);
// }

ivec3 colIds;
float gl;
float camDist = 400.;


float cyl(V p, V s, float cornerR) {
    // s.x — height
    // s.y — thickness
    // s.x — radius
    p.y -= clamp(p.y, -s.x, s.x);
    float len = length(p.xz) - s.z;
    len -= clamp(len, -s.y, s.y);
    float cyl = length(v(len, p.y)) - cornerR;
    return cyl;
}

v random2f() {
    v rn = v(rnd(length(uv) - t), rnd(length(uv) - t - .1));
    float k = .5;
    v a;
    a.x = .5 * pow(2.0 * ((rn.x < 0.5) ? rn.x : 1.0 - rn.x), k);
    a.y = .5 * pow(2.0 * ((rn.y < 0.5) ? rn.y : 1.0 - rn.y), k);
    rn.x = (rn.x < 0.5) ? a.x : 1.0 - a.x;
    rn.y = (rn.y < 0.5) ? a.y : 1.0 - a.y;
    return rn * 2. - 1.;
}

// v random2f() {
//     return fract(sin(v(dot(mod(uv + t, 12.3457), v(127.1, 311.7)), dot(mod(uv + t, 12.3457), v(269.5, 183.3)))) * 43758.5453);
// }

int eye;

float dist(V p) {
    colIds = ivec3(0, 0, -1);
    p.x = abs(p.x);
    float res = p.y + 1.; // floor plane
    for(int i = 0; i < BLOCKS_NUMBER_MAX; i++) {
        eye = 0;
        if(i >= ${blocksNumber})
            break;
        V pb = p;
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
            float sph = cyl(pb + V(0, sizes[i].y - .5, 0) / 2., V(.2, .25, .2), cornerR);
            // float sph = length(pb) - .45;
            block = max(block, min(cyl_, sph));
        }

        // studs
        if(types[i] != 6) {
            V ps = pb;
            v l = sizes[i].xz;
            ps.xz += (l - 1.) / 2.;
            ps.xz = ps.xz - clamp(floor(ps.xz + .5), v(0.), l - 1.);
            float h = .24;
            float stud = (r_studShape == 1) ? abs(length(ps.xz) - .28 + .05) - .05 : length(ps.xz) - .28;
            stud = max(stud, abs(ps.y - sizes[i].y / 2. - h / 2.) - h / 2.);
            block = min(stud, block);
        }

        if(types[i] == 3 || types[i] == 4) { // beak
            // pb.z *= -1.;
            V pe = pb;
            pe.z += .55;
            pe.yz *= rot(PI * .26);
            if(types[i] == 3)
                pe.yz *= rot(-PI / 2.);
            block = max(block, -pe.z);
        }

        if(types[i] == 7) { // eye
            // pb.z -= .5;
            // block = box(pb - V(0, 0, .5), V(1));
            // pb.zy *= rot(PI / 2.);
            // pb.y+=.25;
            float eye_ = cyl(pb, V(.2, .25, .2), cornerR);
            block = eye_;
            if(eye_ < EPS) {
                // eye = int(step(.3, length(pb.xz) - length(pb.xz * 2. - v(2)) / 3.));
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

V norm(V p) {
    v e = v(.01, 0.);
    return normalize(V(dist(p + e.xyy) - dist(p - e.xyy), dist(p + e.yxy) - dist(p - e.yxy), dist(p + e.yyx) - dist(p - e.yyx)));
}

void main() {
    gl = 0.;
    float d = 0., e = 1e9, ep, j;
    v uv_ = (uv*u_res/min(u_res.x,u_res.y)) + random2f() * 1.5 / u_res;
    V p, ro = V(uv_ * ${viewBox.scale} + v(${viewBox.offset.x}, ${viewBox.offset.y}), -camDist), rd = V(0, 0, .9 + .1 * rnd(length(uv_))), o;
    bool outline = false;
    for(float i = 0.; i < STEPS; i++) {
        j = i;
        p = d * rd + ro;
        p.z -= camDist;
        p.yz *= rot(${u_camAngYZ});
        p.xz *= rot(${u_camAngXZ});
        d += e = dist(p);
        if(ep < e && e < .01) {
            // gl_FragColor = vec4(0);
            outline = true;
            break;
        }
        ep = e;
        // if(colIds.x > 0) { // if not floor, glow!
        //     // gl +=  pow(.0000001 * e, .4);
        // }
        if(e < EPS || e > camDist*2.)
            break;
    }
    if(!outline) {
        V col1, col2;
        for(int j = 0; j < 20; j++) {
            if(colIds[0] == j)
                col1 = palette[j];
            if(colIds[1] == j)
                col2 = palette[j];
        }

        V col = col1;

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
        if(${r_colorScheme} == 3)
            col = sin(length(p) / max(float(${gs}), float(${height_})) * 6.28 * 2. - V(0, PI * 2. / 3., PI * 4. / 3.)) * .5 + .5;
            // p*=.3;
            // col = sin(8.*dot(sin(p), cos(p.zxy))  - V(0, PI * 2. / 3., PI * 4. / 3.)) * .5 + .5;

        if(eye == 1) {
            col = V(0);
            V pe = p + fract(${gs}. / 2.);
            pe = fract(pe) - .5;
            col += step(.3, length(pe.xz));
            col += step(-.1, -length(pe.xz + .1));
        }

        if(colIds.z == -1) {
            o = palette[0];
            if(length(o) > .4)
                o *= smoothstep(5., 0., length(uv_ + v(${R() * 3 - 1}, -1)));
            if(${r_colorScheme} == 3)
                // o = V(o.r*.5);
                o = V(.2);
            if(sin(length(pow(abs(uv_), v(${u_bg_pow}))) * 32.) > 0.)
                o *= .95;
        } else {
            // shading
            o = (min(1.5, 14. / j) * .2 + .8) * (dot(norm(p), normalize(V(0, 1, 1))) * .2 + .8) * col;
            // glare
            o += pow(dot(norm(p), normalize(V(0, 3, 1))), 40.);
        }
    }

    // gazya
    if(${r_colorScheme} == 4)
        o = (V(10. / j));

    gl_FragColor = mix(texture2D(b, uv * v(1, -1) * .5 + .5), vec4(o, 1), 1. / (t + 1.));
    // gl_FragColor = vec4(o*rnd(${u_tick}), 1);
}