  precision mediump float;
  varying vec2 uv;
  uniform vec2 u_resolution;
  uniform sampler2D prevStateCells;
  #define rnd(x) fract(54321.987 * sin(987.12345 * x))

  void main() {
    gl_FragColor = texture2D(prevStateCells, uv);
    gl_FragColor.rgb *= mat3(0, .4, 0, 0, .92, .7 ,1,.0,1);
  }