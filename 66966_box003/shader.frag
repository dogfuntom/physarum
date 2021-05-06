#version 300 es
precision mediump float;
out vec4 outColor;

precision highp float;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;

#pragma glslify: crystall = require('../modules/sdf/crystall')
#define rnd(x) fract(54321.987 * sin(987.12345 * x))

mat2 rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);}

float sdf(vec3 p) {
  p.z += .002 * (rnd((length(p + vec3(1,2,3)))) * 2. - 1.);
  p.zy *= rot(1. + time * .1 + 10. * mouse.y);
  p.xz *= rot(1. + time * .1 - 10. * mouse.x);
  return crystall(p, time * .1) * .99;
}

void main(){
    vec2 uv = (gl_FragCoord.xy * 2. - resolution) / resolution.y;
  vec3 p;
  float d=0., e=1., i;
  vec3 rayDir = vec3(uv, 1.5);
  rayDir = normalize(rayDir);
  for(i=.0; i<99. && e>.001; i++){
    p = rayDir * d;
    p.z -= 3.;
    // p.xz *= rot();
    d += e = sdf(p);
  }

  // i += rnd(vec2(length(p))) * 2. - 1.;
  float col = 3. / i;// * ((int(p.x*100.) ^ int(p.y*100.) ^ int(p.z*100.)) % int(i) == 0 ? .8 : 1.);

  vec2 uvBg = abs(uv);
  if(uvBg.x < uvBg.y) uvBg = uvBg.yx;
  float bg = sin(uvBg.x * 400. / (uvBg.x-.1) + time*10.)*.5+.5;
  bg *= smoothstep(.9, .95, bg);
  bg *= uvBg.x*uvBg.x*uvBg.x;
  bg = clamp(bg, 0., 1.);
  bg *= .25;
  
  float shapeAlpha = smoothstep(50., 30., i);
  outColor.rgb += mix(bg, col, shapeAlpha);
  outColor.a = 1.;
}