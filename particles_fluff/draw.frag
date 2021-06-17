precision mediump float;
varying vec2 v_position;
uniform sampler2D u_tex_draw;
uniform float u_tick;
uniform float u_time;

mat2 rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);}

void main() {
    // if(mod(u_tick, 100.)==0.) discard; //gl_FragColor.rgb += 1.;
    // else
    if (u_tick < 2.) gl_FragColor = vec4(0);
    else {
        gl_FragColor = texture2D(u_tex_draw, v_position);
        // gl_FragColor.a = .5;
    }
}