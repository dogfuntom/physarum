

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
    this.draw = (strokeOpacity = 255) => {
        // rotateY(PI / 2);
        // resetMatrix()
        push();
        // rotateY(frameCount / 100);
        // rotateY(PI/4);
        let sk = 15;
        scale(sk, -sk, sk);
        translate(
            -gridSize.x * 0.5 + this.position.x + this.size.x * 0.5,
            -gridSize.y * 0.5 + this.position.y + this.size.y * 0.5,
            -gridSize.z * 0.5 + this.position.z + this.size.z * 0.5
        );
        // translate(0, 0, 0);

        fill(this.color);
        box(this.size.x - 0.03, this.size.y - 0.03, this.size.z - 0.03);
        stroke(0);
        strokeWeight(2.5);
        push();
        noFill();
        box(this.size.x, this.size.y, this.size.z);
        pop();
        // strokeCap(ROUND)
        for (let x = 0; x < this.size.x; x++) {
            for (let z = 0; z < this.size.z; z++) {
                push();
                translate(
                    -this.size.x * 0.5 + x + 0.5,
                    0.6,
                    -this.size.z * 0.5 + z + 0.5
                );
                // cylinder(0.35, this.size.y + 0.2);
                cyl(strokeOpacity);
                // box(.5, .2, .5);
                pop();
            }
        }
        // resetMatrix();
        pop();
    };
    this.log = () => {
        console.log(
            "pos",
            this.position.x,
            this.position.y,
            this.position.z,
            "size",
            this.size.x,
            this.size.y,
            this.size.z
        );
    };
}





















let blocks = [];
let groundBlock;
let blockSizes;
let blocksHeightMap;
let gridSize;
let bg;
let colors = ["#ffb703", "#fb8500", "#8ecae6", "#219ebc", "#023047",]






















function placeBlocks() {
    // groundBlock = new Block(createVector(10, 1, 10), createVector(-10, -2, -10));
    let gs = floor(random(8,20)/2)*2
    gridSize = createVector(gs, gs, gs);
    blockSizes = [
        createVector(1, 1, 1),
        // createVector(1, 1, 6),
        createVector(4, 1, 2),
        // createVector(1, 1, 2),
        // createVector(2, 1, 1),
        // createVector(1, 1, 2),
        createVector(2, 1, 4),
        // createVector(2, 1, 2),
    ];

    // blocks.push(new Block(createVector(1,1,1),createVector( 10,  0,  0),'#f00'))
    // blocks.push(new Block(createVector(1,1,1),createVector(-10,  0,  0),'#f00'))
    // blocks.push(new Block(createVector(1,1,1),createVector(  0, 10,  0),'#0f0'))
    // blocks.push(new Block(createVector(1,1,1),createVector(  0,-10,  0),'#0f0'))
    // blocks.push(new Block(createVector(1,1,1),createVector(  0,  0, 10),'#00f'))
    // blocks.push(new Block(createVector(1,1,1),createVector(  0,  0,-10),'#00f'))
    // return

    blocksHeightMap = Array(gridSize.x)
        .fill()
        .map(() => Array(gridSize.z).fill(0));

    // chose ramdom pos X, Z of new block
    for (let n = 0; /*blocks.length < 10*/ n < random(100); n++) {
        let blockColor = random(colors);

        const COMPACT = -1
        const SPARSE = 1

        let strategy = COMPACT

        let blockSize = random(blockSizes).copy();
        let maxHeight = -999 * strategy
        let blockPos
        for (let try_ = 0; try_ < 1; try_++) {
            let maxHeightTry = 0;
            let blockPosTry = createVector(floor(random(- blockSize.x / 2, gs / 2 - blockSize.x + 1)), 0, floor(random(-gs / 2, gs / 2 - blockSize.z)));
            // Array(1000).fill().forEach(()=>console.assert(floor(random(- blockSize.x / 2, gs / 2 - blockSize.x))!=0))
            // blockPos.x = - blockPos.x - blockSize.x;
            for (let x = blockPosTry.x; x < blockPosTry.x + blockSize.x; x++) {
                for (let z = blockPosTry.z; z < blockPosTry.z + blockSize.z; z++) {
                    maxHeightTry = max(maxHeightTry, blocksHeightMap[x + gs / 2][z + gs / 2]);
                }
            }
            if (maxHeightTry * strategy > maxHeight * strategy) {
                maxHeight = maxHeightTry
                blockPos = blockPosTry
            }
        }
        blockPos.y = maxHeight;
        // if (blockPos.x == 0) console.log(blockPos, '00000000')

        let studL = 0
        let studR = 0


        for (let x = blockPos.x; x < blockPos.x + blockSize.x; x++) {
            for (let z = blockPos.z; z < blockPos.z + blockSize.z; z++) {
                if (x >= 0) studR++;
                else studL++;
            }
        }
        // console.log(blocksHeightMap)


        // //     // три кейса. деталь посерёдке. деталь сбоку. деталь неудачно легла.
        // //     // if(studR!=studL || studC != studF) continue

        //если лежит по одну сторону от осей или если ровно посерёдке
        // // let len = blockPos.copy().sub(gridSize.x/2).mag()
        if ((studL == 0 || studR == studL)/* && len < gs/2*/) {
            // console.assert(studL==0||studL==studR, blockPos, blockSize)
            for (let x = blockPos.x; x < blockPos.x + blockSize.x; x++) {
                for (let z = blockPos.z; z < blockPos.z + blockSize.z; z++) {
                    blocksHeightMap[x + gs / 2][z + gs / 2] = maxHeight + blockSize.y;
                }
            }
            //     let block = new Block(blockSize, blockPos, blockColor);
            //     blocks.push(block);
            //     // если не по центру, добавляем такой же симметричный
            //     if (studR * studL == 0) {
            //         // console.log("------");
            //         // console.log(blockSize.x, "size");
            //         // console.log(blockPos.x, "before");
            //         console.log(blockPos)
            //         // blockPos.x = gridSize.x - 1 - blockPos.x - blockSize.x + 1;
            //         blockPos.x = - blockPos.x - blockSize.x;
            //         console.log(blockPos)
            //         for (let x = blockPos.x; x < blockPos.x + blockSize.x; x++) {
            //             for (let z = blockPos.z; z < blockPos.z + blockSize.z; z++) {
            //                 console.log(x+gs/2,z+gs/2,blocksHeightMap)
            //                 blocksHeightMap[x+gs/2][z+gs/2] = maxHeight + blockSize.y;
            //             }
            //         }


            // blocks.push(new Block(createVector(1, 1, 4), createVector(0, 2, 0), '#f0f'))
            // blockSize = createVector(2, 1, 1)
            // blockPos = createVector(-1, 0, 0)
            // blockColor='pink'
        

            let block = new Block(blockSize, blockPos.copy().add(blockSize.copy().mult(.5)), blockColor);
            blocks.push(block);
            //     }
        }
    }
}

function cyl(strokeOpacity) {
    // background('red')
    let r = 0.29,
        h = 0.19;
    let st = 0.05;
    push();
    noStroke();
    cylinder(r - st / 2.2, h);
    push();
    translate(0, h / 2, 0);
    rotateX(PI / 2);
    fill(0, strokeOpacity);
    // specularMaterial(0, 0, 0, .5)
    torus(r, st / 2);
    pop();
    push();
    translate(0, -h / 2, 0);
    rotateX(PI / 2);
    fill(0, strokeOpacity);
    torus(r, st / 2);
    pop();
    // let angle = atan2(cam.eyeZ,cam.eyeX)
    push();
    rotateY(PI / 4);
    translate(r, 0, 0);
    fill(0, strokeOpacity);
    cylinder(st / 2, h);
    pop();
    push();
    rotateY(PI / 4 + PI);
    translate(r, 0, 0);
    fill(0, strokeOpacity);
    cylinder(st / 2, h);
    pop();
    pop();
}





let rot = (vec, ang) => {
    // ang = -ang * (Math.PI/180);
    var cos = Math.cos(ang);
    var sin = Math.sin(ang);
    return new Array(
        vec[0] * cos - vec[1] * sin,
        vec[0] * sin + vec[1] * cos
    )
}





function setup() {
    let c = createCanvas(500, 500, WEBGL)
    // randomSeed(11)
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
            // pos.add(.5)
            // pos.add(b.size.copy().mult(.5))
            // console.log(pos)

            // pos.z = -pos.z
            let xz = rot([pos.x, pos.z], -u_camAngXZ)
            pos.x = xz[0]
            pos.z = xz[1]
            let yz = rot([pos.y, pos.z], -u_camAngYZ) // z is mirrored
            pos.y = yz[0]
            pos.z = yz[1]
            // console.log('after', pos)
            if(pos.x<viewBox.left)viewBox.left=pos.x
            if (pos.x > viewBox.right) viewBox.right = pos.x
            if (pos.y < viewBox.bottom) viewBox.bottom = pos.y
            if (pos.y > viewBox.top) viewBox.top = pos.y


            pos = v.copy()
            pos.add(b.position)
            pos.x*=-1
            // pos.add(.5)
            // pos.add(b.size.copy().mult(.5))
            // console.log(pos)

            // pos.z = -pos.z
            xz = rot([pos.x, pos.z], -u_camAngXZ)
            pos.x = xz[0]
            pos.z = xz[1]
            yz = rot([pos.y, pos.z], -u_camAngYZ) // z is mirrored
            pos.y = yz[0]
            pos.z = yz[1]
            // console.log('after', pos)
            if(pos.x<viewBox.left)viewBox.left=pos.x
            if (pos.x > viewBox.right) viewBox.right = pos.x
            if (pos.y < viewBox.bottom) viewBox.bottom = pos.y
            if (pos.y > viewBox.top) viewBox.top = pos.y
        })
    })
    // viewBox.left = -viewBox.right
    viewBox.width = viewBox.right - viewBox.left
    viewBox.height = viewBox.top - viewBox.bottom
    viewBox.scale = max(viewBox.width/1.8, viewBox.height/1.8, 1)
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
    // console.log('hasd')
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
        s.setUniform('camScale', viewBox.scale)
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
    // if (frameCount > 9) noLoop()
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