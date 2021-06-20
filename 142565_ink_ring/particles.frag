precision highp float;

varying vec2 v_position;
varying float v_id; // похоже, тут никак этого не получить. Разве что вычислять из координат пикселя. Но для этого надо знать разрешение текстуры.
// varying float v_mass;
uniform sampler2D u_tex_fbo;
uniform float u_time;
uniform float u_tick;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

mat2 rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);}

#pragma glslify: random = require(glsl-random)
#pragma glslify: snoise2d = require(../modules/math/glsl-noise/simplex/2d.glsl)
#pragma glslify: snoise3d = require(../modules/math/glsl-noise/simplex/3d.glsl)

float rnd(float x) {return random(vec2(x * .0001));}


void main() {
    // поскольку v_id получить не можем (тут нет айдишников вершин, вершин всего 4)
    // вычислим айдишник пикселя из его координат, зная разрешение
  float id = (floor(gl_FragCoord.x) + floor(gl_FragCoord.y) * u_resolution.x) * .000001;

    // vec2 pos;
    // pos.x = floor(rnd(id) * 2.) / 2.;
    // pos.y = floor(rnd(id + .01) * 2.) / 2.;
    // gl_FragColor = vec4(pos, 0, 0);
    // координаты нормально работают.

  vec4 particle = texture2D(u_tex_fbo, v_position);
  vec2 pos = particle.xy;
  vec2 vel = particle.zw;
  //   // хак! Массу высчитываем прямо тут
  //   float mass = rnd(length(v_position));

  // init
  // if(u_tick == 0. || rnd(floor(id * 1000000. + u_time)) < .01) {
  if(rnd(id + u_time) < .01) {
  // if(u_tick == 0.) {
    float angle = rnd(id + u_time * .001 + length(pos));

    // gl_FragColor.r = rnd(id + 1. + u_time * .001 + length(pos)) * 2. - 1.;
    // gl_FragColor.g = rnd(id + 2. + u_time * .001 + length(pos)) * 2. - 1.;
    gl_FragColor.rg = vec2(.5,0) * rot(rnd(angle) * 2. * 3.1415);
  }

  // physics
  else {
    // // force
    vel *= .95;
    vel.x += .0001 * snoise3d(u_mouse.x + vec3(u_time * .1, pos * 10.));
    vel.y += .0001 * snoise3d(u_mouse.y + vec3(u_time * .1, pos * 10. + 99.));
    vel.x += .00002 * snoise2d(pos * 32. + u_mouse.x);
    vel.y += .00002 * snoise2d(pos * 32. + u_mouse.x + 99.);
    // vel.y += .00001 * snoise2d(rnd(length(floor(pos * 8.))) + 9.);
    // vel.y += .001 * pow(snoise(vec3(pos, u_time) + 10.), 8.);
    // float angle = atan(pos.y, pos.x);
    // vel.y += .0001 * u_mouse.y;
    // vel.x += .0001 * u_mouse.x;
    vel += vec2(.0001 * u_mouse) * rot(atan(pos.y, pos.x));

    // vec2 vecToMouse = pos - u_mouse;
    // vel -= 1./vecToMouse * .000001;

    // float n = snoise(vec3(angle, pos.x, u_time));
    // vel.x += .0001 * sin(angle) * n;
    // vel.y -= .0001 * cos(angle) * n;

    // // avoid center
    // // vec2 vecToCenter = pos-.5;
    // // vec2 repulsion = pow(1./vecToCenter, vec2(.5));
    // // vel -= repulsion * .0001;

    pos += vel;// / mass * .01;
    gl_FragColor = vec4(pos, vel);
  }
}