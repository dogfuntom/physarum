#version 300 es
precision mediump float;
uniform sampler2D u_tex_draw;
uniform vec2 u_resolution;
uniform float u_time;
out vec4 o;

void main() {
  // o = texture(u_tex_draw, gl_FragCoord.xy / u_resolution);
  // if(u_time < 1.)
  vec4 col = vec4(fract(gl_FragCoord.x/10.)*2.-1., 0, 0, 0);
    o = col;

  // o=#ff00eeff;
}