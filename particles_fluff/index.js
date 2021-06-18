'use strict';

// тут делаю пушистиков. Это будут такие мини-салюты из партиклов, то здесь то там 
// партиклы будут разлетаться из одного центра, в псевдотрёхмерном пространстве. 
// На них будет действовать объёмный нойс, сила тяжести. В центре они будут невидимые,
// яркость будет проявляться по краям, потом они будут гаснуть.
// Одновременно может формироваться несколько пушистиков, партиклы будут сами решать, 
// в каком их них поучаствовать. Всё будет белыми и серыми линиями на чёрном фоне, 


let twgl = require('twgl.js')

const vFlat = require('./flat.vert')
const fParticles = require('./particles.frag')
const vRender = require('./render.vert');
const fRender = require('./render.frag');
const fDraw = require('./draw.frag')
const fShow = require('./show.frag')

const canvas = document.getElementById('canvasgl')
const gl = twgl.getWebGLContext(canvas, { antialias: false, depth: false })
twgl.addExtensionsToContext(gl)
gl.getExtension("OES_texture_float")
gl.getExtension("WEBGL_color_buffer_float")

const programParticles = twgl.createProgramInfo(gl, [vFlat, fParticles]);
const programRender = twgl.createProgramInfo(gl, [vRender, fRender]);
const programDraw = twgl.createProgramInfo(gl, [vFlat, fDraw])
const programShow = twgl.createProgramInfo(gl, [vFlat, fShow])

const attachments = [{ format: gl.RGBA, type: gl.FLOAT, minMag: gl.LINEAR, wrap: gl.CLAMP_TO_EDGE }]
const n = 16
const m = n
const drawSize = 1024
let fb1 = twgl.createFramebufferInfo(gl, attachments, n, m)
let fb2 = twgl.createFramebufferInfo(gl, attachments, n, m)
// let masses = twgl.createFramebufferInfo(gl, attachments, n, m) // только один канал будем юзать, надо упростить потом
let draw1 = twgl.createFramebufferInfo(gl, attachments, drawSize, drawSize)
let draw2 = twgl.createFramebufferInfo(gl, attachments, drawSize, drawSize)

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
  // v_mass: { data: pointMass, numComponents: 1 }, // тут тоже надо массу передать, иначе она в физику не попадёт
  // но что-то у меня вопрос с размерностью данных. по идее не должно заработать, потому что тут у нас вершин всего 4
  // а массу непойми как передавать. Наверное, только через текстуру.
  // Вижу такие варианты:
  // 1. передавать массу через юниформ текстуру.
  // 2. Вычислять её в шейдере, в зависимости от координат ФБО, так проще
}
const positionBuffer = twgl.createBufferInfoFromArrays(gl, positionObject)



{  // to draw buffer, only ONCE
  gl.useProgram(programDraw.program);
  twgl.setBuffersAndAttributes(gl, programDraw, positionBuffer);
  twgl.setUniforms(programDraw, {
    u_tex_draw: draw1.attachments[0],
    // u_tick: tick,
    // u_time: time,
  });
  twgl.bindFramebufferInfo(gl, draw2);
  twgl.drawBufferInfo(gl, positionBuffer, gl.TRIANGLE_FAN);
}

let tick = 0
let timeStart = new Date() / 1000
let temp

function draw(time) {
  time = new Date() / 1000 - timeStart

  twgl.resizeCanvasToDisplaySize(gl.canvas);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  temp = fb1;
  fb1 = fb2;
  fb2 = temp;

  {  // FBO physics
    gl.useProgram(programParticles.program);
    twgl.setBuffersAndAttributes(gl, programParticles, positionBuffer);
    twgl.setUniforms(programParticles, {
      u_tex_fbo: fb1.attachments[0],
      u_tick: tick,
      u_time: time,
      u_resolution: [n, m],
    });
    twgl.bindFramebufferInfo(gl, fb2);
    twgl.drawBufferInfo(gl, positionBuffer, gl.TRIANGLE_FAN);
  }

  temp = draw1;
  draw1 = draw2;
  draw2 = temp;

  {  // render particles from FBO
    gl.useProgram(programRender.program);
    twgl.setBuffersAndAttributes(gl, programRender, pointsBuffer);
    twgl.setUniforms(programRender, {
      u_tex_fbo: fb2.attachments[0],
      u_tex_draw: draw1.attachments[0],
      u_time: time,
      u_resolution: [drawSize, drawSize],
    });
    twgl.bindFramebufferInfo(gl, draw2);
    twgl.drawBufferInfo(gl, pointsBuffer, gl.POINTS);
  }
 
  {  // to screen
    gl.useProgram(programShow.program);
    twgl.setBuffersAndAttributes(gl, programShow, positionBuffer);
    twgl.setUniforms(programShow, {
      // u_tex_fbo: fb1.attachments[0],
      u_tex_draw: draw2.attachments[0],
    });
    twgl.bindFramebufferInfo(gl, null);
    twgl.drawBufferInfo(gl, positionBuffer, gl.TRIANGLE_FAN);
  }

  tick++
}

(function animate(now) {
  draw();
  setTimeout(animate, 10)
  // requestAnimationFrame(animate)
})(0);