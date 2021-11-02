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

float size = midi[15 + 16 * 2] * 10000.;

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

float map(vec3 p) {
  float sphere = length(p) - size*4.;
  // sphere = abs(sphere) - .01 * size;

  float fi = 1.618033988749;
  vec3 p1 = vec3(0, 0, fi);
  vec3 p2 = vec3(.5, fi / 2., fi * fi / 2.);
  vec3 n = normalize(vec3(p1 - p2));

  float s = 1.;
  p.zy *= rot(.2);
  // p.zx*=rot(time);
  for(int j = 0; j < 5; j++) {
    p.xy = abs(p.xy);
    float g = dot(p, n);
    p -= (g - abs(g)) * n;
  }
  float cyl = (length(p-vec3(0,0,size))) - .3 * size;
  // float cyl = (fract(length(p)/size)-.5)*size;// - .1 * size;
  cyl = max(cyl, sphere);
  // float ray=(length(p.xy));

  float e = cyl;//max(cyl, sphere) / s;
  // float e = (length(vec2((fract(cyl) - .5), sphere)) - size * .1) / s;
  // gl+=.0009/ray;
  return e;
}

void main() {
  float c = texture2D(prevStateCells, uv.yx).r;
  float h = c;
  float shade = smoothstep(.0, .2, c);
  c = fract(c + midi[3 + 16]);
  // c *= midi[11 + 16] * 20.;
  c = floor(c * 100. * midi[7 + 16]) / 100. / midi[7 + 16];

  vec2 U = (gl_FragCoord.xy * 2. - u_resolution) / min(u_resolution.x, u_resolution.y);

  gl_FragColor.rgb += col(c) * shade;//*(sin(c*400.)*.5+.5);

  float j, d, e = 1.;
  vec3 p;
  float steps = u_tex_res[0] / 2.;
// float steps = pow(2.,midi[14+16*2]*10.);
  float dist = midi[12 + 16 * 2] * 10000.;
  for(float i = 1.; i < 199.; i++) {
    p = normalize(vec3(U, 1)) * d * (rnd(length(U)) * .1 + .9);
  // p=normalize(vec3(floor(U*steps)/steps,1))*d*(rnd(length(floor(U*steps)*100.))*.1+.9);
    p.z -= dist;

    p.xz *= rot(sin(u_time * PI * 2.) * PI * 2.);
    p.yz *= rot(u_time * PI * 2.);
    d += e = map(p);

    if(e < .001 || d > 2. * dist)
      break;
    j = i;
  }
  if(h > pow(d / dist, 2.) * (midi[15 + 16] * 2.))
    gl_FragColor = vec4(8. / j);
  // if(c>d/dist*(midi[15+16]*2.)) gl_FragColor=vec4(d/dist);

  gl_FragColor.a = 1.;
}
