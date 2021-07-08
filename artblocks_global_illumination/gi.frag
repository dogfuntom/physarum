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
#define MAXDEPTH 2

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
mat2 rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);}

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
    spheres[8] = Sphere(600., vec3(50., 681.33, 81.6), vec3(5.), vec3(0.), DIFF);
}

// vec2 SDF(vec3 pos) {
//     pos.z -= 20.;
//     pos.y += 5.;
//     vec2 s1 = vec2(length(pos - vec3(0, -100, 0)) - 100., 6.);
//     vec2 s2 = vec2(length(pos - vec3(0, 6, 0)) - 1., 8.); // lamp
//     vec2 s3 = vec2(pos.y, 4.);
//     vec2 s4 = vec2(length(pos - vec3(-5, 3, 0)) - 3., 4.);
//     vec2 res = s1;
//     res = res.x < s2.x ? res : s2;
//     res = res.x < s3.x ? res : s3;
//     res = res.x < s4.x ? res : s4;
//     return res;
// }

vec2 SDF(vec3 p) {
    p.z -= 10.;
    p.y -= -5.;
    p.xz *= rot(PI/4.);
    // vec2 s1 = vec2(length(p - vec3(0, -110, 0)) - 100., 6.);
    vec2 s2 = vec2(length(p - vec3(0, 120, 0)) - 100., 8.); // lamp
    vec2 s1 = vec2(p.y-1., 4.);
    // vec2 s4 = vec2(length(p - vec3(5, 1, 4)) - 3., 4.);
    vec2 res = s1;
    res = res.x < s2.x ? res : s2;
    // res = res.x < s3.x ? res : s3;
    // res = res.x < s4.x ? res : s4;
    // return res;


    // float col;
    // float sp = 1e9;
    for(int i = 0; i < 340; i++) {
        if(i >= blocksNumber)
            break;
        vec3 pb = p;
        pb.xz += gridSize / 2.;
        pb -= positions[i];
        pb -= sizes[i] / 2.;
        float cornerR = .05;
        // pb = abs(pb);
        // float box = (pb.x+pb.y+pb.z-cornerR)*0.57735027;// TODO заменить на бивел от Гази
        // float box = length(pb - clamp(pb, -sizes[i] / 2. + cornerR, sizes[i] / 2. - cornerR)) - cornerR;
        vec2 box = vec2(length(pb - clamp(pb, -sizes[i] / 2. + cornerR, sizes[i] / 2. - cornerR)) - cornerR, 4);
        vec2 l = sizes[i].xz;
        pb.xz += (l - 1.) / 2.;
        pb.xz = pb.xz - clamp(floor(pb.xz+.5), vec2(0.), l - 1.);
        float h=.2;
        vec2 stud = vec2(max(length(pb.xz) - .28, abs(pb.y - sizes[i].y/2.-h/2.) - h/2.), 4);
        res=res.x<box.x?res:box;
        res=res.x<stud.x?res:stud;
    }
    // float lamp = length(p - vec3(0, 1200, 0)) - 100.;
    //     if(sp<lamp){
    //         sp=lamp;
    //         col=8.;
    //     }

    // return vec2(sp,col);
    // return vec4(sp,col);
    return res;
}

vec3 GetNormal(vec3 pos) {
    vec2 d = vec2(-1, 1) * .01;
    return normalize(SDF(pos + d.xxx).x * d.xxx +
        SDF(pos + d.yyx).x * d.yyx +
        SDF(pos + d.yxy).x * d.yxy +
        SDF(pos + d.xyy).x * d.xyy);
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
    if(rm.y == 4.)
        s = spheres[4];
    if(rm.y == 6.)
        s = spheres[6];
    if(rm.y == 7.)
        s = spheres[7];
    if(rm.y == 8.)
        s = spheres[8];
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
        vec3 n = GetNormal(x), nl = n * sign(-dot(n, r.d));

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
    // vec3 camPos = vec3(uv * 20., 0.);
    vec3 camPos = vec3(0.);
    vec3 color = texture2D(backbuffer, uv * vec2(1, -1) * .5 + .5).rgb * float(tick);
    color += radiance(Ray(camPos, normalize(vec3(uv, 1))));
    gl_FragColor = vec4(color / float(tick + 1.), 1.);
}
