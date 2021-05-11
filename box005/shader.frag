#version 300 es
precision mediump float;
out vec4 outColor;

precision highp float;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;

#define o outColor
#define FC gl_FragCoord
#define t time
#define res resolution
#define m mouse
#define rotate2D rot

// #pragma glslify: crystall = require('../modules/sdf/crystall')
#define rnd(x) fract(54321.987 * sin(987.12345 * x))

mat2 rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);}

void main(){
vec2 uv = (FC.xy*2.-res)/res.y;
float i,d,e=1.; 
vec2 mm = .6 + .5 * (vec2(sin(t*.0+5.*m.x), cos(t*.0+5.*m.x))*.5+.5) * .95;
for(vec3 p;i++<99.&&e>.001;){
  p=normalize(vec3(uv, 2.7)) * d;
  float cs = 1.;
  float pz = p.z;
  p.z-=1.5;
  float sp = length(p) - .4;
  p.zx *= rotate2D(t*.1);
  for(int j=0;j++<14;){
    p=abs(p);
    p-=vec3(m.x+.75,.5,m.y+.75);
    float dist = dot(p,p);
    float s = 2./clamp(dist, .1, 1.);
    cs *= s;
    p *= s;
  }
  d+=e=max(sp, (length(p)-.5)/cs);
}
  vec2 uvBg = abs(uv);
  if(uvBg.x < uvBg.y) uvBg = uvBg.yx;
  float bg = sin(uvBg.x * 400. / (uvBg.x-.1) + time*10.)*.5+.5;
  bg *= smoothstep(.9, .95, bg);
  bg *= uvBg.x*uvBg.x*uvBg.x;
  bg = clamp(bg, 0., 1.);
  bg *= .25;

  float shapeAlpha = smoothstep(50., 30., i);
  o.rgb += mix(bg, 3./i, shapeAlpha);
  o.a = 1.;
}