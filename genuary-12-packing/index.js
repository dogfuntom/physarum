'use strict';

// console.log('yo')
let fileNamePrefix = "island"

let FPS = 30
let animDuration = 40 * FPS
let animDelay = animDuration
let isRendering = false

let twgl = require('twgl.js')
let chroma = require('chroma-js');
const { random } = require('chroma-js');

// midi = [0,0.05511811023622047,0.5354330708661418,0.1732283464566929,0.5511811023622047,1,0.6929133858267716,0.4015748031496063,1,0.023622047244094488,0,0.5039370078740157,0.7086614173228346,0.015748031496062992,0.5590551181102362,0.11023622047244094,1,0.9606299212598425,1,0,0,0.3228346456692913,0.6535433070866141,1,0.5196850393700787,0.49606299212598426,1,0.12598425196850394,1,0.49606299212598426,0.5039370078740157,0.33858267716535434,0.015748031496062992,0.8031496062992126,0.8503937007874016,0.36220472440944884,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.7795275590551181,0.2283464566929134,0.2755905511811024,0.3228346456692913,0.5,0.18110236220472442,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5]
// midi = [0.031496062992125984,0.06299212598425197,1,0,0.7322834645669292,0.8818897637795275,0.48031496062992124,1,0,0,0,0,1,0,0,0.007874015748031496,1,1,0.6535433070866141,0.7559055118110236,0.047244094488188976,0.3228346456692913,0.4566929133858268,0.25196850393700787,0.5118110236220472,0.5511811023622047,0.5275590551181102,0.1732283464566929,0.5196850393700787,0.5118110236220472,0.5118110236220472,0.5826771653543307,1,0.9133858267716536,1,0,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0,0,0,0.5511811023622047,0.15748031496062992,0,0.14960629921259844,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,1]
let palette = ['#230f2b', '#f21d41', '#ebebbc', '#bce3c5', '#82b3ae']
palette = palette.map(c => chroma(c).gl())
palette = palette.sort((a, b) => chroma(a).get('lch.l') - chroma(b).get('lch.l'))
let passes



let N = 128
let segments, relief
let texVoxelsArray = [...Array(N)].map(() => [...Array(N)].map(() => [...Array(N)].map(_ => [0, 0, 0, 0])))

prepare2dSegmentsMap()

let rnd = (x) => {
  let s = Math.sin(x * 9e3) * 9e3
  return s - Math.floor(s)
}

for (let x = 1; x < N; x++) {
  for (let z = 1; z < N; z++) {
    let id = segments[x][z]
    let height = -63;
    if (id == segments[x - 1][z] && id == segments[x][z-1] && id == segments[x-1][z-1])
      height = 4 + 8 * rnd(id);
      for (let y = 0; y < 64 + height; y++) {
        texVoxelsArray[x][y][z] = [id * 255, 0, 0, 0]
      }
  }
}

// texVoxelsArray[zz][yy][xx] = [xx*2,yy*2,zz*2,1]
console.log('texVoxelsArray', texVoxelsArray)





function Pass({ frag, size = 8, texture }) {
  if (size.length)
    this.resolution = size
  else
    this.resolution = [size, size]

  // console.log(this.resolution)
  this.vert = `#version 300 es
  precision mediump float;
  in vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }`
  this.frag = frag
  this.program = twgl.createProgramInfo(gl, [this.vert, this.frag])
  this.attachments = [{ internalFormat: gl.RGBA32F }]

  this.buffer = twgl.createFramebufferInfo(gl, this.attachments, ...this.resolution)
  this.backbuffer = twgl.createFramebufferInfo(gl, this.attachments, ...this.resolution)

  this.b = this.backbuffer.attachments[0]
  // while(gl.checkFramebufferStatus(gl.FRAMEBUFFER) != gl.FRAMEBUFFER_COMPLETE){
  //   console.log(gl.checkFramebufferStatus(gl.FRAMEBUFFER), gl.FRAMEBUFFER_COMPLETE, gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT)
  // }

  this.positionObject = { position: { data: [1, 1, 1, -1, -1, -1, -1, 1], numComponents: 2 } }
  this.positionBuffer = twgl.createBufferInfoFromArrays(gl, this.positionObject)

  this.texture = texture
  // console.log('texture', texture)


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
// const gl = (canvas, { antialias: false, depth: false })
const gl = canvas.getContext("webgl2", { preserveDrawingBuffer: true })
gl.getExtension('EXT_color_buffer_float');
gl.getExtension('OES_texture_float_linear');

let dt;
let prevTime;

let texVoxels = twgl.createTexture(gl, {
  src: texVoxelsArray.flat(3),
  width: texVoxelsArray[0].length,
  mag: gl.NEAREST,
  min: gl.NEAREST,
}, (err, tex, img) => { });

twgl.resizeCanvasToDisplaySize(gl.canvas);
passes = {
  gi: new Pass({
    frag: require('./gi.frag'),
    size: [canvas.width, canvas.height],
  }),
  draw: new Pass({
    frag: require('./draw.frag'),
  }),
}

let params = [...Array(10)].map(() => Math.random())

let timeI = new Date() / 1000
function draw() {
  let time = new Date() / 1000
  twgl.resizeCanvasToDisplaySize(gl.canvas);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  dt = (prevTime) ? time - prevTime : 0;
  prevTime = time;

  passes.gi.draw({
    uniforms: {
      u_frame: tick,
      tex: passes.gi.b,
      u_time: time - timeI,
      u_params: params,
      u_tex_voxels: texVoxels,
    },
    target: 'self',
  })
  // console.log(time - timeI)
  passes.draw.draw({
    uniforms: {
      tex: passes.gi.b,
      u_resolution: [canvas.width, canvas.height],
    },
    target: 'screen',
  })

  tick++
}

animate()
function animate() {
  draw();
  // setTimeout(requestAnimationFrame, 50, animate);
  // if (isRendering == false)
  if (tick < 300)
    requestAnimationFrame(animate);
  console.log(tick)
}

window.addEventListener('resize', (e) => {
  resize()
})

function resize() {
  let w = window.innerWidth * window.devicePixelRatio
  let h = window.innerHeight * window.devicePixelRatio
  twgl.resizeFramebufferInfo(gl, passes.gi.buffer, passes.gi.attachments, w, h)
  twgl.resizeFramebufferInfo(gl, passes.gi.backbuffer, passes.gi.attachments, w, h)
  passes.gi.resolution = [w, h]
}
resize()














function prepare2dSegmentsMap() {
  relief = [...Array(N)].map((d) => [...Array(N)].map((d) => Math.random()));
  segments = [...Array(N)].map((d) => [...Array(N)].fill(0));

  function getRelief(i, j) {
    i = (i + N) % N;
    j = (j + N) % N;
    return relief[i][j];
  }

  for (let x = 0; x < N; x++) {
    for (let y = 0; y < N; y++) {
      let S = 2;
      let minVal = Infinity;
      let idx = x;
      let idy = y;
      for (let step = 0; step < 3; step++) {
        let imin = 0
        let jmin = 0
        for (let i = -S; i <= S; i++) {
          for (let j = -S; j <= S; j++) {
            if (Math.hypot(i, j) > S) continue;
            let r = getRelief(idx + i, idy + j);
            if (r < minVal) {
              minVal = r;
              imin = i;
              jmin = j;
            }
          }
        }
        idx += imin
        idy += jmin
      }

      segments[x][y] = minVal * 1e3 - Math.floor(minVal * 1e3);
    }
  }
  console.log("segments, relief", segments, relief);



  // function getRelief(i, j) {
  //   i = i % N;
  //   if (i < 0) i = (i + N) % N;
  //   j = j % N;
  //   if (j < 0) j = (j + N) % N;
  //   return relief[i][j];
  // }

  // function indexToIJ(index) {
  //   let i, j;
  //   if (index == 0) {
  //     i = 0;
  //     j = 0;
  //   } else if (index == 1) {
  //     i = 0;
  //     j = 0 - 1;
  //   } else if (index == 2) {
  //     i = 0 + 1;
  //     j = 0;
  //   } else if (index == 3) {
  //     i = 0;
  //     j = 0 + 1;
  //   } else if (index == 4) {
  //     i = 0 - 1;
  //     j = 0;
  //   }
  //   return [i, j];
  // }

  // for (let i = 0; i < N; i++) {
  //   for (let j = 0; j < N; j++) {
  //     if (segments[i][j] > 0) continue;
  //     let n = [];
  //     n[0] = getRelief(i, j);
  //     n[1] = getRelief(i, j - 1);
  //     n[2] = getRelief(i + 1, j);
  //     n[3] = getRelief(i, j + 1);
  //     n[4] = getRelief(i - 1, j);
  //     let indexMin = 0;
  //     for (let index = 1; index < 5; index++) {
  //       if (n[index] < n[0]) indexMin = index;
  //     }
  //     if (indexMin == 0) {
  //       segments[i][j] = Math.random();
  //     } else {
  //       segments[i][j] = -indexMin; // negative is for index
  //     }
  //   }
  // }

  // for (let i = 0; i < N; i++) {
  //   for (let j = 0; j < N; j++) {
  //     let si = i,
  //       sj = j;
  //     while (segments[si][sj] < 0) {
  //       let index = -segments[si][sj];
  //       let [di, dj] = indexToIJ(index);
  //       si += di;
  //       sj += dj;
  //       si = si % N;
  //       if (si < 0) si = (si + N) % N;
  //       sj = sj % N;
  //       if (sj < 0) sj = (sj + N) % N;
  //     }
  //     segments[i][j] = segments[si][sj]
  //   }
  // }
  // console.log('segments, relief', segments, relief)
}



// План:
// - убрать GI
// - Сделать 3д текстуру из плоской, каждый дом поднять на определённую высоту.
// - Передать её в шейдер, рисовать пока что тупо кубиками.
// - засунуть в шейдер домик https://bit.ly/3fnKGu0
// - в зависимости от горизонтальных соседей кубика выбирать правильный кусок дома,
// - задавать дому айдишник его сегмента.
// - вернуть ГИ
// - Готово, в принципе.
// 
// 
// 
// 
// 
// 
// 
// 
