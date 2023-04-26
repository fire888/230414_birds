import WebGL from 'three/examples/jsm/capabilities/WebGL';
import * as THREE from 'three'
import { createStudio } from './Entities/Studio/oldStudio'
import { loadAssets } from "./helpers/loadManager"
import { ASSETS } from "./constants/ASSETS"
import { createSystemBirds } from './Entities/systemBirds'
import { preparePathFromPoints } from './helpers/prparePathFromPoints'


const threeApp = () => {
    const studio = createStudio()
    const root = {
        studio,
    }



    loadAssets(ASSETS).then(assets => {
        console.log(assets)
        root.assets = assets

        /** points ******/
        const path = preparePathFromPoints(assets.flyPoints.model)

        /** rzev model birds places ****/
        const arrPlaces = []
        let count = 0
        studio.addToScene(assets.rzev.model)
        //assets.rzev.model.visible = false
        //assets.rzev.model.children[0].material = new THREE.MeshBasicMaterial()
        //assets.rzev.model.children[0].geometry.computeVertexNormals()
        assets.rzev.model.traverse(item => {
            if (item.name.includes('a090b')) {
                arrPlaces.push({
                    key: count,
                    q: item.quaternion.toArray(),
                    p: item.position.toArray(),
                    s: item.scale.toArray(),
                })
                ++count
            }
        })
        root.studio.addToScene(assets.rzev.model)

        /** birds ****************/
        const systemBirds = createSystemBirds(root)
        systemBirds.addAsset(assets.craneT.model)
        systemBirds.addPlaces(arrPlaces)
        systemBirds.addFirstBirdPath(path)
        systemBirds.createBirds()
        setTimeout(() => {
            systemBirds.startAnimation()
        }, 3000)

        const clock = new THREE.Clock()
        const animate = () => {
            const delta = clock.getDelta()
            systemBirds.update(delta)
            requestAnimationFrame(animate)
            studio.render()
        }
        animate()
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
