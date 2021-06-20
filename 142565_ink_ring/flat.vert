precision highp float;
attribute vec2 position;
varying vec2 v_position;
varying float v_id; // for physics only
varying float v_mass; // for physics only

void main() {
    v_position = .5 * position + .5;
    gl_Position = vec4(position, 0.0, 1.0);
}