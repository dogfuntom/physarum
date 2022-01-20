// tokenData.hash = '0x343c93c4b2ea21427bfd11a12d48183bc2879a5aad606b0a95dcfdaf07'
// tokenData.hash = '0x343c21427bfd11a12d48183bc2879a5aad606b0a95dcfdaf07'

// tokenData.hash = '0x0c91417602b6e1469a56fc5ff264310cc6b57490079a3a164ecc723c79143a09' // не совпадают ножка арки и кубик под ней
// tokenData.hash = '0xc961a81a3949a7b3ef6ab19a5882509a755c2606d895025389b2a41399d8c14a'
// tokenData.hash = '0xb578aeb4b58e39423c9ff40fde67c2d416082d6fc09aedd5c5a5ecf5db25e1a6' // антенка заберает шаги и пипке не достаётся
// tokenData.hash = '0x5f38546190c55b50d86e95c8652a2d5a42bb0241f6d4fb54fd90ab82f930d81e'
// 0xab19d56b9b3b8d9ce69981b78f771458a258aa2000179624e6a0f2c20edb9cdd // текстура глаз проглядывает
// tokenData.hash = '0x2c141bd75924077b9359e2f3c64277193a39a16f3f8cd52ecc867432e58bf140' // wrong
// tokenData.hash = '23a4ff2ffdf4fa2f3343434234234' // good

// 

// if (window.location.hash) {
//     tokenData.hash = window.location.hash.slice(1)
// } // FIXME

/*begin features*/
function calculateFeatures(tokenData) {
    /*end features*/ 
        
    
        console.log(tokenData.hash)
        let S, ss, R, t, RL, SH
        let M = Math
        let A = Array
        let min = M.min
        let max = M.max
        let floor = M.floor
        let abs = M.abs
        let cos = M.cos
        let sin = M.sin
        
        
        /*begin render*/
        let D = devicePixelRatio
        // let div = document.createElement('div') // FIXME
        // div.classList.add('debug'),div.style.width = '100%',div.style.height = '100px' // FIXME
        // document.body.appendChild(div) //FIXME
        let params_aa = location.href.split('#')[1];
        /*end render*/

        let rotArray = m => m[0].map((x, i) => m.slice().reverse().map(y => y[i]))
        let typeBlock = 0, typeBeak2x2 = 3, typeBeak2x2Flipped = 4,
            typeArc = 5, typePillar = 6, typeEye = 7
        let maxMaxTry = 30
        let u_camAngYZ = .95532, u_camAngXZ, numberOfBlockTypes
        // let gs, blocksNumber, fitnessFunctionNumber, maxTry, extra
        let u_palette
        let gs, blocksNumber, fitnessFunctionNumber, maxTry, extra
        let features
        let blocksHeightMap, disallowedHeightMap;
        let blocks
        let vertices
        let viewBox
        let palette_bg
        // let tex3dArray = [...Array(300)].map(()=>[...Array(10)].map(()=>[...Array(1)].map(()=>Math.random()*255)))
        // let tex3dArray = [...Array(1000.)].map(()=>[...Array(10)].map(()=>[...Array(1)].map(()=>Math.random()*255)))
        let tex3dArray = [...Array(1000.)].map(()=>[...Array(10)].map(_=>[0,0,0]))
        // console.log(tex3dArray)

        // new
        let size, ts;
            
        let init = () => {
            // console.log(tokenData.hash)
            // S = new Uint32Array([0, 1, ss = t = 2, 3].map(i => parseInt(tokenData.hash.substr(i * 8 + 2, 8), 16))); R = _ => (t = S[3], S[3] = S[2], S[2] = S[1], S[1] = ss = S[0], t ^= t << 11, S[0] ^= t ^ t >>> 8 ^ ss >>> 19, S[0] / 2 ** 32); 'tx piter'
            S = new Uint32Array([4, 1, ss = t = 2, 3].map(i => parseInt(tokenData.hash.substr(i * 8, 8), 16))); R = _ => (t = S[3], S[3] = S[2], S[2] = S[1], S[1] = ss = S[0], t ^= t << 11, S[0] ^= t ^ t >>> 8 ^ ss >>> 19, S[0] / 2 ** 32); 'tx piter'
            RL = (ar, p) => ar[ar.length * R() ** (p || 1) | 0]
            SH = (ar) => ar.map(a=>[a,R()]).sort((a,b)=>a[1]-b[1]).map(a=>a[0])
            
            vertices = []
        
            /// ↓↓↓↓↓ should be changed if hash changes
        
            u_tick = 1e-6 // so not to turn into int
            // features = {
            //0     Symmetry: R() ** 4. * 2 | 0,
            //1     Studs: R() ** 8 * 2 | 0,
            //2     Palette: 0,
            //     // 0 — textured, 1 — not textured, 2 - all blocks of the same color, 3 — raibow, 4 — gazya
            //3     ColorScheme: (1 - R() ** .3) * 4 | 0,
            //4     Layout: 0,
            //5     BackgroundType: RL([2, 1], .5),
            //6     BackgroundLight: (R() * 3 | 0) - 1,
            //7     BlocksNumber: 0,
            //8     Height: 0,
            //9    Eyes: 0,
            //10    Aerials: 0,
            // }
            features = [
                R() ** 4. * 2 | 0,
                R() ** 8 * 2 | 0,
                0,
                // (1 - R() ** .3) * 5 | 0,
                M.sqrt(1-(R()-1)**2) * presets.length | 0
                0,
                RL([2, 1], .5),
                (R() * 3 | 0) - 1,
                0,
                0,
                0,
                0,
            ]
        
            u_camAngXZ = ((features[0]) - .5) * M.PI / 2 - M.PI

            //0 gs: 8 + R() * 2 | 0,
            //1 blocksNumber: 30,
            //2 fitnessFunctionNumber: 5, // cage
            //3 maxTry: 8,
            //4 extra: 0,

            let presets = [
                [
                    8 + R() * 2 | 0,
                    30,
                    5, // cage
                    8,
                    0,
                ],
                // RL([
                [ // cutie
                    4,
                    3 + R() * 4 | 0,
                    0,
                    1,
                    1,
                ],
                [
                    8 + R() * 2 | 0,
                    30,
                    3, // shroom
                    8,
                    R() ** 4 * 8,
                ],
                [
                    6 + R() * 4 | 0,
                    10 + R() * 20 | 0,
                    2, // low
                    6,
                    R() * 2,
                ],
                [
                    6 + (R() | 0),
                    10 + R() * 10 | 0,
                    0, // random
                    4,
                    R() ** 2 * 3,
                ],
            ];
        
            // features[4] = R() ** .4 * presets.length | 0;
            features[4] = M.sqrt(1-(R()-1)**2) * presets.length | 0;
          
            ([ gs, blocksNumber, fitnessFunctionNumber, maxTry, extra ] = presets[features[4]])
            // console.log('presets[features[4]',presets[features[4]])
            numberOfBlockTypes = 2 + R() * 2 | 0
        
            blocks = [];
            features[2] = R() ** .5 * 8 | 0
            // palette = 'dddddd888888555555222222aaaaaaf26b21fbb04099ca3c208b3afcec529b5de5f15bb500bbf900f5d4fee440f1faeea8dadc457b9d1d3557e6394650514ff25f5c247ba070c1b3ffe066541388d90368f1e9da2e294effd4001f20414b3f72119da419647effc857540d6eee4266f3fcf01f271bffd23fe4572e29335ca8c686669bbcf3a712'
                // .match(/(.{30})/g).map(d=>d.match(/(.{6})/g))[features[2]]
            u_palette = 'dddddd888888555555222222aaaaaaf26b21fbb04099ca3c208b3afcec529b5de5f15bb500bbf900f5d4fee440f1faeea8dadc457b9d1d3557e6394650514ff25f5c247ba070c1b3ffe066541388d90368f1e9da2e294effd4001f20414b3f72119da419647effc857540d6eee4266f3fcf01f271bffd23fe4572e29335ca8c686669bbcf3a712'
                .substr(30*features[2], 30).match(/(.{2})/g).map(v=>Number("0x"+v))
            palette_bg = R()*4|0
            // console.log('features[2]',features[2])
        }
        
        //0 size
        //1 maskTop
        //2 maskBottom
        //3 type

        let placeBlocks = () => {
            let blocksVariants = SH([
                [ // beak
                    [2, 1, 2],
                    [[0, 1], [0, 1]],
                    0,
                    typeBeak2x2,
                ],
                [ // beak flipped
                    [2, 1, 2],
                    0,
                    [[0, 1], [0, 1]],
                    typeBeak2x2Flipped,
                ],
                [ // 4x2
                    [2, 1, 4],
                    0,
                    0,
                    typeBlock,
                ],
                [ // 3x2
                    [2, 1, 3],
                    0,
                    0,
                    typeBlock,
                ],
                [ // 6x1
                    [1, 1, 6],
                    0,
                    0,
                    typeBlock,
                ],
                [ // arc
                    [1, 2, 3],
                    0,
                    [[1, 0, 1]],
                    typeArc,
                ],
                [ // line
                    [1, 1, 3],
                    0,
                    0,
                    typeBlock,
                ],
                [ // block
                    [2, 1, 2],
                    0,
                    0,
                    typeBlock,
                ],
                [ // 1x1
                    [1, 1, 1],
                    0,
                    0,
                    typeBlock,
                ],
                [ // 1x1 but high
                    [1, 2, 1],
                    0,
                    0,
                    typeBlock,
                ],
        
            ].filter(d => d[0][2] < gs)).slice(0, numberOfBlockTypes)
        
            let blocksVariantsExtra = SH([
                [ // Pillar
                    [1, 4, 1],
                    [[0]],
                    0,
                    typePillar,
                ],
                [ // eye
                    [1, .5, 1],
                    [[0]],
                    0,
                    typeEye,
                ],
            ])
        
            // карта высот. В тех местах, где заплетная клетка, уходит в минус бесконечность. Чтобы точно было меньше, чем в запретной карте высот
            // обратим внимание, что икс снаружи, потом зет. Обычно наоборот, если что.
            blocksHeightMap = [...A(gs)]
                .map(() => A(gs).fill(0))
            // запретная карта высот. Ну, как запретная. Просто нельзя ставить деталь ножкой на
            // на клетку, если карта высот в этой клетке меньше карты запрета.
            disallowedHeightMap = [...A(gs)]
                .map(() => A(gs).fill(0))
        
            for (let n = 0; n < blocksNumber; n++) {
                let maxHeight = 0
                let fitness, maxFitness = -9e9
                let bv
                let bvt
                let isExtra = 0
                let bvtInitial = RL(blocksVariants)
                if (n >= blocksNumber - extra)
                    bvtInitial = RL(blocksVariantsExtra, .7), fitnessFunctionNumber = 6, maxTry = 6, isExtra = 1
                // Цикл обслуживает фитнес. Бросаем деталь М раз и выбираем оптимальный,
                // тот, что лучше подходит под критерий.
                // Открытый вопрос, что делать, если ничего не подошло. Варианты:
                // - добиться редкости случаев, когда пазл не сложился.
                //   И в этом случае тупо всё сначала начинать с новым сидом.
                // - сперва кидать самые большие детали, чтобы не вышло, что я положил один штырь, и никто не может к нему прицепиться
                // - засчитывать только те попытки, когда деталь не нарушает правил. Иначе упрёмся в безысходный максимум.
        
                //4 color
                //5 color2
                //6 texture
                //7 symX
                //8 rot
                //9 span
                //10 pos

                for (let try_ = 0; try_ < maxTry; try_++) {
                    bvt = JSON.parse(JSON.stringify(bvtInitial))

                    bvt[4] = R() * 4 + 1 | 0
                    bvt[5] = R() * 4 + 1 | 0
                    if (features[3] == 2) bvt[4] = bvt[5] = 1
                    bvt[6] = R() * 4 | 0
                    if (features[3] == 1) bvt[6] = 0
                    // попался! bvt у нас сохранялся между выполнениями и портился от запуска к запуску.
                    // надо или его копию делать, или ещё чего.
        
                    // есть ли смысл тут сделать глубокую копию? Есть. И всё в ней хранить.
                    bvt[7] = 1
                    bvt[8] = R() * 4 | 0 // (blockSizeTry.x%2==0 && blockSizeTry.z%2==0)?floor(R(4)):floor(R(2))*2
                    if (bvt[3] == typeEye) bvt[8] = 0
                    let makeMask = () => A(9).fill(A(9).fill(1))
                    bvt[2] = bvt[2] || makeMask()
                    bvt[1] = bvt[1] || makeMask()
                    // Поворачиваем весь blockVariantTry на 90° несколько раз.
                    // Далее ротейт будет использоваться только для передачи в юниформ.
                    bvt[9] = [...bvt[0]]
                    for (let i = 0; i < bvt[8]; i++) {
                        // flipping sizes
                        // тут косяк. До этого мы деталь не крутили, только размеры подгоняли.
                        // теперь надо крутить, но размеры оставлять тут правильными. А вот координаты углов можно 
                        // ставить с учётом повотора.
                        bvt[9].reverse()
                        //rotating matrices
                        bvt[2] = rotArray(bvt[2])
                        bvt[1] = rotArray(bvt[1])
                        bvt[7] = !bvt[7]
                    }
                    // интерраптинг, иф не влезло
                    if (bvt[9][0] > gs / 2) {
                        // console.log(bvt[9][0], 'is longer than ', gs)
                        if (maxTry < maxMaxTry) maxTry++; continue // можно макс макс трай убрать, если макс трай не очень мелкий
                    }
                    ///////////////////////////////////////////////////////////////////////////////////////////
                    ///////////////////////////////////////////////////////////////////////////////////////////
                    ///////////////////////////////////////////////////////////////////////////////////////////
                    if (gs % 2 == 0)
                        bvt[10] = [
                            bvt[9][0] / 2 + (R() * (gs / 2 + 1 - bvt[9][0]) | 0),
                            0,
                            - gs / 2 + bvt[9][2] / 2 + (R() * (gs + 1 - bvt[9][2]) | 0),
                        ]
                    else {
                        bvt[10] = [
                            bvt[9][0] / 2 + (R() * ((gs - 1) / 2 + 1 - bvt[9][0]) | 0) + .5,
                            0,
                            // - (gs - 1) / 2 + bvt[9][2] / 2 + (R() * (gs - 1 + 1 + 1 - bvt[9][2]) | 0) + .5-1,
                            - gs / 2 + bvt[9][2] / 2 + (R() * (gs + 1 - bvt[9][2]) | 0),
                        ]
                    }
                    if (bvt[9][0] % 2 == gs % 2 && R() < 1 / (gs - bvt[9][0]))
                        if (bvt[9][0] % 2 || bvt[7]) // если чётное число пупырок, надо чтобы ось симетрии совпадала
                            bvt[10][0] = 0
                    // тут можно циклы выкинуть
                    let studL = 0
                    let studR = 0
                    let xx = [...A(bvt[9][0])].map((d, i) => bvt[10][0] + i - (bvt[9][0] - 1.) / 2)
                    let zz = [...A(bvt[9][2])].map((d, i) => bvt[10][2] + i - (bvt[9][2] - 1.) / 2)
                    for (let x of xx) {
                        for (let z of zz) {
                            if (x >= 0) studR++;
                            else studL++;
                        }
                    }
        
                    let maxHeightTry = 0;
                    let maxHeightTryLikeWithoutBottomHoles = 0;
                    let maxDisallowedHeightTry = 0;
                    let bi = 0
                    for (let z of zz) {
                        for (let x of xx) {
                            let bx = bi % bvt[9][0]
                            let bz = floor(bi / bvt[9][0])
                            bi++
                            maxHeightTryLikeWithoutBottomHoles = max(maxHeightTryLikeWithoutBottomHoles, blocksHeightMap[x + gs / 2 - .5][z + gs / 2 - .5]);
                            maxDisallowedHeightTry = max(maxDisallowedHeightTry, disallowedHeightMap[x + gs / 2 - .5][z + gs / 2 - .5]);
                            if (bvt[2][bx][bz] == 1) { // если посчитать только те, что с 1 внизу, высота не должна отличаться от той, что считается для всех клеток
                                maxHeightTry = max(maxHeightTry, blocksHeightMap[x + gs / 2 - .5][z + gs / 2 - .5]);
                            }
                        }
                    }
                    if (maxHeightTry < maxDisallowedHeightTry || maxHeightTry > maxHeightTryLikeWithoutBottomHoles) {
                        if (maxTry < maxMaxTry) maxTry++; continue;
                    }
                    // TODO possible endless lop here!
        
        
                    let fitnessFunctions = [
                        0, // any
                        -M.hypot(bvt[10][0], bvt[10][2]), // high, bn 16 gs 10
                        -maxHeightTry, // low
                        -M.hypot(bvt[10][0], maxHeightTry - 10, bvt[10][2]), // mashroom
                        -abs(M.hypot(bvt[10][0], maxHeightTry - 10, bvt[10][2]) - gs), // cage
                        -abs(M.hypot(bvt[10][0], maxHeightTry * 2, bvt[10][2]) - gs), // cage: blocksNum = 90, gs = 16
                        maxHeightTry * 2. + bvt[10][2], // eyes
                    ]
                    fitness = fitnessFunctions[fitnessFunctionNumber]
        
                    if (fitness > maxFitness || try_ == 0) {
                        maxFitness = fitness // maxfitness не нужен, если  || try_==0
                        maxHeight = maxHeightTry
                        bv = bvt
                    }
                }
                if (bv) {
                    bv[10][1] = maxHeight + bv[0][1] / 2;
                    if (bv[10][1]) {
                        if (isExtra && bv[10][1] - bv[9][1] / 2 == 0) {
                            // console.log('extra on the floor!'); 
                            continue
                        } // eyes on the froor are prohibited
                        let xx = A(bv[9][0]).fill().map((d, i) => bv[10][0] + i - (bv[9][0] - 1.) / 2)
                        let zz = A(bv[9][2]).fill().map((d, i) => bv[10][2] + i - (bv[9][2] - 1.) / 2)
                        let bi = 0
                        for (let z of zz) {
                            for (let x of xx) {
                                let bx = bi % bv[9][0]
                                let bz = floor(bi / bv[9][0])
                                bi++
                                blocksHeightMap[x + gs / 2 - .5][z + gs / 2 - .5] = maxHeight + bv[0][1]
                                if (bv[1][bx][bz] == 0) blocksHeightMap[x + gs / 2 - .5][z + gs / 2 - .5] = -99
                                disallowedHeightMap[x + gs / 2 - .5][z + gs / 2 - .5] = maxHeight + bv[0][1]
                            }
                        }
                        blocks.push(bv)
                        // console.log(bv)

                        for(let xx=0; xx<bv[9][0]; xx++)
                        for(let yy=0; yy<bv[9][1]; yy++)
                        for(let zz=0; zz<bv[9][2]; zz++){
                            let xxx = (bv[10][0]-bv[9][0]/2) + xx  + 5 | 0
                            let yyy = (bv[10][1]-bv[9][1]/2) + yy | 0
                            let zzz = (bv[10][2]-bv[9][2]/2) + zz + 5 | 0
                            // console.log('xxx, yyy, zzz', xxx, yyy, zzz)
                            tex3dArray[zzz + 10 * yyy][xxx][0] = 
                            tex3dArray[zzz + 10 * yyy + 10][xxx][1] = 
                            255 * (blocks.length+1) / 64
                        }
                        // console.log(tex3dArray)
                        // for(let xx = 0; xx<2; xx++)
                        // for(let zz = 0; zz<2; zz++)
                        // for(let yy = 0; yy<2; yy++)
                        // tex3dArray[zz + 10 * yy][xx] = [255]
                        
        
                        // push vertices
                        for (let i = 0; i++ < 8;) {
                            let s = [0, 0, 0].map((_, j) => ((i >> j) & 1) - .5) // permutations, 3 items of {.5, -.5} set
                            vertices.push([
                                s[0] * (bv[9][0] + 2 * bv[10][0]), // pos shouldn't be divided by 2, compensating
                                s[1] * bv[9][1] + bv[10][1],
                                s[2] * bv[9][2] + bv[10][2]
                            ])
                        }
        
                        /*begin features*/
                        features[7]++
                        if (bv[3] == typeEye) features[9]++
                        if (bv[3] == typePillar) features[10]++
                        if (bv[10][0] > 0) {
                            features[7]++
                            if (bv[3] == typeEye) features[9]++
                            if (bv[3] == typePillar) features[10]++
                        }
                        /*end features*/
        
        
                    }// else console.log('bv[10].y is NaN')
                }// else console.log('bv not defined')
            }
        
            /*begin features*/
            features[8] = M.max(...disallowedHeightMap.flat())
            /*end features*/
        
        }
        /*begin render*/
        let findViewBox = () => {
            viewBox = [-99,99,99,-99]
            // 0 → top
            // 1 → bottom
            // 2 → left
            // 3 → right
            let rot = (x, y, a) => [x * cos(a) - y * sin(a), x * sin(a) + y * cos(a)]
            vertices.forEach(v => {
                let [x, y, z] = v;
                [x, z] = rot(x, z, -u_camAngXZ);
                [y, z] = rot(y, z, -u_camAngYZ)
                viewBox[2] = min(x, viewBox[2])
                viewBox[3] = max(x, viewBox[3])
                viewBox[1] = min(y, viewBox[1])
                viewBox[0] = max(y, viewBox[0])
            })
            viewBox[4] = viewBox[3] - viewBox[2] // width
            viewBox[5] = viewBox[0] - viewBox[1] // height
            viewBox[6] = max(viewBox[4] / 1.8, viewBox[5] / 1.8, 1) // scale
            viewBox[7] = viewBox[2] + viewBox[4] / 2 // offset x
            viewBox[8] = viewBox[1] + viewBox[5] / 2 // offset y
        }
        /*end render*/
        

            init()
        
        
            placeBlocks()
    
            /*begin render*/
            findViewBox()
        
            console.log(u_palette)
            u_colors = blocks.map(b => [b[4], b[5], b[6]]).flat()
        
            let uniforms = ``
            uniforms += blocks.map((b, i) =>
                `ps[${i}]=vec3(${b[10][0]},${b[10][1]},${b[10][2]});`).join('')
            uniforms += blocks.map((b, i) =>
                `ss[${i}]=vec3(${b[0][0]},${b[0][1]},${b[0][2]});`).join('')
            uniforms += blocks.map((b, i) =>
                `rt[${i}]=vec2(${b[8]},${b[3]});`).join('') // FIXME shorted with [x,y,z]
            uniforms += blocks.map((b, i) =>
                `cs[${i}]=ivec3(${b[4]},${b[5]},${b[6]});`).join('')
    
            // console.log(uniforms)
            /*end render*/
        
        

            let sampler_psArray = Array(64).fill([[0,0,0]])
            let sampler_ssArray = Array(64).fill([[0,0,0]])
            let sampler_rtArray = Array(64).fill([[0,0,0]])
            let sampler_csArray = Array(64).fill([[0,0,0]])
            blocks.forEach((b,i) => {
                sampler_psArray[i] = [b[10]           ]
                sampler_ssArray[i] = [b[0]            ]
                sampler_rtArray[i] = [[b[8],b[3],0   ]]
                sampler_csArray[i] = [[b[4],b[5],b[6]]]
            })
        
        
        
        
        
        
        
        
        
        
        
        
        
        
            
            /*begin features*/
            console.log(features)
                
            features[6] = { '1': 'Left', '0': 'Center', '-1': 'Right' }[features[6]]
            // if (features[3] == 4/*gaz*/ || features[3] == 3/*ranibow*/) features[6] = 0
            features[5] = { '1': 'Circle', '2': 'Squircle' }[features[5]]
            features[1] = { '0': 'Convex', '1': 'Concave' }[features[1]]
            // if (features[3] == 4/*gaz*/) features[5] = 'Empty'
            features[2] = { '0': 'Black and white', '1': 'Summer', '2': 'Colorful', '3': 'Magenta blue', '4': 'Plastic', '5': 'Winter', '6': 'Spring', '7': 'Vivid', '8': 'Eighth' }[features[2]]
            // if (features[3] == 4/*gaz*/) features[2] = 'Gaz'
            if (features[3] == 3/*rainbow*/) features[2] = 'Rainbow'
            features[4] = { '0': 'Cage', '1': 'Tiny', '2': 'Mushroom', '3': 'Compact', '4': 'Random' }[features[4]]
            features[0] = { '0': 'Z', '1': 'X' }[features[0]]
            features[3] = { '0': 'Textured', '1': 'Not textured', '2': 'Monochrome', '3': 'Rainbow'}[features[3]]
            let names = ['Symmetry','Studs','Palette','Color scheme','Layout','Background type','Background light','Blocks number','Height','Eyes','Aerials',]
            let f = {}
            for(let i=0; i<names.length; i++){
                f[names[i]] = features[i]
                console.log(names[i], features[i])
            }

            return f
        }
        /*end features*/
    
            /*begin render*/
    
            // let tick = 0;
            
            let size_ = M.min(innerWidth, innerHeight)*D
            let canvas = document.createElement('canvas')
            canvas.style.width = size_/D + 'px' // FIXME, а без этого совсем никак?
            canvas.style.height = size_/D + 'px'
            size_ = min(size_, 2048)
            let gl = canvas.getContext('webgl', {
                preserveDrawingBuffer: true,
            });

            document.body.appendChild(canvas)
            let bg = u_palette.slice(3*palette_bg,3+3*palette_bg)//.map(v=>v*255)
            canvas.style.background=(features[3] == 3)? '#333':`rgb(${bg})`
            
            canvas.width = size_
            canvas.height = size_
            
            
            // var regl = createREGL(gl)
            let regl = createREGL({
                gl: gl,
                extensions: ['webgl_draw_buffers', 'oes_texture_float'],
            })

            let tex3d = regl.texture(tex3dArray)
            
            let sampler_ps = regl.texture({data: sampler_psArray, type: 'float'})
            let sampler_ss = regl.texture({data: sampler_ssArray, type: 'float'})
            let sampler_rt = regl.texture({data: sampler_rtArray, type: 'float'})
            let sampler_cs = regl.texture({data: sampler_csArray, type: 'float'})

            let fbo = [1,1].map(() =>
                regl.framebuffer({
                    color: [
                        regl.texture({type: 'float', width: size_, height:size_}), // color
                        regl.texture({type: 'float', width: size_, height:size_}), // normal + depth
                    ],
                    depth: false,
                  })
            )


              let commandParams = {
                frag: /*glsl*/`#extension GL_EXT_draw_buffers : require
                precision highp float;
                #define BLOCKS_NUMBER_MAX 60
                #define PI 3.1415
                #define S smoothstep
                #define V vec3
                #define F float
                #define N normalize
                #define L length
                #define v vec2
                mat2 rot(F a) {→mat2(cos(a),-sin(a),sin(a),cos(a));} // FIXME make define
                #define gl_z_rnd(x) fract(54321.987 * sin(987.12345 * x + .1))
                // #define rot(a) mat2(cos(a),-sin(a),sin(a),cos(a))
                #define EPS .0001
                F sabs(F p) {→sqrt(abs(p)*abs(p)+5e-5);}
                F smax(F a, F b) {→(a+b+sabs(a-b))*.5;}
                
                V gl_z_ps[BLOCKS_NUMBER_MAX];
                V gl_z_ss[BLOCKS_NUMBER_MAX];
                v gl_z_rt[BLOCKS_NUMBER_MAX];
                ivec3 gl_z_cs[BLOCKS_NUMBER_MAX];

                uniform sampler2D gl_z_sampler_ps;
                uniform sampler2D gl_z_sampler_ss;
                uniform sampler2D gl_z_sampler_rt;
                uniform sampler2D gl_z_sampler_cs;
            

                uniform V gl_z_pt[5];
                uniform F gl_z_tk;
                uniform F gl_z_rs;

                uniform sampler2D gl_z_tex3d;
                uniform sampler2D gl_z_texCol;
                uniform sampler2D gl_z_texNorm;
        
                ivec3 colIds = ivec3(0);
                F gl;
                F camDist = 30.;
                ivec2 blockId;
                F cornerR = .01, gap = .015, block;
                F outlineWidth = .015;//((cornerR+gap)*sqrt(2.) - cornerR);
                
                // int eye = 0;
                // V eye = V(0.);
                // eye = 0;
                int id;
    
                F tube(V p, V s){
                    v po = v(L(p.xz), p.y - clamp(p.y, EPS, s.x));
                    po.x -= clamp(po.x, s.z, s.y);
                    →L(po)-EPS;
                }
                

                F dist(V p, F id) {

                    V val_from_sampler_ps = (texture2D(gl_z_sampler_ps, vec2(.5,(id)/64.)).rgb);
                    V val_from_sampler_rt = (texture2D(gl_z_sampler_rt, vec2(.5,(id)/64.)).rgb);
                    V val_from_sampler_ss = (texture2D(gl_z_sampler_ss, vec2(.5,(id)/64.)).rgb);
                    ivec3 val_from_sampler_cs = ivec3(texture2D(gl_z_sampler_cs, vec2(.5,(id)/64.)).rgb);
                    // ivec3 val_from_sampler_cs = ivec3(1,2,1);

                    p.x = abs(p.x);
                    V pb = p;
                    pb -= val_from_sampler_ps;
                    pb.xz *= rot(val_from_sampler_rt.x * PI / 2.);
                    
                    // box
                    // F cornerR = .01, gap = .008, block;
                    
                    V s = val_from_sampler_ss - 2. * (cornerR + gap);
                    block = L(pb - clamp(pb, -s/2., s/2.)) - cornerR * 1.4;
                    // if(blockId==0) {colIds = ivec3(3, 2, 1); return length(fract(p)-.5)-.45;}
                        
                    if(val_from_sampler_rt.y == 5.) { // arc
                        F cyl = L(pb.zy) - .5;
                        F box = max(abs(pb.z) - .5, abs(pb.y + val_from_sampler_ss.y / 2.) - 1.);
                        F hole = min(cyl, box);
                        block = max(block, -hole);
                    }

                    if(val_from_sampler_rt.y == 6.) { // pillar
                        F narrow = tube(pb+V(0,1.6-cornerR*3.,0),V(3.55,.15,0));
                        F base = tube(pb+V(0,2.-cornerR*2.,0),V(.4-cornerR*2.,.45,0));
                        block = min(narrow, base);
                        // // F narrow = tube(pb+V(0,1.6-cornerR-gap,0),V(3.55,.15,0));
                        // F narrow = tube(pb+V(0,4./2.-.4-cornerR*2.-gap,0),V(3.55,.15-cornerR,0));
                        // F base = tube(pb+V(0,2.-cornerR*2.,0),V(.4-cornerR*2.-gap,.45,0));
                        // block = min(narrow, base)-cornerR;
                    }

                    // studs
                    if(val_from_sampler_rt.y != 6.) { // not pillar
                        V ps = pb;
                        // repetition
                        v l = val_from_sampler_ss.xz;
                        ps.xz += (l - 1.) / 2.;
                        ps.xz = ps.xz - clamp(floor(ps.xz + .5), v(0.), l - 1.);
                        
                        // position
                        ps.y -= val_from_sampler_ss.y / 2. + .02;

                        F stud = tube(ps, V(.24, .28, mix(EPS,.18,${features[1]}.)));
                        block = min(stud, block);
                    }
            
                    if(pb.z<.01 && (val_from_sampler_rt.y == 3. || val_from_sampler_rt.y == 4.)) { // beak
                        block = smax(block,dot(pb,V(0,.78*(7.-2.*val_from_sampler_rt.y),-.624))-.39);
                    }
            
            
            
                    if(val_from_sampler_rt.y == 7.) { // eye
                        F eye_ = tube(pb+V(0,.25-cornerR*2.,0),V(.4-cornerR*2.,.45,0));
                        block = eye_;
                        if(eye_ < EPS) {
                            colIds.z = 9; // eye
                            // discard;
                            // return block;
                        }
                    }
            
                    // block = L(pb)-2.;
                    if(block < EPS) {
                        // colIds = ivec3(1,2,1);
                        if(colIds.z == 9)// FIXME как-то эти ифы упростить, они нужны только чтобы глаза работали. Может поднять над предыдущим абзацем?
                            colIds = ivec3(val_from_sampler_cs.xy, 9);
                        else
                            colIds = val_from_sampler_cs;
                    }
                    →block;
                }
                
                V norm(V p, F id) {
                    // p+=.5;
                    // →normalize(fract(p));
                    v e = v(.01, 0.);
                    →N(V(dist(p + e.xyy, id) - dist(p - e.xyy, id), dist(p + e.yxy, id) - dist(p - e.yxy, id), dist(p + e.yyx, id) - dist(p - e.yyx, id)));
                }

                void sdfVoxel(vec3 p){
                    // blockId *= 0;
                    // p.xz += fract(float(${gs/2}));  // ODD
                    // p.x = abs(p.x);
                    // p.zx -= fract(float(${gs/2})); // ODD
                    // p.x += 5.;
                    // p.z += 5.;
                    // p = floor(p+vec3(0,0,0));
                    // if(p.y < 0.) return v(0);
                    // vec3 boundingBox = vec3(10,1000 / 10,10);
                    // if(fract(p/boundingBox) != p/boundingBox) return v(0);
                    // blockId = ivec2(max(0., 3.-length(p)));
                    // return vec2(blockId);


                    blockId *= 0;
                    p.xz += fract(float(${gs/2}));  // ODD
                    // p.xz = p.zx;
                    p.x = abs(p.x);
                    p.zx -= fract(float(${gs/2})); // ODD
                    // p.x += ${gs}.-1.;
                    // p.z += ${gs}.;
                    p.x += 5.;
                    p.z += 5.;
                    p = floor(p+vec3(0,0,0));
                    if(p.y < 0.) return; // ←←←←←←←←←←←←←←←←←←←←←←←←
                    // p.x -= .5;
                    // p.z -= .5;
                    vec3 boundingBox = vec3(10,1000 / 10,10);
                    if(fract(p/boundingBox) != p/boundingBox) return;  // ←←←←←←←←←←←←←←←←←←←←←←←←
                    vec2 vox, texSize = vec2(boundingBox.x, boundingBox.y*boundingBox.z);
                    vox.x = p.x;
                    vox.y = p.z + p.y * 10.;
                    vec2 voxN = (vox+.5) / texSize;
                    blockId = ivec2(texture2D(gl_z_tex3d, voxN).rg * 64.);
                    // if(blockId == 2) discard;
                    return;  // ←←←←←←←←←←←←←←←←←←←←←←←←
                }

                // vec3 rgb2hsb( in vec3 c ){
                //     vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
                //     vec4 p = mix(vec4(c.bg, K.wz),
                //                  vec4(c.gb, K.xy),
                //                  step(c.b, c.g));
                //     vec4 q = mix(vec4(p.xyw, c.r),
                //                  vec4(c.r, p.yzx),
                //                  step(p.x, c.r));
                //     float d = q.x - min(q.w, q.y);
                //     float e = 1.0e-10;
                //     return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)),
                //                 d / (q.x + e),
                //                 q.x);
                // }
                
                // //  Function from Iñigo Quiles
                // //  https://www.shadertoy.com/view/MsS3Wc
                // vec3 hsb2rgb( in vec3 c ){
                //     vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                //                              6.0)-3.0)-1.0,
                //                      0.0,
                //                      1.0 );
                //     rgb = rgb*rgb*(3.0-2.0*rgb);
                //     return c.z * mix(vec3(1.0), rgb, c.y);
                // }

                void main() {
                    // gl_FragData[0] = vec4(1);
                    
                    // // DEBUG
                    // vec2 uv = (gl_FragCoord.xy * 2. - gl_z_rs) / gl_z_rs;
                    // V ro = V(uv * F(${viewBox[6]}) +
                    //     v(${viewBox[7]},
                    //     ${viewBox[8]}), -camDist),
                    //    rd = V(0, 0, 1);
                    //    ro.yz *= rot(${u_camAngYZ});
                    //    rd.yz *= rot(${u_camAngYZ});
                    //    ro.xz *= rot(${u_camAngXZ});
                    //    rd.xz *= rot(${u_camAngXZ});
                    // float d,e=1.,j;
                    // vec3 p;
                    // for(float i=0.;i<99.;i++){
                    //     j=i;
                    //     p=ro+rd*d;
                    //     p.z-=1.;
                    //     p.xz = fract(p.xz)-.5;
                    //     d+=e=dist(p);
                    //     if(e<1e-3)break;
                    // }
                    // gl_FragData[0] = vec4(step(-40.,-d));
                    // vec3 n = norm(p);
                    // // n.xz *= -rot(${u_camAngXZ});
                    // // n.xz *= -rot(${u_camAngXZ});
                    // // n.xz *= -rot(${u_camAngXZ});
                    // // n.yz *= rot(${u_camAngYZ});
                    // // n.xy *= rot(.95);
                    // n.xz *= rot(PI/2. + PI/4.);
                    // n.xy *= rot(atan(sqrt(2.)));
                    // n = n.zyx;
                    // n.x *= -1.;
                    // n.z *= -1.;

                    // gl_FragData[1] = vec4((n),d);
                    // return;
                    // // END OF DEBUG


                    ${uniforms}
                    V o = V(0), n, nnn;
                    v uv = (gl_FragCoord.xy * 2. - gl_z_rs)/gl_z_rs;
                    F d;
        
                    gl = 0.;
                    F e = 1e9, ep=9., j; // here highp
                    d = 0.;
    
                    F fl = floor(gl_z_tk/2.);
                    F fr = mod(gl_z_tk,2.);
                    v pos = v(fr/2.,fl/4.)-.5;
                    if(mod(fl, 2.)==0.) pos.x += .25; //https://bit.ly/30g2DXs
    
                    uv += pos * 2. / gl_z_rs;
    
                    V p, ro = V(uv * F(${viewBox[6]}) +
                        v(${viewBox[7]},
                        ${viewBox[8]}), -camDist),
                        rd = V(0, 0, 1);
                    bool outline = false;

                    // vec3 ro = vec3(0,0,-10);
                    // vec3 rd = vec3(0,0,-10);
                    ro.yz *= rot(${u_camAngYZ});
                    rd.yz *= rot(${u_camAngYZ});
                    ro.xz *= rot(${u_camAngXZ});
                    rd.xz *= rot(${u_camAngXZ});
                    float jj = 0.;



                    for(float i = 0.; i < 200.; i++) {
                        jj++;
                        p = ro + rd * d;
                        p.xz -= fract(float(${gs/2})); // ODD
                        vec3 dp = (step(0., rd) - fract(p)) / rd;
                        float dpmin;
            
                        dpmin = min(min(dp.x,dp.y),dp.z) + 1e-4;

            
                        bool breaker = false;
                        sdfVoxel(p);
                        // blockId = ivec2(2);
                        if(length(v(blockId)) > 0. && p.y >= 0.) {
                        // if(length(p)-5. < 0.) {
                            float ddd = 0.;
                            for(float backupI = 0.; backupI < 200.; backupI++) { // FIXME get rid of backupI
                                jj++;
                                p = ro + rd * (d + ddd);
                                
                                float e1 = dist(p,float(blockId.x - 1));
                                float e2 = dist(p,float(blockId.y - 1));
                                if(e1<e2){
                                    e = e1;
                                    id = blockId.x - 1;
                                }
                                else{
                                    e = e2;
                                    id = blockId.y - 1;
                                }
                                ddd += e;

                                if(ep < e && e < outlineWidth) {
                                    outline = true;
                                    breaker = true;
                                    dpmin = ddd;
                                    break;
                                }
                                ep = e;
                                if(e < EPS || jj > 200. || d > camDist*2.) { // налетели на сферу
                                    // discard;
                                    // if(id > 0.)
                                    //     col *= color(id);
                                        // col *= n+.5;
                                    // if(s > 1.)
                                        // col *= .6;
                                    breaker = true;
                                    dpmin = ddd;
                                    break;
                                }
                                if(ddd > dpmin) { // улетели в соседнюю клетку
                                    break;
                                }
                            }

                            // breaker = true;
                            // colIds = ivec3(1,1,1);
                            // break;
                        }
                        else{
                            colIds = ivec3(0, 0, -1);
                        }
                        d += dpmin;
                        if(breaker == true || jj > 200.)
                        break;
                            
                    }

                    V c;
                    if(!outline) {

                        V col1, col2;
                        for(int j = 0; j < 5; j++) {
                            if(colIds[0] == j)
                            col1 = gl_z_pt[j]; //////////////////////
                                // col1 = vec3(1,0,0); //////////////////////
                            if(colIds[1] == j)
                                // col2 = vec3(1,0,1); //////////////////////
                            col2 = gl_z_pt[j]; //////////////////////
                        }
                        
                        V col = col1;
                        
                        // Texturing
                        //
                        // layers
                        if(colIds.z == 1)
                            if(sin(p.y * PI * 3.) > 0.)
                                col = col2;
                        if(colIds.z == 2)
                            if(sin((p.x + fract(gl_z_ps[0].x - gl_z_ss[0].x / 2.)) * PI * 2. * 1.5) > 0.) //////////////////////
                                col = col2;
                        
                        // pride
                        if(${features[3]} == 3)
                            col = sin((L(p) / max(F(${gs}), F(${features[8]})) * 2. - V(0, .3, .6)) * 6.28) * .5 + .5;

                        n = norm(p,float(id)); // надо тут вычислять, видимо, где-то выше я сбиваю colIds выполняя дист
                        // иначе colIds.z равен 0 с чего-то. Но почему тогда dist(p); не помогает?
                        if(colIds.z == 9) {
                            col = V(0);
                            V pe = p + fract(${gs}. / 2.);
                            pe = fract(pe) - .5;
                            col += step(.3, L(pe.xz));
                            col += step(-.1, -L(pe.xz + .1));
                        }
                    
                        if(colIds.z == -1) {
                            // фончик
                            // c = texture2D(gl_z_sampler_ps,gl_FragCoord.xy / gl_z_rs).rgb; //gl_z_tex3d
                            
                            c = V(${bg})/255.;
                            if(L(c) > .4){
                                c *= S(5., 0., L(uv + v(${features[6]}, -1)));
                            }
                            // c = V(1,0,1);
                            if(${features[3]} == 3){
                                c = V(.2);
                            }
                            if(sin(L(pow(abs(uv), v(${features[5]}))) * 32.) > 0.)
                            c *= .95;
                        } else {
                            // c = V(1,0,1);
                            // shading
                            c = col;
                            c *= min(1.5, 55. / jj) * .2 + .8;
                            c *= dot(n, N(V(-.5,.5,0))) * .2 + 1.;

                            // glare
                            if(colIds.z!=9)
                                c += pow(abs(dot(n, N(V(0, 1.5, .5)))), 40.);
                        }
                        // gazya
                        // if(${features[3]} == 4)
                        //     c = (V(20. / jj));
                    }
                    // n = norm(p);
                    // c = n;
                    // // texture debug
                    // c.g = fract(gl_FragCoord.y / gl_z_rs * 11.);
                    // c.g *= pow(fract(gl_FragCoord.y / gl_z_rs * 1000.),8.);// * fract(gl_FragCoord.x / gl_z_rs * 10.);
                    // c.g += step(0.001,texture2D(gl_z_tex3d, gl_FragCoord.xy / gl_z_rs).r) * 8.;
                    // c *= 30./jj;

                    // o += c;
                    // nnn+=n;


                    if(gl_z_tk > 1.){
                        V norm = (texture2D(gl_z_texNorm, gl_FragCoord.xy/gl_z_rs).rgb);
                        F dist = texture2D(gl_z_texNorm, gl_FragCoord.xy/gl_z_rs).a;
                        dist = min(dist,camDist*2.);
                        vec3 f = norm;
                        vec3 r = normalize(cross(vec3(1,2,3), f));
                        vec3 u = cross(f, r);
                        for(float i=0.; i<20.; i++){
                            V kernel = V(0,0,0);
                            kernel += (gl_z_rnd(i+gl_z_tk+dot(uv*99.,vec2(.319,.137)))*2.-1.) * r;
                            kernel += (gl_z_rnd(i+gl_z_tk+dot(uv*99.,vec2(.319,.137))+.1)*2.-1.) * u;
                            kernel += (gl_z_rnd(i+gl_z_tk+dot(uv*99.,vec2(.319,.137))+.2)) * f;
                            kernel = N(kernel) * pow(gl_z_rnd(i+dot(mod(gl_FragCoord.xy,10.1*PI),vec2(.319,.137))),2.);
                            vec3 offset = V(dot(kernel,vec3(1,0,0)), dot(kernel,vec3(0,1,0)), dot(kernel,V(0,0,1)));
                            if(dist - offset.z * 1.1 > texture2D(gl_z_texNorm, gl_FragCoord.xy/gl_z_rs + .15 * offset.xy).a){
                                // gl_FragData[0] *= .99;
                                c*=.97;
                            }
                        }
                    }


                    gl_FragData[0] = mix(texture2D(gl_z_texCol, gl_FragCoord.xy/gl_z_rs), c.rgbb, 1. / gl_z_tk);
                    // n.xz *= rot(PI/2. + PI/4.);
                    n.xz *= -sign(${features[0]-.5})*rot(${u_camAngXZ});
                    n.xy *= rot(atan(sqrt(2.)));
                    n = n.zyx;
                    n.xz *= -1.;
                    gl_FragData[1] = mix(texture2D(gl_z_texNorm, gl_FragCoord.xy/gl_z_rs), vec4(n.rgb,d), 1. / gl_z_tk);


                    // gl_FragData[0] = vec4(gl_z_tk/8.);
                    // gl_FragData[0].r = sin(length(gl_FragCoord.xy)/gl_z_tk);

                }
                
                
                
                
                
                
                `/*glsl*/.replace(/@/g,'\n#define ').replace(/→/g,'return '),
              
                vert: `attribute vec2 g;void main(){gl_Position=vec4(g,0,1);}`,
              
                attributes: {
                  g: [[1, 1], [1, -4], [-4, 1]]
                },
            
                uniforms: {
                    rs: regl.prop('r'),
                    pt: u_palette.map(v=>v/255),
                    // aa: regl.prop('a'),
                    tex3d: tex3d,
                    tk: ({ tick }) => tick,
                    texCol: ({ tick }) => fbo[tick % 2].color[0],
                    texNorm: ({ tick }) => fbo[tick % 2].color[1],
                    sampler_ps: sampler_ps,
                    sampler_ss: sampler_ss,
                    sampler_rt: sampler_rt,
                    sampler_cs: sampler_cs,
                    // tk: regl.prop('tk'),
                    // tk: () => tick,
                },
                // scissor: {
                //     enable: true,
                //     box: {
                //       x: regl.prop('x'),
                //       y: regl.prop('y'),
                //       width: regl.prop('t'),
                //       height: regl.prop('t')
                //     }
                // },
                depth: {
                    enable: false
                },
                framebuffer: ({ tick }) => fbo[(tick + 1) % 2],
                count: 3
            }
            
            
            let commandRender = regl({
                frag: /*glsl_*/`#extension GL_EXT_draw_buffers : require
                precision highp float;
                uniform float rs;
                uniform sampler2D texCol;
                // uniform sampler2D texNorm;        
                void main() {
                    gl_FragData[0] = texture2D(texCol,gl_FragCoord.xy/rs);
                    gl_FragData[0].a = 1.;
                }`/*glsl_*/,
                vert: `attribute vec2 g;void main(){gl_Position=vec4(g,0,1);}`,
                attributes: {
                  g: [[1, 1], [1, -4], [-4, 1]]
                },
                uniforms: {
                    rs: regl.prop('r'),
                    texCol: ({ tick }) => fbo[(tick + 1) % 2].color[0],
                    // texNorm: fbo.color[1],
                },
                depth: {
                    enable: false
                },
                count: 3
            })

            let commandNormals = regl(commandParams)

            let rows = (size_ / ts | 0) + 1
            
            let tprev = new Date()
            let wCurr = 1
            let aa = 1
            if(params_aa)aa = Number(params_aa)
            
            let steps = 1
            ts=256

            
            // commandParams.framebuffer = null
            // commandParams.uniforms.render = 1
            // commandParams.uniforms.texCol = fbo.color[0]
            // commandParams.uniforms.texNorm = fbo.color[1]
            // let commandRender = regl(commandParams)
            


            let fr = regl.frame(({tick}) => {
                commandNormals({r: size_})
                commandRender({r: size_})
                // console.log(size_)
                if(tick > 8) {document.title='👾',fr.cancel()}
                // FIXME to 8
            })
    
    /*end render*/