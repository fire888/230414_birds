import { createBird } from "./bird";
import * as THREE from 'three'

export const createSystemBirds = (root) => {
    const birds = []
    let places = []
    let paths = []
    let zeroPathPoints = null
    let gltf = null

    const preparePaths = () => {
        const defaultPath = []
        for (let i = 0; i < zeroPathPoints.length; ++i) {
            defaultPath.push({
                p: new THREE.Vector3(...zeroPathPoints[i].p),
                q: new THREE.Quaternion(...zeroPathPoints[i].q),
            })
        }
        //
        // for (let i = 0; i < places.length; ++i) {
        //     places[i].p[0] *= 10
        //     places[i].p[1] *= 10
        //     places[i].p[2] *= 10
        // }


        for (let i = 0; i < places.length; ++i) {
            const path = []
            path.push ({
                q: new THREE.Quaternion().fromArray(places[i].q),
                p: new THREE.Vector3(
                    places[i].p[0] * 10,
                    places[i].p[1] * 10,
                    places[i].p[2] * 10,
                ),
            })
            for (let j = 1; j < defaultPath.length; ++j) {
                const p = defaultPath[j].p.clone()
                p.x += places[i].p[0] * 10
                p.y += places[i].p[1] * 10
                p.z += places[i].p[2] * 10
                path.push({
                    p,
                    q: defaultPath[j].q.clone(),
                })
            }
            paths.push(path)
        }
    }

    return {
        addAsset: asset => {
            gltf = asset
        },
        addPlaces: arr => {
            places = arr
            if (zeroPathPoints) {
                preparePaths()
            }
        },
        addFirstBirdPath: pathPoints => {
            zeroPathPoints = pathPoints
            if (places) {
                preparePaths()
            }
        },
        createBirds: () => {
            for (let i = 0; i < places.length; ++i) {
                const bird = createBird(gltf)
                root.studio.addToScene(bird.object)
                bird.object.quaternion.fromArray(places[i].q)
                bird.object.position.fromArray(places[i].p)
                bird.scaleSet(100)
                birds.push(bird)
            }
        },
        startAnimation: () => {
            const iterate = (i) => {
                if (!birds[i]) {
                    return;
                }

                birds[i].startAnimation(paths[i])
                setTimeout(() => iterate(i + 1), 1000)
            }
            iterate(0)

        },
        update: (delta) => {
            for (let i = 0; i < birds.length; ++i) {
                birds[i].update(delta)
            }
        }
    }
}
