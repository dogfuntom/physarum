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

// #pragma glslify: random = require(glsl-random)

// float random(vec2 co){
//     return fract(sin(dot(mod(co,123.321)-246.642, vec2(12.9898, 78.233))) * 43758.5453);
// }

// #define rnd(x) fract(54321.987 * sin(98.12345 * mod(x,12.321)-24.642))


uniform float LOOKUP_DIST;
uniform float LOOKUP_DIST_SPREAD;
#define LOOKUP_DIST_CENTER LOOKUP_DIST
uniform float LOOKUP_ANGLE;
uniform float LOOKUP_ANGLE_SPREAD;
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

float PHI = 1.61803398874989484820459;  // Φ = Golden Ratio   
float gold_noise(in vec2 xy, in float seed) {
  return fract(tan(distance(xy * PHI, xy) * seed) * xy.x);
}
#define rnd(x) gold_noise(vec2(x),123.321)
#define rnds(x,s) gold_noise(vec2(x),s)


vec2 turn(vec2 pos, vec2 vel, float mass) {

  vec2 uv = pos * .5 + .5;// + vec2(1, 0) / u_tex_draw_res);
  vec2 sensorL = uv + (rot(-LOOKUP_ANGLE * (1. - LOOKUP_ANGLE_SPREAD * mass)) * normalize(vel)) * LOOKUP_DIST * (1. - LOOKUP_DIST_SPREAD * mass);
  vec2 sensorC = uv + normalize(vel) * LOOKUP_DIST * (1. - LOOKUP_DIST_SPREAD * mass);
  vec2 sensorR = uv + (rot(LOOKUP_ANGLE * (1. - LOOKUP_ANGLE_SPREAD * mass)) * normalize(vel)) * LOOKUP_DIST * (1. - LOOKUP_DIST_SPREAD * mass);
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

// float rand(vec2 co){
//     return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
// }

void main() {
  float id = (floor(gl_FragCoord.x) + floor(gl_FragCoord.y) * u_tex_fbo_res.x) * 1.54321e-5;

  vec4 particle = texture2D(u_tex_fbo, v_position);
  vec2 pos = particle.xy;
  vec2 vel = particle.zw;
  float mass = rnd(gl_FragCoord.xy);
  // float mass = sin(rnd(id)*6.28-u_time);
  // if(mod(floor(u_time / 4.),2.)==0.) mass==1.-mass;

  // init
  if(u_tick < 2.){
    gl_FragColor.r = rnds(gl_FragCoord.xy,mod(u_time,1.))*2.-1.;
    gl_FragColor.g = rnds(gl_FragCoord.xy,mod(u_time,1.)+1.)*2.-1.;
    gl_FragColor.ba = vec2(.1, 0) * rot(rnd(gl_FragCoord.xy) * 2. * 3.1415);
    // gl_FragColor.ba = vec2(0);
    return;
  }

  // respawn
  if(rnds(gl_FragCoord.xy,fract(u_time)) < RESPAWN_P) {
    // gl_FragColor.r = (rnd(id + 1. + u_time * .001 + length(pos)) * 2. - 1.);
    // gl_FragColor.g = (rnd(id + 2. + u_time * .001 + length(pos)) * 2. - 1.);
    // float angle = rnd(id*RESPAWN_P*1e-2) * 2. * 3.1415;
    // float angle = rand(gl_FragCoord.xy*RESPAWN_P+u_time) * 2. * 3.1415;
    float angle = rnds(gl_FragCoord.xy, mod(u_time,1.81)) * 2. * 3.1415;
    gl_FragColor.rg = vec2(RESPAWN_RADIUS * (1. + .1 * (rnds(gl_FragCoord.xy, 8.) - rnds(gl_FragCoord.xy, 9.))), 0);
    gl_FragColor.rg *= rot(angle);
    gl_FragColor.rg = gl_FragColor.rg / u_resolution * u_resolution.y;
    gl_FragColor.ba = vec2(.0001, 0) * rot(rnds(gl_FragCoord.xy, 10.) * 2. * 3.1415);
    return;
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

    // vel -= REPULSION *.000000000001 * grad(pos);

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