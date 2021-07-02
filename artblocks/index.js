let s
let time0 = new Date() / 1000
let seed
const RENDER = false

function preload() {
  s = loadShader('s.vert', 's.frag')
}

function setup() {
  let c = createCanvas(540, 540, WEBGL)
  noStroke()
  if (RENDER) {
    for (let i = 0; i < 50; i++) {
      draw()
      mouseClicked()
    }
    document.querySelector('canvas').remove()
    document.querySelector('img').remove()
    noLoop()
  }
  else {
    mouseClicked()
  }
}

function draw() {
  shader(s)
  s.setUniform('u_res', [height * 4, height * 4])
  s.setUniform('t', new Date() / 1000 - time0)
  s.setUniform('m', [mouseX / width, mouseY / height])
  s.setUniform('seed', seed)
  if (RENDER) {
    s.setUniform('t', Math.random() * 100)
    s.setUniform('m', [Math.random(), mouseY / height])
}
  rect(0, 0, height, height)
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
  if (RENDER) {
    var image = new Image()
    image.src = document.querySelector('canvas').toDataURL()
    image.width = 200
    console.log(image)
    document.body.appendChild(image)
  }

  tokenData = { "hash": random_hash() }
  console.log(tokenData.hash)
  seed = parseInt(tokenData.hash.slice(0, 16), 16) / 1e13
  console.log(seed)
}