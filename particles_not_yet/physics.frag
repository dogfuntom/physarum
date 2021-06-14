precision mediump float;

varying vec2 v_texcoord;
uniform sampler2D u_texture;


// vec2 norm(vec2 p) {
//   vec2 e = vec2(.01, 0.);
//   return normalize(vec2(texture2D(u_texture, p + e.xy).r - texture2D(u_texture, p - e.xy).r, texture2D(u_texture, p + e.yx).r - texture2D(u_texture, p - e.yx).r));
// }

void main() {
  vec2 uv=v_texcoord;
  vec4 particle = texture2D(u_texture, v_texcoord);

  vec2 x = particle.xy;
  vec2 v = vec2(.001);//*length(uv);
  float a = atan(uv.y-.5, uv.x-.5);
  v.x*=sin(a);
  v.y*=-cos(a);

  // v *= .5;
  // v += .002 * norm(x);


  gl_FragColor = vec4(fract(x + v), v);
}