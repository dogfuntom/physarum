precision mediump float;
varying vec2 v_position;
uniform sampler2D u_tex_draw;
uniform float u_tick;
uniform float u_time;

mat2 rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);}

void main() {
    // if(mod(u_tick, 100.)==0.) discard; //gl_FragColor.rgb += 1.;
    // else 
    gl_FragColor.rgb = texture2D(u_tex_draw, v_position).rgb * .995;
    gl_FragColor.a = 1.;
}