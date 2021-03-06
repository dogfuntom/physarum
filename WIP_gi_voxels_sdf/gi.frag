#version 300 es
precision highp float;
uniform vec2 u_resolution;
uniform vec2 mouse;
uniform float u_time;
uniform float u_frame;
uniform float u_params[10];
uniform sampler2D backbuffer;
#define rnd(x) fract(54321.987 * sin(987.12345 * x + .1))
#define rot(a) mat2(cos(a),-sin(a),sin(a),cos(a))

out vec4 o;

#define color(c) (c-cos((c + off) * 2. * 3.1415) * mul + add)
vec3 off = vec3(.0, .7, .55);
vec3 mul = vec3(.5, .5, .5);
vec3 add = vec3(.5, .5, .5);

float tex;
float id = 0.;
vec3 col = vec3(1);

mat3 rotate3D(float angle, vec3 axis) {
    vec3 a = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float r = 1.0 - c;
    return mat3(a.x * a.x * r + c, a.y * a.x * r + a.z * s, a.z * a.x * r - a.y * s, a.x * a.y * r - a.z * s, a.y * a.y * r + c, a.z * a.y * r + a.x * s, a.x * a.z * r + a.y * s, a.y * a.z * r - a.x * s, a.z * a.z * r + c);
}

float sdfVoxel(vec3 p) {
    id = 0.;
    float texture = step(.5, fract(p.y * 8.) - .25);
    p = floor(p) + .5;
    vec3 pI = p;

    float res = p.y + 2.;
    p = pI;

    p.xz = abs(p.xz);
    if(p.x < p.z)
        p.xz = p.zx;
    float thing = abs(length(p) - 2.) - rnd(dot(p, vec3(2, 3, u_params[0]))) - u_params[2] * .2 - abs(dot(sin(p / u_params[4] - u_params[3] * 99.), cos(p.zxy / u_params[4] - u_params[4] * 99.)));
    if(thing < res && p.y > -2.) {
        id = rnd(dot(p, vec3(2, 3, u_params[1])));
        res = thing;
    }

    return res;
}

float sdf(vec3 p) {
    int sw = int(floor(rnd(id + u_params[0]) * 3.));
    switch(sw) {
        case 0:
            return length(p) - .5;
        case 1:
            return length(p - clamp(p, -.499, .499)) - 1e-5;
    }
    float r = floor(rnd(id + 3.) * 8.) / 8. / 4. + .0001;
    p = abs(p);
    p -= .5 - r;
    if(p.z < p.x)
        p.xz = p.zx;
    if(p.y > p.x)
        p.xy = p.yx;
    // p.xy -= .5-r;
    return length(p.xz) - r;
}

vec3 norm(vec3 p) {
    float d = sdf(p);
    vec2 e = vec2(.001, 0);
    return normalize(vec3(d - sdf(p - e.xyy), d - sdf(p - e.yxy), d - sdf(p - e.yyx)));
}

void main() {
    float i, d, e, s, l;

    vec2 uv = (gl_FragCoord.xy + rnd(dot(gl_FragCoord.xy, vec2(mod(u_time, 3.14), .1))) - .5 - u_resolution * .5) / u_resolution.y + .001;
    vec3 rd = (vec3(0, 0, 1)), ro, p, pf;
    ro.xy = uv * 12.;
    ro.z = -10.;
    // vec3 rd = (vec3(uv, 1)), ro, p, pf;
    // ro = vec3(0,0,-20);
    rd.yz *= rot(atan(1. / sqrt(2.)));
    ro.yz *= rot(atan(1. / sqrt(2.)));
    rd.xz *= rot(3.1415 / 4.);
    ro.xz *= rot(3.1415 / 4.);

    vec3 n;
    for(; s++ < 4.;) {
        d = 0.;
        for(i = 0.; i++ < 200.;) {
            p = ro + rd * d;
            vec3 dp = (step(0., rd) - fract(p)) / rd;
            float dpmin;

            dpmin = min(min(dp.x,dp.y),dp.z) + 1e-4;

            bool breaker = false;
            if(sdfVoxel(p) < 0.) {
                float ddd = 0.;
                for(float backupI; backupI++ < 200.;) {
                    p = ro + rd * (d + ddd);
                    ddd += e = sdf(fract(p) - .5);
                    if(e < .001 || ++i > 200.) { // ???????????????? ???? ??????????
                        n = norm(fract(p) - .5);
                        if(id > 0.)
                            col *= color(id);
                            // col *= n+.5;
                        // if(s > 1.)
                        //     col *= .6;
                        breaker = true;
                        break;
                    }
                    if(ddd > dpmin) { // ?????????????? ?? ???????????????? ????????????
                        break;
                    }
                }
            }
            if(breaker == true)
                break;

            d += dpmin;

        }
        if(p.y > 10.) {
            break;
        } else {
            rd = reflect(rd, n);
            rd.x += (rnd(length(uv) + u_frame + .0) * 2. - 1.) * rnd(id);
            rd.y += (rnd(length(uv) + u_frame + .1) * 2. - 1.) * rnd(id);
            rd.z += (rnd(length(uv) + u_frame + .2) * 2. - 1.) * rnd(id);
            rd = normalize(rd);
            ro = p + n * .01;
        }
    }
    if(p.y > 10.) { } else {
        col *= 0.;
    }
    o += mix(texture(backbuffer, gl_FragCoord.xy / u_resolution), col.rgbb, 1. / (u_frame + 1.));
}