import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
// import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
// import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
// import {HemisphereLight} from "./third_party/three.module";
// import {scene} from "./modules/renderer";

import { createSky } from './SkyNunu'

const PADDING = 0

//const BACK_COLOR = 0xf8cfc1
const BACK_COLOR = 0xc8cfd4
//const LIGHT_COLOR = 0xf7e2d7
const LIGHT_COLOR = 0xffffff

const CAM_POS = [0, 50, 50]
const CAM_TARGET_POS = [0, 0, 0]



export const createStudio = (cubeMap) => {
    const container = document.querySelector('.scene-container');
    // container.style.width = window.innerWidth + 'px'
    // container.style.height = window.innerHeight + 'px';

    const scene = new THREE.Scene()
    //scene.fog = new THREE.Fog( BACK_COLOR, 50, 150 )
    const camera = new THREE.PerspectiveCamera( 45, (window.innerWidth - 30) / (window.innerHeight - 30), 0.01, 100000)
    camera.position.set(...CAM_POS)
    scene.add(camera)


    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    //renderer.outputEncoding = THREE.BasicDepthPacking
    //renderer.outputEncoding = THREE.RGBADepthPacking
    renderer.setClearColor(BACK_COLOR, 1)
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

    container.appendChild(renderer.domElement)


    const light = new THREE.PointLight(0xffffff, 1)
    light.position.set(0, 0, 0)
    camera.add(light)

    const ambLight = new THREE.AmbientLight(0x333333, .7)
    scene.add(ambLight)


    // const light = new THREE.PointLight(LIGHT_COLOR, .2)
    // light.position.set(0, 15, 0)
    // scene.add(light)
    // const hemiLight = new THREE.HemisphereLight(0xe7e9ed, 0xc4b1a3, .75)
    // hemiLight.position.set(0, 15, 0)
    // scene.add(hemiLight)

    //const sky = createSky()
   // scene.add(sky.sky)


    const controls = new OrbitControls(camera, renderer.domElement)
    controls.minDistance = 0
    controls.maxDistance = 200
    controls.target.set(...CAM_TARGET_POS)
    controls.update()



    const functionsOmCameraMove = []
    const spherical = new THREE.Spherical(controls.getDistance(), controls.getPolarAngle(), controls.getAzimuthalAngle())
    const v3Look = new THREE.Vector3()


    const meshContainer = new THREE.Object3D()
    meshContainer.scale.set(.1, .1, .1)
    scene.add(meshContainer)


    return {
        scene,
        addToScene(model) {
            meshContainer.add(model)
        },
        removeFromScene(model) {
            meshContainer.remove(model)
        },
        render () {
            if (!camera) {
                return
            }

            if (camera.position.y < 0.001) {
                camera.position.y = 0.001
                controls.update()
            }

            if (spherical.radius !== controls.getDistance()) {
                spherical.radius = controls.getDistance()
                //scene.fog.near = spherical.radius + FOG_NEAR
                //scene.fog.far = spherical.radius + FOG_FAR
            }

            if (
                spherical.phi !== controls.getPolarAngle() ||
                spherical.theta !== controls.getAzimuthalAngle()
            ) {
                spherical.phi = controls.getPolarAngle()
                spherical.theta = controls.getAzimuthalAngle()
                for (let i = 0; i < functionsOmCameraMove.length; ++i) {
                    v3Look.setFromSpherical(spherical)
                    functionsOmCameraMove[i](v3Look)
                }
            }

            renderer.render(scene, camera)



        },
        setTargetCam: v => {
            controls.target.set( v.x, v.y, v.z )
            controls.update()
        },
        resize () {
            if (!camera) {
                return;
            }
            camera.aspect = (window.innerWidth - PADDING) / (window.innerHeight - PADDING)
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth - PADDING, window.innerHeight - PADDING)
        },
        onCameraMove: func => {
            functionsOmCameraMove.push(func)
        },
    }
}
