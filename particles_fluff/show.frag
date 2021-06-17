precision mediump float;
varying vec2 v_position;
uniform sampler2D u_tex_draw;
uniform sampler2D u_tex_fbo;
// uniform float u_tick;

void main() {
    gl_FragColor = texture2D(u_tex_draw, v_position);
}