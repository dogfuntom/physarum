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
// midi = [0.031496062992125984,0.06299212598425197,1,0,0.7322834645669292,0.8818897637795275,0.48031496062992124,1,0,0,0,0,1,0,0,0.007874015748031496,1,1,0.6535433070866141,0.7559055118110236,0.047244094488188976,0.3228346456692913,0.4566929133858268,0.25196850393700787,0.5118110236220472,0.5511811023622047,0.5275590551181102,0.1732283464566929,0.5196850393700787,0.5118110236220472,0.5118110236220472,0.5826771653543307,1,0.9133858267716536,1,0,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0,0,0,0.5511811023622047,0.15748031496062992,0,0.14960629921259844,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,1]
let palette = ['#230f2b', '#f21d41', '#ebebbc', '#bce3c5', '#82b3ae']
palette = palette.map(c => chroma(c).gl())
palette = palette.sort((a, b) => chroma(a).get('lch.l') - chroma(b).get('lch.l'))
let passes

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


function Pass({ frag, size = 8, texture }) {
  if (size.length)
    this.resolution = size
  else
    this.resolution = [size, size]

  console.log(this.resolution)
  this.vert = `
  precision mediump float;
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }`
  this.frag = frag
  this.program = twgl.createProgramInfo(gl, [this.vert, this.frag])
  this.attachments = [{ format: gl.RGBA, type: gl.FLOAT, minMag: gl.NEAREST, wrap: gl.CLAMP_TO_EDGE }]
  this.buffer = twgl.createFramebufferInfo(gl, this.attachments, ...this.resolution)
  this.backbuffer = twgl.createFramebufferInfo(gl, this.attachments, ...this.resolution)
  this.b = this.backbuffer.attachments[0]
  this.positionObject = { position: { data: [1, 1, 1, -1, -1, -1, -1, 1], numComponents: 2 } }
  this.positionBuffer = twgl.createBufferInfoFromArrays(gl, this.positionObject)

  this.texture = texture

  this.draw = ({ uniforms, target }) => {
    // target: self, screen, self+screen
    gl.useProgram(this.program.program)
    twgl.setBuffersAndAttributes(gl, this.program, this.positionBuffer)

    if (!uniforms.u_resolution) uniforms.u_resolution = this.resolution
    if (target != 'screen') // self or both
      uniforms.backbuffer = this.backbuffer.attachments[0]
    if (this.texture)
      uniforms.texture = this.texture
    twgl.setUniforms(this.program, uniforms)

    if (target != 'self') { // screen or both
      twgl.bindFramebufferInfo(gl, null)
      twgl.drawBufferInfo(gl, this.positionBuffer, gl.TRIANGLE_FAN)
    }
    if (target != 'screen') { // self or both
      twgl.bindFramebufferInfo(gl, this.buffer)
      let tmp = this.buffer
      this.buffer = this.backbuffer
      this.backbuffer = tmp
      this.b = this.backbuffer.attachments[0]
      twgl.drawBufferInfo(gl, this.positionBuffer, gl.TRIANGLE_FAN)
    }
  }
}



let tick = 0
const canvas = document.getElementById('canvasgl')
const gl = twgl.getWebGLContext(canvas, { antialias: false, depth: false })
twgl.addExtensionsToContext(gl)
gl.getExtension("OES_texture_float")
gl.getExtension("WEBGL_color_buffer_float")

let dt;
let prevTime;

let conwayInitTexture = twgl.createTexture(gl, {
  // src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARAQMAAAABo9W5AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAZQTFRFAAAA////pdmf3QAAABVJREFUeJxjYMAD+CwYGLg0IDQeAAAZpgC/nhpjBAAAAABJRU5ErkJggg==',
  src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARAQMAAAABo9W5AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAZQTFRFAAAA////pdmf3QAAADBJREFUeJxjYIACHgkGBjYDBgbVIAYG6zwGBtEQBgY+C4gciAbxQeIgeZA6kHooAACUUgRTZfOwlgAAAABJRU5ErkJggg==',
  crossOrigin: '', // not needed if image on same origin
}, function (err, tex, img) {
  // wait for the image to load because we need to know it's size
  // start();
});

passes = {
  rnd: new Pass({
    frag: require('./rnd.frag'),
    size: 1024,
  }),
  ca: new Pass({
    frag: require('./ca.frag'),
    size: 1024,
  }),
  draw: new Pass({
    frag: require('./draw.frag'),
  }),
}


function draw(time) {
  twgl.resizeCanvasToDisplaySize(gl.canvas);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  dt = (prevTime) ? time - prevTime : 0;
  prevTime = time;

  passes.rnd.draw({ uniforms: { tick: tick, }, target: 'self', })

  passes.ca.draw({ uniforms: { tick: tick, tex: passes.rnd.b, divisions: 1, }, target: 'self', })
  // // let tmp = passes.ca.buffer; passes.ca.buffer = passes.ca.backbuffer; passes.ca.backbuffer = tmp
  passes.ca.draw({ uniforms: { tick: tick, tex: passes.ca.b, divisions: 2, }, target: 'self', })
  passes.ca.draw({ uniforms: { tick: tick, tex: passes.ca.b, divisions: 3, }, target: 'self', })
  passes.ca.draw({ uniforms: { tick: tick, tex: passes.ca.b, divisions: 4, }, target: 'self', })
  passes.ca.draw({ uniforms: { tick: tick, tex: passes.ca.b, divisions: 5, }, target: 'self', })

  // passes.ca.draw({
  //   uniforms: {
  //     tex: passes.ca.b,
  //     divisions: 2,
  //   },
  //   target: 'self',
  // })

  // passes.ca.draw({
  //   uniforms: {
  //     tex: passes.ca.b,
  //     divisions: 3,
  //   },
  //   target: 'self',
  // })

  passes.draw.draw({
    uniforms: {
      tex: passes.ca.b,
      midi: midi,
      u_time: (tick - animDelay) / animDuration,
      palette: palette.flat(),
      u_resolution: [canvas.width, canvas.height],
    },
    target: 'screen',
  })

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

// if (isRendering) setInterval(animate, 200)
// else animate()

setInterval(animate, 500)

function animate(now) {
  draw(now / 1000);
  // setTimeout(requestAnimationFrame, 50, animate);
  // if (isRendering == false)
  // requestAnimationFrame(animate);
}
