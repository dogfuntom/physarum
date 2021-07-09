precision mediump float;
varying vec2 uv;
uniform float t;
uniform float seed;
uniform vec2 m;

float rnd(vec2 co) {
    return fract(sin(mod(dot(co, vec2(12.9898, 78.233)), 3.14)) * 43758.5453);
}
float rnd(float x) {
    return rnd(vec2(x));
}

#define rot(a) mat2(cos(a),sin(a),-sin(a),cos(a))

vec3 hsv(float h, float s, float v) {
    vec4 t = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(vec3(h) + t.xyz) * 6.0 - vec3(t.w));
    return v * mix(vec3(t.x), clamp(p - vec3(t.x), 0.0, 1.0), s);
}

void main() {
    float ep, d, e = 1., i, j, s = 1., ss = 1., gl;
    vec3 p, pp;
    for(float i = 0.; i < 100.; i++) {
        pp = p = vec3(uv * d, d - 11.);
        // p.yz *= rot(-m.y * 4.);
        // p.xz *= rot(m.x * 4.);
        if(rnd(seed + 12.) < .2)
            p.x = mod(p.x, 4.) - 2.;
        if(rnd(seed + 13.) < .2)
            p.y = mod(p.y, 4.) - 2.;
        ss = 3.;
        for(int j = 0; j < 999; j++) {
            p = abs(p);
            p.y -= 2. * rnd(seed);
            s = 1. / clamp(dot(p, p), .0, .4 + .2 * rnd(seed + 9.));
            p *= s;
            ss *= s;
            p -= 2. + .5 + .3 * vec3(rnd(seed + 1.), rnd(seed + 1.), 1. - rnd(seed + 1.)) + .05 * sin(t);
            // p.xy *= rot(m.x);
            p.xz *= rot(rnd(seed + 10. + float(j)) + .05 * cos(t));
            p.xyz = p.zxy;
            if(float(j)>3.*rnd(seed+15.)) break;
        }

        gl += .02/* * rnd(seed + 5.)*/ / length(p.xz);
        // if(rnd(seed + 7.) < .1)
        //     p.xyz = p.yzx;
        // else if(rnd(seed + 7.) < .4)
        //     p.xyz = p.zxy;
        d += e = length(p.xy) / ss;
        j = i;

        if(e < .03)
            break;
    }
    gl_FragColor += gl;//pow(gl, 8.);
    if(d < 30.) {
        gl_FragColor.rgb += 20. / j * hsv(j * .005 * rnd(seed + 11.) + rnd(seed + 6.), 1., 1.);
    } else {
        // gl_FragColor.rgb = vec3(rnd(seed + 1.), rnd(seed + 2.), rnd(seed + 3.));
    }
    if(rnd(seed + 8.) < .1)
        gl_FragColor.rgb = 1. - gl_FragColor.rgb;
    gl_FragColor.a = 1.;
}