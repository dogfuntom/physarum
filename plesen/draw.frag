precision mediump float;
uniform vec2 u_resolution;
uniform vec2 u_tex_res;
uniform sampler2D tex;
uniform sampler2D backbuffer;
uniform float midi[64];
uniform float u_time;
uniform vec4 palette[5];

#define PI 3.1415

void main() {
  vec2 uv = gl_FragCoord.xy/u_resolution;
  vec2 d;
  float t = mod(floor(64.*(.5+.5*sin(u_time*.1 + uv.x*4.))), 64.);//mod(floor(u_time), 64.);
  d.x = 7.-mod(t, 8.);
  d.y = floor(t/8.);
  uv.y = 1.-uv.y;
  uv.x = 1.-uv.x;
  gl_FragColor = texture2D(tex, (uv+d)/8.);
  gl_FragColor.a = 1.;
}
