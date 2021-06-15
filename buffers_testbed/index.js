'use strict';
let twgl = require('twgl.js')

const vFlat = require('./flat.vert')
const fDraw = require('./draw.frag')
const fShow = require('./show.frag')

const canvas = document.getElementById('canvasgl')
const gl = twgl.getWebGLContext(canvas, { antialias: false, depth: false })
twgl.addExtensionsToContext(gl)
gl.getExtension("OES_texture_float")
gl.getExtension("WEBGL_color_buffer_float")

const programDraw = twgl.createProgramInfo(gl, [vFlat, fDraw])
const programShow = twgl.createProgramInfo(gl, [vFlat, fShow])

const attachments = [{ format:gl.RGBA, type:gl.FLOAT, minMag: gl.LINEAR, wrap: gl.CLAMP_TO_EDGE }]
const n = 128
const m = 128
let draw1 = twgl.createFramebufferInfo(gl, attachments, n, m)
let draw2 = twgl.createFramebufferInfo(gl, attachments, n, m)
const positionObject = { position: { data: [1, 1, 1, -1, -1, -1, -1, 1], numComponents: 2 } }
const positionBuffer = twgl.createBufferInfoFromArrays(gl, positionObject)

let tick = 0

function draw(time) {
  twgl.resizeCanvasToDisplaySize(gl.canvas);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  // to draw buffer
  gl.useProgram(programDraw.program);
  twgl.setBuffersAndAttributes(gl, programDraw, positionBuffer);
  twgl.setUniforms(programDraw, {
    u_tex_draw: draw1.attachments[0],
    u_tick: tick,
    u_time: new Date() / 1000,
  });
  twgl.bindFramebufferInfo(gl, draw2);
  twgl.drawBufferInfo(gl, positionBuffer, gl.TRIANGLE_FAN);

  // to screen
  gl.useProgram(programShow.program);
  twgl.setBuffersAndAttributes(gl, programShow, positionBuffer);
  twgl.setUniforms(programShow, {
    u_tex_draw: draw1.attachments[0],
  });
  twgl.bindFramebufferInfo(gl, null);
  twgl.drawBufferInfo(gl, positionBuffer, gl.TRIANGLE_FAN);

  // ping-pong buffers
  let temp = draw1; 
  draw1 = draw2;
  draw2 = temp;

  tick++
}

(function animate(now) {
  draw(now / 1000);
  setTimeout(animate, 10)
  // requestAnimationFrame(animate)
})(0);