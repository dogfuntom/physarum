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
#define SAMPLES 6
#define MAXDEPTH 4
#define ENABLE_NEXT_EVENT_PREDICTION

// Uncomment to see how many samples never reach a light source
//#define DEBUG

// Not used for now
#define DEPTH_RUSSIAN 2

#define DIFF 0
#define SPEC 1
#define REFR 2
#define NUM_SPHERES 9

float seed = 0.;
float rand() { return fract(sin(seed++)*43758.5453123); }

struct Ray { vec3 o, d; };
struct Sphere {
	float r;
	vec3 p, e, c;
	int refl;
};

Sphere lightSourceVolume = Sphere(20., vec3(50., 81.6, 81.6), vec3(12.), vec3(0.), DIFF);
Sphere spheres[NUM_SPHERES];
void initSpheres() {
	spheres[0] = Sphere(1e5, vec3(-1e5+1., 40.8, 81.6),	vec3(0.), vec3(.75, .25, .25), DIFF);
	spheres[1] = Sphere(1e5, vec3( 1e5+99., 40.8, 81.6),vec3(0.), vec3(.25, .25, .75), DIFF);
	spheres[2] = Sphere(1e5, vec3(50., 40.8, -1e5),		vec3(0.), vec3(.75), DIFF);
	spheres[3] = Sphere(1e5, vec3(50., 40.8,  1e5+170.),vec3(0.), vec3(0.), DIFF);
	spheres[4] = Sphere(1e5, vec3(50., -1e5, 81.6),		vec3(0.), vec3(.75), DIFF);
	spheres[5] = Sphere(1e5, vec3(50.,  1e5+81.6, 81.6),vec3(0.), vec3(.75), DIFF);
	spheres[6] = Sphere(16.5, vec3(27., 16.5, 47.), 	vec3(0.), vec3(1.), SPEC);
	spheres[7] = Sphere(16.5, vec3(73., 16.5, 78.), 	vec3(0.), vec3(.7, 1., .9), REFR);
	spheres[8] = Sphere(600., vec3(50., 681.33, 81.6),	vec3(12.), vec3(0.), DIFF);
}

float intersect(Sphere s, Ray r) {
	vec3 op = s.p - r.o;
	float t, epsilon = 1e-3, b = dot(op, r.d), det = b * b - dot(op, op) + s.r * s.r;
	if (det < 0.) return 0.; else det = sqrt(det);
	return (t = b - det) > epsilon ? t : ((t = b + det) > epsilon ? t : 0.);
}

int intersect(Ray r, out float t, out Sphere s, int avoid) {
	int id = -1;
	t = 1e5;
	s = spheres[0];
	for (int i = 0; i < NUM_SPHERES; ++i) {
		Sphere S = spheres[i];
		float d = intersect(S, r);
		if (i!=avoid && d!=0. && d<t) { t = d; id = i; s=S; }
	}
	return id;
}

vec3 jitter(vec3 d, float phi, float sina, float cosa) {
	vec3 w = normalize(d), u = normalize(cross(w.yzx, w)), v = cross(w, u);
	return (u*cos(phi) + v*sin(phi)) * sina + w * cosa;
}

vec3 radiance(Ray r) {
	vec3 acc = vec3(0.);
	vec3 mask = vec3(1.);
	int id = -1;
	for (int depth = 0; depth < MAXDEPTH; ++depth) {
		float t;
		Sphere obj;
		if ((id = intersect(r, t, obj, id)) < 0) break;
		vec3 x = t * r.d + r.o;
		vec3 n = normalize(x - obj.p), nl = n * sign(-dot(n, r.d));

		//vec3 f = obj.c;
		//float p = dot(f, vec3(1.2126, 0.7152, 0.0722));
		//if (depth > DEPTH_RUSSIAN || p == 0.) if (rand() < p) f /= p; else { acc += mask * obj.e * E; break; }

		if (obj.refl == DIFF) {
			float r2 = rand();
			vec3 d = jitter(nl, 2.*PI*rand(), sqrt(r2), sqrt(1. - r2));
			vec3 e = vec3(0.);
#ifdef ENABLE_NEXT_EVENT_PREDICTION
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
				vec3 l = jitter(l0, 2.*PI*rand(), sqrt(1. - cosa*cosa), cosa);

				if (intersect(Ray(x, l), t, s, id) == i) {
					float omega = 2. * PI * (1. - cos_a_max);
					e += (s.e * clamp(dot(l, n),0.,1.) * omega) / PI;
				}
			}
#endif
			float E = 1.;//float(depth==0);
			acc += mask * obj.e * E + mask * obj.c * e;
			mask *= obj.c;
			r = Ray(x, d);
		} else if (obj.refl == SPEC) {
			acc += mask * obj.e;
			mask *= obj.c;
			r = Ray(x, reflect(r.d, n));
		} else {
			float a=dot(n,r.d), ddn=abs(a);
			float nc=1., nt=1.5, nnt=mix(nc/nt, nt/nc, float(a>0.));
			float cos2t=1.-nnt*nnt*(1.-ddn*ddn);
			r = Ray(x, reflect(r.d, n));
			if (cos2t>0.) {
				vec3 tdir = normalize(r.d*nnt + sign(a)*n*(ddn*nnt+sqrt(cos2t)));
				float R0=(nt-nc)*(nt-nc)/((nt+nc)*(nt+nc)),
					c = 1.-mix(ddn,dot(tdir, n),float(a>0.));
				float Re=R0+(1.-R0)*c*c*c*c*c,P=.25+.5*Re,RP=Re/P,TP=(1.-Re)/(1.-P);
				if (rand()<P) { mask *= RP; }
				else { mask *= obj.c*TP; r = Ray(x, tdir); }
			}
		}
	}
	return acc;
}

void main() {
	initSpheres();
	seed = t + u_res.y * gl_FragCoord.x / u_res.x + gl_FragCoord.y / u_res.y;
	vec2 uv = 2. * gl_FragCoord.xy / u_res.xy - 1.;
	vec3 camPos = vec3((2. * (m.xy==vec2(0.)?.5*u_res.xy:m.xy) / u_res.xy - 1.) * vec2(48., 40.) + vec2(50., 40.8), 169.);
	vec3 cz = normalize(vec3(50., 40., 81.6) - camPos);
	vec3 cx = vec3(1., 0., 0.);
	vec3 cy = normalize(cross(cx, cz)); cx = cross(cz, cy);
	vec3 color = vec3(0.);
	for (int i = 0; i < SAMPLES; ++i)
    {
#ifdef DEBUG
        vec3 test = radiance(Ray(camPos, normalize(.53135 * (u_res.x/u_res.y*uv.x * cx + uv.y * cy) + cz)));
        if (dot(test, test) > 0.) color += vec3(1.); else color += vec3(0.5,0.,0.1);
#else
		color += radiance(Ray(camPos, normalize(.53135 * (u_res.x/u_res.y*uv.x * cx + uv.y * cy) + cz)));
#endif
    }
	gl_FragColor = vec4(pow(clamp(color/float(SAMPLES), 0., 1.), vec3(1./2.2)), 1.);
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

// // #define AA 8.

// // // float seedInc = 0.;
// // // // #define R rnd(seed+seedInc++)
// // // #define R(x) rnd(seed+x)
// // // #define PI 3.1415
// // // #define PI2 6.283
// // // #define E .0001
// // // #define MAXD 50.
// // // #define RM_STEPS 100.
// // // #define O gl_FragColor

// // // пригодится кусок многошагового реймаршинга. Чтобы мы сперва натыкались на 

// // float rnd(vec2 co) {
// //     return fract(sin(mod(dot(co, vec2(12.9898, 78.233)), 3.14)) * 43758.5453);
// // }

// // float rnd(float x) {
// //     return rnd(vec2(x));
// // }

// // // vec3 hsv(float h, float s, float v) {
// // //     vec4 t = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
// // //     vec3 p = abs(fract(vec3(h) + t.xyz) * 6.0 - vec3(t.w));
// // //     return v * mix(vec3(t.x), clamp(p - vec3(t.x), 0.0, 1.0), s);
// // // }
// // // vec2 wob(vec2 uv) {
// // //     return sin(uv.yx * 10. + sin(uv * 7.));
// // // }

// // // #define rot(a) mat2(cos(a),sin(a),-sin(a),cos(a))
// // // #define PHONG 0.
// // // #define PHONG_RAINBOW 1.
// // // #define PHONG_NORMAL 2.
// // // #define PHONG_PRIDE 3.
// // // #define GLASS 100.
// // // #define MIRROR 200.

// // // const float t1 = GLASS;
// // // const float t2 = PHONG;

// // // float smin(float d1, float d2, float k) {
// // //     float h = clamp(0.5 + 0.5 * (d2 - d1) / k, 0.0, 1.0);
// // //     return mix(d2, d1, h) - k * h * (1.0 - h);
// // // }

// // // vec2 d2p(vec2 d) {
// // //     return vec2(atan(d.x, d.y), length(d));
// // // }
// // // vec2 p2d(vec2 p) {
// // //     return p.y * vec2(sin(p.x), cos(p.x));
// // // }
// // // vec2 ngon(vec2 p, float N) {
// // //     vec2 pol = d2p(p.xy);
// // //     float step = 2. * 3.1415 / N;
// // //     pol.x = mod(pol.x, step) - 3.14 / N;
// // //     p.xy = p2d(pol);
// // //     return p;
// // // }

// // // float spiral(vec3 p) {
// // //     p.xz *= rot(p.y);
// // //     p.xz = ngon(p.xz, 1.);
// // //     float w = R(4.) + .2;
// // //     p.z -= w + R(5.) * .5 + .2;
// // //     float res = max(abs(p.z) - w, abs(p.x) - E) * .5;
// // //     return res;
// // // }

// // // float metaballs(vec3 p, float firstPosK) {
// // //     float res = MAXD;
// // //     for(int i = 2; i < 5; i++) {
// // //         float rad = pow(1.5 / float(i), 1.5);
// // //         vec3 offset = vec3(R(.001 + float(i)), R(.002 + float(i)), R(.003 + float(i))) * 2. - 1.;
// // //         if(i == 2)
// // //             offset *= firstPosK;
// // //         offset *= 1. - rad * .5;
// // //         res = smin(res, length(p - offset) - rad, .3);
// // //     }
// // //     return res;
// // // }

// // // float gyr(vec3 p) {
// // //     float scale = 1. + 1. * R(2.);
// // //     float offset = R(1.) * 9.;
// // //     float cyl = length(p.xz) - 1.;
// // //     float gyr = abs(dot(sin(p * scale - offset), cos(p.zxy * scale - offset))) / scale * .4 - .001;
// // //     return max(gyr, cyl);
// // // }

// // // float distIn(vec3 p) {
// // //     float res;
// // //     if(R(50.) < .1) {
// // //         res = metaballs(p, 1.);
// // //     } else if(R(50.) < .2) {
// // //         res = gyr(p);
// // //     } else {
// // //         res = spiral(p);
// // //     }
// // //     return res;
// // // }

// // // vec2 dist(vec3 p) {
// // //     p.xz *= rot(m.x*8.);
// // //     // p.xz *= rot(t - 2.);
// // //     p.xy *= rot(.785);
// // //     float bumpsAmp = 2.;
// // //     float bumpsScale = 2.;
// // //     float bumps = 0.;
// // //     if(R(41.) < .1)
// // //         bumps = dot(sin(p * bumpsScale - t * 0.), cos(p.zxy * bumpsScale + t * 0.)) / bumpsScale * .1 * bumpsAmp;

// // //     float s1;
// // //     if(R(.22) < .9) {
// // //         s1 = .7 * (length(p) - 2. + bumps);
// // //     } else {
// // //         s1 = metaballs(p * .5, 0.) / .5;
// // //     }

// // //     // float s1 = .7 * (length(p) - 2.);
// // //     vec2 extra = vec2(MAXD, R(13.) < .9 ? MIRROR : PHONG_NORMAL);
// // //     if(R(12.) < .05) {
// // //         vec3 pt = p;
// // //         // if(R(12.) < .1) pt.xy *= rot(3.14 / 4.);
// // //         float rad1 = .01 + .05 * R(13.);
// // //         float rad2 = 2. + .5 + .8 * R(14.) + rad1;
// // //         float tor = length(vec2(pt.y, length(pt.xz) - rad2)) - rad1;
// // //         extra.x = tor;
// // //     } else if(R(12.) < .1) {
// // //         vec3 pt = p;
// // //         // pt.y-=bumps;
// // //         // if(R(12.) < .1) pt.xy *= rot(3.14 / 4.);
// // //         float width = .5 + .4 * R(13.);
// // //         float rad = 2. + .2 + R(14.) + width;
// // //         float thikness = .01;// * R(18.);+.01;
// // //         float ring = max(abs(pt.y) - thikness, abs(length(p.xz) - rad) - width);
// // //         extra.x = ring;
// // //     }
// // //     float s2 = length(p) - 1. * R(0.);
// // //     vec2 shape2 = vec2(max(s1, distIn(p)), PHONG_RAINBOW);//PHONG_RAINBOW MIRROR PHONG_PRIDE
// // //     vec2 shape1 = vec2(s1, GLASS);
// // //     if(R(41.) < .01) {
// // //         // shape1.y = MIRROR;
// // //         shape2.x = MAXD;
// // //     } else {
// // //         shape1.x = max(s1, -shape2.x + 100. * E);
// // //     }

// // //     vec2 res = (shape1.x < shape2.x ? shape1 : shape2);
// // //     res = (res.x < extra.x ? res : extra);
// // //     return res;
// // // }

// // // vec3 norm(vec3 p) {
// // //     vec2 e = vec2(E, 0);
// // //     return normalize(vec3(dist(p + e.xyy).x - dist(p - e.xyy).x, dist(p + e.yxy).x - dist(p - e.yxy).x, dist(p + e.yyx).x - dist(p - e.yyx).x));
// // // }

// // void main() {
// //     // gl_FragColor = texture2D(backbuffer, uv * .5 + .5);
// //     // gl_FragColor = vec4(1,0,.5,1);
// //     if(tick < AA * AA) {
// //         vec2 uv_ = uv * vec2(1, -1) + 4. * vec2(mod(tick, AA), floor(tick / AA)) / AA / u_res;
// //         uv_ = uv_ / dot(uv_, uv_);
// //         uv_ = mod(uv_, arr[100]);
// //         gl_FragColor = vec4(vec3(length(uv_)), 1);
// //         gl_FragColor = mix(texture2D(backbuffer, uv * vec2(1, -1) * .5 + .5), gl_FragColor, 1. / (tick + 1.));
// //         // gl_FragColor = mix(texture2D(backbuffer, uv*vec2(1,-1) * .5 + .5), gl_FragColor, 1.);
// //     } else {
// //         gl_FragColor = texture2D(backbuffer, (uv * vec2(1, -1) * .5 + .5));
// //     }
// //     // if(mod(tick, 2.) == .0) {
// //     //     gl_FragColor.rgb = 1. - gl_FragColor.rgb;
// //     // }
// //     // int inside = 0;
// //     // float d, e = 1., i, j, gl;
// //     // vec3 p, rd = normalize(vec3(uv, 5)), ro = vec3(0, 0, -16. - 20. * R(40.));
// //     // // vec3 p, rd = vec3(0, 0, 1), ro = vec3(uv * 3., -4);
// //     // vec2 rm;
// //     // float okoeff = 0.;

// //     //     // повторим несколько раз, пока или расстояние или число шагов не выйдет за пределы дозволенного.
// //     // for(float k = 0.; k < 4.; k++) {
// //     //     d = 0.;
// //     //     for(float i = 0.; i < RM_STEPS; i++) {
// //     //         p = rd * d + ro;
// //     //         rm = dist(p);
// //     //         e = rm.x;
// //     //         if(abs(e) < E || d > MAXD)
// //     //             break;
// //     //         j = i;
// //     //         d += abs(e);
// //     //         // if(inside == 0) O[0] += .001*abs(e),okoeff+=.001; else O[1]+=.1*abs(e),okoeff+=.1;
// //     //     }

// //     //     // каждый раз после реймаршинга что-то делаем с цветом. 
// //     //     // каждое преломление или отражение должно что-то менять.
// //     //     vec3 n = norm(p);
// //     //     float dt = dot(n, vec3(1, 1, -1)) * .5 + .5;

// //     //     // МОЛОКО
// //     //     if(e > E || d > MAXD) {
// //     //         // O.rgb += normalize(cross(rd, normalize(vec3(R(1.),R(3.),R(2.))*2.-1.)))*.5+.5;
// //     //         vec3 rd_ = rd;
// //     //         rd_.xy *= rot(R(30.) * PI2);
// //     //         rd_.xz *= rot(R(31.) * PI2);
// //     //         rd_.xz *= rot(R(.33) * sin(rd_.y * 20. * R(.44)));
// //     //         // O.rgb += (rd_ * .5 + .5);// * pow(abs(R(99.)*2.-1.), .1);
// //     //         O.rgb += hsv(R(.44)+length(uv)*.05,R(.55)*R(.55)*.8,.9);// * pow(abs(R(99.)*2.-1.), .1);
// //     //         okoeff++;
// //     //         break;
// //     //     } else 

// //     //     // МАТОВЫЙ
// //     //     if(rm.y < 100.) {
// //     //         float phong = (dot(n, vec3(1, 1, -1)) * .5 + .5);
// //     //         if(rm.y == PHONG_RAINBOW) {
// //     //             O.rgb += phong * hsv(.3 * dot(n, vec3(0, 0, 1)) - R(2.), 1., 1.);
// //     //         } else if(rm.y == PHONG_NORMAL) {
// //     //             O.rgb += phong * vec3(-n) * .5 + .5;
// //     //         } else if(rm.y == PHONG_PRIDE) {
// //     //             p.xz *= rot(t - 2.);
// //     //             p.xy *= rot(.785);//R(4.));
// //     //             O.rgb += 1. * phong * hsv(length(p.xz) * R(4.), 1., 1.);
// //     //         } else {
// //     //             O += .5 * phong;
// //     //             break;
// //     //         }
// //     //         okoeff++;
// //     //         break;
// //     //     }

// //     //     // ПРОЗРАЧНЫЙ
// //     //     else if(rm.y < 200.) {
// //     //         if(inside == 0) {
// //     //             O += 4. * pow(dot(n, normalize(vec3(1, 1, -2))), 100.);
// //     //             O += 4. * pow(dot(n, normalize(vec3(.5, 1.3, -2))), 800.);
// //     //             O += pow(1. - dot(rd, -n), 2.);
// //     //             rd = refract(rd, n, .8);
// //     //             ro = p + 30. * E * n * -1.;
// //     //         } else {
// //     //             // rd = refract(rd, -n, .8);
// //     //             ro = p + 30. * E * n * 1.;
// //     //             O.rgb += R(21.) * .5 * d * hsv(R(20.), 1., pow(R(22.), .1));
// //     //             okoeff += R(21.) * .5 * d;
// //     //         }

// //     //         inside = 1 - inside;
// //     //     }

// //     //     // ЗЕРКАЛЬНЫЙ
// //     //     else if(rm.y < 300.) {
// //     //         O -= .5;
// //     //         // float phong = (dot(n, vec3(1, 1, -1)) * .5 + .5);
// //     //         // O.rgb += phong * hsv((dot(n, rd) + length(p.xz)) * .3 - R(2.), 1., 1.);
// //     //         // okoeff++;
// //     //         // okoeff += .3;
// //     //         rd = reflect(rd, n);
// //     //         ro = p + 2. * E * n * sign(dot(rd, n));
// //     //     }

// //     //         // // if(d < 30.) {
// //     //         // float r = R;
// //     //         // pp.xy += wob(p.xy) * r * .1;
// //     //         // pp.xz += wob(p.xz) * r * .1;
// //     //         // if(rm.y == 0.)
// //     //         //     gl_FragColor.rgb += hsv(pow(R, 8.) * dot(pp, vec3(1)) + R, 1., 1.);
// //     //         // else
// //     //         //     gl_FragColor.rgb += hsv(R, 1., 1.);

// //     //         // gl_FragColor *= dot(vec3(-1), n);
// //     //         // // }
// //     // }

// //     //     // if(rnd(seed + 8.) < .1)
// //     //     //     gl_FragColor.rgb = 1. - gl_FragColor.rgb;

// //     // O /= okoeff;

// //     // // O-=O;
// //     // // O+=1./d;
// //     // O.a = 1.;
// // }