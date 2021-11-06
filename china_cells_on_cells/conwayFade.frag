precision mediump float;
uniform sampler2D backbuffer;
uniform sampler2D prevStateConway;
uniform vec2 u_resolution;
uniform sampler2D tex_sea;
uniform float midi[64];

#define o gl_FragColor

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;

    vec2 seaOffset = texture2D(tex_sea, uv).rg * 2. - 1.;
    seaOffset *= midi[16 * 2 + 11];
    seaOffset *= 0.3;
    vec4 state = texture2D(backbuffer, fract(uv));
    state = min(state, texture2D(backbuffer, fract(uv + seaOffset)));
    vec4 cells = texture2D(prevStateConway, fract(uv));

//    state.rgb += (cells.rgb-.5)*.02;
//    o = clamp(state, 0., 1.);

    o = mix(state, cells, .04);
//    o = cells;
//    o = vec4(.5,.0,1.,1);
}