tokenData.hash = '0x94f2da61fa63fbded3e9a9a41e26683ab3f7cc8bc008747c38b042397221e698'

if (window.location.hash) {
    tokenData.hash = window.location.hash.slice(1)
} // FIXME



/*begin features*/
function calculateFeatures(tokenData) {
    /*end features*/ 
        
    
        console.log(tokenData.hash)
        let M = Math
        let A = Array
        let D = document
        let min = M.min
        let max = M.max
        let floor = M.floor
        let hypot = M.hypot
        
        
        
        
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
        let S, ss, R, t, RL, SH, RInt, many
        S = new Uint32Array([4, 1, ss = t = 2, 3].map(i => parseInt(tokenData.hash.substr(i * 8, 8), 16))); R = _ => (t = S[3], S[3] = S[2], S[2] = S[1], S[1] = ss = S[0], t ^= t << 11, S[0] ^= t ^ t >>> 8 ^ ss >>> 19, S[0] / 2 ** 32);
        RInt = (x,power) => R()**(power || 1) * x | 0
        // RL = (ar, p) => ar[ar.length * R() ** (p || 1) | 0]
        RL = (ar, p) => ar[RInt(ar.length, p)]
        SH = (ar) => ar.map(a=>[a,R()]).sort((a,b)=>a[1]-b[1]).map(a=>a[0])
        many = (n,fn) => [...A(n|0)].map((_,i) => fn(i))

        // new
        let ts;
            
        let init = () => {
            // console.log(tokenData.hash)
            // S = new Uint32Array([0, 1, ss = t = 2, 3].map(i => parseInt(tokenData.hash.substr(i * 8 + 2, 8), 16))); R = _ => (t = S[3], S[3] = S[2], S[2] = S[1], S[1] = ss = S[0], t ^= t << 11, S[0] ^= t ^ t >>> 8 ^ ss >>> 19, S[0] / 2 ** 32); 'tx piter'
            
            vertices = []
        
            /// ↓↓↓↓↓ should be changed if hash changes
        
            u_tick = 1e-6 // so not to turn into int
            // features = {
            //0     Symmetry
            //1     Studs
            //2     Palette
            //3     ColorScheme: 0 — textured, 1 — not textured, 2 - all blocks of the same color, 3 — raibow
            //4     Layout
            //5     BackgroundType
            //6     BackgroundLight
            //7     BlocksNumber
            //8     Height
            //9     Eyes
            //10    Aerials
            // }
            features = [
                // R() ** 4 * 2 | 0,
                RInt(2,4),
                // R() ** 8 * 2 | 0,
                RInt(2,8),
                0,
                (R()<.01)?3:(1-M.sqrt(1-(R()-1)**2)) * 3 | 0,
                0,
                RL([2, 1], .5),
                // (R() * 3 | 0) - 1,
                RInt(3)-1,
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
                    20+RInt(21),
                    3, // shroom
                    8,
                    // R() ** 4 * 8,
                    RInt(8,4),
                ],
                [ // small
                    4,
                    // 4 + R() * 4 | 0,
                    4 + RInt(4),
                    1, // high
                    1,
                    1,
                ],
                [
                    // 8 + R() * 2 | 0,
                    8 + RInt(2),
                    30,
                    4, // cage
                    8,
                    2, // FIXME remove R()
                ],
                // cutie big
                [
                    // 4+2*R()|0,
                    // 6 + R() * 4 | 0,
                    4+RInt(2),
                    6 + RInt(4),
                    0,
                    1,
                    // 1+2*R(),
                    1+RInt(2),
                ],
                [
                    // 6 + R() * 4 | 0,
                    // 10 + R() * 20 | 0,
                    6 + RInt(4),
                    10 + RInt(20),
                    2, // low
                    6,
                    // R() * 2,
                    RInt(2),
                ],
                [
                    // 6 + (R() * 2 | 0),
                    // 10 + R() * 6 | 0,
                    6 + RInt(2),
                    10 + RInt(6),
                    0, // random
                    4,
                    // R() * 3,
                    RInt(3),
                ],
            ];
        
            // features[4] = R() ** .4 * presets.length | 0;
            features[4] = M.sqrt(1-(R()-1)**2) * presets.length | 0;
          
            ([ gs, blocksNumber, fitnessFunctionNumber, maxTry, extra ] = presets[features[4]])
            // console.log('presets[features[4]',presets[features[4]])
            // numberOfBlockTypes = 1 + R()**.5 * 3 | 0
            numberOfBlockTypes = 1 + RInt(3,.5)
        
            blocks = [];
            // features[2] = R() ** .5 * 8 | 0
            features[2] = RInt(8,.5)
            // palette = 'dddddd888888555555222222aaaaaaf26b21fbb04099ca3c208b3afcec529b5de5f15bb500bbf900f5d4fee440f1faeea8dadc457b9d1d3557e6394650514ff25f5c247ba070c1b3ffe066541388d90368f1e9da2e294effd4001f20414b3f72119da419647effc857540d6eee4266f3fcf01f271bffd23fe4572e29335ca8c686669bbcf3a712'
                // .match(/(.{30})/g).map(d=>d.match(/(.{6})/g))[features[2]]
            u_palette = 'dddddd888888555555222222aaaaaaf26b21fbb04099ca3c208b3afcec529b5de5f15bb500bbf900C2A8fee440f1faeea8dadc457b9d1d3557e6394650514ff25f5c247ba070c1b3ffe066541388d90368E4E4E42e294effd4001f20414b3f72119da419647effc857540d6eee4266d9d9d91f271bffd23fe4572e29335ca8c686669bbcf3a712'
                .substr(30*features[2], 30).match(/(.{2})/g).map(v=>Number("0x"+v))
            // paletteBg = R()*4|0
            paletteBg = RInt(4)
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
                // .map(() => [...A(gs)])
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

                    bvt[4] = RInt(4) + 1
                    bvt[5] = RInt(4) + 1
                    if (features[3] == 2) bvt[4] = bvt[5] = 1
                    bvt[6] = RInt(4)
                    if (features[3] == 1) bvt[6] = 0
                    // попался! bvt у нас сохранялся между выполнениями и портился от запуска к запуску.
                    // надо или его копию делать, или ещё чего.
        
                    // есть ли смысл тут сделать глубокую копию? Есть. И всё в ней хранить.
                    bvt[7] = 1
                    bvt[8] = RInt(4)
                    if (bvt[3] == typeEye) bvt[8] = 0
                    let makeMask = () => A(9).fill(A(9).fill(1))
                    bvt[2] = bvt[2] || makeMask()
                    bvt[1] = bvt[1] || makeMask()
                    // Поворачиваем весь blockVariantTry на 90° несколько раз.
                    // Далее ротейт будет использоваться только для передачи в юниформ.
                    bvt[9] = [...bvt[0]]
                    many(bvt[8],i=>{
                        // flipping sizes
                        // тут косяк. До этого мы деталь не крутили, только размеры подгоняли.
                        // теперь надо крутить, но размеры оставлять тут правильными. А вот координаты углов можно 
                        // ставить с учётом повотора.
                        bvt[9].reverse()
                        //rotating matrices
                        bvt[2] = rotArray(bvt[2])
                        bvt[1] = rotArray(bvt[1])
                        bvt[7] = !bvt[7]
                    })
                    // интерраптинг, иф не влезло
                    if (bvt[9][0] > gs / 2) {
                        // console.log(bvt[9][0], 'is longer than ', gs)
                        if (maxTry < maxMaxTry) maxTry++; continue // можно макс макс трай убрать, если макс трай не очень мелкий
                    }
                    ///////////////////////////////////////////////////////////////////////////////////////////
                    ///////////////////////////////////////////////////////////////////////////////////////////
                    ///////////////////////////////////////////////////////////////////////////////////////////
                    if (gs % 2) {
                        bvt[10] = [
                            bvt[9][0] / 2 + RInt(gs/2 - 1.5 - bvt[9][0]) + .5,
                            0,
                            - gs / 2 + bvt[9][2] / 2 + (RInt(gs + 1 - bvt[9][2])),
                        ]
                    }
                    else bvt[10] = [
                        bvt[9][0] / 2 + RInt(gs / 2 + 1 - bvt[9][0]),
                        0,
                        - gs / 2 + bvt[9][2] / 2 + RInt(gs + 1 - bvt[9][2]),
                    ]
                    if (bvt[9][0] % 2 == gs % 2 && R() < 1 / (gs - bvt[9][0]))
                        if (bvt[9][0] % 2 || bvt[7]) // если чётное число пупырок, надо чтобы ось симетрии совпадала
                            bvt[10][0] = 0
                    // тут можно циклы выкинуть
                    let studL = 0
                    let studR = 0
                    // let xx = [...A(bvt[9][0])].map((d, i) => bvt[10][0] + i - (bvt[9][0] - 1.) / 2)
                    // let zz = [...A(bvt[9][2])].map((d, i) => bvt[10][2] + i - (bvt[9][2] - 1.) / 2)
                    let [xx,zz] = [0,0].map((_,j)=>[...A(bvt[9][j*2])].map((d, i) => bvt[10][j*2] + i - (bvt[9][j*2] - 1.) / 2))

                    // for (let x of xx) {
                    //     for (let z of zz) {
                    //         if (x >= 0) studR++;
                    //         else studL++;
                    //     }
                    // }
        
                    let maxHeightTry = 0;
                    let maxHeightTryLikeWithoutBottomHoles = 0;
                    let maxDisallowedHeightTry = 0;
                    let bi = 0
                    // for (let z of zz) {
                    //     for (let x of xx) {
                    //     }
                    // }
                    zz.map(z=>xx.map(x=>{
                        if (x >= 0) studR++; else studL++;
                        let bx = bi % bvt[9][0]
                        let bz = floor(bi / bvt[9][0])
                        bi++
                        maxHeightTryLikeWithoutBottomHoles = max(maxHeightTryLikeWithoutBottomHoles, blocksHeightMap[x + gs / 2 - .5][z + gs / 2 - .5]);
                        maxDisallowedHeightTry = max(maxDisallowedHeightTry, disallowedHeightMap[x + gs / 2 - .5][z + gs / 2 - .5]);
                        if (bvt[2][bx][bz] == 1) { // если посчитать только те, что с 1 внизу, высота не должна отличаться от той, что считается для всех клеток
                            maxHeightTry = max(maxHeightTry, blocksHeightMap[x + gs / 2 - .5][z + gs / 2 - .5]);
                        }
                    }))
                
                    if (maxHeightTry < maxDisallowedHeightTry || maxHeightTry > maxHeightTryLikeWithoutBottomHoles) {
                        if (maxTry < maxMaxTry) maxTry++; continue;
                    }
                    // TODO possible endless lop here!
        
        
                    let fitnessFunctions = [
                        0, // any
                        -hypot(bvt[10][0], bvt[10][2]),
                        -maxHeightTry, // low
                        -hypot(bvt[10][0], maxHeightTry - 10, bvt[10][2]), // mashroom
                        -M.abs(hypot(bvt[10][0], maxHeightTry * 2, bvt[10][2]) - gs), // cage: blocksNum = 90, gs = 16
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
                        let [xx,zz] = [0,2].map(j=>[...A(bv[9][j])].map((_,i) => bv[10][j] + i - (bv[9][j] - 1) / 2))
                        let bi = 0
                        zz.map(z=>xx.map(x=>{
                            let bx = bi % bv[9][0]
                            let bz = floor(bi / bv[9][0])
                            let shift = gs / 2 - .5
                            bi++
                            // blocksHeightMap[x + gs / 2 - .5][z + gs / 2 - .5] = maxHeight + bv[0][1]
                            // if (bv[1][bx][bz] == 0)
                            // blocksHeightMap[x + gs / 2 - .5][z + gs / 2 - .5] = -99
                            blocksHeightMap[x + shift][z + shift] = (bv[1][bx][bz])?maxHeight + bv[0][1]:-9
                            disallowedHeightMap[x + shift][z + shift] = maxHeight + bv[0][1]
                    }))
                        blocks.push(bv)
                        // console.log(bv)

                        for(let xx=0;xx<bv[9][0];xx++)
                        for(let yy=0;yy<bv[9][1];yy++)
                        many(bv[9][2],zz=>{
                            let [xxx,yyy,zzz] = [5,0,5].map((d,i)=>(bv[10][i]-bv[9][i]/2) + [xx,yy,zz][i] + d | 0)
                            texMpArray[zzz + 10 * yyy][xxx][0] = 
                            texMpArray[zzz + 10 * yyy + 10][xxx][1] = 
                            255 * (blocks.length+1) / 64
                        })
                        
        
                        // push vertices
                        many(8,i=>{
                            let s = [0, 0, 0].map((_, j) => ((i >> j) & 1) - .5) // permutations, 3 items of {.5, -.5} set
                            // let s = many(3, j => ((i >> j) & 1) - .5) // permutations, 3 items of {.5, -.5} set
                            vertices.push([
                                s[0] * (bv[9][0] + 2 * bv[10][0]), // pos shouldn't be divided by 2, compensating
                                s[1] * bv[9][1] + bv[10][1],
                                s[2] * bv[9][2] + bv[10][2]
                            ])
                        })

        
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
            features[8] = max(...disallowedHeightMap.flat())
            /*end features*/
        
        }
        
        

            init()
        
        
            placeBlocks()
    
            
        
        

            let samplerArrays = [0,0,0,0].map(_=>A(64).fill([[]]))
            blocks.map((b,i) => {
                samplerArrays[0][i] = [b[10]           ]
                samplerArrays[1][i] = [b[0]            ]
                samplerArrays[2][i] = [[b[8],b[3],0   ]]
                samplerArrays[3][i] = [[b[4],b[5],b[6]]]
            })
            console.log(samplerArrays)
                
        
        
        
        
        
        
        
        
        
        
        
        
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
            many(names.length, i=>{
                f[names[i]] = features[i]
                console.log(names[i], features[i])
            })
            return f
        }
        /*end features*/
    
            