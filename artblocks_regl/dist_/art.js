let e,t,a,f,i,r;tokenData.hash="0x230af0a33f31d2808409b8103a87d62ecc2bb78cfd31d134f965de783a7438cd";let o,l,s,n,c,p,m,d,y,b,D,x,A,E,h,u,$,M=Math,g=Array,v=M.min,z=M.max,Y=M.floor,B=M.abs,H=M.cos,Z=M.sin,G=devicePixelRatio,w=location.href.split("#")[1],P=e=>e[0].map((t,a)=>e.slice().reverse().map(e=>e[a])),k=0,F=3,J=4,C=5,W=6,U=7,j=30,I=.95532,K=()=>{e=new Uint32Array([4,1,t=f=2,3].map(e=>parseInt(tokenData.hash.substr(8*e,8),16))),a=()=>(f=e[3],e[3]=e[2],e[2]=e[1],e[1]=t=e[0],f^=f<<11,e[0]^=f^f>>>8^t>>>19,e[0]/2**32),i=(e,t)=>e[e.length*a()**(t||1)|0],r=e=>e.map(e=>[e,a()]).sort((e,t)=>e[1]-t[1]).map(e=>e[0]),A=[],u_tick=1e-6,y=[a()**4*2|0,a()**8*2|0,0,5*(1-a()**.3)|0,0,i([2,1],.5),(3*a()|0)-1,0,0,0,0],o=(y[0]-.5)*M.PI/2-M.PI;let b=[[8+2*a()|0,30,5,8,0],[4,3+4*a()|0,0,1,1],[8+2*a()|0,30,3,8,a()**4*8],[6+4*a()|0,10+20*a()|0,2,6,2*a()],[6+(0|a()),10+10*a()|0,0,4,a()**2*3]];y[4]=M.sqrt(1-(a()-1)**2)*b.length|0,[n,c,p,m,d]=b[y[4]],l=2+2*a()|0,x=[],y[2]=a()**.5*8|0,s="dddddd888888555555222222aaaaaaf26b21fbb04099ca3c208b3afcec529b5de5f15bb500bbf900f5d4fee440f1faeea8dadc457b9d1d3557e6394650514ff25f5c247ba070c1b3ffe066541388d90368f1e9da2e294effd4001f20414b3f72119da419647effc857540d6eee4266f3fcf01f271bffd23fe4572e29335ca8c686669bbcf3a712".substr(30*y[2],30).match(/(.{2})/g).map(e=>Number("0x"+e)),h=4*a()|0},N=()=>{let e=r([[[2,1,2],[[0,1],[0,1]],0,F],[[2,1,2],0,[[0,1],[0,1]],J],[[2,1,4],0,0,k],[[2,1,3],0,0,k],[[1,1,6],0,0,k],[[1,2,3],0,[[1,0,1]],C],[[1,1,3],0,0,k],[[2,1,2],0,0,k],[[1,1,1],0,0,k],[[1,2,1],0,0,k]].filter(e=>e[0][2]<n)).slice(0,l),t=r([[[1,4,1],[[0]],0,W],[[1,.5,1],[[0]],0,U]]);b=[...g(n)].map(()=>g(n).fill(0)),D=[...g(n)].map(()=>g(n).fill(0));for(let f=0;f<c;f++){let r,o,l,s=0,E=-9e9,h=0,u=i(e);f>=c-d&&4!=y[3]&&(u=i(t,.7),p=6,m=6,h=1);for(let e=0;e<m;e++){l=JSON.parse(JSON.stringify(u)),l[4]=4*a()+1|0,l[5]=4*a()+1|0,2==y[3]&&(l[4]=l[5]=1),l[6]=4*a()|0,1==y[3]&&(l[6]=0),l[7]=1,l[8]=4*a()|0,l[3]==U&&(l[8]=0);let t=()=>g(9).fill(g(9).fill(1));l[2]=l[2]||t(),l[1]=l[1]||t(),l[9]=[...l[0]];for(let e=0;e<l[8];e++)l[9].reverse(),l[2]=P(l[2]),l[1]=P(l[1]),l[7]=!l[7];if(l[9][0]>n/2){m<j&&m++;continue}l[10]=n%2==0?[l[9][0]/2+(a()*(n/2+1-l[9][0])|0),0,-n/2+l[9][2]/2+(a()*(n+1-l[9][2])|0)]:[l[9][0]/2+(a()*((n-1)/2+1-l[9][0])|0)+.5,0,-n/2+l[9][2]/2+(a()*(n+1-l[9][2])|0)],l[9][0]%2==n%2&&a()<1/(n-l[9][0])&&(l[9][0]%2||l[7])&&(l[10][0]=0);let f=0,i=0,c=[...g(l[9][0])].map((e,t)=>l[10][0]+t-(l[9][0]-1)/2),d=[...g(l[9][2])].map((e,t)=>l[10][2]+t-(l[9][2]-1)/2);for(let e of c)for(let t of d)e>=0?i++:f++;let x=0,A=0,h=0,$=0;for(let e of d)for(let t of c){let a=$%l[9][0],f=Y($/l[9][0]);$++,A=z(A,b[t+n/2-.5][e+n/2-.5]),h=z(h,D[t+n/2-.5][e+n/2-.5]),1==l[2][a][f]&&(x=z(x,b[t+n/2-.5][e+n/2-.5]))}x<h||x>A?m<j&&m++:(r=[0,-M.hypot(l[10][0],l[10][2]),-x,-M.hypot(l[10][0],x-10,l[10][2]),-B(M.hypot(l[10][0],x-10,l[10][2])-n),-B(M.hypot(l[10][0],2*x,l[10][2])-n),2*x+l[10][2]][p],(r>E||0==e)&&(E=r,s=x,o=l))}if(o&&(o[10][1]=s+o[0][1]/2,o[10][1])){if(h&&o[10][1]-o[9][1]/2==0)continue;let e=g(o[9][0]).fill().map((e,t)=>o[10][0]+t-(o[9][0]-1)/2),t=g(o[9][2]).fill().map((e,t)=>o[10][2]+t-(o[9][2]-1)/2),a=0;for(let f of t)for(let t of e){let e=a%o[9][0],i=Y(a/o[9][0]);a++,b[t+n/2-.5][f+n/2-.5]=s+o[0][1],0==o[1][e][i]&&(b[t+n/2-.5][f+n/2-.5]=-99),D[t+n/2-.5][f+n/2-.5]=s+o[0][1]}x.push(o);for(let e=0;e++<8;){let t=[0,0,0].map((t,a)=>(e>>a&1)-.5);A.push([t[0]*(o[9][0]+2*o[10][0]),t[1]*o[9][1]+o[10][1],t[2]*o[9][2]+o[10][2]])}}}},R=()=>{E=[-99,99,99,-99];let e=(e,t,a)=>[e*H(a)-t*Z(a),e*Z(a)+t*H(a)];A.forEach(t=>{let[a,f,i]=t;[a,i]=e(a,i,-o),[f,i]=e(f,i,-I),E[2]=v(a,E[2]),E[3]=z(a,E[3]),E[1]=v(f,E[1]),E[0]=z(f,E[0])}),E[4]=E[3]-E[2],E[5]=E[0]-E[1],E[6]=z(E[4]/1.8,E[5]/1.8,1),E[7]=E[2]+E[4]/2,E[8]=E[1]+E[5]/2};K(),N(),R(),u_colors=x.map(e=>[e[4],e[5],e[6]]).flat();let S="";S+=x.map((e,t)=>`ps[${t}]=vec3(${e[10][0]},${e[10][1]},${e[10][2]});`).join(""),S+=x.map((e,t)=>`ss[${t}]=vec3(${e[0][0]},${e[0][1]},${e[0][2]});`).join(""),S+=x.map((e,t)=>`cs[${t}]=ivec3(${e[4]},${e[5]},${e[6]});`).join(""),S+=x.map((e,t)=>`rt[${t}]=vec2(${e[8]},${e[3]});`).join("");let O=M.min(innerWidth,innerHeight)*G,T=document.createElement("canvas");T.style.width=O/G+"px",T.style.height=O/G+"px",O=v(O,2048);let X=T.getContext("webgl",{preserveDrawingBuffer:!0});document.body.appendChild(T);let _=s.slice(3*h,3+3*h);T.style.background=4==y[3]||3==y[3]?"#333":`rgb(${_})`,T.width=O,T.height=O;let q=16;var V=createREGL(X);let L=V({frag:`precision highp float;@A 60@B 3.1415@C smoothstep@D vec3@E float@F normalize@G length@H vec2\nmat2 I(E J){→mat2(cos(J),-sin(J),sin(J),cos(J));}@K .001\nE L(E M){→sqrt(abs(M)*abs(M)+5e-5);}E N(E J,E O){→(J+O+L(J-O))*.5;}D ps[A];D ss[A];H rt[A];ivec3 cs[A];uniform D pt[5];uniform E aa;uniform E rs;ivec3 P;E Q;E R=1e2;int S;E T(D M,D U){H V=H(G(M.xz),M.y-clamp(M.y,K,U.x));V.x-=clamp(V.x,U.z,U.y);→G(V)-K;}E W(D M){P=ivec3(0,0,-1);M.x=abs(M.x);E X=M.y+1.;for(int Y=0;Y<A;Y++){if(Y>=${x.length})break;S=0;D Z=M;Z-=ps[Y];Z.xz*=I(rt[Y].x*B/2.);E a=.01,b=.008,c;D U=ss[Y]-2.*(a+b);c=G(Z-clamp(Z,-U/2.,U/2.))-a*1.4;if(rt[Y].y==5.){E d=G(Z.zy)-.5;E e=max(abs(Z.z)-.5,abs(Z.y+ss[Y].y/2.)-1.);E f=min(d,e);c=max(c,-f);}if(rt[Y].y==6.){E g=T(Z+D(0,1.6-a*2.,0),D(3.55,.15,0));E h=T(Z+D(0,2.-a*2.,0),D(.4-a*2.,.45,0));c=min(g,h);}if(rt[Y].y!=6.){D i=Z;H j=ss[Y].xz;i.xz+=(j-1.)/2.;i.xz=i.xz-clamp(floor(i.xz+.5),H(0.),j-1.);i.y-=ss[Y].y/2.+.02;E k=T(i,D(.24,.28,mix(K,.18,${y[1]}.)));c=min(k,c);}if(Z.z<.01&&(rt[Y].y==3.||rt[Y].y==4.)){c=N(c,dot(Z,D(0,.78*(7.-2.*rt[Y].y),-.624))-.39);}if(rt[Y].y==7.){E l=T(Z+D(0,.25-a*2.,0),D(.4-a*2.,.45,0));c=l;if(l<K){S=1;}}if(c<X){X=c;P=cs[Y];}if(X<K)break;}→X;}D m(D M){H n=H(.01,0.);→F(D(W(M+n.xyy)-W(M-n.xyy),W(M+n.yxy)-W(M-n.yxy),W(M+n.yyx)-W(M-n.yyx)));}void main(){${S}D o=D(0);H p,q=(gl_FragCoord.xy*2.-rs)/rs;for(E r=0.;r<8.;r++){if(r>=aa)break;Q=0.;E s=0.,n=1e9,t,u;E v=floor(r/2.);E w=mod(r,2.);H x=H(w/2.,v/4.)-.5;if(mod(v,2.)==0.)x.x+=.25;H p=q;p+=x*2./rs;D M,y=D(p*E(${E[6]})+H(${E[7]},${E[8]}),-R),z=D(0,0,.9+.1*fract(1e3*sin(1e3*fract(G(p)))));bool AA=false;for(E Y=0.;Y<1e2;Y++){u=Y;M=s*z+y;M.z-=R;M.yz*=I(${I});M.xz*=I(${o});s+=n=W(M);if(t<n&&n<.01){AA=true;break;}t=n;if(n<K||n>R*2.)break;}D AB;if(!AA){D AC,AD;for(int u=0;u<5;u++){if(P[0]==u)AC=pt[u];if(P[1]==u)AD=pt[u];}D AE=AC;if(P.z==1)if(sin(M.y*B*3.)>0.)AE=AD;if(P.z==2)if(sin((M.x+fract(ps[0].x-ss[0].x/2.))*B*2.*1.5)>0.)AE=AD;if(${y[3]}==3)AE=sin((G(M)/max(E(${n}),E(${y[8]}))*2.-D(0,.3,.6))*6.28)*.5+.5;if(S==1){AE=D(0);D AF=M+fract(${n}./2.);AF=fract(AF)-.5;AE+=step(.3,G(AF.xz));AE+=step(-.1,-G(AF.xz+.1));}if(P.z==-1){AB=D(${_})/255.;if(G(AB)>.4){AB*=C(5.,0.,G(p+H(${y[6]},-1)));}if(${y[3]}==3){AB=D(.2);}if(sin(G(pow(abs(p),H(${y[5]})))*32.)>0.)AB*=.95;}else{AB=D(1,0,1);AB=(min(1.5,14./u)*.2+.8)*(dot(m(M),F(D(0,1,1)))*.2+.8)*AE;AB+=pow(abs(dot(m(M),F(D(0.,3.,1.)))),40.);}if(${y[3]}==4)AB=(D(7./u));}o+=AB;}gl_FragColor=vec4(o/aa,1);}`.replace(/@/g,"\n#define ").replace(/→/g,"return "),vert:"attribute vec2 g;void main(){gl_Position=vec4(g,0,1);}",attributes:{g:[[1,1],[1,-4],[-4,1]]},uniforms:{rs:V.prop("r"),pt:s.map(e=>e/255),aa:V.prop("a")},scissor:{enable:!0,box:{x:V.prop("x"),y:V.prop("y"),width:V.prop("t"),height:V.prop("t")}},depth:{enable:!1},count:3}),Q=1+(O/$|0),ee=0,te=new Date,ae=1,fe=1;w&&(fe=Number(w));let ie=1;function*re(){let[e,t,a,f]=[0,0,1,1];for(;;){for(;2*e*a<f;)yield[e,t],e+=a;for(;2*t*a<f;)yield[e,t],t+=a;a=-a,f++}}$=32;let oe=re(),le=V.frame(()=>{for(let e=0;e++<ie;){let[e,t]=oe.next().value;L({r:O,x:O/2-$/2+$*e|0,y:O/2-$/2-$*t|0,t:$,a:fe}),ee++}f=+new Date;let e=f-te;49==ee&&1==fe&&e<2e3?(ee=0,oe=re(),fe=v(8,16/2**M.floor(e/500)),V.clear({color:[0,0,0,0]})):(ee>49||fe>1)&&(f-te>160&&(ie=z(1,ie-8)),f-te<30&&(ie+=2),te=f),ee>(2*(O/$/2|0)+3)**2&&le.cancel()});'tx shvembldr piter stranger'