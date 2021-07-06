console.clear();
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

function placeBlocks() {
  // groundBlock = new Block(createVector(10, 1, 10), createVector(-10, -2, -10));
  gridSize = createVector(20, 10, 20);
  blockSizes = [
    createVector(1, 1, 6),
    createVector(1, 1, 2),
    createVector(2, 1, 1),
    createVector(1, 1, 2),
    createVector(2, 1, 4),
    createVector(4, 1, 2),
    createVector(2, 1, 2),
  ];

  blocksHeightMap = Array(gridSize.x)
    .fill()
    .map(() => Array(gridSize.z).fill(0));

  // chose ramdom pos X, Z of new block
  for (let n = 0; n < random(100)+50; n++) {
    let blockColor = random(["#8ecae6", "#219ebc", "#ffb703", "#fb8500"]);

    let blockSize = random(blockSizes).copy();
    // let blockPos = createVector(0, 0, 0);
    let blockPos = createVector(
      floor(random(0, gridSize.x - blockSize.x)),
      0,
      floor(random(0, gridSize.z - blockSize.z))
    );
    // looking for max height
    let maxHeight = 0;
    if (blockPos.x + blockSize.x > gridSize.x) console.log(x, z, "x, z");
    for (let x = blockPos.x; x < blockPos.x + blockSize.x; x++) {
      for (let z = blockPos.z; z < blockPos.z + blockSize.z; z++) {
        // console.log("----");
        // console.log(blockPos.x, blockSize.x, "blockPos.x, blockSize.x");
        // console.log(blockPos.z, blockSize.z, "blockPos.z, blockSize.z");
        // console.log(maxHeight, x, z, blocksHeightMap[x][z], "maxHeight, x, z, blocksHeightMap[x][z]");

        maxHeight = max(maxHeight, blocksHeightMap[x][z]);
      }
    }
    blockPos.y = maxHeight + blockSize.y;

    // если деталь несимметрично пересекает ось Х, не пускаем её.
    // симметрично это значит, пипок слева и справа одинаковое число
    let studL = (studR = 0);
    // let studC=studF=0
    for (let x = blockPos.x; x < blockPos.x + blockSize.x; x++) {
      for (let z = blockPos.z; z < blockPos.z + blockSize.z; z++) {
        if (x >= gridSize.x / 2) studR++;
        else studL++;
      }
    }

    //     // три кейса. деталь посерёдке. деталь сбоку. деталь неудачно легла.
    //     // if(studR!=studL || studC != studF) continue

    //если лежит по одну сторону от осей или если ровно посерёдке
    if (studR * studL == 0 || studR == studL) {
      for (let x = blockPos.x; x < blockPos.x + blockSize.x; x++) {
        for (let z = blockPos.z; z < blockPos.z + blockSize.z; z++) {
          blocksHeightMap[x][z] = maxHeight + blockSize.y;
        }
      }
      let block = new Block(blockSize, blockPos, blockColor);
      blocks.push(block);
      // если не по центу, добавляе такой же симметричный
      if (studR * studL == 0) {
        // console.log("------");
        // console.log(blockSize.x, "size");
        // console.log(blockPos.x, "before");
        blockPos.x = gridSize.x - 1 - blockPos.x - blockSize.x + 1;
        console.log(blockPos.x, "after");
        for (let x = blockPos.x; x < blockPos.x + blockSize.x; x++) {
          for (let z = blockPos.z; z < blockPos.z + blockSize.z; z++) {
            blocksHeightMap[x][z] = maxHeight + blockSize.y;
          }
        }
        let block = new Block(blockSize, blockPos, blockColor);
        blocks.push(block);
      }
    }
  }
}

// function cyl(strokeOpacity){
//   // background('red')
//   let r = 0.29, h=.19,s = .05
//   push()
//   noStroke()
//   cylinder(r-s/2.2,h)
//   fill(0,strokeOpacity)
//   push()
//   translate(0,h/2,0)
//   rotateX(PI/2)
//   torus(r, s/2)
//   translate(0,0,h)
//   torus(r, s/2)
//   pop()
//   // let angle = atan2(cam.eyeZ,cam.eyeX)
//   push()
//   rotateY(PI/4)
//   translate(r,0,0)
//   cylinder(s/2, h)
//   rotateY(PI)
//   translate(r*2,0,0)
//   cylinder(s/2, h)
//   pop()
//   pop()
// }

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

function setup() {
  createCanvas(windowHeight, windowHeight, WEBGL);
  cam = createCamera();
  // cam.upY(1);
  cam.ortho(-200, 200, -200, 200, 0.1, 10000);
  setCamera(cam);
  placeBlocks();
  // blocks.forEach((b) => b.draw());
  bg = "#023047"; //random(["silver", "gray", "white"]);
  // cam.setPosition(
  //   300 * sin(frameCount / 100),
  //   -300,
  //   300 * cos(frameCount / 100)
  // );
  // cam.lookAt(0, 0, 0);

  // lights();
  ambientLight(255);
}

function draw() {
  // draw
  background(bg);
  // cam.setPosition(
  //   300 + (mouseX - width / 2) * 8,
  //   -300 + (mouseY - height / 2) * 8,
  //   300
  // );
  cam.setPosition(0, -300, 300);
  cam.lookAt(0, 0, 0);
  noStroke();
  // groundBlock.draw(50)
  // background('#f0e5')
  blocks.forEach((b) => b.draw());
  // noLoop();
}
