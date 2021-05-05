#version 300 es
precision mediump float;
out vec4 outColor;

precision highp float;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;
uniform sampler2D matcap;

#pragma glslify: box = require('glsl-sdf-box') 

mat2 rot(float a) {
  float s = sin(a), c = cos(a);
  return mat2(c, -s, s, c);
}

vec2 sdf(vec3 p) {

  vec3 pw = p;
  if(pw.x + pw.y < 0.)
    pw.xy *= -1.;
  if(pw.x < pw.y)
    pw.xy = pw.yx;
  pw.x -= .6;
  pw.y = 0.;
  float b1 = box(pw - vec3(.05, 0, .95), vec3(.05));
  pw.x = min(pw.x, .1);
  float b2 = box(pw - vec3(.5, 0, .5), vec3(.4));
  float win = min(b1, b2);

  float onion = length(p) - .35;
  // onion = max(sin(onion * 6.)*.1, onion);
  onion = abs(onion) - .02;

  // p.z -= .3;

  vec3 pf = p*2.;
  float s = 2.;
  float fr = 1000.;
  for(int j = 4; j >= 1; j--) {
    pf = abs(pf);
    pf -= .4;
    pf *= 2.;
    s *= 2.;
    pf.xy *= rot(1. + time * .1 / float(j) + 6. * mouse.x);
    pf.xz *= rot(1. + time * .1 / float(j) + 6. * mouse.y);
    // if(p.z<p.x)p.zx=p.xz;
    // if(p.y<p.z)p.yz=p.zy;
    // if(p.x<p.y)p.xy=p.yx;
  }
  // fr = (length(p)-.5)/s;
  fr = (length(vec2(length(pf.xy) - .8, pf.z)) - .3) / s;
  fr = length(vec2(fr, onion)) - .01;
  fr *= .5;

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
  vec3 rayDir = vec3(uv, 2.+.55);
  rayDir = normalize(rayDir);
  for(i = .0; i < 99. && abs(e) > .001; i++) {
    p = rayDir * d;
    p.z -= 1.5+.48;
    // p.xz *= rot(-mouse.x * .1 + .05);
    // p.xz *= rot(mouse.y * .2 - .1);
    rm = sdf(p);
    d += e = rm.x;
  }

  // float col;

  if(d < 10.) {
    if(rm.y == 0.)
      outColor.rgb += 4. / i * length(fract(p * 10.) + .05);
      outColor.rgb -= (int(p.x * 160.) ^ int(p.y * 160.) ^ int(p.z * 160.) ^ int(time*8.)) % 9 == 0 ? .04 : 0.;
      // outColor.rgb += (p * .5 + .5) * length(fract(p * 10.) + .05);
    if(rm.y == 1.) {
    // vec2 phong;
    // vec3 n = norm(p);
    // n.y *= -1.;
    // // phong.x = -dot(rayDir.xz, n.xz);
    // // phong.y = -dot(rayDir.yz, n.yz);
    // // phong = normalize(phong;
    // // outColor.rgb = texture(matcap, phong*.5+.5).rgb;
    // // outColor.r += phong.x;
    // // outColor.g += phong.y;
    // // outColor.b += 1.;
    // outColor.rgb = texture(matcap, normalize(n).xy*.48+.5).rgb;
      outColor += smoothstep(40., -5., i);
    }
  } else {
    outColor += (int(uv.x * 256.) ^ int(uv.y * 256.)) % 99 == int(fract(time * 1.) * 100.) ? .5 : 0.;
  }
  // vec2 uvBg = abs(uv);
  // if(uvBg.x < uvBg.y)
  //   uvBg = uvBg.yx;
  // float bg = sin(uvBg.x * 400. / (uvBg.x - .1) + time * 10.) * .5 + .5;
  // bg *= smoothstep(.9, .95, bg);
  // bg *= uvBg.x * uvBg.x * uvBg.x;
  // bg = clamp(bg, 0., 1.);
  // bg *= .25;

  // float shapeAlpha = smoothstep(50., 30., i);
  // outColor.rgb += mix(vec3(uv,1), vec3(col), shapeAlpha) * 1.2;

  //  += col;
  outColor.a = 1.;
}