const fragmentShader09 = () => {
    return `
        #ifdef GL_ES
            precision highp float;
        #endif

        uniform sampler2D textureOne;
        uniform sampler2D textureTwo;
        uniform sampler2D textureThree;

        varying vec2 vUv;

        uniform float circ_time;
        
        uniform float animate;

        void main(void) {
            if (animate == 1.0) {
                vec4 color0 = texture2D(textureOne, vUv);
                vec4 color1 = texture2D(textureTwo, vec2(vUv.x - circ_time, vUv.y + (1.0 - circ_time) * 0.25));
                vec4 color2 = texture2D(textureThree, vec2(vUv.x - circ_time, vUv.y));
                gl_FragColor = mix(mix(color0, color1, color1.a),color2, color2.a);
            }
            
            if (animate == 2.0) {
                vec4 color0 = texture2D(textureOne, vUv);
                vec4 color1 = texture2D(textureTwo, vec2(vUv.x - circ_time, vUv.y + circ_time * 0.25));
                vec4 color2 = texture2D(textureThree, vec2(vUv.x - circ_time, vUv.y));
                gl_FragColor = mix(mix(color0, color1, color1.a), color2, color2.a);
            }
        }
    `
}