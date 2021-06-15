precision mediump float;
varying vec2 v_position;
uniform sampler2D u_texture;
uniform sampler2D u_texture_draw;

// берёт то, что нарендерили и тупо рисует в прямоугольник
// тут можно совместить с преждей версией этого же дро-буфера. Ндо тольколь его сделать

void main() {
    gl_FragColor.rgb = texture2D(u_texture, v_position).rgb;
    // gl_FragColor.rgb = mix(gl_FragColor.rgb, texture2D(u_texture_draw, v_position).rgb, .4);
    // gl_FragColor.rgb += texture2D(u_texture_draw, v_position).rgb;
    gl_FragColor.rgb = gl_FragColor.rgb * vec3(1,1,0) + texture2D(u_texture_draw, v_position).rgb * vec3(1,0,1);
    gl_FragColor.a = 1.;
}