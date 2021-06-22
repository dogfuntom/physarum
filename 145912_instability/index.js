'use strict'

// пробую, как у фьюзов. Плюс максимально упростить то, что есть. Например, рисовать прямо на канвас, без дро.

let twgl = require('twgl.js')

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
const size = 1000
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



gl.enable(gl.BLEND);
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
