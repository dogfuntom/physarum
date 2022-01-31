// @ts-check

import twgl from 'twgl.js'
import { ZShaderWrapper } from './z-shader-wrapper-2'

// WebGL
const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById('canvasgl'))
const gl = canvas.getContext('webgl2', { preserveDrawingBuffer: true })
gl.getExtension('EXT_color_buffer_float') // prevents Buffer Incomplete error
gl.getExtension('OES_texture_float_linear')

// Scene
const voxelsNum = 128
let segments, relief

function prepare2dSegmentsMap () {
  relief = [...Array(voxelsNum)].map((d) => [...Array(voxelsNum)].map((d) => Math.random()))
  segments = [...Array(voxelsNum)].map((d) => [...Array(voxelsNum)].fill(0))

  function getRelief (i, j) {
    i = (i + voxelsNum) % voxelsNum
    j = (j + voxelsNum) % voxelsNum
    return relief[i][j]
  }

  for (let x = 0; x < voxelsNum; x++) {
    for (let y = 0; y < voxelsNum; y++) {
      const S = 3
      let minVal = Infinity
      let idx = x
      let idy = y
      for (let step = 0; step < 3; step++) {
        let imin = 0
        let jmin = 0
        for (let i = -S; i <= S; i++) {
          for (let j = -S; j <= S; j++) {
            if (Math.hypot(i, j) > S) continue
            const r = getRelief(idx + i, idy + j)
            if (r < minVal) {
              minVal = r
              imin = i
              jmin = j
            }
          }
        }
        idx += imin
        idy += jmin
      }

      segments[x][y] = minVal * 1e3 - Math.floor(minVal * 1e3)
    }
  }
  console.log('segments, relief', segments, relief)
}

const rnd = (x) => {
  const s = x * 9e4
  return s - Math.floor(s)
}
function prepareTexVoxels () {
  // fill 3d array N×N×N filled with rgba(0,0,0,0)
  const texVoxelsArray = [...Array(voxelsNum)].map(() => [...Array(voxelsNum)].map(() => [...Array(voxelsNum)].map(_ => [0, 0, 0, 0])))

  prepare2dSegmentsMap()

  for (let x = 1; x < voxelsNum; x++) {
    for (let z = 1; z < voxelsNum; z++) {
      const id = segments[x][z]
      let height = -63
      if (id === segments[x - 1][z] && id === segments[x][z - 1] && id === segments[x - 1][z - 1]) {
        height = 4 + 8 * rnd(id)
      }
      for (let y = 0; y < 64 + height; y++) {
        texVoxelsArray[x][y][z] = [id, 0, 0, 0].map(d => d * 255)
      }
    }
  }

  console.log('texVoxelsArray', texVoxelsArray)

  const texVoxels = twgl.createTexture(gl, {
    src: texVoxelsArray.flat(3),
    width: texVoxelsArray[0].length,
    mag: gl.NEAREST,
    min: gl.NEAREST
  })

  return texVoxels
}

const texVoxels = prepareTexVoxels()

let tick = 0

twgl.resizeCanvasToDisplaySize(gl.canvas)
const zsw = new ZShaderWrapper(gl, twgl)

const passes = {
  gi: zsw.createPass(require('./gi.frag'), [canvas.width, canvas.height]),
  draw: zsw.createPass(require('./draw.frag'))
}

const params = [...Array(10)].map(() => Math.random())

const timeI = new Date().getSeconds()

function draw () {
  const time = new Date().getSeconds()
  twgl.resizeCanvasToDisplaySize(gl.canvas)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

  passes.gi.draw({
    u_frame: tick,
    tex: passes.gi.b,
    u_time: time - timeI,
    u_params: params,
    u_tex_voxels: texVoxels,
    u_voxels_num: voxelsNum
  }, 'self')

  passes.draw.draw({
    tex: passes.gi.b,
    u_resolution: [canvas.width, canvas.height]
  }, 'screen')

  tick++
  console.log(tick)
  if (tick < 3) {
    requestAnimationFrame(draw)
  }
}

draw()

window.addEventListener('resize', (e) => {
  resize()
})

function resize () {
  const w = window.innerWidth * window.devicePixelRatio
  const h = window.innerHeight * window.devicePixelRatio
  twgl.resizeFramebufferInfo(gl, passes.gi.buffer, passes.gi.attachments, w, h)
  twgl.resizeFramebufferInfo(gl, passes.gi.backbuffer, passes.gi.attachments, w, h)
  passes.gi.resolution = [w, h]
}
resize()
