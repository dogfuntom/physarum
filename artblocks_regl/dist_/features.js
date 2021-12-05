/*begin features*/
function calculateFeatures(tokenData) {
    /*end features*/ 
    
    
    // if (window.location.hash) {
    //     tokenData.hash = window.location.hash.slice(1)
    // }
    // arr = arr.slice(0, 10)
    // tokenData.hash = `0x61b6634474b4bd9cc3f1ffc4fe5c69992c93f463591ee37e4501608dad5a8f86`
    console.log(tokenData.hash)
    // console.clear();
    let S, ss, R, t, RL, SH
    // if (window.location.hash) {
    //     tokenData.hash = window.location.hash.slice(1)
    // }
    let M = Math
    
    /*begin features*/
    let min = M.min
    let max = M.max
    let floor = M.floor
    let abs = M.abs
    /*end features*/
    
    
    let rotArray = m => m[0].map((x, i) => m.slice().reverse().map(y => y[i]))
    
    const typeBlock = 0, typeBeak2x2 = 3, typeBeak2x2Flipped = 4,
        typeArc = 5, typePillar = 6, typeEye = 7
    const maxMaxTry = 30
    let u_camAngYZ = .95532, u_camAngXZ, numberOfBlockTypes
    // let gs, blocksNumber, fitnessFunctionNumber, maxTry, extra
    let s, b, canvas
    let u_palette
    let gs, blocksNumber, fitnessFunctionNumber, maxTry, extra
    let features
    let blocksHeightMap, disallowedHeightMap;
    let blocks
    let vertices
    let u_tick
    let viewBox
    // new
    let renderSize;
    let pixDensInit
    let splits;
    let maxDelay = 40;
    let adaptFrames = 10;
    let size, gSize, ts, cols;
        

    
    let init = () => {
        // console.log(tokenData.hash)
        S = Uint32Array.from([0, 1, ss = t = 2, 3].map(i => parseInt(tokenData.hash.substr(i * 8 + 2, 8), 16))); R = _ => (t = S[3], S[3] = S[2], S[2] = S[1], S[1] = ss = S[0], t ^= t << 11, S[0] ^= (t ^ t >>> 8) ^ (ss >>> 19), S[0] / 2 ** 32); 'tx piter'
        RL = (ar, p) => ar[ar.length * R() ** (p || 1) | 0]
        // SH = (a) => {
        //     for (let i = a.length - 1; i > 0; i--) {
        //       let j = Math.floor(R() * (i + 1));
        //       [a[i], a[j]] = [a[j], a[i]];
        //     }
        //     return a
        //   }
        SH = (ar) => ar.map(a=>[a,R()]).sort((a,b)=>a[1]-b[1]).map(a=>a[0])
        // SH = (ar) => {let br=[.Array(ar.length)].map(x=>)}
        // SH = (ar) => ar.reduce((sum,el,i,ar)=>{let r=Math.floor(R() * (i + 1));sum.push()})

    
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
    
        // palette = 'dddddd888888555555222222aaaaaaf26b21fbb04099ca3c208b3afcec529b5de5f15bb500bbf900f5d4fee440f1faeea8dadc457b9d1d3557e6394650514ff25f5c247ba070c1b3ffe066541388d90368f1e9da2e294effd4001f20414b3f72119da419647effc857540d6eee4266f3fcf01f271bffd23fe4572e29335ca8c686669bbcf3a712'
            // .match(/(.{30})/g).map(d=>d.match(/(.{6})/g))[features.Palette]
        u_palette = 'dddddd888888555555222222aaaaaaf26b21fbb04099ca3c208b3afcec529b5de5f15bb500bbf900f5d4fee440f1faeea8dadc457b9d1d3557e6394650514ff25f5c247ba070c1b3ffe066541388d90368f1e9da2e294effd4001f20414b3f72119da419647effc857540d6eee4266f3fcf01f271bffd23fe4572e29335ca8c686669bbcf3a712'
            .slice(30*features.Palette, 30*(features.Palette+1)).match(/(.{2})/g).map(v=>Number("0x"+v)/255)
            // console.assert(palette, palette2)
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
        blocksHeightMap = [...Array(gs)]
            .map(() => Array(gs).fill(0))
        // запретная карта высот. Ну, как запретная. Просто нельзя ставить деталь ножкой на
        // на клетку, если карта высот в этой клетке меньше карты запрета.
        disallowedHeightMap = [...Array(gs)]
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
                bvt.color = R() * 4 + 1 | 0
                bvt.color2 = R() * 4 + 1 | 0
                if (features.ColorScheme == 2) bvt.color = bvt.color2 = 1
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
    
                    /*begin features*/
                    features.BlocksNumber++
                    if (bv.type == typeEye) features.Eyes++
                    if (bv.type == typePillar) features.Aerials++
                    if (bv.pos[0] > 0) {
                        features.BlocksNumber++
                        if (bv.type == typeEye) features.Eyes++
                        if (bv.type == typePillar) features.Aerials++
                    }
                    /*end features*/
    
    
                }// else console.log('bv.pos.y is NaN')
            }// else console.log('bv not defined')
        }
        // console.log('N BLOCKS', blocks.length, '\n==============================')
        // console.log(blocks)
    
        /*begin features*/
        features.Height = M.max(...disallowedHeightMap.flat())
        /*end features*/
    
    }
    
    
    
    
    
    
        init()
    
        placeBlocks()

        // console.log(blocks)
    
        
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
        /*begin features*/
    
        // console.log(s)
        // console.log(features)
    
        features.BackgroundLight = { '1': 'Left', '0': 'Center', '-1': 'Right' }[features.BackgroundLight]
        if (features.ColorScheme == 4/*gaz*/ || features.ColorScheme == 3/*ranibow*/) features.BackgroundLight = 0
        features.BackgroundType = { '1': 'Circle', '2': 'Squircle' }[features.BackgroundType]
        features.Studs = { '0': 'Convex', '1': 'Concave' }[features.Studs]
        if (features.ColorScheme == 4/*gaz*/) features.BackgroundType = 'Empty'
        features.Palette = { '0': 'Black and white', '1': 'Summer', '2': 'Colorful', '3': 'Magenta blue', '4': 'Plastic', '5': 'Winter', '6': 'Spring', '7': 'Vivid', '8': 'Eighth' }[features.Palette]
        if (features.ColorScheme == 4/*gaz*/) features.Palette = 'Gaz'
        if (features.ColorScheme == 3/*rainbow*/) features.Palette = 'Rainbow'
        features.Layout = { '0': 'Cage', '1': 'Mushroom', '2': 'Tiny', '3': 'Compact', '4': 'Random' }[features.Layout]
        features.Symmetry = { '0': 'Z', '1': 'X' }[features.Symmetry]
        features.ColorScheme = { '0': 'Textured', '1': 'Not textured', '2': 'Monochrome', '3': 'Rainbow', '4': 'Gaz' }[features.ColorScheme]
    
        // console.log(features)
        return features
        /*end features*/


        let canvas_ = document.createElement('canvas')
        const gl = canvas_.getContext('webgl', {
            // antialias: true,
            preserveDrawingBuffer: true,
            // failIfMajorPerformanceCaveat: true,
          });
        document.body.appendChild(canvas_)
        canvas_.style.background=`rgb(${u_palette.slice(0,3).map(v=>v*255)})`
        if(features.ColorScheme == 4 || features.ColorScheme == 3) canvas_.style.background = '#333'
        let size_ = Math.min(window.innerWidth, window.innerHeight)*window.devicePixelRatio
        canvas_.style.width = size_/window.devicePixelRatio + 'px'
        canvas_.style.height = size_/window.devicePixelRatio + 'px'
        canvas_.width = size_
        canvas_.height = size_
        // ts=size_/(Math.ceil(size_/128/2)*2+1)
        let tsTarget = 16
        var regl = createREGL(gl)
        // console.log(regl)
        // console.log('regl')
        
        // console.log(uniforms)

        
        // document.querySelector('div.debug').innerHTML = `
        // gl.failIfMajorPerformanceCaveat: ${gl.failIfMajorPerformanceCaveat}<br>
        // `


        const drawTriangle = regl({
            frag: `precision highp float;
            #define BLOCKS_NUMBER_MAX 60
            #define PI 3.1415
            #define S smoothstep
            #define V vec3
            #define v vec2
            float rnd(float x) {return fract(54321.987 * sin(987.12345 * mod(x,12.34567)));}
            mat2 rot(float a) {return mat2(cos(a),-sin(a),sin(a),cos(a));}
            #define STEPS 4e2
            #define EPS .001
            float sabs(float p) {return sqrt(abs(p)*abs(p)+5e-5);}
            float smax(float a, float b) {return (a+b+sabs(a-b))*.5;}
            
            // vec3 z_positions[BLOCKS_NUMBER_MAX];
            vec3 positions[BLOCKS_NUMBER_MAX];
            // vec3 z_sizes[BLOCKS_NUMBER_MAX];
            vec3 sizes[BLOCKS_NUMBER_MAX];
            // vec2 z_roty[BLOCKS_NUMBER_MAX];
            vec2 roty[BLOCKS_NUMBER_MAX];
            // ivec3 z_colors[BLOCKS_NUMBER_MAX];
            ivec3 colors[BLOCKS_NUMBER_MAX];
            
            uniform V z_palette[20];
            uniform float z_aa;
            uniform float z_res;
            uniform vec4 z_vb;
    
            ivec3 colIds;
            float gl;
            float camDist = 1e2;
            // v u_res = v(${width}, ${height})*${pixelDensity() + 1e-6};
            
            float cyl(V p, V s, float cornerR) {
                // s.x — height
                // s.y — thickness
                // s.x — radius
                p.y -= clamp(p.y, -s.x, s.x);
                float len = length(p.xz) - s.z;
                len -= clamp(len, -s.y, s.y);
                float cyl = length(v(len, p.y)) - cornerR;
                return cyl;
            }
            
            int eye;
            
            float dist(V p) {
                colIds = ivec3(0, 0, -1);
                p.x = abs(p.x);
                float res = p.y + 1.; // floor plane
                for(int i = 0; i < BLOCKS_NUMBER_MAX; i++) {
                    eye = 0;
                    if(i >= ${blocks.length})
                        break;
                    V pb = p;
                    pb -= positions[i];
                    pb.xz *= rot(roty[i].x * PI / 2.);
            
                    // box
                    float cornerR = .01;
                    float gap = .008;
                    float block;
        
                    // if(roty[i].y == 0. || roty[i].y == 3. || roty[i].y == 4. || roty[i].y == 5. || roty[i].y == 6.) {
                    V s = sizes[i] - 2. * (cornerR + gap);
                    block = length(pb - clamp(pb, -(s)/2., (s)/2.)) - cornerR * 1.4;
                    // }
            
                    if(roty[i].y == 5.) { // arc
                        float cyl = length(pb.zy) - .5;
                        float box = max(abs(pb.z) - .5, abs(pb.y + sizes[i].y / 2.) - 1.);
                        float hole = min(cyl, box);
                        block = max(block, -hole);
                    }
            
                    if(roty[i].y == 6.) { // pillar
                        float cyl_ = length(pb.zx) - .15;
                        float sph = cyl(pb + V(0, sizes[i].y - .5, 0) / 2., V(.2, .25, .2), cornerR);
                        block = max(block, min(cyl_, sph));
                    }
            
                    // studs
                    if(roty[i].y != 6.) { // not pillar
                        V ps = pb;
                        v l = sizes[i].xz;
                        ps.xz += (l - 1.) / 2.;
                        ps.xz = ps.xz - clamp(floor(ps.xz + .5), v(0.), l - 1.);
                        float h = .24;
                        ps.y -= sizes[i].y / 2. + .02;
                        ps.y -= clamp(ps.y, EPS, h);
                        vec2 po = vec2(length(ps.xz), ps.y);
                        po.x -= clamp(po.x, mix(EPS,.18,${features.Studs}.), .28);
                        float stud = length(po)-EPS;
                        block = min(stud, block);
                    }
            
                    if(pb.z<0.15 && (roty[i].y == 3. || roty[i].y == 4.)) { // beak
                        block = smax(block, (-pb.z*.8-(roty[i].y == 3. ? -1. : 1.)*pb.y-.5)/1.4142);
                    }
            
            
                    if(roty[i].y == 7.) { // eye
                        float eye_ = cyl(pb, V(.2, .25, .2), cornerR);
                        block = eye_;
                        if(eye_ < EPS) {
                            eye = 1;
                        }
                    }
            
                    if(block < res) {
                        res = block;
                        colIds = colors[i];
                    }
                    if(res < EPS)
                        break;
                }
                return res;
            }
            
            V norm(V p) {
                v e = v(.01, 0.);
                return normalize(V(dist(p + e.xyy) - dist(p - e.xyy), dist(p + e.yxy) - dist(p - e.yxy), dist(p + e.yyx) - dist(p - e.yyx)));
            }
            void main() {
                // V o = V(0);
                // ${uniforms}
                // vec2 uv, uvI = (gl_FragCoord.xy * 2. - z_res)/z_res;
    
                // for(float A = 0.; A < 8.; A++){
                //     if(A >= z_aa) break;
                //     gl = 0.;
                //     float d = 0., e = 1e9, ep, j;
    
                //     float fl = floor(A/2.);
                //     float fr = mod(A,2.);
                //     vec2 pos = vec2(fr/2.,fl/4.)-.5;
                //     if(mod(fl, 2.)==0.) pos.x += .25; //https://bit.ly/30g2DXs
    
                //     // pos *= 0.;
            
                //     // float z_tick = mod(f,8.);
                //     // float fl = floor(z_tick/2.);
                //     // float fr = mod(z_tick,2.);
                //     // vec2 pos = vec2(fr/2.,fract(fl/2.));
                //     // if(floor(fl/2.)==1.) pos += .25;
            
                //     // float fl = floor(z_tick/4.);
                //     // float fr = mod(z_tick,4.);
                //     // vec2 pos = vec2(fr/4.,fl/8.);
                //     // if(mod(fl, 2.)==0.) pos.x += 1./8.; // https://bit.ly/3qFnhLs
    
                //     vec2 uv = uvI;

                //     pos*=0.; // FIXME

                //     uv += pos * 2. / z_res;
                //     // uv /= z_res/z_res_render;
                //     // uv -= 1.;
                //     // uv /= 2.;
                //     uv = uv * .5 + .5;
                //     uv *= z_vb.zw;
                //     uv += z_vb.xy;
                //     uv = uv * 2. - 1.;
    
                //     V p, ro = V(uv * float(${viewBox.scale}) + 
                //     v(${viewBox.offset.x},
                //     ${viewBox.offset.y}), -camDist), 
                //     rd = V(0, 0, .9 + .1 * rnd(length(uv)));
                //     bool outline = false;
                //     for(float i = 0.; i < STEPS; i++) {
                //         j = i;
                //         p = d * rd + ro;
                //         p.z -= camDist;
                //         p.yz *= rot(${u_camAngYZ});
                //         p.xz *= rot(${u_camAngXZ});
                //         d += e = dist(p);
                //         if(ep < e && e < .01) {
                //             // gl_FragColor = vec4(0);
                //             outline = true;
                //             break;
                //         }
                //         ep = e;
                //         if(e < EPS || e > camDist*2.)
                //             break;
                //     }
                //     V c;
                //     if(!outline) {
                //         V col1, col2;
                //         for(int j = 0; j < 20; j++) {
                //             if(colIds[0] == j)
                //                 col1 = z_palette[j];
                //             if(colIds[1] == j)
                //                 col2 = z_palette[j];
                //         }
                
                //         V col = col1;
                
                //         // Texturing
                //         //
                //         // layers
                //         if(colIds.z == 1)
                //             if(sin(p.y * PI * 3.) > 0.)
                //                 col = col2;
                //         if(colIds.z == 2)
                //             if(sin((p.x + fract(positions[0].x - sizes[0].x / 2.)) * PI * 2. * 1.5) > 0.)
                //                 col = col2;
                                
                //         // pride
                //         if(${features.ColorScheme} == 3)
                //             col = sin(length(p) / max(float(${gs}), float(${features.Height})) * 6.28 * 2. - V(0, PI * 2. / 3., PI * 4. / 3.)) * .5 + .5;
                        
                //         if(eye == 1) {
                //             col = V(0);
                //             V pe = p + fract(${gs}. / 2.);
                //             pe = fract(pe) - .5;
                //             col += step(.3, length(pe.xz));
                //             col += step(-.1, -length(pe.xz + .1));
                //         }
                                
                //         if(colIds.z == -1) {
                //             c = z_palette[0];
                //             if(length(c) > .4){
                //                 c *= smoothstep(5., 0., length(uv + v(${features.BackgroundLight}, -1)));
                //             }
                //             // c = V(1,0,1);
                //             if(${features.ColorScheme} == 3){
                //                 c = V(.2);
                //             }
                //             if(sin(length(pow(abs(uv), v(${features.BackgroundType}))) * 32.) > 0.)
                //                 c *= .95;
                //         } else {
                //             c = V(1,0,1);
                //             // shading
                //             c = (min(1.5, 14. / j) * .2 + .8) * (dot(norm(p), normalize(V(0, 1, 1))) * .2 + .8) * col;
                            
                //             // glare
                //             c += pow(abs(dot(norm(p), normalize(V(0., 3., 1.)))), 40.);
                //             // c.r = 1.;
                //         }
                //     }
                    
                //     // gazya
                //     if(${features.ColorScheme} == 4)
                //         c = (V(10. / j));
                
                //     // gl_FragColor = vec4(o*rnd(${u_tick}), 1);
                //     // gl_FragColor=vec4(uv,0,1);
                //     // gl_FragColor = vec4(o, 1);
                //     // gl_FragColor = mix(texture2D(z_backbuffer, uv * v(1, -1) * .5 + .5), vec4(o, 1), 1. / (z_tick + 1.));
                //     // o += step(.5,fract(length(uv)*4.));
                //     o += c;
                // }
                // gl_FragColor = vec4(o/z_aa,1);
                gl_FragColor = vec4(vec3(mod(gl_FragCoord.x/8.+gl_FragCoord.y/8.,2.)),1);
            }`,
          
            vert: `attribute vec2 position;void main() {gl_Position = vec4(position, 0, 1);}`,
          
            attributes: {
              position: [[-1, -1], [-1, 1], [1, -1], [-1, 1], [1, -1], [1, 1]]
            },
        
            uniforms: {
                z_res: regl.prop('res'),
                z_palette: u_palette,
                z_aa: 8,//regl.prop('aa'),
                z_vb: [0,0,1,1],
            },
            // scissor: {
            //     enable: true,
            //     box: {
            //       x: regl.prop('x'),
            //       y: regl.prop('y'),
            //       width: regl.prop('ts_'),
            //       height: regl.prop('ts_')
            //     }
            // },
            count: 6
          })
        
          let rows = (size_ / ts | 0) + 1
          let tick = 0;

          function* spiral() {
            let [x,y,d,m] = [0,0,1,1];
            while (1) {
              while (2 * x * d < m) yield [x, y], x += d
              while (2 * y * d < m) yield [x, y], y += d
              d=-d,m++
            }
          }
          let it = spiral()
          
        //   function frame(){
        //         let [x, y] = it.next().value;
        //     //   drawTriangle({res: size_, x: (tick%rows) * ts, y: (tick/rows|0)*ts})
        //       drawTriangle({res: size_, x: size_/2 - ts/2 + ts * x, y: size_/2 - ts/2 - ts * y})
        //       if(++tick < cols**2)requestAnimationFrame(frame)
        //       console.log(tick)
        //   }
        //   frame()

        drawTriangle({res: size_, x: size_/2-tsTarget/2, y: size_/2-tsTarget/2, ts_:tsTarget, aa: 8})

        t = +new Date()
        let resFound = false
        let aa = 8
        let fr = regl.frame(function (context) {
          console.log('tsTarget',tsTarget)
          cols = (size_/tsTarget/2|0)*2+3
          ts=size_/cols
          for(let i=0;i++<1;){
            let [x, y] = it.next().value;
            // drawTriangle({res: size_, x: size_/2 - ts/2 + ts * x, y: size_/2 - ts/2 - ts * y, ts_:ts, aa: aa})
            drawTriangle({res: size_, x: 0, y: 0, ts_:size_, aa: aa})
          tick++
        }
        //   if(!resFound) {tsTarget *= 1.05, it = spiral(), tick=0}
            tsTarget=8

            // if(++tick > cols**2)
            fr.cancel()
            // if(!resFound && (new Date() - t > 100 || tsTarget > size_) ) {resFound = true;/* if(tsTarget < 64) {aa=1, tsTarget*=2}*/}
            console.log(new Date() - t)
            t = +new Date()
          })
        

    }
    


    
    
    
    
    
