precision mediump float;
// varying vec2 v_position;
uniform sampler2D u_tex_draw;
uniform vec2 u_resolution;
uniform float DECAY;
#define DIFFUSE_RADIUS  1


void main() {
    vec4 val = vec4(0);

//     vec2 R = vec2(0, 1);
//     val += texture2D(u_tex_draw, gl_FragCoord.xy / u_resolution);
//     val += texture2D(u_tex_draw, fract((gl_FragCoord.xy + R.xy) / u_resolution)) / 2.;
//     val += texture2D(u_tex_draw, fract((gl_FragCoord.xy + R.yx) / u_resolution)) / 2.;
//     val += texture2D(u_tex_draw, fract((gl_FragCoord.xy - R.xy) / u_resolution)) / 2.;
//     val += texture2D(u_tex_draw, fract((gl_FragCoord.xy - R.yx) / u_resolution)) / 2.;
//     val /= 3.;
//    gl_FragColor = val * DECAY;

    float k_sum = 0.;
    for(int i = -DIFFUSE_RADIUS; i <= DIFFUSE_RADIUS; i++) {
        for(int j = -DIFFUSE_RADIUS; j <= DIFFUSE_RADIUS; j++) {
            vec2 ij = vec2(i,j);
            // float k = 1./(length(ij)+1.);
            float k = 1.;//(length(ij)+1.);
            val += k * texture2D(u_tex_draw, fract((gl_FragCoord.xy - ij) / u_resolution));
            k_sum += k;
        }
    }
    gl_FragColor = val / k_sum * DECAY;
}