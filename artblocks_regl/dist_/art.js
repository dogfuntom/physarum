let e,t,o,a,s,l;console.log(tokenData.hash);let i=Math,r=i.min,n=i.max,f=i.floor,p=i.abs,c=i.cos,m=i.sin,y=document.createElement("div");y.classList.add("debug"),y.style.width="100%",y.style.height="100px",document.body.appendChild(y);let h=location.href.split("#")[1],rotArray=e=>e[0].map(((t,o)=>e.slice().reverse().map((e=>e[o]))));const d=0,g=3,u=4,b=5,x=6,z=7,D=30;let v,A,k,$,w,K,N,B,C,W,S,T,X,E,F,P,G,L,R,U,_,I,Y,j,H,M=.95532,V=40,q=10,init=()=>{e=new Uint32Array([0,1,t=a=2,3].map((e=>parseInt(tokenData.hash.substr(8*e+2,8),16)))),o=()=>(a=e[3],e[3]=e[2],e[2]=e[1],e[1]=t=e[0],a^=a<<11,e[0]^=a^a>>>8^t>>>19,e[0]/2**32),s=(e,t)=>e[e.length*o()**(t||1)|0],l=e=>e.map((e=>[e,o()])).sort(((e,t)=>e[1]-t[1])).map((e=>e[0])),P=[],G=1e-6,T={Symmetry:o()**4*2|0,Studs:o()**8*2|0,Palette:0,ColorScheme:5*(1-o()**.3)|0,Layout:0,Height:0,Eyes:0,Aerials:0,BlocksNumber:0,BackgroundType:s([2,1],.5),BackgroundLight:(3*o()|0)-1},v=3.1415*(T.Symmetry-.5)/2-3.1415;let i=[{gs:8+2*o()|0,blocksNumber:30,fitnessFunctionNumber:5,maxTry:8,extra:0},{gs:8+2*o()|0,blocksNumber:30,fitnessFunctionNumber:3,maxTry:8,extra:o()**4*8},{gs:4,blocksNumber:3+4*o()|0,fitnessFunctionNumber:0,maxTry:1,extra:1},{gs:6+4*o()|0,blocksNumber:10+20*o()|0,fitnessFunctionNumber:2,maxTry:6,extra:2*o()},{gs:6+(0|o()),blocksNumber:10+10*o()|0,fitnessFunctionNumber:0,maxTry:4,extra:o()**2*3}];T.Layout=o()**.3*i.length|0,({gs:N,blocksNumber:B,fitnessFunctionNumber:C,maxTry:W,extra:S}=i[T.Layout]),A=2+2*o()|0,F=[],T.Palette=o()**.5*8|0,K="dddddd888888555555222222aaaaaaf26b21fbb04099ca3c208b3afcec529b5de5f15bb500bbf900f5d4fee440f1faeea8dadc457b9d1d3557e6394650514ff25f5c247ba070c1b3ffe066541388d90368f1e9da2e294effd4001f20414b3f72119da419647effc857540d6eee4266f3fcf01f271bffd23fe4572e29335ca8c686669bbcf3a712".slice(30*T.Palette,30*(T.Palette+1)),console.log("u_palette",K);let r=3*o()+1|0;K=K.substring(6*r)+K.substring(0,6*r),console.log("u_palette",K),K=K.match(/(.{2})/g).map((e=>Number("0x"+e)/255))};function placeBlocks(){let e=l([{size:[2,1,2],maskTop:[[0,1],[0,1]],type:g},{size:[2,1,2],maskBottom:[[0,1],[0,1]],type:u},{size:[2,1,4],type:d},{size:[2,1,3],type:d},{size:[1,1,6],type:d},{size:[1,2,3],maskBottom:[[1,0,1]],type:b},{size:[1,1,3],type:d},{size:[2,1,2],type:d},{size:[1,1,1],type:d},{size:[1,2,1],type:d}].filter((e=>e.size[2]<N))).slice(0,A),t=l([{size:[1,4,1],maskTop:[[0]],type:6},{size:[1,.5,1],maskTop:[[0]],type:7}]);X=[...Array(N)].map((()=>Array(N).fill(0))),E=[...Array(N)].map((()=>Array(N).fill(0)));for(let a=0;a<B;a++){let l,r,c,m=0,y=-9e9,h=0,d=s(e);a>=B-S&&4!=T.ColorScheme&&(d=s(t,.7),C=6,W=6,h=1);for(let e=0;e<W;e++){c=JSON.parse(JSON.stringify(d)),c.color=4*o()+1|0,c.color2=4*o()+1|0,2==T.ColorScheme&&(c.color=c.color2=1),c.texture=4*o()|0,1==T.ColorScheme&&(c.texture=0),c.symX=1,c.rot=4*o()|0,7==c.type&&(c.rot=0);let makeMask=()=>Array(9).fill(Array(9).fill(1));c.maskBottom=c.maskBottom||makeMask(),c.maskTop=c.maskTop||makeMask(),c.span=[...c.size];for(let e=0;e<c.rot;e++)c.span.reverse(),c.maskBottom=rotArray(c.maskBottom),c.maskTop=rotArray(c.maskTop),c.symX=!c.symX;if(c.span[0]>N/2){W<30&&W++;continue}c.pos=N%2==0?[c.span[0]/2+(o()*(N/2+1-c.span[0])|0),0,-N/2+c.span[2]/2+(o()*(N+1-c.span[2])|0)]:[c.span[0]/2+(o()*((N-1)/2+1-c.span[0])|0)+.5,0,-N/2+c.span[2]/2+(o()*(N+1-c.span[2])|0)],c.span[0]%2==N%2&&o()<1/(N-c.span[0])&&(c.span[0]%2||c.symX)&&(c.pos[0]=0);let t=0,a=0,s=[...Array(c.span[0])].map(((e,t)=>c.pos[0]+t-(c.span[0]-1)/2)),h=[...Array(c.span[2])].map(((e,t)=>c.pos[2]+t-(c.span[2]-1)/2));for(let e of s)for(let o of h)e>=0?a++:t++;let g=0,u=0,b=0,x=0;for(let e of h)for(let t of s){let o=x%c.span[0],a=f(x/c.span[0]);x++,u=n(u,X[t+N/2-.5][e+N/2-.5]),b=n(b,E[t+N/2-.5][e+N/2-.5]),1==c.maskBottom[o][a]&&(g=n(g,X[t+N/2-.5][e+N/2-.5]))}g<b||g>u?W<30&&W++:(l=[0,-i.hypot(c.pos[0],c.pos[2]),-g,-i.hypot(c.pos[0],g-10,c.pos[2]),-p(i.hypot(c.pos[0],g-10,c.pos[2])-N),-p(i.hypot(c.pos[0],2*g,c.pos[2])-N),2*g+c.pos[2]][C],(l>y||0==e)&&(y=l,m=g,r=c))}if(r&&(r.pos[1]=m+r.size[1]/2,r.pos[1])){if(h&&r.pos[1]-r.span[1]/2==0)continue;let e=Array(r.span[0]).fill().map(((e,t)=>r.pos[0]+t-(r.span[0]-1)/2)),t=Array(r.span[2]).fill().map(((e,t)=>r.pos[2]+t-(r.span[2]-1)/2)),o=0;for(let a of t)for(let t of e){let e=o%r.span[0],s=f(o/r.span[0]);o++,X[t+N/2-.5][a+N/2-.5]=m+r.size[1],0==r.maskTop[e][s]&&(X[t+N/2-.5][a+N/2-.5]=-99),E[t+N/2-.5][a+N/2-.5]=m+r.size[1]}F.push(r);for(let e=0;e++<8;){let t=[0,0,0].map(((t,o)=>(e>>o&1)-.5));P.push([t[0]*(r.span[0]+2*r.pos[0]),t[1]*r.span[1]+r.pos[1],t[2]*r.span[2]+r.pos[2]])}}}}let findViewBox=()=>{L={top:-1e9,bottom:1e9,left:1e9,right:-1e9};let rot=(e,t,o)=>[e*c(o)-t*m(o),e*m(o)+t*c(o)];P.forEach((e=>{let[t,o,a]=e;[t,a]=rot(t,a,-v),[o,a]=rot(o,a,-M),L.left=r(t,L.left),L.right=n(t,L.right),L.bottom=r(o,L.bottom),L.top=n(o,L.top)})),L.width=L.right-L.left,L.height=L.top-L.bottom,L.scale=n(L.width/1.8,L.height/1.8,1),L.offset={x:L.left+L.width/2,y:L.bottom+L.height/2}};init(),placeBlocks(),findViewBox(),console.log(K),u_colors=F.map((e=>[e.color,e.color2,e.texture])).flat();let J="";J+=F.map(((e,t)=>`positions[${t}]=vec3(${e.pos[0]},${e.pos[1]},${e.pos[2]});`)).join(""),J+=F.map(((e,t)=>`sizes[${t}]=vec3(${e.size[0]},${e.size[1]},${e.size[2]});`)).join(""),J+=F.map(((e,t)=>`colors[${t}]=ivec3(${e.color},${e.color2},${e.texture});`)).join(""),J+=F.map(((e,t)=>`roty[${t}]=vec2(${e.rot},${e.type});`)).join("");let O=Math.min(window.innerWidth,window.innerHeight)*window.devicePixelRatio,Q=document.createElement("canvas");Q.style.width=O/window.devicePixelRatio+"px",Q.style.height=O/window.devicePixelRatio+"px",O=r(O,2048);const Z=Q.getContext("webgl",{preserveDrawingBuffer:!0});document.body.appendChild(Q),Q.style.background=`rgb(${K.slice(0,3).map((e=>255*e))})`,4!=T.ColorScheme&&3!=T.ColorScheme||(Q.style.background="#333"),Q.width=O,Q.height=O;let ee=16;var te=createREGL(Z);const oe=te({frag:`precision mediump float;\n#define A 60\n#define B 3.1415\n#define C smoothstep\n#define D vec3\n#define E vec2\nmat2 F(float G){return mat2(cos(G),-sin(G),sin(G),cos(G));}\n#define H 4e2\n#define I .001\nfloat J(float K){return sqrt(abs(K)*abs(K)+5e-5);}float L(float G,float M){return(G+M+J(G-M))*.5;}vec3 positions[A];vec3 sizes[A];vec2 roty[A];ivec3 colors[A];uniform D palette[5];uniform float aa;uniform float res;ivec3 N;float O;float P=1e2;int Q;float R(vec3 K,D S){vec2 T=vec2(length(K.xz),K.y-clamp(K.y,I,S.x));T.x-=clamp(T.x,S.z,S.y);return length(T)-I;}float U(D K){N=ivec3(0,0,-1);K.x=abs(K.x);float V=K.y+1.;for(int W=0;W<A;W++){Q=0;if(W>=${F.length})break;D X=K;X-=positions[W];X.xz*=F(roty[W].x*B/2.);float Y=.01,Z=.008,a;D S=sizes[W]-2.*(Y+Z);a=length(X-clamp(X,-S/2.,S/2.))-Y*1.4;if(roty[W].y==5.){float b=length(X.zy)-.5;float c=max(abs(X.z)-.5,abs(X.y+sizes[W].y/2.)-1.);float d=min(b,c);a=max(a,-d);}if(roty[W].y==6.){float e=R(X+vec3(0,1.6-Y*2.,0),D(3.55,.15,0));float f=R(X+vec3(0,2.-Y*2.,0),D(.4-Y*2.,.45,0));a=min(e,f);}if(roty[W].y!=6.){D g=X;E h=sizes[W].xz;g.xz+=(h-1.)/2.;g.xz=g.xz-clamp(floor(g.xz+.5),E(0.),h-1.);g.y-=sizes[W].y/2.+.02;float i=R(g,D(.24,.28,mix(I,.18,${T.Studs}.)));a=min(i,a);}if(X.z<.01&&(roty[W].y==3.||roty[W].y==4.)){a=L(a,dot(X,vec3(0,.78*(7.-2.*roty[W].y),-.624))-.39);}if(roty[W].y==7.){float j=R(X+vec3(0,.25-Y*2.,0),D(.4-Y*2.,.45,0));a=j;if(j<I){Q=1;}}if(a<V){V=a;N=colors[W];}if(V<I)break;}return V;}D k(D K){E l=E(.01,0.);return normalize(D(U(K+l.xyy)-U(K-l.xyy),U(K+l.yxy)-U(K-l.yxy),U(K+l.yyx)-U(K-l.yyx)));}void main(){${J}D m=D(0);vec2 n,o=(gl_FragCoord.xy*2.-res)/res;for(float p=0.;p<8.;p++){if(p>=aa)break;O=0.;highp float q=0.,l=1e9,r,s;float t=floor(p/2.);float u=mod(p,2.);vec2 v=vec2(u/2.,t/4.)-.5;if(mod(t,2.)==0.)v.x+=.25;vec2 n=o;n+=v*2./res;highp D K,w=D(n*float(${L.scale})+E(${L.offset.x},${L.offset.y}),-P),x=D(0,0,.9+.1*fract(1e3*sin(1e3*fract(length(n)))));bool y=false;for(float W=0.;W<H;W++){s=W;K=q*x+w;K.z-=P;K.yz*=F(${M});K.xz*=F(${v});q+=l=U(K);if(r<l&&l<.01){y=true;break;}r=l;if(l<I||l>P*2.)break;}D z;if(!y){D AA,AB;for(int s=0;s<5;s++){if(N[0]==s)AA=palette[s];if(N[1]==s)AB=palette[s];}D AC=AA;if(N.z==1)if(sin(K.y*B*3.)>0.)AC=AB;if(N.z==2)if(sin((K.x+fract(positions[0].x-sizes[0].x/2.))*B*2.*1.5)>0.)AC=AB;if(${T.ColorScheme}==3)AC=sin((length(K)/max(float(${N}),float(${T.Height}))*2.-D(0,.3,.6))*6.28)*.5+.5;if(Q==1){AC=D(0);D AD=K+fract(${N}./2.);AD=fract(AD)-.5;AC+=step(.3,length(AD.xz));AC+=step(-.1,-length(AD.xz+.1));}if(N.z==-1){z=palette[0];if(length(z)>.4){z*=smoothstep(5.,0.,length(n+E(${T.BackgroundLight},-1)));}if(${T.ColorScheme}==3){z=D(.2);}if(sin(length(pow(abs(n),E(${T.BackgroundType})))*32.)>0.)z*=.95;}else{z=D(1,0,1);z=(min(1.5,14./s)*.2+.8)*(dot(k(K),normalize(D(0,1,1)))*.2+.8)*AC;z+=pow(abs(dot(k(K),normalize(D(0.,3.,1.)))),40.);}if(${T.ColorScheme}==4)z=(D(7./s));}m+=z;}gl_FragColor=vec4(m/aa,1);}`,vert:"attribute vec2 g;void main(){gl_Position=vec4(g,0,1);}",attributes:{g:[[1,1],[1,-4],[-4,1]]},uniforms:{res:te.prop("res"),palette:K,aa:te.prop("aa")},scissor:{enable:!0,box:{x:te.prop("x"),y:te.prop("y"),width:te.prop("ts_"),height:te.prop("ts_")}},count:3});let ae=1+(O/j|0),se=0;function*spiral(){let[e,t,o,a]=[0,0,1,1];for(;;){for(;2*e*o<a;)yield[e,t],e+=o;for(;2*t*o<a;)yield[e,t],t+=o;o=-o,a++}}let le=spiral();a=+new Date;let ie=1,re=8,ne=1;j=32,H=2*(O/j/2|0)+3;let fe=0,pe=te.frame((function(){for(let e=0;e++<ne;){let[e,t]=le.next().value;oe({res:O,x:O/2-j/2+j*e|0,y:O/2-j/2-j*t|0,ts_:j,aa:re}),se++}console.log("new Date() - t",new Date-a),new Date-a>160&&(ne=n(1,ne-2)),new Date-a<30&&(ne+=2),1==ne?fe++:fe=n(0,fe--),console.log("slowDevice",fe),fe>4&&(re=1),h&&(re=Number(h)),a=+new Date,se>H**2&&pe.cancel()}));'tx shvembldr piter stranger'