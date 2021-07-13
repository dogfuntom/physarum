precision highp float;
varying vec2 uv;
uniform float t;
uniform float tick;
uniform int blocksNumber;
uniform vec3 positions[300];
uniform vec3 bgColor;
uniform vec3 sizes[300];
uniform vec3 colors[300];
// uniform vec2 m;
uniform vec2 u_res;
uniform sampler2D backbuffer;
uniform float camScale;
uniform vec2 camOffset;
uniform vec2 camAng;
#define PI 3.1415
#define rnd(x) fract(54321.987 * sin(987.12345 * x))
#define rot(a) mat2(cos(a),-sin(a),sin(a),cos(a))

vec2 random2f() {
    vec2 rn = vec2(rnd(length(uv) - t), rnd(length(uv) - t - .1));
    float k = .5;
    vec2 a;
    a.x = .5*pow(2.0*((rn.x<0.5)?rn.x:1.0-rn.x), k);
    a.y = .5*pow(2.0*((rn.y<0.5)?rn.y:1.0-rn.y), k);
    rn.x = (rn.x<0.5)?a.x:1.0-a.x;
    rn.y = (rn.y<0.5)?a.y:1.0-a.y;
    return rn * 2. - 1.;
}

vec4 dist(vec3 p) {
    p.x=abs(p.x);
    vec3 col=bgColor;
    float sp = p.y+1.;
    for(int i = 0; i < 340; i++) {
        if(i >= blocksNumber)
            break;
        vec3 pb = p;
        pb -= positions[i];
        float cornerR = .05;
        // vec3 pbb = abs(pb) - clamp(abs(pb), -sizes[i] / 2. + cornerR, sizes[i] / 2. - cornerR);
        // float box = (pbb.x+pbb.y+pbb.z-cornerR)*0.57735027;// TODO заменить на бивел от Гази
        float box = length(pb - clamp(pb, -sizes[i] / 2. + cornerR, sizes[i] / 2. - cornerR)) - cornerR*1.4;
        vec2 l = sizes[i].xz;
        pb.xz += (l - 1.) / 2.;
        pb.xz = pb.xz - clamp(floor(pb.xz + .5), vec2(0.), l - 1.);
        float h = .27;
        float stud = max(abs(length(pb.xz) - .28+.05)-.05, abs(pb.y - sizes[i].y / 2. - h / 2.) - h / 2.);
        float res = min(stud, box);

        if(res < sp) {
            sp = res;
            col = colors[i];
        }
    }
    return vec4(sp, col);
}

vec3 norm(vec3 p) {
    vec2 e = vec2(.01, 0.);
    return normalize(vec3(dist(p + e.xyy).x - dist(p - e.xyy).x, dist(p + e.yxy).x - dist(p - e.yxy).x, dist(p + e.yyx).x - dist(p - e.yyx).x));
}


void main() {
    float skipLines = 1.;
    if(mod(gl_FragCoord.x + tick, skipLines) > 1.) {
        gl_FragColor = texture2D(backbuffer, (uv * vec2(1, -1) * .5 + .5));
        return;
    }
    float d = 0., e, j;
    vec4 rm;
    float camDist = 400.;
    float focusDistance = camDist - 10.;
    float blurAmount = .0;//10.8;
    vec2 uv_=uv+random2f()*1.5/u_res;
    vec3 p, ro = vec3(uv_ * camScale + camOffset, 0);
    vec3 focus = ro + vec3(0, 0, focusDistance);
    ro.xy += blurAmount * normalize(random2f())*rnd(length(uv_)-t-.2);
    vec3 rd = normalize(focus - ro)*(rnd(length(uv_-t))*.1+.9);

    for(float i = 0.; i < 99.; i++) {
        j = i;
        p = d * rd + ro;
        p.z -= camDist;
        p.yz *= rot(camAng.x);
        p.xz *= rot(camAng.y);
        rm = dist(p);
        d += e = rm.x;
        if(e < .001)
            break;
    }
    // // col
    gl_FragColor = vec4((vec3(10./j) * dot(norm(p) * .8 + .2, vec3(1, 1, 0)) * .5 + .5) * rm.yzw / 255., 1.);
    
    // bw
    // gl_FragColor = vec4(vec3(10./j)*length(rm.yzw / 255.), 1.);
    // gl_FragColor = vec4(vec3(10. / j) * rm.yzw / 255., 1.);

    // glow
    // gl_FragColor = vec4((vec3(j/10.) * dot(norm(p) * .8 + .2, vec3(1, 1, 0)) * .5 + .5) * rm.yzw / 255., 1.);

    gl_FragColor = mix(texture2D(backbuffer, uv * vec2(1, -1) * .5 + .5), gl_FragColor, 1. / (floor(tick / skipLines) + 1.));
}