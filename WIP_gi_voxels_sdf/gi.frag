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
vec3 col = vec3(1);

mat3 rotate3D(float angle, vec3 axis) {
    vec3 a = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float r = 1.0 - c;
    return mat3(a.x * a.x * r + c, a.y * a.x * r + a.z * s, a.z * a.x * r - a.y * s, a.x * a.y * r - a.z * s, a.y * a.y * r + c, a.z * a.y * r + a.x * s, a.x * a.z * r + a.y * s, a.y * a.z * r - a.x * s, a.z * a.z * r + c);
}

float dist(vec3 p) {
    float texture = step(.5,fract(p.y*8.)-.25);
    p = floor(p) + .5;
    vec3 pI = p;

    float res = 999.;//p.y+2.;
    p = pI;

    p.xz = abs(p.xz);
    if(p.x<p.z) p.xz=p.zx;
    float thing = abs(length(p)-2.) - rnd(dot(p, vec3(2,3,u_params[0]))) - u_params[2]*.2 - abs(dot(sin(p/u_params[4]-u_params[3] * 99.),cos(p.zxy/u_params[4]-u_params[4] * 99.)));
    if(thing < res && p.y > -2.){
      if(thing < 0.) {
        if(rnd(length(p))>.1)texture *= 0.;
        vec3 c = color(rnd(dot(p, vec3(2,texture+3.,u_params[1]))));
        col *= c;
      }
      res = thing;
    }

    return res;
}

vec3 norm(vec3 p) {
    float d = dist(p);
    vec2 e = vec2(.001, 0);
    return normalize(vec3(d - dist(p - e.xyy), d - dist(p - e.yxy), d - dist(p - e.yyx)));
}

void main() {
    float i, d, e, s, l;

    vec2 uv = (gl_FragCoord.xy - u_resolution * .5) / u_resolution.y + .001;
    vec3 rd = (vec3(0, 0, 1)), ro, p, pf;
    ro.xy = uv * 12.;// * rot(.26); // PI/12, 
    ro.z = -10.;
    // vec3 rd = (vec3(uv, 1)), ro, p, pf;
    // ro = vec3(0,0,-20);
    rd.yz *= rot(atan(1./sqrt(2.)));
    ro.yz *= rot(atan(1./sqrt(2.)));
    rd.xz *= rot(3.1415/4.);
    ro.xz *= rot(3.1415/4.);

    vec3 n;
    for(; s++ < 4.;) {
        d = 0.;
        for(i = 0.; i++ < 200.;) {
            p = ro + rd * d;

            vec3 dp = (step(0., rd) - fract(p)) / rd;
            float dpmin;

            if(dp.x < dp.y) {
                if(dp.x < dp.z) {
                    dpmin = dp.x;
                    n = vec3(sign(rd.x), 0, 0);
                } else {
                    dpmin= dp.z;
                    n = vec3(0, 0, sign(rd.z));
                }
            } else {
                if(dp.y < dp.z) {
                    dpmin= dp.y;
                    n = vec3(0, sign(rd.y), 0);
                } else {
                    dpmin= dp.z;
                    n = vec3(0, 0, sign(rd.z));
                }
            }
            dpmin += 1e-4;

            bool breaker = false;
            if(dist(p) < 0.) {
                break;
                o.g += 1.;
                // marching SDF
                float dd = 0.;
                // for(;;){
                //     p = ro + rd * (d + dd);
                //     d += e = length(fract(p) - .5) - .1;
                //     if(e<.001) { // налетели на сферу
                //         o.r += 1.; return;
                //         breaker = true;
                //         break;
                //     }
                //     if(++i>200.){ // кончились шаги, мы в черноте
                //         breaker = true;
                //         break;
                //     }
                //     if(dd>dpmin){ // улетели в соседнюю клетку
                //         break;
                //     }

                // }
            }
            if(breaker == true) break;
            break;

            d += dpmin;

        }
        if(p.y > 10.) {
            break;
        } else {
            rd=reflect(rd,n);
            rd.x += (rnd(length(uv) + u_frame + .0) * 2. - 1.) * .3;
            rd.y += (rnd(length(uv) + u_frame + .1) * 2. - 1.) * .3;
            rd.z += (rnd(length(uv) + u_frame + .2) * 2. - 1.) * .3;
            rd = normalize(rd);
            ro = p - n * .01;
        }
    }
    if(p.y > 10.) {}
    else {
      col *= 0.;
    }
    o+=mix(texture(backbuffer,gl_FragCoord.xy/u_resolution),col.rgbb,1./(u_frame+10.));
}