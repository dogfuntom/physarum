#pragma glslify: rot = require('../math/rotate2D') 

float crystall(vec3 p, float seed) {
    float cr = -999.;
    for(float i = 0.; i < 10.; i++) {
      p.xz *= rot(i + seed);
      p.xy *= rot(i + seed);
      cr = max(cr, abs(p.x)-1.);
    }
    return cr;    
}

#pragma glslify: export(crystall)