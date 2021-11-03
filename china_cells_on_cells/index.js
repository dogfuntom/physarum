'use strict';

let fileNamePrefix = "island"

let FPS = 30
let animDuration = 40 * FPS
let animDelay = animDuration
let isRendering = false

let twgl = require('twgl.js')
let WebMidi = require('webmidi')
let chroma = require('chroma-js')

let midi = JSON.parse(localStorage.getItem("midi"));
if (!midi) midi = Array(64).fill(.5)
// midi = [0,0.05511811023622047,0.5354330708661418,0.1732283464566929,0.5511811023622047,1,0.6929133858267716,0.4015748031496063,1,0.023622047244094488,0,0.5039370078740157,0.7086614173228346,0.015748031496062992,0.5590551181102362,0.11023622047244094,1,0.9606299212598425,1,0,0,0.3228346456692913,0.6535433070866141,1,0.5196850393700787,0.49606299212598426,1,0.12598425196850394,1,0.49606299212598426,0.5039370078740157,0.33858267716535434,0.015748031496062992,0.8031496062992126,0.8503937007874016,0.36220472440944884,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.7795275590551181,0.2283464566929134,0.2755905511811024,0.3228346456692913,0.5,0.18110236220472442,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5]
let palette = ['#230f2b', '#f21d41', '#ebebbc', '#bce3c5', '#82b3ae']
palette = palette.map(c => chroma(c).gl())
palette = palette.sort((a, b) => chroma(a).get('lch.l') - chroma(b).get('lch.l'))


WebMidi.enable(function (err) {
  if (err) {
    console.log("WebMidi could not be enabled.", err);
  }
  var input = WebMidi.inputs[0];

  input.addListener('controlchange', "all",
    function (e) {
      // console.log("Received 'controlchange' message.", e);
      let [code, id, value] = Array.from(e.data);
      value = value / 127
      console.log(id, value);
      if (code == 176) {
        midi[id] = value
      }
      localStorage.setItem("midi", JSON.stringify(midi));
    });
})


function Pass(frag, size) {
  if (size.length)
    this.resolution = size
  else
    this.resolution = [size, size]

  this.vert = `
  precision mediump float;
  attribute vec2 position;
  varying vec2 uv;
  void main() {
    uv = position * .5 + .5;
    gl_Position = vec4(position, 0.0, 1.0);
  }`
  this.frag = frag;
  this.program = twgl.createProgramInfo(gl, [this.vert, this.frag]);
  this.attachments = [{ format: gl.RGBA, type: gl.FLOAT, minMag: gl.NEAREST, wrap: gl.CLAMP_TO_EDGE }];
  this.buffer = twgl.createFramebufferInfo(gl, this.attachments, ...this.resolution);
  this.backbuffer = twgl.createFramebufferInfo(gl, this.attachments, ...this.resolution);
  this.positionObject = { position: { data: [1, 1, 1, -1, -1, -1, -1, 1], numComponents: 2 } };
  this.positionBuffer = twgl.createBufferInfoFromArrays(gl, this.positionObject);

  this.draw = (uniforms, target) => {
    gl.useProgram(this.program.program);
    twgl.setBuffersAndAttributes(gl, this.program, this.positionBuffer);

    uniforms.backbuffer = this.backbuffer.attachments[0]
    // console.log('y', uniforms.backbuffer)
    uniforms.u_resolution = this.resolution

    twgl.setUniforms(this.program, uniforms);
    if (typeof target !== 'undefined')
      twgl.bindFramebufferInfo(gl, null);
    else
      twgl.bindFramebufferInfo(gl, this.buffer);
    let tmp = this.buffer
    this.buffer = this.backbuffer
    this.backbuffer = tmp

    twgl.drawBufferInfo(gl, this.positionBuffer, gl.TRIANGLE_FAN);
  }
}




const fCell = require('./cell.frag');
const fConway = require('./conway.frag');
const fDraw = require('./draw.frag');

let tick = 0
const canvas = document.getElementById('canvasgl');
const gl = twgl.getWebGLContext(canvas, { antialias: false, depth: false });
twgl.addExtensionsToContext(gl);
console.log(gl.getExtension("OES_texture_float"));
console.log(gl.getExtension("WEBGL_color_buffer_float"));

let dt;
let prevTime;

let passes = {
  conway: new Pass(fConway, 17),
  draw: new Pass(fDraw, [canvas.width, canvas.height]),
}

function draw(time) {
  twgl.resizeCanvasToDisplaySize(gl.canvas);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  dt = (prevTime) ? time - prevTime : 0;
  prevTime = time;

  passes.conway.draw({
    tick: tick,
    midi: midi,
    u_time: (tick - animDelay) / animDuration,
  })

  passes.draw.draw({
    prevStateConway: passes.conway.backbuffer.attachments[0],
    u_conway_res: passes.conway.resolution,
    midi: midi,
    u_time: (tick - animDelay) / animDuration,
    palette: palette.flat(),
  }, null)

  if (isRendering == true && tick > animDelay) {
    let link = document.getElementById('link');
    const zeroPad = (num, places) => String(num).padStart(places, '0')

    link.setAttribute('download', fileNamePrefix + `${zeroPad(tick - animDelay, 6)}.png`);
    link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
    link.click();
    if ((tick - animDelay) / animDuration > 1) isRendering = false
  }

  tick++
}

if (isRendering) setInterval(animate, 200)
else animate()

function animate(now) {
  draw(now / 1000);
  // setTimeout(requestAnimationFrame, 50, animate);
  if (isRendering == false)
    requestAnimationFrame(animate);
}
