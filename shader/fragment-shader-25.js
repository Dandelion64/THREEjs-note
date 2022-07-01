const fragmentShader25 = () => {
    return `
        #ifdef GL_ES
            precision highp float;
        #endif

        uniform sampler2D textureOne;
        uniform sampler2D textureTwo;

        varying vec2 vUv;

        uniform float power3_time;
        
        void main(void) {
            vec4 color0 = texture2D(textureOne, vec2(vUv.x, vUv.y - power3_time));
            vec4 color1 = texture2D(textureTwo, vec2(vUv.x, vUv.y + power3_time));
            gl_FragColor = mix(color0, color1, color1.a);
        }
    `
}