let e,t,r,o,a,f,i,c,l,A,s,n,x,m,d,p,y,g,D,b,u,v,M,h=Math,E=Array,z=h.min,$=h.max,k=h.floor,_=h.abs,N=h.cos,F=h.sin,H=devicePixelRatio,P=location.href.split("#")[1],V=e=>e[0].map((t,r)=>e.slice().reverse().map(e=>e[r])),C=0,G=3,w=4,J=5,I=6,T=7,j=30,q=.95532,L=[...Array(1e3)].map(()=>[...Array(10)].map(()=>[0,0,0])),R=()=>{e=new Uint32Array([4,1,t=o=2,3].map(e=>parseInt(tokenData.hash.substr(8*e,8),16))),r=()=>(o=e[3],e[3]=e[2],e[2]=e[1],e[1]=t=e[0],o^=o<<11,e[0]^=o^o>>>8^t>>>19,e[0]/2**32),a=(e,t)=>e[e.length*r()**(t||1)|0],f=e=>e.map(e=>[e,r()]).sort((e,t)=>e[1]-t[1]).map(e=>e[0]),D=[],u_tick=1e-6,d=[r()**4*2|0,r()**8*2|0,0,5*(1-r()**.3)|0,0,a([2,1],.5),(3*r()|0)-1,0,0,0,0],i=(d[0]-.5)*h.PI/2-h.PI;let p=[[8+2*r()|0,30,5,8,0],[4,3+4*r()|0,0,1,1],[8+2*r()|0,30,3,8,r()**4*8],[6+4*r()|0,10+20*r()|0,2,6,2*r()],[6+(0|r()),10+10*r()|0,0,4,r()**2*3]];d[4]=h.sqrt(1-(r()-1)**2)*p.length|0,[A,s,n,x,m]=p[d[4]],c=2+2*r()|0,g=[],d[2]=r()**.5*8|0,l="dddddd888888555555222222aaaaaaf26b21fbb04099ca3c208b3afcec529b5de5f15bb500bbf900f5d4fee440f1faeea8dadc457b9d1d3557e6394650514ff25f5c247ba070c1b3ffe066541388d90368f1e9da2e294effd4001f20414b3f72119da419647effc857540d6eee4266f3fcf01f271bffd23fe4572e29335ca8c686669bbcf3a712".substr(30*d[2],30).match(/(.{2})/g).map(e=>Number("0x"+e)),u=4*r()|0},S=()=>{let e=f([[[2,1,2],[[0,1],[0,1]],0,G],[[2,1,2],0,[[0,1],[0,1]],w],[[2,1,4],0,0,C],[[2,1,3],0,0,C],[[1,1,6],0,0,C],[[1,2,3],0,[[1,0,1]],J],[[1,1,3],0,0,C],[[2,1,2],0,0,C],[[1,1,1],0,0,C],[[1,2,1],0,0,C]].filter(e=>e[0][2]<A)).slice(0,c),t=f([[[1,4,1],[[0]],0,I],[[1,.5,1],[[0]],0,T]]);p=[...E(A)].map(()=>E(A).fill(0)),y=[...E(A)].map(()=>E(A).fill(0));for(let o=0;o<s;o++){let f,i,c,l=0,b=-9e9,u=0,v=a(e);o>=s-m&&(v=a(t,.7),n=6,x=6,u=1);for(let e=0;e<x;e++){c=JSON.parse(JSON.stringify(v)),c[4]=4*r()+1|0,c[5]=4*r()+1|0,2==d[3]&&(c[4]=c[5]=1),c[6]=4*r()|0,1==d[3]&&(c[6]=0),c[7]=1,c[8]=4*r()|0,c[3]==T&&(c[8]=0);let t=()=>E(9).fill(E(9).fill(1));c[2]=c[2]||t(),c[1]=c[1]||t(),c[9]=[...c[0]];for(let e=0;e<c[8];e++)c[9].reverse(),c[2]=V(c[2]),c[1]=V(c[1]),c[7]=!c[7];if(c[9][0]>A/2){x<j&&x++;continue}c[10]=A%2==0?[c[9][0]/2+(r()*(A/2+1-c[9][0])|0),0,-A/2+c[9][2]/2+(r()*(A+1-c[9][2])|0)]:[c[9][0]/2+(r()*((A-1)/2+1-c[9][0])|0)+.5,0,-A/2+c[9][2]/2+(r()*(A+1-c[9][2])|0)],c[9][0]%2==A%2&&r()<1/(A-c[9][0])&&(c[9][0]%2||c[7])&&(c[10][0]=0);let o=0,a=0,s=[...E(c[9][0])].map((e,t)=>c[10][0]+t-(c[9][0]-1)/2),m=[...E(c[9][2])].map((e,t)=>c[10][2]+t-(c[9][2]-1)/2);for(let e of s)for(let t of m)e>=0?a++:o++;let g=0,D=0,u=0,M=0;for(let e of m)for(let t of s){let r=M%c[9][0],o=k(M/c[9][0]);M++,D=$(D,p[t+A/2-.5][e+A/2-.5]),u=$(u,y[t+A/2-.5][e+A/2-.5]),1==c[2][r][o]&&(g=$(g,p[t+A/2-.5][e+A/2-.5]))}g<u||g>D?x<j&&x++:(f=[0,-h.hypot(c[10][0],c[10][2]),-g,-h.hypot(c[10][0],g-10,c[10][2]),-_(h.hypot(c[10][0],g-10,c[10][2])-A),-_(h.hypot(c[10][0],2*g,c[10][2])-A),2*g+c[10][2]][n],(f>b||0==e)&&(b=f,l=g,i=c))}if(i&&(i[10][1]=l+i[0][1]/2,i[10][1])){if(u&&i[10][1]-i[9][1]/2==0)continue;let e=E(i[9][0]).fill().map((e,t)=>i[10][0]+t-(i[9][0]-1)/2),t=E(i[9][2]).fill().map((e,t)=>i[10][2]+t-(i[9][2]-1)/2),r=0;for(let o of t)for(let t of e){let e=r%i[9][0],a=k(r/i[9][0]);r++,p[t+A/2-.5][o+A/2-.5]=l+i[0][1],0==i[1][e][a]&&(p[t+A/2-.5][o+A/2-.5]=-99),y[t+A/2-.5][o+A/2-.5]=l+i[0][1]}g.push(i);for(let e=0;e<i[9][0];e++)for(let t=0;t<i[9][1];t++)for(let r=0;r<i[9][2];r++){let o=i[10][0]-i[9][0]/2+e+5|0,a=i[10][1]-i[9][1]/2+t|0,f=i[10][2]-i[9][2]/2+r+5|0;L[f+10*a][o][0]=L[f+10*a+10][o][1]=255*(g.length+1)/64}for(let e=0;e++<8;){let t=[0,0,0].map((t,r)=>(e>>r&1)-.5);D.push([t[0]*(i[9][0]+2*i[10][0]),t[1]*i[9][1]+i[10][1],t[2]*i[9][2]+i[10][2]])}}}},K=()=>{b=[-99,99,99,-99];let e=(e,t,r)=>[e*N(r)-t*F(r),e*F(r)+t*N(r)];D.forEach(t=>{let[r,o,a]=t;[r,a]=e(r,a,-i),[o,a]=e(o,a,-q),b[2]=z(r,b[2]),b[3]=$(r,b[3]),b[1]=z(o,b[1]),b[0]=$(o,b[0])}),b[4]=b[3]-b[2],b[5]=b[0]-b[1],b[6]=$(b[4]/1.8,b[5]/1.8,1),b[7]=b[2]+b[4]/2,b[8]=b[1]+b[5]/2};R(),S(),K(),u_colors=g.map(e=>[e[4],e[5],e[6]]).flat();let Q="";Q+=g.map((e,t)=>`ps[${t}]=vec3(${e[10][0]},${e[10][1]},${e[10][2]});`).join(""),Q+=g.map((e,t)=>`ss[${t}]=vec3(${e[0][0]},${e[0][1]},${e[0][2]});`).join(""),Q+=g.map((e,t)=>`cs[${t}]=ivec3(${e[4]},${e[5]},${e[6]});`).join(""),Q+=g.map((e,t)=>`rt[${t}]=vec2(${e[8]},${e[3]});`).join("");let B=h.min(innerWidth,innerHeight)*H,O=document.createElement("canvas");O.style.width=B/H+"px",O.style.height=B/H+"px",B=z(B,2048);let X=O.getContext("webgl",{preserveDrawingBuffer:!0});document.body.appendChild(O);let Y=l.slice(3*u,3+3*u);O.style.background=3==d[3]?"#333":`rgb(${Y})`,O.width=B,O.height=B;let W=createREGL({gl:X,extensions:["webgl_draw_buffers","oes_texture_float"]}),U=W.texture(L),Z=[1,1].map(()=>W.framebuffer({color:[W.texture({type:"float",width:B,height:B}),W.texture({type:"float",width:B,height:B})],depth:!1})),ee={frag:`#extension GL_EXT_draw_buffers : require\nprecision highp float;@A 60@B 3.1415@C smoothstep@D vec3@E float@F normalize@G length@H vec2\nmat2 I(E J){→mat2(cos(J),-sin(J),sin(J),cos(J));}@rnd(x) fract(54321.987 * sin(987.12345 * x + .1))@K .0001\nE L(E M){→sqrt(abs(M)*abs(M)+5e-5);}E N(E J,E O){→(J+O+L(J-O))*.5;}D ps[A];D ss[A];H rt[A];ivec3 cs[A];uniform D pt[5];uniform E tk;uniform E rs;uniform sampler2D tex3d;uniform sampler2D texCol;uniform sampler2D texNorm;ivec3 P=ivec3(0);E Q;E R=30.;ivec2 S;E T=.01,U=.015,V;E W=.015;E X(D M,D Y){H Z=H(G(M.xz),M.y-clamp(M.y,K,Y.x));Z.x-=clamp(Z.x,Y.z,Y.y);→G(Z)-K;}E a(D M){M.x=abs(M.x);E b=M.y+1.;for(int c=0;c<A;c++){if(c>=${g.length})break;if(c!=S.x-1&&c!=S.y-1)continue;D d=M;d-=ps[c];d.xz*=I(rt[c].x*B/2.);D Y=ss[c]-2.*(T+U);V=G(d-clamp(d,-Y/2.,Y/2.))-T*1.4;if(rt[c].y==5.){E e=G(d.zy)-.5;E f=max(abs(d.z)-.5,abs(d.y+ss[c].y/2.)-1.);E g=min(e,f);V=max(V,-g);}if(rt[c].y==6.){E h=X(d+D(0,1.6-T*3.,0),D(3.55,.15,0));E i=X(d+D(0,2.-T*2.,0),D(.4-T*2.,.45,0));V=min(h,i);}if(rt[c].y!=6.){D j=d;H k=ss[c].xz;j.xz+=(k-1.)/2.;j.xz=j.xz-clamp(floor(j.xz+.5),H(0.),k-1.);j.y-=ss[c].y/2.+.02;E l=X(j,D(.24,.28,mix(K,.18,${d[1]}.)));V=min(l,V);}if(d.z<.01&&(rt[c].y==3.||rt[c].y==4.)){V=N(V,dot(d,D(0,.78*(7.-2.*rt[c].y),-.624))-.39);}if(rt[c].y==7.){E m=X(d+D(0,.25-T*2.,0),D(.4-T*2.,.45,0));V=m;if(m<K){P.z=9;}}if(V<b){if(P.z==9)P=ivec3(cs[c].xy,9);else P=cs[c];b=V;}if(b<K)break;}→b;}D n(D M){H o=H(.01,0.);→F(D(a(M+o.xyy)-a(M-o.xyy),a(M+o.yxy)-a(M-o.yxy),a(M+o.yyx)-a(M-o.yyx)));}vec2 p(vec3 M){M.xz+=fract(float(${A/2}));M.x=abs(M.x);M.zx-=fract(float(${A/2}));M.x+=5.;M.z+=5.;M=floor(M+vec3(0,0,0));if(M.y<0.)return H(0);vec3 q=vec3(10,1000/10,10);if(fract(M/q)!=M/q)return-H(1.);vec2 r,s=vec2(q.x,q.y*q.z);r.x=M.x;r.y=M.z+M.y*10.;vec2 t=(r+.5)/s;S=ivec2(texture2D(tex3d,t).rg*64.);return vec2(S);}void main(){${Q}D u=D(0),v,w;H x=(gl_FragCoord.xy*2.-rs)/rs;E y;Q=0.;E o=1e9,z=9.,AA;y=0.;E AB=floor(tk/2.);E AC=mod(tk,2.);H AD=H(AC/2.,AB/4.)-.5;if(mod(AB,2.)==0.)AD.x+=.25;x+=AD*2./rs;D M,AE=D(x*E(${b[6]})+H(${b[7]},${b[8]}),-R),AF=D(0,0,1);bool AG=false;AE.yz*=I(${q});AF.yz*=I(${q});AE.xz*=I(${i});AF.xz*=I(${i});float AH=0.;for(float c=0.;c<200.;c++){AH++;M=AE+AF*y;M.xz-=fract(float(${A/2}));vec3 AI=(step(0.,AF)-fract(M))/AF;float AJ;AJ=min(min(AI.x,AI.y),AI.z)+1e-4;bool AK=false;if(length(p(M))>0.){float AL=0.;for(float AM=0.;AM<200.;AM++){AH++;M=AE+AF*(y+AL);AL+=o=a(M);if(z<o&&o<W){AG=true;AK=true;AJ=AL;break;}z=o;if(o<.001||AH>200.||y>R*2.){AK=true;AJ=AL;break;}if(AL>AJ){break;}}}else P=ivec3(0,0,-1);y+=AJ;if(AK==true||AH>200.)break;}D AN;if(!AG){D AO,AP;for(int AA=0;AA<5;AA++){if(P[0]==AA)AO=pt[AA];if(P[1]==AA)AP=pt[AA];}D AQ=AO;if(P.z==1)if(sin(M.y*B*3.)>0.)AQ=AP;if(P.z==2)if(sin((M.x+fract(ps[0].x-ss[0].x/2.))*B*2.*1.5)>0.)AQ=AP;if(${d[3]}==3)AQ=sin((G(M)/max(E(${A}),E(${d[8]}))*2.-D(0,.3,.6))*6.28)*.5+.5;v=n(M);if(P.z==9){AQ=D(0);D AR=M+fract(${A}./2.);AR=fract(AR)-.5;AQ+=step(.3,G(AR.xz));AQ+=step(-.1,-G(AR.xz+.1));}if(P.z==-1){AN=D(${Y})/255.;if(G(AN)>.4){AN*=C(5.,0.,G(x+H(${d[6]},-1)));}if(${d[3]}==3){AN=D(.2);}if(sin(G(pow(abs(x),H(${d[5]})))*32.)>0.)AN*=.95;}else{AN=AQ;AN*=min(1.5,55./AH)*.2+.8;AN*=dot(v,F(D(-.5,.5,0)))*.2+1.;if(P.z!=9)AN+=pow(abs(dot(v,F(D(0,1.5,.5)))),40.);}}if(tk>1.){D n=(texture2D(texNorm,gl_FragCoord.xy/rs).rgb);E a=texture2D(texNorm,gl_FragCoord.xy/rs).a;a=min(a,R*2.);vec3 AS=n;vec3 AT=normalize(cross(vec3(1,2,3),AS));vec3 AU=cross(AS,AT);for(float c=0.;c<20.;c++){D AV=D(0,0,0);AV+=(rnd(c+tk+dot(x*99.,vec2(.319,.137)))*2.-1.)*AT;AV+=(rnd(c+tk+dot(x*99.,vec2(.319,.137))+.1)*2.-1.)*AU;AV+=(rnd(c+tk+dot(x*99.,vec2(.319,.137))+.2))*AS;AV=F(AV)*pow(rnd(c+dot(mod(gl_FragCoord.xy,10.1*B),vec2(.319,.137))),2.);vec3 AW=D(dot(AV,vec3(1,0,0)),dot(AV,vec3(0,1,0)),dot(AV,D(0,0,1)));if(a-AW.z*1.1>texture2D(texNorm,gl_FragCoord.xy/rs+.15*AW.xy).a){AN*=.97;}}}gl_FragData[0]=mix(texture2D(texCol,gl_FragCoord.xy/rs),AN.rgbb,1./tk);v.xz*=-sign(${d[0]-.5})*I(${i});v.xy*=I(atan(sqrt(2.)));v=v.zyx;v.xz*=-1.;gl_FragData[1]=mix(texture2D(texNorm,gl_FragCoord.xy/rs),vec4(v.rgb,y),1./tk);}`.replace(/@/g,"\n#define ").replace(/→/g,"return "),vert:"attribute vec2 g;void main(){gl_Position=vec4(g,0,1);}",attributes:{g:[[1,1],[1,-4],[-4,1]]},uniforms:{rs:W.prop("r"),pt:l.map(e=>e/255),tex3d:U,tk:({tick:e})=>e,texCol:({tick:e})=>Z[e%2].color[0],texNorm:({tick:e})=>Z[e%2].color[1]},depth:{enable:!1},framebuffer:({tick:e})=>Z[(e+1)%2],count:3},te=W({frag:"#extension GL_EXT_draw_buffers : require\n                precision highp float;\n                uniform float rs;\n                uniform sampler2D texCol;\n                // uniform sampler2D texNorm;        \n                void main() {\n                    gl_FragData[0] = texture2D(texCol,gl_FragCoord.xy/rs);\n                    gl_FragData[0].a = 1.;\n                }",vert:"attribute vec2 g;void main(){gl_Position=vec4(g,0,1);}",attributes:{g:[[1,1],[1,-4],[-4,1]]},uniforms:{rs:W.prop("r"),texCol:({tick:e})=>Z[(e+1)%2].color[0]},depth:{enable:!1},count:3}),re=W(ee),oe=1+(B/M|0),ae=new Date,fe=1,ie=1;P&&(ie=Number(P));let ce=1;M=256;let le=W.frame(({tick:e})=>{re({r:B}),te({r:B}),e>8&&(document.title="👾",le.cancel())});'tx shvembldr piter stranger'