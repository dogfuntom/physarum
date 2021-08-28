precision highp float;
varying vec2 vPos;
uniform sampler2D blue;
uniform float t;
uniform vec2 res;

#define rot(a) mat2(cos(a),-sin(a),sin(a),cos(a));
#define rnd(x) fract(54321.987 * sin(987.12345 * fract(x)))

void main() {
  vec2 uv = (gl_FragCoord.xy * 2. - res) / min(res.x, res.y);
  float n = texture2D(blue, fract(gl_FragCoord.xy / res)).r;
  // vec2 offset = vec2(0,.5);
  // offset*=rot(t-n*4.);
  // gl_FragColor=mix(vec4(1,0,0,1),vec4(0,0,1,1),smoothstep(n-.1,n+.1,length(uv-offset)));

  float j, d, e = 1.;
  vec3 p;
  for(float i = 1.; i < 99.; i++) {
    j = i;
    p = normalize(vec3(uv, 1)) * d * (1. - n * .6);
    p.z -= 1.;

    d += e = length(p) - .5;
    if(e < .01)
      break;
  }
  gl_FragColor += 3. / j;
  gl_FragColor.a = 1.;
}