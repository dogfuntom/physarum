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
uniform int textures[BLOCKS_NUMBER_MAX];
// uniform vec2 m;
uniform vec2 u_res;
uniform sampler2D backbuffer;
uniform float camScale;
uniform float rotations[BLOCKS_NUMBER_MAX];
uniform vec2 camOffset;
uniform vec2 camAng;
uniform vec2 mouse;
#define PI 3.1415
#define rnd(x) fract(54321.987 * sin(987.12345 * x))
#define rot(a) mat2(cos(a),-sin(a),sin(a),cos(a))
#define STEPS 400.
float opSmoothIntersection(float d1, float d2, float k) {
    float h = clamp(0.5 - 0.5 * (d2 - d1) / k, 0.0, 1.0);
    return mix(d2, d1, h) + k * h * (1.0 - h);
}

vec3 col1, col2;
int tex;

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
    tex = -1;
    // return vec4(length(p)-4.,vec3(0));

    p.x = abs(p.x);
    float res = p.y + 1.;
    for(int i = 0; i < BLOCKS_NUMBER_MAX; i++) {
        if(i >= blocksNumber)
            break;
        vec3 pb = p;
        pb -= positions[i];
        pb.xz *= rot(rotations[i] * PI / 2.);
        float cornerR = .01;//.025;//.05;
        float box;
        float gap = .01;
        if(types[i] == 0 || types[i] == 3 || types[i] == 4 || types[i] == 5 || types[i] == 6 || types[i] == 7) {
            // vec3 pbb = abs(pb) - clamp(abs(pb), -sizes[i] / 2. + cornerR, sizes[i] / 2. - cornerR);
            // box = (pbb.x+pbb.y+pbb.z-cornerR)*0.57735027;// TODO заменить на бивел от Гази

            box = length(pb - clamp(pb, -sizes[i] / 2. + cornerR + gap, sizes[i] / 2. - cornerR - gap)) - cornerR * 1.4;
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
        float block = min(stud, box);
        if(types[i] == 3) {
            // box = length(pb - clamp(pb, -sizes[i] / 2. + cornerR, sizes[i] / 2. - cornerR)) - cornerR * 1.4;
            pb.z += .6;
            pb.yz *= rot(-PI / 4.);
            block = opSmoothIntersection(block, -pb.z, cornerR * 1.);
            // box = max(length(pb.xz) - 1., abs(pb.y) - .5); // cyl 2x2
        }
        if(block < res) {
            res = block;
            tex = textures[i];
            for(int j = 0; j < 20; j++) {
                if(colors[i].x == j)
                    col1 = palette[j];
                if(colors[i].y == j)
                    col2 = palette[j];
            }
        }
    }
    return res;
}

vec3 norm(vec3 p) {
    vec2 e = vec2(.01, 0.);
    return normalize(vec3(dist(p + e.xyy) - dist(p - e.xyy), dist(p + e.yxy) - dist(p - e.yxy), dist(p + e.yyx) - dist(p - e.yyx)));
}

void main() {
    gl_FragColor = vec4(palette[0], 1);
    float d = 0., e = 1e9, j;
    float rm;
    float camDist = 400.;
    vec2 uv_ = uv + random2f() * 1.5 / u_res;
    vec3 p, pCam, ro = vec3(uv_ * camScale + camOffset, -camDist);
    vec3 rd = vec3(0, 0, .9 + .1 * rnd(length(uv_)));

    bool outline = false;
    for(float i = 0.; i < STEPS; i++) {
        j = i;
        p = d * rd + ro;
        p.z -= camDist;
        p.yz *= rot(camAng.x);
        p.xz *= rot(camAng.y);
        rm = dist(p);
        if(e < rm && rm < .008) {
            gl_FragColor.a = 1.;
            gl_FragColor.rgb = vec3(0);
            outline = true;
            break;
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
        vec3 col = col1;
        // layers
        // if(tex == 1)
        //     col = mix(col1, col2, cos(p.y * PI * 4.) * .5 + .5);
        // // gyroid
        // // if(tex==2)col=mix(col1, col2, dot(sin(p*PI),sin(p*PI))*.5+.5);
        // if(tex == 2)
        //     col = mix(col1, col2, smoothstep(.3, .4, dot(cos(p * PI * vec3(1, .1, 8)), cos(p * PI * vec3(1, .1, 8)))));
        // gl_FragColor = vec4((vec3(sqrt(smoothstep(80.,0.,j))) * dot(norm(p) * .9 + .1, (vec3(vec2(0, -1) * rot(camAng.y), 1).xzy)) * .5 + .5) * col, 1.);
        // gl_FragColor = vec4((vec3(10./j) * dot(norm(p) * .9 + .1, (vec3(vec2(0, -1) * rot(camAng.y), 1).xzy)) * .5 + .5) * col, 1.);
        // gl_FragColor = vec4(col * dot(norm(p), (vec3(vec2(0, -1) * rot(camAng.y), 1).xzy)) * .5 + .5, 1.);
        // gl_FragColor = vec4(vec3(min(1.,4. / sqrt(j))) * min(1.,dot(norm(p), vec3(-1, .1, -1)) * .1 + .9) * col, 1.);
        // if(gl_FragCoord.x / u_res.x < .5)
            // if(gl_FragCoord.y / u_res.y < .5)
        // gl_FragColor = vec4(vec3(min(1., 10. / j) * .2 + .8) * (dot(norm(p), normalize(vec3(-1, 1, -1))) * .4 + .8) * col, 1.);
        gl_FragColor = vec4(vec3(min(1.5, 14. / j) * .2 + .8) * (dot(norm(p), normalize(vec3(-1, 1, 0))) * .2 + .8) * col, 1.);
        gl_FragColor += pow(dot(norm(p), normalize(vec3(-1, 3, 0))),40.);
        // gl_FragColor += pow(dot(norm(p), normalize(vec3(-1, 0, .5))),80.)*.3;
        // gl_FragColor += pow(dot(norm(p), normalize(vec3(-1, 0,0 ))),4000.);
        //     else;
        //         gl_FragColor = vec4(vec3(min(1., 10. / j) * .2 + .8) * col, 1.);
        // else
        //     gl_FragColor = vec4(col, 1.);
        // gl_FragColor = vec4(smoothstep(20.,0.,sqrt(j)) * (dot(norm(p), vec3(-1, 1, -1)) * .1 + .9) * col, 1.);
        if(tex == -1) {
            float mult = sqrt(j / 20.);
            mult = mix(1., mult, step(0., sin(length(uv_) * 64.)) * .5);
            gl_FragColor = vec4(col * mult, 1.);
        }
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