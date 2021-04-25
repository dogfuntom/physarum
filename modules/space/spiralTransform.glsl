vec2 spiralTransform(vec2 uv, float chankLength, float offset) {
    float step_ = 1.;
    float pi = 3.14159265;
    float lenInTurn = (length(uv) / step_ - atan(uv.y, uv.x)) / (2. * pi);
    float turns = floor(lenInTurn);
    float lastTurnAngle = atan(uv.y, uv.x) + pi;
    float teta = turns * 2. * pi + lastTurnAngle;
    float spirLength = step_ * teta * teta / (8. * pi * pi);
    vec2 spir = vec2(fract(lenInTurn), fract(spirLength / chankLength - offset));
    return spir;
}

#pragma glslify: export(spiralTransform)