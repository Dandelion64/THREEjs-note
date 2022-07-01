const fragmentShader35 = () => {
    return `
        #ifdef GL_ES
            precision highp float;
        #endif

        uniform sampler2D textureOne;
        uniform sampler2D textureTwo;
        uniform sampler2D textureThree;
        uniform sampler2D textureFour;

        varying vec2 vUv;

        uniform float circ_time;
        
        void main(void) {
            vec4 color0 = texture2D(textureOne, vec2(vUv.x, vUv.y - circ_time));
            vec4 color1 = texture2D(textureTwo, vec2(vUv.x + circ_time, vUv.y - circ_time));
            vec4 color2 = texture2D(textureThree, vec2(vUv.x + circ_time, vUv.y + circ_time));
            
            vec4 color3 = texture2D(textureFour, vec2(vUv.x + circ_time, vUv.y + circ_time));

            gl_FragColor = mix(mix(mix(color0, color1, color1.a), color2, color2.a), color3, color3.a);
        }
    `
}