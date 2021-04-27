#version 300 es
precision mediump float;
uniform sampler2D prevStateCells;
uniform int tick;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_mouse_down;
in vec2 uv;
out vec4 outColor;

#define t u_time
#define o outColor
#define iTime u_time
#define res u_resolution
#define iResolution u_resolution
#define FC gl_FragCoord.xy
#define b1 prevStateCells


void main() {
  // outColor+=vec4(1,0,1,1); return;
#define rnd(x) fract(54321.987 * sin(fract(987.12345 * x + u_time)))
#define LIQUIDITY (u_mouse.y*1.8-0.9) //(sin(t * 2.) *  .4 + .5)
#define DIFF (u_mouse.x*1.8-0.9) //(sin(t * 2.) *  .4 + .5)
#define tf(a,b) texelFetch(b1, ivec2(mod(FC.xy + vec2(a, b), res)), 0).rgb
 
// o+=rnd(length(FC)) * .8; o.a = 1.;return;
vec3 self = texelFetch(b1, ivec2(FC.xy), 0).rgb;
if (u_mouse_down > 0.) {self += smoothstep(.15, .14, length(uv-u_mouse)) * rnd(length(FC)) * vec3(uv, 1);}
// constantly refilling the cells
self += .01 * rnd(length(FC)) * vec3(uv, 1);
// diffusion
self += (tf(0, 1) + tf(1, 0) + tf(0, 1) + tf(1, 0)) * DIFF / 4.;
self /= 1. + DIFF;

// delta is how much liquid will come to the cell
vec3 delta = -self * LIQUIDITY;

for(int xn = -1; xn <= 1; xn++) {
  // for every item we check to where it leaks. We are interested if it will leak to me
  vec3 n = tf(xn,1);
  vec3 bottomMax = vec3(0);
  int bottomX = 0;
  int sig = int(mod(FC.y-.5, 2.) * 2. - 1.);
  for(int xg = 0 * sig; float(abs(xg)) <= 1.; xg += sig) {
    vec3 g = tf(xn + xg, 0);
    if (length(g) > length(bottomMax)) {
      bottomMax = g;
      bottomX = xg;
    }
  }
  // if this cell will leak to me
  if(xn + bottomX == 0) {
    delta += n * LIQUIDITY;
  }
}

o.rgb += self + delta;
o.a = 1.;
}