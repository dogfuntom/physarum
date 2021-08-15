#version 300 es
precision highp float;
in vec2 position;
in float v_id; // for physics only
in float v_mass; // for physics only

void main() {
    gl_Position = vec4(position, 0.0, 1.0);
}