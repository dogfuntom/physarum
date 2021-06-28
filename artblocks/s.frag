precision mediump float;
varying vec2 uv;
uniform float t;
uniform float seed;
uniform vec2 m;

float seedInc = 0.;
    #define R rnd(seed+seedInc++)
    #define E .001
    #define MAXD 40.
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
    #define GLASS 100.
    #define MIRROR 200.

const float t1 = GLASS;
const float t2 = MIRROR;

vec2 dist(vec3 p) {
    p.xz *= rot(t * .3 - 2.);
    p.xy *= rot(t * .3);
    float s1 = length(p) - 2.; //
    float s2 = length(p.xy) - 1.;
    float s2_o = length(p.xy) - 1.01;
    vec2 shape1 = vec2(max(s1, -s2_o), t1);
    vec2 shape2 = vec2(max(s2, s1), t2);
    return (shape1.x < shape2.x ? shape1 : shape2);
}

    // vec2 distn(vec3 p) {
    //     p.xz *= rot(t * .3);
    //     p.xy *= rot(t * .3);

    //     // p = mod(p, 16.) - 8.;
    //     // p = abs(p) - 2.;

    //     // vec3 n = vec3(-.5, -.809, .309);
    //     float s1 = length(p) - 2.;
    //     float s2 = length(p.xy) - 1.;
    //     // vec2 shape1 = vec2(max(s1,-s2), t1);
    //     vec2 shape1 = vec2(s1, t1);
    //     vec2 shape2 = vec2(max(s1,s2), t2);
    //     // s.x = abs(s.x);
    //     // for(int k = 0; k < 5; k++)
    //         // p.xy = abs(p.xy), p -= 2. * min(0., dot(p, n)) * n;
    //         // d += e = .69 * (length(vec2(length(pp) - 2., length(p - vec3(.3, .2, 1.9)) - .3)) - .1);
    //     return (shape1.x < shape2.x ? shape1 : shape2);
    // }

vec3 norm(vec3 p) {
    vec2 e = vec2(E, 0);
    return normalize(vec3(dist(p + e.xyy).x - dist(p - e.xyy).x, dist(p + e.yxy).x - dist(p - e.yxy).x, dist(p + e.yyx).x - dist(p - e.yyx).x));
}

void main() {
    int inside = 0;
    float d, e = 1., i, j, gl;
    vec3 p, rd = normalize(vec3(uv, 1)), ro = vec3(0, 0, -4);
    vec2 rm;
    float okoeff = 0.;

        // повторим несколько раз, пока или расстояние или число шагов не выйдет за пределы дозволенного.
    for(float k = 0.; k < 7.; k++) {
            // raymarching
        d = 0.;
        for(float i = 0.; i < 150.; i++) {
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
            O += dot(n, vec3(1, 1, -1)) * .5 + .5;
            okoeff++;
            break;
        }

        // ПРОЗРАЧНЫЙ
        else if(rm.y < 200.) {
            if(inside == 0) {
                O += pow(dot(n, normalize(vec3(1, 1, -2))), 200.);
                O += pow(dot(n, normalize(vec3(.5, 1.3, -2))), 3200.);
                O += pow(1.-dot(rd,-n),5.);
                // okoeff++;
                // O.rgb += vec3(.1, .8, .1);
                // okoeff++;
                // float sg = -sign(dot(rd, n));
                rd = refract(rd, n, .8);
                ro = p + 2. * E * n * -1.;
            } else {
                rd = refract(rd, -n, .8);
                // float sg = sign(dot(rd, n));
                ro = p + 2. * E * n * 1.;
            }

            inside = 1 - inside;
        }

        // ЗЕРКАЛЬНЫЙ
        else if(rm.y < 300.) {
            O += .3 * (dt * dt * dt * dt);
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

    O.a = 1.;
}