let e,t,A,f,r,a,i,c,o,l,s,n,x,b,m,d,p,y,v,E,O,D,g=Math,h=Array,u=document,z=g.min,k=g.max,$=g.floor,X=g.abs,H=g.cos,I=g.sin,T=location.href.split("#")[1],R=e=>e[0].map((t,A)=>e.slice().reverse().map(e=>e[A])),C=0,w=3,F=4,G=5,P=6,Z=7,L=30,_=.95532,S=[...h(1e3)].map(()=>[...h(10)].map(()=>[0,0,0])),q=()=>{e=new Uint32Array([4,1,t=f=2,3].map(e=>parseInt(tokenData.hash.substr(8*e,8),16))),A=()=>(f=e[3],e[3]=e[2],e[2]=e[1],e[1]=t=e[0],f^=f<<11,e[0]^=f^f>>>8^t>>>19,e[0]/2**32),r=(e,t)=>e[e.length*A()**(t||1)|0],a=e=>e.map(e=>[e,A()]).sort((e,t)=>e[1]-t[1]).map(e=>e[0]),v=[],u_tick=1e-6,m=[A()**4*2|0,A()**8*2|0,0,4*(1-g.sqrt(1-(A()-1)**4))|0,0,r([2,1],.5),(3*A()|0)-1,0,0,0,0],i=(m[0]-.5)*g.PI/2-g.PI;let d=[[10,20+20*A(),3,8,A()**4*8],[4,4+4*A()|0,1,1,1],[8+2*A()|0,30,4,8,A()+2],[4+2*A()|0,6+4*A()|0,0,1,1+2*A()],[6+4*A()|0,10+20*A()|0,2,6,2*A()],[6+(2*A()|0),10+6*A()|0,0,4,3*A()]];m[4]=g.sqrt(1-(A()-1)**2)*d.length|0,[l,s,n,x,b]=d[m[4]],c=1+A()**.5*3|0,y=[],m[2]=A()**.5*8|0,o="dddddd888888555555222222aaaaaaf26b21fbb04099ca3c208b3afcec529b5de5f15bb500bbf900C2A8fee440f1faeea8dadc457b9d1d3557e6394650514ff25f5c247ba070c1b3ffe066541388d90368E4E4E42e294effd4001f20414b3f72119da419647effc857540d6eee4266d9d9d91f271bffd23fe4572e29335ca8c686669bbcf3a712".substr(30*m[2],30).match(/(.{2})/g).map(e=>Number("0x"+e)),O=4*A()|0},Q=()=>{let e=a([[[2,1,2],[[0,1],[0,1]],0,w],[[2,1,2],0,[[0,1],[0,1]],F],[[2,1,4],0,0,C],[[2,1,3],0,0,C],[[1,1,6],0,0,C],[[1,2,3],0,[[1,0,1]],G],[[1,1,3],0,0,C],[[2,1,2],0,0,C],[[1,1,1],0,0,C],[[1,2,1],0,0,C]].filter(e=>e[0][2]<l)).slice(0,c),t=a([[[1,4,1],[[0]],0,P],[[1,.5,1],[[0]],0,Z]]);d=[...h(l)].map(()=>h(l).fill(0)),p=[...h(l)].map(()=>h(l).fill(0));for(let f=0;f<s;f++){let a,i,c,o=0,E=-9e9,O=0,D=r(e);f>=s-b&&(D=r(t,.7),n=5,x=6,O=1);for(let e=0;e<x;e++){c=[...D],c[4]=4*A()+1|0,c[5]=4*A()+1|0,2==m[3]&&(c[4]=c[5]=1),c[6]=4*A()|0,1==m[3]&&(c[6]=0),c[7]=1,c[8]=4*A()|0,c[3]==Z&&(c[8]=0);let t=()=>h(9).fill(h(9).fill(1));c[2]=c[2]||t(),c[1]=c[1]||t(),c[9]=[...c[0]];for(let e=0;e<c[8];e++)c[9].reverse(),c[2]=R(c[2]),c[1]=R(c[1]),c[7]=!c[7];if(c[9][0]>l/2){x<L&&x++;continue}c[10]=l%2==0?[c[9][0]/2+(A()*(l/2+1-c[9][0])|0),0,-l/2+c[9][2]/2+(A()*(l+1-c[9][2])|0)]:[c[9][0]/2+(A()*((l-1)/2+1-c[9][0])|0)+.5,0,-l/2+c[9][2]/2+(A()*(l+1-c[9][2])|0)],c[9][0]%2==l%2&&A()<1/(l-c[9][0])&&(c[9][0]%2||c[7])&&(c[10][0]=0);let f=0,r=0,[s,b]=[0,0].map((e,t)=>[...h(c[9][2*t])].map((e,A)=>c[10][2*t]+A-(c[9][2*t]-1)/2));for(let e of s)for(let t of b)e>=0?r++:f++;let y=0,v=0,O=0,u=0;for(let e of b)for(let t of s){let A=u%c[9][0],f=$(u/c[9][0]);u++,v=k(v,d[t+l/2-.5][e+l/2-.5]),O=k(O,p[t+l/2-.5][e+l/2-.5]),1==c[2][A][f]&&(y=k(y,d[t+l/2-.5][e+l/2-.5]))}y<O||y>v?x<L&&x++:(a=[0,-g.hypot(c[10][0],c[10][2]),-y,-g.hypot(c[10][0],y-10,c[10][2]),-X(g.hypot(c[10][0],2*y,c[10][2])-l),2*y+c[10][2]][n],(a>E||0==e)&&(E=a,o=y,i=c))}if(i&&(i[10][1]=o+i[0][1]/2,i[10][1])){if(O&&i[10][1]-i[9][1]/2==0)continue;let e=h(i[9][0]).fill().map((e,t)=>i[10][0]+t-(i[9][0]-1)/2),t=h(i[9][2]).fill().map((e,t)=>i[10][2]+t-(i[9][2]-1)/2),A=0;for(let f of t)for(let t of e){let e=A%i[9][0],r=$(A/i[9][0]);A++,d[t+l/2-.5][f+l/2-.5]=o+i[0][1],0==i[1][e][r]&&(d[t+l/2-.5][f+l/2-.5]=-99),p[t+l/2-.5][f+l/2-.5]=o+i[0][1]}y.push(i);for(let e=0;e<i[9][0];e++)for(let t=0;t<i[9][1];t++)for(let A=0;A<i[9][2];A++){let f=i[10][0]-i[9][0]/2+e+5|0,r=i[10][1]-i[9][1]/2+t|0,a=i[10][2]-i[9][2]/2+A+5|0;S[a+10*r][f][0]=S[a+10*r+10][f][1]=255*(y.length+1)/64}for(let e=0;e++<8;){let t=[0,0,0].map((t,A)=>(e>>A&1)-.5);v.push([t[0]*(i[9][0]+2*i[10][0]),t[1]*i[9][1]+i[10][1],t[2]*i[9][2]+i[10][2]])}}}},W=()=>{E=[-9,9,9,-9];let e=(e,t,A)=>[e*H(A)-t*I(A),e*I(A)+t*H(A)];v.forEach(t=>{let[A,f,r]=t;[A,r]=e(A,r,-i),[f,r]=e(f,r,-_),E[2]=z(A,E[2]),E[3]=k(A,E[3]),E[1]=z(f,E[1]),E[0]=k(f,E[0])}),E[4]=E[3]-E[2],E[5]=E[0]-E[1],E[6]=k(E[4]/1.8,E[5]/1.8,1),E[7]=E[2]+E[4]/2,E[8]=E[1]+E[5]/2};q(),Q(),W(),u_colors=y.map(e=>[e[4],e[5],e[6]]).flat();let K=[0,0,0,0].map(()=>h(64).fill([[]]));y.forEach((e,t)=>{K[0][t]=[e[10]],K[1][t]=[e[0]],K[2][t]=[[e[8],e[3],0]],K[3][t]=[[e[4],e[5],e[6]]]});let M=g.min(innerWidth,innerHeight),J=u.createElement("canvas"),B=J.style;B.width=B.height=M+"px";let N=z(M*devicePixelRatio,2048);T&&(N=Number(T));let V=J.getContext("webgl",{preserveDrawingBuffer:!0});u.body.appendChild(J);let U=o.slice(3*O,3+3*O);B.background=3==m[3]?"#333":`rgb(${U})`,J.width=J.height=N;let Y=createREGL({gl:V,extensions:["webgl_draw_buffers","oes_texture_float"]}),j=Y.texture(S),ee=[...h(4)].map((e,t)=>Y.texture({data:K[t],type:"float"})),te=[1,1].map(()=>Y.framebuffer({color:[Y.texture({type:"float",width:N,height:N}),Y.texture({type:"float",width:N,height:N})],depth:!1})),Ae="precision highp float;\n",fe={vert:"attribute vec2 g;void main(){gl_Position=vec4(g,0,1);}",attributes:{g:[[1,1],[1,-4],[-4,1]]},count:3},re=Y({...fe,frag:Ae+`#extension GL_EXT_draw_buffers:require@A 60@B 3.1415@C smoothstep@D vec3@E float@F normalize@G length@H texture2D@I vec2@Q(x) fract(54321.987 * sin(987.12345 * x + .1))@R(a) mat2(cos(a),-sin(a),sin(a),cos(a))@J 1e-4@K uniform sampler2D@L gl_FragCoord@M gl_FragData\nE N(E O){→sqrt(abs(O)*abs(O)+5e-5);}E P(E Q,E R){→(Q+R+N(Q-R))*.5;}K ps;K ss;K rt;K cs;K mp;K cl;K nr;uniform D pt[5];uniform E tk;E S=E(${N});ivec3 T=ivec3(0);E U;E V=30.;ivec2 W;E X=.01,Y=.015,Z;E a=.015;int b;E c(D O,D d){I e=I(G(O.xz),O.y-clamp(O.y,J,d.x));e.x-=clamp(e.x,d.z,d.y);→G(e)-J;}E f(D O,E b){D g=(H(ps,vec2(.5,b/64.)).rgb);D h=(H(rt,vec2(.5,b/64.)).rgb);D i=(H(ss,vec2(.5,b/64.)).rgb);ivec3 j=ivec3(H(cs,vec2(.5,(b)/64.)).rgb);O.x=abs(O.x);D k=O;k-=g;k.xz*=R(h.x*B/2.);D d=i-2.*(X+Y);Z=G(k-clamp(k,-d/2.,d/2.))-X*1.4;if(h.y==5.){E l=G(k.zy)-.5;E m=max(abs(k.z)-.5,abs(k.y+i.y/2.)-1.);E n=min(l,m);Z=max(Z,-n);}if(h.y==6.){E o=c(k+D(0,1.6-X*3.,0),D(3.55,.15,0));E p=c(k+D(0,2.-X*2.,0),D(.4-X*2.,.45,0));Z=min(o,p);}if(h.y!=6.){D q=k;I r=i.xz;q.xz+=(r-1.)/2.;q.xz=q.xz-clamp(floor(q.xz+.5),I(0.),r-1.);q.y-=i.y/2.+.02;E s=c(q,D(.24,.28,mix(J,.18,${m[1]}.)));Z=min(s,Z);}if(k.z<.01&&(h.y==3.||h.y==4.)){Z=P(Z,dot(k,D(0,.78*(7.-2.*h.y),-.624))-.39);}if(h.y==7.){E t=c(k+D(0,.25-X*2.,0),D(.4-X*2.,.45,0));Z=t;if(t<J){T.z=9;}}if(Z<J){if(T.z==9)T=ivec3(j.xy,9);else T=j;}→Z;}D u(D O,E b){I v=I(.01,0.);→F(D(f(O+v.xyy,b)-f(O-v.xyy,b),f(O+v.yxy,b)-f(O-v.yxy,b),f(O+v.yyx,b)-f(O-v.yyx,b)));}void w(vec3 O){W*=0;O.xz+=fract(E(${l/2}));O.x=abs(O.x);O.zx-=fract(E(${l/2}));O.x+=5.;O.z+=5.;O=floor(O+vec3(0,0,0));if(O.y<0.)return;vec3 x=vec3(10,1000/10,10);if(fract(O/x)!=O/x)return;vec2 y,z=vec2(x.x,x.y*x.z);y.x=O.x;y.y=O.z+O.y*10.;vec2 AA=(y+.5)/z;W=ivec2(H(mp,AA).rg*64.);return;}void main(){D AB=D(0),AC,AD;I AE=(L.xy*2.-S)/S;E AF;U=0.;E v=1e9,AG=9.,AH;AF=0.;E AI=floor(tk/2.);E AJ=mod(tk,2.);I AK=I(AJ/2.,AI/4.)-.5;if(mod(AI,2.)==0.)AK.x+=.25;AE+=AK*2./S;D O,AL=D(AE*E(${E[6]})+I(${E[7]},${E[8]}),-V),AM=D(0,0,1);bool AN=false;AL.yz*=R(${_});AM.yz*=R(${_});AL.xz*=R(${i});AM.xz*=R(${i});E AO=0.;for(E AP=0.;AP<200.;AP++){AO++;O=AL+AM*AF;O.xz-=fract(E(${l/2}));vec3 AQ=(step(0.,AM)-fract(O))/AM;E AR;AR=min(min(AQ.x,AQ.y),AQ.z)+1e-4;bool AS=false;w(O);if(length(I(W))>0.&&O.y>=0.){E AT=0.;for(E AU=0.;AU<200.;AU++){AO++;O=AL+AM*(AF+AT);E AV=f(O,E(W.x-1));E AW=f(O,E(W.y-1));if(AV<AW){v=AV;b=W.x-1;}else{v=AW;b=W.y-1;}AT+=v;if(AG<v&&v<a){AN=true;AS=true;AR=AT;break;}AG=v;if(v<J||AO>200.||AF>V*2.){AS=true;AR=AT;break;}if(AT>AR){break;}}}else{T=ivec3(0,0,-1);}AF+=AR;if(AS==true||AO>200.)break;}D AX;if(!AN){D AY,AZ;for(int AH=0;AH<5;AH++){if(T[0]==AH)AY=pt[AH];if(T[1]==AH)AZ=pt[AH];}D Aa=AY;if(T.z==1)if(sin(O.y*B*3.)>0.)Aa=AZ;if(T.z==2)if(sin((O.x+fract(${l}./2.))*B*2.*1.5)>0.)Aa=AZ;if(${m[3]}==3)Aa=sin((G(O)/max(${l}.,E(${m[8]}))-D(0,.3,.6))*6.28)*.5+.5;AC=u(O,E(b));if(T.z==9){Aa=D(0);D Ab=O+fract(${l}./2.);Ab=fract(Ab)-.5;Aa+=step(.3,G(Ab.xz));Aa+=step(-.1,-G(Ab.xz+.1));}if(T.z==-1){AX=D(${U})/255.;if(G(AX)>.4){AX*=C(5.,0.,G(AE+I(${m[6]},-1)));}if(${m[3]}==3){AX=D(.2);}if(sin(G(pow(abs(AE),I(${m[5]})))*32.)>0.)AX*=.95;}else{AX=Aa;AX*=min(1.5,55./AO)*.2+.8;AX*=dot(AC,F(D(-.5,.5,0)))*.2+1.;if(T.z!=9)AX+=pow(abs(dot(AC,F(D(0,1.5,.5)))),40.);}}if(tk>1.){D u=(H(nr,L.xy/S).rgb);E f=H(nr,L.xy/S).a;f=min(f,V*2.);vec3 Ac=u;vec3 Ad=normalize(cross(vec3(1,2,3),Ac));vec3 Ae=cross(Ac,Ad);for(E AP=0.;AP<20.;AP++){D Af=D(0,0,0);Af+=(Q(AP+tk+dot(AE*99.,vec2(.319,.137)))*2.-1.)*Ad;Af+=(Q(AP+tk+dot(AE*99.,vec2(.319,.137))+.1)*2.-1.)*Ae;Af+=(Q(AP+tk+dot(AE*99.,vec2(.319,.137))+.2))*Ac;Af=F(Af)*pow(Q(AP+dot(mod(L.xy,10.1*B),vec2(.319,.137))),2.);vec3 Ag=D(dot(Af,vec3(1,0,0)),dot(Af,vec3(0,1,0)),dot(Af,D(0,0,1)));if(f-Ag.z*1.1>H(nr,L.xy/S+.15*Ag.xy).a){AX*=.97;}}}M[0]=mix(H(cl,L.xy/S),AX.rgbb,1./tk);AC.xz*=-sign(${m[0]-.5})*R(${i});AC.xy*=R(atan(sqrt(2.)));AC=AC.zyx;AC.xz*=-1.;M[1]=mix(H(nr,L.xy/S),vec4(AC.rgb,AF),1./tk);}`.replace(/@/g,"\n#define ").replace(/→/g,"return "),uniforms:{pt:o.map(e=>e/255),mp:j,tk:({tick:e})=>e,cl:({tick:e})=>te[e%2].color[0],nr:({tick:e})=>te[e%2].color[1],ps:ee[0],ss:ee[1],rt:ee[2],cs:ee[3]},framebuffer:({tick:e})=>te[(e+1)%2]}),ae=Y({...fe,frag:Ae+`uniform sampler2D c;void main(){gl_FragData[0]=vec4(texture2D(c,gl_FragCoord.xy/float(${N})).rgb,1);}`,uniforms:{c:({tick:e})=>te[(e+1)%2].color[0]},depth:{enable:!1}}),ie=1+(N/D|0),ce=new Date,oe=1,le=1,se=1;D=256;let ne=Y.frame(({tick:e})=>{re(),ae(),e>8&&(u.title="👾",ne.cancel())});'tx shvembldr piter stranger'