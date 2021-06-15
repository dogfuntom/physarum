precision mediump float;
varying vec2 v_position;
uniform sampler2D u_tex_draw;
uniform float u_tick;
uniform float u_time;

mat2 rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);}

void main() {
    vec2 uv = v_position * 2. - 1.;
    uv -= u_tick / 10.;
    uv *= 4.;
    uv = fract(uv)-.5;
    vec3 col = vec3(4.*length(uv), 1, 0);
    
    gl_FragColor.rgb = mix(col, texture2D(u_tex_draw, v_position).rgb, .99);
    gl_FragColor.a = 1.;
}