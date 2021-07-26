precision highp float;
#define BLOCKS_NUMBER_MAX 100
varying vec2 uv;
uniform float t;
uniform int blocksNumber;
uniform vec3 positions[BLOCKS_NUMBER_MAX];
uniform vec3 bgColor;
uniform vec3 sizes[BLOCKS_NUMBER_MAX];
uniform ivec2 colors[BLOCKS_NUMBER_MAX];
uniform vec3 palette[20];
uniform int types[BLOCKS_NUMBER_MAX];
// uniform vec2 m;
uniform vec2 u_res;
uniform sampler2D backbuffer;
uniform float camScale;
uniform float rotations[BLOCKS_NUMBER_MAX];
uniform vec2 camOffset;
uniform vec2 camAng;
#define PI 3.1415
#define rnd(x) fract(54321.987 * sin(987.12345 * x))
#define rot(a) mat2(cos(a),-sin(a),sin(a),cos(a))
float opSmoothIntersection(float d1, float d2, float k) {
    float h = clamp(0.5 - 0.5 * (d2 - d1) / k, 0.0, 1.0);
    return mix(d2, d1, h) + k * h * (1.0 - h);
}

vec3 col1, col2;

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

float dist(vec3 p) {
    col1 = bgColor;
    col2 = bgColor;
    // return vec4(length(p)-4.,vec3(0));

    p.x = abs(p.x);
    float sp = p.y + 1.;
    for(int i = 0; i < 340; i++) {
        if(i >= blocksNumber)
            break;
        vec3 pb = p;
        pb -= positions[i];
        pb.xz *= rot(rotations[i] * PI / 2.);
        float cornerR = .05;//.05;
        // vec3 pbb = abs(pb) - clamp(abs(pb), -sizes[i] / 2. + cornerR, sizes[i] / 2. - cornerR);
        // float box = (pbb.x+pbb.y+pbb.z-cornerR)*0.57735027;// TODO заменить на бивел от Гази
        float box;
        if(types[i] == 0 || types[i] == 3 || types[i] == 4 || types[i] == 5 || types[i] == 6 || types[i] == 7) {
            box = length(pb - clamp(pb, -sizes[i] / 2. + cornerR, sizes[i] / 2. - cornerR)) - cornerR * 1.4;
        } else if(types[i] == 1) {
            box = max(length(pb.xz) - .5, abs(pb.y) - .5);
        } else if(types[i] == 2) {
            box = length(pb) - .52;
        }
        // return vec4(box, vec3(0));

        vec2 l = sizes[i].xz;
        vec3 ps = pb;
        ps.xz += (l - 1.) / 2.;
        ps.xz = ps.xz - clamp(floor(ps.xz + .5), vec2(0.), l - 1.);
        float h = .26;
        float stud = max(abs(length(ps.xz) - .28 + .05) - .05, abs(ps.y - sizes[i].y / 2. - h / 2.) - h / 2.);
        float res = min(stud, box);
        if(types[i] == 3) {
            // box = length(pb - clamp(pb, -sizes[i] / 2. + cornerR, sizes[i] / 2. - cornerR)) - cornerR * 1.4;
            pb.z += .6;
            pb.yz *= rot(-PI / 4.);
            res = opSmoothIntersection(res, -pb.z, cornerR * 1.);
            // box = max(length(pb.xz) - 1., abs(pb.y) - .5); // cyl 2x2
        }
        if(res < sp) {
            sp = res;
            for(int j = 0; j < 20; j++) {
                if(colors[i].x == j)
                    col1 = palette[j];
                if(colors[i].y == j)
                    col2 = palette[j];
            }
        }
    }
    return sp;
}

vec3 norm(vec3 p) {
    vec2 e = vec2(.01, 0.);
    return normalize(vec3(dist(p + e.xyy) - dist(p - e.xyy), dist(p + e.yxy) - dist(p - e.yxy), dist(p + e.yyx) - dist(p - e.yyx)));
}

void main() {
    gl_FragColor = vec4(palette[0], 1);
    float d = 0., e = 1e9, j;
    float rm;
    float camDist = 40.;
    float focusDistance = camDist - 10.;
    float blurAmount = .0;//10.8;
    vec2 uv_ = uv + random2f() * 1.5 / u_res;
    vec3 p, ro = vec3(uv_ * camScale + camOffset, 0);
    vec3 focus = ro + vec3(0, 0, focusDistance);
    ro.xy += blurAmount * normalize(random2f()) * rnd(length(uv_) - t - .2);
    vec3 rd = normalize(focus - ro) * (rnd(length(uv_ - t)) * .1 + .9);

    bool outline = false;
    for(float i = 0.; i < 99.; i++) {
        j = i;
        p = d * rd + ro;
        p.z -= camDist;
        p.yz *= rot(camAng.x);
        p.xz *= rot(camAng.y);
        rm=dist(p);
        if(e < rm && rm < .008) {
            gl_FragColor.a = 1.;
            gl_FragColor.rgb = vec3(0);
            outline = true;
            // return;
        }
        d += e = rm;
        if(e < .001)
            break;
    }
    // gl_FragColor=vec4(vec3(fract(j/100.)),1);
    // gl_FragColor.rgb=fract(gl_FragColor.rgb);

    // // col
    if(!outline) {
        vec3 col = mix(col1, col2, sin(p.y * 10.) * .5 + .5);
        gl_FragColor = vec4(col * (vec3(10. / j) * dot(norm(p) * .8 + .2, vec3(1, 1, 0)) * .5 + .5), 1.);
        gl_FragColor = clamp(gl_FragColor, 0., 1.);
    }

    // if(rm.y == 2.)
    //     gl_FragColor.rgb = 2. * (norm(p) * .5 + .5) * (vec3(10. / j));

    // if(rm.y == 3.)
    //     gl_FragColor.rgb = (vec3(10. / j));
    // // bw
    // // gl_FragColor = vec4(vec3(10./j)*length(rm.yzw / 255.), 1.);
    // // gl_FragColor = vec4(vec3(10. / j) * rm.yzw / 255., 1.);

    // // glow
    // // gl_FragColor = vec4((vec3(j/10.) * dot(norm(p) * .8 + .2, vec3(1, 1, 0)) * .5 + .5) * rm.yzw / 255., 1.);

    gl_FragColor = mix(texture2D(backbuffer, uv * vec2(1, -1) * .5 + .5), gl_FragColor, 1. / (t + 1.));
}