precision mediump float;
uniform float u_tick;

void main() {
    if(u_tick == .0) {
        gl_FragColor = vec4(1);
    } else {
        gl_FragColor = vec4(.01);
    }
}