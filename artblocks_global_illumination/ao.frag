precision highp float;
varying vec2 uv;
uniform float t;
uniform float tick;
// uniform float seed;
uniform float gridSize;
uniform int blocksNumber;
// uniform float arr[1024];
uniform vec3 positions[340];
uniform vec3 bgColor;
uniform vec3 sizes[340];
uniform vec3 colors[340];
// uniform float posf[5];
// uniform vec3 arr3[1021];
// uniform vec3 arr_[10];
uniform vec2 m;
uniform vec2 u_res;
uniform sampler2D backbuffer;
#define PI 3.1415

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

vec4 dist(vec3 p) {
    // p.xz *= rot(t);
    vec3 col;
    float sp = 999.;
    for(int i = 0; i < 340; i++) {
        if(i >= blocksNumber)
            break;
        vec3 pb = p;
        pb += gridSize / 2.;
        pb -= positions[i];
        pb -= sizes[i] / 2.;
        // float box = max(abs(pb.z) - 1., max(abs(pb.x) - 1., abs(pb.y) - 1.));
        float cornerR = .05;
        // pb = abs(pb);
        // float box = (pb.x+pb.y+pb.z-cornerR)*0.57735027;// TODO заменить на бивел от Гази
        float box = length(pb - clamp(pb, -sizes[i] / 2. + cornerR, sizes[i] / 2. - cornerR)) - cornerR;
        // pb.xz =mod(pb.xz,2.)-1.;
        // pb.xz = pb.xz - 1. * clamp(ceil(p.xz / 1.), - sizes[i].xz, sizes[i].xz);
        vec2 l = sizes[i].xz;
        pb.xz += (l - 1.) / 2.;
        pb.xz = pb.xz - clamp(floor(pb.xz+.5), vec2(0.), l - 1.);
        float h=.2;
        float stud = max(length(pb.xz) - .28, abs(pb.y - sizes[i].y/2.-h) - h/2.);
        float res=min(stud,box);

        if(res<sp){
            sp=res;
            col=colors[i];
        }
    }
    return vec4(sp,col);
}

// vec3 norm(vec3 p) {
//     vec2 e = vec2(.01, 0.);
//     return normalize(vec3(dist(p + e.xyy) - dist(p - e.xyy), dist(p + e.yxy) - dist(p - e.yxy), dist(p + e.yyx) - dist(p - e.yyx)));
// }

void main() {
    float d = 0., e, j;
    vec4 rm;
    vec3 p, rd = normalize(vec3(0, 0, 1.));
    for(float i = 0.; i < 99.; i++) {
        j = i;
        p = d * rd + vec3(uv * 7., 0);
        p.z -= 20.;
        p.yz *= rot(PI / 4.);
        // p.xz*=rot(t);
        p.xz *= rot(PI / 4.);
        rm = dist(p);
        d += e = rm.x;
        if(e < .001)
            break;
    }
    // gl_FragColor = vec4(vec3(dot(norm(p) * .8 + .2, vec3(1.))), 1.);
    gl_FragColor = vec4(vec3(10. / j)*rm.yzw/255., 1.);
    if(j>=98.){
        gl_FragColor.rgb=bgColor/255.;
    }
}