precision mediump float;

varying vec2 v_position;
uniform sampler2D u_tex_fbo;
uniform float u_time;
uniform float u_tick;

#define rnd(x) fract(54321.987 * sin(987.12345 * x))

void main() {
  // init
  if(u_tick < 10.) {
    gl_FragColor.r += rnd(length(v_position) + u_time + 0.);
    gl_FragColor.g += rnd(length(v_position) + u_time + 1.);
    gl_FragColor.b += rnd(length(v_position) + u_time + 2.);
    gl_FragColor.a += rnd(length(v_position) + u_time + 3.);
  }

  // physics
  else {
    vec4 particle = texture2D(u_tex_fbo, v_position);
    vec2 pos = particle.xy;
    vec2 vel = particle.zw * 2. - 1.;
    pos += .001 * vel;
    // pos.y += .001;
    gl_FragColor = vec4(pos, vel * .5 + .5);
  }
}