precision highp float;
varying vec2 uv;
uniform float t;
uniform float tick;
// uniform float seed;
uniform float gridSize;
uniform int blocksNumber;
// uniform float arr[1024];
uniform vec3 positions[300];
uniform vec3 bgColor;
uniform vec3 sizes[300];
uniform vec3 colors[300];
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

#define rnd(x) fract(54321.987 * sin(987.12345 * x))

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
        // pb += gridSize / 2.;
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
        pb.xz = pb.xz - clamp(floor(pb.xz + .5), vec2(0.), l - 1.);
        float h = .27;
        float stud = max(length(pb.xz) - .28, abs(pb.y - sizes[i].y / 2. - h / 2.) - h / 2.);
        float res = min(stud, box);

        if(res < sp) {
            sp = res;
            col = colors[i];
        }
    }
    return vec4(sp, col);
}

vec3 norm(vec3 p) {
    vec2 e = vec2(.01, 0.);
    return normalize(vec3(dist(p + e.xyy).x - dist(p - e.xyy).x, dist(p + e.yxy).x - dist(p - e.yxy).x, dist(p + e.yyx).x - dist(p - e.yyx).x));
}

vec2 random2f() {
    vec2 rn = vec2(rnd(length(uv) - t), rnd(length(uv) - t - .1));
    // rn = pow(4.0 * rn * (1.0 - rn), vec2(4)); // the bell shape
    // rn = tan((rn-.5)*PI)/15.+.5;
    float k = .5;
    vec2 a;
    a.x = .5*pow(2.0*((rn.x<0.5)?rn.x:1.0-rn.x), k);
    a.y = .5*pow(2.0*((rn.y<0.5)?rn.y:1.0-rn.y), k);
    rn.x = (rn.x<0.5)?a.x:1.0-a.x;
    rn.y = (rn.y<0.5)?a.y:1.0-a.y;

    return rn * 2. - 1.;
}

void main() {
    float skipLines = 1.;
    if(mod(gl_FragCoord.x + tick, skipLines) > 1.) {
        gl_FragColor = texture2D(backbuffer, (uv * vec2(1, -1) * .5 + .5));
        return;
    }
    float d = 0., e, j;
    vec4 rm;
    float camDist = 40.;
    float focusDistance = camDist - 5.;
    float blurAmount = .8;
    vec2 uv_=uv+random2f()*2./u_res;
    vec3 p, ro = vec3(uv_ * 8., 0);
    vec3 focus = ro + vec3(0, 0, focusDistance);
    ro.xy += blurAmount * normalize(random2f())*rnd(length(uv_)-t-.2);
    vec3 rd = normalize(focus - ro);

    for(float i = 0.; i < 99.; i++) {
        j = i;
        p = d * rd + ro;
        p.z -= camDist;
        p.yz *= rot(PI / 4.);
        // p.xz *= rot(PI / 4.);
        rm = dist(p);
        d += e = rm.x;
        if(e < .001)
            break;
    }
    // gl_FragColor = vec4(vec3(10. / j) * rm.yzw / 255., 1.);
    gl_FragColor = vec4(vec3(vec3(10. / j) * dot(norm(p) * .8 + .2, vec3(1, 1, 0)) * .5 + .5) * rm.yzw / 255., 1.);
    if(j >= 98.) {
        gl_FragColor.rgb = bgColor / 255.;
    }

    // if(tick < AA * AA) {
    gl_FragColor = mix(texture2D(backbuffer, uv * vec2(1, -1) * .5 + .5), gl_FragColor, 1. / (floor(tick / skipLines) + 1.));
        // gl_FragColor = mix(texture2D(backbuffer, uv*vec2(1,-1) * .5 + .5), gl_FragColor, 1.);
    // } else {
        // gl_FragColor = texture2D(backbuffer, (uv * vec2(1, -1) * .5 + .5));
    // }

}