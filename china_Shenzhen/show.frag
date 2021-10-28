#version 300 es
precision mediump float;
uniform sampler2D u_tex_draw;
uniform vec2 u_tex_res;
uniform vec2 u_resolution;
out vec4 o;

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    o = texture(u_tex_draw, uv);
    o.r = uv.x;
    o.a = 1.;
}