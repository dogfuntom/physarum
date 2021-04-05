precision mediump float;
uniform sampler2D u_texture;
precision mediump float;

uniform sampler2D prevStateCells;
uniform sampler2D prevStateFeromones;
uniform float tick;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
varying vec2 uv;

// #define prevStateFeromones prevStateCells
#define R 4. // interaction radius
#define C 1. // max speed
#define LOOKUP_DIST (.01 * smoothstep(.0, .5, length(uv - u_mouse)))
#define LOOKUP_ANGLE 3.14159265 / 6.
#define rnd(x) fract(54321.987*sin(mod(987.12345 * x, 1.12345)))
#define rot(a) mat2(cos(a),-sin(a),sin(a),cos(a))
#define REPLICATION .01
#define REPULSION 1.
#define DIRECTED_FEROMONES 0

vec2 turn(vec2 uv, vec2 v){
vec2 sensorL = uv+(rot(-LOOKUP_ANGLE)*v)*LOOKUP_DIST; // location of sensor A
vec2 sensorC = uv+v*LOOKUP_DIST;
vec2 sensorR = uv+(rot(LOOKUP_ANGLE)*v)*LOOKUP_DIST;

float senseL, senseC, senseR;
if(DIRECTED_FEROMONES == 1) {
    senseL = dot(v, texture2D(prevStateFeromones, sensorL).rg);
    senseC = dot(v, texture2D(prevStateFeromones, sensorC).rg);
    senseR = dot(v, texture2D(prevStateFeromones, sensorR).rg);
}
else {
    senseL = texture2D(prevStateFeromones, sensorL).a;
    senseC = texture2D(prevStateFeromones, sensorC).a;
    senseR = texture2D(prevStateFeromones, sensorR).a;
    // senseL = sensorL.x;
    // senseC = sensorC.x;
    // senseR = sensorR.x;
}

if (senseC < senseL && senseC < senseR){
if(rnd(v.x)<.5)
    v*=rot(LOOKUP_ANGLE);
else
    v*=rot(-LOOKUP_ANGLE);
}
else if(senseL < senseR){
    v *= rot(-LOOKUP_ANGLE);
}
else if(senseL > senseR){
    v *= rot(LOOKUP_ANGLE);
}
return v;
}


void main(){
// gl_FragColor = vec4(vec3(length(uv)), 1);
  vec2 p_g, v_g;
  vec4 n,g;
  // if(mod(u_time, 2e5) <= .1) {
  if(tick <= 1.) {
      if(length(mod(vec2(gl_FragCoord.xy-.5), 10.)) == 0. && length(uv-.5) < .5)
          // gl_FragColor = vec4(.5, .5, -(uv + .5) * .5 + .5);
          gl_FragColor = vec4(.5, .5, .0, 1.);
          // gl_FragColor = vec4(.5, .5, (vec2(1,0) * rot(atan(uv.y, uv.x))) * .5 + .5);
          return;
      }
  float sig = rnd(length(uv)) > .5 ? 1. : -1.;
  for(float i = -C; i <= C; i++) {
  for(float j = -C; j <= C; j++) {
      vec2 ij = sig * vec2(i, j);
      vec2 uv_g = fract(uv + ij / u_resolution.xy);
      g = texture2D(prevStateCells,uv_g);
      if(length(g) == 0.) continue;
      p_g = g.rg + ij;
      v_g = g.ba;
      if(p_g + v_g == fract(p_g + v_g)){
      p_g = fract(p_g + v_g);
      v_g = turn(uv_g, v_g);

      //v_g+=vec2(.0,.2)*rot(atan(uv.y-.5,uv.x-.5));

      vec2 g_ij = ij;
      // for(float di=-R*sig;abs(di)<=R;di+=sig){
          // for(float dj=-R*sig;abs(dj)<=R;dj+=sig){
      for(float di=-R;di<=R;di+=1.){
          for(float dj=-R;dj<=R;dj+=1.){
              vec2 n_ij = vec2(g_ij.x + sig * di, g_ij.y + sig * dj);
              if(length(n_ij)>0.&&length(n_ij)<R){
                  vec2 uv_n=fract(uv+n_ij/u_resolution.xy);
                  n=texture2D(prevStateCells,uv_n);
                  if(length(n)==0.)continue;
                  vec2 p_n = n.rg+n_ij;
                  float dist=length(p_g-p_n);
                  v_g+=REPULSION * normalize(p_g - p_n) / (dist * dist);
              }
          }
      }

      v_g = C * normalize(v_g);
      gl_FragColor=vec4(p_g,v_g);
      break;
      }
  }
  }

  if(length(gl_FragColor)==0.){
      vec2 ij=vec2(.0,2.)*rot(3.14159265*.5*mod(tick,4.));
      vec4 n=texture2D(prevStateCells,fract(uv+ij/u_resolution.xy));
      if(length(n)==0.)
          return;
      if(rnd(length(uv)+fract(u_time))<REPLICATION)
          gl_FragColor=n;
  }

}

