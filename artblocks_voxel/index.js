// tokenData.hash = '0xe195db9558b6ba7e9d7b883297f1f1d1f2c830e8a0be2e33d1473ca5b4f9'

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
        let D = document
        let min = M.min
        let max = M.max
        let floor = M.floor
        let abs = M.abs
        let cos = M.cos
        let sin = M.sin
        
        
        /*begin render*/
        // let div = D.createElement('div') // FIXME
        // div.classList.add('debug'),div.style.width = '100%',div.style.height = '100px' // FIXME
        // D.body.appendChild(div) //FIXME
        let params_size = location.href.split('#')[1];
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
        let paletteBg
        // let texMpArray = [...A(300)].map(()=>[...A(10)].map(()=>[...A(1)].map(()=>M.random()*255)))
        // let texMpArray = [...A(1000.)].map(()=>[...A(10)].map(()=>[...A(1)].map(()=>M.random()*255)))
        let texMpArray = [...A(1000.)].map(()=>[...A(10)].map(_=>[0,0,0]))
        // console.log(texMpArray)

        // new
        let ts;
            
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
            //      // 0 — textured, 1 — not textured, 2 - all blocks of the same color, 3 — raibow, 4 — gazya
            //3     ColorScheme: (1 - R() ** .3) * 4 | 0,
            //4     Layout: 0,
            //5     BackgroundType: RL([2, 1], .5),
            //6     BackgroundLight: (R() * 3 | 0) - 1,
            //7     BlocksNumber: 0,
            //8     Height: 0,
            //9     Eyes: 0,
            //10    Aerials: 0,
            // }
            features = [
                R() ** 4. * 2 | 0,
                R() ** 8 * 2 | 0,
                0,
                // (1 - R() ** .3) * 5 | 0,
                (1-M.sqrt(1-(R()-1)**4)) * 4 | 0,
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
                    10,
                    20+20*R(),
                    3, // shroom
                    8,
                    R() ** 4 * 8,
                ],
                [ // small
                    4,
                    4 + R() * 4 | 0,
                    1, // high
                    1,
                    1,
                ],
                [
                    8 + R() * 2 | 0,
                    30,
                    4, // cage
                    8,
                    R()+2,
                ],
                // cutie big
                [
                    4+2*R()|0,
                    6 + R() * 4 | 0,
                    0,
                    1,
                    1+2*R(),
                ],
                [
                    6 + R() * 4 | 0,
                    10 + R() * 20 | 0,
                    2, // low
                    6,
                    R() * 2,
                ],
                [
                    6 + (R() * 2 | 0),
                    10 + R() * 6 | 0,
                    0, // random
                    4,
                    R() * 3,
                ],
            ];
        
            // features[4] = R() ** .4 * presets.length | 0;
            features[4] = M.sqrt(1-(R()-1)**2) * presets.length | 0;
          
            ([ gs, blocksNumber, fitnessFunctionNumber, maxTry, extra ] = presets[features[4]])
            // console.log('presets[features[4]',presets[features[4]])
            numberOfBlockTypes = 1 + R()**.5 * 3 | 0
        
            blocks = [];
            features[2] = R() ** .5 * 8 | 0
            // palette = 'dddddd888888555555222222aaaaaaf26b21fbb04099ca3c208b3afcec529b5de5f15bb500bbf900f5d4fee440f1faeea8dadc457b9d1d3557e6394650514ff25f5c247ba070c1b3ffe066541388d90368f1e9da2e294effd4001f20414b3f72119da419647effc857540d6eee4266f3fcf01f271bffd23fe4572e29335ca8c686669bbcf3a712'
                // .match(/(.{30})/g).map(d=>d.match(/(.{6})/g))[features[2]]
            u_palette = 'dddddd888888555555222222aaaaaaf26b21fbb04099ca3c208b3afcec529b5de5f15bb500bbf900C2A8fee440f1faeea8dadc457b9d1d3557e6394650514ff25f5c247ba070c1b3ffe066541388d90368E4E4E42e294effd4001f20414b3f72119da419647effc857540d6eee4266d9d9d91f271bffd23fe4572e29335ca8c686669bbcf3a712'
                .substr(30*features[2], 30).match(/(.{2})/g).map(v=>Number("0x"+v))
            paletteBg = R()*4|0
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
                    bvtInitial = RL(blocksVariantsExtra, .7), fitnessFunctionNumber = 5, maxTry = 6, isExtra = 1
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
                    // bvt = JSON.parse(JSON.stringify(bvtInitial))
                    bvt = [...bvtInitial]

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
                    // let xx = [...A(bvt[9][0])].map((d, i) => bvt[10][0] + i - (bvt[9][0] - 1.) / 2)
                    // let zz = [...A(bvt[9][2])].map((d, i) => bvt[10][2] + i - (bvt[9][2] - 1.) / 2)
                    let [xx,zz] = [0,0].map((_,j)=>[...A(bvt[9][j*2])].map((d, i) => bvt[10][j*2] + i - (bvt[9][j*2] - 1.) / 2))
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
                        -M.hypot(bvt[10][0], bvt[10][2]),
                        -maxHeightTry, // low
                        -M.hypot(bvt[10][0], maxHeightTry - 10, bvt[10][2]), // mashroom
                        // -abs(M.hypot(bvt[10][0], maxHeightTry - 10, bvt[10][2]) - gs), // cage
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
                            texMpArray[zzz + 10 * yyy][xxx][0] = 
                            texMpArray[zzz + 10 * yyy + 10][xxx][1] = 
                            255 * (blocks.length+1) / 64
                        }
                        
        
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
            viewBox = [-9,9,9,-9]
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
        
            // let uniforms = ``
            // uniforms += blocks.map((b, i) =>
            //     `ps[${i}]=vec3(${b[10][0]},${b[10][1]},${b[10][2]});`).join('')
            // uniforms += blocks.map((b, i) =>
            //     `ss[${i}]=vec3(${b[0][0]},${b[0][1]},${b[0][2]});`).join('')
            // uniforms += blocks.map((b, i) =>
            //     `rt[${i}]=vec2(${b[8]},${b[3]});`).join('') // FIXME shorted with [x,y,z]
            // uniforms += blocks.map((b, i) =>
            //     `cs[${i}]=ivec3(${b[4]},${b[5]},${b[6]});`).join('')
    
            // console.log(uniforms)
            /*end render*/
        
        

            let samplerArrays = [0,0,0,0].map(_=>A(64).fill([[]]))
            blocks.forEach((b,i) => {
                samplerArrays[0][i] = [b[10]           ]
                samplerArrays[1][i] = [b[0]            ]
                samplerArrays[2][i] = [[b[8],b[3],0   ]]
                samplerArrays[3][i] = [[b[4],b[5],b[6]]]
            })
            console.log(samplerArrays)
        
            // let samplerArrays = []
            // samplerArray[0]=blocks.map(b=>[b[10]])
            // samplerArray[1]=blocks.map([b[0]            ])
            // samplerArray[2]=blocks.map([[b[8],b[3],0   ]])
            // samplerArray[3]=blocks.map([[b[4],b[5],b[6]]])
            // // blocks.forEach((b,i) => {
            //     // samplerArrays[0][i] = [b[10]           ]
            //     // samplerArrays[1][i] = [b[0]            ]
            //     // samplerArrays[2][i] = [[b[8],b[3],0   ]]
            //     // samplerArrays[3][i] = [[b[4],b[5],b[6]]]
            // // })
            // console.log(samplerArrays)
        
        
        
        
        
        
        
        
        
        
        
        
        
            console.log(features)
            
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
            features[4] = { '0': 'Pererozhdoib', '1': 'Tiny', '2': 'Cage', '3': 'Small', '4': 'Compact', '5': 'Random' }[features[4]]
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
            
            let ws = M.min(innerWidth, innerHeight)
            let canvas = D.createElement('canvas')
            let canvasStyle = canvas.style
            canvasStyle.width = canvasStyle.height = ws + 'px'
            let size_ = min(ws*devicePixelRatio, 2048)
            if(params_size) size_ = Number(params_size) // FIXME uncomment

            let gl = canvas.getContext('webgl', {
                preserveDrawingBuffer: true,
            });

            D.body.appendChild(canvas)
            let bg = u_palette.slice(3*paletteBg,3+3*paletteBg)//.map(v=>v*255)
            canvasStyle.background=(features[3] == 3)? '#333':`rgb(${bg})`
            
            canvas.width = canvas.height = size_
            
            
            let regl = createREGL({
                gl: gl,
                extensions: ['webgl_draw_buffers', 'oes_texture_float'],
            })

            let tex3d = regl.texture(texMpArray)
            
            // 0 pos
            // 1 sizes
            // 2 rot type
            // 3 colors
            let samplers = [...A(4)].map((_,i)=>regl.texture({data: samplerArrays[i], type: 'float'}))

            let fbo = [1,1].map(() =>
                regl.framebuffer({
                    color: [
                        regl.texture({type: 'float', width: size_, height:size_}), // color
                        regl.texture({type: 'float', width: size_, height:size_}), // normal + depth
                    ],
                    depth: false,
                  })
            )
            let precision = `precision highp float;\n`

              let commandParams = {
                vert: `attribute vec2 g;void main(){gl_Position=vec4(g,0,1);}`,
                attributes: {
                  g: [[1, 1], [1, -4], [-4, 1]]
                },
                count: 3
            }
            
            let commandNormals = regl({...commandParams,
                frag: precision+/*glsl*/`
                #extension GL_EXT_draw_buffers:require
                #define BLOCKS_NUMBER_MAX 60
                #define PI 3.1415
                #define S smoothstep
                #define V vec3
                #define F float
                #define N normalize
                #define L length
                #define T texture2D
                #define v vec2
                // mat2 rot(F a) {→mat2(cos(a),-sin(a),sin(a),cos(a));} // FIXME make define
                #define gl_z_Q(x) fract(54321.987 * sin(987.12345 * x + .1))
                #define gl_z_R(a) mat2(cos(a),-sin(a),sin(a),cos(a))
                #define EPS 1e-4
                #define U uniform sampler2D
                #define C gl_FragCoord
                #define D gl_FragData
                F sabs(F p) {→sqrt(abs(p)*abs(p)+5e-5);}
                F smax(F a, F b) {→(a+b+sabs(a-b))*.5;}
                
                U gl_z_ps;
                U gl_z_ss;
                U gl_z_rt;
                U gl_z_cs;
                U gl_z_mp;
                U gl_z_cl;
                U gl_z_nr;

                uniform V gl_z_pt[5];
                uniform F gl_z_tk;
                F resolution = F(${size_});
        
                ivec3 colIds = ivec3(0);
                F gl;
                F camDist = 30.;
                ivec2 blockId;
                F cornerR = .01, gap = .015, block;
                F outlineWidth = .015;//((cornerR+gap)*sqrt(2.) - cornerR);
                
                int id;
    
                F tube(V p, V s){
                    v po = v(L(p.xz), p.y - clamp(p.y, EPS, s.x));
                    po.x -= clamp(po.x, s.z, s.y);
                    →L(po)-EPS;
                }
                

                F dist(V p, F id) {
                    V val_from_sampler_ps = (T(gl_z_ps, vec2(.5,id/64.)).rgb);
                    V val_from_sampler_rt = (T(gl_z_rt, vec2(.5,id/64.)).rgb);
                    V val_from_sampler_ss = (T(gl_z_ss, vec2(.5,id/64.)).rgb);
                    ivec3 val_from_sampler_cs = ivec3(T(gl_z_cs, vec2(.5,(id)/64.)).rgb);
                    // ivec3 val_from_sampler_cs = ivec3(1,2,1);

                    p.x = abs(p.x);
                    V pb = p;
                    pb -= val_from_sampler_ps;
                    pb.xz *= gl_z_R(val_from_sampler_rt.x * PI / 2.);
                    
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
                    blockId *= 0;
                    p.xz += fract(F(${gs/2}));  // ODD
                    p.x = abs(p.x);
                    p.zx -= fract(F(${gs/2})); // ODD
                    p.x += 5.;
                    p.z += 5.;
                    p = floor(p+vec3(0,0,0));
                    if(p.y < 0.) return; // ←←←←←←←←←←←←←←←←←←←←←←←←
                    vec3 boundingBox = vec3(10,1000 / 10,10);
                    if(fract(p/boundingBox) != p/boundingBox) return;  // ←←←←←←←←←←←←←←←←←←←←←←←←
                    vec2 vox, texSize = vec2(boundingBox.x, boundingBox.y*boundingBox.z);
                    vox.x = p.x;
                    vox.y = p.z + p.y * 10.;
                    vec2 voxN = (vox+.5) / texSize;
                    blockId = ivec2(T(gl_z_mp, voxN).rg * 64.);
                    return;  // ←←←←←←←←←←←←←←←←←←←←←←←←
                }

                void main() {
                    V o = V(0), n, nnn;
                    v uv = (C.xy * 2. - resolution)/resolution;
                    F d;
        
                    gl = 0.;
                    F e = 1e9, ep=9., j; // here highp
                    d = 0.;
    
                    F fl = floor(gl_z_tk/2.);
                    F fr = mod(gl_z_tk,2.);
                    v pos = v(fr/2.,fl/4.)-.5;
                    if(mod(fl, 2.)==0.) pos.x += .25; //https://bit.ly/30g2DXs
    
                    uv += pos * 2. / resolution;
    
                    V p, ro = V(uv * F(${viewBox[6]}) +
                        v(${viewBox[7]},
                        ${viewBox[8]}), -camDist),
                        rd = V(0, 0, 1);
                    bool outline = false;

                    ro.yz *= gl_z_R(${u_camAngYZ});
                    rd.yz *= gl_z_R(${u_camAngYZ});
                    ro.xz *= gl_z_R(${u_camAngXZ});
                    rd.xz *= gl_z_R(${u_camAngXZ});
                    F jj = 0.;



                    for(F i = 0.; i < 200.; i++) {
                        jj++;
                        p = ro + rd * d;
                        p.xz -= fract(F(${gs/2})); // ODD
                        vec3 dp = (step(0., rd) - fract(p)) / rd;
                        F dpmin;
            
                        dpmin = min(min(dp.x,dp.y),dp.z) + 1e-4;

            
                        bool breaker = false;
                        sdfVoxel(p);
                        if(length(v(blockId)) > 0. && p.y >= 0.) {
                            F ddd = 0.;
                            for(F backupI = 0.; backupI < 200.; backupI++) { // FIXME get rid of backupI
                                jj++;
                                p = ro + rd * (d + ddd);
                                
                                F e1 = dist(p,F(blockId.x - 1));
                                F e2 = dist(p,F(blockId.y - 1));
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
                                    breaker = true;
                                    dpmin = ddd;
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
                            if(sin((p.x + fract(${gs}. / 2.)) * PI * 2. * 1.5) > 0.) //////////////////////
                                col = col2;
                        
                        // pride
                        if(${features[3]} == 3)
                            col = sin((L(p) / max(${gs}., F(${features[8]})) - V(0, .3, .6)) * 6.28) * .5 + .5;

                        n = norm(p,F(id)); // надо тут вычислять, видимо, где-то выше я сбиваю colIds выполняя дист
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
                    }
                    if(gl_z_tk > 1.){
                        V norm = (T(gl_z_nr, C.xy/resolution).rgb);
                        F dist = T(gl_z_nr, C.xy/resolution).a;
                        dist = min(dist,camDist*2.);
                        vec3 f = norm;
                        vec3 r = normalize(cross(vec3(1,2,3), f));
                        vec3 u = cross(f, r);
                        for(F i=0.; i<20.; i++){
                            V kernel = V(0,0,0);
                            kernel += (gl_z_Q(i+gl_z_tk+dot(uv*99.,vec2(.319,.137)))*2.-1.) * r; // FIXME rnd values
                            kernel += (gl_z_Q(i+gl_z_tk+dot(uv*99.,vec2(.319,.137))+.1)*2.-1.) * u;
                            kernel += (gl_z_Q(i+gl_z_tk+dot(uv*99.,vec2(.319,.137))+.2)) * f;
                            kernel = N(kernel) * pow(gl_z_Q(i+dot(mod(C.xy,10.1*PI),vec2(.319,.137))),2.);
                            vec3 offset = V(dot(kernel,vec3(1,0,0)), dot(kernel,vec3(0,1,0)), dot(kernel,V(0,0,1)));
                            if(dist - offset.z * 1.1 > T(gl_z_nr, C.xy/resolution + .15 * offset.xy).a){
                                c*=.97;
                            }
                        }
                    }


                    D[0] = mix(T(gl_z_cl, C.xy/resolution), c.rgbb, 1. / gl_z_tk);
                    n.xz *= -sign(${features[0]-.5})*gl_z_R(${u_camAngXZ});
                    n.xy *= gl_z_R(atan(sqrt(2.)));
                    n = n.zyx;
                    n.xz *= -1.;
                    D[1] = mix(T(gl_z_nr, C.xy/resolution), vec4(n.rgb,d), 1. / gl_z_tk);
                }
                
                `/*glsl*/.replace(/@/g,'\n#define ').replace(/→/g,'return '),
                
                uniforms: {
                    pt: u_palette.map(v=>v/255),
                    // aa: regl.prop('a'),
                    mp: tex3d,
                    tk: ({ tick }) => tick,
                    cl: ({ tick }) => fbo[tick % 2].color[0],
                    nr: ({ tick }) => fbo[tick % 2].color[1],
                    ps: samplers[0],
                    ss: samplers[1],
                    rt: samplers[2],
                    cs: samplers[3],
                },

                framebuffer: ({ tick }) => fbo[(tick + 1) % 2],
              
            })

            let commandRender = regl({...commandParams,
                    frag: precision+`uniform sampler2D c;void main(){gl_FragData[0]=vec4(texture2D(c,gl_FragCoord.xy/float(${size_})).rgb,1);}`, 
                    uniforms: { c: ({ tick }) => fbo[(tick + 1) % 2].color[0], },
                    depth: {enable: false}
                })

            let rows = (size_ / ts | 0) + 1
            
            let tprev = new Date()
            let wCurr = 1
            let aa = 1
            
            let steps = 1
            ts=256


            let fr = regl.frame(({tick}) => {
                commandNormals()
                commandRender()
                if(tick > 8) {D.title='👾',fr.cancel()}
            })
    
    /*end render*/