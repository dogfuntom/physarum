precision mediump float;
varying vec4 color;
uniform float u_time;
uniform sampler2D u_tex_draw;
varying vec2 position; // координаты партикла, приходит из pos
uniform vec2 u_resolution;

void main() {
  // vec2 uv = gl_FragCoord.xy / u_resolution; // координаты текущего пикселя буфера Дроу
  // vec4 colorPrev = texture2D(u_tex_draw, uv);
  // gl_FragColor = colorPrev * color;
  gl_FragColor = color;
  // gl_FragColor = vec4(0,0,0, min(colorPrev.a + color.a, 1.));//min(colorPrev, color);
  // gl_FragColor = vec4(0,0,0,1);
}