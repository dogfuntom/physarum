  precision mediump float;
  varying vec2 uv;
  uniform vec2 u_resolution;
  uniform sampler2D prevStateCells;
  uniform sampler2D prevStateFeromones;
  #define rnd(x) fract(54321.987 * sin(987.12345 * x))
  void main() {
    gl_FragColor += step(1e-8, length(texture2D(prevStateCells, uv)));
    gl_FragColor.a = 1.;
    gl_FragColor.r += texture2D(prevStateFeromones, uv).a;
    gl_FragColor.gb += texture2D(prevStateFeromones, uv).rg;
    gl_FragColor = clamp(gl_FragColor, 0., 1.);
    // gl_FragColor = pow(gl_FragColor, vec4(4));
  }