#version 300 es
precision highp float;
uniform vec2 u_resolution;
uniform vec2 u_tex_res;
uniform sampler2D tex;
// uniform sampler2D backbuffer;
uniform float u_time;

out vec4 o;

void main() {
  vec2 uvN = gl_FragCoord.xy / u_resolution;
  o = texture(tex, uvN);
  // o.rg += uvN;
  o.a = 1.;
  // o = vec4(1,0,0,1);
}