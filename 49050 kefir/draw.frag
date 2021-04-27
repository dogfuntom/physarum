#version 300 es
precision mediump float;
in vec2 uv;
uniform vec2 u_resolution;
uniform sampler2D prevStateCells;
out vec4 outColor;
#define rnd(x) fract(54321.987 * sin(987.12345 * x))

mat3 colors = mat3(#dbf6e9, #9ddfd3, #31326f);

    // if (index == 0) return ;
    // if (index == 1) return ;
    // if (index == 2) return ;
    // if (index == 3) return ;

void main() {
  // outColor = vec4(uv,1,1);
  outColor.rgb = texture(prevStateCells, uv).rgb * colors;
  outColor.a = 1.;
}