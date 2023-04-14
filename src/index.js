import WebGL from 'three/examples/jsm/capabilities/WebGL';
import * as THREE from 'three'
import { ExporterScene } from './helpers/exporterScene'

import { createStudio } from './Entities/Studio/oldStudio'
import { createContainerFlat } from './Entities/containerFlat'

import { loadAssets } from "./helpers/loadManager"
import { ASSETS } from "./constants/ASSETS"
import craneT from "./assets/Crane_testAnim_v01.glb";
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import {createUi} from './ui/ui'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { GLTFLoader,GLTFParser } from 'three/examples/jsm/loaders/GLTFLoader'
//const { DRACOLoader } = await import( '../../examples/jsm/loaders/DRACOLoader.js' );





// const saveScene = root => {
//     setTimeout(() => {
//         console.log(root.studio.scene)
//         const res = root.studio.scene.toJSON()
//         console.log('!!!', res)
//         ExporterScene.export(res)
//     }, 1000)
// }

const addLoadFileListener = f => {
    ExporterScene.load(data => {
        console.log('!!', data)
        const result = new FBXLoader().parse(data.target.result)
        f(result)
    })
}

const addLoadFileListenerBird = f => {
    ExporterScene.load(data => {
        console.log('!!', data)
        new GLTFLoader().parse(data.target.result, '', r => {
            f(r)
        })

    })
}


const threeApp = () => {
    const shape = new THREE.Shape();
    const x = -2.5;
    const y = -5;
    shape.moveTo(x + 2.5, y + 2.5);
    shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
    shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
    shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
    shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
    shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
    shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

    const extrudeSettings = {
    steps: 2,
    depth: 2,
    bevelEnabled: true,
    bevelThickness: 1,
    bevelSize: 1,
    bevelSegments: 2,
    };

    const g = new THREE.ExtrudeGeometry(shape, extrudeSettings)
    const mat = new THREE.MeshPhongMaterial({ color: 0xff0000 }) 









    const arrMatrices = []
    const arrBoxes = []
    let mixer


    const studio = createStudio()
    const root = {
        studio,
    }
    const ui = createUi()
    ui.setOnClick('add soldier points (fbx)', () => {
        addLoadFileListener(file => {
            console.log(file)
            root.studio.addToScene(file)


            file.traverse(item => {
                if (item.name.includes('a090b')) {
                    arrMatrices.push({
                        q: item.quaternion.clone(),
                        p: item.position.clone(),
                        s: item.scale.clone()
                    })
                   
                }
            })

            for (let i = 0; i < arrMatrices.length; ++i) {
                const b = new THREE.Mesh(
                    g, mat
                )
                root.studio.addToScene(b)
                b.quaternion.copy( arrMatrices[i].q)
                b.position.copy(arrMatrices[i].p)
                b.scale.copy(arrMatrices[i].s)//.multiplyScalar(100)
                arrBoxes.push(b)
            }

        })
    })

    ui.setOnClick('add bird (glb)', () => {
        addLoadFileListenerBird(file => {
            console.log('---', file)
            root.studio.addToScene(file.scene)

            if (arrMatrices.length === 0) {
                root.studio.addToScene(file.scene)
                file.scene.scale.multiplyScalar(100)


                mixer = new THREE.AnimationMixer( file.scene );
                const clips = file.animations;
                
                
                // Play a specific animation
                for (let i = 0; i < clips.length; ++i) {
                    const action = mixer.clipAction( clips[i]);
                    ui.setOnClick(clips[i].name + ' play', () => {
                        action.play();
                    })
                    ui.setOnClick(clips[i].name + ' stop', () => {
                        action.stop();
                    })
                    
                    
                }


            } else {
                for (let i = 0; i < arrBoxes.length; ++i) {
                    root.studio.removeFromScene(arrBoxes[i])    
                }
                for (let i = 0; i < arrMatrices.length; ++i) {
                    const bird02 = clone(file.scene)
                    root.studio.addToScene(bird02)
                    bird02.quaternion.copy( arrMatrices[i].q)
                    bird02.position.copy(arrMatrices[i].p)
                    bird02.scale.copy(arrMatrices[i].s).multiplyScalar(100)

                }
            }

        })
    })

    



         const animate = () => {
            mixer && mixer.update(0.015)
             requestAnimationFrame( animate );
             studio.render()
         }
         animate()

        //saveScene(root)


    const onWindowResize = () => {
        studio.resize()
    }
    window.addEventListener('resize', onWindowResize, false)
    onWindowResize()

    const isWebGL = () => {
        if ( WebGL.isWebGLAvailable() ) {
        } else {
            const warning = WebGL.getWebGLErrorMessage();
            document.getElementById( 'container' ).appendChild( warning );

        }
    }
    isWebGL()
}



threeApp()
