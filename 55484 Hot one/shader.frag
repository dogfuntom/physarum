#version 300 es
precision mediump float;
uniform sampler2D u_texture;
out vec4 outColor;

uniform float tick;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

#define MAX_STEPS 150
#define MAX_DIST 20.
#define EPSILON 0.01
#define PI 3.14159265
#define BLUE 2.

// #pragma glslify: crystall = require('../modules/sdf/crystall')
#pragma glslify: rot = require('../modules/math/rotate2D') 
// #pragma glslify: cellular = require('../modules/math/cellularNoise3d') 
// #pragma glslify: box = require('glsl-sdf-box') 
#pragma glslify: rnd = require(glsl-random) 
// #pragma glslify: hsv = require(glsl-hsv2rgb) 
// #pragma glslify: noise= require(glsl-noise/simplex/4d) 
// #pragma glslify: torus = require(primitive-torus) 



float rnd (float x) {return rnd(vec2(x));}

float stuff(vec3 p){
    float width = .3;
    float size = 1.;
    float objkt = length(vec2(length(p.xy)-size, length(p.zy)-size))-width;
    return objkt * .7;
}

float hash( int n )
{
	n = (n << 13) ^ n;
    n = (n * (n * n * 15731 + 789221) + 1376312589) & 0x7fffffff;
    return float(n)/2147483647.0;
}

vec2 cellular( in vec3 p )
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


// // Modulo 289 without a division (only multiplications)
// vec3 mod289(vec3 x) {
//   return x - floor(x * (1.0 / 289.0)) * 289.0;
// }

// // Modulo 7 without a division
// vec3 mod7(vec3 x) {
//   return x - floor(x * (1.0 / 7.0)) * 7.0;
// }

// // Permutation polynomial: (34x^2 + x) mod 289
// vec3 permute(vec3 x) {
//   return mod289((34.0 * x + 1.0) * x);
// }

// // Cellular noise, returning F1 and F2 in a vec2.
// // 3x3x3 search region for good F2 everywhere, but a lot
// // slower than the 2x2x2 version.
// // The code below is a bit scary even to its author,
// // but it has at least half decent performance on a
// // modern GPU. In any case, it beats any software
// // implementation of Worley noise hands down.

// vec2 cellular(vec3 P) {
// #define K 0.142857142857 // 1/7
// #define Ko 0.428571428571 // 1/2-K/2
// #define K2 0.020408163265306 // 1/(7*7)
// #define Kz 0.166666666667 // 1/6
// #define Kzo 0.416666666667 // 1/2-1/6*2
// #define jitter 1.0 // smaller jitter gives more regular pattern

// 	vec3 Pi = mod289(floor(P));
//  	vec3 Pf = fract(P) - 0.5;

// 	vec3 Pfx = Pf.x + vec3(1.0, 0.0, -1.0);
// 	vec3 Pfy = Pf.y + vec3(1.0, 0.0, -1.0);
// 	vec3 Pfz = Pf.z + vec3(1.0, 0.0, -1.0);

// 	vec3 p = permute(Pi.x + vec3(-1.0, 0.0, 1.0));
// 	vec3 p1 = permute(p + Pi.y - 1.0);
// 	vec3 p2 = permute(p + Pi.y);
// 	vec3 p3 = permute(p + Pi.y + 1.0);

// 	vec3 p11 = permute(p1 + Pi.z - 1.0);
// 	vec3 p12 = permute(p1 + Pi.z);
// 	vec3 p13 = permute(p1 + Pi.z + 1.0);

// 	vec3 p21 = permute(p2 + Pi.z - 1.0);
// 	vec3 p22 = permute(p2 + Pi.z);
// 	vec3 p23 = permute(p2 + Pi.z + 1.0);

// 	vec3 p31 = permute(p3 + Pi.z - 1.0);
// 	vec3 p32 = permute(p3 + Pi.z);
// 	vec3 p33 = permute(p3 + Pi.z + 1.0);

// 	vec3 ox11 = fract(p11*K) - Ko;
// 	vec3 oy11 = mod7(floor(p11*K))*K - Ko;
// 	vec3 oz11 = floor(p11*K2)*Kz - Kzo; // p11 < 289 guaranteed

// 	vec3 ox12 = fract(p12*K) - Ko;
// 	vec3 oy12 = mod7(floor(p12*K))*K - Ko;
// 	vec3 oz12 = floor(p12*K2)*Kz - Kzo;

// 	vec3 ox13 = fract(p13*K) - Ko;
// 	vec3 oy13 = mod7(floor(p13*K))*K - Ko;
// 	vec3 oz13 = floor(p13*K2)*Kz - Kzo;

// 	vec3 ox21 = fract(p21*K) - Ko;
// 	vec3 oy21 = mod7(floor(p21*K))*K - Ko;
// 	vec3 oz21 = floor(p21*K2)*Kz - Kzo;

// 	vec3 ox22 = fract(p22*K) - Ko;
// 	vec3 oy22 = mod7(floor(p22*K))*K - Ko;
// 	vec3 oz22 = floor(p22*K2)*Kz - Kzo;

// 	vec3 ox23 = fract(p23*K) - Ko;
// 	vec3 oy23 = mod7(floor(p23*K))*K - Ko;
// 	vec3 oz23 = floor(p23*K2)*Kz - Kzo;

// 	vec3 ox31 = fract(p31*K) - Ko;
// 	vec3 oy31 = mod7(floor(p31*K))*K - Ko;
// 	vec3 oz31 = floor(p31*K2)*Kz - Kzo;

// 	vec3 ox32 = fract(p32*K) - Ko;
// 	vec3 oy32 = mod7(floor(p32*K))*K - Ko;
// 	vec3 oz32 = floor(p32*K2)*Kz - Kzo;

// 	vec3 ox33 = fract(p33*K) - Ko;
// 	vec3 oy33 = mod7(floor(p33*K))*K - Ko;
// 	vec3 oz33 = floor(p33*K2)*Kz - Kzo;

// 	vec3 dx11 = Pfx + jitter*ox11;
// 	vec3 dy11 = Pfy.x + jitter*oy11;
// 	vec3 dz11 = Pfz.x + jitter*oz11;

// 	vec3 dx12 = Pfx + jitter*ox12;
// 	vec3 dy12 = Pfy.x + jitter*oy12;
// 	vec3 dz12 = Pfz.y + jitter*oz12;

// 	vec3 dx13 = Pfx + jitter*ox13;
// 	vec3 dy13 = Pfy.x + jitter*oy13;
// 	vec3 dz13 = Pfz.z + jitter*oz13;

// 	vec3 dx21 = Pfx + jitter*ox21;
// 	vec3 dy21 = Pfy.y + jitter*oy21;
// 	vec3 dz21 = Pfz.x + jitter*oz21;

// 	vec3 dx22 = Pfx + jitter*ox22;
// 	vec3 dy22 = Pfy.y + jitter*oy22;
// 	vec3 dz22 = Pfz.y + jitter*oz22;

// 	vec3 dx23 = Pfx + jitter*ox23;
// 	vec3 dy23 = Pfy.y + jitter*oy23;
// 	vec3 dz23 = Pfz.z + jitter*oz23;

// 	vec3 dx31 = Pfx + jitter*ox31;
// 	vec3 dy31 = Pfy.z + jitter*oy31;
// 	vec3 dz31 = Pfz.x + jitter*oz31;

// 	vec3 dx32 = Pfx + jitter*ox32;
// 	vec3 dy32 = Pfy.z + jitter*oy32;
// 	vec3 dz32 = Pfz.y + jitter*oz32;

// 	vec3 dx33 = Pfx + jitter*ox33;
// 	vec3 dy33 = Pfy.z + jitter*oy33;
// 	vec3 dz33 = Pfz.z + jitter*oz33;

// 	vec3 d11 = dx11 * dx11 + dy11 * dy11 + dz11 * dz11;
// 	vec3 d12 = dx12 * dx12 + dy12 * dy12 + dz12 * dz12;
// 	vec3 d13 = dx13 * dx13 + dy13 * dy13 + dz13 * dz13;
// 	vec3 d21 = dx21 * dx21 + dy21 * dy21 + dz21 * dz21;
// 	vec3 d22 = dx22 * dx22 + dy22 * dy22 + dz22 * dz22;
// 	vec3 d23 = dx23 * dx23 + dy23 * dy23 + dz23 * dz23;
// 	vec3 d31 = dx31 * dx31 + dy31 * dy31 + dz31 * dz31;
// 	vec3 d32 = dx32 * dx32 + dy32 * dy32 + dz32 * dz32;
// 	vec3 d33 = dx33 * dx33 + dy33 * dy33 + dz33 * dz33;

// 	// Sort out the two smallest distances (F1, F2)
// #if 0
// 	// Cheat and sort out only F1
// 	vec3 d1 = min(min(d11,d12), d13);
// 	vec3 d2 = min(min(d21,d22), d23);
// 	vec3 d3 = min(min(d31,d32), d33);
// 	vec3 d = min(min(d1,d2), d3);
// 	d.x = min(min(d.x,d.y),d.z);
// 	return vec2(sqrt(d.x)); // F1 duplicated, no F2 computed
// #else
// 	// Do it right and sort out both F1 and F2
// 	vec3 d1a = min(d11, d12);
// 	d12 = max(d11, d12);
// 	d11 = min(d1a, d13); // Smallest now not in d12 or d13
// 	d13 = max(d1a, d13);
// 	d12 = min(d12, d13); // 2nd smallest now not in d13
// 	vec3 d2a = min(d21, d22);
// 	d22 = max(d21, d22);
// 	d21 = min(d2a, d23); // Smallest now not in d22 or d23
// 	d23 = max(d2a, d23);
// 	d22 = min(d22, d23); // 2nd smallest now not in d23
// 	vec3 d3a = min(d31, d32);
// 	d32 = max(d31, d32);
// 	d31 = min(d3a, d33); // Smallest now not in d32 or d33
// 	d33 = max(d3a, d33);
// 	d32 = min(d32, d33); // 2nd smallest now not in d33
// 	vec3 da = min(d11, d21);
// 	d21 = max(d11, d21);
// 	d11 = min(da, d31); // Smallest now in d11
// 	d31 = max(da, d31); // 2nd smallest now not in d31
// 	d11.xy = (d11.x < d11.y) ? d11.xy : d11.yx;
// 	d11.xz = (d11.x < d11.z) ? d11.xz : d11.zx; // d11.x now smallest
// 	d12 = min(d12, d21); // 2nd smallest now not in d21
// 	d12 = min(d12, d22); // nor in d22
// 	d12 = min(d12, d31); // nor in d31
// 	d12 = min(d12, d32); // nor in d32
// 	d11.yz = min(d11.yz,d12.xy); // nor in d12.yz
// 	d11.y = min(d11.y,d12.z); // Only two more to go
// 	d11.y = min(d11.y,d11.z); // Done! (Phew!)
// 	return sqrt(d11.xy); // F1, F2
// #endif
// }










float map( in vec3 pos, in float px)
{
	float disp = length(pos)- px*.3 - .7;
    pos.x+=u_time*.1;
	vec2 cel = cellular( 2.0 * pos );
	float disp2 = clamp(cel.y - cel.x, 0.0, 1.0);
	disp -= 3.0*disp2;

    return disp*.2;
}



// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
vec2 getDist(vec3 p) {
    // float px = p.y;
    p.xz *= rot(-u_mouse.x * 4.);
    p.xy *= rot(u_mouse.y * 4.);
    // // vec2 cellNoise = cellular(p + u_time);
    float sphere = length(p) - 1.;
    // // return vec2(max(-((cellNoise.y-cellNoise.x)-u_mouse.x), sphere), BLUE);
    // float cellular = map(p,px);
    // return vec2(stuff(p), BLUE);
    // // return vec2(max(sphere, cellular), BLUE);

    float scale = u_mouse.x + .2;
    p*=scale;
    p = p/dot(p,p);
    p.xz = fract(p.xz) - .5;
    float shape = (length(p.xz)-.4);
    float crosssection = length(vec2(shape, sphere))-.1;
    return vec2(crosssection * scale * .9, BLUE);
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

// float[3] f = float[3](1., 2., 3.);
vec3 colors[5] = vec3[5](#F8D9C4, #F2A297, #F64271, #CA1542, #142738);

vec3 getColor(vec3 p) {
    // p.y *= 1.;
    float whiteness = clamp(length(p*p*2.),0.,1.);
    p.y += sin(p.y+u_time*.01) * 10.;
    // vec2 cell = cellular(p*4.);
    float pixel = 0.;//sin(length(p*1.));
    float id = floor(p.y + pixel * 1.2);
    float fr = fract(p.y + pixel * 1.2);

    int colIndex1 = int(floor(5. * rnd(id)));
    int colIndex2 = int(floor(5. * rnd(id)));

    vec3 col1 = colors[colIndex1];
    vec3 col2 = colors[colIndex2];
    float mixer = fract(fr);
    vec3 mx = mix(col1, col2, mixer);
    return mix(vec3(2), mx, whiteness);
}

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
        color = getColor(ref * .5 + .5) * (dot(n, vec3(1,1,-1)) * .5 + .5);
        // color = vec3(dot(n, vec3(1,1,-1)) * .5 + .5);

    }

    outColor = vec4(color, 1);
    // gl_FragColor.a += 1.;

}
