'use strict';
let twgl = require('twgl.js')

const vShader = `#version 300 es
  precision mediump float;
  in vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }`;

const fShader = require('./shader.frag');

const mousepos = [.5, .0];
let tick = 0
let timeLounch = +new Date()
const canvas = document.getElementById('canvasgl');

// const gl = twgl.getWebGLContext(canvas, { antialias: false, depth: false });
const gl = canvas.getContext("webgl2");

twgl.addExtensionsToContext(gl);
console.log(gl.getExtension("OES_texture_float"));
console.log(gl.getExtension("WEBGL_color_buffer_float"));

const program = twgl.createProgramInfo(gl, [vShader, fShader]);

const n = 800;
const m = n;
const attachments = [{ format: gl.RGBA, type: gl.FLOAT, minMag: gl.NEAREST, wrap: gl.CLAMP_TO_EDGE }];
let shader = twgl.createFramebufferInfo(gl, attachments, n, m);
const positionObject = { position: { data: [1, 1, 1, -1, -1, -1, -1, 1], numComponents: 2 } };
const positionBuffer = twgl.createBufferInfoFromArrays(gl, positionObject);

let dt;
let prevTime;

function draw(time) {
  twgl.resizeCanvasToDisplaySize(gl.canvas);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  dt = (prevTime) ? time - prevTime : 0;
  prevTime = time;

  gl.useProgram(program.program);
  twgl.setBuffersAndAttributes(gl, program, positionBuffer);
  twgl.setUniforms(program, {
    // prevStateCells: shader.attachments[0],
    tick: tick,
    u_time: (new Date() - timeLounch) / 1000,
    u_resolution: [gl.canvas.clientWidth, gl.canvas.clientHeight],
    u_mouse: mousepos,
  });

  twgl.bindFramebufferInfo(gl, null);
  twgl.drawBufferInfo(gl, positionBuffer, gl.TRIANGLE_FAN);

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

// canvas.addEventListener('mouseleave', () => {
//   mousepos[0] = .501;
//   mousepos[1] = .501;
// });

// canvas.addEventListener('mousedown', e => {
//   if (e.button === 0) {
//     offGravity = 1;
//   } else {
//     restoreColors = 1;
//   }
// });

// window.addEventListener('mouseup', () => {
//   offGravity = 0;
//   restoreColors = 0;
// });

function handleTouch(e) {
  e.preventDefault();
  setMousePos(e.touches[0]);
}

// canvas.addEventListener('contextmenu', e => e.preventDefault());
canvas.addEventListener('touchstart', handleTouch, {passive: false});
canvas.addEventListener('touchmove', handleTouch, {passive: false});

