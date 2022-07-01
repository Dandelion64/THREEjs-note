const fragmentShader00 = () => {
    return `
        #ifdef GL_ES
            precision highp float;
        #endif

        uniform sampler2D textureOne;
        uniform sampler2D textureTwo;

        varying vec2 vUv;

        uniform float circ_time;
        
        void main(void) {
            vec4 color0 = texture2D(textureOne, vec2(vUv.x, vUv.y - circ_time));
            vec4 color1 = texture2D(textureTwo, vec2(vUv.x, vUv.y + circ_time));
            gl_FragColor = mix(color0, color1, color1.a);
        }
    `
}