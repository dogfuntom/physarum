
    
    
    // if (window.location.hash) {
    //     tokenData.hash = window.location.hash.slice(1)
    // }
    // arr = arr.slice(0, 10)
    tokenData.hash = `0x5448e7f563c7a1405bec2e245b63c3ac3a1a6cd57242a3efc0bc54bf0941db5a`
    console.log(tokenData.hash)
    // console.clear();
    let S, ss, R, t, RL, SH
    // if (window.location.hash) {
    //     tokenData.hash = window.location.hash.slice(1)
    // }
    let M = Math
    
    
    
    
    let rotArray = m => m[0].map((x, i) => m.slice().reverse().map(y => y[i]))
    
    const typeBlock = 0, typeBeak2x2 = 3, typeBeak2x2Flipped = 4,
        typeArc = 5, typePillar = 6, typeEye = 7
    const maxMaxTry = 30
    let u_camAngYZ = .95532, u_camAngXZ
    // let gs, blocksNumber, fitnessFunctionNumber, maxTry, extra
    let s, b, canvas
    let u_palette
    let gs, blocksNumber, fitnessFunctionNumber, maxTry, extra
    let features
    let blocksHeightMap, disallowedHeightMap;
    let blocks
    let vertices
    let palette
    let u_tick
    let viewBox
    // new
    let renderSize;
    let splits;
    let maxDelay = 40;
    let adaptFrames = 4;
    let size, gSize;
        

    
    let init = () => {
        // console.log(tokenData.hash)
        S = Uint32Array.from([0, 1, ss = t = 2, 3].map(i => parseInt(tokenData.hash.substr(i * 8 + 2, 8), 16))); R = _ => (t = S[3], S[3] = S[2], S[2] = S[1], S[1] = ss = S[0], t ^= t << 11, S[0] ^= (t ^ t >>> 8) ^ (ss >>> 19), S[0] / 2 ** 32); 'tx piter'
        RL = (ar, p) => ar[ar.length * R() ** (p || 1) | 0]
        SH = (ar) => { return ar.sort(() => R() - 0.5) }
    
        vertices = []
    
        /// ↓↓↓↓↓ should be changed if hash changes
    
        u_tick = 1e-6 // so not to turn into int
        features = {
            Symmetry: R() ** 4. * 2 | 0,
            Studs: R() ** 8 * 2 | 0,
            Palette: 0,
            // 0 — textured, 1 — not textured, 2 - all blocks of the same color, 3 — raibow, 4 — gazya
            ColorScheme: (1 - R() ** .3) * 5 | 0,
            Layout: 0,
            Height: 0,
            Eyes: 0,
            Aerials: 0,
            BlocksNumber: 0,
            BackgroundType: RL([2, 1], .5),
            BackgroundLight: (R() * 3 | 0) - 1,
        }
        // console.log('BackgroundLight', features.BackgroundLight)
    
        u_camAngXZ = ((features.Symmetry) - .5) * 3.1415 / 2 - 3.1415
    
        let presets = [
            {
                gs: 8 + R() * 2 | 0,
                blocksNumber: 30,
                fitnessFunctionNumber: 5, // cage
                maxTry: 8,
                extra: 0,
            },
            {
                gs: 8 + R() * 2 | 0,
                blocksNumber: 30,
                fitnessFunctionNumber: 3, // shroom
                maxTry: 8,
                extra: R() ** 4 * 8,
            },
            { // cutie
                gs: 4,
                blocksNumber: 3 + R() * 4 | 0,
                fitnessFunctionNumber: 0,
                maxTry: 1,
                extra: 1,
            },
            {
                gs: 6 + R() * 4 | 0,
                blocksNumber: 10 + R() * 20 | 0,
                fitnessFunctionNumber: 2, // low
                maxTry: 6,
                extra: R() * 2,
            },
            {
                gs: 6 + (R() | 0),
                blocksNumber: 10 + R() * 10 | 0,
                fitnessFunctionNumber: 0, // random
                maxTry: 4,
                extra: R() ** 2 * 3,
            },
        ];
    
        features.Layout = R() ** .3 * presets.length | 0;
    
        ({ gs, blocksNumber, fitnessFunctionNumber, maxTry, extra } = presets[features.Layout])
        numberOfBlockTypes = 2 + R() * 2 | 0
    
        blocks = [];
        features.Palette = R() ** .5 * 8 | 0
        // palette = [
        //     ["#dddddd", "#888888", "#555555", "#222222", "#aaaaaa"],
        //     ["#f26b21", "#fbb040",, "#99ca3c", "#208b3a", "#fcec52"],
        //     //["#f26b21", "#f78e31", "#fbb040", "#cbdb47", "#99ca3c", "#208b3a", "#fcec52"], // green orange
        //     ["#9b5de5", "#f15bb5", "#00bbf9", "#00f5d4", "#fee440"], // colorful
        //     ["#f1faee", "#a8dadc", "#457b9d", "#1d3557", "#e63946"], // magenta blue
        //     ["#50514f", "#f25f5c", "#247ba0", "#70c1b3", "#ffe066"], // lego
        //     ["#541388", "#d90368", "#f1e9da", "#2e294e", "#ffd400"],
        //     ["#1f2041", "#4b3f72", "#119da4", "#19647e", "#ffc857"],
        //     ["#540d6e", "#ee4266", "#f3fcf0", "#1f271b", "#ffd23f"],
        //     ["#e4572e", "#29335c", "#a8c686", "#669bbc", "#f3a712"],
        // ][features.Palette]
    
        palette = 'dddddd888888555555222222aaaaaaf26b21fbb04099ca3c208b3afcec529b5de5f15bb500bbf900f5d4fee440f1faeea8dadc457b9d1d3557e6394650514ff25f5c247ba070c1b3ffe066541388d90368f1e9da2e294effd4001f20414b3f72119da419647effc857540d6eee4266f3fcf01f271bffd23fe4572e29335ca8c686669bbcf3a712'
            .match(/(.{30})/g).map(d=>d.match(/(.{6})/g).map(v=>'#'+v))[features.Palette]
    
        let badColor = palette.pop()
        palette = SH(palette)
        palette.push(badColor)
        if (features.ColorScheme == 2) palette = palette.slice(0, 2)
    }
    
    
    function placeBlocks() {
        let blocksVariants = SH([
            { // beak
                size: [2, 1, 2],
                maskTop: [[0, 1], [0, 1]],
                type: typeBeak2x2,
            },
            { // beak flipped
                size: [2, 1, 2],
                maskBottom: [[0, 1], [0, 1]],
                type: typeBeak2x2Flipped,
            },
            { // 4x2
                size: [2, 1, 4],
                type: typeBlock,
            },
            { // 3x2
                size: [2, 1, 3],
                type: typeBlock,
            },
            { // 6x1
                size: [1, 1, 6],
                type: typeBlock,
            },
            { // arc
                size: [1, 2, 3],
                maskBottom: [[1, 0, 1]],
                type: typeArc,
            },
            { // line
                size: [1, 1, 3],
                type: typeBlock,
            },
            { // block
                size: [2, 1, 2],
                type: typeBlock,
            },
            { // 1x1
                size: [1, 1, 1],
                type: typeBlock,
            },
            { // 1x1 but high
                size: [1, 2, 1],
                type: typeBlock,
            },
    
        ].filter(d => d.size[2] < gs)).slice(0, numberOfBlockTypes)
    
        let blocksVariantsExtra = SH([
            { // Pillar
                size: [1, 4, 1],
                maskTop: [[0]],
                type: typePillar,
            },
            { // eye
                size: [1, .5, 1],
                maskTop: [[0]],
                type: typeEye,
            },
        ])
    
        // карта высот. В тех местах, где заплетная клетка, уходит в минус бесконечность. Чтобы точно было меньше, чем в запретной карте высот
        // обратим внимание, что икс снаружи, потом зет. Обычно наоборот, если что.
        blocksHeightMap = Array(gs)
            .fill()
            .map(() => Array(gs).fill(0))
        // запретная карта высот. Ну, как запретная. Просто нельзя ставить деталь ножкой на
        // на клетку, если карта высот в этой клетке меньше карты запрета.
        disallowedHeightMap = Array(gs)
            .fill()
            .map(() => Array(gs).fill(0))
    
        for (let n = 0; n < blocksNumber; n++) {
            let maxHeight = 0
            let fitness, maxFitness = -9e9
            let bv
            let bvt
            let isExtra = false
            let bvtInitial = RL(blocksVariants)
            if (n >= blocksNumber - extra && features.ColorScheme != 4)
                bvtInitial = RL(blocksVariantsExtra, .7), fitnessFunctionNumber = 6, maxTry = 6, isExtra = true
            // Цикл обслуживает фитнес. Бросаем деталь М раз и выбираем оптимальный,
            // тот, что лучше подходит под критерий.
            // Открытый вопрос, что делать, если ничего не подошло. Варианты:
            // - добиться редкости случаев, когда пазл не сложился.
            //   И в этом случае тупо всё сначала начинать с новым сидом.
            // - сперва кидать самые большие детали, чтобы не вышло, что я положил один штырь, и никто не может к нему прицепиться
            // - засчитывать только те попытки, когда деталь не нарушает правил. Иначе упрёмся в безысходный максимум.
    
            for (let try_ = 0; try_ < maxTry; try_++) {
                bvt = JSON.parse(JSON.stringify(bvtInitial))
                bvt.color = R() * (palette.length - 1 | 0) + 1
                bvt.color2 = R() * (palette.length - 1 | 0) + 1
                bvt.texture = R() * 4 | 0
                if (features.ColorScheme == 1) bvt.texture = 0
                // попался! bvt у нас сохранялся между выполнениями и портился от запуска к запуску.
                // надо или его копию делать, или ещё чего.
    
                // есть ли смысл тут сделать глубокую копию? Есть. И всё в ней хранить.
                bvt.symX = true
                bvt.rot = R() * 4 | 0 // (blockSizeTry.x%2==0 && blockSizeTry.z%2==0)?floor(R(4)):floor(R(2))*2
                if (bvt.type == typeEye) bvt.rot = 0
                let makeMask = () => Array(9).fill(Array(9).fill(1))
                bvt.maskBottom = bvt.maskBottom || makeMask()
                bvt.maskTop = bvt.maskTop || makeMask()
                // Поворачиваем весь blockVariantTry на 90° несколько раз.
                // Далее ротейт будет использоваться только для передачи в юниформ.
                bvt.span = [...bvt.size]
                for (let i = 0; i < bvt.rot; i++) {
                    // flipping sizes
                    // тут косяк. До этого мы деталь не крутили, только размеры подгоняли.
                    // теперь надо крутить, но размеры оставлять тут правильными. А вот координаты углов можно 
                    // ставить с учётом повотора.
                    bvt.span.reverse()
                    //rotating matrices
                    bvt.maskBottom = rotArray(bvt.maskBottom)
                    bvt.maskTop = rotArray(bvt.maskTop)
                    bvt.symX = !bvt.symX
                }
                // интерраптинг, иф не влезло
                if (bvt.span[0] > gs / 2) {
                    // console.log(bvt.span[0], 'is longer than ', gs)
                    if (maxTry < maxMaxTry) maxTry++; continue // можно макс макс трай убрать, если макс трай не очень мелкий
                }
                ///////////////////////////////////////////////////////////////////////////////////////////
                ///////////////////////////////////////////////////////////////////////////////////////////
                ///////////////////////////////////////////////////////////////////////////////////////////
                if (gs % 2 == 0)
                    bvt.pos = [
                        bvt.span[0] / 2 + (R() * (gs / 2 + 1 - bvt.span[0]) | 0),
                        0,
                        - gs / 2 + bvt.span[2] / 2 + (R() * (gs + 1 - bvt.span[2]) | 0),
                    ]
                else {
                    bvt.pos = [
                        bvt.span[0] / 2 + (R() * ((gs - 1) / 2 + 1 - bvt.span[0]) | 0) + .5,
                        0,
                        // - (gs - 1) / 2 + bvt.span[2] / 2 + (R() * (gs - 1 + 1 + 1 - bvt.span[2]) | 0) + .5-1,
                        - gs / 2 + bvt.span[2] / 2 + (R() * (gs + 1 - bvt.span[2]) | 0),
                    ]
                }
                if (bvt.span[0] % 2 == gs % 2 && R() < 1 / (gs - bvt.span[0]))
                    if (bvt.span[0] % 2 || bvt.symX) // если чётное число пупырок, надо чтобы ось симетрии совпадала
                        bvt.pos[0] = 0
                // тут можно циклы выкинуть
                let studL = 0
                let studR = 0
                let xx = [...Array(bvt.span[0])].map((d, i) => bvt.pos[0] + i - (bvt.span[0] - 1.) / 2)
                let zz = [...Array(bvt.span[2])].map((d, i) => bvt.pos[2] + i - (bvt.span[2] - 1.) / 2)
                for (let x of xx) {
                    for (let z of zz) {
                        if (x >= 0) studR++;
                        else studL++;
                    }
                }
    
                // if (
                //     // блок про симметрию симметрии
                //     (
                //         (studL == 0) || // деталь не попала на ось симметрии
                //         (studR == studL && bvt.symX)
                //     )
                //     //  && // стоит ровно посередине, ось симметрии совпадает
                //     // bvt.span[0] <= gs &&
                //     // bvt.span[2] <= gs
                // ) { }
                // else {
                //     if(maxTry<maxMaxTry)maxTry++;
                //     continue
                // }
    
    
                let maxHeightTry = 0;
                let maxHeightTryLikeWithoutBottomHoles = 0;
                let maxDisallowedHeightTry = 0;
                let bi = 0
                for (let z of zz) {
                    for (let x of xx) {
                        let bx = bi % bvt.span[0]
                        let bz = floor(bi / bvt.span[0])
                        bi++
                        maxHeightTryLikeWithoutBottomHoles = max(maxHeightTryLikeWithoutBottomHoles, blocksHeightMap[x + gs / 2 - .5][z + gs / 2 - .5]);
                        maxDisallowedHeightTry = max(maxDisallowedHeightTry, disallowedHeightMap[x + gs / 2 - .5][z + gs / 2 - .5]);
                        if (bvt.maskBottom[bx][bz] == 1) { // если посчитать только те, что с 1 внизу, высота не должна отличаться от той, что считается для всех клеток
                            maxHeightTry = max(maxHeightTry, blocksHeightMap[x + gs / 2 - .5][z + gs / 2 - .5]);
                        }
                    }
                }
                if (maxHeightTry < maxDisallowedHeightTry) {
                    if (maxTry < maxMaxTry) maxTry++; continue;
                }
                if (maxHeightTry > maxHeightTryLikeWithoutBottomHoles) {
                    if (maxTry < maxMaxTry) maxTry++; continue;
                }
                // TODO possible endless lop here!
    
    
                let fitnessFunctions = [
                    0, // any
                    -M.hypot(bvt.pos[0], bvt.pos[2]), // high, bn 16 gs 10
                    -maxHeightTry, // low
                    -M.hypot(bvt.pos[0], maxHeightTry - 10, bvt.pos[2]), // mashroom
                    -abs(M.hypot(bvt.pos[0], maxHeightTry - 10, bvt.pos[2]) - gs), // cage
                    -abs(M.hypot(bvt.pos[0], maxHeightTry * 2, bvt.pos[2]) - gs), // cage: blocksNum = 90, gs = 16
                    maxHeightTry * 2. + bvt.pos[2], // eyes
                ]
                fitness = fitnessFunctions[fitnessFunctionNumber]
    
                if (fitness > maxFitness || try_ == 0) {
                    maxFitness = fitness // maxfitness не нужен, если  || try_==0
                    maxHeight = maxHeightTry
                    bv = bvt
                }
            }
            if (bv) {
                bv.pos[1] = maxHeight + bv.size[1] / 2;
                if (bv.pos[1]) {
                    if (isExtra && bv.pos[1] - bv.span[1] / 2 == 0) {
                        // console.log('extra on the floor!'); 
                        continue
                    } // eyes on the froor are prohibited
                    let xx = Array(bv.span[0]).fill().map((d, i) => bv.pos[0] + i - (bv.span[0] - 1.) / 2)
                    let zz = Array(bv.span[2]).fill().map((d, i) => bv.pos[2] + i - (bv.span[2] - 1.) / 2)
                    let bi = 0
                    for (let z of zz) {
                        for (let x of xx) {
                            let bx = bi % bv.span[0]
                            let bz = floor(bi / bv.span[0])
                            bi++
                            blocksHeightMap[x + gs / 2 - .5][z + gs / 2 - .5] = maxHeight + bv.size[1]
                            if (bv.maskTop[bx][bz] == 0) blocksHeightMap[x + gs / 2 - .5][z + gs / 2 - .5] = -99
                            disallowedHeightMap[x + gs / 2 - .5][z + gs / 2 - .5] = maxHeight + bv.size[1]
                        }
                    }
                    blocks.push(bv)
    
                    // push vertices
                    for (let i = 0; i++ < 8;) {
                        let s = [0, 0, 0].map((_, j) => ((i >> j) & 1) - .5) // permutations, 3 items of {.5, -.5} set
                        vertices.push([
                            s[0] * (bv.span[0] + 2 * bv.pos[0]), // pos shouldn't be divided by 2, compensating
                            s[1] * bv.span[1] + bv.pos[1],
                            s[2] * bv.span[2] + bv.pos[2]
                        ])
                    }
    
                    
    
    
                }// else console.log('bv.pos.y is NaN')
            }// else console.log('bv not defined')
        }
        // console.log('N BLOCKS', blocks.length, '\n==============================')
        // console.log(blocks)
    
        
    
    }
    
    /*begin render*/
    let findViewBox = () => {
        viewBox = { top: -1e9, bottom: 1e9, left: 1e9, right: -1e9 }
        let rot = (x, y, a) => [x * cos(a) - y * sin(a), x * sin(a) + y * cos(a)]
        vertices.forEach(v => {
            let [x, y, z] = v;
            [x, z] = rot(x, z, -u_camAngXZ);
            [y, z] = rot(y, z, -u_camAngYZ)
            viewBox.left = min(x, viewBox.left)
            viewBox.right = max(x, viewBox.right)
            viewBox.bottom = min(y, viewBox.bottom)
            viewBox.top = max(y, viewBox.top)
        })
        viewBox.width = viewBox.right - viewBox.left
        viewBox.height = viewBox.top - viewBox.bottom
        viewBox.scale = max(viewBox.width / 1.8, viewBox.height / 1.8, 1)
        viewBox.offset = { x: viewBox.left + viewBox.width / 2, y: viewBox.bottom + viewBox.height / 2 }
    }
    /*end render*/
    
    
    /*begin render*/
    // let size = [100, 100]

    let density
    function setup() {
        density = displayDensity()
        // density = 1
        // pixelDensity(density)

        size = min(windowHeight, windowWidth)
        let canvas = createCanvas(size, size)
        canvas.style("image-rendering", "pixelated");
        gSize = min(size, 1024)
        b = createGraphics(gSize, gSize, WEBGL)
        b.pixelDensity(1)
        console.log('windowHeight', windowHeight)
        console.log('windowWidth', windowWidth)
        console.log('density', density)
        console.log('size', size)
        console.log('gSize', gSize)
        console.log('')
        b.fill(0);
      
        // tokenData.hash=arr.pop().hash
        // Below part needs changing if hash changes
        // pixelDensity(1)
        
        
        /*end render*/
    
        init()
    
    
        placeBlocks()
    
        /*begin render*/
        findViewBox()
    
        u_palette = palette.map(c => color(c).levels.slice(0, 3)).flat().map(d => d / 255)
        u_colors = blocks.map(b => [b.color, b.color2, b.texture]).flat()
    
    
        // console.log(blocks.map(b=>b.type))
        // console.log(blocks.filter(b=>b.type==7))
    
        let uniforms = ``
        uniforms += blocks.map((b, i) =>
            `positions[${i}]=vec3(${b.pos[0]},${b.pos[1]},${b.pos[2]});`).join('')
        uniforms += blocks.map((b, i) =>
            `sizes[${i}]=vec3(${b.size[0]},${b.size[1]},${b.size[2]});`).join('')
        uniforms += blocks.map((b, i) =>
            `colors[${i}]=ivec3(${b.color},${b.color2},${b.texture});`).join('')
        uniforms += blocks.map((b, i) =>
            `roty[${i}]=vec2(${b.rot},${b.type});`).join('')
        // console.log(uniforms)
    
    
        // s = b.createShader(`attribute vec3 aPosition;varying vec2 uv;void main(){uv=(gl_Position=vec4(aPosition,1.)*2.-1.).xy;}`,
        s = b.createShader(`precision highp float;attribute vec3 aPosition;void main() { gl_Position = vec4(aPosition,1.0);}`,
        `precision highp float;
#define A 60
#define B 3.1415
#define C smoothstep
#define D vec3
#define E vec2
float F(float G){return fract(54321.987*sin(987.12345*mod(G,12.34567)));}mat2 H(float I){return mat2(cos(I),-sin(I),sin(I),cos(I));}
#define J 4e2
#define K .001
float L(float M){return sqrt(abs(M)*abs(M)+5e-5);}float N(float I,float O){return(I+O+L(I-O))*.5;}vec3 positions[A];vec3 sizes[A];vec2 roty[A];ivec3 colors[A];uniform D palette[20];uniform sampler2D backbuffer;uniform float tick;uniform float res;uniform float res_render;uniform vec4 vb;uniform float k;ivec3 P;float Q;float R=1e2;float S(D M,D T,float U){M.y-=clamp(M.y,-T.x,T.x);float V=length(M.xz)-T.z;V-=clamp(V,-T.y,T.y);float S=length(E(V,M.y))-U;return S;}int W;float X(D M){P=ivec3(0,0,-1);M.x=abs(M.x);float Y=M.y+1.;for(int Z=0;Z<A;Z++){W=0;if(Z>=${blocks.length})break;D a=M;a-=positions[Z];a.xz*=H(roty[Z].x*B/2.);float U=.01;float b=.008;float c;D T=sizes[Z]-2.*(U+b);c=length(a-clamp(a,-(T)/2.,(T)/2.))-U*1.4;if(roty[Z].y==5.){float S=length(a.zy)-.5;float d=max(abs(a.z)-.5,abs(a.y+sizes[Z].y/2.)-1.);float e=min(S,d);c=max(c,-e);}if(roty[Z].y==6.){float f=length(a.zx)-.15;float g=S(a+D(0,sizes[Z].y-.5,0)/2.,D(.2,.25,.2),U);c=max(c,min(f,g));}if(roty[Z].y!=6.){D h=a;E i=sizes[Z].xz;h.xz+=(i-1.)/2.;h.xz=h.xz-clamp(floor(h.xz+.5),E(0.),i-1.);float j=.24;h.y-=sizes[Z].y/2.;h.y-=clamp(h.y,K,j);vec2 k=vec2(length(h.xz),h.y);k.x-=clamp(k.x,mix(K,.18,${features.Studs}.),.28);float l=length(k)-K;c=min(l,c);}if(a.z<0.15&&(roty[Z].y==3.||roty[Z].y==4.)){c=N(c,(-a.z*.8-(roty[Z].y==3.?-1.:1.)*a.y-.5)/1.4142);}if(roty[Z].y==7.){float m=S(a,D(.2,.25,.2),U);c=m;if(m<K){W=1;}}if(c<Y){Y=c;P=colors[Z];}if(Y<K)break;}return Y;}D n(D M){E o=E(.01,0.);return normalize(D(X(M+o.xyy)-X(M-o.xyy),X(M+o.yxy)-X(M-o.yxy),X(M+o.yyx)-X(M-o.yyx)));}void main(){gl_FragColor*=0.;${uniforms}for(float p=0.;p<8.;p++){Q=0.;float q=0.,o=1e9,r,s;float t=floor(p/2.);float u=mod(p,2.);vec2 v=vec2(u/2.,t/4.);if(mod(t,2.)==0.)v.x+=.25;vec2 w=(gl_FragCoord.xy*2.-res)/res_render;w+=v/res;w=w*.5+.5;w*=vb.zw;w+=vb.xy;w=w*2.-1.;D M,x=D(w*float(${viewBox.scale})+E(${viewBox.offset.x},${viewBox.offset.y}),-R),y=D(0,0,.9+.1*F(length(w))),z;bool AA=false;for(float Z=0.;Z<J;Z++){s=Z;M=q*y+x;M.z-=R;M.yz*=H(${u_camAngYZ});M.xz*=H(${u_camAngXZ});q+=o=X(M);if(r<o&&o<.01){AA=true;break;}r=o;if(o<K||o>R*2.)break;}if(!AA){D AB,AC;for(int s=0;s<20;s++){if(P[0]==s)AB=palette[s];if(P[1]==s)AC=palette[s];}D AD=AB;if(P.z==1)if(sin(M.y*B*3.)>0.)AD=AC;if(P.z==2)if(sin((M.x+fract(positions[0].x-sizes[0].x/2.))*B*2.*1.5)>0.)AD=AC;if(${features.ColorScheme}==3)AD=sin(length(M)/max(float(${gs}),float(${features.Height}))*6.28*2.-D(0,B*2./3.,B*4./3.))*.5+.5;if(W==1){AD=D(0);D AE=M+fract(${gs}./2.);AE=fract(AE)-.5;AD+=step(.3,length(AE.xz));AD+=step(-.1,-length(AE.xz+.1));}if(P.z==-1){z=palette[0];if(length(z)>.4)z*=smoothstep(5.,0.,length(w+E(${features.BackgroundLight},-1)));if(${features.ColorScheme}==3)z=D(.2);if(sin(length(pow(abs(w),E(${features.BackgroundType})))*32.)>0.)z*=.95;}else{z=(min(1.5,14./s)*.2+.8)*(dot(n(M),normalize(D(0,1,1)))*.2+.8)*AD;z+=pow(abs(dot(n(M),normalize(D(0.,3.,1.)))),40.);}}if(${features.ColorScheme}==4)z=(D(10./s));gl_FragColor+=vec4(z,1)/8.;}}`)
        b.shader(s);
        s.setUniform('palette', u_palette)
        // s.setUniform("size", size * 2);
        b.background(palette[0])

        /*end render*/
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
        
    }
    
    
    
    
    
    
    /*begin render*/
    // FIXME
    let timeStart = +new Date()


    // function draw() {
    //     console.log('u_tick', u_tick)
    //     if (++u_tick > 8.5) {
    //         // preloader.remove()
    //         noLoop()
    //         // save(`${tokenData.hash}.png`)
    //         // let gl = canvas.getContext('webgl')
    //         // gl.getExtension('WEBGL_lose_context').loseContext()
    //         // gl = b.getContext('webgl')
    //         // document.querySelector('canvas').getContext('webgl').getExtension('WEBGL_lose_context').loseContext()
    //         // setTimeout(setup, 500)
    //         console.log('time', new Date() - timeStart)
    //     }
    //     window.document.title = 50-u_tick > 0 ? floor(50-u_tick) : '👾'
    // }

    let tPrev = +new Date();
    let state = "adapt";
    let delayPrev, delay = 0
    





    function draw() {
        // size — width and height of canvas
        // renderSize — running window
        // gSize — size of a texture
        // tileSize — unit of viewport 0…1
      if (state == "adapt") {
        // adapt
        let t = +new Date();
        let delayPrev = delay;
        delay = t - tPrev;
        tPrev = t;
    
        // adapt
        renderSize = 64 * pow(2, floor(u_tick / adaptFrames));
    
        // adapt
        if (renderSize > gSize || u_tick > adaptFrames && delay + delayPrev > maxDelay * 2 ) {
          state = "render";
          u_tick = 0;
          renderSize /= 2;
          console.log('renderSize',renderSize,'size',size)
            // noLoop()
            // background('red')
          return;
        }
    
        // adapt
        s.setUniform("vb", [0, 0, 1, 1]);
        // s.setUniform("k", (renderSize / gSize) * density);
        // s.setUniform('res', renderSize * density)
        s.setUniform('res', gSize)
        s.setUniform('res_render', renderSize)
        let qs = renderSize / gSize;
        b.quad(-qs, -qs, qs, -qs, qs, qs, -qs, qs);

        // pixelDensity(renderSize / gSize * density * 2)
        image(
          b,
          0,
          0,
          size,
          size,
          gSize / 2 - renderSize / 2,
          gSize / 2 - renderSize / 2,
          renderSize,
          renderSize
        );
        // noLoop()
      } else {
        // frameRate(1)
        // pixelDensity(density)
        splits = size / renderSize;
        // splits = ceil(size / renderSize);
        let i = (u_tick % ceil(splits)) / splits;
        let j = floor(u_tick / ceil(splits)) / splits;
        if (j >= 1) {
          noLoop();
          return;
        }
        let tileSize = 1 / splits;
        console.log('')
        console.log('tileSize', tileSize, 'splits', splits)
        console.log('b.width', b.width)
        let viewbox = [i, j, tileSize, tileSize];
        console.log('viewbox', viewbox)
        s.setUniform("vb", viewbox);
        // s.setUniform("k", tileSize * density);
        s.setUniform('res', gSize)
        console.log('density', density)
        s.setUniform('res_render', gSize * tileSize * density)
        // b.save(`${u_tick}.png`)
        let qs = renderSize/gSize * density * 1.01;
        b.quad(-qs, -qs, qs, -qs, qs, qs, -qs, qs);
        image(
          b,
          size * i,
          size * (1 - j - tileSize),
          size * tileSize,
          size * tileSize,
          gSize / 2 - (gSize * tileSize * density) / 2,
          gSize / 2 - (gSize * tileSize * density) / 2,
          gSize * tileSize * density,
          gSize * tileSize * density
        );
        console.log(          
            'target region',
            size * i,
            size * (1 - j - tileSize),
            size * tileSize,
            size * tileSize
        )
        console.log(          
            'source region',
            gSize / 2 - (gSize * tileSize) / 2,
            gSize / 2 - (gSize * tileSize) / 2,
            gSize * tileSize,
            gSize * tileSize
        )         
      }
      u_tick++;
    //   if(u_tick > 13)noLoop()
    }
    
    
    /*end render*/
