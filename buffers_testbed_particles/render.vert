  precision mediump float;

  attribute vec2 v_position;
  uniform sampler2D u_tex_fbo;
  varying vec4 color;

  void main () {
    vec4 particle = texture2D(u_tex_fbo, v_position);
    vec2 pos = fract(particle.xy);
    vec2 vel = particle.zw * 2. - 1.;
    gl_Position = vec4(pos * 2. - 1., 0, 1);
    gl_PointSize = 1.;
    color = mix(#FFFF00FF, #FF00FFFF, length(vel.y*500.));
  }