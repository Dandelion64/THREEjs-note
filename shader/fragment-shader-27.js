const fragmentShader27 = () => {
    return `
        #ifdef GL_ES
            precision highp float;
        #endif

        uniform sampler2D textureOne;
        uniform sampler2D textureTwo;

        varying vec2 vUv;

        uniform float circ_time;
        
        void main(void) {
            vec4 color0 = texture2D(textureOne, vec2(vUv.x + circ_time, vUv.y + circ_time));
            gl_FragColor = color0;
        }
    `
}