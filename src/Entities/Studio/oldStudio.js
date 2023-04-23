import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const PADDING = 0
const BACK_COLOR = 0xc8cfd4
const CAM_POS = [0, 20, -30]
const CAM_TARGET_POS = [0, 0, 0]



export const createStudio = (cubeMap) => {
    const container = document.querySelector('.scene-container');


    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera( 45, (window.innerWidth - 30) / (window.innerHeight - 30), 0.01, 100000)
    camera.position.set(...CAM_POS)
    scene.add(camera)


    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(BACK_COLOR, 1)
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    container.appendChild(renderer.domElement)


    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(0, 100, -100)
    scene.add(light)

    const ambLight = new THREE.AmbientLight(0x333333, .7)
    scene.add(ambLight)


    const controls = new OrbitControls(camera, renderer.domElement)
    controls.minDistance = 0
    controls.maxDistance = 200
    controls.target.set(...CAM_TARGET_POS)
    controls.update()


    const meshContainer = new THREE.Object3D()
    meshContainer.scale.set(.1, .1, .1)
    scene.add(meshContainer)


    return {
        scene,
        addToScene(model) {
            meshContainer.add(model)
        },
        removeFromScene(model) {
            scene.remove(model)
        },
        render () {
            if (!camera) {
                return
            }

            renderer.render(scene, camera)



        },
        resize () {
            if (!camera) {
                return;
            }
            camera.aspect = (window.innerWidth - PADDING) / (window.innerHeight - PADDING)
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth - PADDING, window.innerHeight - PADDING)
        },
    }
}
