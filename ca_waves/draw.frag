#version 300 es
precision mediump float;
uniform vec2 u_resolution;
uniform vec2 u_tex_res;
uniform sampler2D tex;
uniform sampler2D backbuffer;
// uniform float midi[64];
uniform float u_time;
uniform vec4 palette[5];
uniform float params[4];
out vec4 o;


#define PI 3.1415

// #define col(c) -cos((pow(vec3(c), pw) + off) * 2. * PI) * mul + add
// vec3 pw = vec3(midi[0 + 16], midi[1 + 16], midi[2 + 16]);
// vec3 off = vec3(midi[4 + 16], midi[5 + 16], midi[6 + 16]);
// vec3 mul = vec3(midi[8 + 16], midi[9 + 16], midi[10 + 16]);
// vec3 add = vec3(midi[12 + 16], midi[13 + 16], midi[14 + 16]);

// float size = midi[15 + 16 * 2] * 10000.;

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
  vec2 uvN = gl_FragCoord.xy / u_resolution;
  vec2 uv = (gl_FragCoord.xy * 2. - u_resolution) / min(u_resolution.x, u_resolution.y);

  // float sea = texture(prevStateSea, uvN).r;

  // float steps = 100. * midi[16 + 7];
  // sea = floor(sea * steps) / steps;

  // vec4 seaCol = vec4(col(sea), 1);

  // // // vec2 U = (gl_FragCoord.xy * 2. - u_resolution) / min(u_resolution.x, u_resolution.y);

  // vec2 U = uv;
  // U += 1.;
  // U /= 2.;
  // // U = U * 8.;
  // // U -= 1. / 1.6 / 2.;
  // vec2 uvFl = floor(U * 17.) / 17.;
  // vec2 uvFr = fract(U * 17.) * 2. - 1.;
  // float conway = texture(prevStateConway, uvFl).r * smoothstep(3., 0., length(uvFr * uvFr * uvFr * uvFr * uvFr * uvFr));

  // // if(conway > sea)
  // //   gl_FragColor = mix(1.-seaCol, seaCol, smoothstep(.1, .0, conway-sea));
  // // else{
  // //   gl_FragColor = seaCol;
  // // }
  // // gl_FragColor = texture(prevStateConway, U);
  // // gl_FragColor.rg = uv;
  // gl_FragColor = mix(vec4(rnd(sea)) * vec4(midi[16 * 2 + 0], midi[16 * 2 + 1], midi[16 * 2 + 2], 1), seaCol, smoothstep(.1, .0, conway - sea));

  // // gl_FragColor = mix(gl_FragColor, texture(backbuffer, uv), 0.);
  // // gl_FragColor.rgb = col(c);

  vec3 col = texture(tex, uvN).rgb;
  int id = int(mod(col.r + col.g * 2. + col.b * 4. + floor(100. * params[1]), 5.));

  o = palette[id];
  o.a = 1.;
}
