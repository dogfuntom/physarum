precision mediump float;
varying vec2 uv;
uniform vec2 u_resolution;
uniform sampler2D prevStateCells;

#define PI 3.1415

#define col(c) -cos((pow(vec3(c), pw) + off) * 2. * PI) * mul + add
vec3 pw = vec3(1);
vec3 off = vec3(.0, .3, .6);
vec3 mul = vec3(.5, .5, .5);
vec3 add = vec3(.5, .5, .5);

void main() {
  float c = texture2D(prevStateCells, uv).r;
  gl_FragColor.rgb += col(1.-c);//*(sin(c*400.)*.5+.5);
  gl_FragColor.a = 1.;
}