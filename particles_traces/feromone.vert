precision mediump float;
attribute vec2 position;
varying vec2 uv;

void main() {
    uv = .5 * position + .5;
    gl_Position = vec4(position, 0.0, 1.0);
}