'use strict';
let twgl = require('twgl.js')

const vCell = `
  precision mediump float;

  attribute vec2 position;
  varying vec2 uv;

  void main() {
    uv = position * .5 + .5;
    gl_Position = vec4(position, 0.0, 1.0);
  }`;
const fCell = require('./cell.frag');
const fDraw = require('./draw.frag');


const mousepos = [0.5, 0.5];
let tick = 0
const canvas = document.getElementById('canvasgl');
const gl = twgl.getWebGLContext(canvas, { antialias: false, depth: false });
twgl.addExtensionsToContext(gl);
console.log(gl.getExtension("OES_texture_float"));
console.log(gl.getExtension("WEBGL_color_buffer_float"));

const programCell = twgl.createProgramInfo(gl, [vCell, fCell]);
// const programFeromone = twgl.createProgramInfo(gl, [vCell, fFeromone]);
const programDraw = twgl.createProgramInfo(gl, [vCell, fDraw]);

const n = 800;
const m = n;
const attachments = [{ format:gl.RGBA, type:gl.FLOAT, minMag: gl.NEAREST, wrap: gl.CLAMP_TO_EDGE }];
let cell1 = twgl.createFramebufferInfo(gl, attachments, n, m);
let cell2 = twgl.createFramebufferInfo(gl, attachments, n, m);
let feromone1 = twgl.createFramebufferInfo(gl, attachments, n, m);
let feromone2 = twgl.createFramebufferInfo(gl, attachments, n, m);
const positionObject = { position: { data: [1, 1, 1, -1, -1, -1, -1, 1], numComponents: 2 } };
const positionBuffer = twgl.createBufferInfoFromArrays(gl, positionObject);

const pointData = [];
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    pointData.push(i / (n - 1));
    pointData.push(j / (m - 1));
  }
}
const pointsObject = { v_texcoord: { data: pointData, numComponents: 2 } };
const pointsBuffer = twgl.createBufferInfoFromArrays(gl, pointsObject);

let dt;
let prevTime;
let temp;
let offGravity = 0;
let restoreColors = 0;

function draw(time) {
  twgl.resizeCanvasToDisplaySize(gl.canvas);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  dt = (prevTime) ? time - prevTime : 0;
  prevTime = time;

  // // feromones
  // gl.useProgram(programFeromone.program);
  // twgl.setBuffersAndAttributes(gl, programFeromone, positionBuffer);
  // twgl.setUniforms(programFeromone, {
  //   prevStateCells: cell1.attachments[0],
  //   prevStateFeromones: feromone1.attachments[0],
  //   tick: tick,
  //   u_time: new Date() / 1000,
  //   u_resolution: [n, m],
  //   u_mouse: mousepos,
  // });
  // twgl.bindFramebufferInfo(gl, feromone2);
  // twgl.drawBufferInfo(gl, positionBuffer, gl.TRIANGLE_FAN);

  // cells
  gl.useProgram(programCell.program);
  twgl.setBuffersAndAttributes(gl, programCell, positionBuffer);
  twgl.setUniforms(programCell, {
    prevStateCells: cell1.attachments[0],
    // prevStateFeromones: feromone1.attachments[0],
    tick: tick,
    u_time: new Date() / 1000,
    u_resolution: [n, m],
    u_mouse: mousepos,
  });
  twgl.bindFramebufferInfo(gl, cell2);
  twgl.drawBufferInfo(gl, positionBuffer, gl.TRIANGLE_FAN);

  gl.useProgram(programDraw.program);
  twgl.setBuffersAndAttributes(gl, programDraw, positionBuffer);
  twgl.setUniforms(programDraw, {
    prevStateCells: cell1.attachments[0],
    prevStateFeromones: feromone1.attachments[0],
  });
  twgl.bindFramebufferInfo(gl, null);
  twgl.drawBufferInfo(gl, positionBuffer, gl.TRIANGLE_FAN);



  // ping-pong buffers
  temp = cell1;
  cell1 = cell2;
  cell2 = temp;

  temp = feromone1;
  feromone1 = feromone2;
  feromone2 = temp;

  tick++
}

(function animate(now) {
  draw(now / 1000);
  // setTimeout(requestAnimationFrame, 50, animate);
  requestAnimationFrame(animate);
})(0);

function setMousePos(e) {
  mousepos[0] = e.clientX / gl.canvas.clientWidth;
  mousepos[1] = 1 - e.clientY / gl.canvas.clientHeight;
}

canvas.addEventListener('mousemove', setMousePos);

canvas.addEventListener('mouseleave', () => {
  mousepos[0] = 999.;
  mousepos[1] = 999.;
});

canvas.addEventListener('mousedown', e => {
  if (e.button === 0) {
    offGravity = 1;
  } else {
    restoreColors = 1;
  }
});

window.addEventListener('mouseup', () => {
  offGravity = 0;
  restoreColors = 0;
});

function handleTouch(e) {
  e.preventDefault();
  setMousePos(e.touches[0]);
}

canvas.addEventListener('contextmenu', e => e.preventDefault());
canvas.addEventListener('touchstart', handleTouch, {passive: false});
canvas.addEventListener('touchmove', handleTouch, {passive: false});

