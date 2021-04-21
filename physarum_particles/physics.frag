
  precision mediump float;

  varying vec2 v_texcoord;
  uniform sampler2D u_texture;
  

vec2 norm(vec2 p){
    vec2 e = vec2(.01,0.);
  	return normalize(vec2(
    	texture2D(u_texture, p + e.xy).r - texture2D(u_texture, p - e.xy).r , 
    	texture2D(u_texture, p + e.yx).r - texture2D(u_texture, p - e.yx).r 
     ));
}


  void main() {
    vec4 particle = texture2D(u_texture, v_texcoord);
    vec2 r, d, a, x, v;

    x = particle.xy;
    v = particle.zw;

    v *= .5;
    v += .002 * norm(x);


    gl_FragColor = vec4(fract(x + v), v);
  }