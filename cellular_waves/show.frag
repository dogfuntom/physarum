#version 300 es
precision mediump float;
uniform sampler2D u_tex_draw;
uniform vec2 u_resolution;
out vec4 o;


void main() {
    o = texture(u_tex_draw, gl_FragCoord.xy / u_resolution)*.5+.5;
    o.a = 1.;
}