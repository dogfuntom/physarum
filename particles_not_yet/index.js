'use strict';
let twgl = require('twgl.js')

// particle initialization
const vInit = require('./init.vert');
const fInit = require('./init.frag');

// particle physics in a cycle
const vPhysics = require('./physics.vert');
const fPhysics = require('./physics.frag');

// rendering particles to a buffer
const vRender = require('./render.vert');
const fRender = require('./render.frag');

// rendering particles to a buffer
const vDraw = require('./draw.vert');
const fDraw = require('./draw.frag');

const mousepos = [0.5, 0.5];
const canvas = document.getElementById('canvasgl');
const gl = twgl.getWebGLContext(canvas, { antialias: false, depth: false });
twgl.addExtensionsToContext(gl);
console.log(gl.getExtension("OES_texture_float"));
console.log(gl.getExtension("WEBGL_color_buffer_float"));

const programInit = twgl.createProgramInfo(gl, [vInit, fInit]);
const programPhysics = twgl.createProgramInfo(gl, [vPhysics, fPhysics]);
const programRender = twgl.createProgramInfo(gl, [vRender, fRender]);
const programDraw = twgl.createProgramInfo(gl, [vDraw, fDraw]);

const attachments = [{ format:gl.RGBA, type:gl.FLOAT, minMag: gl.LINEAR, wrap: gl.CLAMP_TO_EDGE }];
const n = 128;
const m = 128;
let fb1 = twgl.createFramebufferInfo(gl, attachments, n, m);
let fb2 = twgl.createFramebufferInfo(gl, attachments, n, m);
const positionObject = { position: { data: [1, 1, 1, -1, -1, -1, -1, 1], numComponents: 2 } };
const positionBuffer = twgl.createBufferInfoFromArrays(gl, positionObject);


const pointData = [];
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    pointData.push(Math.random());
    pointData.push(Math.random());
  }
}
const pointsObject = { v_texcoord: { data: pointData, numComponents: 2 } };
const pointsBuffer = twgl.createBufferInfoFromArrays(gl, pointsObject);

// particle initialization
gl.useProgram(programInit.program);
twgl.setBuffersAndAttributes(gl, programInit, positionBuffer);
twgl.bindFramebufferInfo(gl, fb1);
twgl.drawBufferInfo(gl, positionBuffer, gl.TRIANGLE_FAN);

let dt;
let prevTime;
let temp;
let offGravity = 0;
let restoreColors = 0;
let tick = 0

function draw(time) {
  // FIXME clear in a more fast way
  let particlesRenderedBuffer = twgl.createFramebufferInfo(gl, attachments, 1024, 1024);

  twgl.resizeCanvasToDisplaySize(gl.canvas);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  dt = (prevTime) ? time - prevTime : 0;
  prevTime = time;

  // particle physics
  gl.useProgram(programPhysics.program);
  twgl.setBuffersAndAttributes(gl, programPhysics, positionBuffer);
  twgl.setUniforms(programPhysics, {
    u_texture: fb1.attachments[0],
    gravity_center: mousepos,
    off_gravity: offGravity,
    restore_colors: restoreColors,
    dt: 2.5 * dt,
  });
  twgl.bindFramebufferInfo(gl, fb2);
  twgl.drawBufferInfo(gl, positionBuffer, gl.TRIANGLE_FAN);

  // drawing particles points rendered
  gl.useProgram(programRender.program);
  twgl.setBuffersAndAttributes(gl, programRender, pointsBuffer);
  twgl.setUniforms(programRender, { u_texture: fb2.attachments[0] });
  twgl.bindFramebufferInfo(gl, particlesRenderedBuffer);
  twgl.drawBufferInfo(gl, pointsBuffer, gl.POINTS);

  // // feromones
  // gl.useProgram(programFeromone.program);
  // twgl.setBuffersAndAttributes(gl, programFeromone, positionBuffer);
  // twgl.setUniforms(programFeromone, {
  //   prevStateCells: particlesRenderedBuffer.attachments[0],
  //   prevStateFeromones: feromone1.attachments[0],
  //   tick: tick,
  //   u_time: new Date() / 1000,
  //   u_resolution: [1024, 1024],
  //   u_mouse: mousepos,
  // });
  // twgl.bindFramebufferInfo(gl, feromone2);
  // twgl.drawBufferInfo(gl, positionBuffer, gl.TRIANGLE_FAN);

  // drawing
  gl.useProgram(programDraw.program);
  twgl.setBuffersAndAttributes(gl, programDraw, positionBuffer);
  twgl.setUniforms(programDraw, {
    u_texture: particlesRenderedBuffer.attachments[0],
  });
  twgl.bindFramebufferInfo(gl, null);
  twgl.drawBufferInfo(gl, positionBuffer, gl.TRIANGLE_FAN);



  // ping-pong buffers
  temp = fb1;
  fb1 = fb2;
  fb2 = temp;

  tick++
}

(function animate(now) {
  draw(now / 1000);
  requestAnimationFrame(animate);
})(0);

function setMousePos(e) {
  mousepos[0] = e.clientX / gl.canvas.clientWidth;
  mousepos[1] = 1 - e.clientY / gl.canvas.clientHeight;
}

canvas.addEventListener('mousemove', setMousePos);

canvas.addEventListener('mouseleave', () => {
  mousepos[0] = 0.5;
  mousepos[1] = 0.5;
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
