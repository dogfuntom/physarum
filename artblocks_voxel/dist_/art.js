let e,t,r,a,o,l;window.location.hash&&(tokenData.hash=window.location.hash.slice(1)),console.log(tokenData.hash);let f,A,i,s,c,n,m,x,d,p,b,g,y,D,u,v,K,h=Math,E=Array,z=h.min,_=h.max,k=h.floor,P=h.abs,$=h.cos,X=h.sin,C=devicePixelRatio,T=location.href.split("#")[1],w=e=>e[0].map((t,r)=>e.slice().reverse().map(e=>e[r])),H=0,N=3,F=4,G=5,I=6,R=7,V=30,L=.95532,O=[...Array(1e3)].map(()=>[...Array(10)].map(()=>[0,0,0])),B=()=>{e=new Uint32Array([4,1,t=a=2,3].map(e=>parseInt(tokenData.hash.substr(8*e,8),16))),r=()=>(a=e[3],e[3]=e[2],e[2]=e[1],e[1]=t=e[0],a^=a<<11,e[0]^=a^a>>>8^t>>>19,e[0]/2**32),o=(e,t)=>e[e.length*r()**(t||1)|0],l=e=>e.map(e=>[e,r()]).sort((e,t)=>e[1]-t[1]).map(e=>e[0]),y=[],u_tick=1e-6,d=[r()**4*2|0,r()**8*2|0,0,4*(1-h.sqrt(1-(r()-1)**4))|0,0,o([2,1],.5),(3*r()|0)-1,0,0,0,0],f=(d[0]-.5)*h.PI/2-h.PI;let p=[[10,20+20*r(),3,8,r()**4*8],[4,4+4*r()|0,1,1,1],[8+2*r()|0,30,4,8,r()+2],[4+2*r()|0,6+4*r()|0,0,1,1+2*r()],[6+4*r()|0,10+20*r()|0,2,6,2*r()],[6+(2*r()|0),10+6*r()|0,0,4,3*r()]];d[4]=h.sqrt(1-(r()-1)**2)*p.length|0,[s,c,n,m,x]=p[d[4]],A=1+r()**.5*3|0,g=[],d[2]=r()**.5*8|0,i="dddddd888888555555222222aaaaaaf26b21fbb04099ca3c208b3afcec529b5de5f15bb500bbf900C2A8fee440f1faeea8dadc457b9d1d3557e6394650514ff25f5c247ba070c1b3ffe066541388d90368E4E4E42e294effd4001f20414b3f72119da419647effc857540d6eee4266d9d9d91f271bffd23fe4572e29335ca8c686669bbcf3a712".substr(30*d[2],30).match(/(.{2})/g).map(e=>Number("0x"+e)),u=4*r()|0},S=()=>{let e=l([[[2,1,2],[[0,1],[0,1]],0,N],[[2,1,2],0,[[0,1],[0,1]],F],[[2,1,4],0,0,H],[[2,1,3],0,0,H],[[1,1,6],0,0,H],[[1,2,3],0,[[1,0,1]],G],[[1,1,3],0,0,H],[[2,1,2],0,0,H],[[1,1,1],0,0,H],[[1,2,1],0,0,H]].filter(e=>e[0][2]<s)).slice(0,A),t=l([[[1,4,1],[[0]],0,I],[[1,.5,1],[[0]],0,R]]);p=[...E(s)].map(()=>E(s).fill(0)),b=[...E(s)].map(()=>E(s).fill(0));for(let a=0;a<c;a++){let l,f,A,i=0,D=-9e9,u=0,v=o(e);a>=c-x&&(v=o(t,.7),n=5,m=6,u=1);for(let e=0;e<m;e++){A=JSON.parse(JSON.stringify(v)),A[4]=4*r()+1|0,A[5]=4*r()+1|0,2==d[3]&&(A[4]=A[5]=1),A[6]=4*r()|0,1==d[3]&&(A[6]=0),A[7]=1,A[8]=4*r()|0,A[3]==R&&(A[8]=0);let t=()=>E(9).fill(E(9).fill(1));A[2]=A[2]||t(),A[1]=A[1]||t(),A[9]=[...A[0]];for(let e=0;e<A[8];e++)A[9].reverse(),A[2]=w(A[2]),A[1]=w(A[1]),A[7]=!A[7];if(A[9][0]>s/2){m<V&&m++;continue}A[10]=s%2==0?[A[9][0]/2+(r()*(s/2+1-A[9][0])|0),0,-s/2+A[9][2]/2+(r()*(s+1-A[9][2])|0)]:[A[9][0]/2+(r()*((s-1)/2+1-A[9][0])|0)+.5,0,-s/2+A[9][2]/2+(r()*(s+1-A[9][2])|0)],A[9][0]%2==s%2&&r()<1/(s-A[9][0])&&(A[9][0]%2||A[7])&&(A[10][0]=0);let a=0,o=0,c=[...E(A[9][0])].map((e,t)=>A[10][0]+t-(A[9][0]-1)/2),x=[...E(A[9][2])].map((e,t)=>A[10][2]+t-(A[9][2]-1)/2);for(let e of c)for(let t of x)e>=0?o++:a++;let g=0,y=0,u=0,K=0;for(let e of x)for(let t of c){let r=K%A[9][0],a=k(K/A[9][0]);K++,y=_(y,p[t+s/2-.5][e+s/2-.5]),u=_(u,b[t+s/2-.5][e+s/2-.5]),1==A[2][r][a]&&(g=_(g,p[t+s/2-.5][e+s/2-.5]))}g<u||g>y?m<V&&m++:(l=[0,-h.hypot(A[10][0],A[10][2]),-g,-h.hypot(A[10][0],g-10,A[10][2]),-P(h.hypot(A[10][0],2*g,A[10][2])-s),2*g+A[10][2]][n],(l>D||0==e)&&(D=l,i=g,f=A))}if(f&&(f[10][1]=i+f[0][1]/2,f[10][1])){if(u&&f[10][1]-f[9][1]/2==0)continue;let e=E(f[9][0]).fill().map((e,t)=>f[10][0]+t-(f[9][0]-1)/2),t=E(f[9][2]).fill().map((e,t)=>f[10][2]+t-(f[9][2]-1)/2),r=0;for(let a of t)for(let t of e){let e=r%f[9][0],o=k(r/f[9][0]);r++,p[t+s/2-.5][a+s/2-.5]=i+f[0][1],0==f[1][e][o]&&(p[t+s/2-.5][a+s/2-.5]=-99),b[t+s/2-.5][a+s/2-.5]=i+f[0][1]}g.push(f);for(let e=0;e<f[9][0];e++)for(let t=0;t<f[9][1];t++)for(let r=0;r<f[9][2];r++){let a=f[10][0]-f[9][0]/2+e+5|0,o=f[10][1]-f[9][1]/2+t|0,l=f[10][2]-f[9][2]/2+r+5|0;O[l+10*o][a][0]=O[l+10*o+10][a][1]=255*(g.length+1)/64}for(let e=0;e++<8;){let t=[0,0,0].map((t,r)=>(e>>r&1)-.5);y.push([t[0]*(f[9][0]+2*f[10][0]),t[1]*f[9][1]+f[10][1],t[2]*f[9][2]+f[10][2]])}}}},W=()=>{D=[-99,99,99,-99];let e=(e,t,r)=>[e*$(r)-t*X(r),e*X(r)+t*$(r)];y.forEach(t=>{let[r,a,o]=t;[r,o]=e(r,o,-f),[a,o]=e(a,o,-L),D[2]=z(r,D[2]),D[3]=_(r,D[3]),D[1]=z(a,D[1]),D[0]=_(a,D[0])}),D[4]=D[3]-D[2],D[5]=D[0]-D[1],D[6]=_(D[4]/1.8,D[5]/1.8,1),D[7]=D[2]+D[4]/2,D[8]=D[1]+D[5]/2};B(),S(),W(),console.log(i),u_colors=g.map(e=>[e[4],e[5],e[6]]).flat();let q=Array(64).fill([[0,0,0]]),Z=Array(64).fill([[0,0,0]]),Y=Array(64).fill([[0,0,0]]),M=Array(64).fill([[0,0,0]]);g.forEach((e,t)=>{q[t]=[e[10]],Z[t]=[e[0]],Y[t]=[[e[8],e[3],0]],M[t]=[[e[4],e[5],e[6]]]}),console.log(d);let J=h.min(innerWidth,innerHeight)*C,U=document.createElement("canvas");U.style.width=U.style.height=J/C+"px",J=z(J,2048);let Q=U.getContext("webgl",{preserveDrawingBuffer:!0});document.body.appendChild(U);let j=i.slice(3*u,3+3*u);U.style.background=3==d[3]?"#333":`rgb(${j})`,U.width=J,U.height=J;let ee=createREGL({gl:Q,extensions:["webgl_draw_buffers","oes_texture_float"]}),te=ee.texture(O),re=ee.texture({data:q,type:"float"}),ae=ee.texture({data:Z,type:"float"}),oe=ee.texture({data:Y,type:"float"}),le=ee.texture({data:M,type:"float"}),fe=[1,1].map(()=>ee.framebuffer({color:[ee.texture({type:"float",width:J,height:J}),ee.texture({type:"float",width:J,height:J})],depth:!1})),Ae={frag:`#extension GL_EXT_draw_buffers:require\nprecision highp float;@A 60@B 3.1415@C smoothstep@D vec3@E float@F normalize@G length@H vec2@rnd(x) fract(54321.987 * sin(987.12345 * x + .1))@R(a) mat2(cos(a),-sin(a),sin(a),cos(a))@I .0001\nE J(E K){→sqrt(abs(K)*abs(K)+5e-5);}E L(E M,E N){→(M+N+J(M-N))*.5;}D ps[A];D ss[A];H rt[A];ivec3 cs[A];uniform sampler2D sampler_ps;uniform sampler2D sampler_ss;uniform sampler2D sampler_rt;uniform sampler2D sampler_cs;uniform D pt[5];uniform E tk;E O=float(${J});uniform sampler2D tex3d;uniform sampler2D texCol;uniform sampler2D texNorm;ivec3 P=ivec3(0);E Q;E R=30.;ivec2 S;E T=.01,U=.015,V;E W=.015;int X;E Y(D K,D Z){H a=H(G(K.xz),K.y-clamp(K.y,I,Z.x));a.x-=clamp(a.x,Z.z,Z.y);→G(a)-I;}E b(D K,E X){D c=(texture2D(sampler_ps,vec2(.5,(X)/64.)).rgb);D d=(texture2D(sampler_rt,vec2(.5,(X)/64.)).rgb);D e=(texture2D(sampler_ss,vec2(.5,(X)/64.)).rgb);ivec3 f=ivec3(texture2D(sampler_cs,vec2(.5,(X)/64.)).rgb);K.x=abs(K.x);D g=K;g-=c;g.xz*=R(d.x*B/2.);D Z=e-2.*(T+U);V=G(g-clamp(g,-Z/2.,Z/2.))-T*1.4;if(d.y==5.){E h=G(g.zy)-.5;E i=max(abs(g.z)-.5,abs(g.y+e.y/2.)-1.);E j=min(h,i);V=max(V,-j);}if(d.y==6.){E k=Y(g+D(0,1.6-T*3.,0),D(3.55,.15,0));E l=Y(g+D(0,2.-T*2.,0),D(.4-T*2.,.45,0));V=min(k,l);}if(d.y!=6.){D m=g;H n=e.xz;m.xz+=(n-1.)/2.;m.xz=m.xz-clamp(floor(m.xz+.5),H(0.),n-1.);m.y-=e.y/2.+.02;E o=Y(m,D(.24,.28,mix(I,.18,${d[1]}.)));V=min(o,V);}if(g.z<.01&&(d.y==3.||d.y==4.)){V=L(V,dot(g,D(0,.78*(7.-2.*d.y),-.624))-.39);}if(d.y==7.){E p=Y(g+D(0,.25-T*2.,0),D(.4-T*2.,.45,0));V=p;if(p<I){P.z=9;}}if(V<I){if(P.z==9)P=ivec3(f.xy,9);else P=f;}→V;}D q(D K,E X){H r=H(.01,0.);→F(D(b(K+r.xyy,X)-b(K-r.xyy,X),b(K+r.yxy,X)-b(K-r.yxy,X),b(K+r.yyx,X)-b(K-r.yyx,X)));}void s(vec3 K){S*=0;K.xz+=fract(float(${s/2}));K.x=abs(K.x);K.zx-=fract(float(${s/2}));K.x+=5.;K.z+=5.;K=floor(K+vec3(0,0,0));if(K.y<0.)return;vec3 t=vec3(10,1000/10,10);if(fract(K/t)!=K/t)return;vec2 u,v=vec2(t.x,t.y*t.z);u.x=K.x;u.y=K.z+K.y*10.;vec2 w=(u+.5)/v;S=ivec2(texture2D(tex3d,w).rg*64.);return;}void main(){D x=D(0),y,z;H AA=(gl_FragCoord.xy*2.-O)/O;E AB;Q=0.;E r=1e9,AC=9.,AD;AB=0.;E AE=floor(tk/2.);E AF=mod(tk,2.);H AG=H(AF/2.,AE/4.)-.5;if(mod(AE,2.)==0.)AG.x+=.25;AA+=AG*2./O;D K,AH=D(AA*E(${D[6]})+H(${D[7]},${D[8]}),-R),AI=D(0,0,1);bool AJ=false;AH.yz*=R(${L});AI.yz*=R(${L});AH.xz*=R(${f});AI.xz*=R(${f});float AK=0.;for(float AL=0.;AL<200.;AL++){AK++;K=AH+AI*AB;K.xz-=fract(float(${s/2}));vec3 AM=(step(0.,AI)-fract(K))/AI;float AN;AN=min(min(AM.x,AM.y),AM.z)+1e-4;bool AO=false;s(K);if(length(H(S))>0.&&K.y>=0.){float AP=0.;for(float AQ=0.;AQ<200.;AQ++){AK++;K=AH+AI*(AB+AP);float AR=b(K,float(S.x-1));float AS=b(K,float(S.y-1));if(AR<AS){r=AR;X=S.x-1;}else{r=AS;X=S.y-1;}AP+=r;if(AC<r&&r<W){AJ=true;AO=true;AN=AP;break;}AC=r;if(r<I||AK>200.||AB>R*2.){AO=true;AN=AP;break;}if(AP>AN){break;}}}else{P=ivec3(0,0,-1);}AB+=AN;if(AO==true||AK>200.)break;}D AT;if(!AJ){D AU,AV;for(int AD=0;AD<5;AD++){if(P[0]==AD)AU=pt[AD];if(P[1]==AD)AV=pt[AD];}D AW=AU;if(P.z==1)if(sin(K.y*B*3.)>0.)AW=AV;if(P.z==2)if(sin((K.x+fract(ps[0].x-ss[0].x/2.))*B*2.*1.5)>0.)AW=AV;if(${d[3]}==3)AW=sin((G(K)/max(E(${s}),E(${d[8]}))-D(0,.3,.6))*6.28)*.5+.5;y=q(K,float(X));if(P.z==9){AW=D(0);D AX=K+fract(${s}./2.);AX=fract(AX)-.5;AW+=step(.3,G(AX.xz));AW+=step(-.1,-G(AX.xz+.1));}if(P.z==-1){AT=D(${j})/255.;if(G(AT)>.4){AT*=C(5.,0.,G(AA+H(${d[6]},-1)));}if(${d[3]}==3){AT=D(.2);}if(sin(G(pow(abs(AA),H(${d[5]})))*32.)>0.)AT*=.95;}else{AT=AW;AT*=min(1.5,55./AK)*.2+.8;AT*=dot(y,F(D(-.5,.5,0)))*.2+1.;if(P.z!=9)AT+=pow(abs(dot(y,F(D(0,1.5,.5)))),40.);}}if(tk>1.){D q=(texture2D(texNorm,gl_FragCoord.xy/O).rgb);E b=texture2D(texNorm,gl_FragCoord.xy/O).a;b=min(b,R*2.);vec3 AY=q;vec3 AZ=normalize(cross(vec3(1,2,3),AY));vec3 Aa=cross(AY,AZ);for(float AL=0.;AL<20.;AL++){D Ab=D(0,0,0);Ab+=(rnd(AL+tk+dot(AA*99.,vec2(.319,.137)))*2.-1.)*AZ;Ab+=(rnd(AL+tk+dot(AA*99.,vec2(.319,.137))+.1)*2.-1.)*Aa;Ab+=(rnd(AL+tk+dot(AA*99.,vec2(.319,.137))+.2))*AY;Ab=F(Ab)*pow(rnd(AL+dot(mod(gl_FragCoord.xy,10.1*B),vec2(.319,.137))),2.);vec3 Ac=D(dot(Ab,vec3(1,0,0)),dot(Ab,vec3(0,1,0)),dot(Ab,D(0,0,1)));if(b-Ac.z*1.1>texture2D(texNorm,gl_FragCoord.xy/O+.15*Ac.xy).a){AT*=.97;}}}gl_FragData[0]=mix(texture2D(texCol,gl_FragCoord.xy/O),AT.rgbb,1./tk);y.xz*=-sign(${d[0]-.5})*R(${f});y.xy*=R(atan(sqrt(2.)));y=y.zyx;y.xz*=-1.;gl_FragData[1]=mix(texture2D(texNorm,gl_FragCoord.xy/O),vec4(y.rgb,AB),1./tk);}`.replace(/@/g,"\n#define ").replace(/→/g,"return "),vert:"attribute vec2 g;void main(){gl_Position=vec4(g,0,1);}",attributes:{g:[[1,1],[1,-4],[-4,1]]},uniforms:{pt:i.map(e=>e/255),tex3d:te,tk:({tick:e})=>e,texCol:({tick:e})=>fe[e%2].color[0],texNorm:({tick:e})=>fe[e%2].color[1],sampler_ps:re,sampler_ss:ae,sampler_rt:oe,sampler_cs:le},depth:{enable:!1},framebuffer:({tick:e})=>fe[(e+1)%2],count:3},ie=ee({frag:`#extension GL_EXT_draw_buffers : require\nprecision highp float;uniform sampler2D texCol;void main(){gl_FragData[0]=vec4(texture2D(texCol,gl_FragCoord.xy/float(${J})).rgb,1);}`,vert:"attribute vec2 g;void main(){gl_Position=vec4(g,0,1);}",attributes:{g:[[1,1],[1,-4],[-4,1]]},uniforms:{texCol:({tick:e})=>fe[(e+1)%2].color[0]},depth:{enable:!1},count:3}),se=ee(Ae),ce=1+(J/K|0),ne=new Date,me=1,xe=1;T&&(xe=Number(T));let de=1;K=256;let pe=ee.frame(({tick:e})=>{se(),ie(),e>8&&(document.title="👾",pe.cancel())});'tx shvembldr piter stranger'