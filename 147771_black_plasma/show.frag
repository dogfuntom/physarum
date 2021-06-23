precision mediump float;
// varying vec2 v_position;
uniform sampler2D u_tex_draw;
// uniform float u_tick;
uniform vec2 u_resolution;
uniform float LIGHTNESS;

void main() {
    gl_FragColor.rgb = LIGHTNESS * LIGHTNESS * texture2D(u_tex_draw, gl_FragCoord.xy / u_resolution).rgb;
    // gl_FragColor.rgb = pow(gl_FragColor.rgb, vec3(.5));
    // gl_FragColor = clamp(gl_FragColor,0.,1.);
    gl_FragColor = fract(gl_FragColor);
    gl_FragColor = pow(gl_FragColor,vec4(4.));
    gl_FragColor.a = 1.;
    // gl_FragColor = #ff00ffff;
}