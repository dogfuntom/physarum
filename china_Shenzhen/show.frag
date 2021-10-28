precision mediump float;
uniform sampler2D u_tex_draw;
uniform vec2 u_resolution;


void main() {
    gl_FragColor = texture2D(u_tex_draw, gl_FragCoord.xy / u_resolution);
    gl_FragColor.a = 1.;
    gl_FragColor.r = 1.;
}