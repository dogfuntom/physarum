let e,t,o,a,i,l;console.log(tokenData.hash);let r=Math,f=e=>e[0].map(((t,o)=>e.slice().reverse().map((e=>e[o]))));const n=0,s=3,c=4,y=5,m=6,b=7,d=30;let x,p,u,A,v,z,D,g,h,$,M,k,Z,w,T,F,N,C,B,E,q,S,P,G,I=.95532,U=40,W=10,X=()=>{e=Uint32Array.from([0,1,t=a=2,3].map((e=>parseInt(tokenData.hash.substr(8*e+2,8),16)))),o=()=>(a=e[3],e[3]=e[2],e[2]=e[1],e[1]=t=e[0],a^=a<<11,e[0]^=a^a>>>8^t>>>19,e[0]/2**32),i=(e,t)=>e[e.length*o()**(t||1)|0],l=e=>e.map((e=>[e,o()])).sort(((e,t)=>e[1]-t[1])).map((e=>e[0])),F=[],C=1e-6,k={t:o()**4*2|0,o:o()**8*2|0,i:0,l:5*(1-o()**.3)|0,m:0,p:0,u:0,A:0,v:0,D:i([2,1],.5),g:(3*o()|0)-1},x=3.1415*(k.t-.5)/2-3.1415;let r=[{h:8+2*o()|0,$:30,M:5,k:8,Z:0},{h:8+2*o()|0,$:30,M:3,k:8,Z:o()**4*8},{h:4,$:3+4*o()|0,M:0,k:1,Z:1},{h:6+4*o()|0,$:10+20*o()|0,M:2,k:6,Z:2*o()},{h:6+(0|o()),$:10+10*o()|0,M:0,k:4,Z:o()**2*3}];k.m=o()**.3*r.length|0,({h:D,$:g,M:h,k:$,Z:M}=r[k.m]),p=2+2*o()|0,T=[],k.i=o()**.5*8|0,N="dddddd888888555555222222aaaaaaf26b21fbb04099ca3c208b3afcec529b5de5f15bb500bbf900f5d4fee440f1faeea8dadc457b9d1d3557e6394650514ff25f5c247ba070c1b3ffe066541388d90368f1e9da2e294effd4001f20414b3f72119da419647effc857540d6eee4266f3fcf01f271bffd23fe4572e29335ca8c686669bbcf3a712".match(/(.{30})/g).map((e=>e.match(/(.{6})/g).map((e=>"#"+e))))[k.i];let f=N.pop();N.push(f),console.log(N),N=l(N),console.log(N),2==k.l&&(N=N.slice(0,2))};function K(){let e=l([{size:[2,1,2],T:[[0,1],[0,1]],type:s},{size:[2,1,2],F:[[0,1],[0,1]],type:c},{size:[2,1,4],type:n},{size:[2,1,3],type:n},{size:[1,1,6],type:n},{size:[1,2,3],F:[[1,0,1]],type:y},{size:[1,1,3],type:n},{size:[2,1,2],type:n},{size:[1,1,1],type:n},{size:[1,2,1],type:n}].filter((e=>e.size[2]<D))).slice(0,p),t=l([{size:[1,4,1],T:[[0]],type:6},{size:[1,.5,1],T:[[0]],type:7}]);Z=[...Array(D)].map((()=>Array(D).fill(0))),w=[...Array(D)].map((()=>Array(D).fill(0)));for(let a=0;a<g;a++){let l,n,s,c=0,y=-9e9,m=0,b=i(e);a>=g-M&&4!=k.l&&(b=i(t,.7),h=6,$=6,m=1);for(let e=0;e<$;e++){s=JSON.parse(JSON.stringify(b)),s.color=o()*(N.length-1|0)+1,s.N=o()*(N.length-1|0)+1,s.C=4*o()|0,1==k.l&&(s.C=0),s.B=1,s.q=4*o()|0,7==s.type&&(s.q=0);let t=()=>Array(9).fill(Array(9).fill(1));s.F=s.F||t(),s.T=s.T||t(),s.span=[...s.size];for(let e=0;e<s.q;e++)s.span.reverse(),s.F=f(s.F),s.T=f(s.T),s.B=!s.B;if(s.span[0]>D/2){$<30&&$++;continue}s.S=D%2==0?[s.span[0]/2+(o()*(D/2+1-s.span[0])|0),0,-D/2+s.span[2]/2+(o()*(D+1-s.span[2])|0)]:[s.span[0]/2+(o()*((D-1)/2+1-s.span[0])|0)+.5,0,-D/2+s.span[2]/2+(o()*(D+1-s.span[2])|0)],s.span[0]%2==D%2&&o()<1/(D-s.span[0])&&(s.span[0]%2||s.B)&&(s.S[0]=0);let a=0,i=0,m=[...Array(s.span[0])].map(((e,t)=>s.S[0]+t-(s.span[0]-1)/2)),d=[...Array(s.span[2])].map(((e,t)=>s.S[2]+t-(s.span[2]-1)/2));for(let e of m)for(let t of d)e>=0?i++:a++;let x=0,p=0,u=0,A=0;for(let e of d)for(let t of m){let o=A%s.span[0],a=floor(A/s.span[0]);A++,p=max(p,Z[t+D/2-.5][e+D/2-.5]),u=max(u,w[t+D/2-.5][e+D/2-.5]),1==s.F[o][a]&&(x=max(x,Z[t+D/2-.5][e+D/2-.5]))}x<u||x>p?$<30&&$++:(l=[0,-r.hypot(s.S[0],s.S[2]),-x,-r.hypot(s.S[0],x-10,s.S[2]),-abs(r.hypot(s.S[0],x-10,s.S[2])-D),-abs(r.hypot(s.S[0],2*x,s.S[2])-D),2*x+s.S[2]][h],(l>y||0==e)&&(y=l,c=x,n=s))}if(n&&(n.S[1]=c+n.size[1]/2,n.S[1])){if(m&&n.S[1]-n.span[1]/2==0)continue;let e=Array(n.span[0]).fill().map(((e,t)=>n.S[0]+t-(n.span[0]-1)/2)),t=Array(n.span[2]).fill().map(((e,t)=>n.S[2]+t-(n.span[2]-1)/2)),o=0;for(let a of t)for(let t of e){let e=o%n.span[0],i=floor(o/n.span[0]);o++,Z[t+D/2-.5][a+D/2-.5]=c+n.size[1],0==n.T[e][i]&&(Z[t+D/2-.5][a+D/2-.5]=-99),w[t+D/2-.5][a+D/2-.5]=c+n.size[1]}T.push(n);for(let e=0;e++<8;){let t=[0,0,0].map(((t,o)=>(e>>o&1)-.5));F.push([t[0]*(n.span[0]+2*n.S[0]),t[1]*n.span[1]+n.S[1],t[2]*n.span[2]+n.S[2]])}}}}let H,L,O=()=>{B={top:-1e9,bottom:1e9,left:1e9,right:-1e9};let e=(e,t,o)=>[e*cos(o)-t*sin(o),e*sin(o)+t*cos(o)];F.forEach((t=>{let[o,a,i]=t;[o,i]=e(o,i,-x),[a,i]=e(a,i,-I),B.left=min(o,B.left),B.right=max(o,B.right),B.bottom=min(a,B.bottom),B.top=max(a,B.top)})),B.width=B.right-B.left,B.height=B.top-B.bottom,B.scale=max(B.width/1.8,B.height/1.8,1),B.offset={x:B.left+B.width/2,y:B.bottom+B.height/2}};function setup(){L=createDiv("").class("debug").size(800,100),P=min(windowHeight,windowWidth);let e=createCanvas(P,P);document.querySelector("div.debug").innerHTML=`\n        pixelDensity(): ${pixelDensity()}<br>\n        size: ${P}<br>\n        displayDensity(): ${displayDensity()}<br>\n        windowWidth: ${windowWidth}<br>\n        `,e.style("image-rendering","pixelated"),A=createGraphics(2048,2048,WEBGL),A.pixelDensity(.03125),q=pixelDensity(),A.fill(0),X(),K(),console.log(T),O(),z=N.map((e=>color(e).levels.slice(0,3))).flat().map((e=>e/255)),u_colors=T.map((e=>[e.color,e.N,e.C])).flat();let t="";t+=T.map(((e,t)=>`positions[${t}]=vec3(${e.S[0]},${e.S[1]},${e.S[2]});`)).join(""),t+=T.map(((e,t)=>`sizes[${t}]=vec3(${e.size[0]},${e.size[1]},${e.size[2]});`)).join(""),t+=T.map(((e,t)=>`colors[${t}]=ivec3(${e.color},${e.N},${e.C});`)).join(""),t+=T.map(((e,t)=>`roty[${t}]=vec2(${e.q},${e.type});`)).join(""),u=A.createShader("precision highp float;attribute vec3 aPosition;void main() { gl_Position = vec4(aPosition,1.0);}",`precision highp float;\n#define A 60\n#define B 3.1415\n#define C smoothstep\n#define D vec3\n#define E vec2\nfloat F(float G){return fract(54321.987*sin(987.12345*mod(G,12.34567)));}mat2 H(float I){return mat2(cos(I),-sin(I),sin(I),cos(I));}\n#define J 4e2\n#define K .001\nfloat L(float M){return sqrt(abs(M)*abs(M)+5e-5);}float N(float I,float O){return(I+O+L(I-O))*.5;}vec3 positions[A];vec3 sizes[A];vec2 roty[A];ivec3 colors[A];uniform D palette[20];uniform sampler2D backbuffer;uniform float tick;uniform float aa;uniform float res;uniform vec4 vb;uniform float k;ivec3 P;float Q;float R=1e2;float S(D M,D T,float U){M.y-=clamp(M.y,-T.x,T.x);float V=length(M.xz)-T.z;V-=clamp(V,-T.y,T.y);float S=length(E(V,M.y))-U;return S;}int W;float X(D M){P=ivec3(0,0,-1);M.x=abs(M.x);float Y=M.y+1.;for(int Z=0;Z<A;Z++){W=0;if(Z>=${T.length})break;D a=M;a-=positions[Z];a.xz*=H(roty[Z].x*B/2.);float U=.01;float b=.008;float c;D T=sizes[Z]-2.*(U+b);c=length(a-clamp(a,-(T)/2.,(T)/2.))-U*1.4;if(roty[Z].y==5.){float S=length(a.zy)-.5;float d=max(abs(a.z)-.5,abs(a.y+sizes[Z].y/2.)-1.);float e=min(S,d);c=max(c,-e);}if(roty[Z].y==6.){float f=length(a.zx)-.15;float g=S(a+D(0,sizes[Z].y-.5,0)/2.,D(.2,.25,.2),U);c=max(c,min(f,g));}if(roty[Z].y!=6.){D h=a;E i=sizes[Z].xz;h.xz+=(i-1.)/2.;h.xz=h.xz-clamp(floor(h.xz+.5),E(0.),i-1.);float j=.24;h.y-=sizes[Z].y/2.+.02;h.y-=clamp(h.y,K,j);vec2 k=vec2(length(h.xz),h.y);k.x-=clamp(k.x,mix(K,.18,${k.o}.),.28);float l=length(k)-K;c=min(l,c);}if(a.z<0.15&&(roty[Z].y==3.||roty[Z].y==4.)){c=N(c,(-a.z*.8-(roty[Z].y==3.?-1.:1.)*a.y-.5)/1.4142);}if(roty[Z].y==7.){float m=S(a,D(.2,.25,.2),U);c=m;if(m<K){W=1;}}if(c<Y){Y=c;P=colors[Z];}if(Y<K)break;}return Y;}D n(D M){E o=E(.01,0.);return normalize(D(X(M+o.xyy)-X(M-o.xyy),X(M+o.yxy)-X(M-o.yxy),X(M+o.yyx)-X(M-o.yyx)));}void main(){D p=D(0);${t}vec2 q,r=(gl_FragCoord.xy*2.-res)/res;for(float s=0.;s<8.;s++){if(s>=aa)break;Q=0.;float t=0.,o=1e9,u,v;float w=floor(s/2.);float x=mod(s,2.);vec2 y=vec2(x/2.,w/4.)-.5;if(mod(w,2.)==0.)y.x+=.25;vec2 q=r;q+=y*2./res;q=q*.5+.5;q*=vb.zw;q+=vb.xy;q=q*2.-1.;D M,z=D(q*float(${B.scale})+E(${B.offset.x},${B.offset.y}),-R),AA=D(0,0,.9+.1*F(length(q)));bool AB=false;for(float Z=0.;Z<J;Z++){v=Z;M=t*AA+z;M.z-=R;M.yz*=H(${I});M.xz*=H(${x});t+=o=X(M);if(u<o&&o<.01){AB=true;break;}u=o;if(o<K||o>R*2.)break;}D AC;if(!AB){D AD,AE;for(int v=0;v<20;v++){if(P[0]==v)AD=palette[v];if(P[1]==v)AE=palette[v];}D AF=AD;if(P.z==1)if(sin(M.y*B*3.)>0.)AF=AE;if(P.z==2)if(sin((M.x+fract(positions[0].x-sizes[0].x/2.))*B*2.*1.5)>0.)AF=AE;if(${k.l}==3)AF=sin(length(M)/max(float(${D}),float(${k.p}))*6.28*2.-D(0,B*2./3.,B*4./3.))*.5+.5;if(W==1){AF=D(0);D AG=M+fract(${D}./2.);AG=fract(AG)-.5;AF+=step(.3,length(AG.xz));AF+=step(-.1,-length(AG.xz+.1));}if(P.z==-1){AC=palette[0];if(length(AC)>.4){AC*=smoothstep(5.,0.,length(q+E(${k.g},-1)));}if(${k.l}==3){AC=D(.2);}if(sin(length(pow(abs(q),E(${k.D})))*32.)>0.)AC*=.95;}else{AC=D(1,0,1);AC=(min(1.5,14./v)*.2+.8)*(dot(n(M),normalize(D(0,1,1)))*.2+.8)*AF;AC+=pow(abs(dot(n(M),normalize(D(0.,3.,1.)))),40.);}}if(${k.l}==4)AC=(D(10./v));p+=AC;}gl_FragColor=vec4(p/aa,1);}`),A.shader(u),u.setUniform("palette",z),u.setUniform("aa",8),A.background(N[0])}let Y,_=+new Date,J=+new Date,R="adapt",V=0;function draw(){if("adapt"==R){let e=+new Date,t=V;if(V=e-J,J=e,console.log("u_tick",C),console.log(A.pixelDensity()),A.width*A.pixelDensity()>G||C>W&&(V+t)/2>U)return document.querySelector("div.debug").innerHTML+=A.width*A.pixelDensity(),R="render",C=0,pixelDensity(q),A.width*A.pixelDensity()<256&&u.setUniform("aa",4),(V+t)/2>4*U&&u.setUniform("aa",1),void(document.querySelector("div.debug").innerHTML+=`\n            (delay + delayPrev)/2: ${(V+t)/2}<br>\n            `);u.setUniform("vb",[0,0,1,1]),u.setUniform("res",A.width*A.pixelDensity());let o=1;A.quad(-o,-o,o,-o,o,o,-o,o);let a=document.querySelectorAll("canvas"),i=a[1].toDataURL();a[0].style.background=`url(${i})`,a[0].style.backgroundSize="cover",floor(C)%W==0&&(A.pixelDensity(2*A.pixelDensity()),pixelDensity(A.pixelDensity()))}else{let e=A.width*A.pixelDensity();S=P*pixelDensity()/e;let t=C%ceil(S)/S,o=floor(C/ceil(S))/S;if(o>=1)return void noLoop();let a=1/S;console.log(""),console.log("tileSize",a,"splits",S,"renderSize",e),console.log("b.width",A.width);let i=[t,o,a,a];console.log("viewbox",i),u.setUniform("vb",i),u.setUniform("res",e);let l=1;A.background("yellow"),A.quad(-l,-l,l,-l,l,l,-l,l),image(A,P*t,P*(1-o-a),P*a,P*a),console.log("target region",P*t,P*(1-o-a),P*a,P*a)}C++}'tx shvembldr piter stranger'