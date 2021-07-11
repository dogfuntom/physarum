// Редкие текстуры
// - черно белая, как у гази
// - радужная, снизу вверх
// - полоски
// - горошек
// - шумная текстура
// - раскраска нормалям или жемчуг
// - Глаз

// Детальки
// - высокие детали
// - скошенная деталька
// - шарик?
// - шпиль
// - тонкая деталька?
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// - поворот мышкой вокруг оси у. Показывать при этом урезанную версию без теней и пр

// Фичи
// - угол камеры фича
// - сдф формы
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// symmetry: what is symmetry?

// Done
// ✓ стратегия
// ✓ площадь под застройку
// ✓ оси координат в центр к детали
// ✓ 1x1 деталь
// ✓ цветовые схемы в три буквы. Штук 10
// ✓ кроп


console.clear();
const RENDERER = 'ao'// p5, ao, gi


let s
let sP
let time0 = new Date() / 1000
let seed
let b, bP
let tmp
let u_bgColor
let u_camDir
let viewBox
let positions, sizes
let u_camAngYZ
let u_camAngXZ

function preload() {
    if (RENDERER == 'ao' || RENDERER == 'gi') {
        s = loadShader('s.vert', RENDERER + '.frag')
        sP = loadShader('s.vert', RENDERER + '.frag')
    }
}

let cam;

function Block(size, position, color) {
    this.size = size.copy();
    // this.rotation = rotation.copy();
    this.position = position.copy();
    this.color = color;
}

let blocks = [];
let groundBlock;
let blockSizes;
let blocksHeightMap;
let gridSize;
let bg;
let colors = [
    // ["#ffb703", "#fb8500", "#8ecae6", "#219ebc", "#023047",],
    // ["#9b5de5", "#f15bb5", "#fee440", "#00bbf9", "#00f5d4"],
    // ["#e63946", "#f1faee", "#a8dadc", "#457b9d", "#1d3557"],
    // ["#ff6b35", "#f7c59f", "#efefd0", "#004e89", "#1a659e"],
    // ["#50514f", "#f25f5c", "#ffe066", "#247ba0", "#70c1b3"],
    // ["#70d6ff", "#ff70a6", "#ff9770", "#ffd670", "#e9ff70"],
    // ["#031d44", "#04395e", "#70a288", "#dab785", "#d5896f"],
    // ["#26547c", "#ef476f", "#ffd166", "#06d6a0", "#fffcf9"],
    // // ["#ff0000","#ff8700","#ffd300","#deff0a","#a1ff0a","#0aff99","#0aefff","#147df5","#580aff","#be0aff"],
    // ["#d88c9a", "#f2d0a9", "#f1e3d3", "#99c1b9", "#8e7dbe"],
    // ["#495867", "#577399", "#bdd5ea", "#f7f7ff", "#fe5f55"],
    // ["#132a13", "#31572c", "#4f772d", "#90a955", "#ecf39e"],
    // ["#ff99c8", "#fcf6bd", "#d0f4de", "#a9def9", "#e4c1f9"],
    // ["#2d3142", "#bfc0c0", "#ffffff", "#ef8354", "#4f5d75"],
    // ["#07c8f9", "#09a6f3", "#0a85ed", "#0c63e7", "#0d41e1"],
    ["#f26b21", "#f78e31", "#fbb040", "#fcec52", "#cbdb47", "#99ca3c", "#208b3a"],
]




function placeBlocks() {
    // let blocksNum = 10
    // let gs = 6
    let blocksNum = 20
    let gs = 8
    // let blocksNum = 40
    // let gs = 12
    // let blocksNum = 80
    // let gs = 24

    groundBlock = new Block(createVector(gs, 1, gs), createVector(0, -.5, 0), random(colors));
    blocks.push(groundBlock)

    gridSize = createVector(gs, gs, gs);
    blockSizes = [
        createVector(1, 1, 1),
        // createVector(1, 1, 6),
        // createVector(6, 1, 1),
        // // createVector(1, 1, 10),
        // // createVector(10, 1, 1),
        // createVector(4, 1, 2),
        createVector(1, 1, 2),
        createVector(2, 1, 1),
        // createVector(2, 1, 4),
        // createVector(2, 1, 2),
    ];

    blocksHeightMap = Array(gridSize.x)
        .fill()
        .map(() => Array(gridSize.z).fill(0));

    // chose ramdom pos X, Z of new block
    for (let n = 0; /*blocks.length < 10*/ n < blocksNum; n++) {
        let blockColor = random(colors);

        const DENSE = -1
        const SPARSE = 1

        let strategy = (n > blocksNum / 2) ? DENSE : SPARSE

        let maxHeight = -999 * strategy
        let blockPos
        let blockSize
        let blockSizeTry = random(blockSizes).copy()
        for (let try_ = 0; try_ < 30; try_++) {
            let blockPosTry = createVector(floor(random(- blockSizeTry.x / 2, gs / 2 - blockSizeTry.x + 1)), 0, floor(random(-gs / 2, gs / 2 - blockSizeTry.z)));
            console.log('trying', blockPosTry, blockSizeTry)
            // тут можно циклы выкинуть
            let studL = 0
            let studR = 0
            for (let x = blockPosTry.x; x < blockPosTry.x + blockSizeTry.x; x++) {
                for (let z = blockPosTry.z; z < blockPosTry.z + blockSizeTry.z; z++) {
                    if (x >= 0) studR++;
                    else studL++;
                }
            } console.log('l=', studL, 'r=', studR)
            if ((studL != 0 && studR != studL) || blockSizeTry.x > gs || blockSizeTry.z > gs) { try_--; console.log('l=', studL, 'r=', studR, 'not good!'); continue }
            let maxHeightTry = 0;
            for (let x = blockPosTry.x; x < blockPosTry.x + blockSizeTry.x; x++) {
                for (let z = blockPosTry.z; z < blockPosTry.z + blockSizeTry.z; z++) {
                    maxHeightTry = max(maxHeightTry, blocksHeightMap[x + gs / 2][z + gs / 2]);
                }
            }
            if (maxHeightTry * strategy > maxHeight * strategy) {
                maxHeight = maxHeightTry
                blockPos = blockPosTry
                blockSize = blockSizeTry
                console.log('good!')
            }
        }
        blockPos.y = maxHeight;
        console.log('Proceeding with ', blockPos, blockSize)
        for (let x = blockPos.x; x < blockPos.x + blockSize.x; x++) {
            for (let z = blockPos.z; z < blockPos.z + blockSize.z; z++) {
                blocksHeightMap[x + gs / 2][z + gs / 2] = maxHeight + blockSize.y;
            }
        }
        let block = new Block(
            blockSize,
            blockPos.copy().add(blockSize.copy().mult(.5)),
            blockColor
        );
        blocks.push(block);
    }
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
    let c = createCanvas(500, 500, WEBGL)
    // randomSeed(110)
    colors = shuffle(random(colors))

    u_camAngYZ = PI / 4
    u_camAngXZ = PI / 4
    bg = colors.pop()
    placeBlocks();


    // Теперь найдём самую верхнюю и самую нижнюю серёдку блока в координатах камеры
    // для этого у каждого блока координаты цента (вектор) повёрнём на угол А, потом на угол Б.
    // будем трекать самый левый, самый правый, самый нижний и самый верхний точки. Это и будет вьюпорт.
    viewBox = { top: -1e9, bottom: 1e9, left: 1e9, right: -1e9 }
    blocks.forEach(b => {
        // console.log(Object.values(b.position))
        let s = b.size.copy().mult(.5)
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
            pos.add(b.position)

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
            pos.add(b.position)
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

    // console.log(viewBox)
    if (RENDERER == 'p5') {
        cam = createCamera();
        cam.ortho(-200, 200, -200, 200, 0.1, 10000);
        setCamera(cam);
        cam.setPosition(300, -300, 300);
        background(bg);
        noStroke();
        cam.setPosition(
            300,// + (mouseX - width / 2) * 8,
            -300,// + (mouseY - height / 2) * 8,
            300
        );
        cam.lookAt(0, 0, 0);
        ambientLight(55);
        lights(10);
        blocks.forEach((b) => { b.log(); b.draw() });
    }
    else if (RENDERER == 'ao' || RENDERER == 'gi') {
        u_bgColor = color(bg).levels.slice(0, 3)
        pixelDensity(1)
        // frameRate(1)
        b = createGraphics(width, height, WEBGL)
        bP = createGraphics(width, height, WEBGL)
        b.background('red')
        b.circle(0, 0, 100)
        bP.background('green')
        bP.circle(0, 0, 100)
        b.noStroke()
        bP.noStroke()
        positions = Array(300)
            .fill()
            .map((d, i) => i < blocks.length ? [
                blocks[i].position.x,
                blocks[i].position.y,
                blocks[i].position.z] : [0, 0, 0]
            ).flat()
        sizes = Array(300)
            .fill()
            .map((d, i) => i < blocks.length ? [
                blocks[i].size.x,
                blocks[i].size.y,
                blocks[i].size.z] : [0, 0, 0]
            ).flat()
        colors = Array(300)
            .fill()
            .map((d, i) => i < blocks.length ? color(blocks[i].color).levels.slice(0, 3) : [0, 0, 0]
            ).flat()
        // console.log(positions)

    }
}




















function draw() {
    console.log(frameCount)
    if (RENDERER == 'ao' || RENDERER == 'gi') {
        // background('yellow')
        b.shader(s)
        s.setUniform('u_res', [width, height])
        // console.log(width, height)
        s.setUniform('t', new Date() / 1000 - time0)
        s.setUniform('tick', frameCount - 1)
        s.setUniform('backbuffer', bP)
        s.setUniform('blocksNumber', blocks.length)
        s.setUniform('positions', positions)
        s.setUniform('sizes', sizes)
        s.setUniform('colors', colors)
        s.setUniform('gridSize', gridSize.x)
        s.setUniform('bgColor', u_bgColor)
        s.setUniform('camScale', viewBox.scale / 1)
        s.setUniform('camOffset', [viewBox.offset.x, viewBox.offset.y])
        s.setUniform('camAng', [u_camAngYZ, u_camAngXZ])
        // s.setUniform('arr', Array(1024).fill(2))
        // s.setUniform('pos', Array(1021).fill(0).map(d=>[1,2,3]))

        // let poss = [random(-4,4),random(-4,4),random(-4,4)]
        // s.setUniform('posf', [random(-4,4),random(-4,4),random(-4,4),random(-4,4),random(-4,4)])
        // s.setUniform('arr_', Array(10).fill(3).map(d=>[1,2,3]))
        // s.setUniform('arr3', Array(1021).fill(4).map(d=>[1,2,3]))
        b.rect(0, 0, width, height)
        image(b, -width / 2, -height / 2, width, height)
        tmp = b
        b = bP
        bP = tmp

        tmp = s
        s = sP
        sP = tmp

    }
    // circle(0,0,4)
    if (frameCount > 99) noLoop()
}









function mouseMoved() {
    // u_camAngXZ = mouseX / width * TAU
    // u_camAngYZ = mouseY / width * TAU
    // console.log(mouseX, u_camAngXZ)

    // // Теперь найдём самую верхнюю и самую нижнюю серёдку блока в координатах камеры
    // // для этого у каждого блока координаты цента (вектор) повёрнём на угол А, потом на угол Б.
    // // будем трекать самый левый, самый правый, самый нижний и самый верхний точки. Это и будет вьюпорт.
    // viewBox = { top: -1e9, bottom: 1e9, left: 1e9, right: -1e9 }
    // blocks.forEach(b => {
    //     // console.log(Object.values(b.position))
    //     let s = b.size.copy().mult(.5)
    //     let vertices = [
    //         createVector(s.x, s.y, s.z),
    //         createVector(-s.x, s.y, s.z),
    //         createVector(s.x, s.y, -s.z),
    //         createVector(-s.x, s.y, -s.z),
    //         createVector(s.x, -s.y, s.z),
    //         createVector(-s.x, -s.y, s.z),
    //         createVector(s.x, -s.y, -s.z),
    //         createVector(-s.x, -s.y, -s.z),
    //     ]
    //     vertices.forEach(v => {
    //         let pos = v.copy()
    //         pos.add(b.position)
    //         // pos.add(.5)
    //         // pos.add(b.size.copy().mult(.5))
    //         // console.log(pos)

    //         // pos.z = -pos.z
    //         let xz = rot([pos.x, pos.z], -u_camAngXZ)
    //         pos.x = xz[0]
    //         pos.z = xz[1]
    //         let yz = rot([pos.y, pos.z], -u_camAngYZ) // z is mirrored
    //         pos.y = yz[0]
    //         pos.z = yz[1]
    //         // console.log('after', pos)
    //         if(pos.x<viewBox.left)viewBox.left=pos.x
    //         if (pos.x > viewBox.right) viewBox.right = pos.x
    //         if (pos.y < viewBox.bottom) viewBox.bottom = pos.y
    //         if (pos.y > viewBox.top) viewBox.top = pos.y
    //         if(b.color=='#00f')console.log(pos,viewBox)
    //     })
    // })
    // // viewBox.left = -viewBox.right
    // viewBox.width = viewBox.right - viewBox.left
    // viewBox.height = viewBox.top - viewBox.bottom
    // viewBox.scale = max(viewBox.width/1.8, viewBox.height/1.8, 1)
    // viewBox.offset = { x: viewBox.left + viewBox.width / 2, y: viewBox.bottom + viewBox.height / 2 }
    // // viewBox.offset = { x: 0, y: 0 }

}