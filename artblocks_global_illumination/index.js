console.clear();
let S, ss, R, t
// tokenData.hash='0x1cdf923a8065697fd31d9531970bca3445f0d58e3743570b2b8e3ec7d56b4f20'
// tokenData.hash='0x580000000000000000000000000000000000000000000000000000000000000'
console.log(tokenData.hash)
S = Uint32Array.from([0, 1, ss = t = 2, 3].map(i => parseInt(tokenData.hash.substr(i * 8 + 2, 8), 16))); R = _ => (t = S[3], S[3] = S[2], S[2] = S[1], S[1] = ss = S[0], t ^= t << 11, S[0] ^= (t ^ t >>> 8) ^ (ss >>> 19), S[0] / 2 ** 32); 'tx piter'
let RL = (ar, p) => ar[ar.length * R() ** (p || 1) | 0]
let SH = (ar) => { return ar.sort(() => R() - 0.5) }
let M = Math
/*
Баги
- Пингвинчик!
- Попробовать клюв с цилиндром
- beak пофиксить: точно резать + пипки не обрезать.
- Прелоудер
- На айфоне чтобы работало
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
- Скачивалку в большом размере
- Скачивалку JSON файла

✓ Кодгольфнуть вершины
✓ В цветовые схемы добавить 7 цветов. Можно на бумажке ещё раз записать, какие буду схемы и фичи
✓ Попробовать запретить текстуры для больших
✓ Решить, текстуры будут меняться в зависимости от цветовой схемы? Например, будет ли цветовая схема «без»
✓ Правильный подсчёт блоков
✓ Радуга чтобы ресайзилась под размер модельки
✓ Убрать мышиную крутилку
✓ На мобиле чтобы работало
✓ Пофиксить глаза раскосые
✓ Аватар фит (квадратные штуки слишком большие)
✓ Студшейп
✓ глаза!
✓ нижняя цеплялка не работает
✓ bg переделать на что-то типа глоу. Чтобы не было глючного засвета
✓ рефакторнуть глсл main
✓ вернуть арку
✓ рефакторнуть глсл SDF
✓ убрать шафлы
✓ сделать 10 разных вариантов рендеринга, выбрать лучший.
✓ Набор удачных пресетов
*/

let s
let b
let sf, sv
let canvas
let vertices = []
let tmp
let u_bgColor, u_palette, u_colors, u_rotations, u_positions, u_sizes, u_types
let u_camAngYZ, u_camAngXZ
const typeBlock = 0, typeCyl = 1, typeBall = 2, typeBeak2x2 = 3, typeBeak2x2Flipped = 4,
    typeArc = 5, typePillar = 6, typeEye = 7
const texSolid = 0, texLayers = 1, texGyr = 2
const texNorm = 2, texAO = 3
const blocksNumMax = 60
let draft = false
let u_tick = 1e-6 // so not to turn into int
let m = [0, 0]
let maxMaxTry = 30
let u_bg_pow = RL([2, 1], .5)
let features = { symmetry: 0, studs: 0, colors: 0, height: 0, eyes: 0, aerials: 0, blocksNumber: 0 }
let height_


// 0 — textured, 1 — not textured, 2 - all blocks of the same color, 3 — raibow, 4 — gazya
let r_colorScheme = (1 - R() ** .2) * 5 | 0
console.log('r_colorScheme', r_colorScheme)

let r_studShape = R() ** 8 * 2 | 0
u_camAngYZ = .95532
u_camAngXZ = ((R() * 2 | 0) - .5) * 3.1415 / 2 - 3.1415

// let presetId = R() ** .3 * 3 | 0
let preset = RL([
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
    {
        gs: 6 + R() * 4 | 0,
        blocksNumber: 10 + R() * 20 | 0,
        fitnessFunctionNumber: 2,
        maxTry: 6,
        extra: R() * 2,
    },
    {
        gs: 6 + (R() | 0),
        blocksNumber: 10 + R() * 10 | 0,
        fitnessFunctionNumber: 0,
        maxTry: 4,
        extra: R() ** 2 * 3,
    },
    {
        gs: 4,
        blocksNumber: 3 + R() * 4 | 0,
        fitnessFunctionNumber: 0,
        maxTry: 4,
        extra: 1,
    },
], .3)

let { gs, blocksNumber, fitnessFunctionNumber, numberOfBlockTypes, maxTry, extra, } = preset
numberOfBlockTypes = 2 + R() * 2 | 0


rotArray = m => m[0].map((x, i) => m.slice().reverse().map(y => y[i]))

function preload() {
    sf = loadStrings('s.frag')
    sv = loadStrings('s.vert')
}

let blocks = [];
let groundBlock;
let blocksHeightMap;
let palette = RL([
    // // GOOD
    ["#ddd", "#888", "#555", "#222", "#aaa"],
    ["#f26b21", "#f78e31", "#fbb040", "#cbdb47", "#99ca3c", "#208b3a", "#fcec52"], // green orange
    ["#9b5de5", "#f15bb5", "#00bbf9", "#00f5d4", "#fee440"], // colorful
    ["#f1faee", "#a8dadc", "#457b9d", "#1d3557", "#e63946"], // magenta blue
    ["#50514f", "#f25f5c", "#247ba0", "#70c1b3", "#ffe066"], // lego
    ["#541388", "#d90368", "#f1e9da", "#2e294e", "#ffd400"],
    ["#1f2041", "#4b3f72", "#119da4", "#19647e", "#ffc857"],
    ["#540d6e", "#ee4266", "#f3fcf0", "#1f271b", "#ffd23f"],
    ["#e4572e", "#29335c", "#a8c686", "#669bbc", "#f3a712"],

], .5)

function placeBlocks() {
    // groundBlock = 
    // blocks.push(new Block(
    //     size: { x: 2, y: 1, z: 2 },
    //     maskTop: [[0, 1], [0, 1]],
    //     maskBottom: [[1, 1], [1, 1]],
    //     RL(colors)
    // ))

    gridSize = createVector(gs, gs, gs)
    blocksVariants = SH([
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

    ]).slice(0, numberOfBlockTypes)

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
    blocksHeightMap = Array(gridSize.x)
        .fill()
        .map(() => Array(gridSize.z).fill(0))
    // запретная карта высот. Ну, как запретная. Просто нельзя ставить деталь ножкой на
    // на клетку, если карта высот в этой клетке меньше карты запрета.
    disallowedHeightMap = Array(gridSize.x)
        .fill()
        .map(() => Array(gridSize.z).fill(0))

    for (let n = 0; n < blocksNumber; n++) {
        let maxHeight = 0
        let fitness, maxFitness = -9e9
        let bv
        let bvt
        let bvtInitial = RL(blocksVariants)
        if (n >= blocksNumber - extra && r_colorScheme != 4)
            bvtInitial = RL(blocksVariantsExtra, .7), fitnessFunctionNumber = 6, maxTry=6
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
            if (r_colorScheme == 1) bvt.texture = 0
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

            // debugger

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
                maxHeightTry + bvt.pos[2], // eyes
            ]
            fitness = fitnessFunctions[fitnessFunctionNumber]

            if (fitness > maxFitness || try_ == 0) {
                maxFitness = fitness // maxfitness не нужен, если  || try_==0
                maxHeight = maxHeightTry
                rotation = bvt.rot // он нужен вообще?
                bv = bvt
            }
        }
        if (bv) {
            bv.pos[1] = maxHeight + bv.size[1] / 2;
            if (bv.pos[1]) {
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

                features.blocksNumber++
                if (bv.pos[0] > 0)
                    features.blocksNumber++
            } else console.log('bv.pos.y is NaN')
        } else console.log('bv not defined')
    }
    console.log('N BLOCKS', blocks.length, '\n==============================')
    console.log(blocks)
    height_ = M.max(...disallowedHeightMap.flat())
    console.log('height_', height_)
    console.log('features', features)
}










function setup() {
    let size = min(windowHeight, windowWidth)
    canvas = createCanvas(size, size, WEBGL)

    // pixelDensity(1)
    let badColor = palette.pop()
    palette = SH(palette)
    palette.push(badColor)
    if (r_colorScheme == 2) palette = palette.slice(0, 2)

    placeBlocks();

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

    b = createGraphics(width, height, WEBGL)
    b.clear()
    u_sizes = blocks.map(b => b.size).flat()
    u_positions = blocks.map(b => b.pos).flat()
    u_palette = palette.map(c => color(c).levels.slice(0, 3)).flat().map(d => d / 255)
    u_colors = blocks.map(b => [b.color, b.color2, b.texture]).flat()
    u_types = blocks.map(b => b.type)
    u_rotations = blocks.map(b => b.rot)

    sf = eval('`' + sf.join('\n') + '`')
    sv = sv.join('\n')
    s = createShader(sv, sf)
}







function draw() {
    b.clear();
    b.image(canvas, width * -0.5, height * -0.5, width, height);
    clear();
    shader(s);
    s.setUniform('b', b)
    s.setUniform('t', u_tick)
    s.setUniform('positions', u_positions)
    s.setUniform('sizes', u_sizes)
    s.setUniform('rotations', u_rotations)
    s.setUniform('colors', u_colors)
    s.setUniform('palette', u_palette)
    s.setUniform('types', u_types)
    rect(0, 0, width, height)

    console.log(u_tick)
    if (u_tick++ > 5e0) {
        noLoop()
        // save(`${tokenData.hash}.png`)   
        // setTimeout(()=>location.reload(false), 2000)
    }
}