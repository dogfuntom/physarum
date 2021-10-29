precision mediump float;
uniform sampler2D prevStateCells;
uniform sampler2D prevStateFeromones;
uniform float tick;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
varying vec2 uv;

#define DECAY .001
#define rnd(x) fract(54321.987*sin(987.12345*x))

void main() {
// init
// if(tick <= 1.) {
//   gl_FragColor = vec4(1. - step(.05, length(uv - .5)));
//   return;
// }

// deposition
vec4 cell = texture2D(prevStateCells, uv);
if(length(cell) > 0.) {
  gl_FragColor.rg += clamp(cell.ba * .5 + .5, 0., 1.);
  gl_FragColor.a += 1.;
  return;
}

// gl_FragColor = (texture2D(prevStateFeromones, uv, .1)) * .99;
// gl_FragColor = texelFetch(prevStateFeromones, ivec2(gl_FragCoord.xy), 0);

//diffusion
#define diffCols 3.
#define diffR 1.
for (int i = 0; i < int(diffCols * diffCols); i++) {
  vec2 ij = vec2(i/int(diffCols), mod(float(i), diffCols)) - (diffCols - 1.) / 2.;
  ij *= diffR;
  gl_FragColor += texture2D(prevStateFeromones, fract(uv + ij * 1. / u_resolution)) / diffCols / diffCols;
}

// decay
gl_FragColor *= (1. - DECAY);

// // spot limit
// gl_FragColor *= smoothstep(.5, .4, length(uv-.5));

// // mouse interaction
// float mouseSpot = max(0., .1 - length(uv - u_mouse));
// gl_FragColor += clamp(gl_FragColor + mouseSpot * .1, 0., 1.);
}