#version 300 es
precision mediump float;
out vec4 outColor;

precision highp float;
uniform vec2 resolution;
uniform vec2 mouse;
uniform float time;

#define o outColor
#define FC gl_FragCoord
#define t time
#define res resolution
#define m mouse
#define rotate2D rot
#define PI 3.14159265

// #pragma glslify: crystall = require('../modules/sdf/crystall')
#define rnd(x) fract(54321.987 * sin(987.12345 * x))

mat2 rot(float a) {
  float s = sin(a), c = cos(a);
  return mat2(c, -s, s, c);
}

void main() {
  vec2 uv = (FC.xy - .5 * res) / res.y;
  vec2 uvInit = uv;
  uv /= .05;
  uv = uv / dot(uv, uv);
  float l = (length(uv) / .02 - atan(uv.y, uv.x)) / 2. / PI;
  float r = floor(l);
  float a = atan(uv.y, uv.x) + PI * 2.;
  float tt = r * 2. * PI + a;
  uv = fract(vec2(l, .05 * tt * tt + t));

  uv -= .5;
  uv.x *= 2.;
  uv.y /= .1;

  vec3 p;
  float d, i, e = 1.;

  for(; i++ < 99. && e > .0001;) {
    p = d * (vec3(uv, 1));
    p.z -= .25;
    float j, c = 0., s = 1.;
    p.y = fract(p.y) - .5;
    for(; j < 10.; j++) {
      p = abs(p);
      p -= vec2(.05, .5).xyx;
      p.xz *= rotate2D(1.6);
      p.yx *= rotate2D(.24);
      p *= 2.;
      s *= 2.;
    }
    d += e = (length(p) - 1.) / s * .5;
  }
  o += 8. / i * pow(length(uvInit*2.),.5);
  o.a = 1.;
}