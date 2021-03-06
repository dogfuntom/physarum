precision highp float;

varying vec2 v_position;
varying float v_id; // похоже, тут никак этого не получить. Разве что вычислять из координат пикселя. Но для этого надо знать разрешение текстуры.
// varying float v_mass;
uniform sampler2D u_tex_fbo;
uniform sampler2D u_tex_draw;
uniform vec2 u_tex_draw_res;
uniform float u_time;
uniform float u_tick;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

mat2 rot(float a) {
  float s = sin(a), c = cos(a);
  return mat2(c, -s, s, c);
}

#pragma glslify: random = require(glsl-random)
#pragma glslify: snoise2d = require(../modules/math/glsl-noise/simplex/2d.glsl)
#pragma glslify: snoise3d = require(../modules/math/glsl-noise/simplex/3d.glsl)

float rnd(float x) {
  return random(vec2(x * .0001));
}

 
#define LOOKUP_DIST u_mouse.x * 10.1
#define LOOKUP_ANGLE .1
#define TURN_ANGLE LOOKUP_ANGLE * 5.5
#define STEP_SIZE u_mouse.y
// #define LOOKUP_DIST (u_mouse.x*.5+.5) * .01
// #define LOOKUP_ANGLE u_mouse.y
// #define TURN_ANGLE LOOKUP_ANGLE * 2.
// #define STEP_SIZE .01
#define RESPAWN

vec2 turn(vec2 pos, vec2 vel) {

  vec2 uv = pos * .5 + .5;// + vec2(1, 0) / u_tex_draw_res);
  vec2 sensorL = uv + (rot(-LOOKUP_ANGLE) * normalize(vel)) * LOOKUP_DIST;
  vec2 sensorC = uv + normalize(vel) * LOOKUP_DIST;
  vec2 sensorR = uv + (rot(LOOKUP_ANGLE) * normalize(vel)) * LOOKUP_DIST;
  vec2 sensor0 = uv;

  float senseL = texture2D(u_tex_draw, sensorL).r;
  float senseC = texture2D(u_tex_draw, sensorC).r;
  float senseR = texture2D(u_tex_draw, sensorR).r;
  // float sense0 = texture2D(u_tex_draw, sensor0).r;


  if(senseC > senseL && senseC > senseR)
    return vel;
  if(senseL == senseR) {
      vel *= rot(sign(rnd(vel.x)-.5) * TURN_ANGLE);
  } else if(senseL < senseR) {
    vel *= rot(-TURN_ANGLE);
  } else if(senseL > senseR) {
    vel *= rot(TURN_ANGLE);
  }
  
  // if(sense0 > senseC && sense0 > senseR && sense0 > senseL)
  //   return vel;
  // if(senseC > senseL && senseC > senseR) {
  //     vel += normalize(vel) * 10. * u_mouse.x * (senseC - sense0);
  // } else if(senseL < senseR) {
  //     vel += normalize(vel) * 10. * u_mouse.x * rot(-LOOKUP_ANGLE) * (senseR - sense0);
  // } else if(senseL > senseR) {
  //     vel += normalize(vel) * 10. * u_mouse.x * rot(LOOKUP_ANGLE)* (senseL - sense0);
  // }
  return vel;
}

vec2 grad(vec2 pos) {
  vec2 gr;
  gr.x = texture2D(u_tex_draw, fract(pos * .5 + .5 + vec2(LOOKUP_DIST, 0) / u_tex_draw_res)).r -
    texture2D(u_tex_draw, fract(pos * .5 + .5 - vec2(LOOKUP_DIST, 0) / u_tex_draw_res)).r;
  gr.y = texture2D(u_tex_draw, fract(pos * .5 + .5 + vec2(0, LOOKUP_DIST) / u_tex_draw_res)).r -
    texture2D(u_tex_draw, fract(pos * .5 + .5 - vec2(0, LOOKUP_DIST) / u_tex_draw_res)).r;
  return gr;
}

void main() {
  float id = (floor(gl_FragCoord.x) + floor(gl_FragCoord.y) * u_resolution.x) * .0001;

  vec4 particle = texture2D(u_tex_fbo, v_position);
  vec2 pos = particle.xy;
  vec2 vel = particle.zw;
  float mass = rnd(id);

  // init
  #ifdef RESPAWN
  if(rnd(id + u_time) < .001 || u_tick < 2.) {
  #else
  if(u_tick == 0.) {
  #endif
    // float angle = rnd(id + u_time * .001 + length(pos)) * 2. * 3.1415;
    gl_FragColor.r = rnd(id + 1. + u_time * .001 + length(pos)) * 2. - 1.;
    gl_FragColor.g = rnd(id + 2. + u_time * .001 + length(pos)) * 2. - 1.;
    // gl_FragColor.rg = vec2(.5, 0) * rot(angle);
    gl_FragColor.ba = vec2(1, 0);// * rot(rnd(id)*2.*3.1415);
  }

  // physics
  else {
    // // force
    // vel *= .9;
    vel = normalize(vel) * STEP_SIZE;

    // vel.x += .001 * snoise3d(u_mouse.x + vec3(u_time * .1, pos * 10.));
    // vel.y += .001 * snoise3d(u_mouse.y + vec3(u_time * .1, pos * 10. + 99.));
    // vel.x += .002 * snoise2d(pos * 32. + u_mouse.x);
    // vel.y += .002 * snoise2d(pos * 32. + u_mouse.x + 99.);
   // vel += vec2(.0001 * u_mouse) * rot(atan(pos.y, pos.x));

    vel = turn(pos, vel);// * 1.001;

    // vel -= grad(pos) * u_mouse.x * 10.;

    // vec2 vecToCenter = u_mouse - pos;
    // float repulsion = 1. / length(vecToCenter);
    // vel -= sign(rnd(id) - .9) * repulsion * vec2(.001, 0) * rot(atan(vecToCenter.y, vecToCenter.x));

    pos +=  vel;// / mass;
    pos = fract(pos * .5 + .5) * 2. - 1.;

    gl_FragColor = vec4(pos, vel);
  }
}