precision mediump float;
varying vec4 color;
uniform float u_time;
uniform sampler2D u_tex_draw;
varying vec2 position; // координаты партикла, приходит из pos
uniform vec2 u_resolution;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution; // координаты текущего пикселя буфера Дроу

  // gl_FragColor = color;
  // gl_FragColor.rgb *= .5 + .5 * sin(position.x * 100.);

  // gl_FragColor.rgb += .5 + .5 * sin(position.x * 500.);
  // вот работает, но не так. Сейчас он тупо смотрит координаты частицы и от них включает цвет.
  // а должен частицу не целиком воспринимать, а по частям.
  // Но как понять, какой из пикселей растрируется?
  // gl_FragColor.rg = gl_FragCoord.xy / u_resolution;
  
  gl_FragColor = fract(texture2D(u_tex_draw, uv) + .01);
  // gl_FragColor.g = .5;
  gl_FragColor.a = 1.;
  
  // gl_FragColor.a = texture2D(u_tex_draw, position).a;
  // gl_FragColor = vec4(1,0,.5,.4);//1./u_time;
}