let s
let sP
let time0 = new Date() / 1000
let seed
let b, bP
let tmp
let pass
function preload() {
  s = loadShader('s.vert', 's.frag')
  sP = loadShader('s.vert', 's.frag')
}

function setup() {
  // pixelDensity(.5)
  // frameRate(1)
  let c = createCanvas(540, 540, WEBGL)
  b = createGraphics(width, height, WEBGL)
  bP = createGraphics(width, height, WEBGL)
  b.background('red')
  b.circle(0, 0, 100)
  bP.background('green')
  bP.circle(0, 0, 100)
  b.noStroke()
  bP.noStroke()
  poss = Array(9).fill().map(d=>[random(-4,4)])
}

function draw() {
  // background('yellow')
  b.shader(s)
  // let blocksNumber=5;
  s.setUniform('u_res', [width, height])
  s.setUniform('t', new Date() / 1000 - time0)
  s.setUniform('tick', frameCount - 1)
  s.setUniform('backbuffer', bP)
  // s.setUniform('blocksNumber', blocksNumber)
  // s.setUniform('arr', Array(1024).fill(2))
  // s.setUniform('pos', Array(1021).fill(0).map(d=>[1,2,3]))

  // let poss = [random(-4,4),random(-4,4),random(-4,4)]
  s.setUniform('pos', poss)
  // s.setUniform('posf', [random(-4,4),random(-4,4),random(-4,4),random(-4,4),random(-4,4)])
  // s.setUniform('arr_', Array(10).fill(3).map(d=>[1,2,3]))
  // s.setUniform('arr3', Array(1021).fill(4).map(d=>[1,2,3]))
  b.rect(0, 0, 1, 1)
  image(b, -width / 2, -height / 2, width, height)
  tmp = b
  b = bP
  bP = tmp

  tmp = s
  s = sP
  sP = tmp
  // if(frameCount>1)noLoop()
  // noLoop()
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight)
// }

function random_hash() {
  let chars = "0123456789abcdef";
  let result = '0x';
  for (let i = 64; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}


function mouseClicked() {
  tokenData = { "hash": random_hash() }
  console.log(tokenData.hash)
  seed = parseInt(tokenData.hash.slice(0, 16), 16) / 1e13
  console.log(seed)
}