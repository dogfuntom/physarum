precision highp float;
#define A 60
#define B 3.1415
#define C smoothstep
#define D vec3
#define E vec2
float F(float G){return fract(54321.987*sin(987.12345*mod(G,12.34567)));}mat2 H(float I){return mat2(cos(I),-sin(I),sin(I),cos(I));}
#define J 4e2
#define K .001
float L(float M){return sqrt(abs(M)*abs(M)+5e-5);}float N(float I,float O){return(I+O+L(I-O))*.5;}varying vec2 uv;vec3 positions[A];vec3 sizes[A];vec2 roty[A];ivec3 colors[A];uniform D palette[20];uniform sampler2D backbuffer;uniform float tick;ivec3 P;float Q;float R=400.;E S=E(${width},${height})*${pixelDensity()+1e-6};float T(D M,D U,float V){M.y-=clamp(M.y,-U.x,U.x);float W=length(M.xz)-U.z;W-=clamp(W,-U.y,U.y);float T=length(E(W,M.y))-V;return T;}E X(){vec2 Y=vec2(F(length(uv)-tick),F(length(uv)-tick-.1));float Z=.5;E I;I.x=.5*pow(abs(2.*((Y.x<0.5)?Y.x:1.-Y.x)),Z);I.y=.5*pow(abs(2.*((Y.y<0.5)?Y.y:1.-Y.y)),Z);Y.x=(Y.x<0.5)?I.x:1.-I.x;Y.y=(Y.y<0.5)?I.y:1.-I.y;return Y*2.-1.;}int a;float b(D M){P=ivec3(0,0,-1);M.x=abs(M.x);float c=M.y+1.;for(int d=0;d<A;d++){a=0;if(d>=${blocks.length})break;D e=M;e-=positions[d];e.xz*=H(roty[d].x*B/2.);float V=.01;float f=.008;float g;if(roty[d].y==0.||roty[d].y==3.||roty[d].y==4.||roty[d].y==5.||roty[d].y==6.){D U=sizes[d]-2.*(V+f);g=length(e-clamp(e,-(U)/2.,(U)/2.))-V*1.4;}else if(roty[d].y==1.){g=max(length(e.xz)-.5,abs(e.y)-.5);}else if(roty[d].y==2.){g=length(e)-.52;}if(roty[d].y==5.){float T=length(e.zy)-.5;float h=max(abs(e.z)-.5,abs(e.y+sizes[d].y/2.)-1.);float i=min(T,h);g=max(g,-i);}if(roty[d].y==6.){float j=length(e.zx)-.15;float k=T(e+D(0,sizes[d].y-.5,0)/2.,D(.2,.25,.2),V);g=max(g,min(j,k));}if(roty[d].y!=6.){D l=e;E m=sizes[d].xz;l.xz+=(m-1.)/2.;l.xz=l.xz-clamp(floor(l.xz+.5),E(0.),m-1.);float n=.24;float o=(${features.Studs}==1)?abs(length(l.xz)-.28+.05)-.05:length(l.xz)-.28;o=max(o,abs(l.y-sizes[d].y/2.-n/2.)-n/2.);g=min(o,g);}if(e.z<0.15&&(roty[d].y==3.||roty[d].y==4.)){g=N(g,(-e.z*.8-(roty[d].y==3.?-1.:1.)*e.y-.5)/1.4142);}if(roty[d].y==7.){float p=T(e,D(.2,.25,.2),V);g=p;if(p<K){a=1;}}if(g<c){c=g;P=colors[d];}if(c<K)break;}return c;}D q(D M){E r=E(.01,0.);return normalize(D(b(M+r.xyy)-b(M-r.xyy),b(M+r.yxy)-b(M-r.yxy),b(M+r.yyx)-b(M-r.yyx)));}void main(){${uniforms}Q=0.;float s=0.,r=1e9,t,u;E v=(uv*S/min(S.x,S.y))+X()*1.5/S;D M,w=D(v*float(${viewBox.scale})+E(${viewBox.offset.x},${viewBox.offset.y}),-R),x=D(0,0,.9+.1*F(length(v))),y;bool z=false;for(float d=0.;d<J;d++){u=d;M=s*x+w;M.z-=R;M.yz*=H(${u_camAngYZ});M.xz*=H(${u_camAngXZ});s+=r=b(M);if(t<r&&r<.01){z=true;break;}t=r;if(r<K||r>R*2.)break;}if(!z){D AA,AB;for(int u=0;u<20;u++){if(P[0]==u)AA=palette[u];if(P[1]==u)AB=palette[u];}D AC=AA;if(P.z==1)if(sin(M.y*B*3.)>0.)AC=AB;if(P.z==2)if(sin((M.x+fract(positions[0].x-sizes[0].x/2.))*B*2.*1.5)>0.)AC=AB;if(${features.ColorScheme}==3)AC=sin(length(M)/max(float(${gs}),float(${features.Height}))*6.28*2.-D(0,B*2./3.,B*4./3.))*.5+.5;if(a==1){AC=D(0);D AD=M+fract(${gs}./2.);AD=fract(AD)-.5;AC+=step(.3,length(AD.xz));AC+=step(-.1,-length(AD.xz+.1));}if(P.z==-1){y=palette[0];if(length(y)>.4)y*=smoothstep(5.,0.,length(v+E(${features.BackgroundLight},-1)));if(${features.ColorScheme}==3)y=D(.2);if(sin(length(pow(abs(v),E(${features.BackgroundType})))*32.)>0.)y*=.95;}else{y=(min(1.5,14./u)*.2+.8)*(dot(q(M),normalize(D(0,1,1)))*.2+.8)*AC;y+=pow(abs(dot(q(M),normalize(D(0.,3.,1.)))),40.);}}if(${features.ColorScheme}==4)y=(D(10./u));gl_FragColor=mix(texture2D(backbuffer,uv*E(1,-1)*.5+.5),vec4(y,1),1./(tick+1.));}