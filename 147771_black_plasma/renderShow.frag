precision highp float;
varying vec4 color;
uniform float u_time;
uniform sampler2D u_tex_draw;
varying vec2 position; // координаты партикла, приходит из pos
uniform vec2 u_resolution;
uniform float SIZE_MAX;
varying float v_mass;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution; // координаты текущего пикселя буфера Дроу
  // float brightness = smoothstep(SIZE_MAX/u_resolution.x, 0., length((gl_FragCoord.xy / u_resolution - (position * .5 + .5) )));
  // brightness = clamp(brightness, .0, 1.);
  // gl_FragColor.a = brightness;
  // gl_FragColor.rg = (position*.5+.5);
  gl_FragColor.a = 1.;
}