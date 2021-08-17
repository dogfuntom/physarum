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
uniform vec2 u_tex_fbo_res;
uniform vec2 u_mouse;

mat2 rot(float a) {
  float s = sin(a), c = cos(a);
  return mat2(c, -s, s, c);
}

#pragma glslify: snoise2d = require(../modules/math/glsl-noise/simplex/2d.glsl)
#pragma glslify: snoise3d = require(../modules/math/glsl-noise/simplex/3d.glsl)

#pragma glslify: random = require(glsl-random)
float rnd(float x) {
  return random(vec2(x * .0001));
}

uniform float LOOKUP_DIST;
uniform float LOOKUP_DIST_SPREAD;
#define LOOKUP_DIST_CENTER LOOKUP_DIST
uniform float LOOKUP_ANGLE;
uniform float TURN_ANGLE;
uniform float STEP_SIZE;
uniform float SENCE_MIN;
uniform float SENCE_MAX;
// uniform float SENSE_ADD;
#define SENSE_ADD .0
uniform float RESPAWN_P;
uniform float RESPAWN_RADIUS;
uniform float REFLECT_RADIUS;
uniform float FRICTION;
uniform float REPULSION;
uniform float ANGLE_SPREAD;
// uniform float BEAT;

vec2 turn(vec2 pos, vec2 vel, float mass) {

  vec2 uv = pos * .5 + .5;// + vec2(1, 0) / u_tex_draw_res);
  vec2 sensorL = uv + (rot(-LOOKUP_ANGLE * mass) * normalize(vel)) * LOOKUP_DIST * (1. - LOOKUP_DIST_SPREAD * mass);
  vec2 sensorC = uv + normalize(vel) * LOOKUP_DIST * (1. - LOOKUP_DIST_SPREAD * mass);
  vec2 sensorR = uv + (rot(LOOKUP_ANGLE * mass) * normalize(vel)) * LOOKUP_DIST * (1. - LOOKUP_DIST_SPREAD * mass);
  vec2 sensor0 = uv;

  float senseL = texture2D(u_tex_draw, sensorL).a;
  // senseL = clamp(senseL, SENCE_MIN, SENCE_MAX);
  float senseC = texture2D(u_tex_draw, sensorC).a;
  // senseC = clamp(senseC, SENCE_MIN, SENCE_MAX);
  float senseR = texture2D(u_tex_draw, sensorR).a;
  // senseR = clamp(senseR, SENCE_MIN, SENCE_MAX);
  float sense0 = texture2D(u_tex_draw, sensor0).a;

  float turn_angle_rnd = TURN_ANGLE + ANGLE_SPREAD * (rnd(length(pos)) * 2. - 1.);

// stadard
  if(senseC > senseL && senseC > senseR)
    return vel * senseC;
  if(senseL == senseR) {
    vel *= (senseR + SENSE_ADD) * rot(sign(rnd(vel.x) - .5) * (turn_angle_rnd));
  } else if(senseL < senseR) {
    vel *= (senseR + SENSE_ADD) * rot(-turn_angle_rnd);
  } else if(senseL > senseR) {
    vel *= (senseL + SENSE_ADD) * rot(turn_angle_rnd);
  }

  // // middle way
  // if((senseC > senseL && senseC < senseR) || (senseC < senseL && senseC > senseR))
  //   return vel;
  // if(senseL == senseR) {
  //     vel *= rot(sign(rnd(vel.x)-.5) * TURN_ANGLE);
  // } else if(senseL > senseR) {
  //   vel *= rot(-TURN_ANGLE);
  // } else if(senseL < senseR) {
  //   vel *= rot(TURN_ANGLE);
  // }

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
  float id = (floor(gl_FragCoord.x) + floor(gl_FragCoord.y) * u_tex_fbo_res.x) * .0001;

  vec4 particle = texture2D(u_tex_fbo, v_position);
  vec2 pos = particle.xy;
  vec2 vel = particle.zw;
  float mass = rnd(id);
  // float mass = sin(rnd(id)*6.28-u_time);
  // if(mod(floor(u_time / 4.),2.)==0.) mass==1.-mass;

  // init
  if(rnd(id + u_time) < RESPAWN_P || u_tick < 2.) {
    // gl_FragColor.r = (rnd(id + 1. + u_time * .001 + length(pos)) * 2. - 1.);
    // gl_FragColor.g = (rnd(id + 2. + u_time * .001 + length(pos)) * 2. - 1.);
    float angle = rnd(id + u_time * .001) * 2. * 3.1415;
    gl_FragColor.rg = vec2(RESPAWN_RADIUS, 0) * rot(angle) / u_resolution * u_resolution.y;
    gl_FragColor.ba = vec2(.0001, 0) * rot(rnd(id) * 2. * 3.1415);
  }

  // physics
  else {
    // // force
    vel *= 1. - FRICTION;
    // vel = normalize(vel);

    // vel.x += .001 * snoise3d(u_time*.02 + vec3(u_time * .001, pos));
    // vel.y += .001 * snoise3d(u_time*.02 + vec3(u_time * .001, pos + 99.));
    // vel.x += .002 * snoise2d(pos * 32. + u_mouse.x);
    // vel.y += .002 * snoise2d(pos * 32. + u_mouse.x + 99.);
  //  vel += vec2(-.001,0) * rot(atan(pos.y, pos.x));

  // spinning
    // vel += vec2(0, -.0005) * rot(atan(pos.y, pos.x));

    vel += turn(pos, normalize(vel), mass) * STEP_SIZE * 10000.;// * 1.001;

    // vel -= REPULSION * grad(pos);

    // vec2 vecToCenter = u_mouse - pos;
    // float repulsion = 1. / length(vecToCenter);
    // vel -= sign(rnd(id) - .9) * repulsion * vec2(.0001, 0) * rot(atan(vecToCenter.y, vecToCenter.x));

    // // reflect from circle
    // if(length(pos * u_resolution / u_resolution.y) > REFLECT_RADIUS) {
    //   pos = normalize(pos * u_resolution / u_resolution.y) * REFLECT_RADIUS;
    //   vec2 n = normalize(vec2(pos * u_resolution / u_resolution.y));
    //   vel = reflect(vel, -n);
    // }

    pos += vel / u_resolution * u_resolution.y;// / mass;
    pos = fract(pos * .5 + .5) * 2. - 1.;
    gl_FragColor = vec4(pos, vel);
  }
}