console.clear();
let S, ss, R, t
S = Uint32Array.from([0, 1, ss = t = 2, 3].map(i => parseInt(tokenData.hash.substr(i * 8 + 2, 8), 16))); R = _ => (t = S[3], S[3] = S[2], S[2] = S[1], S[1] = ss = S[0], t ^= t << 11, S[0] ^= (t ^ t >>> 8) ^ (ss >>> 19), S[0] / 2 ** 32); 'tx piter'
let RL = (ar) => ar[ar.length * R() | 0]

// Цикл иногда повисает без признаков жизни


/*

Баги
- рефакторнуть глсл
- bg переделать на что-то типа глов. Чтобы не было глючного засвета
- Пингвинчик!
- Кодгольфнуть глсл
- Кодгольфнуть жс
- Аватар фит (квадратные штуки слишком большие)
// - Зум иногда ломается

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
- Сейчас у всех деталей есть одна и только одна ось симметрии. Но может быть и две!
- сделать предварительную генерировалку рандомности. Достать список рандомностей и — вперёд

✓ сделать 10 разных вариантов рендеринга, выбрать лучший.
✓ Набор удачных пресетов
*/

let s, sP
let b, bP
let sf, sv
let canvas
let tmp
let u_bgColor, u_palette, u_colors, u_rotations, u_positions, u_sizes, u_types
let u_camAngYZ, u_camAngXZ
const typeBlock = 0, typeCyl = 1, typeBall = 2, typeBeak2x2 = 3, typeBeak2x2Flipped = 4, typeArc = 5, typePillar = 6
const texSolid = 0, texLayers = 1, texGyr = 2
const texNorm = 2, texAO = 3
const blocksNumMax = 100
let draft = false
let u_tick = 0
let m = [0, 0]
let maxMaxTry = 30

// // The Great Randomizer
// let gs = 4 + R() * 10 | 0
// console.log('gs', gs)
// let blocksNumber = 4//Math.min(4 + gs * gs * R(), blocksNumMax)
// console.log('blocksNumber', blocksNumber)
// let fitnessFunctionNumber = R() * 5 | 0
// console.log('fitnessFunctionNumber', fitnessFunctionNumber)
// let numberOfBlockTypes = 1 + (R() * 7 | 0)
// console.log(numberOfBlockTypes)

let r_oneColor = R() * 2 | 0 // all blocks of the same color

let presetId = R() * 2 | 0
let presets = [
    {
        gs: 7 + (R() | 0),
        blocksNumber: 14,
        fitnessFunctionNumber: 1,
        numberOfBlockTypes: 4,
        maxTry: 5,
        extra: 0,
    },
    {
        gs: 4 + (R() * 4 | 0),
        blocksNumber: 14,
        fitnessFunctionNumber: 2,
        numberOfBlockTypes: 4,
        maxTry: 10,
        extra: 1,
    },
]

let { gs, blocksNumber, fitnessFunctionNumber, numberOfBlockTypes, maxTry, } = presets[presetId]

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
    ["#9b5de5", "#f15bb5", "#fee440", "#00bbf9", "#00f5d4"], // colorful
    ["#e63946", "#f1faee", "#a8dadc", "#457b9d", "#1d3557"], // magenta blue
    ["#50514f", "#f25f5c", "#ffe066", "#247ba0", "#70c1b3"], // lego
    ["#495867", "#577399", "#bdd5ea", "#f7f7ff", "#fe5f55"], // red gray
    ["#f26b21", "#f78e31", "#fbb040", "#fcec52", "#cbdb47", "#99ca3c", "#208b3a"], // green orange

    // BAD
    // ["#70d6ff", "#ff70a6", "#ff9770", "#ffd670", "#e9ff70"], //candy bright
    // ["#26547c", "#ef476f", "#ffd166", "#06d6a0", "#fffcf9"],
    // ["#ff0000", "#ff8700", "#ffd300", "#deff0a", "#a1ff0a", "#0aff99", "#0aefff", "#147df5", "#580aff", "#be0aff"], // acid
    // ["#d88c9a", "#f2d0a9", "#f1e3d3", "#99c1b9", "#8e7dbe"], // dusty candy
    // ["#2d3142", "#bfc0c0", "#ef8354", "#4f5d75"], // gray white  orange
    // ["#ff99c8", "#fcf6bd", "#d0f4de", "#a9def9", "#e4c1f9"], // candy pale
    // ["#07c8f9", "#09a6f3", "#0a85ed", "#0c63e7", "#0d41e1"], // blue

    // NOT tested
])

function placeBlocks() {
    // let blocksNum = 16
    // let gs = 10
    // let blocksNum = 40
    // let gs = 10
    // let blocksNum = 80
    // let gs = 24

    // groundBlock = 
    // blocks.push(new Block(
    //     size: { x: 2, y: 1, z: 2 },
    //     maskTop: [[0, 1], [0, 1]],
    //     maskBottom: [[1, 1], [1, 1]],
    //     RL(colors)
    // ))

    gridSize = createVector(gs, gs, gs)
    blocksVariants = shuffle([
        { // beak
            size: [2, 1, 2],
            maskTop: [[0, 1], [0, 1]],
            maskBottom: [[1, 1], [1, 1]],
            type: typeBeak2x2,
        },
        { // beak flipped
            size: [2, 1, 2],
            maskTop: [[1, 1], [1, 1]],
            maskBottom: [[0, 1], [0, 1]],
            type: typeBeak2x2Flipped,
        },
        { // 4x2
            size: [2, 1, 4],
            maskTop: [[1, 1, 1, 1,], [1, 1, 1, 1,]],
            maskBottom: [[1, 1, 1, 1,], [1, 1, 1, 1,]],
            type: typeBlock,
        },
        { // 3x2
            size: [2, 1, 3],
            maskTop: [[1, 1, 1,], [1, 1, 1,]],
            maskBottom: [[1, 1, 1,], [1, 1, 1,]],
            type: typeBlock,
        },
        { // 6x1
            size: [1, 1, 6],
            maskTop: [[1, 1, 1, 1, 1, 1,]],
            maskBottom: [[1, 1, 1, 1, 1, 1,]],
            type: typeBlock,
        },
        { // arc
            size: [1, 2, 3],
            maskTop: [[1, 1, 1]],
            maskBottom: [[1, 0, 1]],
            type: typeArc,
        },
        { // line
            size: [1, 1, 3],
            maskTop: [[1, 1, 1]],
            maskBottom: [[1, 1, 1]],
            type: typeBlock,
        },
        { // block
            size: [2, 1, 2],
            maskTop: [[1, 1], [1, 1]],
            maskBottom: [[1, 1], [1, 1]],
            type: typeBlock,
        },
        { // 1x1
            size: [1, 1, 1],
            maskTop: [[1]],
            maskBottom: [[1]],
            type: typeBlock,
        },
        // { // 1x1 but high
        //     size: [1, 4, 1],
        //     maskTop: [[1]],
        //     maskBottom: [[1]],
        //     type: typeBlock,
        // },
        // { // Pillar
        //     size: [1, 8, 1],
        //     maskTop: [[0]],
        //     maskBottom: [[1]],
        //     type: typePillar,
        // },
        // { // ball
        //     size: createVector(1, 1, 1),
        //     maskTop: [[0]],
        //     maskBottom: [[1]],
        //     type: typeBall,
        // symX: true,
        // },
    ]).slice(0, numberOfBlockTypes)
    // console.log(blocksVariants)

    let blocksVariantsExtra

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

    // цикл гарантирует, что появится Н блоков 
    for (let n = 0; n < blocksNumber; n++) {
        let maxHeight = 0
        let fitness, maxFitness = -9e9
        let bv
        let bvt
        let bvtInitial = RL(blocksVariants)

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
            bvt.texture = R() * R() * 3 | 0
            // попался! bvt у нас сохранялся между выполнениями и портился от запуска к запуску.
            // надо или его копию делать, или ещё чего.

            // есть ли смысл тут сделать глубокую копию? Есть. И всё в ней хранить.
            bvt.symX = true
            bvt.rot = floor(R() * 4) // (blockSizeTry.x%2==0 && blockSizeTry.z%2==0)?floor(R(4)):floor(R(2))*2

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
                    // хтя в будущем можно доработать. Ось симметрии должна поумнеть, тогда и на чётность мЖно буде твнимания не обращать
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
                    if (bvt.maskBottom[bx][bz] == 1) {
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
                -Math.hypot(bvt.pos[0], bvt.pos[2]), // high, bn 16 gs 10
                -maxHeightTry, // low
                -Math.hypot(bvt.pos[0], maxHeightTry - 10, bvt.pos[2]), // mashroom
                -abs(Math.hypot(bvt.pos[0], maxHeightTry - 10, bvt.pos[2]) - gs), // cage
                -abs(Math.hypot(bvt.pos[0], maxHeightTry * 2, bvt.pos[2]) - gs), // cage: blocksNum = 90, gs = 16
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
                        if (bv.maskTop[bx][bz] == 0) blocksHeightMap[x + gs / 2 - .5][z + gs / 2 - .5] = -Infinity
                        disallowedHeightMap[x + gs / 2 - .5][z + gs / 2 - .5] = maxHeight + bv.size[1]
                    }
                }
                blocks.push(bv)
            } else console.log('bv.pos.y is NaN')
        } else console.log('bv not defined')
    }
    console.log('N BLOCKS', blocks.length, '\n==============================')
}











let rot = (vec, ang) => {
    var cos = Math.cos(ang);
    var sin = Math.sin(ang);
    return new Array(
        vec[0] * cos - vec[1] * sin,
        vec[0] * sin + vec[1] * cos
    )
}











function setup() {
    canvas = createCanvas(500, 500, WEBGL)

    sf = sf.join('\n')
    sv = sv.join('\n')
    s = createShader(sv, sf)

    pixelDensity(1)
    palette = shuffle(palette)
    if (r_oneColor == 1) palette = palette.slice(0, 2)
    console.log(palette, 'palette')

    u_camAngYZ = .95532
    // u_camAngXZ = ((R() * 3 | 0) - 1) * PI / 4 // includes en-face
    u_camAngXZ = ((R() * 2 | 0) - 1) * PI / 2 - PI / 4
    placeBlocks();

    viewBox = { top: -1e9, bottom: 1e9, left: 1e9, right: -1e9 }
    blocks.forEach(b => {

        let s = { x: b.size[0] / 2, y: b.size[1] / 2, z: b.size[2] / 2, }
        let vertices = [
            createVector(s.x, s.y, s.z),
            createVector(-s.x, s.y, s.z),
            createVector(s.x, s.y, -s.z),
            createVector(-s.x, s.y, -s.z),
            createVector(s.x, -s.y, s.z),
            createVector(-s.x, -s.y, s.z),
            createVector(s.x, -s.y, -s.z),
            createVector(-s.x, -s.y, -s.z),
        ]
        vertices.forEach(v => {
            let pos = v.copy()
            console.log(b)
            pos.x += b.pos[0]
            pos.y += b.pos[1]
            pos.z += b.pos[2]

            let xz = rot([pos.x, pos.z], -u_camAngXZ)
            pos.x = xz[0]
            pos.z = xz[1]
            let yz = rot([pos.y, pos.z], -u_camAngYZ) // z is mirrored
            pos.y = yz[0]
            pos.z = yz[1]
            if (pos.x < viewBox.left) viewBox.left = pos.x
            if (pos.x > viewBox.right) viewBox.right = pos.x
            if (pos.y < viewBox.bottom) viewBox.bottom = pos.y
            if (pos.y > viewBox.top) viewBox.top = pos.y


            // для отзеркаленного
            pos = v.copy()
            pos.x += b.pos[0]
            pos.y += b.pos[1]
            pos.z += b.pos[2]
            pos.x *= -1
            xz = rot([pos.x, pos.z], -u_camAngXZ)
            pos.x = xz[0]
            pos.z = xz[1]
            yz = rot([pos.y, pos.z], -u_camAngYZ) // z is mirrored
            pos.y = yz[0]
            pos.z = yz[1]
            if (pos.x < viewBox.left) viewBox.left = pos.x
            if (pos.x > viewBox.right) viewBox.right = pos.x
            if (pos.y < viewBox.bottom) viewBox.bottom = pos.y
            if (pos.y > viewBox.top) viewBox.top = pos.y
        })
    })
    // viewBox.left = -viewBox.right
    viewBox.width = viewBox.right - viewBox.left
    viewBox.height = viewBox.top - viewBox.bottom
    viewBox.scale = max(viewBox.width / 1.8, viewBox.height / 1.8, 1)
    viewBox.offset = { x: viewBox.left + viewBox.width / 2, y: viewBox.bottom + viewBox.height / 2 }
    // viewBox.offset = { x: 0, y: 0 }

    b = createGraphics(width, height, WEBGL)
    b.clear()
    u_sizes = blocks.map(b => b.size).flat()
    u_positions = blocks.map(b => b.pos).flat()
    u_palette = palette.map(c => color(c).levels.slice(0, 3)).flat().map(d => d / 255)
    u_colors = blocks.map(b => [b.color, b.color2, b.texture]).flat()
    u_types = blocks.map(b => b.type)
    u_rotations = blocks.map(b => b.rot)
}




















function draw() {
    b.image(canvas, width * -0.5, height * -0.5, width, height);
    shader(s);
    // console.log(frameCount)
    s.setUniform('u_res', [width * pixelDensity(), height * pixelDensity()])
    s.setUniform('t', u_tick)
    s.setUniform('backbuffer', b)
    s.setUniform('blocksNumber', blocks.length)
    s.setUniform('positions', u_positions)
    s.setUniform('sizes', u_sizes)
    s.setUniform('rotations', u_rotations)
    s.setUniform('colors', u_colors)
    s.setUniform('palette', u_palette)
    s.setUniform('types', u_types)
    s.setUniform('gridSize', gridSize.x)
    s.setUniform('camScale', viewBox.scale / 1)
    s.setUniform('camOffset', [viewBox.offset.x, viewBox.offset.y])
    s.setUniform('camAng', [u_camAngYZ, u_camAngXZ - (m[0] * 2 - 1) * TAU])
    // s.setUniform('mouse', [mouseX / width, -mouseY / height])
    rect(0, 0, width, height)

    if (u_tick++ > 5e1)
        noLoop()
}




function mouseDragged() {
    u_tick = 0
    // m[0] = (mouseX / width * 32 | 0) / 32
    m[0] = mouseX / width
    loop()
}