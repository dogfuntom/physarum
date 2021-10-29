precision mediump float;
varying vec2 uv;
uniform vec2 u_resolution;
uniform sampler2D prevStateCells;
uniform float midi[64];

#define PI 3.1415

#define col(c) -cos((pow(vec3(c), pw) + off) * 2. * PI) * mul + add
vec3 pw = vec3(midi[0+16],midi[1+16],midi[2+16]);
vec3 off = vec3(midi[4+16],midi[5+16],midi[6+16]);
vec3 mul = vec3(midi[8+16],midi[9+16],midi[10+16]);
vec3 add = vec3(midi[12+16],midi[13+16],midi[14+16]);

void main() {
  float c = texture2D(prevStateCells, uv).r;
  c = float(c + midi[3+16]) * midi[11+16] * 20.;
  c = floor(c*100.*midi[7+16])/100./midi[7+16];

  vec2 U = (gl_FragCoord.xy*2.-u_resolution)/min(u_resolution.x,u_resolution.y);

  gl_FragColor.rgb += col(c);//*(sin(c*400.)*.5+.5);

  if(c>length(floor(U*4.+.5)/4.)) gl_FragColor=vec4(0.);

  gl_FragColor.a = 1.;
}