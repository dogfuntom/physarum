/*
fix mic
osc
*/

'use strict'
let twgl = require('twgl.js')
const dat = require('dat.gui')
import * as Tone from 'tone'
let micFFT, mic, beat
const canvas = document.getElementById('canvasgl')
const gl = canvas.getContext("webgl2");
gl.getExtension('EXT_color_buffer_float')


// OSC
var socket = new WebSocket("ws://127.0.0.1:8080");

socket.onopen = function () {
  console.log("Connected!");
};

socket.onclose = function (event) {
  if (event.wasClean) {
    console.log('Connection was closed and its okay');
  } else {
    console.log('Connection closed. Anything alright?'); // for example websocket server offline
  }
  console.log('Code: ' + event.code + ' Reason: ' + event.reason);
};

socket.onmessage = function (event) {
  try {
    const data = JSON.parse(event.data);

    let name = data.address.split('/').pop()
    let value = data.args[0].value
    console.log("OSC", name, value)

    // if this control has its peer in gui, we set min-max values form there
    let guiControllersFiltered = gui.__controllers.filter(c => c.property == name)
    if (guiControllersFiltered.length > 0) {
      value *= guiControllersFiltered[0].__max - guiControllersFiltered[0].__min
      value += guiControllersFiltered[0].__min
    }

    // add only if this exist in obj
    if (Object.keys(obj).includes(name)) { obj[name] = value } else { console.log(`no "${name}" key in obj`, Object.keys(obj)) }

  } catch (e) {
    console.error('Can\'t recognize. Is data an object?', e);
  }
};

socket.onerror = function (error) {
  console.log("Error " + error.message);
};






if (!mic) {
  console.log('mic…')
  mic = new Tone.UserMedia()
  micFFT = new Tone.FFT()
  micFFT.set({
    normalRange: true,
    size: 64,
    debug: true,
  })
  mic.connect(micFFT)
}
else {
  console.log(mic)
}
document.querySelector('#button-start').addEventListener("click", function (event) {
  mic.open().then(() => {
    console.log("mic is open!")
    document.querySelector('#button-start').remove()
    setTimeout(animate, 30)
  }).catch(e => {
    console.log("mic not open", e)
  })
})


const attachments = [{ wrap: gl.CLAMP_TO_EDGE, format: gl.R32F, type: gl.FLOAT }]

const n = 512
const m = n
let size = 600
let draw1 = twgl.createFramebufferInfo(gl, attachments, size, size)
let draw2 = twgl.createFramebufferInfo(gl, attachments, size, size)

const gui = new dat.GUI()



var obj = {
  LOOKUP_DIST: .1,
  LOOKUP_ANGLE: .1,
  TURN_ANGLE: .1,
  ANGLE_SPREAD: .1,
  STEP_SIZE: .1,
  DECAY: .5,
  DEPOSITE: .001,
  // SENCE_MIN: .001,
  // SENCE_MAX: 1,
  LIGHTNESS: 100,
  // SENSE_ADD: .0001,
  REPULSION: 100,
  RESPAWN_P: .001,
  DIFFUSE_RADIUS: 1,
  FRICTION: .1,
  RES: size,
  BEAT_MULT: 1,
  // RESPAW: true,
  randomize: function () {
    // obj.FRICTION = Math.random()
    // obj.STEP_SIZE = Math.random()*
    gui.__controllers.forEach(c => {
      console.log(c.property)
      if (c.constructor.name != 'NumberControllerSlider') return
      if (['LIGHTNESS', 'RESPAWN_P', 'REPULSION'].includes(c.property)) return
      c.setValue(c.__min + Math.random() * (c.__max - c.__min))
    })
  }
}

gui.remember(obj)
let ld = gui.add(obj, 'LOOKUP_DIST').min(0).max(.1).step(0.0001).listen()
gui.add(obj, 'STEP_SIZE').min(0.00001).max(.1).step(0.0001).listen()
gui.add(obj, 'FRICTION').min(0).max(.9999).step(0.0001).listen()
gui.add(obj, 'LOOKUP_ANGLE').min(0).max(Math.PI * 2.).step(0.001).listen()
gui.add(obj, 'TURN_ANGLE').min(0).max(Math.PI * 2.).step(0.001).listen()
gui.add(obj, 'ANGLE_SPREAD').min(0).max(Math.PI).step(0.001).listen()
gui.add(obj, 'DEPOSITE').min(0).max(.000001).step(.00000001).listen()
gui.add(obj, 'DECAY').min(0).max(1).step(0.001).listen()
// gui.add(obj, 'SENCE_MIN').min(0).max(.0001).step(.000001).listen()
// gui.add(obj, 'REPULSION').min(0).max(100000).step(.000001).listen()
gui.add(obj, 'BEAT_MULT').min(0).max(50).step(.001).listen()
// gui.add(obj, 'SENSE_ADD').min(-.0001).max(.0001).step(.0000001)
gui.add(obj, 'RES').min(2).max(3000).step(1).onFinishChange(
  function () {
    size = this.getValue()
    draw1 = twgl.createFramebufferInfo(gl, attachments, size, size)
    draw2 = twgl.createFramebufferInfo(gl, attachments, size, size)
  }
)
gui.add(obj, 'DIFFUSE_RADIUS').min(0).max(5).step(1).listen()
gui.add(obj, 'RESPAWN_P').min(0).max(.1).step(.000001).listen()
// gui.add(obj, 'DIFFUSE_RADIUS').min(0).max(10).step(1).listen()
gui.add(obj, 'LIGHTNESS').min(1).max(1000).step(1).listen()
// gui.add(obj, 'record')
gui.add(obj, 'randomize')



// console.log()

const mousepos = [0, 0]

const vFlat = require('./flat.vert')
const fDiffusion = require('./diffusion.frag')
const fShow = require('./show.frag')


twgl.addExtensionsToContext(gl)
gl.getExtension("OES_texture_float")
gl.getExtension("WEBGL_color_buffer_float")

const programDiffusion = twgl.createProgramInfo(gl, [vFlat, fDiffusion])
const programShow = twgl.createProgramInfo(gl, [vFlat, fShow])

// can it be removed?
const pointId = []
const pointPositions = []
const pointMass = []
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    pointId.push(i * n + j)
    pointPositions.push(i / n + .5 / n) // мы вручную забиваем координаты, 
    // которые будут использоваться при сопоставлении вершин и пикселей ФБО
    pointPositions.push(j / m + .5 / m)
    pointMass.push(Math.random() * 5)
  }
}

const positionObject = {
  position: { data: [1, 1, 1, -1, -1, -1, -1, 1], numComponents: 2 },
}
const positionBuffer = twgl.createBufferInfoFromArrays(gl, positionObject)

let tick = 0
let timeStart = new Date() / 1000
let temp















// gl.enable(gl.BLEND)
function frame(time) {
  time = new Date() / 1000 - timeStart

  beat = Array(64).fill(0)
  console.log('micFFT.getValue()', micFFT.getValue())
  console.log('mic', mic)
  if (micFFT) {
    beat = micFFT.getValue().map(d => (d * 1000))
    console.log('beat[0]', beat[0])
  }

  twgl.resizeCanvasToDisplaySize(gl.canvas)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

  {  // diffusion
    // gl.blendFunc(gl.ONE, gl.ZERO)
    gl.useProgram(programDiffusion.program);
    twgl.setBuffersAndAttributes(gl, programDiffusion, positionBuffer);
    twgl.setUniforms(programDiffusion, {
      u_tex_draw: draw2.attachments[0],
      u_time: time,
      u_resolution: [size, size],
    });
    twgl.bindFramebufferInfo(gl, draw1);
    twgl.drawBufferInfo(gl, positionBuffer, gl.TRIANGLE_FAN);
  }


  {  // diffusion
    // gl.blendFunc(gl.ONE, gl.ZERO)
    gl.useProgram(programShow.program);
    twgl.setBuffersAndAttributes(gl, programShow, positionBuffer);
    twgl.setUniforms(programShow, {
      u_tex_draw: draw2.attachments[0],
      u_time: time,
      u_resolution: [gl.canvas.width, gl.canvas.height],
      // u_resolution: [size, size],
    });
    twgl.bindFramebufferInfo(gl, null);
    twgl.drawBufferInfo(gl, positionBuffer, gl.TRIANGLE_FAN);
  }

  // // to screen
  // // gl.blendFunc(gl.ONE, gl.ZERO)
  // gl.useProgram(programShow.program)
  // twgl.setBuffersAndAttributes(gl, programShow, positionBuffer)
  // twgl.setUniforms(programShow, {
  //   u_tex_draw: draw1.attachments[0],
  //   u_resolution: [gl.canvas.width, gl.canvas.height],
  // })
  // twgl.bindFramebufferInfo(gl, null)
  // twgl.drawBufferInfo(gl, positionBuffer, gl.TRIANGLE_FAN)

  temp = draw1
  draw1 = draw2
  draw2 = temp

  tick++
}

function animate(now) {
  frame()
  requestAnimationFrame(animate)
}


function setMousePos(e) {
  mousepos[0] = (e.clientX / gl.canvas.clientWidth) * 2 - 1
  mousepos[1] = (1 - e.clientY / gl.canvas.clientHeight) * 2 - 1
}

canvas.addEventListener('mousemove', setMousePos);

function handleTouch(e) {
  e.preventDefault();
  setMousePos(e.touches[0]);
}

// canvas.addEventListener('contextmenu', e => e.preventDefault());
canvas.addEventListener('touchstart', handleTouch, { passive: false });
canvas.addEventListener('touchmove', handleTouch, { passive: false });
