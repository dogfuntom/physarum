#version 300 es
precision mediump float;
uniform sampler2D tex;
uniform float tick;
uniform float divisions;
uniform float u_time;
uniform vec2 u_resolution;
uniform float params[4];
out vec4 o;

#define t u_time
#define f tick
#define res u_resolution
#define FC gl_FragCoord.xy
#define PI 3.1415926536

#pragma glslify: snoise2D = require(../modules/math/glsl-noise/simplex/2d.glsl)
#pragma glslify: snoise3D = require(../modules/math/glsl-noise/simplex/3d.glsl)

#define rnd(x) fract(54321.987 * sin(987.12345 * x))
// #define T(dx,dy) (texture(prevStateCells,fract((FC.xy+vec2(dx,dy))/res)).rgb)

void main() {
    vec2 uv = FC.xy / u_resolution;
    #define func(n0, n1, n2, n3, n4, i) rnd((n0 + 2.*n1 + 4.*n2 + 8.*n3 + 16.*n3 + 32.*n4)/64. + i + params[0]) 

    // uv = abs(uv - .5) + .5;
    float size = 1. / pow(2., divisions + 2.); // from the previous iteration, in the backbuffer 
    // float quadId = rnd(length(floor((mod(uv, size) / size * 3. - 1.5) + .5)));
    uv = floor(uv / size) * size + size / 2.;

    #define tx(xx,yy) step(.5 + sin(u_time) * .01, texture(tex, fract(uv + vec2(xx, yy) * size))[i])
    vec3 col;
    for(int i = 0; i < 3; i++) {
        float n0 = tx(0,0);
        float n1 = tx(-1,0);
        float n2 = tx(1,0);
        float n3 = tx(0,1);
        float n4 = tx(0,-1);
        // vec4 n0 = step(.5, texture(tex, fract(uv)));
        // vec4 n1 = step(.5, texture(tex, fract(uv - vec2(size, 0))));
        // vec4 n2 = step(.5, texture(tex, fract(uv - vec2(0, size))));
        // vec4 n3 = step(.5, texture(tex, fract(uv + vec2(size, 0))));
        // vec4 n4 = step(.5, texture(tex, fract(uv + vec2(0, size))));
        vec2 quadrant = floor(mod(uv, vec2(size)) / size * 2.);
        float quadId = quadrant.x + 2. * quadrant.y;
        // if(divisions == 2.)
        //     quadId += .01 * floor(-(tick * params[3]+float(i)*3.) / pow(2., divisions + 2.) * .4 + ((uv.y * .5 * pow(2., divisions + 2.)) / pow(2., divisions + 2.)));
        // if(divisions == 3.)quadId += .01*floor(tick/pow(2.,divisions+2.)/40.+floor((uv.y)*pow(2.,divisions+2.))/pow(2.,divisions+2.)+rnd(uv.x)*1.);

        col[i] = step(.5, func(n0, n1, n2, n3, n4, quadId));

    }
    o.rgb = col;
}