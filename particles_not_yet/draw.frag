precision mediump float;
varying vec2 v_position;
uniform sampler2D u_texture;

void main() {
    gl_FragColor.rgb = texture2D(u_texture, v_position).rgb;
    gl_FragColor.a = 1.;
}