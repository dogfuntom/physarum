'use strict'

// пробую, как у фьюзов. Плюс максимально упростить то, что есть. Например, рисовать прямо на канвас, без дро.

let twgl = require('twgl.js')
const dat = require('dat.gui')
const gui = new dat.GUI()


var obj = {
  LOOKUP_DIST: .1,
  LOOKUP_ANGLE: .1,
  TURN_ANGLE: .1,
  STEP_SIZE: .1,
  DECAY: .5,
  DIFFUSE_RADIUS: 2,
  DEPOSITE: .001,
  SENCE_MIN: .001,
  SENCE_MAX: 1,
  LIGHTNESS: 100,
  SENSE_ADD: .0001,
  // RESPAW: true,
}

gui.remember(obj)
gui.add(obj, 'LOOKUP_DIST').min(-.1).max(.1).step(0.001)
gui.add(obj, 'STEP_SIZE').min(-.1).max(.5).step(0.001)
gui.add(obj, 'LOOKUP_ANGLE').min(-Math.PI*.5).max(Math.PI*.5).step(0.001)
gui.add(obj, 'TURN_ANGLE').min(-Math.PI*.5).max(Math.PI*.5).step(0.001)
gui.add(obj, 'DEPOSITE').min(0).max(.00001).step(.00000001)
gui.add(obj, 'DECAY').min(0).max(1).step(0.001)
// gui.add(obj, 'DIFFUSE_RADIUS').min(0).max(8).step(1)
gui.add(obj, 'SENCE_MIN').min(0).max(.01).step(.00001)
gui.add(obj, 'SENSE_ADD').min(-.01).max(.01).step(.00001)
gui.add(obj, 'LIGHTNESS').min(1).max(1000).step(1)


const mousepos = [0, 0]

const vFlat = require('./flat.vert')
const fParticles = require('./particles.frag')
const vRender = require('./render.vert')
const fRender = require('./render.frag')
const fClear = require('./clear.frag')
const fDiffusion = require('./diffusion.frag')
const fShow = require('./show.frag')

const canvas = document.getElementById('canvasgl')
const gl = twgl.getWebGLContext(canvas, {
  antialias: true,
  depth: false,
  preserveDrawingBuffer: true,
  // premultipliedAlpha: false, 
  // alpha: false,
})

twgl.addExtensionsToContext(gl)
gl.getExtension("OES_texture_float")
gl.getExtension("WEBGL_color_buffer_float")

const programParticles = twgl.createProgramInfo(gl, [vFlat, fParticles]);
const programRender = twgl.createProgramInfo(gl, [vRender, fRender]);
const programClear = twgl.createProgramInfo(gl, [vFlat, fClear])
const programDiffusion = twgl.createProgramInfo(gl, [vFlat, fDiffusion])
const programShow = twgl.createProgramInfo(gl, [vFlat, fShow])

const attachments = [{ format: gl.RGBA, type: gl.FLOAT, minMag: gl.LINEAR, wrap: gl.CLAMP_TO_EDGE }]
const n = 1000
const m = n
const size = 500
let fb1 = twgl.createFramebufferInfo(gl, attachments, n, m)
let fb2 = twgl.createFramebufferInfo(gl, attachments, n, m)
let draw1 = twgl.createFramebufferInfo(gl, attachments, size, size)
let draw2 = twgl.createFramebufferInfo(gl, attachments, size, size)

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
function draw(time) {
  time = new Date() / 1000 - timeStart

  twgl.resizeCanvasToDisplaySize(gl.canvas)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

  {  // diffusion
    gl.blendFunc(gl.ONE, gl.ZERO)
    gl.useProgram(programDiffusion.program);
    twgl.setBuffersAndAttributes(gl, programDiffusion, positionBuffer);
    twgl.setUniforms(programDiffusion, {
      u_tex_draw: draw2.attachments[0],
      u_resolution: [size, size],
      DECAY: obj.DECAY,
      // DIFFUSE_RADIUS: obj.DIFFUSE_RADIUS,
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
      TURN_ANGLE: obj.TURN_ANGLE,
      STEP_SIZE: obj.STEP_SIZE,
      SENCE_MIN: obj.SENCE_MIN,
      SENCE_MAX: obj.SENCE_MAX,
      SENSE_ADD: obj.SENSE_ADD,
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
      DEPOSITE: obj.DEPOSITE,
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

(function animate(now) {
  draw();
  // setTimeout(animate, 10)
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
