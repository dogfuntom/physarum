precision mediump float;
// uniform vec2 u_res;
varying vec2 uv;
uniform float t;
uniform float seed;
uniform vec2 m;

// void main() {
//     // vec2 uv = gl_FragCoord.xy/u_res;
//   gl_FragColor = vec4(uv,1.,1.);
// }

float rnd(vec2 co) {
    return fract(sin(mod(dot(co, vec2(12.9898, 78.233)), 3.14)) * 43758.5453);
}
float rnd(float x) {
    return rnd(vec2(x));
}
// #define rnd(x) fract(54321.987 * sin(987.12345 * x))

#define rot(a) mat2(cos(a),sin(a),-sin(a),cos(a))

// #define PI (atan(1.)*4.)

// float map(vec3 p){
//   p.yz *= rot(-time);
//   p.xz *= rot(-time);
//   float s = 1.;
//   float d, dPrev, dPrePrev;
//   for(int i = 0; i< 5;i++) {
//     // int i = 0; //fixme
//     dPrePrev = dPrev;
//     dPrev = d;
//     p.xz *= rot(time-3.14/6. + float(i));
//     p.yz *= rot(time+3.14/6. + float(i));
//     p = abs(p);
//     p -= .4;
//     p *= 2.;
//     s *= 2.;
//     d = (length(vec2(length(p)-.9, p.z))-.4)/s;
//   }
//     // return length(vec2(length(p.xy)-.4,p.z))-.1;
//     return (length(vec2(d, dPrePrev))-.01)*.5;
// }

// void main(){
//     vec3 rd=normalize(vec3(uv,1));
//     vec3 p=vec3(0,0,-2);
//     float d=1.,j;
//     for(float i=0.;i<99.;i++){
//         p+=rd*(d=map(p));
//         j=i;
//         if(d<.001)break;
//     }
//     if(d<.001)gl_FragColor+=9./j;
//     gl_FragColor.a = 1.;
// }

vec3 hsv(float h, float s, float v) {
    vec4 t = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(vec3(h) + t.xyz) * 6.0 - vec3(t.w));
    return v * mix(vec3(t.x), clamp(p - vec3(t.x), 0.0, 1.0), s);
}

void main() {
    float ep, d, e = 1., i, j, s = 1., ss = 1., gl;
    vec3 p, pp;
    for(float i = 0.; i < 100.; i++) { // @zozuar 's style
        pp = p = vec3(uv * d, d - 10.);
        p.yz *= rot(-m.y * 4.);
        p.xz *= rot(m.x * 4.);
        ss = 3.;
        for(int j = 0; j < 5; j++) {
            // ep = length(p) / ss - .04;
            p = abs(p);
            p.y -= .2 + rnd(seed);
            p.xy *= rot(.2 + .4 * rnd(seed + 4.));
            s = 1. / clamp(dot(p, p), .0, 1.);
            p *= s;
            ss *= s;
            p -= vec3(rnd(seed + 1.), rnd(seed + 2.), rnd(seed + 3.));
            p.xyz = p.zxy;
        }

        gl += .05 * rnd(seed+5.) / length(p) / ss;
        d += e = length(p.xy) / ss - .01;
        j = i;
        if(e < .001)
            break;
    }
    gl_FragColor += gl;//pow(gl, 8.);
    if(d < 20.) {
        gl_FragColor.rgb += 20. / j * hsv(ep * 3., gl, 1.);
    } else {
        // gl_FragColor.rgb = vec3(rnd(seed + 1.), rnd(seed + 2.), rnd(seed + 3.));
    }
    gl_FragColor.a = 1.;
}