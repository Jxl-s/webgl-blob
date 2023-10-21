precision mediump float;

varying float vElevation;
varying vec3 vNormal;

uniform vec3 uLowColor;
uniform vec3 uHighColor;

void main() {
    vec3 newColor = mix(uLowColor, uHighColor, vElevation);
    gl_FragColor = vec4(newColor, 1.0);
}