precision mediump float;
varying vec2 uv;
uniform vec2 u_resolution;
uniform vec2 u_tex_res;
uniform sampler2D prevStateCells;
uniform float midi[64];
uniform float u_time;
uniform vec4 palette[5];

#define PI 3.1415

// #define col(c) -cos((pow(vec3(c), pw) + off) * 2. * PI) * mul + add
// vec3 pw = vec3(midi[0+16],midi[1+16],midi[2+16]);
// vec3 off = vec3(midi[4+16],midi[5+16],midi[6+16]);
// vec3 mul = vec3(midi[8+16],midi[9+16],midi[10+16]);
// vec3 add = vec3(midi[12+16],midi[13+16],midi[14+16]);

vec3 col(float c) {
  vec4 c1, c2;
  c1 = palette[0];
  c2 = palette[2];
  if(c > .5) {
    c1 = palette[2];
    c2 = palette[3];
  }
  return mix(c1, c2, fract(c * 1.999)).rgb;
}

#define rnd(d) fract(sin(length(d)*99.))
#define rot(a) mat2(cos(a),-sin(a),sin(a),cos(a))

void main() {
  float c = texture2D(prevStateCells, uv).r;
  float h = c;
  float shade = smoothstep(.0, .2, c);
  c = fract(c + midi[3 + 16]);
  // c *= midi[11 + 16] * 20.;
  c = floor(c * 100. * midi[7 + 16]) / 100. / midi[7 + 16];

  vec2 U = (gl_FragCoord.xy * 2. - u_resolution) / min(u_resolution.x, u_resolution.y);

  gl_FragColor.rgb += col(c) * shade;//*(sin(c*400.)*.5+.5);

// float j,d,e=1.;
// vec3 p;
// for(float i = 1.;i<99.;i++){
//   p=normalize(vec3(U,1))*d*(rnd(length(U))*.1+.9);
//   p.z-=1.;

//   d+=e=length(p)-.5;
//   if(e<.001)break;
//   j=i;
// }
//   if(c>d*midi[14+16]*2.) gl_FragColor=vec4(3./j);

  float j, d, e = 1.;
  vec3 p;
  float steps = u_tex_res[0] / 2.;
// float steps = pow(2.,midi[14+16*2]*10.);
  float dist = midi[12 + 16 * 2] * 10000.;
  float size = midi[15 + 16 * 2] * 10000.;
  for(float i = 1.; i < 199.; i++) {
    p = normalize(vec3(U, 1)) * d * (rnd(length(U)) * .1 + .9);
  // p=normalize(vec3(floor(U*steps)/steps,1))*d*(rnd(length(floor(U*steps)*100.))*.1+.9);
    p.z -= dist;
  // p.xz *= rot(u_time*2.*.4);
  // p.yz *= rot(u_time*3.*.4);

  // p-=clamp(p,-size,size);
  // d+=e=length(p)-.001;

    float s = 1.;
    for(float i = 0.; i < 16.; i++) {
      if(i > midi[1 + 16 * 2] * 16.)
        break;
      p *= 1. + midi[16 * 2 + 2];
      s *= 1. + midi[16 * 2 + 2];
      p = abs(p);
      p -= vec3(.5 * size * midi[16 * 2 + 3]);
      p.xz *= rot(u_time * PI * 2. + i);
      p.yz *= rot(u_time * PI * 2. + i);
    }

    d += e = (length(vec2(p.z, length(p.xy) - size)) - size / 2.) / s;

    if(e < .001 || d > 2. * dist)
      break;
    j = i;
  }
  if(h > d / dist * (midi[15 + 16] * 2.))
    gl_FragColor = vec4(8. / j);
  // if(c>d/dist*(midi[15+16]*2.)) gl_FragColor=vec4(d/dist);

  gl_FragColor.a = 1.;
}