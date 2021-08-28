precision highp float;
varying vec2 vPos;
uniform sampler2D backbuffer;
uniform float t;
uniform vec2 res;

#define rot(a) mat2(cos(a),-sin(a),sin(a),cos(a));
#define rnd(x) fract(54321.987 * sin(987.12345 * fract(x)))

void main() {
  vec2 uv = gl_FragCoord.xy / res / 2.;
  vec4 b = texture2D(backbuffer, vec2(uv.x, 1. - uv.y));

  // danger
  uv.x += 123.4321;
  if(t < .5) {
    gl_FragColor.r = .5;//rnd(length(uv));
    gl_FragColor.g = .5;//rnd(length(uv + .1));
    gl_FragColor.b = .5+.1;
    gl_FragColor.a = .5;//rnd(length(uv + .2));
  } else {
    vec2 p = b.rg * 2. - 1.;
    vec2 v = vec2(rnd(length(uv + .2)),rnd(length(uv + .3)))*2.-1.;
    p += v * .1;
    // p.x + .01*(2.*rnd(length(uv + t)) - 1.);
    // gl_FragColor.g += p.y + .01*(2.*rnd(length(uv + .1 + t)) - 1.);
    gl_FragColor.rg = fract(p * .5 + .5);
    gl_FragColor.ba = v * .5 + .5;
  }
  // gl_FragColor.a = 1.;
}