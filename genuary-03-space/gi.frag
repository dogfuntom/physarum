#version 300 es
precision highp float;
uniform vec2 u_resolution;
uniform vec2 mouse;
uniform float u_time;
uniform float u_frame;
uniform float u_params[10];
uniform sampler2D backbuffer;
uniform sampler2D u_tex_voxels;
#define rnd(x) fract(54321.987 * sin(987.12345 * x + .1))
#define rot(a) mat2(cos(a),-sin(a),sin(a),cos(a))
#define PI 3.141519265

out vec4 o;

#define color(c) (c-cos((c + off) * 2. * 3.1415) * mul + add)
vec3 off = vec3(.0, .1, .2);
vec3 mul = vec3(.5, .5, .5);
vec3 add = vec3(.5, .5, .5);

float tex;
float id = 0.;
int type = 0;
vec3 col = vec3(1);

mat3 rotate3D(float angle, vec3 axis) {
    vec3 a = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float r = 1.0 - c;
    return mat3(a.x * a.x * r + c, a.y * a.x * r + a.z * s, a.z * a.x * r - a.y * s, a.x * a.y * r - a.z * s, a.y * a.y * r + c, a.z * a.y * r + a.x * s, a.x * a.z * r + a.y * s, a.y * a.z * r - a.x * s, a.z * a.z * r + c);
}

float sdfVoxel(vec3 p) {
    // p.z = abs(p.z);
    id = 0.;
    // float texture = step(.5, fract(p.y * 8.) - .25);
    p = floor(p);
    // vec3 pI = p;

    vec3 pTex = p + 128. / 2.;
    vec2 uvTex = vec2(pTex.x, pTex.y + 128. * pTex.z) / vec2(128., 128. * 128.);
    vec4 tx = texture(u_tex_voxels, uvTex);
    type = int(tx.r * 255.);
    tex = tx.g;

    // float res = p.y;//texture(u_tex_voxels, uvTex).r;
    float res = .5 - step(1e-4, tx.r);
    // p = pI;

    // p.xz = abs(p.xz);
    // if(p.x < p.z)
    //     p.xz = p.zx;
    // float thing = abs(length(p) - 2.) - rnd(dot(p, vec3(2, 3, u_params[0]))) - u_params[2] * .2 - abs(dot(sin(p / u_params[4] - u_params[3] * 99.), cos(p.zxy / u_params[4] - u_params[4] * 99.)));
    // if(thing < res && p.y > -2.) {
    //     id = rnd(dot(p, vec3(2, 3, u_params[1])));
    //     res = thing;
    // }

    return res;
}

float sdf(vec3 p) {
    // p.z = abs(p.z);
    float res;
    // switch(type) {
    //     case 4:
    //         vec3 pp = p;
    //         // pp.x = abs(pp.x);
    //         // res = max(res, dot(pp, -normalize(cross(vec3(1,-1,1)-vec3(1,-1,-1), vec3(0,1,-1)-vec3(1,-1,-1))))) - .2236;
    //         // // return dot(p, vec3(1,0,0));
    //         // // return length(p) - .5;

    //         // pp.xz = abs(pp.xz);
    //         // if(pp.x < pp.z) pp.xz = pp.zx;
    //         pp.xy *= rot(-atan(1. / 2.));
    //         res = pp.x - .2236;

    //     case 3:
    // }
    vec3 s = vec3(.5);
    res = length(p - clamp(p, -s, s)) - .001;
    return res;
}

vec3 norm(vec3 p) {
    float d = sdf(p);
    vec2 e = vec2(.001, 0);
    return normalize(vec3(d - sdf(p - e.xyy), d - sdf(p - e.yxy), d - sdf(p - e.yyx)));
}

vec3 getLight(vec3 p) {
    if(length(p.zy) < 50.) {
        if(p.x > 20.)
            return vec3(6, 2, 2);
        if(p.x < -20.)
            return vec3(1, 1, 2);
    }
    return vec3(0);
}

void main() {
    float i, d, e, s, l;

    vec2 uv = (gl_FragCoord.xy + rnd(length(mod(vec3(gl_FragCoord.xy, u_time), 3.141592))) - .5 - u_resolution * .5) / u_resolution.y + .001;
    // vec2 uv = (gl_FragCoord.xy - u_resolution * .5) / u_resolution.y + .001;
    // vec3 rd = (vec3(0, 0, 1)), ro, p;
    // ro.xz = uv * 32.;
    // // vec3 rd = (vec3(uv, 1)), ro, p;
    // // ro = vec3(0,0,-20);
    // rd.yz *= rot(atan(1. / sqrt(2.)));
    // // ro.yz *= rot(atan(1. / sqrt(2.)));
    // rd.xz *= rot(3.1415 / 4.);
    // ro.xz *= rot(3.1415 / 4.);
    // // ro.y = 20.;
    // // ro.y *= .5;

    vec3 rd = (vec3(0, 0, 1)), ro = vec3(uv * 16. * rot(PI / 4.), -20.), p;
    mat3 rt = rotate3D(-atan(1. / sqrt(2.)), vec3(-1, 1, 0));
    vec3 light;
    rd *= rt;
    ro *= rt;
    // rd.xy*=rot(t);
    // ro.xy*=rot(t);

    vec3 n;
    for(; s++ < 6.;) {
        d = 0.;
        for(i = 0.; i++ < 100.;) {
            p = ro + rd * d;
            vec3 dp = (step(0., rd) - fract(p)) / rd;
            float dpmin;

            dpmin = min(min(dp.x, dp.y), dp.z) + 1e-4;

            bool breaker = false;
            if(sdfVoxel(p) < 0.) {
                float ddd = 0.;
                for(float backupI; backupI++ < 100.;) {
                    p = ro + rd * (d + ddd);
                    ddd += e = sdf(fract(p) - .5);
                    if(e < .001 || ++i > 100.) { // налетели на сферу
                        n = norm(fract(p) - .5);
                        col *= color(tex);
                        // if(id > 0.)
                            // col *= n+.5;
                        // if(s > 1.)
                        //     col *= .6;
                        dpmin = ddd;
                        breaker = true;
                        break;
                    }
                    if(ddd > dpmin) { // улетели в соседнюю клетку
                        break;
                    }
                }
            }

            d += dpmin;

            if(breaker == true)
                break;

        }
        if(d > 60.) {
            break;
        }
        light = getLight(p);
        if(length(light) > 0.) {
            break;
        } else {
            rd = reflect(rd, n);
            rd.x += (rnd(length(uv) + u_frame + .0) * 2. - 1.) * .8;
            rd.y += (rnd(length(uv) + u_frame + .1) * 2. - 1.) * .8;
            rd.z += (rnd(length(uv) + u_frame + .2) * 2. - 1.) * .8;
            rd = normalize(rd);
            ro = p + n * .001;
        }
    }
    col *= light;
    o += mix(texture(backbuffer, gl_FragCoord.xy / u_resolution), col.rgbb, 1. / (u_frame + 0.));
    // o += texture
}