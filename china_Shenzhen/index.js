'use strict';


let twgl = require('twgl.js')
let chroma = require('chroma-js')
const vShader = `#version 300 es
  precision mediump float;
  in vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }`;
const fShader = require('./shader.frag')
const fShow = require('./show.frag')
let timePrev = +new Date()
let time = 0

const mousepos = [0, 0];
let pause = false
let tick = 0
const canvas = document.getElementById('canvasgl')
const gl = canvas.getContext("webgl2", {
  preserveDrawingBuffer: true,
})

let palettes = [['#230f2b', '#f21d41', '#ebebbc', '#bce3c5', '#82b3ae']]
let palette
let params


////////////////////
// CUSTOM CODE BELOW
////////////////////

let FPS = 60
let isRendering = false
let renderSizeX = 1080*2
let renderSizeY = 1920*2
let animDuration = 10
let fileNamePrefix = 'poly---'

////////////////////
// CUSTOM CODE END
////////////////////

twgl.addExtensionsToContext(gl);
// gl.getExtension("OES_texture_float")
// gl.getExtension("WEBGL_color_buffer_float")

const program = twgl.createProgramInfo(gl, [vShader, fShader])
const programShow = twgl.createProgramInfo(gl, [vShader, fShow])

const m = 800;
const n = m;
// const attachments = [{ format: gl.RGBA, type: gl.FLOAT, minMag: gl.NEAREST, wrap: gl.CLAMP_TO_EDGE }];
const attachments = [{ format: gl.RGBA, type: gl.FLOAT, minMag: gl.LINEAR, wrap: gl.CLAMP_TO_EDGE }]
let shader1 = twgl.createFramebufferInfo(gl, attachments, m, n);
let shader2 = twgl.createFramebufferInfo(gl, attachments, m, n);
const positionObject = { position: { data: [1, 1, 1, -1, -1, -1, -1, 1], numComponents: 2 } };
const positionBuffer = twgl.createBufferInfoFromArrays(gl, positionObject);

// mouseClicked()


windowResized()


function draw() {
  console.log('draw')
  
  gl.useProgram(program.program);
  twgl.setBuffersAndAttributes(gl, program, positionBuffer);
  twgl.setUniforms(program, {
    prevStateCells: shader2.attachments[0],
    tick: tick,
    // palette: palette.flat(),
    u_time: tick / (FPS * animDuration),
    u_resolution: [m, n],
    // params: params,
    viewbox: [0, 0, 1, 1],
  });
  twgl.bindFramebufferInfo(gl, shader1)
  twgl.drawBufferInfo(gl, positionBuffer, gl.TRIANGLE_FAN)
  
  gl.useProgram(programShow.program)
  twgl.setBuffersAndAttributes(gl, programShow, positionBuffer)
  twgl.setUniforms(programShow, {
    u_tex_draw: shader1.attachments[0],
    u_tex_res: [m, n],
    u_resolution: [gl.canvas.width, gl.canvas.height],
  })
  twgl.bindFramebufferInfo(gl, null)
  twgl.drawBufferInfo(gl, positionBuffer, gl.TRIANGLE_FAN)
  
  // ping-pong buffers
  let temp = shader1;
  shader1 = shader2;
  shader2 = temp;
}

function animate() {
  console.log('hf')  
  // if (pause) return;
  let timeCurrent = +new Date()
  time += timeCurrent - timePrev
  timePrev = timeCurrent
  if (isRendering) {
    saveImage()
  }
  else {
    draw()
  }
  tick++
  // if (tick > FPS * animDuration && isRendering) pause = true
  console.log('hf')  
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
  palette = palettes[Math.floor(palettes.length * Math.random())]
  console.log(palette)
  palette = palette.map(c => chroma(c).gl())
  palette = palette.sort((a, b) => chroma(a).get('lch.l') - chroma(b).get('lch.l'))
  // palette munging
  // let keyColors = [];
  // let h, l, c
  // h = 360 * Math.random()
  // let hSpan = 40 + 90 * Math.random()
  // l = 80
  // c = (Math.random()*40 +80)%100
  // keyColors.push(chroma.lch(l, c, h))
  // l = (Math.random()*40 +80)%100
  // c = 100-c
  // h += hSpan
  // keyColors.push(chroma.lch(l, c, h))
  // l = 100-l
  // h += hSpan
  // c = Math.random()*100
  // keyColors.push(chroma.lch(l, c, h))

  // palette = chroma.scale(keyColors).mode("lch").colors(5);
  // palette = palette.sort((a, b) => chroma(a).get('lch.l')-chroma(b).get('lch.l'))


  // console.clear()
  // // console.log(chroma('#f00').lch())
  // for (let i = 0; i < 5; i++)
  //   console.log('%c' + palette[i], 'background:' + palette[i])

  // //test
  // // let  pp = [...Array(10000)].map(()=>randomColor()).sort((a,b)=>chroma(a).get('lch.h')-chroma(b).get('lch.h'))
  // // for (let i = 0; i < pp.length; i++)
  // // console.log('%c' + pp[i] + chroma(pp[i]).lch(), 'background:' + pp[i])


  // palette = palette.map(c => chroma(c).gl())
  // // palette = chroma.bezier([col1, col2, col3]).scale().mode('lch').colors(5).map(c=>chroma(c).gl())
  // // palette = palette.sort(() => Math.random())

  params = [Math.random(), Math.random(), Math.random(), Math.random(),]
  ////////////////////
  // CUSTOM CODE BELOW
  ////////////////////




  ////////////////////
  // CUSTOM CODE END
  ////////////////////
  draw()
}

window.addEventListener('resize', windowResized)
function windowResized() {
  let winMinSize = Math.min(window.innerWidth, window.innerHeight)
  canvas.width = 1080//winMinSize * window.devicePixelRatio
  canvas.height = 1920//winMinSize * window.devicePixelRatio
  document.querySelector('canvas').style.width = window.innerHeight / canvas.height * canvas.width + 'px'
  document.querySelector('canvas').style.heigth = window.innerHeight+'px'//winMinSize + 'px'
}

let blink = () => {
  document.querySelector('canvas').style.opacity = 0
  setTimeout(() => document.querySelector('canvas').style.opacity = 1, 100)
}

let timer
window.addEventListener('keypress', keyPressed)
function keyPressed(key) {
  // console.log(key)
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

  let sizeX = renderSizeX
  let sizeY = renderSizeY
  let splitsX = Math.ceil(sizeX / 512)
  let splitsY = Math.ceil(sizeY / 512)
  let stepX = 1 / splitsX
  let stepY = 1 / splitsY
  let splitSizeX = sizeX / splitsX
  let splitSizeY = sizeY / splitsY
  canvas.width = splitSizeX
  canvas.height = splitSizeY

  var dynamicCanvas = document.createElement("canvas");
  var dynamicContext = dynamicCanvas.getContext("2d")
  dynamicCanvas.width = sizeX;
  dynamicCanvas.height = sizeY;

  let date = new Date()
  for (let i = 0; i < 1; i += stepX) {
    for (let j = 0; j < 1; j += stepY) {
      gl.useProgram(program.program);
      twgl.setBuffersAndAttributes(gl, program, positionBuffer);
      twgl.setUniforms(program, {
        prevStateCells: shader1.attachments[0],
        tick: tick,
        palette: palette.flat(),
        u_time: tick / (FPS * animDuration),
        u_resolution: [splitSizeX, splitSizeY],
        u_mouse: mousepos,
        params: params,
        viewbox: [i, j, stepX, stepY],
      });
      twgl.bindFramebufferInfo(gl, null);
      twgl.drawBufferInfo(gl, positionBuffer, gl.TRIANGLE_FAN);

      dynamicContext.drawImage(canvas, i * sizeX, sizeY - (j + stepY) * sizeY);
    }
  }


  let link = document.getElementById('link');
  const zeroPad = (num, places) => String(num).padStart(places, '0')

  link.setAttribute('download', fileNamePrefix+`${zeroPad(tick, 6)}.png`);
  link.setAttribute('href', dynamicCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
  link.click();

  // resume
  // windowResized()
  // draw()

}