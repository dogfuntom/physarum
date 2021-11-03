precision mediump float;
varying vec2 uv;
uniform vec2 u_resolution;
uniform vec2 u_tex_res;
uniform sampler2D prevStateCells;
uniform sampler2D prevStateConway;
uniform float midi[64];
uniform float u_time;
uniform vec4 palette[5];

#define PI 3.1415

#define col(c) -cos((pow(vec3(c), pw) + off) * 2. * PI) * mul + add
vec3 pw = vec3(midi[0+16],midi[1+16],midi[2+16]);
vec3 off = vec3(midi[4+16],midi[5+16],midi[6+16]);
vec3 mul = vec3(midi[8+16],midi[9+16],midi[10+16]);
vec3 add = vec3(midi[12+16],midi[13+16],midi[14+16]);

float size = midi[15 + 16 * 2] * 10000.;

// vec3 col(float c) {
//   vec4 c1, c2;
//   c1 = palette[0];
//   c2 = palette[2];
//   if(c > .5) {
//     c1 = palette[2];
//     c2 = palette[3];
//   }
//   return mix(c1, c2, fract(c * 1.999)).rgb;
// }

#define rnd(d) fract(sin(length(d)*99.))
#define rot(a) mat2(cos(a),-sin(a),sin(a),cos(a))

void main() {
  float c = texture2D(prevStateConway, uv.yx).r;

  float steps = 100. * midi[16+7];
  c = floor(c*steps)/steps;

  // vec2 U = (gl_FragCoord.xy * 2. - u_resolution) / min(u_resolution.x, u_resolution.y);

  gl_FragColor.rgb = texture2D(prevStateConway, uv.yx).rgb;
  // gl_FragColor.rgb = col(c);
  gl_FragColor.a = 1.;
}
