#version 300 es
precision mediump float;
uniform sampler2D prevStateCells;
uniform int tick;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
in vec2 uv;
out vec4 outColor;

#define t u_time
#define iTime u_time
#define res u_resolution
#define iResolution u_resolution
#define o outColor
#define FC gl_FragCoord.xy



#define ROOF_START .002
#define ROOF_LEFT_STOP .0002
#define ROOF_RIGHT_STOP ROOF_LEFT_STOP
#define ROOF_WALL_START -.00001 + .00002*uv.x

#define rnd(d) fract(sin(length(FC.xy+d)*99.))
#define T(dx,dy) (texture(prevStateCells,fract((FC.xy+vec2(dx,dy))/res)).rgb)
#define RULE(v,c) else if(T(-1,-1)[v[0]]>.5 && T(0,-1)[v[1]]>.5 && T(1,-1)[v[2]]>.5 && c) o[v[3]]=1.;
#define INIT if(rnd(length(FC))<.5)o.r+=1.;else o.b+=1.;

void main() {
    const ivec3 v = ivec3(0,1,2);

    o=vec4(0);
    if(tick<2) if(rnd(length(FC))<.5)o.r+=1.;else o.b+=1.;
    else if(rnd(length(FC) + 1.) < .1 * smoothstep(.1, .0, length(uv - u_mouse))) INIT
    else if(fract(u_time + uv.y) < .0) {o.rgb = T(0,0); return;}
    else if(mod(FC.x,1.)==0.) o.rgb=T(-1,0);

    RULE(v.brrg,rnd(0.)<ROOF_START)

    RULE(v.ggrb,rnd(0.)<ROOF_RIGHT_STOP)
    RULE(v.grrb,rnd(vec2(-1,0))<ROOF_RIGHT_STOP)

    RULE(v.bggr,rnd(0.)<ROOF_LEFT_STOP)
    RULE(v.bbgr,rnd(vec2(1,0))<ROOF_LEFT_STOP)

    RULE(v.brrg,rnd(length(FC.xy))<ROOF_START)

    RULE(v.gggb,rnd(0.)<ROOF_WALL_START)

    RULE(v.bgrr,rnd(vec2(-1,-1))<ROOF_WALL_START)
    RULE(v.bggr,rnd(vec2(-1,-1))<ROOF_WALL_START)
    RULE(v.bgbr,rnd(vec2(-1,-1))<ROOF_WALL_START)

    RULE(v.bbbb,true)
    RULE(v.bbrb,true)
    RULE(v.rbbb,true)
    RULE(v.gbbb,true)
    RULE(v.gbrb,true)
    RULE(v.rbrb,true)
    RULE(v.gbgb,true)
    RULE(v.bbgg,true)
    RULE(v.rbgg,true)
    RULE(v.rrrr,true)
    RULE(v.rrgr,true)
    RULE(v.brrr,true)
    RULE(v.rrbr,true)
    RULE(v.brgr,true)
    RULE(v.brbr,true)
    RULE(v.grgr,true)
    RULE(v.grrg,true)
    RULE(v.grbg,true)
    RULE(v.rggr,true)
    RULE(v.rgbr,true)
    RULE(v.rgrr,true)
    RULE(v.ggbb,true)
    RULE(v.gggg,true)
    RULE(v.ggrg,true)
    RULE(v.bggg,true)
    RULE(v.bgrg,true)
    RULE(v.bgbg,true)

    // o.rgb*=COL;
    o.a=1.;
}