precision mediump float;
// varying vec2 v_position;
uniform sampler2D u_tex_draw;
uniform vec2 u_resolution;
uniform float DECAY;
uniform float DIFFUSE_RADIUS;
uniform float u_time;
// uniform float BEAT[16];
#define DIFFUSE_RADIUS_MAX  10

#pragma glslify: random = require(glsl-random)
float rnd(float x) {
  return random(vec2(x * .0001));
}

void main() {
    gl_FragColor = texture2D(u_tex_draw, gl_FragCoord.xy / u_resolution) * DECAY;

    vec4 val;
    vec2 R = vec2(0, 1);
    val += texture2D(u_tex_draw, gl_FragCoord.xy / u_resolution);
    val += texture2D(u_tex_draw, fract((gl_FragCoord.xy + R.xy) / u_resolution)) / 2.;
    val += texture2D(u_tex_draw, fract((gl_FragCoord.xy + R.yx) / u_resolution)) / 2.;
    val += texture2D(u_tex_draw, fract((gl_FragCoord.xy - R.xy) / u_resolution)) / 2.;
    val += texture2D(u_tex_draw, fract((gl_FragCoord.xy - R.yx) / u_resolution)) / 2.;
    val /= 3.;
   gl_FragColor = val * DECAY;

//     float k_sum = 0.;
//     for(int i = -DIFFUSE_RADIUS_MAX; i <= DIFFUSE_RADIUS_MAX; i++) {
//         if(abs(float(i)) > DIFFUSE_RADIUS)
//             continue;
//         for(int j = -DIFFUSE_RADIUS_MAX; j <= DIFFUSE_RADIUS_MAX; j++) {
//             if(abs(float(j)) > DIFFUSE_RADIUS)
//                 continue;
//             vec2 ij = vec2(i, j);
//             // float k = 1./(length(ij)+1.);
//             float k = 1.;//(length(ij)+1.);
//             val += k * texture2D(u_tex_draw, fract((gl_FragCoord.xy - ij) / u_resolution));
//             k_sum += k;
//         }
//     }
//     gl_FragColor = val / k_sum * DECAY;

    // gl_FragColor.rgb-;
    // gl_FragColor=vec4(0,1,.5,1);

    // // REACTION DIFFUSION

    // #define t(uv_) texture2D(u_tex_draw, fract(uv_)).ba
    // vec2 uv = gl_FragCoord.xy / u_resolution;
    // vec2 _;
    // vec2 px = 1. / u_resolution;
    // vec2 v = gl_FragColor.ba;
    // vec2 dx, dy, d, delta;

    // float R = 5.*random(uv+u_time);
    // _ = vec2(R + R * rnd(uv.x + .01 * uv.y + u_time), 0.);
    // dx = (-v + (t(uv + px * _) + t(uv + px * -_)) / 2.) / 2.;
    // dy = (-v + (t(uv + px * _.yx) + t(uv + px * -_.yx)) / 2.) / 2.;
    // d = (dx + dy) / 2.;
    // delta.x = Da * d.x - v.x * v.y * v.y + F * (1. - v.x);
    // delta.y = Db * d.y + v.x * v.y * v.y - (K + F) * v.y;
    // gl_FragColor = vec4(1,1,v + delta);

    // // BEATS viz
    // for(int i=0;i<64;i++){
    //     if(i == int(gl_FragCoord.x/u_resolution.x*64.))
    //     gl_FragColor.b = BEAT[i];
    // }

    // gl_FragColor *= smoothstep(1., .9, length((gl_FragCoord.xy * 2. - u_resolution) / u_resolution));
}