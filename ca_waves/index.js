'use strict';
let twgl = require('twgl.js')
let chroma = require('chroma-js')
const vShader = `#version 300 es
  precision mediump float;
  in vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }`;
const fShader = require('./shader.frag');
let timePrev = +new Date()
let time = 0

const mousepos = [0, 0];
let pause = false
let tick = 0
const canvas = document.getElementById('canvasgl')
const gl = canvas.getContext("webgl2", { preserveDrawingBuffer: true })
let passes

function Pass({ frag, size = 8, texture }) {
  if (size.length)
    this.resolution = size
  else
    this.resolution = [size, size]

  console.log(this.resolution)
  this.vert = `#version 300 es
  precision mediump float;
  in vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }`
  this.frag = frag
  this.program = twgl.createProgramInfo(gl, [this.vert, this.frag])
  // this.attachments = [{ format: gl.RGBA, type: gl.UNSIGNED_BYTE, minMag: gl.GL_NEAREST, wrap: gl.GL_CLAMP_TO_EDGE }]
  this.attachments = [{ format: gl.RGBA, mag: gl.NEAREST }]
  this.buffer = twgl.createFramebufferInfo(gl, this.attachments, ...this.resolution)
  this.backbuffer = twgl.createFramebufferInfo(gl, this.attachments, ...this.resolution)
  this.b = this.backbuffer.attachments[0]
  this.positionObject = { position: { data: [1, 1, 1, -1, -1, -1, -1, 1], numComponents: 2 } }
  this.positionBuffer = twgl.createBufferInfoFromArrays(gl, this.positionObject)

  this.texture = texture

  this.draw = ({ uniforms, target }) => {
    // target: self, screen, self+screen
    gl.useProgram(this.program.program)
    twgl.setBuffersAndAttributes(gl, this.program, this.positionBuffer)

    if (!uniforms.u_resolution) uniforms.u_resolution = this.resolution
    if (target != 'screen') // self or both
      uniforms.backbuffer = this.backbuffer.attachments[0]
    if (this.texture)
      uniforms.texture = this.texture
    twgl.setUniforms(this.program, uniforms)

    if (target != 'self') { // screen or both
      twgl.bindFramebufferInfo(gl, null)
      twgl.drawBufferInfo(gl, this.positionBuffer, gl.TRIANGLE_FAN)
    }
    if (target != 'screen') { // self or both
      twgl.bindFramebufferInfo(gl, this.buffer)
      let tmp = this.buffer
      this.buffer = this.backbuffer
      this.backbuffer = tmp
      this.b = this.backbuffer.attachments[0]
      twgl.drawBufferInfo(gl, this.positionBuffer, gl.TRIANGLE_FAN)
    }
  }
}


let palettes = [
  ['#010400', '#30332E', '#FFFBFC', '#62BBC1', '#EC058E'], // !
  ['#2B2D42', '#8D99AE', '#F8F32B', '#FFFFFF', '#000000'],
  ['#1B065E', '#FF47DA', '#FF87AB', '#FCC8C2', '#F5ECCD'],
  // ['#ED6A5A', '#F4F1BB', '#9BC1BC', '#5D576B', '#E6EBE0'],
  ['#272727', '#FED766', '#009FB7', '#696773', '#EFF1F3'],
  // ['#F7DBA7', '#F1AB86', '#C57B57', '#1E2D2F', '#041F1E'],
  ['#292F36', '#4ECDC4', '#FFFFFF', '#FF6B6B', '#FFFFFF'],
  ['#E4572E', '#17BEBB', '#FFC914', '#2E282A', '#76B041'],
  // ['#5AA9E6', '#7FC8F8', '#F9F9F9', '#FFE45E', '#FF6392'],
  ['#44AF69', '#F8333C', '#FCAB10', '#2B9EB3', '#DBD5B5'],
  // ['#EF946C', '#C4A77D', '#70877F', '#454372', '#2F2963'],
  // ['#D81159', '#8F2D56', '#218380', '#FBB13C', '#73D2DE'],
  ['#E4FDE1', '#8ACB88', '#648381', '#575761', '#FFBF46'],
  // ['#5C415D', '#694966', '#74526C', '#DBD053', '#C89933'],
  ['#4C5454', '#FF715B', '#FFFFFF', '#1EA896', '#523F38'],
  // ['#FF4E00', '#8EA604', '#F5BB00', '#EC9F05', '#BF3100'],
  ['#2364AA', '#3DA5D9', '#73BFB8', '#FEC601', '#EA7317'],
  ['#003844', '#006C67', '#F194B4', '#FFB100', '#FFEBC6'],
  ['#E59F71', '#BA5A31', '#0C0C0C', '#69DC9E', '#FFFFFF'],
  ['#EF798A', '#F7A9A8', '#613F75', '#E5C3D1', '#988B8E'],
  ['#273043', '#9197AE', '#EFF6EE', '#F02D3A', '#DD0426'],
  // ['#390099', '#9E0059', '#FF0054', '#FF5400', '#FFBD00'],
  ['#541388', '#D90368', '#F1E9DA', '#2E294E', '#FFD400'],
  // ['#9AADBF', '#6D98BA', '#D3B99F', '#C17767', '#210203'],
  ['#BFBDC1', '#6D6A75', '#37323E', '#DEB841', '#DE9E36'],
  ['#B8B8D1', '#5B5F97', '#FFC145', '#FFFFFB', '#FF6B6C'],
  // ['#8C271E', '#ABA194', '#CFCBCA', '#D8DDDE', '#D9F7FA'],
  // ['#3A3335', '#D81E5B', '#F0544F', '#FDF0D5', '#C6D8D3'],
  // ['#067BC2', '#84BCDA', '#ECC30B', '#F37748', '#D56062'],
  ['#000000', '#7F95D1', '#FF82A9', '#FFC0BE', '#FFEBE7'],
  ['#464D77', '#36827F', '#F9DB6D', '#F4EDED', '#877666'],
  ['#4B4237', '#D5A021', '#EDE7D9', '#A49694', '#736B60'],
  ['#F05D5E', '#0F7173', '#E7ECEF', '#272932', '#D8A47F'],
  // ['#BCE784', '#5DD39E', '#348AA7', '#525174', '#513B56'],
  // ['#EBD4CB', '#DA9F93', '#B6465F', '#890620', '#2C0703'],
  ['#F9B9F2', '#BCA0BC', '#2B3D41', '#4C5F6B', '#83A0A0'],
  ['#094074', '#3C6997', '#5ADBFF', '#FFDD4A', '#FE9000'],
  // ['#DEEFB7', '#98DFAF', '#5FB49C', '#414288', '#682D63'],
  ['#233D4D', '#FE7F2D', '#FCCA46', '#A1C181', '#619B8A'],
  // ['#E3D26F', '#CA895F', '#A15E49', '#4E3822', '#2F1B25'],
  ['#BFBDC1', '#6D6A75', '#37323E', '#DEB841', '#DE9E36'],
  ['#DB2B39', '#29335C', '#F3A712', '#F0CEA0', '#534D41'],
  // ['#ECE4B7', '#D9DD92', '#EABE7C', '#DD6031', '#311E10'],
  ['#EFC7C2', '#FFE5D4', '#BFD3C1', '#68A691', '#694F5D'],
  // ['#E54B4B', '#FFA987', '#F7EBE8', '#444140', '#1E1E24'],
  // ['#2F2D2E', '#41292C', '#792359', '#D72483', '#FD3E81'],
  ['#0A0903', '#FF0000', '#FF8200', '#FFC100', '#FFEAAE'],
  ['#080708', '#3772FF', '#DF2935', '#FDCA40', '#E6E8E6'],
  ['#08415C', '#CC2936', '#EBBAB9', '#388697', '#B5FFE1'],
  ['#DDFFF7', '#93E1D8', '#FFA69E', '#AA4465', '#462255'],
  ['#423E37', '#E3B23C', '#EDEBD7', '#A39594', '#6E675F'],
]
let palette
let params

let isCanvasSquare = false
////////////////////
// CUSTOM CODE BELOW
////////////////////
let dartTheme = true


////////////////////
// CUSTOM CODE END
////////////////////

twgl.addExtensionsToContext(gl);
gl.getExtension("OES_texture_float")
gl.getExtension("WEBGL_color_buffer_float")







mouseClicked()
windowResized()






passes = {
  rnd: new Pass({
    frag: require('./rnd.frag'),
    size: 8,
  }),
  ca: new Pass({
    frag: require('./ca.frag'),
    size: 128,
  }),
  draw: new Pass({
    frag: require('./draw.frag'),
    size: 1024,
  }),
}
// console.log(JSON.stringify(passes))

function draw() {
  if(!passes || !passes.draw || !passes.draw.program) return;
  // console.log('draw', JSON.stringify(passes.draw))
  passes.rnd.draw({ uniforms: { tick: tick, }, target: 'self', })
  passes.ca.draw({ uniforms: { tick: tick, tex: passes.rnd.b, divisions: 1, }, target: 'self', })
  passes.ca.draw({ uniforms: { tick: tick, tex: passes.ca.b, divisions: 2, }, target: 'self', })
  passes.ca.draw({ uniforms: { tick: tick, tex: passes.ca.b, divisions: 3, }, target: 'self', })
  passes.ca.draw({ uniforms: { tick: tick, tex: passes.ca.b, divisions: 4, }, target: 'self', })
  passes.ca.draw({ uniforms: { tick: tick, tex: passes.ca.b, divisions: 5, }, target: 'self', })
  passes.draw.draw({
    uniforms: {
      tex: passes.ca.b,
      // midi: midi,
      u_time: time / 1000,
      palette: palette.flat(),
      u_resolution: [canvas.width, canvas.height], // window.devicePixelRatio
    },
    target: 'screen',
  })

  // gl.useProgram(programDraw.program);
  // twgl.setBuffersAndAttributes(gl, programDraw, positionBuffer);
  // twgl.setUniforms(programDraw, {
  //   prevStateCells: shader1.attachments[0],
  //   prevStateFeromones: feromone1.attachments[0],
  // });
  // twgl.bindFramebufferInfo(gl, null);
  // twgl.drawBufferInfo(gl, positionBuffer, gl.TRIANGLE_FAN);

  // ping-pong buffers
  // temp = shader1;
  // shader1 = shader2;
  // shader2 = temp;

  // temp = feromone1;
  // feromone1 = feromone2;
  // feromone2 = temp;

  tick++
}

function animate() {
  if (pause) return;
  let timeCurrent = +new Date()
  time += timeCurrent - timePrev
  timePrev = timeCurrent
  draw()
  requestAnimationFrame(animate)
}
animate()

function setMousePos(e) {
  mousepos[0] = e.clientX / gl.canvas.clientWidth;
  mousepos[1] = 1 - e.clientY / gl.canvas.clientHeight;
}

canvas.addEventListener('mousemove', setMousePos);

// canvas.addEventListener('mouseleave', () => {
//   mousepos[0] = .501;
//   mousepos[1] = .501;
// });

function handleTouch(e) {
  e.preventDefault();
  setMousePos(e.touches[0]);
}



document.querySelector('canvas').addEventListener('click', mouseClicked)
window.addEventListener('touchstart', mouseClicked)
function mouseClicked() {
  let paletteId = Math.floor(palettes.length * Math.random())
  console.log(paletteId)
  console.log(palettes[paletteId])
  palette = palettes[paletteId].map(c => chroma(c).gl())
  // palette = palette.sort((a, b) => chroma(a).get('lch.l') - chroma(b).get('lch.l'))
  params = [Math.random(), Math.random(), Math.random(), Math.random(),]

  ////////////////////
  // CUSTOM CODE BELOW
  ////////////////////
  dartTheme = !dartTheme



  ////////////////////
  // CUSTOM CODE END
  ////////////////////
  draw()
}

window.addEventListener('resize', windowResized)
function windowResized() {
  if (isCanvasSquare) {
    let winMinSize = Math.min(window.innerWidth, window.innerHeight)
    canvas.width = canvas.height = winMinSize * window.devicePixelRatio
    document.querySelector('canvas').style.width = document.querySelector('canvas').style.heigth = winMinSize + 'px'
  }
  else {
    canvas.width = window.innerWidth * window.devicePixelRatio
    canvas.height = window.innerHeight * window.devicePixelRatio
    document.querySelector('canvas').style.width = window.innerWidth + 'px'
    document.querySelector('canvas').style.heigth = window.innerHeight + 'px'
  }
}

let blink = () => {
  document.querySelector('canvas').style.opacity = 0
  setTimeout(() => document.querySelector('canvas').style.opacity = 1, 100)
}

let timer
window.addEventListener('keypress', keyPressed)
function keyPressed(key) {
  if (key.code.slice(0, 5) == 'Digit') {
    let digit = Number(key.key)
    if (digit == 0) {
      blink()
      clearInterval(timer)
    }
    else {
      if (!digit) return // NaN check, just in case
      clearInterval(timer)
      blink()
      mouseClicked()
      timer = setInterval(() => { mouseClicked() }, 1.5 ** digit * 400)
    }
  }
  if (key.code == 'Space') {
    pause = !pause
    if (pause) {
    }
    else {
      timePrev = +new Date()
      animate()
    }
  }
  if (key.code == 'KeyS') {
    saveImage()
  }
}

function saveImage() {
  let size = 10000
  let splits = Math.ceil(size / 512)
  let step = 1 / splits
  let splitSize = size / splits
  canvas.width = splitSize
  canvas.height = splitSize

  var dynamicCanvas = document.createElement("canvas");
  var dynamicContext = dynamicCanvas.getContext("2d")
  dynamicCanvas.height = size;
  dynamicCanvas.width = size;

  let date = new Date()
  for (let i = 0; i < 1; i += step) {
    for (let j = 0; j < 1; j += step) {
      gl.useProgram(program.program);
      twgl.setBuffersAndAttributes(gl, program, positionBuffer);
      twgl.setUniforms(program, {
        // prevStateCells: shader.attachments[0],
        tick: tick,
        palette: palette.flat(),
        u_time: time / 1000,
        u_resolution: [gl.canvas.width, gl.canvas.height],
        u_mouse: mousepos,
        params: params,
        viewbox: [i, j, step, step],
        dartTheme: dartTheme,
      });
      twgl.bindFramebufferInfo(gl, null);
      twgl.drawBufferInfo(gl, positionBuffer, gl.TRIANGLE_FAN);

      dynamicContext.drawImage(canvas, i * size, size - (j + step) * size);
    }
  }


  let link = document.getElementById('link');
  link.setAttribute('download', `image.png`);
  link.setAttribute('href', dynamicCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
  link.click();

  // resume
  windowResized()
  draw()
}