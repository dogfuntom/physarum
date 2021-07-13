console.clear();
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
    s = loadShader('s.vert', 's.frag')
    sP = loadShader('s.vert', 's.frag')
}

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
    // ["#9b5de5", "#f15bb5", "#fee440", "#00bbf9", "#00f5d4"], // colorful
    // ["#e63946", "#f1faee", "#a8dadc", "#457b9d", "#1d3557"], // magenta blue
    // ["#50514f", "#f25f5c", "#ffe066", "#247ba0", "#70c1b3"], // lego
    // ["#70d6ff", "#ff70a6", "#ff9770", "#ffd670", "#e9ff70"], //candy bright
    // ["#26547c", "#ef476f", "#ffd166", "#06d6a0", "#fffcf9"],
    // ["#ff0000","#ff8700","#ffd300","#deff0a","#a1ff0a","#0aff99","#0aefff","#147df5","#580aff","#be0aff"], // acid
    // ["#d88c9a", "#f2d0a9", "#f1e3d3", "#99c1b9", "#8e7dbe"], // dusty candy
    // ["#495867", "#577399", "#bdd5ea", "#f7f7ff", "#fe5f55"], // red gray
    ["#ff99c8", "#fcf6bd", "#d0f4de", "#a9def9", "#e4c1f9"], // candy pale
    // ["#2d3142", "#bfc0c0", "#ffffff", "#ef8354", "#4f5d75"], // gray white  orange
    // ["#07c8f9", "#09a6f3", "#0a85ed", "#0c63e7", "#0d41e1"], // blue
    // ["#f26b21", "#f78e31", "#fbb040", "#fcec52", "#cbdb47", "#99ca3c", "#208b3a"], // green orange
]




function placeBlocks() {
    // let blocksNum = 10
    // let gs = 6
    let blocksNum = 16
    let gs = 10
    // let blocksNum = 40
    // let gs = 24
    // let blocksNum = 80
    // let gs = 24

    groundBlock = new Block(createVector(gs, 1, gs), createVector(0, -.5, 0), random(colors));
    // blocks.push(groundBlock)

    gridSize = createVector(gs, gs, gs);
    blockSizes = [
        createVector(1, 1, 1),
        createVector(1, 1, 4),
        // createVector(1, 1, 8),
        createVector(2, 1, 4),
        createVector(1, 1, 2),
        createVector(2, 1, 2),
    ];

    blocksHeightMap = Array(gridSize.x)
        .fill()
        .map(() => Array(gridSize.z).fill(0));

    // chose ramdom pos X, Z of new block


    for (let n = 0; n < blocksNum; n++) {
        let blockColor = random(colors);

        const DENSE = -1
        const SPARSE = 1

        let strategy = 1//(n > blocksNum / 2) ? DENSE : SPARSE

        let maxHeight = -999 * strategy
        let blockPos
        let blockSize
        let blockSizeTry = random(blockSizes).copy()
        let tmp
        let fitness, maxFitness=-Infinity
        let rotation = floor(random(4))
        if (rotation % 2 == 0) {
            tmp = blockSizeTry.x
            blockSizeTry.x = blockSizeTry.z
            blockSizeTry.z = tmp
        }
        for (let try_ = 0; try_ < 50; try_++) {
            let blockPosTry = createVector(
                -gs / 2 + blockSizeTry.x / 2 + floor(random(gs + 1 - blockSizeTry.x)),
                0,
                -gs / 2 + blockSizeTry.z / 2 + floor(random(gs + 1 - blockSizeTry.z))
            )
            // тут можно циклы выкинуть
            let studL = 0
            let studR = 0
            let xx = Array(blockSizeTry.x).fill().map((d, i) => blockPosTry.x + i - (blockSizeTry.x - 1.) / 2)
            let zz = Array(blockSizeTry.z).fill().map((d, i) => blockPosTry.z + i - (blockSizeTry.z - 1.) / 2)
            for (let x of xx) {
                for (let z of zz) {
                    if (x >= 0) studR++;
                    else studL++;
                }
            }

            if ((studL != 0 && studR != studL) || blockSizeTry.x > gs || blockSizeTry.z > gs) { try_--; console.log('l=', studL, 'r=', studR, 'not good!'); continue }
            let maxHeightTry = 0;
            for (let x of xx) {
                for (let z of zz) {
                    maxHeightTry = max(maxHeightTry, blocksHeightMap[x + gs / 2 - .5][z + gs / 2 - .5]);
                }
            }

            // fitness = -maxHeightTry // low
            fitness = maxHeightTry // high, bn 16 gs 10
            // fitness = -Math.hypot(blockPosTry.x,maxHeightTry-10,blockPosTry.z) // mashroom
            // fitness = -abs(Math.hypot(blockPosTry.x,maxHeightTry-10,blockPosTry.z)-gs) // cage
            // fitness = -abs(Math.hypot(blockPosTry.x,maxHeightTry*2,blockPosTry.z)-gs) // cage: blocksNum = 90, gs = 16


            if (fitness > maxFitness) {
                maxFitness = fitness
                maxHeight = maxHeightTry
                blockPos = blockPosTry
                blockSize = blockSizeTry
            }
        }
        blockPos.y = maxHeight + blockSize.y / 2;
        let xx = Array(blockSize.x).fill().map((d, i) => blockPos.x + i - (blockSize.x - 1.) / 2)
        let zz = Array(blockSize.z).fill().map((d, i) => blockPos.z + i - (blockSize.z - 1.) / 2)
        for (let x of xx) {
            for (let z of zz) {
                blocksHeightMap[x + gs / 2 - .5][z + gs / 2 - .5] = maxHeight + blockSize.y
            }
        }
        let block = new Block(
            blockSize,
            blockPos.copy(),//.add(blockSize.copy().mult(.5)),
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
    pixelDensity(1)
    // randomSeed(110)
    colors = shuffle(random(colors))

    u_camAngYZ = .95532
    u_camAngXZ = PI / 4
    bg = colors.pop()
    placeBlocks();

    viewBox = { top: -1e9, bottom: 1e9, left: 1e9, right: -1e9 }
    blocks.forEach(b => {
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

    u_bgColor = color(bg).levels.slice(0, 3)
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
}




















function draw() {
    console.log(frameCount)
    b.shader(s)
    s.setUniform('u_res', [width*pixelDensity(), height*pixelDensity()])
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
    b.rect(0, 0, width, height)
    image(b, -width / 2, -height / 2, width, height)
    tmp = b
    b = bP
    bP = tmp

    tmp = s
    s = sP
    sP = tmp

    if (frameCount > 250) noLoop()
}









function mouseMoved() {
}