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

// #pragma glslify: crystall = require('../modules/sdf/crystall')
#define rnd(x) fract(54321.987 * sin(987.12345 * x))

mat2 rot(float a) {
  float s = sin(a), c = cos(a);
  return mat2(c, -s, s, c);
}

void main() {
  vec2 uv = (FC.xy * 2. - res) / res.y;
  float i, d, e = 1.;
  for(vec3 p, q; i++ < 99. && e > .001;) {
    p = normalize(vec3(uv, 2.)) * d;
    float S = 1.;
    p.z -= 8.5;
    float R = 1.;
    p.zx *= rotate2D(t * .1);
    p = abs(p);
    q = p;
    float mx = mouse.x * .25 + .25;
    float my = mouse.y + .5;
    for(int j = 0; j++ < 5;) {
      p -= clamp(p, -1., 1.) * 2., S = 9. * clamp(mx / min(dot(p, p), 1.), 0., 1.), p = p * S + q * my, R = R * abs(S) + my;
    }
    d += e = max(length(q)-4., length(cross(p, normalize(vec3(1)))) / R - .003);
  }
  vec2 uvBg = abs(uv);
  if(uvBg.x < uvBg.y)
    uvBg = uvBg.yx;
  float bg = sin(uvBg.x * 400. / (uvBg.x - .1) + time * 10.) * .5 + .5;
  bg *= smoothstep(.9, .95, bg);
  bg *= uvBg.x * uvBg.x * uvBg.x;
  bg = clamp(bg, 0., 1.);
  bg *= .25;

  float shapeAlpha = smoothstep(50., 30., i);
  o.rgb += mix(bg, 8. / i, shapeAlpha);
  o.a = 1.;
}