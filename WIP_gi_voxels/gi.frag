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

float tex;
vec3 col;

mat3 rotate3D(float angle, vec3 axis) {
    vec3 a = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float r = 1.0 - c;
    return mat3(a.x * a.x * r + c, a.y * a.x * r + a.z * s, a.z * a.x * r - a.y * s, a.x * a.y * r - a.z * s, a.y * a.y * r + c, a.z * a.y * r + a.x * s, a.x * a.z * r + a.y * s, a.y * a.z * r - a.x * s, a.z * a.z * r + c);
}

float dist(vec3 p) {
  // p = floor(p)+.5;
  // p.xy *= rot(time);
    tex = 0.;
    // col = vec3(0);
    vec3 pI = p;
  // p.z += 3.;
  // p.xy = abs(p.xy);
  // if(p.x>p.y) p.xy=p.yx;

    float res = p.y+2.;
    // p.xz = mod(p.xz + 5., 10.) - 5.;
    // float ball = length(p) - 3.;
    // res = min(res, ball);
    p = pI;

    // p.y += 2.;
    // p.xz = mod(p.xz, 10.)-5.;
    p.xz = abs(p.xz);
    if(p.x>p.z) p.xz=p.zx;
    res = min(res, abs(length(p)-3.) - rnd(dot(p, vec3(2,3,u_params[0]))));

    // res = min(res, length(p)-3.);

    // p = pI;
    // ivec3 pi = ivec3(p-.5);
    // float bitWise = 999.;
    // // if((pi.x ^ pi.z) % (3-pi.y)==0 && pi.y <= 8) bitWise = -.1;
    // if((pi.x ^ pi.z ^ pi.y) % 9 == 0 && pi.y <= 8) bitWise = -.1;
    // // else bitWise = 999.;
    // // res = min(res, bitWise);

    // if(bitWise < res){
    //   res = bitWise;
    //   if(rnd(length(floor(p+100.)+.5)) < .01){
    //     col = vec3(100);
    //     return p.x;
    //   }
    // }

    // p = pI;
    // float plane = length(p + vec3(0, 0, 100)) - 100.;
    // res = min(plane, ball);

    // vec3 lightPos = vec3(8, 8, -8);
    // p.xz -= lightPos.xz;
    // float lightId = p.x;
    // // lightPos.xy *= rot(u_time/10.);
    // // float lightId = sign(p.x);
    // p.y -= 7.;
    // p.x = abs(p.x);
    // if(p.x<p.y)p.xy=p.yx;
    // p.x -= 3.;
    // float light = length(p.xz-.5) - 1.+.5;
    // if(light < 0.) {
    //     tex = 1.;
    //     // res = light;
    //     // if(lightId>0.) col.r=1.;
    //     // else col.b=1.;
    //     // col = mix(vec3(1,0,0),vec3(0,0,1),lightId+.5) * 10.;
    //     col = (col + mix(vec3(1,0,0),vec3(0,0,1),lightId+.5) * 10.);
    // // return 0.;
    // }

    p = pI;
    p = abs(p);
    float sky = 30.-p.y;
    if(sky < .0) {
        tex = 1.;
        res = sky;
        // directional light
        // if(dot(normalize(pI),vec3(0,1,0)) > .85)
          col = vec3(10);
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
    vec3 rd = (vec3(0, 0, 1)), ro, p, pf;
    ro.xy = uv * 16.;// * rot(.26); // PI/12, 
    ro.z = -10.;
    // vec3 rd = (vec3(uv, 1)), ro, p, pf;
    // ro = vec3(0,0,-10);
    rd.yz *= rot(atan(1./sqrt(2.)));
    ro.yz *= rot(atan(1./sqrt(2.)));
    rd.xz *= rot(3.1415/4.);
    ro.xz *= rot(3.1415/4.);
    // mat3 rt = rotate3D(3.1415 / 2. - atan(1. / sqrt(2.)), vec3(-1, 1, 0));
  // rd.xy*=rot(time);
  // ro.xy*=rot(time);

  // vec2 uv = (gl_FragCoord.xy-u_resolution*.5)/u_resolution.y;
    vec3 n;
    for(; s++ < 4.;) {
        d = 0.;
        for(i = 0.; i++ < 50.;) {
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
            // if(rnd(length(p)+length(uv)+u_time) < .000000001) {
            //   ro=p;
            //   d=0.;
            // rd.x = (rnd(length(uv) + length(uv) + u_time + .1) * 2. - 1.);
            // rd.y = (rnd(length(uv) + length(uv) + u_time + .2) * 2. - 1.);
            // rd.z = (rnd(length(uv) + length(uv) + u_time + .3) * 2. - 1.);
            // rd = normalize(rd);

            // }
        }
    // light
    // normal
    // n=norm(p);
    // 
        if(tex > 0.) {
            // l = .0001;
            // l = 1.;
            // col += 10.;
            // break;
        } else {
            rd=reflect(rd,n);
            // rd = -n;
            rd.x += (rnd(length(uv) + u_frame + .0) * 2. - 1.) * .9;
            rd.y += (rnd(length(uv) + u_frame + .1) * 2. - 1.) * .9;
            rd.z += (rnd(length(uv) + u_frame + .2) * 2. - 1.) * .9;
      // rd += (rnd(length(uv)+u_frame+vec3(0,1,2))*.5+.5) * .4;
            rd = normalize(rd);
            ro = p - n * .01;
      // col += n*.5+.5;
        }
    }
    
    // o+=mix(texture(backbuffer,gl_FragCoord.xy/u_resolution),p.xyzz/length(p)*.5+.5,1./(u_frame+4.));
    // o.rgb += smoothstep(20.,0.,d)*fract(p);
    o+=mix(texture(backbuffer,gl_FragCoord.xy/u_resolution),vec4(col.rgbb/(s-1.)),1./(u_frame+10.));

    // for testing the texture bit size
    // o += texture(backbuffer,gl_FragCoord.xy/u_resolution) + l / (s - 1.);

    // o.rgb = col/(s) / 2.;//*.5+.5;


  // o = vec4(1,0,0,1);
}