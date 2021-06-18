precision mediump float;
varying vec2 v_position;
uniform sampler2D u_tex_draw;
uniform float u_tick;
uniform float u_time;

mat2 rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);}

void main() {
    // if (u_tick < 2.) gl_FragColor = vec4(0);
    // else {
    //     gl_FragColor = texture2D(u_tex_draw, v_position);
    // }

    // раньше этот буфер использовался для наложения кадров.
    // теперь попробуем заюзать для единоразового заполнения буфера нужным цветом
    gl_FragColor = vec4(0);
}