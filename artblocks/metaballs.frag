precision mediump float;
varying vec2 uv;
uniform float t;
uniform float seed;
uniform vec2 m;

float seedInc = 0.;
    // #define R rnd(seed+seedInc++)
    #define R(x) rnd(seed+x)
    #define E .001
    #define MAXD 100.
    #define O gl_FragColor

    // типа делаем марблс
    // гладкие, с вмятинками, матовые,
    // непрозрачные, под метал, пластик, глянцевые, матовые.
    // у прозрачных внутри цветные гироиды, шарики, торы.
    // блёстки, можно кусочки фракталов.
    // окружение - белое тупо

    // пригодится кусок многошагового реймаршинга. Чтобы мы сперва натыкались на 

float rnd(vec2 co) {
    return fract(sin(mod(dot(co, vec2(12.9898, 78.233)), 3.14)) * 43758.5453);
}

float rnd(float x) {
    return rnd(vec2(x));
}

vec3 hsv(float h, float s, float v) {
    vec4 t = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(vec3(h) + t.xyz) * 6.0 - vec3(t.w));
    return v * mix(vec3(t.x), clamp(p - vec3(t.x), 0.0, 1.0), s);
}
vec2 wob(vec2 uv) {
    return sin(uv.yx * 10. + sin(uv * 7.));
}

    #define rot(a) mat2(cos(a),sin(a),-sin(a),cos(a))
    #define PHONG 0.
    #define PHONG_RAINBOW 1.
    #define PHONG_NORMAL 2.
    #define GLASS 100.
    #define MIRROR 200.

const float t1 = GLASS;
const float t2 = PHONG;

float smin(float d1, float d2, float k) {
    float h = clamp(0.5 + 0.5 * (d2 - d1) / k, 0.0, 1.0);
    return mix(d2, d1, h) - k * h * (1.0 - h);
}

float distIn(vec3 p) {
    float res = MAXD;
    for(int i = 2; i < 7; i++) {
        float rad = pow(1.5 / float(i), 1.5);
        vec3 offset = vec3(R(.001 + float(i)), R(.002 + float(i)), R(.003 + float(i))) * 2. - 1.;
        offset *= 1. - rad * .5;
        res = smin(res, length(p - offset) - rad, R(10.) + .1);
    }
    return res;
}

float gyrShape(vec3 p) {
    float scale = 1. + 1. * R(2.);
    float offset = R(1.);
    float cyl = length(p.xz) - 1.;
    float gyr = abs(dot(sin(p * scale - offset), cos(p.zxy * scale - offset))) / scale * .5 - .0001;
    return max(gyr, cyl);
}

vec2 dist(vec3 p) {
    p.xz *= rot(t - 2.);
    p.xy *= rot(.785);//R(4.));
    float bumps = 0.;//R(5.);
    float s1 = .7 * (length(p) - 2. + dot(sin(p * 50.), cos(p.zxy * 50.)) / 50. * .1 * bumps * bumps * bumps * bumps * bumps * bumps * bumps * bumps); //
    if(R(12.) < .1) {
        vec3 pt = p;
        // if(R(12.) < .1) pt.xy *= rot(3.14 / 4.);
        float rad1 = .1 + .4 * R(13.);
        float rad2 = 2.+.1+.1*R(14.)+rad1;
        float tor = length(vec2(pt.y, length(pt.xz) - rad2)) - rad1;
        s1 = min(s1, tor);
    }
    float s2 = length(p) - 1. * R(0.);
    vec2 shape2 = vec2(max(s1, distIn(p)), MIRROR);//PHONG_RAINBOW
    vec2 shape1 = vec2(max(s1, -shape2.x + 30. * E), GLASS);
    // return shape1;
    return (shape1.x < shape2.x ? shape1 : shape2);
}

vec3 norm(vec3 p) {
    vec2 e = vec2(E, 0);
    return normalize(vec3(dist(p + e.xyy).x - dist(p - e.xyy).x, dist(p + e.yxy).x - dist(p - e.yxy).x, dist(p + e.yyx).x - dist(p - e.yyx).x));
}

void main() {
    int inside = 0;
    float d, e = 1., i, j, gl;
    // vec3 p, rd = normalize(vec3(uv, 1)), ro = vec3(0, 0, -4);
    vec3 p, rd = vec3(0, 0, 1), ro = vec3(uv * 3., -4);
    vec2 rm;
    float okoeff = 0.;

        // повторим несколько раз, пока или расстояние или число шагов не выйдет за пределы дозволенного.
    for(float k = 0.; k < 6.; k++) {
        d = 0.;
        for(float i = 0.; i < 50.; i++) {
            p = rd * d + ro;
            rm = dist(p);
            e = rm.x;
            if(abs(e) < E || d > MAXD)
                break;
            j = i;
            d += abs(e);
            // if(inside == 0) O[0] += .001*abs(e),okoeff+=.001; else O[1]+=.1*abs(e),okoeff+=.1;
        }

        // каждый раз после реймаршинга что-то делаем с цветом. 
        // каждое преломление или отражение должно что-то менять.
        vec3 n = norm(p);
        float dt = dot(n, vec3(1, 1, -1)) * .5 + .5;

        // МОЛОКО
        if(e > E || d > MAXD) {
            O.rgb += vec3(rd) * .5 + .5;
            okoeff++;
            break;
        } else 

        // МАТОВЫЙ
        if(rm.y < 100.) {
            float phong = (dot(n, vec3(1, 1, -1)) * .5 + .5);
            if(rm.y == PHONG_RAINBOW) {
                O.rgb += phong * hsv(.3 * dot(n, vec3(0, 0, 1)) - R(2.), 1., 1.);
            } else if(rm.y == PHONG_NORMAL) {
                O.rgb += phong * vec3(-n) * .5 + .5;
            } else {
                O += .5 * phong;
                break;
            }
            okoeff++;
            break;
        }

        // ПРОЗРАЧНЫЙ
        else if(rm.y < 200.) {
            if(inside == 0) {
                O += pow(dot(n, normalize(vec3(1, 1, -2))), 200.);
                O += pow(dot(n, normalize(vec3(.5, 1.3, -2))), 3200.);
                O += pow(1. - dot(rd, -n), 5.);
                rd = refract(rd, n, .8);
                ro = p + 30. * E * n * -1.;
            } else {
                // rd = refract(rd, -n, .8);
                ro = p + 30. * E * n * 1.;
                O.rgb+=R(21.)*.5*d*hsv(R(20.), 1., 1.);
                okoeff+=R(21.)*.5*d;
            }

            inside = 1 - inside;
        }

        // ЗЕРКАЛЬНЫЙ
        else if(rm.y < 300.) {
            O += .3 * (dt * dt * dt * dt);
            float phong = (dot(n, vec3(1, 1, -1)) * .5 + .5);
            O.rgb += phong * hsv((dot(n, rd) + length(p.xz)) * .3 - R(2.), 1., 1.);
            okoeff++;
            okoeff += .3;
            rd = reflect(rd, n);
            ro = p + 2. * E * n * sign(dot(rd, n));
        }

            // // if(d < 30.) {
            // float r = R;
            // pp.xy += wob(p.xy) * r * .1;
            // pp.xz += wob(p.xz) * r * .1;
            // if(rm.y == 0.)
            //     gl_FragColor.rgb += hsv(pow(R, 8.) * dot(pp, vec3(1)) + R, 1., 1.);
            // else
            //     gl_FragColor.rgb += hsv(R, 1., 1.);

            // gl_FragColor *= dot(vec3(-1), n);
            // // }
    }

        // if(rnd(seed + 8.) < .1)
        //     gl_FragColor.rgb = 1. - gl_FragColor.rgb;

    O /= okoeff;

    // O-=O;
    // O+=1./d;
    O.a = 1.;
}