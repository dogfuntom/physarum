#version 300 es
precision mediump float;
out vec4 outColor;

precision highp float;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;
uniform sampler2D matcap;

#pragma glslify: box = require('glsl-sdf-box') 
#pragma glslify: box = require('glsl-sdf-box') 

mat2 rot(float a) {
  float s = sin(a), c = cos(a);
  return mat2(c, -s, s, c);
}

vec2 mc(vec3 eye, vec3 normal) {
  vec3 reflected = reflect(eye, normal);
  float m = 2.8284271247461903 * sqrt(reflected.z + 1.0);
  return reflected.xy / m + 0.5;
}

vec2 sdf(vec3 p) {

  // // vec3 pw = p;
  // // if(pw.x + pw.y < 0.)
  // //   pw.xy *= -1.;
  // // if(pw.x < pw.y)
  // //   pw.xy = pw.yx;
  // // pw.x -= .6;
  // // pw.y = 0.;
  // // float b1 = box(pw - vec3(.05, 0, .95), vec3(.05));
  // // pw.x = min(pw.x, .1);
  // // float b2 = box(pw - vec3(.5, 0, .5), vec3(.4));
  float win;
  // // win = min(b1, b2);
  win = 999.;

  float onion = length(p) - .35;
  // onion = max(sin(onion * 6.)*.1, onion);
  onion = abs(onion) - .05;

  // // p.z -= .3;

  vec3 pf = p * 2.;
  float s = 2.;
  float fr = 1000.;
  for(int j = 2; j >= 1; j--) {
    pf = abs(pf);
    pf -= .3;
    pf.xy *= rot(1. + time * .1 / float(j) + 6. * mouse.x);
    pf.xz *= rot(1. + time * .1 / float(j) + 6. * mouse.y);
    pf *= 2.;
    s *= 2.;
    // if(p.z<p.x)p.zx=p.xz;
    // if(p.y<p.z)p.yz=p.zy;
    // if(p.x<p.y)p.xy=p.yx;
  }
  // fr = (length(p)-.5)/s;
  fr = (length(vec2(length(pf.xy) - .8, pf.z)) - .2) / s;
  fr = length(vec2(fr, onion)) - .02;
  fr *= .5;
  
  // float fr = length(p) - .5;

  if(win < fr) {
    return vec2(win, 0);
  } else {
    return vec2(fr, 1);
  }
}

vec3 norm(vec3 p) {
  vec2 e = vec2(.01, 0.);
  return normalize(vec3(sdf(p + e.xyy).x - sdf(p - e.xyy).x, sdf(p + e.yxy).x - sdf(p - e.yxy).x, sdf(p + e.yyx).x - sdf(p - e.yyx).x));
}

void main() {
  vec2 rm, uv = (gl_FragCoord.xy * 2. - resolution) / resolution.y;
  vec3 p;
  float d = 0., e = 1., i;
  vec3 rayDir = vec3(uv, 1.);
  vec3 ro = vec3(0, 0, -1.); //
  ro.xz *= rot(time);
  vec3 lookAt = vec3(0);

  vec3 f = normalize(lookAt - ro);
  vec3 r = cross(vec3(0.0, 1.0, 0.0), f);
  vec3 u = cross(f, r);
  vec3 c = ro + f * 1.;
  vec3 j = c + uv.x * r + uv.y * u;
  rayDir = j - ro;
  rayDir = normalize(rayDir);
  r = normalize(cross(vec3(0.0, 1.0, 0.0), rayDir));
  u = normalize(cross(rayDir, r));
  
  for(i = .0; i < 99. && e > .001; i++) {
    p = rayDir * d + ro;
    rm = sdf(p);
    d += e = rm.x;
  }
  if(rm.y == 0.) {
    outColor += 3. / i;
  } else {
    vec3 n = norm(p);

     vec2 matcapUV = vec2(dot(n, r), dot(n, u)) * .5 + .5;
    outColor.b = 1.;
    outColor.rgb = texture(matcap, matcapUV).rgb;
  }
  outColor.a = 1.;
}

// #define mc(p) vec3(p*.5+.5, 0)
// float i,d,e=1.;
// vec3 p;
// for(;i++<99.&&e>.01;){
//   p=vec3((FC.xy*2.-r)/r.y * d, d - 1.5);
//   d+=e=length(p)-1.;
// }
//o.rgb+=mc()*step(-10., -d);