  precision mediump float;

  attribute vec2 v_texcoord;
  uniform sampler2D u_tex_fbo;
  varying vec3 color;   

  void main () {
    vec4 particle = texture2D(u_tex_fbo, v_texcoord);
    vec2 pos = fract(particle.xy);
    gl_Position = vec4(pos * 2. - 1., 0, 1);
    gl_PointSize = 1.0;
  }