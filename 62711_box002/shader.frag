#version 300 es
precision mediump float;
out vec4 outColor;

precision highp float;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;
// uniform sampler2D backbuffer;

mat2 rot(float a) {
  float s = sin(a), c = cos(a);
  return mat2(c, -s, s, c);
}

float sdf(vec3 p) {
  float s = 1.;
  float sdf;
  for(int j = 6; j >= 1; j--) {
    p.x = abs(p.x);
    p.xy *= rot(1. + time * .1 / float(j) + 10. * mouse.x);
    p.xz *= rot(1. + time * .1 / float(j) + 10. * mouse.y);
    // if(p.z<p.x)p.zx=p.xz;
    // if(p.y<p.z)p.yz=p.zy;
    // if(p.x<p.y)p.xy=p.yx;
    p = abs(p);
    p -= .5;
    p *= 2.;
    s *= 2.;
    if(j == 3)
      sdf = (length(p) - 1.4) / s;
  }
  sdf = max((length(vec2(length(p.xy)-1.1, p.z)) - .6) / s, -sdf);
  return sdf*.9;
}

void main() {
  vec2 uv = (gl_FragCoord.xy * 2. - resolution) / resolution.y;
  vec3 p;
  float d = 0., e = 1., i;
  vec3 rayDir = vec3(uv, 1.5);
  rayDir = normalize(rayDir);
  for(i = .0; i < 99. && abs(e) > .001; i++) {
    p = rayDir * d;
    p.z -= 3.;
    d += e = sdf(p);
  }

  float col = 3. / i;

  vec2 uvBg = abs(uv);
  if(uvBg.x < uvBg.y)
    uvBg = uvBg.yx;
  float bg = sin(uvBg.x * 400. / (uvBg.x - .1) + time * 10.) * .5 + .5;
  bg *= smoothstep(.9, .95, bg);
  bg *= uvBg.x * uvBg.x * uvBg.x;
  bg = clamp(bg, 0., 1.);
  bg *= .25;

  float shapeAlpha = smoothstep(50., 30., i);
  outColor.rgb += mix(bg, col, shapeAlpha) * 1.2;
  outColor.a = 1.;
}