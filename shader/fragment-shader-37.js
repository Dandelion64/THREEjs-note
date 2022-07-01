const fragmentShader37 = () => {
    return `
        #ifdef GL_ES
            precision highp float;
        #endif

        uniform sampler2D textureOne;
        uniform sampler2D textureTwo;
        uniform sampler2D textureThree;

        varying vec2 vUv;

        uniform float circ_time;
        uniform float elastic_time;
        uniform float elastic_drastic_time;

        uniform float animate;
        
        void main(void) {
            if (animate == 1.0) {
                vec4 color0 = texture2D(textureOne, vec2(vUv.x, vUv.y - elastic_drastic_time));
                vec4 color1 = texture2D(textureTwo, vec2(vUv.x, vUv.y - elastic_time));
                vec4 color2 = texture2D(textureThree, vec2(vUv.x, vUv.y - elastic_drastic_time));
                gl_FragColor = mix(mix(color0, color1, color1.a),color2, color2.a);
            }
            
            if (animate == 2.0) {
                vec4 color0 = texture2D(textureOne, vec2(vUv.x - circ_time, vUv.y));
                vec4 color1 = texture2D(textureTwo, vec2(vUv.x - circ_time, vUv.y));
                vec4 color2 = texture2D(textureThree, vec2(vUv.x - circ_time, vUv.y));
                gl_FragColor = mix(mix(color0, color1, color1.a),color2, color2.a);
            }
        }
    `
}