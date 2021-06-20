precision mediump float;
// varying vec2 v_position;
uniform sampler2D u_tex_draw;
uniform vec2 u_resolution;

void main() {
    // gl_FragColor.rgb = texture2D(u_tex_draw, gl_FragCoord.xy / u_resolution - .1).rgb;
    // gl_FragColor.a = 1.;
    // gl_FragColor = texture2D(u_tex_draw, gl_FragCoord.xy / u_resolution);
    // gl_FragColor.a = 1.;
    vec4 val = vec4(0);
    vec2 R = vec2(0, 1);
    val += texture2D(u_tex_draw, gl_FragCoord.xy / u_resolution);
    val += texture2D(u_tex_draw, fract((gl_FragCoord.xy + R.xy) / u_resolution));
    val += texture2D(u_tex_draw, fract((gl_FragCoord.xy + R.yx) / u_resolution));
    val += texture2D(u_tex_draw, fract((gl_FragCoord.xy - R.xy) / u_resolution));
    val += texture2D(u_tex_draw, fract((gl_FragCoord.xy - R.yx) / u_resolution));
    val /= 5.;
    gl_FragColor = val * .99;
    // gl_FragColor.a = 1.;
    // gl_FragColor = #ff00ffff;
    // gl_FragColor = max(
    //     texture2D(u_tex_draw, gl_FragCoord.xy / u_resolution),
    //     texture2D(u_tex_draw, (gl_FragCoord.xy - 10.) / u_resolution)
    //     );
    // gl_FragColor = vec4(0.0);
}