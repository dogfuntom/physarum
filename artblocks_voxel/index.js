// tokenData.hash = '0x343c93c4b2ea21427bfd11a12d48183bc2879a5aad606b0a95dcfdaf07'
// tokenData.hash = '0x343c21427bfd11a12d48183bc2879a5aad606b0a95dcfdaf07'

// tokenData.hash = '0x0c91417602b6e1469a56fc5ff264310cc6b57490079a3a164ecc723c79143a09' // не совпадают ножка арки и кубик под ней
// tokenData.hash = '0xc961a81a3949a7b3ef6ab19a5882509a755c2606d895025389b2a41399d8c14a'
// tokenData.hash = '0xb578aeb4b58e39423c9ff40fde67c2d416082d6fc09aedd5c5a5ecf5db25e1a6' // антенка заберает шаги и пипке не достаётся
// 

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
        console.log(tex3dArray)

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
            //3     ColorScheme: (1 - R() ** .3) * 5 | 0,
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
                (1 - R() ** .3) * 5 | 0,
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
                    3 + R() * 4 | 0, // FIXME restore
                    // 6 + R() * 0,
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
            // features[4] = 1; // FIXME remove
          
            ([ gs, blocksNumber, fitnessFunctionNumber, maxTry, extra ] = presets[features[4]])
            console.log('presets[features[4]',presets[features[4]])
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
                if (n >= blocksNumber - extra && features[3] != 4)
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
                        console.log(tex3dArray)
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
                `cs[${i}]=ivec3(${b[4]},${b[5]},${b[6]});`).join('')
            uniforms += blocks.map((b, i) =>
                `rt[${i}]=vec2(${b[8]},${b[3]});`).join('')
    
            // console.log(uniforms)
            /*end render*/
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
            
            /*begin features*/
            console.log(features)
                
            features[6] = { '1': 'Left', '0': 'Center', '-1': 'Right' }[features[6]]
            if (features[3] == 4/*gaz*/ || features[3] == 3/*ranibow*/) features[6] = 0
            features[5] = { '1': 'Circle', '2': 'Squircle' }[features[5]]
            features[1] = { '0': 'Convex', '1': 'Concave' }[features[1]]
            if (features[3] == 4/*gaz*/) features[5] = 'Empty'
            features[2] = { '0': 'Black and white', '1': 'Summer', '2': 'Colorful', '3': 'Magenta blue', '4': 'Plastic', '5': 'Winter', '6': 'Spring', '7': 'Vivid', '8': 'Eighth' }[features[2]]
            if (features[3] == 4/*gaz*/) features[2] = 'Gaz'
            if (features[3] == 3/*rainbow*/) features[2] = 'Rainbow'
            features[4] = { '0': 'Cage', '1': 'Tiny', '2': 'Mushroom', '3': 'Compact', '4': 'Random' }[features[4]]
            features[0] = { '0': 'Z', '1': 'X' }[features[0]]
            features[3] = { '0': 'Textured', '1': 'Not textured', '2': 'Monochrome', '3': 'Rainbow', '4': 'Gaz' }[features[3]]
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
            canvas.style.background=(features[3] == 4 || features[3] == 3)? '#333':`rgb(${bg})`
            
            canvas.width = size_
            canvas.height = size_
            
            
            var regl = createREGL(gl)
            let tex3d = regl.texture(tex3dArray)
            
            // console.log('regl.limits.maxViewportDims',regl.limits.maxViewportDims)
            // console.log('regl.limits.maxRenderbufferSize',regl.limits.maxRenderbufferSize)
            // console.log('u_palette.map(v=>v/255)',u_palette.map(v=>v/255))
    
            let program = regl({
                frag: /*glsl*/`precision highp float;
                #define BLOCKS_NUMBER_MAX 60
                #define PI 3.1415
                #define S smoothstep
                #define V vec3
                #define F float
                #define N normalize
                #define L length
                #define v vec2
                mat2 rot(F a) {→mat2(cos(a),-sin(a),sin(a),cos(a));} // FIXME
                // #define rot(a) mat2(cos(a),-sin(a),sin(a),cos(a))
                #define EPS .0001
                F sabs(F p) {→sqrt(abs(p)*abs(p)+5e-5);}
                F smax(F a, F b) {→(a+b+sabs(a-b))*.5;}
                
                V gl_z_ps[BLOCKS_NUMBER_MAX];
                V gl_z_ss[BLOCKS_NUMBER_MAX];
                v gl_z_rt[BLOCKS_NUMBER_MAX];
                ivec3 gl_z_cs[BLOCKS_NUMBER_MAX];
                
                uniform V gl_z_pt[5];
                uniform F gl_z_aa;
                uniform F gl_z_rs;

                uniform sampler2D gl_z_tex3d;
        
                ivec3 colIds;
                F gl;
                F camDist = 30.;
                ivec2 blockId;
                F cornerR = .01, gap = .01, block;
                F outlineWidth = .01;//((cornerR+gap)*sqrt(2.) - cornerR);
                
                int eye = 0;
    
                F tube(V p, V s){
                    v po = v(L(p.xz), p.y - clamp(p.y, EPS, s.x));
                    po.x -= clamp(po.x, s.z, s.y);
                    →L(po)-EPS;
                }
                
                F dist(V p) {
                    // →length(fract(p)-.5)-.5;
                    p.x = abs(p.x);
                    // F res = 1e5;
                    F res = p.y + 1.; // floor plane
                    // F res = length(p)-.5; // floor plane
                    for(int i = 0; i < BLOCKS_NUMBER_MAX; i++) {
                        if(i >= ${blocks.length})
                            break;
                        if(i != blockId.x - 1 && i != blockId.y - 1)
                        // if(i != blockId.y - 1)
                            continue;
                        V pb = p;
                        pb -= gl_z_ps[i];
                        pb.xz *= rot(gl_z_rt[i].x * PI / 2.);
                        
                        // box
                        // F cornerR = .01, gap = .008, block;
                        
                        V s = gl_z_ss[i] - 2. * (cornerR + gap);
                        block = L(pb - clamp(pb, -s/2., s/2.)) - cornerR * 1.4;
                        // if(blockId==0) {colIds = ivec3(3, 2, 1); return length(fract(p)-.5)-.45;}
                            
                        if(gl_z_rt[i].y == 5.) { // arc
                            F cyl = L(pb.zy) - .5;
                            F box = max(abs(pb.z) - .5, abs(pb.y + gl_z_ss[i].y / 2.) - 1.);
                            F hole = min(cyl, box);
                            block = max(block, -hole);
                        }
    
                        if(gl_z_rt[i].y == 6.) { // pillar
                            F narrow = tube(pb+V(0,1.6-cornerR*2.,0),V(3.55,.15,0));
                            F base = tube(pb+V(0,2.-cornerR*2.,0),V(.4-cornerR*2.,.45,0));
                            block = min(narrow, base);
                        }

                        // studs
                        if(gl_z_rt[i].y != 6.) { // not pillar
                            V ps = pb;
                            // repetition
                            v l = gl_z_ss[i].xz;
                            ps.xz += (l - 1.) / 2.;
                            ps.xz = ps.xz - clamp(floor(ps.xz + .5), v(0.), l - 1.);
                            
                            // position
                            ps.y -= gl_z_ss[i].y / 2. + .02;
    
                            F stud = tube(ps, V(.24, .28, mix(EPS,.18,${features[1]}.)));
                            block = min(stud, block);
                        }
                
                        if(pb.z<.01 && (gl_z_rt[i].y == 3. || gl_z_rt[i].y == 4.)) { // beak
                            block = smax(block,dot(pb,V(0,.78*(7.-2.*gl_z_rt[i].y),-.624))-.39);
                        }
                
                
                
                        if(gl_z_rt[i].y == 7.) { // eye
                            // F eye_ = cyl(pb, V(.2, .25, .2), cornerR);
                            F eye_ = tube(pb+V(0,.25-cornerR*2.,0),V(.4-cornerR*2.,.45,0));
                            block = eye_;
                            if(eye_ < EPS) {
                                eye = 1;
                                // discard;
                            }
                        }
                
                        // block = L(pb)-2.;
                        if(block < res) {
                            colIds = gl_z_cs[i];
                            res = block;
                        }
                        if(res < EPS)
                            break;
                    }
                    →res;
                }
                
                V norm(V p) {
                    // p+=.5;
                    // →normalize(fract(p));
                    v e = v(.01, 0.);
                    →N(V(dist(p + e.xyy) - dist(p - e.xyy), dist(p + e.yxy) - dist(p - e.yxy), dist(p + e.yyx) - dist(p - e.yyx)));
                }

                vec2 sdfVoxel(vec3 p){
                    p.xz += fract(float(${gs/2}));  // ODD
                    // p.xz = p.zx;
                    p.x = abs(p.x);
                    p.zx -= fract(float(${gs/2})); // ODD
                    // p.x += ${gs}.-1.;
                    // p.z += ${gs}.;
                    p.x += 5.;
                    p.z += 5.;
                    p = floor(p+vec3(0,0,.0));
                    if(p.y < 0.) return v(0);
                    // p.x -= .5;
                    // p.z -= .5;
                    vec3 boundingBox = vec3(10,1000 / 10,10);
                    if(fract(p/boundingBox) != p/boundingBox) return -v(1.);
                    vec2 vox, texSize = vec2(boundingBox.x, boundingBox.y*boundingBox.z);
                    vox.x = p.x;
                    vox.y = p.z + p.y * 10.; // FIXME
                    vec2 voxN = (vox+.5) / texSize;
                    blockId = ivec2(texture2D(tex3d, voxN).rg * 64.);
                    // if(blockId == 2) discard;
                    return vec2(blockId); // is full
                }

                void main() {
                    ${uniforms}
                    V o = V(0);
                    v uv, uvI = (gl_FragCoord.xy * 2. - gl_z_rs)/gl_z_rs;
        
                    for(F A = 0.; A < 8.; A++){
                        if(A >= gl_z_aa) break;
                        gl = 0.;
                        F d = 0., e = 1e9, ep=9., j; // here highp
        
                        F fl = floor(A/2.);
                        F fr = mod(A,2.);
                        v pos = v(fr/2.,fl/4.)-.5;
                        if(mod(fl, 2.)==0.) pos.x += .25; //https://bit.ly/30g2DXs
        
                        v uv = uvI;
    
                        uv += pos * 2. / gl_z_rs;
        
                        V n, p, ro = V(uv * F(${viewBox[6]}) +
                        // V n, p, ro = V(uv * 4. * F(${viewBox[6]}) + // FIXME remore * 4.
                            v(${viewBox[7]},
                            ${viewBox[8]}), -camDist),
                           rd = V(0, 0, .9 + .1 * fract(1e3 * sin(1e3 * fract(L(uv)))));
                        bool outline = false;

                        // RAYMARCH

                        // TODO ro, rd

                        // MY LEGO VERSION
                        // for(F i = 0.; i < 1e2; i++) {
                        //     j = i;
                        //     p = d * rd + ro;
                        //     p.z -= camDist;
                        //     p.yz *= rot(${u_camAngYZ});
                        //     p.xz *= rot(${u_camAngXZ}); // FIXME не каждый шаг реймарша вычислять этот угол, предварительно RD повернуть и всё

                        //     d += e = dist(p);
                        //     if(ep < e && e < .01) {
                        //         outline = true;
                        //         break;
                        //     }
                        //     ep = e;
                        //     if(e < EPS || e > camDist*2.)
                        //         break;
                        // }

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
                            if(length(sdfVoxel(p)) > 0.) {
                                float ddd = 0.;
                                for(float backupI = 0.; backupI < 200.; backupI++) { // FIXME get rid of backupI
                                    jj++;
                                    p = ro + rd * (d + ddd);
                                    ddd += e = dist(p);
                                    // if(e < .001 || ++i > 200.) { // FIXME restore this i++ condition
                                    if(ep < e && e < outlineWidth) {
                                        outline = true;
                                        break;
                                    }
                                    ep = e;
                                    if(e < .001 || jj > 200. || d > camDist*2.) { // налетели на сферу
                                        // if(id > 0.)
                                        //     col *= color(id);
                                            // col *= n+.5;
                                        // if(s > 1.)
                                            // col *= .6;
                                        breaker = true;
                                        break;
                                    }
                                    if(ddd > dpmin) { // улетели в соседнюю клетку
                                        break;
                                    }
                                }
                            }
                            else{
                                colIds = ivec3(0, 0, -1);
                            }
                            if(breaker == true || jj > 200.)
                                break;
                
                            d += dpmin;
                        }

                        V c;
                        if(!outline) {
                            V col1, col2;
                            for(int j = 0; j < 5; j++) {
                                if(colIds[0] == j)
                                    col1 = gl_z_pt[j];
                                if(colIds[1] == j)
                                    col2 = gl_z_pt[j];
                            }
                    
                            V col = col1;
                    
                            // Texturing
                            //
                            // layers
                            if(colIds.z == 1)
                                if(sin(p.y * PI * 3.) > 0.)
                                    col = col2;
                            if(colIds.z == 2)
                                if(sin((p.x + fract(gl_z_ps[0].x - gl_z_ss[0].x / 2.)) * PI * 2. * 1.5) > 0.)
                                    col = col2;
                                    
                            // pride
                            if(${features[3]} == 3)
                                col = sin((L(p) / max(F(${gs}), F(${features[8]})) * 2. - V(0, .3, .6)) * 6.28) * .5 + .5;
                            
                            if(eye == 1) {
                                col = V(0);
                                V pe = p + fract(${gs}. / 2.);
                                pe = fract(pe) - .5;
                                col += step(.3, L(pe.xz));
                                col += step(-.1, -L(pe.xz + .1));
                            }
                                    
                            if(colIds.z == -1) {
                                // // фончик
                                // c = texture2D(tex3d,gl_FragCoord.xy / gl_z_rs).rgb;
                                
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
                                c = V(1,0,1);
                                // shading
                                c = (min(1.5, 55. / jj) * .2 + .8) * (dot(norm(p), N(V(0, 1, 1))) * .2 + .8) * col;
                                
                                // glare
                                c += pow(abs(dot(norm(p), N(V(0., 3., 1.)))), 40.);
                            }
                            // gazya
                            if(${features[3]} == 4) // FIXME газю выпилиииить :-(
                                c = (V(20. / jj));
                            }
                        // n = norm(p);
                        // c = n;
                        // // texture debug
                        // c.g = fract(gl_FragCoord.y / gl_z_rs * 11.);
                        // c.g *= pow(fract(gl_FragCoord.y / gl_z_rs * 1000.),8.);// * fract(gl_FragCoord.x / gl_z_rs * 10.);
                        // c.g += step(0.001,texture2D(tex3d, gl_FragCoord.xy / gl_z_rs).r) * 8.;
                        // c *= 30./jj;
                        o += c;
                    }
                    gl_FragColor = vec4(o/gl_z_aa,1);
                }`/*glsl*/.replace(/@/g,'\n#define ').replace(/→/g,'return '),
              
                vert: `attribute vec2 g;void main(){gl_Position=vec4(g,0,1);}`,
              
                attributes: {
                  g: [[1, 1], [1, -4], [-4, 1]]
                },
            
                uniforms: {
                    rs: regl.prop('r'),
                    pt: u_palette.map(v=>v/255),
                    aa: regl.prop('a'),
                    tex3d: tex3d,
                },
                scissor: {
                    enable: true,
                    box: {
                      x: regl.prop('x'),
                      y: regl.prop('y'),
                      width: regl.prop('t'),
                      height: regl.prop('t')
                    }
                },
                depth: {
                    enable: false
                  },
                count: 3
            })
            let rows = (size_ / ts | 0) + 1
            let tick = 0;
            
            let tprev = new Date()
            let wCurr = 1
            let aa = 1
            if(params_aa)aa = Number(params_aa)
            
            let steps = 1
            ts=256

            program({r: size_, x: 0, y: 0, t:size_, a: 8})
            // // program({r: size_, x: size_/2, y: 0, t:size_/2, a: 1})
            // // program({r: size_, x: 0, y: size_/2, t:size_/2, a: 1})
            // // program({r: size_, x: size_/2, y: size_/2, t:size_/2, a: 1})


            // function* spiral() {
            //     let [x,y,d,m] = [0,0,1,1];
            //     while (1) {
            //       while (2 * x * d < m) yield [x, y], x += d
            //       while (2 * y * d < m) yield [x, y], y += d
            //       d=-d,m++
            //     }
            //   }
            //   let it = spiral()
            

            // let fr = regl.frame(() => {
            //     for(let i=0;i++<steps;){
            //         let [x, y] = it.next().value;
            //         program({r: size_, x: size_/2 - ts/2 + ts * x | 0, y: size_/2 - ts/2 - ts * y | 0, t:ts, a: aa})
            //         tick++
            //     }
            //     t = +new Date()
            //     let dt = t - tprev
            //     if(tick==49 && aa==1 && dt < 2000){
            //         tick = 0
            //         it = spiral()
            //         aa = min(8, 16 / 2 ** M.floor(dt/500))
            //         regl.clear({color:[0,0,0,0]})
            //         // document.querySelector('div.debug').innerHTML = `
            //         // dt: ${dt}<br>
            //         // aa: ${aa}<br>
            //         // `
            //         }
            //     else if(tick>49 || aa > 1){
            //         if(t - tprev > 160) steps = max(1,steps-8)
            //         if(t - tprev < 30) steps += 2    
            //         tprev = t
            //     }
            //     console.log(tick)
            //     if(tick > ((size_/ts/2|0)*2+3)**2) {fr.cancel()
            //     }
            // })
    
    /*end render*/