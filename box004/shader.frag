#version 300 es
precision mediump float;
out vec4 outColor;

precision highp float;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;

// #pragma glslify: crystall = require('../modules/sdf/crystall')
#define rnd(x) fract(54321.987 * sin(987.12345 * x))

mat2 rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);}

void main(){
  vec2 uv = (gl_FragCoord.xy * 2. - resolution)/resolution.y;
  vec3 p;float d,i,e=1.;
  for(;i++<50.&&e>.01;){
    p=d*(vec3(uv,1));p.z-=2.5;
    // p.xz*=rotate2D(t);
    float j,c=0.;
    float s = 1.;
    for(;j<7.;j++){
      p=abs(p);
      p-=.5;
      p.xz *= rot(time*.1371 + mouse.x * 6. + p.y);
      p.yx *= rot(time*.1 + mouse.y * 6. + p.x);
      p*=2.;
      s*=2.;
    }
    d+=e=(length(p)-1.)/s*.6;
  }
  float col = 3./.6/i;
  col = pow(col, 1.5);

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