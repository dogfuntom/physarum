// @ts-check

export class ZShaderWrapper {
  /**
   * @param {WebGL2RenderingContext} gl
   * @param {import('twgl.js')} twgl
   */
  constructor (gl, twgl) {
    this.gl = gl
    this.twgl = twgl
  }

  /**
   * @param {string} frag
   * @param {number | number[]} [size=8]
   * @returns {Pass}
   */
  createPass (frag, size) {
    if (frag == null) throw Error('frag is expected')
    if (size == null) size = 8

    const resolution = Array.isArray(size) ? size : [size, size]
    console.debug(resolution)

    const vert = `#version 300 es
    precision mediump float;
    in vec2 position;
    void main() {
      gl_Position = vec4(position, 0.0, 1.0);
    }`

    return new Pass(this.gl, this.twgl, vert, frag, resolution)
  }
}

export class Pass {
  /**
   * @param {WebGL2RenderingContext} gl
   * @param {import('twgl.js')} twgl
   * @param {string} vert
   * @param {string} frag
   * @param {number[]} resolution
   */
  constructor (gl, twgl, vert, frag, resolution) {
    this.gl = gl
    this.twgl = twgl

    this.resolution = resolution

    const program = this.twgl.createProgramInfo(this.gl, [vert, frag])
    const attachments = [{ internalFormat: this.gl.RGBA32F }]

    const buffer = this.twgl.createFramebufferInfo(this.gl, attachments, ...resolution)
    const backbuffer = this.twgl.createFramebufferInfo(this.gl, attachments, ...resolution)

    this.b = backbuffer.attachments[0]

    this.positionObject = { position: { data: [1, 1, 1, -1, -1, -1, -1, 1], numComponents: 2 } }
    this.positionBuffer = this.twgl.createBufferInfoFromArrays(this.gl, this.positionObject)

    // @todo This variable needs a better name.
    this.buffer = buffer
    this.backbuffer = backbuffer
    this.program = program
    this.attachments = attachments
  }

  /**
   * @param {object} uniforms
   * @param {string} target
   */
  draw (uniforms, target) {
    if (uniforms == null) throw new Error('uniforms must be defined')
    if (target == null) throw new Error('target must be defined')

    console.info('b:', this.b)

    // target: self, screen, self+screen
    this.gl.useProgram(this.program.program)
    this.twgl.setBuffersAndAttributes(this.gl, this.program, this.positionBuffer)

    if (!uniforms.u_resolution) uniforms.u_resolution = this.resolution

    // self or both
    if (target !== 'screen') uniforms.backbuffer = this.backbuffer.attachments[0]

    this.twgl.setUniforms(this.program, uniforms)

    if (target !== 'self') { // screen or both
      this.twgl.bindFramebufferInfo(this.gl, null)
      this.twgl.drawBufferInfo(this.gl, this.positionBuffer, this.gl.TRIANGLE_FAN)
    }
    if (target !== 'screen') { // self or both
      this.twgl.bindFramebufferInfo(this.gl, this.buffer)
      const tmp = this.buffer
      this.buffer = this.backbuffer
      this.backbuffer = tmp
      this.b = this.backbuffer.attachments[0]
      this.twgl.drawBufferInfo(this.gl, this.positionBuffer, this.gl.TRIANGLE_FAN)
    }

    console.info('b:', this.b)
  }
}
