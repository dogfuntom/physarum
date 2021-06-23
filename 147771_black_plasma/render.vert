precision highp float;

attribute vec2 v_position;
attribute float v_id;
uniform sampler2D u_tex_fbo;
uniform vec2 u_tex_fbo_res;
uniform float u_time;
uniform vec2 u_resolution;
varying vec4 color;
varying vec2 position;
varying float v_mass;
uniform float SIZE_MAX;

uniform float DEPOSITE;

#pragma glslify: snoise2d = require(../modules/math/glsl-noise/simplex/2d.glsl)
#pragma glslify: random = require(glsl-random)
float rnd(float x) {
  return random(vec2(x * .0001));
}

void main() {
  vec4 particle = texture2D(u_tex_fbo, v_position); // v_position делаем вручную в JS
  vec2 FC = v_position * u_tex_fbo_res;
  float id = (floor(FC.x) + floor(FC.y) * u_tex_fbo_res.x) * .0001;
  v_mass = rnd(id)*rnd(id) * rnd(id);
  // vec2 pos = fract(particle.xy) * 2. - 1.;
  vec2 pos = particle.xy;

  // Этот партиклес.ху почему-то конский. Я ожидаю, что там будет что-то около .5, а там сотни единиц
  // if(length(particle.xy)>200.5) pos = vec2(999);

  vec2 vel = particle.zw;
  float resMin = min(u_resolution.y, u_resolution.x);
  gl_Position = vec4(pos.x  / resMin * u_resolution.y, pos.y / resMin * u_resolution.x, 0, 1);
  // gl_Position = vec4(pos, 0, 1);

    // а тут вместо в_масс, который приходит из буфера, заюзаем хак, массу вычисленную из координат ФБО
    // потому что лень как-то передавать её через JS, через текстуру
  // float mass = rnd(length(v_position));
  gl_PointSize = 2. * v_mass * SIZE_MAX;

    // color = mix(#000000ff, #bbbbbbff, length(vel.y*500.));
  // color.r = snoise2d((floor(pos * 2.)) + 1. + u_time * .1);
  // color.g = snoise2d((floor(pos * 2.)) + 2. + u_time * .1);
  // color.b = snoise2d((floor(pos * 2.)) + 3. + u_time * .1);
 
  // color.a = clamp(1. / u_time, 0., 1.);
  // color.a = (.5 + .5 * sin(u_time * 1.));// * u_time / exp(u_time);// / u_time;
  color.rgb = vec3(DEPOSITE);
  color.a = 1.;

  position = pos;
}