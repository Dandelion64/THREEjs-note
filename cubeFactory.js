import * as THREE from "three";
import Stats from "./jsm/libs/stats.module.js";
import { EffectComposer } from "./jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "./jsm/postprocessing/RenderPass.js";
import { SMAAPass } from "./jsm/postprocessing/SMAAPass.js";

import { gsap } from "./gsap-public/esm/all.js";

import * as Shader from "./shader.js";

// cube position
const eachSize = 24;

const posArr = [
    [eachSize * 1.04, eachSize * 1.04, eachSize * 1.04],
    [eachSize * 1.04, eachSize * 1.04, 0],
    [eachSize * 1.04, eachSize * 1.04, -eachSize * 1.04],
    [eachSize * 1.04, 0, eachSize * 1.04],
    [eachSize * 1.04, 0, 0],
    [eachSize * 1.04, 0, -eachSize * 1.04],
    [eachSize * 1.04, -eachSize * 1.04, eachSize * 1.04],
    [eachSize * 1.04, -eachSize * 1.04, 0],
    [eachSize * 1.04, -eachSize * 1.04, -eachSize * 1.04],
    [0, eachSize * 1.04, eachSize * 1.04],
    [0, eachSize * 1.04, 0],
    [0, eachSize * 1.04, -eachSize * 1.04],
    [0, 0, eachSize * 1.04],
    [0, 0, 0],
    [0, 0, -eachSize * 1.04],
    [0, -eachSize * 1.04, eachSize * 1.04],
    [0, -eachSize * 1.04, 0],
    [0, -eachSize * 1.04, -eachSize * 1.04],
    [-eachSize * 1.04, eachSize * 1.04, eachSize * 1.04],
    [-eachSize * 1.04, eachSize * 1.04, 0],
    [-eachSize * 1.04, eachSize * 1.04, -eachSize * 1.04],
    [-eachSize * 1.04, 0, eachSize * 1.04],
    [-eachSize * 1.04, 0, 0],
    [-eachSize * 1.04, 0, -eachSize * 1.04],
    [-eachSize * 1.04, -eachSize * 1.04, eachSize * 1.04],
    [-eachSize * 1.04, -eachSize * 1.04, 0],
    [-eachSize * 1.04, -eachSize * 1.04, -eachSize * 1.04]
];

const imgPostfix = ['a', 'b', 'c', 'd', 't'];
const imgIDList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 27, 28, 30, 31, 32, 34, 35, 37];

const fragmentShaderMap = {
    'f0': Shader.fragmentShader0(),
    'f1': Shader.fragmentShader1(),
    'f2': Shader.fragmentShader2(),
    'f3': Shader.fragmentShader3(),
    'f4': Shader.fragmentShader4(),
    'f5': Shader.fragmentShader5(),
    'f6': Shader.fragmentShader6(),
    'f7': Shader.fragmentShader7(),
    'f8': Shader.fragmentShader8(),
    'f9': Shader.fragmentShader9(),
    'f10': Shader.fragmentShader10(),
    'f11': Shader.fragmentShader11(),
    'f12': Shader.fragmentShader12(),
    'f13': Shader.fragmentShader13(),
    'f14': Shader.fragmentShader14(),
    'f15': Shader.fragmentShader15(),
    'f16': Shader.fragmentShader16(),
    'f17': Shader.fragmentShader17(),
    'f18': Shader.fragmentShader18(),
    'f19': Shader.fragmentShader19(),
    'f20': Shader.fragmentShader20(),
    'f21': Shader.fragmentShader21(),
    'f22': Shader.fragmentShader22(),
    'f23': Shader.fragmentShader23(),
    'f24': Shader.fragmentShader24(),
    'f25': Shader.fragmentShader25(),
    'f27': Shader.fragmentShader27(),
    'f28': Shader.fragmentShader28(),
    'f30': Shader.fragmentShader30(),
    'f31': Shader.fragmentShader31(),
    'f32': Shader.fragmentShader32(),
    'f34': Shader.fragmentShader34(),
    'f35': Shader.fragmentShader35(),
    'f37': Shader.fragmentShader37()
}

export class cubeFactory
{
    constructor(aspect, canvasSize, cubeSize, layerSliceDirection)
    {
        this.cubeSize = cubeSize;
        this.cubeAnimation = false;
        this.layerSliceDirection = layerSliceDirection;

        // init 
        this.initRenderer();
        this.initStats();
        this.initCamera(canvasSize, aspect);
        this.initCube(cubeSize);
        this.initScene();
        this.initComposer();

        // init output params
        this.group1 = new THREE.Group();
        this.group2 = new THREE.Group();
        this.group3 = new THREE.Group();
        this.uniformsList = Array();

        // create cube
        posArr.forEach((d, i) =>
        {
            let cube = this.createCube(imgIDList[i++]);
            cube.mesh.position.set(d[0], d[1], d[2]);
            cube.mesh.name = 'cube-' + i;

            this.uniformsList[i] = cube.uniforms;

            if (layerSliceDirection == 'vertical')
            {
                // vertical
                if ([1, 2, 3, 4, 5, 6, 7, 8, 9].includes(i))
                {
                    this.group1.add(cube.mesh);
                }
                if ([10, 11, 12, 13, 14, 15, 16, 17, 18].includes(i))
                {
                    this.group2.add(cube.mesh);
                }

                if ([19, 20, 21, 22, 23, 24, 25, 26, 27].includes(i))
                {
                    this.group3.add(cube.mesh);
                }
            } else
            {
                // horizontal
                if ([1, 2, 3, 10, 11, 12, 19, 20, 21].includes(i))
                {
                    this.group1.add(cube.mesh);
                }
                if ([4, 5, 6, 13, 14, 15, 22, 23, 24].includes(i))
                {
                    this.group2.add(cube.mesh);
                }
                if ([7, 8, 9, 16, 17, 18, 25, 26, 27].includes(i))
                {
                    this.group3.add(cube.mesh);
                }
            }
        })

        // add cube to scene
        this.scene.add(this.group1);
        this.scene.add(this.group2);
        this.scene.add(this.group3);
    }

    initRenderer()
    {
        this.renderer = new THREE.WebGLRenderer({alpha: true});
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(0xEEEEEE);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    initStats()
    {
        this.stats = new Stats();
    }

    initCamera(size, aspect)
    {
        // OrthographicCamera
        // this.camera = new THREE.OrthographicCamera(
        //     (size * aspect) / -2,
        //     (size * aspect) / 2,
        //     size / 2,
        //     size / -2,
        //     -10000,
        //     10000
        // );

        // PerspectiveCamera
        this.camera = new THREE.PerspectiveCamera(
            70,
            window.innerWidth / window.innerHeight,
            1,
            2000
        );

        // OrthographicCamera
        // this.camera.position.set(0, 0, 0);
        // this.camera.rotation.set(Math.PI / 16, Math.PI / 16, -Math.PI / 16);
        
        // PerspectiveCamera
        this.camera.position.set(0, 100, 150);
        this.camera.lookAt(0, 0, 0);
    }

    initScene()
    {
        let dirLightTop = new THREE.DirectionalLight(0xf1f4f5, 1);
        let dirLightBottom = new THREE.DirectionalLight(0xf1f4f5, 1);
        dirLightTop.position.set(0, 400, 0);
        dirLightBottom.position.set(0, -400, 0);

        this.scene = new THREE.Scene();
        this.scene.add(dirLightTop);
        this.scene.add(dirLightBottom);
    }

    initComposer()
    {
        this.composer = new EffectComposer(this.renderer);
        this.composer.addPass(new RenderPass(this.scene, this.camera));
        this.composer.addPass(new SMAAPass(
            window.innerWidth * this.renderer.getPixelRatio(), 
            window.innerHeight * this.renderer.getPixelRatio()
        ));
    }

    initCube(cubeSize)
    {
        this.texture = this.loadTexture();
        // BoxBufferGeometry() 較節省資源 CP值高 但比較粗糙
        this.geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    }

    createCube(imgID)
    {
        let uniforms = this.loadUniforms(imgID);
        let vertexShader = this.loadVertexShader();
        let fragmentShader = this.loadFragmentShader(imgID);
        let materialPractice = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            transparent: !0,
        })

        // index: right, left, top, bottom, front, back
        // let material = [materialPractice, materialPractice, materialT, materialT, materialPractice, materialPractice];
        let material = [materialPractice, materialPractice, materialPractice, materialPractice, materialPractice, materialPractice];

        let mesh = new THREE.Mesh(this.geometry, material);

        let data = {
            'uniforms': uniforms,
            'mesh': mesh,
        }

        return data;
    }

    loadTexture()
    {
        let texture = [];

        imgIDList.forEach(imgID =>
        {
            texture[imgID] = [];
            imgPostfix.forEach(type =>
            {
                texture[imgID][type] = new THREE.TextureLoader().load(`./box/${imgID}_${type}.png`, (onLoad) =>
                {
                    texture[imgID][type].anisotropy = 4;
                    texture[imgID][type].minFilter = THREE.LinearFilter;
                    texture[imgID][type].magFilter = THREE.LinearFilter;
                    texture[imgID][type].wrapS = THREE.RepeatWrapping;
                    texture[imgID][type].wrapT = THREE.RepeatWrapping;

                });
            });
        });

        return texture;
    }

    loadFragmentShader(imgID)
    {
        return fragmentShaderMap[`f${imgID}`];
    }

    loadVertexShader()
    {
        return Shader.vertexShader();
    }

    loadUniforms(imgID)
    {
        return {
            none_time: {
                value: 1.0
            },
            power2_time: {
                value: 1.0
            },
            power3_time: {
                value: 1.0
            },
            power4_time: {
                value: 1.0
            },
            elastic_time: {
                value: 1.0
            },
            elastic_drastic_time: {
                value: 1.0
            },
            circ_in_time: {
                value: 1.0
            },
            circ_time: {
                value: 1.0
            },
            expo_time: {
                value: 1.0
            },
            animate: {
                value: 1.0
            },
            textureOne: {
                type: "t",
                value: this.texture[imgID]['a'],
            },
            textureTwo: {
                type: "t",
                value: this.texture[imgID]['b'],
            },
            textureThree: {
                type: "t",
                value: this.texture[imgID]['c'],
            },
            textureFour: {
                type: "t",
                value: this.texture[imgID]['d'],
            },
        };
    }

    onWindowResize()
    {
        // console.log('resizing');
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.composer.setSize(window.innerWidth, window.innerHeight);
    }

    animate(offset=Array(0,0,0,0,0,0,0,0,0))
    {
        requestAnimationFrame(() => this.animate());

        this.stats.begin();

        if (!this.offset)
        {
            this.offset = offset;
        }

        // this.group2.rotation.x += 0.05;
        this.group1.rotation.x += this.offset[0];
        this.group1.rotation.y -= this.offset[1];
        this.group1.rotation.z += this.offset[2];
        this.group2.rotation.x += this.offset[3];
        this.group2.rotation.y += this.offset[4];
        this.group2.rotation.z += this.offset[5];
        this.group3.rotation.x += this.offset[6];
        this.group3.rotation.y -= this.offset[7];
        this.group3.rotation.z += this.offset[8];

        if (!this.cubeAnimation)
        {
            this.cubeAnimation = !this.cubeAnimation;

            // animation style
            // 到時候要跟據所有材質的 animation type
            // 來調整需要更動哪些時間
            this.uniformsList.forEach((uf) =>
            {
                // 單純 Repeat 可以這樣操作
                // gsap.to(uf.none_time, { duration: 0.5, value: 0.0, repeat: -1, repeatDelay: 1, ease: "none" });
                // gsap.to(uf.power2_time, { duration: 0.5, value: 0.0, repeat: -1, repeatDelay: 1, ease: "power2.out" });
                // gsap.to(uf.power3_time, { duration: 0.5, value: 0.0, repeat: -1, repeatDelay: 1, ease: "power3.out" });
                // gsap.to(uf.power4_time, { duration: 0.5, value: 0.0, repeat: -1, repeatDelay: 1, ease: "power4.out" });
                // gsap.to(uf.elastic_time, { duration: 0.5, value: 0.0, repeat: -1, repeatDelay: 1, ease: "elastic.out(1, 0.3)" });
                // gsap.to(uf.elastic_drastic_time, { duration: 0.5, value: 0.0, repeat: -1, repeatDelay: 1, ease: "elastic.out(1.5, 0.3)" });
                // gsap.to(uf.circ_in_time, { duration: 0.5, value: 0.0, repeat: -1, repeatDelay: 1, ease: "circ.in" });
                // gsap.to(uf.circ_time, { duration: 0.5, value: 0.0, repeat: -1, repeatDelay: 1, ease: "circ.out" });
                // gsap.to(uf.expo_time, { duration: 0.5, value: 0.0, repeat: -1, repeatDelay: 1, ease: "expo.out" });

                // 有循環動畫的話還是先這樣做
                gsap.to(uf.none_time, { duration: 0.5, value: 0.0, ease: "none" });
                gsap.to(uf.power2_time, { duration: 0.5, value: 0.0, ease: "power2.out" });
                gsap.to(uf.power3_time, { duration: 0.5, value: 0.0, ease: "power3.out" });
                gsap.to(uf.power4_time, { duration: 0.5, value: 0.0, ease: "power4.out" });
                gsap.to(uf.elastic_time, { duration: 0.5, value: 0.0, ease: "elastic.out(1, 0.3)" });
                gsap.to(uf.elastic_drastic_time, { duration: 0.5, value: 0.0, ease: "elastic.out(1.5, 0.3)" });
                gsap.to(uf.circ_in_time, { duration: 0.5, value: 0.0, ease: "circ.in" });
                gsap.to(uf.circ_time, { duration: 0.5, value: 0.0, ease: "circ.out" });
                gsap.to(uf.expo_time, { duration: 0.5, value: 0.0, ease: "expo.out" });

                if (uf.none_time.value === 0.0) {
                    uf.none_time.value = 1.0;
                    uf.power2_time.value = 1.0;
                    uf.power3_time.value = 1.0;
                    uf.power4_time.value = 1.0;
                    uf.elastic_time.value = 1.0;
                    uf.elastic_drastic_time.value = 1.0;
                    uf.circ_in_time.value = 1.0;
                    uf.circ_time.value = 1.0;
                    uf.expo_time.value = 1.0;

                    // 判斷式用三個 === 的話 1.0 取的時候會被讀成 1
                    // auto-casting 的問題
                    if (uf.animate.value === 1.0) { 
                        uf.animate.value = 2.0;
                        // console.log('change to two');
                    } else {
                        uf.animate.value = 1.0;
                        // console.log('change to one');
                    }
                }
            })
            setTimeout(() => {
                this.cubeAnimation = !this.cubeAnimation;
            }, 1000);
        }

        this.composer.render(this.scene, this.camera);
        this.stats.end();
    }
}