  precision mediump float;

  attribute vec2 v_position;
  attribute float v_mass;
  attribute float v_id;
  uniform sampler2D u_tex_fbo;
  varying vec4 color;

#define rnd(x) fract(54321.987 * sin(987.12345 * x))

  void main () {
    vec4 particle = texture2D(u_tex_fbo, v_position); // тут явно не то передаётся.
    // Подразумевается, тут должны быть координаты текстуры ФБО. Но мы через впозишн передаём рандомные цифры.
    // Вот заменю на менее рандомные и партиклов станет меньше
    // Да, приходится признать, тут мы брали не то. А что то? Если мы хотим отрендерить вершину, 
    // как понять, какой точки ФБО она соответствует?
    // Попробую вручную перебирать все координаты снаружи
    vec2 pos = fract(particle.xy);
    vec2 vel = particle.zw * 2. - 1.;
    gl_Position = vec4(pos * 2. - 1., 0, 1);

    // а тут вместо в_масс, который приходит из буфера, заюзаем хак, массу вычисленную из координат ФБО
    // потому что лень как-то передавать её через JS, через текстуру
    float mass = rnd(length(v_position));
    gl_PointSize = mass * 10.;

    // color = mix(#FFFF00FF, #FF00FFFF, length(vel.y*500.));
    color.r = rnd(v_id + 0.);
    color.g = rnd(v_id + 1.);
    color.b = rnd(v_id + 2.);
    color.a = 1.;
  }