let s
let time0 = new Date() / 1000
let seed

function preload() {
  s = loadShader('s.vert', 's.frag')
}

function setup() {
  let c = createCanvas(windowWidth / 2, windowHeight / 2, WEBGL)
  noStroke()
  // for (let i = 0; i < 30; i++) {
  //   draw()
    mouseClicked()
  // }
}

function draw() {
  shader(s)
  s.setUniform('u_res', [width * 4, height * 4])
  s.setUniform('t', new Date() / 1000 - time0)
  s.setUniform('m', [mouseX / width, mouseY / height])
  s.setUniform('seed', seed)
  rect(0, 0, width, height)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

function random_hash() {
  let chars = "0123456789abcdef";
  let result = '0x';
  for (let i = 64; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}


function mouseClicked() {
  // var image = new Image()
  // image.src = document.querySelector('canvas').toDataURL()
  // console.log(image)
  // document.body.appendChild(image)

  tokenData = { "hash": random_hash() }
  console.log(tokenData.hash)
  seed = parseInt(tokenData.hash.slice(0, 16), 16) / 1e13
  console.log(seed)
}