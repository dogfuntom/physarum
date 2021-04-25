#version 300 es
precision mediump float;
uniform sampler2D u_texture;
out vec4 outColor;

uniform float tick;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

#define MAX_STEPS 100
#define MAX_DIST 200.
#define EPSILON 0.0001
#define PI 3.14159265
#define IVORY 1.
#define BLUE 2.
#define BLACK 3.

#define PHI (sqrt(5.)*0.5 + 0.5)

// #pragma glslify: crystall = require('../modules/sdf/crystall')
#pragma glslify: rot = require('../modules/math/rotate2D') 
// #pragma glslify: cellular = require('../modules/math/cellularNoise3d') 
// #pragma glslify: box = require('glsl-sdf-box') 
#pragma glslify: rnd = require(glsl-random) 
// #pragma glslify: hsv = require(glsl-hsv2rgb) 
// #pragma glslify: noise= require(glsl-noise/simplex/4d) 
// #pragma glslify: torus = require(primitive-torus) 



float rnd (float x) {return rnd(vec2(x));}

float cyl (vec3 p) {return length(p.xz) - .5;}

float torus(vec3 p, float rBig, float rSmall) {
    float r = length(p.xy) - rBig;
    r = fract(r)-.5;
    return length(vec2(r, p.z)) - rSmall;
}



float hash( int n )
{
	n = (n << 13) ^ n;
    n = (n * (n * n * 15731 + 789221) + 1376312589) & 0x7fffffff;
    return float(n)/2147483647.0;
}


// value noise
float noise3f( in vec3 p, in int sem )
{
    ivec3 i = ivec3( floor(p) );
    vec3  f = p - vec3(i);

    // quintic smoothstep
    vec3 w = f*f*f*(f*(f*6.0-15.0)+10.0);

    int n = i.x + i.y * 57 + 113*i.z + sem;

	return 1.0 - 2.0*mix(mix(mix(hash(n+(0+57*0+113*0)),
                                 hash(n+(1+57*0+113*0)),w.x),
                             mix(hash(n+(0+57*1+113*0)),
                                 hash(n+(1+57*1+113*0)),w.x),w.y),
                         mix(mix(hash(n+(0+57*0+113*1)),
                                 hash(n+(1+57*0+113*1)),w.x),
                             mix(hash(n+(0+57*1+113*1)),
                                 hash(n+(1+57*1+113*1)),w.x),w.y),w.z);
}

float fbm( in vec3 p )
{
    return 0.5000*noise3f( p*1.0, 0 ) + 
           0.2500*noise3f( p*2.0, 0 ) + 
           0.1250*noise3f( p*4.0, 0 ) +
           0.0625*noise3f( p*8.0, 0 );
}

vec2 celular( in vec3 p )
{
    ivec3 q = ivec3( floor(p) );
    vec3  f = p - vec3(q);

	vec2 dmin = vec2( 2.0 );

	for( int k=-1; k<=1; k++ )
	for( int j=-1; j<=1; j++ )
	for( int i=-1; i<=1; i++ )
	{
		int nn = (q.x+i) + 57*(q.y+j) + 113*(q.z+k);
        vec3 di = vec3( float(i) + hash(nn     ),
		                float(j) + hash(nn+1217),
		                float(k) + hash(nn+2513) ) - f;
		float d2 = dot(di,di);

        if( d2<dmin.x )
        {
            dmin.y = dmin.x;
            dmin.x = d2;
        }
        else if( d2<dmin.y )
        {
            dmin.y = d2;
        }
	}
    
    return 0.25*sqrt(dmin);
}


// float map( in vec3 pos)
// {
// 	float dis = length(dd) - .9;
// 	// float disp = length(pos)-.9;
// 	// dis += 0.8*disp;
//     // if( dis<0.25 )
//     // {
// 	vec2 cel = celular( 5.0 * pos );
// 	float disp2 = clamp(cel.y - cel.x, 0.0, 1.0);
// 	dis -= 3.0*disp2;
//     // }
//     return dis*.2;
// }

float map( in vec3 pos)
{
    
	float disp = length(pos)-u_mouse.x - .1;
	vec2 cel = celular( 5.0 * pos );
	float disp2 = clamp(cel.y - cel.x, 0.0, 1.0);
	disp -= 3.0*disp2;

    return disp*.2;
}



// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
vec2 getDist(vec3 p) {
    p.xz *= rot(-u_mouse.x * 4.);
    p.xy *= rot(u_mouse.y * 4.);
    // vec2 cellNoise = cellular(p + u_time);
    float sphere = length(p) - 1.;
    // return vec2(max(-((cellNoise.y-cellNoise.x)-u_mouse.x), sphere), BLUE);
    return vec2(max(sphere, map(p)), BLUE);
}
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

vec3 rayMarch(vec3 ro, vec3 rd) {
    float d = 0.;
    float info = 0.;
    float minAngleToObstacle = 1e10;
    for(int i = 0; i < MAX_STEPS; i++) {
        vec2 distToClosest = getDist(ro + rd * d);
        minAngleToObstacle = min(minAngleToObstacle, atan(distToClosest.x, d));
        d += distToClosest.x;
        info = distToClosest.y;
        if(abs(distToClosest.x) < EPSILON || d > MAX_DIST) {
            break;
        }
    }
    return vec3(d, info, minAngleToObstacle);
}

vec3 getNormal(vec3 p) {
    vec2 e = vec2(EPSILON, 0.);
    vec3 n = getDist(p).x - vec3(getDist(p - e.xyy).x, getDist(p - e.yxy).x, getDist(p - e.yyx).x);
    return normalize(n);
}

vec3 getRayDirection(vec3 ro, vec2 uv, vec3 lookAt) {
    vec3 rd;
    rd = normalize(vec3(uv - vec2(0, 0.), 1.));
    vec3 lookTo = lookAt - ro;
    float horizAngle = acos(dot(lookTo.xz, rd.xz) / length(lookTo.xz) * length(rd.xz));
    rd.xz *= rot(horizAngle);
    return rd;
}

vec3 getRayDir(vec2 uv, vec3 p, vec3 l, float z) {
    vec3 f = normalize(l - p), r = normalize(cross(vec3(0, 1, 0), f)), u = cross(f, r), c = f * z, i = c + uv.x * r + uv.y * u, d = normalize(i);
    return d;
}

float pseudoNormRnd (float x) {
    return tan((rnd(x)-.5)*3.1415)/10.+.5;
}

vec3 getColorByIndex(int index) {
    if (index == 0) return #ffc93c;
    if (index == 1) return #dbf6e9;
    if (index == 2) return #9ddfd3;
    if (index == 3) return #31326f;
    // if (index == 4) return #081D23;
    // if (index == 5) return #FEF3F2;
    return #FFFFFF;
}

vec3 getColor(vec3 p) {
    // p.y *= 1.;
    p.y += sin(p.y) * 10.;
    float pixel = rnd(length(floor(p*1000. + vec3(100, 200, 300))));
    float id = floor(p.y + pixel * 1.2);
    float fr = fract(p.y + pixel * 1.2);

    int colIndex1 = int(floor(4. * rnd(id)));
    int colIndex2 = int(floor(4. * rnd(id)));

    vec3 col1 = getColorByIndex(colIndex1);
    vec3 col2 = getColorByIndex(colIndex2);
    float mixer = fract(fr);
    return mix(col1, col2, mixer);
}

// const mediump float colors[3] = float[3](2.5, 7.0, 1.5);
// float[3](2.5, 7.0, 1.5);
// vec3 BUCP[4];

// BUCP[] = vec3(0);
// = vec3[4](vec3(0,0,0), vec3(0,0,0), vec3(0,0,0), vec3(0,0,0));
// vec3 colors[5] = vec3[5](vec3(0), vec3(0), vec3(0), vec3(0), vec3(0));

void main() {
    vec2 uv = (gl_FragCoord.xy * 2. - u_resolution)/min(u_resolution.x, u_resolution.y);
    vec3 ro = vec3(0., 0., -6.);
    float zoom = 1.100;


    vec3 rd = getRayDir(uv, ro, vec3(0), 3.);

    vec3 rm = rayMarch(ro, rd);
    float d = rm[0];
    float info = rm[1];

    vec3 colorBg = vec3(1);//.4*(vec3(sin(length(uv) - u_time),sin(length(uv) - u_time + 2.*PI/3.),sin(length(uv) - u_time + 2.*PI*2./3.)) * .5 + .5);
    vec3 color = colorBg;
    vec3 light = vec3(50, 20, 50);
    vec3 p = ro + rd * d;
    if(d < MAX_DIST) {
        vec3 n = getNormal(p);
        vec3 dirToLight = normalize(light - p);
        vec3 rayMarchLight = rayMarch(p + dirToLight * .06, dirToLight);

        // reflection
        vec3 ref = reflect(rd, n);
        // color = getColor(ref * .5 + .5);// + pow(dot(n, vec3(1,1,-1)) * .5 + .5, 40.);
        color = vec3(dot(n, vec3(1,1,-1)) * .5 + .5);

        // color += ;//texture(iChannel0, ref).xyz; FIXME
    }

    outColor = vec4(color, 1);
    // gl_FragColor.a += 1.;

}
