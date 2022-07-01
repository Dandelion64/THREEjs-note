const fragmentShader14 = () => {
    return `
        #ifdef GL_ES
            precision highp float;
        #endif

        uniform sampler2D textureOne;
        uniform sampler2D textureTwo;
        uniform sampler2D textureThree;

        varying vec2 vUv;

        uniform float power3_time;
        uniform float power4_time;
        uniform float elastic_time;
        
        void main(void) {
            vec4 color0 = texture2D(textureOne, vec2(vUv.x + power3_time, vUv.y - power3_time));
            vec4 color1 = texture2D(textureTwo, vec2(vUv.x + power4_time, vUv.y - power4_time));
            vec4 color2 = texture2D(textureThree, vec2(vUv.x - elastic_time, vUv.y + elastic_time));
            gl_FragColor = mix(mix(color0, color1, color1.a), color2, color2.a);
        }
    `
}