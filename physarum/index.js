/*
fix mic
osc
*/

'use strict'
let twgl = require('twgl.js')
const dat = require('dat.gui')
// const osc = require('osc')
// const express = require("express")
// const WebSocket = require("ws")
import * as Tone from 'tone'
let micFFT, mic
const canvas = document.getElementById('canvasgl')
const gl = twgl.getWebGLContext(canvas, {
  antialias: true,
  depth: false,
  preserveDrawingBuffer: true,
  // premultipliedAlpha: false, 
  // alpha: false,
})

// // OSC

// var getIPAddresses = function () {
//     var os = require("os"),
//         interfaces = os.networkInterfaces(),
//         ipAddresses = [];

//     for (var deviceName in interfaces) {
//         var addresses = interfaces[deviceName];
//         for (var i = 0; i < addresses.length; i++) {
//             var addressInfo = addresses[i];
//             if (addressInfo.family === "IPv4" && !addressInfo.internal) {
//                 ipAddresses.push(addressInfo.address);
//             }
//         }
//     }

//     return ipAddresses;
// };

// // Bind to a UDP socket to listen for incoming OSC events.
// var udpPort = new osc.UDPPort({
//     localAddress: "0.0.0.0",
//     localPort: 57121
// });

// udpPort.on("ready", function () {
//     var ipAddresses = getIPAddresses();
//     console.log("Listening for OSC over UDP.");
//     ipAddresses.forEach(function (address) {
//         console.log(" Host:", address + ", Port:", udpPort.options.localPort);
//     });
//     console.log("To start the demo, go to http://localhost:8081 in your web browser.");
// });

// udpPort.open();

// // Create an Express-based Web Socket server to which OSC messages will be relayed.
// var appResources = __dirname + "/web",
//     app = express(),
//     server = app.listen(1234),
//     wss = new WebSocket.Server({
//         server: server
//     });

// app.use("/", express.static(appResources));
// wss.on("connection", function (socket) {
//     console.log("A Web Socket connection has been established!");
//     var socketPort = new osc.WebSocketPort({
//         socket: socket
//     });

//     var relay = new osc.Relay(udpPort, socketPort, {
//         raw: true
//     });
// });


// var webSocketServer = require('ws');
import WebSocket from 'ws';

console.log(WebSocket)

// const wss = new WebSocketServer({ port: 8080 });

// wss.on('connection', function connection(ws) {
//   ws.on('message', function incoming(message) {
//     console.log('received: %s', message);
//   });

//   ws.send('something');
// });




window.addEventListener("click", function (event) {
  if (!mic) {
    console.log('mic…')
    mic = new Tone.UserMedia();
    micFFT = new Tone.FFT();
    micFFT.set({
      normalRange: true,
      size: 64,
    })
    mic.connect(micFFT);
    mic.open()
    frame()
  }
})


const attachments = [{ format: gl.RGBA, type: gl.FLOAT, minMag: gl.LINEAR, wrap: gl.CLAMP_TO_EDGE }]

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
  DIFFUSE_RADIUS: 2,
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
let ld = gui.add(obj, 'LOOKUP_DIST').min(0).max(.1).step(0.0001)
gui.add(obj, 'STEP_SIZE').min(0.00001).max(.1).step(0.0001)
gui.add(obj, 'FRICTION').min(0).max(.9999).step(0.0001)
gui.add(obj, 'LOOKUP_ANGLE').min(0).max(Math.PI * 2.).step(0.001)
gui.add(obj, 'TURN_ANGLE').min(0).max(Math.PI * 2.).step(0.001)
gui.add(obj, 'ANGLE_SPREAD').min(0).max(Math.PI).step(0.001)
gui.add(obj, 'DEPOSITE').min(0).max(.00001).step(.00000001)
gui.add(obj, 'DECAY').min(0).max(1).step(0.001)
// gui.add(obj, 'SENCE_MIN').min(0).max(.0001).step(.000001)
// gui.add(obj, 'REPULSION').min(0).max(100000).step(.000001)
gui.add(obj, 'BEAT_MULT').min(0).max(50).step(.001)
// gui.add(obj, 'SENSE_ADD').min(-.0001).max(.0001).step(.0000001)
gui.add(obj, 'RES').min(2).max(3000).step(1).onFinishChange(
  function () {
    size = this.getValue()
    draw1 = twgl.createFramebufferInfo(gl, attachments, size, size)
    draw2 = twgl.createFramebufferInfo(gl, attachments, size, size)
  }
)
gui.add(obj, 'DIFFUSE_RADIUS').min(0).max(5).step(1)
gui.add(obj, 'RESPAWN_P').min(0).max(.1).step(.000001)
// gui.add(obj, 'DIFFUSE_RADIUS').min(0).max(10).step(1)
gui.add(obj, 'LIGHTNESS').min(1).max(1000).step(1)
// gui.add(obj, 'record')
gui.add(obj, 'randomize')


const mousepos = [0, 0]

const vFlat = require('./flat.vert')
const fParticles = require('./particles.frag')
const vRender = require('./render.vert')
const fRender = require('./render.frag')
const fClear = require('./clear.frag')
const fDiffusion = require('./diffusion.frag')
const fShow = require('./show.frag')


twgl.addExtensionsToContext(gl)
gl.getExtension("OES_texture_float")
gl.getExtension("WEBGL_color_buffer_float")

const programParticles = twgl.createProgramInfo(gl, [vFlat, fParticles]);
const programRender = twgl.createProgramInfo(gl, [vRender, fRender]);
const programClear = twgl.createProgramInfo(gl, [vFlat, fClear])
const programDiffusion = twgl.createProgramInfo(gl, [vFlat, fDiffusion])
const programShow = twgl.createProgramInfo(gl, [vFlat, fShow])

let fb1 = twgl.createFramebufferInfo(gl, attachments, n, m)
let fb2 = twgl.createFramebufferInfo(gl, attachments, n, m)

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
const pointsObject = {
  v_id: { data: pointId, numComponents: 1 },
  v_position: { data: pointPositions, numComponents: 2 },
  v_mass: { data: pointMass, numComponents: 1 }, // не используем пока что. Вычисляем из координат ФБО
}
const pointsBuffer = twgl.createBufferInfoFromArrays(gl, pointsObject)

const positionObject = {
  position: { data: [1, 1, 1, -1, -1, -1, -1, 1], numComponents: 2 },
}
const positionBuffer = twgl.createBufferInfoFromArrays(gl, positionObject)

let tick = 0
let timeStart = new Date() / 1000
let temp



{  // clear ONCE
  gl.blendFunc(gl.ONE, gl.ZERO)
  // а тут работает, потому что мы прибавляем постоянно к фону маленькое значение vec4(.005)
  // Оно клампится и не становится больше единицы
  gl.useProgram(programClear.program);
  twgl.setBuffersAndAttributes(gl, programClear, positionBuffer);
  twgl.setUniforms(programClear, {
    u_tick: tick,
  });
  twgl.bindFramebufferInfo(gl, draw1);
  twgl.drawBufferInfo(gl, positionBuffer, gl.TRIANGLE_FAN);
}

{  // clear ONCE
  gl.blendFunc(gl.ONE, gl.ZERO)
  // а тут работает, потому что мы прибавляем постоянно к фону маленькое значение vec4(.005)
  // Оно клампится и не становится больше единицы
  gl.useProgram(programClear.program);
  twgl.setBuffersAndAttributes(gl, programClear, positionBuffer);
  twgl.setUniforms(programClear, {
    u_tick: tick,
  });
  twgl.bindFramebufferInfo(gl, draw2);
  twgl.drawBufferInfo(gl, positionBuffer, gl.TRIANGLE_FAN);
}













gl.enable(gl.BLEND)
function frame(time) {
  time = new Date() / 1000 - timeStart
  let beat = Array(64).fill(0)
  if (micFFT) {
    beat = micFFT.getValue().map(d => (d * 1000))
    // console.log(beat[0])
  }

  twgl.resizeCanvasToDisplaySize(gl.canvas)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

  {  // diffusion
    gl.blendFunc(gl.ONE, gl.ZERO)
    gl.useProgram(programDiffusion.program);
    twgl.setBuffersAndAttributes(gl, programDiffusion, positionBuffer);
    twgl.setUniforms(programDiffusion, {
      u_tex_draw: draw2.attachments[0],
      u_time: time,
      u_resolution: [size, size],
      DECAY: obj.DECAY,
      DIFFUSE_RADIUS: obj.DIFFUSE_RADIUS,
      BEAT: beat,
    });
    twgl.bindFramebufferInfo(gl, draw1);
    twgl.drawBufferInfo(gl, positionBuffer, gl.TRIANGLE_FAN);
  }

  temp = fb1;
  fb1 = fb2;
  fb2 = temp;

  {  // FBO physics
    gl.blendFunc(gl.ONE, gl.ZERO)
    gl.useProgram(programParticles.program)
    twgl.setBuffersAndAttributes(gl, programParticles, positionBuffer)
    twgl.setUniforms(programParticles, {
      u_tex_fbo: fb1.attachments[0],
      u_tex_draw: draw2.attachments[0],
      u_tex_draw_res: [size, size],
      u_tick: tick,
      u_time: time,
      u_mouse: mousepos,
      u_resolution: [n, m],
      LOOKUP_DIST: obj.LOOKUP_DIST,
      LOOKUP_ANGLE: obj.LOOKUP_ANGLE,
      ANGLE_SPREAD: obj.ANGLE_SPREAD,
      TURN_ANGLE: obj.TURN_ANGLE,
      STEP_SIZE: obj.STEP_SIZE,
      SENCE_MIN: obj.SENCE_MIN,
      SENCE_MAX: obj.SENCE_MAX,
      SENSE_ADD: obj.SENSE_ADD,
      RESPAWN_P: obj.RESPAWN_P,
      FRICTION: obj.FRICTION,
      REPULSION: obj.REPULSION,
      BEAT: beat,
    });
    twgl.bindFramebufferInfo(gl, fb2)
    twgl.drawBufferInfo(gl, positionBuffer, gl.TRIANGLE_FAN)
  }

  {  // render particles from FBO
    gl.blendFunc(gl.ONE, gl.ONE)
    // оооо, тут мэджик. Суть такая: умножаем сорс на дист, и прибавляем дист на ноль (то есть ничего)
    // это работает, потому что сорс мы делаем vec4(.9, .9, .9, 1)
    // То есть, мы при умножении уменьшаем белость цвета, но сохраняем альфу
    // gl.blendFunc(gl.ONE, gl.ZERO)
    gl.useProgram(programRender.program)
    twgl.setBuffersAndAttributes(gl, programRender, pointsBuffer)
    twgl.setUniforms(programRender, {
      u_tex_fbo: fb2.attachments[0],
      u_time: time,
      u_resolution: [size, size],
      DEPOSITE: obj.DEPOSITE * 1e6 / size / size,
      BEAT: beat,
      BEAT_MULT: obj.BEAT_MULT,
    });
    twgl.bindFramebufferInfo(gl, draw1)
    twgl.drawBufferInfo(gl, pointsBuffer, gl.POINTS)
  }

  // to screen
  gl.blendFunc(gl.ONE, gl.ZERO)
  gl.useProgram(programShow.program)
  twgl.setBuffersAndAttributes(gl, programShow, positionBuffer)
  twgl.setUniforms(programShow, {
    u_tex_draw: draw1.attachments[0],
    u_resolution: [gl.canvas.width, gl.canvas.height],
    LIGHTNESS: obj.LIGHTNESS,
  })
  twgl.bindFramebufferInfo(gl, null)
  twgl.drawBufferInfo(gl, positionBuffer, gl.TRIANGLE_FAN)

  temp = draw1
  draw1 = draw2
  draw2 = temp

  tick++
}

// (function animate(now) {
//   draw();
//   // setTimeout(animate, 10)
//   requestAnimationFrame(animate)
// })(0);

(function animate(now) {
  frame()
  requestAnimationFrame(animate)
})(0);


function setMousePos(e) {
  mousepos[0] = (e.clientX / gl.canvas.clientWidth) * 2 - 1
  mousepos[1] = (1 - e.clientY / gl.canvas.clientHeight) * 2 - 1
}

canvas.addEventListener('mousemove', setMousePos);

// canvas.addEventListener('mouseleave', () => {
//   mousepos[0] = 0.;
//   mousepos[1] = 0.;
// });

function handleTouch(e) {
  e.preventDefault();
  setMousePos(e.touches[0]);
}

// canvas.addEventListener('contextmenu', e => e.preventDefault());
canvas.addEventListener('touchstart', handleTouch, { passive: false });
canvas.addEventListener('touchmove', handleTouch, { passive: false });
