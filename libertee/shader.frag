#version 300 es
precision mediump float;
out vec4 outColor;

precision highp float;
uniform vec2 resolution;
uniform samplerCube tex_car;
uniform samplerCube tex_bazar;
uniform samplerCube tex_xiao;
uniform vec2 mouse;
uniform float time;

#define o outColor
#define FC gl_FragCoord
#define t time
#define res resolution
#define m mouse
#define rotate2D rot

#define BRICK_SIZE vec3(1.2, 2.5, .65)

#define rnd(x) fract(54321.987 * sin(987.12345 * x))
#pragma glslify: box = require('glsl-sdf-box') 

mat2 rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);}

void main(){
vec2 uv = (FC.xy*2.-res)/res.y;
float i=0.,j,d,s,sc,e=1.,brickId;
vec3 p, pb;
for(;++i<64.&&e>.00001;){
  p=d*normalize(vec3((FC.xy-.5*res)/res.y,1));
  
  pb=p;
  pb.z+=t*.01;
  pb.y-=.004;
  brickId=floor(mod(pb.z/2.,.08)*2./.08);
  pb.z=mod(pb.z,.08)-.04;
  pb.zx*=rot(t+p.z*100.);
  pb.zy*=rot(t*.73+p.z*100.);
  float brick=box(pb, BRICK_SIZE*.001)-.0001;
  brick*=.8;
  
  p.z+=t*.01;
  p.z = mod(p.z,2.)-1.;
  p.y += .8;
// 	p.x = mod(p.x,2.)-1.;
  sc=1.;
	for (j=0.;j<10.;j++){
		p=abs(p);
  	p-=vec3(.5+.01*cos(t*0.),2.+.05*sin(t*0.),.5);
  	float dist = dot(p,p);
		s=2./clamp(dist,.1,1.);
		p*=s;
		sc*=s;
				// p.xz*=rotate2D(t*.1);
		p-=vec3(0.,5.,0.);
	}
  float dd=((length(p)-1.)/sc);
  d+=e=min(dd,brick);
  //d+=e=dd;
}
vec4 bazar=texture(tex_bazar, pb/BRICK_SIZE*vec3(-1));
vec4 xiao= texture(tex_xiao , pb/BRICK_SIZE*vec3(-1));
o+=9./i*mix(bazar, xiao, brickId);
o.a=1.;
}