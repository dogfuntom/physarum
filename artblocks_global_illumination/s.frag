precision highp float;
varying vec2 uv;
uniform float t;
uniform float tick;
// uniform float seed;
uniform float gridSize;
uniform int blocksNumber;
// uniform float arr[1024];
uniform vec3 positions[340];
uniform vec3 bgColor;
uniform vec3 sizes[340];
uniform vec3 colors[340];
// uniform float posf[5];
// uniform vec3 arr3[1021];
// uniform vec3 arr_[10];
uniform vec2 m;
uniform vec2 u_res;
uniform sampler2D backbuffer;
#define PI 3.1415

// Play with the two following values to change quality.
// You want as many samples as your GPU can bear. :)
#define MAXDEPTH 4

// Uncomment to see how many samples never reach a light source
//#define DEBUG

// Not used for now
#define DEPTH_RUSSIAN 2

#define DIFF 0
#define SPEC 1
#define REFR 2
#define NUM_SPHERES 9

float seed = 0.;
float rand() {
    return fract(sin(seed++) * 43758.5453123);
}

struct Ray {
    vec3 o, d;
};
struct Sphere {
    float r;
    vec3 p, e, c;
    int refl;
};

Sphere lightSourceVolume = Sphere(20., vec3(50., 81.6, 81.6), vec3(12.), vec3(0.), DIFF);
Sphere spheres[NUM_SPHERES];
void initSpheres() {
    spheres[0] = Sphere(1e5, vec3(-1e5 + 1., 40.8, 81.6), vec3(0.), vec3(.75, .25, .25), DIFF);
    spheres[1] = Sphere(1e5, vec3(1e5 + 99., 40.8, 81.6), vec3(0.), vec3(.25, .25, .75), DIFF);
    spheres[2] = Sphere(1e5, vec3(50., 40.8, -1e5), vec3(0.), vec3(.75), DIFF);
    spheres[3] = Sphere(1e5, vec3(50., 40.8, 1e5 + 170.), vec3(0.), vec3(0.), DIFF);
    spheres[4] = Sphere(1e5, vec3(50., -1e5, 81.6), vec3(0.), vec3(.75), DIFF);
    spheres[5] = Sphere(1e5, vec3(50., 1e5 + 81.6, 81.6), vec3(0.), vec3(.75), DIFF);
    spheres[6] = Sphere(16.5, vec3(27., 16.5, 47.), vec3(0.), vec3(1.), SPEC);
    spheres[7] = Sphere(16.5, vec3(73., 16.5, 78.), vec3(0.), vec3(.7, 1., .9), REFR);
    spheres[8] = Sphere(600., vec3(50., 681.33, 81.6), vec3(10.), vec3(0.), DIFF);
}


vec2 SDF(vec3 pos) {
    vec2 s1 = vec2(length(pos - vec3(50., -1e5, 81.6)) - 1e5, 6.);
    vec2 s2 = vec2(length(pos - vec3(50., 130., 81.6)) - 100., 8.); // lamp
    vec2 s3 = vec2(length(pos - vec3(27., 16.5, 47.)) - 16.5, 7.);
    vec2 s4 = vec2(length(pos - vec3(73., 16.5, 78.)) - 16.5, 4.);
    vec2 res = s1;
    res = res.x<s2.x?res:s2;
    res = res.x<s3.x?res:s3;
    res = res.x<s4.x?res:s4;
    return res;
}

vec3 GetNormal( vec3 pos )
{
    vec2 d = vec2(-1,1)*.01;
    return normalize(
        		SDF(pos+d.xxx).x*d.xxx+
        		SDF(pos+d.yyx).x*d.yyx+
        		SDF(pos+d.yxy).x*d.yxy+
        		SDF(pos+d.xyy).x*d.xyy
        	);
}

int Trace(Ray ray, out float t, out Sphere s, int avoid) {
    float e = .001;
    ray.o += ray.d * e * 4.; // try to prevent false self-intersect
    t = 0.;
    vec2 rm;
    for(int i = 0; i < 200; i++) {
        rm = SDF(ray.o);
        float d = rm.x;
        ray.o += d * ray.d;
        t += d;
        if(d < e)
            break;
    }
    if(rm.y==4.) s = spheres[4];
    if(rm.y==6.) s = spheres[6];
    if(rm.y==7.) s = spheres[7];
    if(rm.y==8.) s = spheres[8];
    return int(rm.y);
}

vec3 jitter(vec3 d, float phi, float sina, float cosa) {
    vec3 w = normalize(d), u = normalize(cross(w.yzx, w)), v = cross(w, u);
    return (u * cos(phi) + v * sin(phi)) * sina + w * cosa;
}

vec3 radiance(Ray r) {
    vec3 acc = vec3(0.);
    vec3 mask = vec3(1.);
    int id = -1;
    for(int depth = 0; depth < MAXDEPTH; ++depth) {
        float t;
        Sphere obj;
        if((id = Trace(r, t, obj, id)) < 0)
            break;
        vec3 x = t * r.d + r.o;
        vec3 n = GetNormal(x), 
        nl = n * sign(-dot(n, r.d));

		//vec3 f = obj.c;
		//float p = dot(f, vec3(1.2126, 0.7152, 0.0722));
		//if (depth > DEPTH_RUSSIAN || p == 0.) if (rand() < p) f /= p; else { acc += mask * obj.e * E; break; }

        if(obj.refl == DIFF) {
            float r2 = rand();
            vec3 d = jitter(nl, 2. * PI * rand(), sqrt(r2), sqrt(1. - r2));
            vec3 e = vec3(0.);
			//for (int i = 0; i < NUM_SPHERES; ++i)
            {
				// Sphere s = sphere(i);
				// if (dot(s.e, vec3(1.)) == 0.) continue;

				// Normally we would loop over the light sources and
				// cast rays toward them, but since there is only one
				// light source, that is mostly occluded, here goes
				// the ad hoc optimization:
                Sphere s = lightSourceVolume;
                int i = 8;

                vec3 l0 = s.p - x;
                float cos_a_max = sqrt(1. - clamp(s.r * s.r / dot(l0, l0), 0., 1.));
                float cosa = mix(cos_a_max, 1., rand());
                vec3 l = jitter(l0, 2. * PI * rand(), sqrt(1. - cosa * cosa), cosa);

                if(Trace(Ray(x, l), t, s, id) == i) {
                    float omega = 2. * PI * (1. - cos_a_max);
                    e += (s.e * clamp(dot(l, n), 0., 1.) * omega) / PI;
                }
            }
            float E = 1.;//float(depth==0);
            acc += mask * obj.e * E + mask * obj.c * e;
            mask *= obj.c;
            r = Ray(x, d);
        } else if(obj.refl == SPEC) {
            acc += mask * obj.e;
            mask *= obj.c;
            r = Ray(x, reflect(r.d, n));
        } else {
            float a = dot(n, r.d), ddn = abs(a);
            float nc = 1., nt = 1.5, nnt = mix(nc / nt, nt / nc, float(a > 0.));
            float cos2t = 1. - nnt * nnt * (1. - ddn * ddn);
            r = Ray(x, reflect(r.d, n));
            if(cos2t > 0.) {
                vec3 tdir = normalize(r.d * nnt + sign(a) * n * (ddn * nnt + sqrt(cos2t)));
                float R0 = (nt - nc) * (nt - nc) / ((nt + nc) * (nt + nc)), c = 1. - mix(ddn, dot(tdir, n), float(a > 0.));
                float Re = R0 + (1. - R0) * c * c * c * c * c, P = .25 + .5 * Re, RP = Re / P, TP = (1. - Re) / (1. - P);
                if(rand() < P) {
                    mask *= RP;
                } else {
                    mask *= obj.c * TP;
                    r = Ray(x, tdir);
                }
            }
        }
    }
    return acc;
}

void main() {
    initSpheres();
    vec2 st = gl_FragCoord.xy / u_res.xy;
    seed = t + u_res.y * gl_FragCoord.x / u_res.x + gl_FragCoord.y / u_res.y;
	// vec2 uv = 2. * gl_FragCoord.xy / u_res.xy - 1.;
    vec3 camPos = vec3((2. * .5 * u_res.xy / u_res.xy - 1.) * vec2(48., 40.) + vec2(50., 40.8), 169.);
    vec3 cz = normalize(vec3(50., 40., 81.6) - camPos);
    vec3 cx = vec3(1., 0., 0.);
    vec3 cy = normalize(cross(cx, cz));
    cx = cross(cz, cy);
    vec3 color = texture2D(backbuffer, uv * vec2(1, -1) * .5 + .5).rgb * float(tick);
    color += radiance(Ray(camPos, normalize(.53135 * (u_res.x / u_res.y * uv.x * cx + uv.y * cy) + cz)));
    gl_FragColor = vec4(color / float(tick + 1.), 1.);

}




















// float SDF( vec3 pos )
// {
//     return min(min(min(
//         	length(pos.xz) - 1., // sphere in the centre
//         	length(pos-vec3(0,-11,0)) - 10.), // sphere below
//         	length(pos-vec3(-6,0,0)) - 5.), // sphere to the left
//         	10. - length(pos) // inverse sphere containing the scene
//         );
// }

// void BRDF( out vec3 tint, out vec3 emissive, in vec3 pos,
//           in vec3 toEye, in vec3 toLight, in vec3 normal )
// {
// 	tint = vec3(.95); // default everything to white paint
//     if ( length(pos-vec3(-6,0,0)) - 5. <= .004 ) // are we on the left sphere?
//     {
//     	tint = vec3(.95,0,0); // paint it red
//     }

//     // lighting - just basic n.l
// 	tint *= dot(normal,toLight); // no need to do max(0,) because we never fire rays inside the surface

//     // emit light from some surfaces
//     emissive = vec3(0); // default: non-emissive

//     if ( length(pos) > 9. ) // are we on the outer sphere?
//     {
//         // draw an emissive-only background
//         tint = vec3(0);
//         emissive = vec3(10)*pow(max(0.,dot(normalize(pos),normalize(vec3(2,3,1)))),10.)
//             		+ .7;
//     }
// }

// //--------renderer-------

// // From https://www.shadertoy.com/view/ltXBz8
// vec3 SphereRand( int seed )
// {
//     float a = (float((seed*1234)&15321)/float(1034152))*2. - 1.;
//     float b = 6.283*(float((seed*1234)&15321)/float(1034152));
//     float cosa = sqrt(1.-a*a);
//     return vec3(cosa*cos(b),a,cosa*sin(b));
// }

// vec3 HemisphereRand( vec3 a, int seed )
// {
//     vec3 r = SphereRand(seed);
//     return dot(r,a)>.0?r:-r;
// }

// vec3 GetNormal( vec3 pos )
// {
//     vec2 d = vec2(-1,1)*.01;
//     return normalize(
//         		SDF(pos+d.xxx)*d.xxx+
//         		SDF(pos+d.yyx)*d.yyx+
//         		SDF(pos+d.yxy)*d.yxy+
//         		SDF(pos+d.xyy)*d.xyy
//         	);
// }

// vec3 Trace( vec3 pos, vec3 ray )
// {
//     float e = .001;
//     pos += ray*e*4.; // try to prevent false self-intersect
//     for ( int i=0; i < 200; i++ )
//     {
//         float s = SDF(pos);
//         pos += s*ray;
//         if ( s < e ) break;
//     }
//     return pos;
// }

// void mainImage( out vec4 gl_FragColor, in vec2 gl_FragCoord )
// {
//     // random seed per-pixel
//     // for best results this should be random noise, but I like having an obvious pattern
//     // so I can see when the render has converged
//     // also looks cool if you set it to 0
//     int pixelSeed = int(fragCoord.x)^int(fragCoord.y);

//     // anti-aliasing
//     vec2 jitter = vec2((pixelSeed^int(iFrame*7))&0xffU,((pixelSeed^int(iFrame*29))/5U)&0xffU)/float(0x100U) - .5;

//     // camera setup
//     vec3 ray = normalize(vec3(
//         			(fragCoord.xy+jitter-iResolution.xy*.5)/iResolution.y,
//                      1.0
//                 ));
//     vec3 pos = vec3(0,0,-3);

//     // monte-carlo loop
//     vec3 emit = vec3(0);
//     vec3  tint = vec3(1);
//     const int bounces = 8U;
//     for ( int i=0U; i < bounces; i++ )
//     {
//         pos = Trace( pos, ray );
//         vec3 normal = GetNormal(pos);

//         // fire the next ray
//         int seed = pixelSeed^(int(iFrame)/(1u+i)); // bounce directions should be independent of each other
//         vec3 newRay = HemisphereRand(normal,seed);
//         vec3 tinti, emiti;

//         // sample what colour the next ray should be tinted, and any emissive effects
//         BRDF( tinti, emiti, pos, -ray, newRay, normal );

//         // apply previous accumulated tint to emissive colour from this point
//         emit += tint*emiti;

//         // accumulate tint
//         tint *= tinti;

//         if ( length(tint) == 0. ) break; // optimisation - ignore bounces from a surface that doesn't bounce any light

//         ray = newRay;
//     }

//     // sum colour with previous sample, keep count of total in alpha
//     gl_FragColor.rgb = emit;
//     gl_FragColor.a = 1.;

//     if ( iFrame > 0 )
//     {
// 		gl_FragColor += texelFetch(iChannel0,ivec2(fragCoord.xy),0);
//     }
// }

































// /*

// План такой
// - 10 Передаю размеры и координаты кубиков из лего-части. Старый рендер тоже оставляю, делаю опционаьным.
// - Координаты оставляю в текущем формате, в глсл преобразовываю.
// - Перетаскиваю ГИ

// */ 

// mat2 rot(float a) {
//     float s = sin(a), c = cos(a);
//     return mat2(c, -s, s, c);
// }

// vec4 dist(vec3 p) {
//     // p.xz *= rot(t);
//     vec3 col;
//     float sp = 999.;
//     for(int i = 0; i < 340; i++) {
//         if(i >= blocksNumber)
//             break;
//         vec3 pb = p;
//         pb += gridSize / 2.;
//         pb -= positions[i];
//         pb -= sizes[i] / 2.;
//         // float box = max(abs(pb.z) - 1., max(abs(pb.x) - 1., abs(pb.y) - 1.));
//         float cornerR = .05;
//         // pb = abs(pb);
//         // float box = (pb.x+pb.y+pb.z-cornerR)*0.57735027;// TODO заменить на бивел от Гази
//         float box = length(pb - clamp(pb, -sizes[i] / 2. + cornerR, sizes[i] / 2. - cornerR)) - cornerR;
//         // pb.xz =mod(pb.xz,2.)-1.;
//         // pb.xz = pb.xz - 1. * clamp(ceil(p.xz / 1.), - sizes[i].xz, sizes[i].xz);
//         vec2 l = sizes[i].xz;
//         pb.xz += (l - 1.) / 2.;
//         pb.xz = pb.xz - clamp(floor(pb.xz+.5), vec2(0.), l - 1.);
//         float h=.2;
//         float stud = max(length(pb.xz) - .28, abs(pb.y - sizes[i].y/2.-h) - h/2.);
//         float res=min(stud,box);

//         if(res<sp){
//             sp=res;
//             col=colors[i];
//         }
//     }
//     return vec4(sp,col);
// }

// // vec3 norm(vec3 p) {
// //     vec2 e = vec2(.01, 0.);
// //     return normalize(vec3(dist(p + e.xyy) - dist(p - e.xyy), dist(p + e.yxy) - dist(p - e.yxy), dist(p + e.yyx) - dist(p - e.yyx)));
// // }

// void main() {
//     float d = 0., e, j;
//     vec4 rm;
//     vec3 p, rd = normalize(vec3(0, 0, 1.));
//     for(float i = 0.; i < 99.; i++) {
//         j = i;
//         p = d * rd + vec3(uv * 7., 0);
//         p.z -= 20.;
//         p.yz *= rot(PI / 4.);
//         // p.xz*=rot(t);
//         p.xz *= rot(PI / 4.);
//         rm = dist(p);
//         d += e = rm.x;
//         if(e < .001)
//             break;
//     }
//     // gl_FragColor = vec4(vec3(dot(norm(p) * .8 + .2, vec3(1.))), 1.);
//     gl_FragColor = vec4(vec3(10. / j)*rm.yzw/255., 1.);
//     if(j>=98.){
//         gl_FragColor.rgb=bgColor/255.;
//     }
// }