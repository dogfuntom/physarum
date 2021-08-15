precision mediump float;
uniform sampler2D u_tex_draw;
uniform vec2 u_resolution;
uniform float u_time;

#pragma glslify: random = require(glsl-random)
float rnd(float x) {
  return random(vec2(x * .0001));
}

void main() {
  gl_FragColor = texture2D(u_tex_draw, gl_FragCoord.xy / u_resolution);
  if(u_time < 1.)
    gl_FragColor = vec4(sin(gl_FragCoord.x), 0, 0, 0);
}