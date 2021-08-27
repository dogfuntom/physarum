precision highp float; varying vec2 vPos;
uniform sampler2D g;
uniform float t;
uniform vec2 res;

#define rot(a) mat2(cos(a),-sin(a),sin(a),cos(a);
#define rnd(x) fract(54321.987 * sin(987.12345 * fract(x)))

int tex=0;
  
void main() {
  vec3 o;
  vec2 uv=gl_FragCoord.xy/res;
  float N=pow(3.,5.);
  gl_FragColor=texture2D(g,floor(uv*N)/N+.5/N);
  float id = rnd(length(gl_FragColor));
  gl_FragColor.rgb*=.8+.4*sin(length((uv-.5)*(uv-.5))*(50.-20.*sin(t+id*10.))-fract(t)*2.*3.1415+id*123.123);
  gl_FragColor.rgb+=.08*rnd(length(floor(uv*243.))+t)-.04;
}