'use strict';
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
const m = 16
const drawSize = 512
let fb1 = twgl.createFramebufferInfo(gl, attachments, n, m);
let fb2 = twgl.createFramebufferInfo(gl, attachments, n, m);
let draw1 = twgl.createFramebufferInfo(gl, attachments, drawSize, drawSize)
let draw2 = twgl.createFramebufferInfo(gl, attachments, drawSize, drawSize)
const positionObject = { position: { data: [1, 1, 1, -1, -1, -1, -1, 1], numComponents: 2 } }
const positionBuffer = twgl.createBufferInfoFromArrays(gl, positionObject)

// can it be removed?
const pointData = [];
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    pointData.push(Math.random())
    pointData.push(Math.random())
  }
}
const pointsObject = { v_texcoord: { data: pointData, numComponents: 2 } }
const pointsBuffer = twgl.createBufferInfoFromArrays(gl, pointsObject)

let tick = 0
let timeStart = new Date() / 1000

function draw(time) {
  time = new Date() / 1000 - timeStart

  twgl.resizeCanvasToDisplaySize(gl.canvas);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  {  // FBO physics
    gl.useProgram(programParticles.program);
    twgl.setBuffersAndAttributes(gl, programParticles, positionBuffer);
    twgl.setUniforms(programParticles, {
      u_tex_fbo: fb1.attachments[0],
      u_tick: tick,
      u_time: time,
    });
    twgl.bindFramebufferInfo(gl, fb2);
    twgl.drawBufferInfo(gl, positionBuffer, gl.TRIANGLE_FAN);
  }

  {  // render particles from FBO
    gl.useProgram(programRender.program);
    twgl.setBuffersAndAttributes(gl, programRender, pointsBuffer);
    twgl.setUniforms(programRender, {
      u_tex_fbo: fb1.attachments[0],
    });
    twgl.bindFramebufferInfo(gl, draw1);
    twgl.drawBufferInfo(gl, pointsBuffer, gl.POINTS);
  }

  {  // to draw buffer
    gl.useProgram(programDraw.program);
    twgl.setBuffersAndAttributes(gl, programDraw, positionBuffer);
    twgl.setUniforms(programDraw, {
      u_tex_draw: draw1.attachments[0],
      u_tick: tick,
      u_time: time,
    });
    twgl.bindFramebufferInfo(gl, draw2);
    twgl.drawBufferInfo(gl, positionBuffer, gl.TRIANGLE_FAN);
  }

  {  // to screen
    gl.useProgram(programShow.program);
    twgl.setBuffersAndAttributes(gl, programShow, positionBuffer);
    twgl.setUniforms(programShow, {
      // u_tex_fbo: fb1.attachments[0],
      u_tex_draw: draw1.attachments[0],
    });
    twgl.bindFramebufferInfo(gl, null);
    twgl.drawBufferInfo(gl, positionBuffer, gl.TRIANGLE_FAN);
  }

  // ping-pong buffers
  let temp
  temp = draw1;
  draw1 = draw2;
  draw2 = temp;
  temp = fb1;
  fb1 = fb2;
  fb2 = temp;

  tick++
}

(function animate(now) {
  draw();
  setTimeout(animate, 10)
  // requestAnimationFrame(animate)
})(0);