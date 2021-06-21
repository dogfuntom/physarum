precision mediump float;
uniform float u_tick;

void main() {
    if(u_tick <= .2) {
        gl_FragColor = vec4(0,0,0,1);
    } else {
        gl_FragColor = vec4(.0);
    }
}