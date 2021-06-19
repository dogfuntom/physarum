precision mediump float;

attribute vec2 v_position;
attribute float v_mass;
attribute float v_id;
uniform sampler2D u_tex_fbo;
uniform float u_time;
uniform vec2 u_resolution;
varying vec4 color;
varying vec2 position;

#define rnd(x) fract(54321.987 * sin(987.12345 * x))

void main() {
  vec4 particle = texture2D(u_tex_fbo, v_position); // v_position делаем вручную в JS
  // vec2 pos = fract(particle.xy) * 2. - 1.;
  vec2 pos = particle.xy;

  // Этот партиклес.ху почему-то конский. Я ожидаю, что там будет что-то около .5, а там сотни единиц
  // if(length(particle.xy)>200.5) pos = vec2(999);

  vec2 vel = particle.zw;
  float resMin = min(u_resolution.y, u_resolution.x);
  gl_Position = vec4(pos.x  / resMin * u_resolution.y, pos.y / resMin * u_resolution.x, 0, 1);

    // а тут вместо в_масс, который приходит из буфера, заюзаем хак, массу вычисленную из координат ФБО
    // потому что лень как-то передавать её через JS, через текстуру
  float mass = rnd(length(v_position));
  gl_PointSize = mass * 1.;

    // color = mix(#FFFF00FF, #FF00FFFF, length(vel.y*500.));
  // color.r = rnd(v_id + 0.);
  // color.g = rnd(v_id + 1.);
  // color.b = rnd(v_id + 2.);
  // color.a = clamp(1. / u_time, 0., 1.);
  // color.a = (.5 + .5 * sin(u_time * 1.));// * u_time / exp(u_time);// / u_time;
  color.rgb = vec3(.9);
  color.a = 1.;//.01 * (.5 + .5 * sin(u_time * 3.));

  // ещё хорошо бы сделать черновик сайта себе

  position = pos;
}