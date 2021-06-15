precision mediump float;
varying vec2 v_position;
uniform sampler2D u_tex_draw;
uniform float u_tick;

void main() {
    if(u_tick < 1.) gl_FragColor += length(v_position);
    else gl_FragColor.rgb = 1.-texture2D(u_tex_draw, v_position).rgb;
    gl_FragColor.a = 1.;
}