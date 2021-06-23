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

  float brightness = smoothstep(.5*(SIZE_MAX * v_mass)/u_resolution.x, 0., length((gl_FragCoord.xy / u_resolution - (position * .5 + .5) )));

  // // гипербола со скруглённой верхушкой
  // float len = length((gl_FragCoord.xy / u_resolution - (position * .5 + .5) ));
  // len = sqrt(len*len+.01);
  // float brightness = .01*(SIZE_MAX * v_mass)/u_resolution.x / len / len;

  gl_FragColor = clamp(color * brightness, .0, 1.);
  // gl_FragColor = vec4(0,0,0, min(colorPrev.a + color.a, 1.));//min(colorPrev, color);
  // gl_FragColor = vec4(0,0,0,1);
}