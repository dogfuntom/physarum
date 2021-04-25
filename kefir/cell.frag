#version 300 es
precision mediump float;
uniform sampler2D prevStateCells;
uniform int tick;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
in vec2 uv;
out vec4 outColor;

// #define t u_time
// #define iTime u_time
// #define res u_resolution
// #define iResolution u_resolution
// #define FC gl_FragCoord.xy
// #define b1 prevStateCells

void main() {
  outColor+=vec4(1,0,1,1);
// #define rnd(x) fract(54321.987 * sin(987.12345 * x))
// #define LIQUIDITY (sin(t * 2.) *  .4 + .5)
// #define DIFF (sin(t * 2.) *  .4 + .5)
// #define tf(a,b) texelFetch(b1, ivec2(mod(FC.xy + vec2(a, b), res)), 0).r
 
// float self = texelFetch(b1, ivec2(FC.xy), 0).r;
// if(t < .1) self = rnd(length(FC)) * .8;
// else { self += (tf(0, 1) + tf(1, 0) + tf(0, 1) + tf(1, 0)) * DIFF / 4.; self /= 1. + DIFF; } 

// float delta = -self * LIQUIDITY;
// for(int xn = -1; xn <= 1; xn++) {
//   // для каждого из верхних выбераем, куда им стекать. Если это я, стекаем в меня
//   float n = tf(xn,1);
//   float bottomMax = 0.;
//   int bottomX = 0;
//   int sig = int(mod(FC.y-.5, 2.) * 2. - 1.);
//   for(int xg = 0 * sig; float(abs(xg)) <= 1.; xg += sig) {
//     float g = tf(xn + xg, 0);
//     if (g > bottomMax) {
//       bottomMax = g;
//       bottomX = xg;
//     }
//   }
//   if(xn + bottomX == 0) {
//     delta += n * LIQUIDITY;
//   }
// }

// o += self + delta;
}