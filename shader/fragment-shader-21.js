const fragmentShader21 = () => {
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
        uniform float circ_in_time;
        
        void main(void) {
            vec4 color0 = texture2D(textureOne, vec2(vUv.x - circ_time, vUv.y + circ_time));
            vec4 color1 = texture2D(textureTwo, vec2(vUv.x - circ_time, vUv.y - circ_time));
            vec4 color2 = texture2D(textureThree, vUv);
            
            vec4 color3 = texture2D(textureFour, vec2((vUv.x / (1.0 - circ_time) - circ_time/(1.0 - circ_time)/2.0) * circ_in_time + (1.0 - circ_in_time)/2.0, (vUv.y / (1.0 - circ_time) - circ_time/(1.0 - circ_time)/2.0)) * circ_in_time + (1.0 - circ_in_time)/2.0);
            
            // vec4 color3 = texture2D(textureFour, vec2((vUv.x / (1.0 - circ_time) - circ_time/(1.0 - circ_time)/2.0) * circ_in_time + (1.0 - circ_in_time)/2.0, (vUv.y / (1.0 - circ_time) - circ_time/(1.0 - circ_time)/2.0)) * circ_in_time + (1.0 - circ_in_time)/2.0);

            gl_FragColor = mix(mix(mix(color0, color1, color1.a), color2, color2.a), color3, color3.a);
        }
    `
}