let e,t,o,a,n,i;tokenData.hash="0x19983dc66d38fbcd2444401326a327a2da8f37687f0e87a829b2c78283831e0b";let f=Math,r=e=>e[0].map(((t,o)=>e.slice().reverse().map((e=>e[o]))));const l=0,s=3,c=4,A=5,y=6,m=7,x=30;let b,u,z,d,v,p,h,g,k,M,D,$,B,E,T,N,w,I,S=.95532,q=()=>{e=Uint32Array.from([0,1,t=a=2,3].map((e=>parseInt(tokenData.hash.substr(8*e+2,8),16)))),o=()=>(a=e[3],e[3]=e[2],e[2]=e[1],e[1]=t=e[0],a^=a<<11,e[0]^=a^a>>>8^t>>>19,e[0]/2**32),n=(e,t)=>e[e.length*o()**(t||1)|0],i=e=>e.sort((()=>o()-.5)),T=[],w=1e-6,D={t:o()**4*2|0,o:o()**8*2|0,i:0,l:5*(1-o()**.3)|0,A:0,m:0,u:0,v:0,p:0,h:n([2,1],.5),g:(3*o()|0)-1},b=3.1415*(D.t-.5)/2-3.1415;let f=[{k:8+2*o()|0,M:30,D:5,$:8,B:0},{k:8+2*o()|0,M:30,D:3,$:8,B:o()**4*8},{k:4,M:3+4*o()|0,D:0,$:1,B:1},{k:6+4*o()|0,M:10+20*o()|0,D:2,$:6,B:2*o()},{k:6+(0|o()),M:10+10*o()|0,D:0,$:4,B:o()**2*3}];D.A=o()**.3*f.length|0,({k:p,M:h,D:g,$:k,B:M}=f[D.A]),numberOfBlockTypes=2+2*o()|0,E=[],D.i=o()**.5*8|0,N="dddddd888888555555222222aaaaaaf26b21fbb04099ca3c208b3afcec529b5de5f15bb500bbf900f5d4fee440f1faeea8dadc457b9d1d3557e6394650514ff25f5c247ba070c1b3ffe066541388d90368f1e9da2e294effd4001f20414b3f72119da419647effc857540d6eee4266f3fcf01f271bffd23fe4572e29335ca8c686669bbcf3a712".match(/(.{30})/g).map((e=>e.match(/(.{6})/g).map((e=>"#"+e))))[D.i];let r=N.pop();N=i(N),N.push(r),2==D.l&&(N=N.slice(0,2))};function H(){let e=i([{size:[2,1,2],T:[[0,1],[0,1]],type:s},{size:[2,1,2],N:[[0,1],[0,1]],type:c},{size:[2,1,4],type:l},{size:[2,1,3],type:l},{size:[1,1,6],type:l},{size:[1,2,3],N:[[1,0,1]],type:A},{size:[1,1,3],type:l},{size:[2,1,2],type:l},{size:[1,1,1],type:l},{size:[1,2,1],type:l}].filter((e=>e.size[2]<p))).slice(0,numberOfBlockTypes),t=i([{size:[1,4,1],T:[[0]],type:6},{size:[1,.5,1],T:[[0]],type:7}]);$=Array(p).fill().map((()=>Array(p).fill(0))),B=Array(p).fill().map((()=>Array(p).fill(0)));for(let a=0;a<h;a++){let i,l,s,c=0,A=-9e9,y=0,m=n(e);a>=h-M&&4!=D.l&&(m=n(t,.7),g=6,k=6,y=1);for(let e=0;e<k;e++){s=JSON.parse(JSON.stringify(m)),s.color=o()*(N.length-1|0)+1,s.I=o()*(N.length-1|0)+1,s.S=4*o()|0,1==D.l&&(s.S=0),s.q=1,s.H=4*o()|0,7==s.type&&(s.H=0);let t=()=>Array(9).fill(Array(9).fill(1));s.N=s.N||t(),s.T=s.T||t(),s.span=[...s.size];for(let e=0;e<s.H;e++)s.span.reverse(),s.N=r(s.N),s.T=r(s.T),s.q=!s.q;if(s.span[0]>p/2){k<30&&k++;continue}s.J=p%2==0?[s.span[0]/2+(o()*(p/2+1-s.span[0])|0),0,-p/2+s.span[2]/2+(o()*(p+1-s.span[2])|0)]:[s.span[0]/2+(o()*((p-1)/2+1-s.span[0])|0)+.5,0,-p/2+s.span[2]/2+(o()*(p+1-s.span[2])|0)],s.span[0]%2==p%2&&o()<1/(p-s.span[0])&&(s.span[0]%2||s.q)&&(s.J[0]=0);let a=0,n=0,y=[...Array(s.span[0])].map(((e,t)=>s.J[0]+t-(s.span[0]-1)/2)),x=[...Array(s.span[2])].map(((e,t)=>s.J[2]+t-(s.span[2]-1)/2));for(let e of y)for(let t of x)e>=0?n++:a++;let b=0,u=0,z=0,d=0;for(let e of x)for(let t of y){let o=d%s.span[0],a=floor(d/s.span[0]);d++,u=max(u,$[t+p/2-.5][e+p/2-.5]),z=max(z,B[t+p/2-.5][e+p/2-.5]),1==s.N[o][a]&&(b=max(b,$[t+p/2-.5][e+p/2-.5]))}b<z||b>u?k<30&&k++:(i=[0,-f.hypot(s.J[0],s.J[2]),-b,-f.hypot(s.J[0],b-10,s.J[2]),-abs(f.hypot(s.J[0],b-10,s.J[2])-p),-abs(f.hypot(s.J[0],2*b,s.J[2])-p),2*b+s.J[2]][g],(i>A||0==e)&&(A=i,c=b,l=s))}if(l&&(l.J[1]=c+l.size[1]/2,l.J[1])){if(y&&l.J[1]-l.span[1]/2==0)continue;let e=Array(l.span[0]).fill().map(((e,t)=>l.J[0]+t-(l.span[0]-1)/2)),t=Array(l.span[2]).fill().map(((e,t)=>l.J[2]+t-(l.span[2]-1)/2)),o=0;for(let a of t)for(let t of e){let e=o%l.span[0],n=floor(o/l.span[0]);o++,$[t+p/2-.5][a+p/2-.5]=c+l.size[1],0==l.T[e][n]&&($[t+p/2-.5][a+p/2-.5]=-99),B[t+p/2-.5][a+p/2-.5]=c+l.size[1]}E.push(l);for(let e=0;e++<8;){let t=[0,0,0].map(((t,o)=>(e>>o&1)-.5));T.push([t[0]*(l.span[0]+2*l.J[0]),t[1]*l.span[1]+l.J[1],t[2]*l.span[2]+l.J[2]])}}}}let J,F=()=>{I={top:-1e9,bottom:1e9,left:1e9,right:-1e9};let e=(e,t,o)=>[e*cos(o)-t*sin(o),e*sin(o)+t*cos(o)];T.forEach((t=>{let[o,a,n]=t;[o,n]=e(o,n,-b),[a,n]=e(a,n,-S),I.left=min(o,I.left),I.right=max(o,I.right),I.bottom=min(a,I.bottom),I.top=max(a,I.top)})),I.width=I.right-I.left,I.height=I.top-I.bottom,I.scale=max(I.width/1.8,I.height/1.8,1),I.offset={x:I.left+I.width/2,y:I.bottom+I.height/2}};function setup(){J=min(windowHeight,windowWidth),d=createCanvas(J,J,WEBGL),z=createGraphics(width,height,WEBGL),q(),background(N[0]),H(),F(),v=N.map((e=>color(e).levels.slice(0,3))).flat().map((e=>e/255)),u_colors=E.map((e=>[e.color,e.I,e.S])).flat(),console.log(E.map((e=>e.type))),console.log(E.filter((e=>7==e.type)));let e="";e+=E.map(((e,t)=>`positions[${t}]=vec3(${e.J[0]},${e.J[1]},${e.J[2]});`)).join(""),e+=E.map(((e,t)=>`sizes[${t}]=vec3(${e.size[0]},${e.size[1]},${e.size[2]});`)).join(""),e+=E.map(((e,t)=>`colors[${t}]=ivec3(${e.color},${e.I},${e.S});`)).join(""),e+=E.map(((e,t)=>`roty[${t}]=vec2(${e.H},${e.type});`)).join(""),u=createShader("attribute vec3 aPosition;varying vec2 uv;void main(){uv=(gl_Position=vec4(aPosition,1.)*2.-1.).xy;}",`precision highp float;\n#define A 60\n#define B 3.1415\n#define C smoothstep\n#define D vec3\n#define E vec2\nfloat F(float G){return fract(54321.987*sin(987.12345*mod(G,12.34567)));}mat2 H(float I){return mat2(cos(I),-sin(I),sin(I),cos(I));}\n#define J 4e2\n#define K .001\nfloat L(float M){return sqrt(abs(M)*abs(M)+5e-5);}float N(float I,float O){return(I+O+L(I-O))*.5;}varying vec2 uv;vec3 positions[A];vec3 sizes[A];vec2 roty[A];ivec3 colors[A];bool P[A];uniform D palette[20];uniform sampler2D backbuffer;uniform float tick;uniform float res;ivec3 Q;float R;float S=1e2;float T(D M,D U,float V){M.y-=clamp(M.y,-U.x,U.x);float W=length(M.xz)-U.z;W-=clamp(W,-U.y,U.y);float T=length(E(W,M.y))-V;return T;}E X(){vec2 Y=vec2(F(length(uv)-tick),F(length(uv)-tick-.1));float Z=.5;E I;I.x=.5*pow(abs(2.*((Y.x<0.5)?Y.x:1.-Y.x)),Z);I.y=.5*pow(abs(2.*((Y.y<0.5)?Y.y:1.-Y.y)),Z);Y.x=(Y.x<0.5)?I.x:1.-I.x;Y.y=(Y.y<0.5)?I.y:1.-I.y;return Y*2.-1.;}int a;vec2 b(vec3 c,vec3 d,vec3 e){vec3 f=1./d;vec3 g=f*c;vec3 Z=abs(f)*e;vec3 h=-g-Z;vec3 i=-g+Z;float j=max(max(h.x,h.y),h.z);float k=min(min(i.x,i.y),i.z);if(j>k||k<0.)return vec2(-1.);return vec2(j,k);}float l(D M){Q=ivec3(0,0,-1);M.x=abs(M.x);float m=M.y+1.;for(int n=0;n<A;n++){if(n>=1)break;a=0;D o=M;if(!P[n])continue;o-=positions[n];o.xz*=H(roty[n].x*B/2.);float V=.01;float p=.008;float q;if(roty[n].y==0.||roty[n].y==3.||roty[n].y==4.||roty[n].y==5.||roty[n].y==6.){D U=sizes[n]-2.*(V+p);q=length(o-clamp(o,-(U)/2.,(U)/2.))-V*1.4;}else if(roty[n].y==1.){q=max(length(o.xz)-.5,abs(o.y)-.5);}else if(roty[n].y==2.){q=length(o)-.52;}if(roty[n].y==5.){float T=length(o.zy)-.5;float r=max(abs(o.z)-.5,abs(o.y+sizes[n].y/2.)-1.);float s=min(T,r);q=max(q,-s);}if(roty[n].y==6.){float t=length(o.zx)-.15;float u=T(o+D(0,sizes[n].y-.5,0)/2.,D(.2,.25,.2),V);q=max(q,min(t,u));}if(roty[n].y!=6.){D v=o;E w=sizes[n].xz;v.xz+=(w-1.)/2.;v.xz=v.xz-clamp(floor(v.xz+.5),E(0.),w-1.);float x=.24;float y=(${D.o}==1)?abs(length(v.xz)-.28+.05)-.05:length(v.xz)-.28;y=max(y,abs(v.y-sizes[n].y/2.-x/2.)-x/2.);q=min(y,q);}if(o.z<0.15&&(roty[n].y==3.||roty[n].y==4.)){q=N(q,(-o.z*.8-(roty[n].y==3.?-1.:1.)*o.y-.5)/1.4142);}if(roty[n].y==7.){float z=T(o,D(.2,.25,.2),V);q=z;if(z<K){a=1;}}if(q<m){m=q;Q=colors[n];}if(m<K)break;}return m;}D AA(D M){E AB=E(.01,0.);return normalize(D(l(M+AB.xyy)-l(M-AB.xyy),l(M+AB.yxy)-l(M-AB.yxy),l(M+AB.yyx)-l(M-AB.yyx)));}void main(){${e}R=0.;float AC=0.,AB=1e9,AD,AE;float AF=floor(tick/2.);float AG=mod(tick,2.);vec2 AH=vec2(AG/2.,AF/4.);if(mod(AF,2.)==0.)AH.x+=.25;E AI=uv+AH/res;D M,c=D(AI*float(${I.scale})+E(${I.offset.x},${I.offset.y}),-S),d=D(0,0,1),AJ;float AK=0.;for(int n=0;n<A;n++){if(n>=1)break;vec3 AL=sizes[n]*.5;vec3 AM=c,AN=d;AM.yz*=-H(${S});AM.xz*=-H(${b});AN.yz*=-H(${S});AN.xz*=-H(${b});AM+=positions[n];AL.xz*=-H(roty[n].x*B/2.);float AO=step(0.,b(AM,AN,AL.zyx).r);AK=max(AO,AK);P[n]=bool(AO);}if(AK==0.)discard;bool AP=false;for(float n=0.;n<J;n++){AE=n;M=AC*d+c;M.z-=S;M.yz*=H(${S});M.xz*=H(${b});AC+=AB=l(M);if(AD<AB&&AB<.01){AP=true;break;}AD=AB;if(AB<K||AB>S*2.)break;}if(!AP){D AQ,AR;for(int AE=0;AE<20;AE++){if(Q[0]==AE)AQ=palette[AE];if(Q[1]==AE)AR=palette[AE];}D AS=AQ;if(Q.z==1)if(sin(M.y*B*3.)>0.)AS=AR;if(Q.z==2)if(sin((M.x+fract(positions[0].x-sizes[0].x/2.))*B*2.*1.5)>0.)AS=AR;if(${D.l}==3)AS=sin(length(M)/max(float(${p}),float(${D.m}))*6.28*2.-D(0,B*2./3.,B*4./3.))*.5+.5;if(a==1){AS=D(0);D AT=M+fract(${p}./2.);AT=fract(AT)-.5;AS+=step(.3,length(AT.xz));AS+=step(-.1,-length(AT.xz+.1));}if(Q.z==-1){AJ=palette[0];if(length(AJ)>.4)AJ*=smoothstep(5.,0.,length(AI+E(${D.g},-1)));if(${D.l}==3)AJ=D(.2);if(sin(length(pow(abs(AI),E(${D.h})))*32.)>0.)AJ*=.95;}else{AJ=(min(1.5,14./AE)*.2+.8)*(dot(AA(M),normalize(D(0,1,1)))*.2+.8)*AS;AJ+=pow(abs(dot(AA(M),normalize(D(0.,3.,1.)))),40.);}}AJ=(D(3./AE));gl_FragColor=mix(texture2D(backbuffer,uv*E(1,-1)*.5+.5),vec4(AJ,1),1./(tick+1.));}`)}let Y=+new Date;function draw(){z.clear(),z.image(d,-.5*width,-.5*height,width,height),clear(),shader(u),u.setUniform("backbuffer",z),u.setUniform("tick",w),u.setUniform("palette",v),u.setUniform("res",J),console.log("size",J),rect(0,0,width,height),console.log("u_tick",w),++w>8.5&&(noLoop(),console.log("time",new Date-Y)),window.document.title=50-w>0?floor(50-w):"👾"}'tx shvembldr piter'