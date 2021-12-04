attribute vec3 aPosition;
varying vec2 uv;
void main() {
  vec4 positionVec4 = vec4(aPosition, 1.0);
  uv = positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
  gl_Position = positionVec4;
}