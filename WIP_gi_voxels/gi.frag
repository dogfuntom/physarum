#version 300 es
precision highp float;
uniform vec2 u_resolution;
uniform vec2 mouse;
uniform float time;
uniform float u_frame;
uniform sampler2D backbuffer;
#define rnd(x) fract(54321.987 * sin(987.12345 * x + .1))
#define rot(a) mat2(cos(a),-sin(a),sin(a),cos(a))

out vec4 o;

float tex;
vec3 col = vec3(0);

mat3 rotate3D(float angle, vec3 axis) {
    vec3 a = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float r = 1.0 - c;
    return mat3(a.x * a.x * r + c, a.y * a.x * r + a.z * s, a.z * a.x * r - a.y * s, a.x * a.y * r - a.z * s, a.y * a.y * r + c, a.z * a.y * r + a.x * s, a.x * a.z * r + a.y * s, a.y * a.z * r - a.x * s, a.z * a.z * r + c);
}

float dist(vec3 p) {
  // p.xy *= rot(time);
    tex = 0.;
    vec3 pI = p;
  // p.z += 3.;
  // p.xy = abs(p.xy);
  // if(p.x>p.y) p.xy=p.yx;

    float res;
    p.xy = mod(p.xy + 5., 10.) - 5.;
    p.z += 4.;
    p.x = abs(p.x);
  // p.x -= 2.5;
    float ball = length(p) - 3.;
    res = ball;
    p = pI;
  // p.z-=3.;
  // float plane = -p.z-0.;
    float plane = length(p - vec3(0, 0, 100)) - 100.;
    res = min(plane, ball);

    float light = length(p - vec3(0, 0, -40)) - 1.;
    if(light < res) {
        tex = 1.;
        res = light;
    // return 0.;
    }

    return res;
  // float res = abs(length(p)-3.)+3.*rnd(length(p*vec3(.1,1,10))+.1);
  // return res;
}

vec3 norm(vec3 p) {
    float d = dist(p);
    vec2 e = vec2(.001, 0);
    return normalize(vec3(d - dist(p - e.xyy), d - dist(p - e.yxy), d - dist(p - e.yyx)));
}

void main() {
    float i, d, e, s, l;

    vec2 uv = (gl_FragCoord.xy - u_resolution * .5) / u_resolution.y;
    vec3 rd = (vec3(0, 0, 1)), ro = vec3(uv * 40. * rot(-3.1415 / 4.), -20), p, pf;
    mat3 rt = rotate3D(-atan(1. / sqrt(2.)), vec3(-1, 1, 0));
    rd *= rt;
    ro *= rt;
  // rd.xy*=rot(time);
  // ro.xy*=rot(time);

  // vec2 uv = (gl_FragCoord.xy-u_resolution*.5)/u_resolution.y;
    vec3 n;
    for(; s++ < 5.;) {
        d = 0.;
        for(i = 0.; i++ < 100.;) {
            p = ro + rd * d;
            pf = p;
            pf = floor(pf) + .5;

            if(dist(pf) < 0.) {
                break;
            }

            vec3 dp = (step(0., rd) - fract(p)) / rd;

            if(dp.x < dp.y) {
                if(dp.x < dp.z) {
                    d += dp.x;
                    n = vec3(sign(rd.x), 0, 0);
                } else {
                    d += dp.z;
                    n = vec3(0, 0, sign(rd.z));
                }
            } else {
                if(dp.y < dp.z) {
                    d += dp.y;
                    n = vec3(0, sign(rd.y), 0);
                } else {
                    d += dp.z;
                    n = vec3(0, 0, sign(rd.z));
                }
            }
            d += 1e-4;
      // d+=min(min(dp.x,dp.y),dp.z)+1e-4;
        }
    // light
    // normal
    // n=norm(p);
    // 
    // rd=reflect(rd,n);
        if(tex > 0.) {
            // l = .001;
            l = 1.;
            col += 10.;
            break;
        } else {
            rd = -n;
            rd.x += (rnd(length(uv) + u_frame + .0) * 2. - 1.) * .2;
            rd.y += (rnd(length(uv) + u_frame + .1) * 2. - 1.) * .2;
            rd.z += (rnd(length(uv) + u_frame + .2) * 2. - 1.) * .2;
      // rd += (rnd(length(uv)+u_frame+vec3(0,1,2))*.5+.5) * .4;
            rd = normalize(rd);
            ro = p - n * .01;
      // col += n*.5+.5;
        }
    }
    
    o+=mix(texture(backbuffer,gl_FragCoord.xy/u_resolution),vec4(l/(s-1.)),1./(u_frame+1.));
    // o.rgb += smoothstep(20.,0.,d)*fract(p);

    // for testing the texture bit size
    // o += texture(backbuffer,gl_FragCoord.xy/u_resolution) + l / (s - 1.);

    // o.rgb = col/(s-1.);//*.5+.5;


    // o.r = sin(gl_FragCoord.x*.1);
}