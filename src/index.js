import WebGL from 'three/examples/jsm/capabilities/WebGL';
import * as THREE from 'three'
import { ExporterScene } from './helpers/exporterScene'

import { createStudio } from './Entities/Studio/oldStudio'
import { createContainerFlat } from './Entities/containerFlat'

import { loadAssets } from "./helpers/loadManager"
import { ASSETS } from "./constants/ASSETS"
import craneT from "./assets/Crane_testAnim_v01.glb";
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';


const saveScene = root => {
    setTimeout(() => {
        console.log(root.studio.scene)
        const res = root.studio.scene.toJSON()
        console.log('!!!', res)
        ExporterScene.export(res)
    }, 1000)
}

const addLoadFileListener = root => {
    let aa = true
    document.body.addEventListener('click', () => {
        if (!aa) {
            return;
        }
        aa = false
        ExporterScene.load(data => {
            console.log('!!', data)
            const loader = new THREE.ObjectLoader();
            const object = loader.parse(data);
            root.studio.addToScene(object)

        })
    })
}


const threeApp = () => {
    const studio = createStudio()



    const root = {
        studio,
    }



     loadAssets(ASSETS).then(assets => {
         console.log(assets)
         const arrMatrices = []
         let count = 0
         studio.addToScene(assets.rzev.model)

         assets.rzev.model.visible = false
         assets.rzev.model.children[0].material = new THREE.MeshBasicMaterial()
         assets.rzev.model.children[0].geometry.computeVertexNormals()
         console.log('bird', assets.rzev.model.children[0])

         assets.rzev.model.traverse(item => {
             if (item.name.includes('a090b')) {
                 arrMatrices.push({
                     key: count,
                     q: item.quaternion.clone(),
                     p: item.position.clone(),
                     s: item.scale.clone()
                     //elements: item.matrixWorld.elements
                 })
                 ++count
             }
         })



        //  const shape = new THREE.Shape();
        //  const x = -2.5;
        //  const y = -5;
        //  shape.moveTo(x + 2.5, y + 2.5);
        //  shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
        //  shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
        //  shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
        //  shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
        //  shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
        //  shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);
        //
        //  const extrudeSettings = {
        //      steps: 2,
        //      depth: 2,
        //      bevelEnabled: true,
        //      bevelThickness: 1,
        //      bevelSize: 1,
        //      bevelSegments: 2,
        //  };
        //
        // const g = new THREE.ExtrudeGeometry(shape, extrudeSettings)



        console.log(JSON.stringify(arrMatrices))
        root.assets = assets
        //createContainerFlat(root)

         root.studio.addToScene(assets.rzev.model)
         assets.craneT.model.scene.scale.set(15, 15, 15)
         assets.craneT.model.scene.position.y = 15
         studio.addToScene(assets.craneT.model.scene)


         const bird = assets.craneT.model
         console.log(bird)
         const materialBird = new THREE.MeshPhongMaterial({ color: 0xFF0000, wireframe: true })
         bird.scene.traverse(item => {
             if (item.type === 'SkinnedMesh') {
                 item.material = materialBird
             }
         })

         for (let i = 0; i < arrMatrices.length; ++i) {
             //const b = new THREE.Mesh(
             //    g,
             //    new THREE.MeshPhongMaterial({ color: 0xff0000 })
             //)
             const bird02 = clone(bird.scene)
             root.studio.addToScene(bird02)
             bird02.quaternion.copy( arrMatrices[i].q)
             bird02.position.copy(arrMatrices[i].p)
             bird02.scale.copy(arrMatrices[i].s).multiplyScalar(100)
             //bird02.matrixWorld.elements = arrMatrices[i].elements
             //bird02.matrixWorldNeedsUpdate = true
             setTimeout(() => {
                 console.log('b02',bird02)
                 //bird02.scale.set(5, 5, 5)
             }, 100)
         }


         //const bird02 = clone(mesh.scene)
         //bird02.position.set(15, 15, 0)

         //studio.addToScene(bird02)
         // const mixer = new THREE.AnimationMixer(mesh);
         // const clips = mesh.animations;
         // const clip = clips[0]
         // const action = mixer.clipAction(clip);
         // action.play();

         const animate = () => {
             //mixer.update(15)
             requestAnimationFrame( animate );
             studio.render()
         }
         animate()

         addLoadFileListener(root)
        //saveScene(root)
    })

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
