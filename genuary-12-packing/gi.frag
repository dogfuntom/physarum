#version 300 es
precision highp float;
uniform vec2 u_resolution;
uniform vec2 mouse;
uniform float u_time;
uniform float u_frame;
uniform float u_params[10];
uniform sampler2D backbuffer;
uniform sampler2D u_tex_voxels;
#define rnd(x) fract(54321.987 * sin(987.12345 * x + .1))
#define rnd_k(_) rnd(k+floor(100.*id)+_)
#define rot(a) mat2(cos(a),-sin(a),sin(a),cos(a))
#define PI 3.141519265

out vec4 o;

#define color(c) (c-cos((c + off) * 2. * 3.1415) * mul + add)
vec3 off = vec3(.02, .03, .04);
vec3 mul = vec3(.5, .5, .5);
vec3 add = vec3(.5, .5, .5);

float tex = 1.;
float id = 0.;
vec3 col = vec3(1);
int type = 0;


float kDepthMin;
float depthMin=999.;
float kHit=0.;
float voxelId;


vec4 getRelativeVoxel(vec3 p){
    p = floor(p/2.);
    vec3 pTex = p + 128. / 2.; // FIXME pass N as uniform
    vec2 uvTex = vec2(pTex.x, pTex.y + 128. * pTex.z) / vec2(128., 128. * 128.);  // FIXME pass N as uniform
    return texture(u_tex_voxels, uvTex);
}

float sdfVoxel(vec3 p) {
    depthMin=0.;
    kHit=0.;
    kDepthMin = -1.;
    // return length(floor(p))-4.;
    id = 0.;
    vec4 tx = getRelativeVoxel(p);
    id = tx.r;
    if(tx.r > 0.){ // voxel is full
        bool b = getRelativeVoxel(p + vec3( 0,0, 1)).r > 0.;
        bool r = getRelativeVoxel(p + vec3( 1,0, 0)).r > 0.;
        bool f = getRelativeVoxel(p + vec3( 0,0,-1)).r > 0.;
        bool l = getRelativeVoxel(p + vec3(-1,0, 0)).r > 0.;
        bool br = getRelativeVoxel(p + vec3( 1, 0, 1)).r > 0.;
        bool rf = getRelativeVoxel(p + vec3( 1, 0,-1)).r > 0.;
        bool fl = getRelativeVoxel(p + vec3(-1, 0,-1)).r > 0.;
        bool lb = getRelativeVoxel(p + vec3(-1, 0, 1)).r > 0.;
        if(false);
        else if(!b &&  r &&  f &&  l) type = 1;     // b    1
        else if( b && !r &&  f &&  l) type = 2;     // r    2
        else if( b &&  r && !f &&  l) type = 3;     // f    3
        else if( b &&  r &&  f && !l) type = 4;     // l    4
        else if(!b && !r &&  f &&  l) type = 5;     // br   5
        else if( b && !r && !f &&  l) type = 6;     // rf   6
        else if( b &&  r && !f && !l) type = 7;     // fl   7
        else if(!b &&  r &&  f && !l) type = 8;     // lb   8
        else if(!br) type =  9;     // bri  9
        else if(!rf) type = 10;     // rfi 10
        else if(!fl) type = 11;     // fli 11
        else if(!lb) type = 12;     // lbi 12
        else type = 0;     // c    0
    }

    float res = .5 - step(1e-4, tx.r);

    voxelId = rnd(dot(floor(p),vec3(13,17,19)));
    return res;
}

float sdf(vec3 p) {
    float boundingBox = length(p-clamp(p,-.4999, .4999))-.0001;
    switch(type){
        case 0: return boundingBox;
        case 1: // b
            p.xz *= rot(PI);
            break;
        case 2: // r
            p.xz *= rot(-PI/2.);
            break;
        case 3: // f
            break;
        case 4: // l
            p.xz *= rot(PI/2.);
            break;
        case 5: // br
            p.xz = -p.xz;
            if(p.x<p.z)p.xz=p.zx;
            break;
        case 6: // rf
            p.x = -p.x;
            if(p.x<p.z)p.xz=p.zx;
            break;
        case 7: // fl
            if(p.x<p.z)p.xz=p.zx;
            break;
        case 8: // lb
            p.z = -p.z;
            if(p.x<p.z)p.xz=p.zx;
            break;
        case 9: // bri
            p.xz = -p.xz;
            if(p.x>p.z)p.xz=p.zx;
            break;
        case 10: // rfi
            p.x = -p.x;
            if(p.x>p.z)p.xz=p.zx;
            break;
        case 11: // fli
            if(p.x>p.z)p.xz=p.zx;
            break;
        case 12: // lbi
            p.z = -p.z;
            if(p.x>p.z)p.xz=p.zx;
            break;
    }

    float c = -p.z;
    for(float k = 1.; k < 6.; k++) {
        p.xy = p.yx;
        float period = 2. * (rnd_k(.3) * .8 + .2);
        if(k <= 2.)
            period = 1.;
        p.y = mod(p.y, period) - period * .5;
        vec3 p1 = p;
        p1.x = 0.;
        float width = rnd_k(.1) * period * .2 + .04;
        float depth = pow(rnd_k(.2), 4.) * .4 + .05;
        if(depthMin < depth) {
            depthMin = depth;
            kDepthMin = k;
        }
        p1.y -= clamp(p1.y, -width * .5, width * .5); // width
        p1.z -= clamp(p1.z, -depth, .0); // depth

        float cNew = length(p1) - .0001;
        if(cNew < c) {
            c = cNew;
            kHit = k;
        }
    }

    float res = c;
    if(res < boundingBox) {
        res = boundingBox;
        kHit = -1.;
    }

    return res;
}

vec3 norm(vec3 p) {
    float d = sdf(p);
    vec2 e = vec2(.0001, 0);
    return normalize(vec3(d - sdf(p - e.xyy), d - sdf(p - e.yxy), d - sdf(p - e.yyx)));
}

vec3 getLight(vec3 p) {
    if(p.y > 30. && p.z > 0. && p.x > 0.)
        return vec3(15, 6, 5);
    if(p.y > 30. && p.z < -0. && p.x < -0.)
        return vec3(5, 5, 15);
    // if(kHit == kDepthMin)
    //     return vec3(1.);
    return vec3(0);
}

void main() {
    float i, d, e, s, l;

    vec2 uv = (gl_FragCoord.xy + rnd(length(mod(vec3(gl_FragCoord.xy, u_time), 3.141592))) - .5 - u_resolution * .5) / u_resolution.y + .001;
    vec3 rd = (vec3(0, 0, 1)), ro, p;
    ro.xz = uv * 16.;
    ro.y = 30.;
    rd.yz *= rot(atan(1. / sqrt(2.)));
    rd.xz *= rot(3.1415 / 4.);
    ro.x /= sqrt(3.);
    ro.xz *= rot(3.1415 / 4.);

    vec3 light;

    vec3 n;
    for(; s++ < 4.;) {
        d = 0.;
        for(i = 0.; i++ < 100.;) {
            p = ro + rd * d;
            vec3 dp = (step(0., rd) - fract(p)) / rd;
            float dpmin;

            dpmin = min(min(dp.x, dp.y), dp.z) + 1e-4;

            bool breaker = false;
            if(sdfVoxel(p) < 0.) {
                float ddd = 0.;
                for(float backupI; backupI++ < 100.;) {
                    p = ro + rd * (d + ddd);
                    ddd += e = sdf(fract(p) - .5);
                    if(e < .001 || ++i > 100.) { 
                        n = norm(fract(p) - .5);
                        // col *= color(tex);
                        // if(id > 0.)
                            // col *= n+.5;
                        // if(s > 1.)
                        //     col *= .6;
                        dpmin = ddd;
                        breaker = true;
                        break;
                    }
                    if(ddd > dpmin) { // улетели в соседнюю клетку
                        break;
                    }
                }
            }

            d += dpmin;

            if(breaker == true)
                break;

        }
        if(d > 60.) {
            break;
        }
        light = getLight(p);
        if(length(light) > 0.) {
            break;
        } else {
            rd = reflect(rd, n);
            rd.x += (rnd(length(uv) + u_frame + .0) * 2. - 1.) * 1.8;
            rd.y += (rnd(length(uv) + u_frame + .1) * 2. - 1.) * 1.8;
            rd.z += (rnd(length(uv) + u_frame + .2) * 2. - 1.) * 1.8;
            rd = normalize(rd);
            ro = p + n * .001;
            col *= .7;
        }
    }
    col *= light;
    o += mix(texture(backbuffer, gl_FragCoord.xy / u_resolution), col.rgbb, 1. / (u_frame + 0.));
    // o += 10./i * tex;
    // if(kHit == kDeepest && i < 100.) o += 1.;
    // o.rgb = n * .5 + .5;
    o.a = 1.;

    // o = vec4(1,1,0,1);
}