let n,e,o,r,t,i;console.log(tokenData.hash);let l,p,a,c,s,f,d,b,x,m,y,u,g,v,h,F,V,$=Math,z=Array,k=$.min,I=$.max,_=$.floor,E=$.abs,D=$.cos,L=$.sin,R=devicePixelRatio,M=location.href.split("#")[1],S=n=>n[0].map((e,o)=>n.slice().reverse().map(n=>n[o])),B=0,A=3,N=4,C=5,j=6,O=7,P=30,w=.95532,X=[...Array(1e3)].map(()=>Array(10).fill([0]));console.log(X);let U=()=>{n=new Uint32Array([4,1,e=r=2,3].map(n=>parseInt(tokenData.hash.substr(8*n,8),16))),o=()=>(r=n[3],n[3]=n[2],n[2]=n[1],n[1]=e=n[0],r^=r<<11,n[0]^=r^r>>>8^e>>>19,n[0]/2**32),t=(n,e)=>n[n.length*o()**(e||1)|0],i=n=>n.map(n=>[n,o()]).sort((n,e)=>n[1]-e[1]).map(n=>n[0]),g=[],u_tick=1e-6,x=[o()**4*2|0,o()**8*2|0,0,5*(1-o()**.3)|0,0,t([2,1],.5),(3*o()|0)-1,0,0,0,0],l=(x[0]-.5)*$.PI/2-$.PI;let m=[[8+2*o()|0,30,5,8,0],[4,3+4*o()|0,0,1,1],[8+2*o()|0,30,3,8,o()**4*8],[6+4*o()|0,10+20*o()|0,2,6,2*o()],[6+(0|o()),10+10*o()|0,0,4,o()**2*3]];x[4]=$.sqrt(1-(o()-1)**2)*m.length|0,[c,s,f,d,b]=m[x[4]],console.log("presets[features[4]",m[x[4]]),p=2+2*o()|0,u=[],x[2]=o()**.5*8|0,a="dddddd888888555555222222aaaaaaf26b21fbb04099ca3c208b3afcec529b5de5f15bb500bbf900f5d4fee440f1faeea8dadc457b9d1d3557e6394650514ff25f5c247ba070c1b3ffe066541388d90368f1e9da2e294effd4001f20414b3f72119da419647effc857540d6eee4266f3fcf01f271bffd23fe4572e29335ca8c686669bbcf3a712".substr(30*x[2],30).match(/(.{2})/g).map(n=>Number("0x"+n)),h=4*o()|0},K=()=>{let n=i([[[2,1,2],[[0,1],[0,1]],0,A],[[2,1,2],0,[[0,1],[0,1]],N],[[2,1,4],0,0,B],[[2,1,3],0,0,B],[[1,1,6],0,0,B],[[1,2,3],0,[[1,0,1]],C],[[1,1,3],0,0,B],[[2,1,2],0,0,B],[[1,1,1],0,0,B],[[1,2,1],0,0,B]].filter(n=>n[0][2]<c)).slice(0,p),e=i([[[1,4,1],[[0]],0,j],[[1,.5,1],[[0]],0,O]]);m=[...z(c)].map(()=>z(c).fill(0)),y=[...z(c)].map(()=>z(c).fill(0));for(let r=0;r<s;r++){let i,l,p,a=0,v=-9e9,h=0,F=t(n);r>=s-b&&4!=x[3]&&(F=t(e,.7),f=6,d=6,h=1);for(let n=0;n<d;n++){p=JSON.parse(JSON.stringify(F)),p[4]=4*o()+1|0,p[5]=4*o()+1|0,2==x[3]&&(p[4]=p[5]=1),p[6]=4*o()|0,1==x[3]&&(p[6]=0),p[7]=1,p[8]=4*o()|0,p[3]==O&&(p[8]=0);let e=()=>z(9).fill(z(9).fill(1));p[2]=p[2]||e(),p[1]=p[1]||e(),p[9]=[...p[0]];for(let n=0;n<p[8];n++)p[9].reverse(),p[2]=S(p[2]),p[1]=S(p[1]),p[7]=!p[7];if(p[9][0]>c/2){d<P&&d++;continue}p[10]=c%2==0?[p[9][0]/2+(o()*(c/2+1-p[9][0])|0),0,-c/2+p[9][2]/2+(o()*(c+1-p[9][2])|0)]:[p[9][0]/2+(o()*((c-1)/2+1-p[9][0])|0)+.5,0,-c/2+p[9][2]/2+(o()*(c+1-p[9][2])|0)],p[9][0]%2==c%2&&o()<1/(c-p[9][0])&&(p[9][0]%2||p[7])&&(p[10][0]=0);let r=0,t=0,s=[...z(p[9][0])].map((n,e)=>p[10][0]+e-(p[9][0]-1)/2),b=[...z(p[9][2])].map((n,e)=>p[10][2]+e-(p[9][2]-1)/2);for(let n of s)for(let e of b)n>=0?t++:r++;let u=0,g=0,h=0,V=0;for(let n of b)for(let e of s){let o=V%p[9][0],r=_(V/p[9][0]);V++,g=I(g,m[e+c/2-.5][n+c/2-.5]),h=I(h,y[e+c/2-.5][n+c/2-.5]),1==p[2][o][r]&&(u=I(u,m[e+c/2-.5][n+c/2-.5]))}u<h||u>g?d<P&&d++:(i=[0,-$.hypot(p[10][0],p[10][2]),-u,-$.hypot(p[10][0],u-10,p[10][2]),-E($.hypot(p[10][0],u-10,p[10][2])-c),-E($.hypot(p[10][0],2*u,p[10][2])-c),2*u+p[10][2]][f],(i>v||0==n)&&(v=i,a=u,l=p))}if(l&&(l[10][1]=a+l[0][1]/2,l[10][1])){if(h&&l[10][1]-l[9][1]/2==0)continue;let n=z(l[9][0]).fill().map((n,e)=>l[10][0]+e-(l[9][0]-1)/2),e=z(l[9][2]).fill().map((n,e)=>l[10][2]+e-(l[9][2]-1)/2),o=0;for(let r of e)for(let e of n){let n=o%l[9][0],t=_(o/l[9][0]);o++,m[e+c/2-.5][r+c/2-.5]=a+l[0][1],0==l[1][n][t]&&(m[e+c/2-.5][r+c/2-.5]=-99),y[e+c/2-.5][r+c/2-.5]=a+l[0][1]}u.push(l);for(let n=0;n<l[9][0];n++)for(let e=0;e<l[9][1];e++)for(let o=0;o<l[9][2];o++){let r=l[10][0]-l[9][0]/2+n+5|0,t=l[10][1]-l[9][1]/2+e|0,i=l[10][2]-l[9][2]/2+o+5|0;X[i+10*t][r]=[255*(u.length+1)/64]}for(let n=0;n++<8;){let e=[0,0,0].map((e,o)=>(n>>o&1)-.5);g.push([e[0]*(l[9][0]+2*l[10][0]),e[1]*l[9][1]+l[10][1],e[2]*l[9][2]+l[10][2]])}}}},q=()=>{v=[-99,99,99,-99];let n=(n,e,o)=>[n*D(o)-e*L(o),n*L(o)+e*D(o)];g.forEach(e=>{let[o,r,t]=e;[o,t]=n(o,t,-l),[r,t]=n(r,t,-w),v[2]=k(o,v[2]),v[3]=I(o,v[3]),v[1]=k(r,v[1]),v[0]=I(r,v[0])}),v[4]=v[3]-v[2],v[5]=v[0]-v[1],v[6]=I(v[4]/1.8,v[5]/1.8,1),v[7]=v[2]+v[4]/2,v[8]=v[1]+v[5]/2};U(),K(),q(),console.log(a),u_colors=u.map(n=>[n[4],n[5],n[6]]).flat();let G="";G+=u.map((n,e)=>`ps[${e}]=vec3(${n[10][0]},${n[10][1]},${n[10][2]});`).join(""),G+=u.map((n,e)=>`ss[${e}]=vec3(${n[0][0]},${n[0][1]},${n[0][2]});`).join(""),G+=u.map((n,e)=>`cs[${e}]=ivec3(${n[4]},${n[5]},${n[6]});`).join(""),G+=u.map((n,e)=>`rt[${e}]=vec2(${n[8]},${n[3]});`).join("");let H=$.min(innerWidth,innerHeight)*R,J=document.createElement("canvas");J.style.width=H/R+"px",J.style.height=H/R+"px",H=k(H,2048);let T=J.getContext("webgl",{preserveDrawingBuffer:!0});document.body.appendChild(J);let Y=a.slice(3*h,3+3*h);J.style.background=4==x[3]||3==x[3]?"#333":`rgb(${Y})`,J.width=H,J.height=H;var W=createREGL(T);let Q=W.texture(X),Z=W({frag:`precision highp float;\n                #define BLOCKS_NUMBER_MAX 60\n                #define PI 3.1415\n                #define S smoothstep\n                #define V vec3\n                #define F float\n                #define N normalize\n                #define L length\n                #define v vec2\n                mat2 rot(F a) {→mat2(cos(a),-sin(a),sin(a),cos(a));} // FIXME\n                // #define rot(a) mat2(cos(a),-sin(a),sin(a),cos(a))\n                #define EPS .001\n                F sabs(F p) {→sqrt(abs(p)*abs(p)+5e-5);}\n                F smax(F a, F b) {→(a+b+sabs(a-b))*.5;}\n                \n                V ps[BLOCKS_NUMBER_MAX];\n                V ss[BLOCKS_NUMBER_MAX];\n                v rt[BLOCKS_NUMBER_MAX];\n                ivec3 cs[BLOCKS_NUMBER_MAX];\n                \n                uniform V pt[5];\n                uniform F aa;\n                uniform F rs;\n\n                uniform sampler2D tex3d;\n        \n                ivec3 colIds;\n                F gl;\n                F camDist = 2e1;\n                int blockId;\n                \n                int eye;\n    \n                F tube(V p, V s){\n                    v po = v(L(p.xz), p.y - clamp(p.y, EPS, s.x));\n                    po.x -= clamp(po.x, s.z, s.y);\n                    →L(po)-EPS;\n                }\n                \n                F dist(V p) {\n                    // →length(fract(p)-.5)-.5;\n                    colIds = ivec3(0, 0, -1);\n                    p.x = abs(p.x);\n                    // F res = 1e5;\n                    F res = p.y + 1.; // floor plane\n                    // F res = length(p)-.5; // floor plane\n                    for(int i = 0; i < BLOCKS_NUMBER_MAX; i++) {\n                        if(i >= ${u.length})\n                            break;\n                        // if(i != blockId)\n                        //     continue;\n                        eye = 0;\n                        V pb = p;\n                        pb -= ps[i];\n                        pb.xz *= rot(rt[i].x * PI / 2.);\n                        \n                        // box\n                        F cornerR = .01, gap = .008, block;\n                        \n                        V s = ss[i] - 2. * (cornerR + gap);\n                        block = L(pb - clamp(pb, -s/2., s/2.)) - cornerR * 1.4;\n                        // if(blockId==0) {colIds = ivec3(3, 2, 1); return length(fract(p)-.5)-.45;}\n                            \n                        if(rt[i].y == 5.) { // arc\n                            F cyl = L(pb.zy) - .5;\n                            F box = max(abs(pb.z) - .5, abs(pb.y + ss[i].y / 2.) - 1.);\n                            F hole = min(cyl, box);\n                            block = max(block, -hole);\n                        }\n    \n                        if(rt[i].y == 6.) { // pillar\n                            F narrow = tube(pb+V(0,1.6-cornerR*2.,0),V(3.55,.15,0));\n                            F base = tube(pb+V(0,2.-cornerR*2.,0),V(.4-cornerR*2.,.45,0));\n                            block = min(narrow, base);\n                        }\n\n                        // studs\n                        if(rt[i].y != 6.) { // not pillar\n                            V ps = pb;\n                            // repetition\n                            v l = ss[i].xz;\n                            ps.xz += (l - 1.) / 2.;\n                            ps.xz = ps.xz - clamp(floor(ps.xz + .5), v(0.), l - 1.);\n                            \n                            // position\n                            ps.y -= ss[i].y / 2. + .02;\n    \n                            F stud = tube(ps, V(.24, .28, mix(EPS,.18,${x[1]}.)));\n                            block = min(stud, block);\n                        }\n                \n                        if(pb.z<.01 && (rt[i].y == 3. || rt[i].y == 4.)) { // beak\n                            block = smax(block,dot(pb,V(0,.78*(7.-2.*rt[i].y),-.624))-.39);\n                        }\n                \n                \n                \n                        if(rt[i].y == 7.) { // eye\n                            // F eye_ = cyl(pb, V(.2, .25, .2), cornerR);\n                            F eye_ = tube(pb+V(0,.25-cornerR*2.,0),V(.4-cornerR*2.,.45,0));\n                            block = eye_;\n                            if(eye_ < EPS) {\n                                eye = 1;\n                            }\n                        }\n                \n                        // block = L(pb)-2.;\n                        if(block < res) {\n                            res = block;\n                        }\n                        if(res < EPS)\n                            colIds = cs[i];\n                            break;\n                    }\n                    →res;\n                }\n                \n                V norm(V p) {\n                    // p+=.5;\n                    // →normalize(fract(p));\n                    v e = v(.01, 0.);\n                    →N(V(dist(p + e.xyy) - dist(p - e.xyy), dist(p + e.yxy) - dist(p - e.yxy), dist(p + e.yyx) - dist(p - e.yyx)));\n                }\n\n                float sdfVoxel(vec3 p){\n                    p.xz += fract(float(${c/2}));  // ODD\n                    // p.xz = p.zx;\n                    p.x = abs(p.x);\n                    p.zx -= fract(float(${c/2})); // ODD\n                    // p.x += ${c}.-1.;\n                    // p.z += ${c}.;\n                    p.x += 5.;\n                    p.z += 5.;\n                    p = floor(p+vec3(0,0,.0));\n                    // p.x -= .5;\n                    // p.z -= .5;\n                    vec3 boundingBox = vec3(10,1000 / 10,10);\n                    if(fract(p/boundingBox) != p/boundingBox) return 1.;\n                    vec2 vox, texSize = vec2(boundingBox.x, boundingBox.y*boundingBox.z);\n                    vox.x = p.x;\n                    vox.y = p.z + p.y * 10.; // FIXME\n                    vec2 voxN = (vox+.5) / texSize;\n                    blockId = int(texture2D(tex3d, voxN).r * 64.);\n                    // if(blockId == 2) discard;\n                    return -float(blockId); // is full\n                }\n\n                void main() {\n                    ${G}\n                    V o = V(0);\n                    v uv, uvI = (gl_FragCoord.xy * 2. - rs)/rs;\n        \n                    for(F A = 0.; A < 8.; A++){\n                        if(A >= aa) break;\n                        gl = 0.;\n                        F d = 0., e = 1e9, ep, j; // here highp\n        \n                        F fl = floor(A/2.);\n                        F fr = mod(A,2.);\n                        v pos = v(fr/2.,fl/4.)-.5;\n                        if(mod(fl, 2.)==0.) pos.x += .25; //https://bit.ly/30g2DXs\n        \n                        v uv = uvI;\n    \n                        uv += pos * 2. / rs;\n        \n                        V n, p, ro = V(uv * F(${v[6]}) +\n                        // V n, p, ro = V(uv * 4. * F(${v[6]}) + // FIXME remore * 4.\n                            v(${v[7]},\n                            ${v[8]}), -camDist),\n                           rd = V(0, 0, .9 + .1 * fract(1e3 * sin(1e3 * fract(L(uv)))));\n                        bool outline = false;\n\n                        // RAYMARCH\n\n                        // TODO ro, rd\n\n                        // MY LEGO VERSION\n                        // for(F i = 0.; i < 1e2; i++) {\n                        //     j = i;\n                        //     p = d * rd + ro;\n                        //     p.z -= camDist;\n                        //     p.yz *= rot(${w});\n                        //     p.xz *= rot(${l}); // FIXME не каждый шаг реймарша вычислять этот угол, предварительно RD повернуть и всё\n\n                        //     d += e = dist(p);\n                        //     if(ep < e && e < .01) {\n                        //         outline = true;\n                        //         break;\n                        //     }\n                        //     ep = e;\n                        //     if(e < EPS || e > camDist*2.)\n                        //         break;\n                        // }\n\n                        // vec3 ro = vec3(0,0,-10);\n                        // vec3 rd = vec3(0,0,-10);\n                        ro.yz *= rot(${w});\n                        rd.yz *= rot(${w});\n                        ro.xz *= rot(${l});\n                        rd.xz *= rot(${l});\n                        float ii = 0.;\n                        for(float i = 0.; i < 200.; i++) {\n                            ii++;\n                            p = ro + rd * d;\n                            p.xz -= fract(float(${c/2})); // ODD\n                            vec3 dp = (step(0., rd) - fract(p)) / rd;\n                            float dpmin;\n                \n                            dpmin = min(min(dp.x,dp.y),dp.z) + 1e-4;\n                \n                            bool breaker = false;\n                            if(sdfVoxel(p) < 0.) {\n                                float ddd = 0.;\n                                for(float backupI = 0.; backupI < 200.; backupI++) {\n                                    ii++;\n                                    p = ro + rd * (d + ddd);\n                                    ddd += e = dist(p);\n                                    // if(e < .001 || ++i > 200.) { // FIXME restore this i++ condition\n                                    if(e < .001 || ii > 200.) { // налетели на сферу\n                                        // if(id > 0.)\n                                        //     col *= color(id);\n                                            // col *= n+.5;\n                                        // if(s > 1.)\n                                            // col *= .6;\n                                        breaker = true;\n                                        break;\n                                    }\n                                    if(ddd > dpmin) { // улетели в соседнюю клетку\n                                        break;\n                                    }\n                                }\n                            }\n                            if(breaker == true || ii > 100.)\n                                break;\n                \n                            d += dpmin;\n                        }\n\n                        V c;\n                        if(!outline) {\n                            V col1, col2;\n                            for(int j = 0; j < 5; j++) {\n                                if(colIds[0] == j)\n                                    col1 = pt[j];\n                                if(colIds[1] == j)\n                                    col2 = pt[j];\n                            }\n                    \n                            V col = col1;\n                    \n                            // Texturing\n                            //\n                            // layers\n                            if(colIds.z == 1)\n                                if(sin(p.y * PI * 3.) > 0.)\n                                    col = col2;\n                            if(colIds.z == 2)\n                                if(sin((p.x + fract(ps[0].x - ss[0].x / 2.)) * PI * 2. * 1.5) > 0.)\n                                    col = col2;\n                                    \n                            // pride\n                            if(${x[3]} == 3)\n                                col = sin((L(p) / max(F(${c}), F(${x[8]})) * 2. - V(0, .3, .6)) * 6.28) * .5 + .5;\n                            \n                            if(eye == 1) {\n                                col = V(0);\n                                V pe = p + fract(${c}. / 2.);\n                                pe = fract(pe) - .5;\n                                col += step(.3, L(pe.xz));\n                                col += step(-.1, -L(pe.xz + .1));\n                            }\n                                    \n                            if(colIds.z == -1) {\n                                // // фончик\n                                c = texture2D(tex3d,gl_FragCoord.xy / rs).rgb;\n                                \n                                // c = V(${Y})/255.;\n                                // if(L(c) > .4){\n                                //     c *= S(5., 0., L(uv + v(${x[6]}, -1)));\n                                // }\n                                // // c = V(1,0,1);\n                                // if(${x[3]} == 3){\n                                //     c = V(.2);\n                                // }\n                                // if(sin(L(pow(abs(uv), v(${x[5]}))) * 32.) > 0.)\n                                //     c *= .95;\n                            } else {\n                                c = V(1,0,1);\n                                // shading\n                                c = (min(1.5, 14. / j) * .2 + .8) * (dot(norm(p), N(V(0, 1, 1))) * .2 + .8) * col;\n                                \n                                // glare\n                                c += pow(abs(dot(norm(p), N(V(0., 3., 1.)))), 40.);\n                            }\n                            // gazya\n                            if(${x[3]} == 4)\n                                c = (V(7. / j));\n                            }\n                        // n = norm(p);\n                        // c = n;\n                        // // texture debug\n                        // c.g = fract(gl_FragCoord.y / rs * 11.);\n                        // c.g *= pow(fract(gl_FragCoord.y / rs * 1000.),8.);// * fract(gl_FragCoord.x / rs * 10.);\n                        // c.g += step(0.001,texture2D(tex3d, gl_FragCoord.xy / rs).r) * 8.;\n                        // c *= 30./ii;\n                        o += c;\n                    }\n                    gl_FragColor = vec4(o/aa,1);\n                }`.replace(/@/g,"\n#define ").replace(/→/g,"return "),vert:"attribute vec2 g;void main(){gl_Position=vec4(g,0,1);}",attributes:{g:[[1,1],[1,-4],[-4,1]]},uniforms:{rs:W.prop("r"),pt:a.map(n=>n/255),aa:W.prop("a"),tex3d:Q},scissor:{enable:!0,box:{x:W.prop("x"),y:W.prop("y"),width:W.prop("t"),height:W.prop("t")}},depth:{enable:!1},count:3}),nn=1+(H/V|0),en=0,on=new Date,rn=1,tn=1;M&&(tn=Number(M));let ln=1;V=256,Z({r:H,x:0,y:0,t:H,a:8});'tx shvembldr piter stranger'