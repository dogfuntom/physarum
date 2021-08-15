precision mediump float;
// varying vec2 v_position;
uniform sampler2D u_tex_draw;
// uniform float u_tick;
uniform vec2 u_resolution;
uniform float LIGHTNESS;

void main() {
    gl_FragColor = texture2D(u_tex_draw, gl_FragCoord.xy / u_resolution);
    gl_FragColor.a = 1.;
}