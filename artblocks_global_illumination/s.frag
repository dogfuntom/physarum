precision highp float;
varying vec2 uv;
uniform float t;
uniform float tick;
uniform float seed;
// uniform float blocksNumber;
// uniform float arr[1024];
uniform vec3 pos[3];
// uniform float posf[5];
// uniform vec3 arr3[1021];
// uniform vec3 arr_[10];
uniform vec2 m;
uniform vec2 u_res;
uniform sampler2D backbuffer;

/*

План такой
- 10 Передаю размеры и координаты кубиков из лего-части. Старый рендер тоже оставляю, делаю опционаьным.
- Координаты оставляю в текущем формате, в глсл преобразовываю.
- Перетаскиваю ГИ

*/ 

mat2 rot(float a) {
    float s = sin(a), c = cos(a);
    return mat2(c, -s, s, c);
}

float dist(vec3 p) {
    p.z -= 10.;
    // p.xz *= rot(t);
    float sp = 999.;
    for(int i = 0; i < 3; i++) {
        vec3 pb = p-pos[i];
        float box = max(abs(pb.z) - 1., max(abs(pb.x) - 1., abs(pb.y) - 1.));
        sp=sp<box?sp:box;
    }
    return sp;
}

vec3 norm(vec3 p) {
    vec2 e = vec2(.01, 0.);
    return normalize(vec3(dist(p + e.xyy) - dist(p - e.xyy), dist(p + e.yxy) - dist(p - e.yxy), dist(p + e.yyx) - dist(p - e.yyx)));
}

void main() {
    float d = 0., e, j;
    vec3 p, rd = normalize(vec3(uv, 1.));
    for(float i = 0.; i < 99.; i++) {
        j = i;
        p = d * rd;
        d += e = dist(p);
        if(e < .01)
            break;
    }
    gl_FragColor = vec4(vec3(dot(norm(p) * .8 + .2, vec3(1.))), 1.);
}

// #define AA 8.

// // float seedInc = 0.;
// // // #define R rnd(seed+seedInc++)
// // #define R(x) rnd(seed+x)
// // #define PI 3.1415
// // #define PI2 6.283
// // #define E .0001
// // #define MAXD 50.
// // #define RM_STEPS 100.
// // #define O gl_FragColor

// // пригодится кусок многошагового реймаршинга. Чтобы мы сперва натыкались на 

// float rnd(vec2 co) {
//     return fract(sin(mod(dot(co, vec2(12.9898, 78.233)), 3.14)) * 43758.5453);
// }

// float rnd(float x) {
//     return rnd(vec2(x));
// }

// // vec3 hsv(float h, float s, float v) {
// //     vec4 t = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
// //     vec3 p = abs(fract(vec3(h) + t.xyz) * 6.0 - vec3(t.w));
// //     return v * mix(vec3(t.x), clamp(p - vec3(t.x), 0.0, 1.0), s);
// // }
// // vec2 wob(vec2 uv) {
// //     return sin(uv.yx * 10. + sin(uv * 7.));
// // }

// // #define rot(a) mat2(cos(a),sin(a),-sin(a),cos(a))
// // #define PHONG 0.
// // #define PHONG_RAINBOW 1.
// // #define PHONG_NORMAL 2.
// // #define PHONG_PRIDE 3.
// // #define GLASS 100.
// // #define MIRROR 200.

// // const float t1 = GLASS;
// // const float t2 = PHONG;

// // float smin(float d1, float d2, float k) {
// //     float h = clamp(0.5 + 0.5 * (d2 - d1) / k, 0.0, 1.0);
// //     return mix(d2, d1, h) - k * h * (1.0 - h);
// // }

// // vec2 d2p(vec2 d) {
// //     return vec2(atan(d.x, d.y), length(d));
// // }
// // vec2 p2d(vec2 p) {
// //     return p.y * vec2(sin(p.x), cos(p.x));
// // }
// // vec2 ngon(vec2 p, float N) {
// //     vec2 pol = d2p(p.xy);
// //     float step = 2. * 3.1415 / N;
// //     pol.x = mod(pol.x, step) - 3.14 / N;
// //     p.xy = p2d(pol);
// //     return p;
// // }

// // float spiral(vec3 p) {
// //     p.xz *= rot(p.y);
// //     p.xz = ngon(p.xz, 1.);
// //     float w = R(4.) + .2;
// //     p.z -= w + R(5.) * .5 + .2;
// //     float res = max(abs(p.z) - w, abs(p.x) - E) * .5;
// //     return res;
// // }

// // float metaballs(vec3 p, float firstPosK) {
// //     float res = MAXD;
// //     for(int i = 2; i < 5; i++) {
// //         float rad = pow(1.5 / float(i), 1.5);
// //         vec3 offset = vec3(R(.001 + float(i)), R(.002 + float(i)), R(.003 + float(i))) * 2. - 1.;
// //         if(i == 2)
// //             offset *= firstPosK;
// //         offset *= 1. - rad * .5;
// //         res = smin(res, length(p - offset) - rad, .3);
// //     }
// //     return res;
// // }

// // float gyr(vec3 p) {
// //     float scale = 1. + 1. * R(2.);
// //     float offset = R(1.) * 9.;
// //     float cyl = length(p.xz) - 1.;
// //     float gyr = abs(dot(sin(p * scale - offset), cos(p.zxy * scale - offset))) / scale * .4 - .001;
// //     return max(gyr, cyl);
// // }

// // float distIn(vec3 p) {
// //     float res;
// //     if(R(50.) < .1) {
// //         res = metaballs(p, 1.);
// //     } else if(R(50.) < .2) {
// //         res = gyr(p);
// //     } else {
// //         res = spiral(p);
// //     }
// //     return res;
// // }

// // vec2 dist(vec3 p) {
// //     p.xz *= rot(m.x*8.);
// //     // p.xz *= rot(t - 2.);
// //     p.xy *= rot(.785);
// //     float bumpsAmp = 2.;
// //     float bumpsScale = 2.;
// //     float bumps = 0.;
// //     if(R(41.) < .1)
// //         bumps = dot(sin(p * bumpsScale - t * 0.), cos(p.zxy * bumpsScale + t * 0.)) / bumpsScale * .1 * bumpsAmp;

// //     float s1;
// //     if(R(.22) < .9) {
// //         s1 = .7 * (length(p) - 2. + bumps);
// //     } else {
// //         s1 = metaballs(p * .5, 0.) / .5;
// //     }

// //     // float s1 = .7 * (length(p) - 2.);
// //     vec2 extra = vec2(MAXD, R(13.) < .9 ? MIRROR : PHONG_NORMAL);
// //     if(R(12.) < .05) {
// //         vec3 pt = p;
// //         // if(R(12.) < .1) pt.xy *= rot(3.14 / 4.);
// //         float rad1 = .01 + .05 * R(13.);
// //         float rad2 = 2. + .5 + .8 * R(14.) + rad1;
// //         float tor = length(vec2(pt.y, length(pt.xz) - rad2)) - rad1;
// //         extra.x = tor;
// //     } else if(R(12.) < .1) {
// //         vec3 pt = p;
// //         // pt.y-=bumps;
// //         // if(R(12.) < .1) pt.xy *= rot(3.14 / 4.);
// //         float width = .5 + .4 * R(13.);
// //         float rad = 2. + .2 + R(14.) + width;
// //         float thikness = .01;// * R(18.);+.01;
// //         float ring = max(abs(pt.y) - thikness, abs(length(p.xz) - rad) - width);
// //         extra.x = ring;
// //     }
// //     float s2 = length(p) - 1. * R(0.);
// //     vec2 shape2 = vec2(max(s1, distIn(p)), PHONG_RAINBOW);//PHONG_RAINBOW MIRROR PHONG_PRIDE
// //     vec2 shape1 = vec2(s1, GLASS);
// //     if(R(41.) < .01) {
// //         // shape1.y = MIRROR;
// //         shape2.x = MAXD;
// //     } else {
// //         shape1.x = max(s1, -shape2.x + 100. * E);
// //     }

// //     vec2 res = (shape1.x < shape2.x ? shape1 : shape2);
// //     res = (res.x < extra.x ? res : extra);
// //     return res;
// // }

// // vec3 norm(vec3 p) {
// //     vec2 e = vec2(E, 0);
// //     return normalize(vec3(dist(p + e.xyy).x - dist(p - e.xyy).x, dist(p + e.yxy).x - dist(p - e.yxy).x, dist(p + e.yyx).x - dist(p - e.yyx).x));
// // }

// void main() {
//     // gl_FragColor = texture2D(backbuffer, uv * .5 + .5);
//     // gl_FragColor = vec4(1,0,.5,1);
//     if(tick < AA * AA) {
//         vec2 uv_ = uv * vec2(1, -1) + 4. * vec2(mod(tick, AA), floor(tick / AA)) / AA / u_res;
//         uv_ = uv_ / dot(uv_, uv_);
//         uv_ = mod(uv_, arr[100]);
//         gl_FragColor = vec4(vec3(length(uv_)), 1);
//         gl_FragColor = mix(texture2D(backbuffer, uv * vec2(1, -1) * .5 + .5), gl_FragColor, 1. / (tick + 1.));
//         // gl_FragColor = mix(texture2D(backbuffer, uv*vec2(1,-1) * .5 + .5), gl_FragColor, 1.);
//     } else {
//         gl_FragColor = texture2D(backbuffer, (uv * vec2(1, -1) * .5 + .5));
//     }
//     // if(mod(tick, 2.) == .0) {
//     //     gl_FragColor.rgb = 1. - gl_FragColor.rgb;
//     // }
//     // int inside = 0;
//     // float d, e = 1., i, j, gl;
//     // vec3 p, rd = normalize(vec3(uv, 5)), ro = vec3(0, 0, -16. - 20. * R(40.));
//     // // vec3 p, rd = vec3(0, 0, 1), ro = vec3(uv * 3., -4);
//     // vec2 rm;
//     // float okoeff = 0.;

//     //     // повторим несколько раз, пока или расстояние или число шагов не выйдет за пределы дозволенного.
//     // for(float k = 0.; k < 4.; k++) {
//     //     d = 0.;
//     //     for(float i = 0.; i < RM_STEPS; i++) {
//     //         p = rd * d + ro;
//     //         rm = dist(p);
//     //         e = rm.x;
//     //         if(abs(e) < E || d > MAXD)
//     //             break;
//     //         j = i;
//     //         d += abs(e);
//     //         // if(inside == 0) O[0] += .001*abs(e),okoeff+=.001; else O[1]+=.1*abs(e),okoeff+=.1;
//     //     }

//     //     // каждый раз после реймаршинга что-то делаем с цветом. 
//     //     // каждое преломление или отражение должно что-то менять.
//     //     vec3 n = norm(p);
//     //     float dt = dot(n, vec3(1, 1, -1)) * .5 + .5;

//     //     // МОЛОКО
//     //     if(e > E || d > MAXD) {
//     //         // O.rgb += normalize(cross(rd, normalize(vec3(R(1.),R(3.),R(2.))*2.-1.)))*.5+.5;
//     //         vec3 rd_ = rd;
//     //         rd_.xy *= rot(R(30.) * PI2);
//     //         rd_.xz *= rot(R(31.) * PI2);
//     //         rd_.xz *= rot(R(.33) * sin(rd_.y * 20. * R(.44)));
//     //         // O.rgb += (rd_ * .5 + .5);// * pow(abs(R(99.)*2.-1.), .1);
//     //         O.rgb += hsv(R(.44)+length(uv)*.05,R(.55)*R(.55)*.8,.9);// * pow(abs(R(99.)*2.-1.), .1);
//     //         okoeff++;
//     //         break;
//     //     } else 

//     //     // МАТОВЫЙ
//     //     if(rm.y < 100.) {
//     //         float phong = (dot(n, vec3(1, 1, -1)) * .5 + .5);
//     //         if(rm.y == PHONG_RAINBOW) {
//     //             O.rgb += phong * hsv(.3 * dot(n, vec3(0, 0, 1)) - R(2.), 1., 1.);
//     //         } else if(rm.y == PHONG_NORMAL) {
//     //             O.rgb += phong * vec3(-n) * .5 + .5;
//     //         } else if(rm.y == PHONG_PRIDE) {
//     //             p.xz *= rot(t - 2.);
//     //             p.xy *= rot(.785);//R(4.));
//     //             O.rgb += 1. * phong * hsv(length(p.xz) * R(4.), 1., 1.);
//     //         } else {
//     //             O += .5 * phong;
//     //             break;
//     //         }
//     //         okoeff++;
//     //         break;
//     //     }

//     //     // ПРОЗРАЧНЫЙ
//     //     else if(rm.y < 200.) {
//     //         if(inside == 0) {
//     //             O += 4. * pow(dot(n, normalize(vec3(1, 1, -2))), 100.);
//     //             O += 4. * pow(dot(n, normalize(vec3(.5, 1.3, -2))), 800.);
//     //             O += pow(1. - dot(rd, -n), 2.);
//     //             rd = refract(rd, n, .8);
//     //             ro = p + 30. * E * n * -1.;
//     //         } else {
//     //             // rd = refract(rd, -n, .8);
//     //             ro = p + 30. * E * n * 1.;
//     //             O.rgb += R(21.) * .5 * d * hsv(R(20.), 1., pow(R(22.), .1));
//     //             okoeff += R(21.) * .5 * d;
//     //         }

//     //         inside = 1 - inside;
//     //     }

//     //     // ЗЕРКАЛЬНЫЙ
//     //     else if(rm.y < 300.) {
//     //         O -= .5;
//     //         // float phong = (dot(n, vec3(1, 1, -1)) * .5 + .5);
//     //         // O.rgb += phong * hsv((dot(n, rd) + length(p.xz)) * .3 - R(2.), 1., 1.);
//     //         // okoeff++;
//     //         // okoeff += .3;
//     //         rd = reflect(rd, n);
//     //         ro = p + 2. * E * n * sign(dot(rd, n));
//     //     }

//     //         // // if(d < 30.) {
//     //         // float r = R;
//     //         // pp.xy += wob(p.xy) * r * .1;
//     //         // pp.xz += wob(p.xz) * r * .1;
//     //         // if(rm.y == 0.)
//     //         //     gl_FragColor.rgb += hsv(pow(R, 8.) * dot(pp, vec3(1)) + R, 1., 1.);
//     //         // else
//     //         //     gl_FragColor.rgb += hsv(R, 1., 1.);

//     //         // gl_FragColor *= dot(vec3(-1), n);
//     //         // // }
//     // }

//     //     // if(rnd(seed + 8.) < .1)
//     //     //     gl_FragColor.rgb = 1. - gl_FragColor.rgb;

//     // O /= okoeff;

//     // // O-=O;
//     // // O+=1./d;
//     // O.a = 1.;
// }