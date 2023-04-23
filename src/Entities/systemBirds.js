import { createBird } from "./bird";

export const createSystemBirds = (root) => {
    const birds = []
    let places = []
    let paths = []
    let firstBirdPathPoints = null
    let gltf = null

    const preparePaths = () => {
        const defaultPath = []
        for (let i = 0; i < firstBirdPathPoints.length; ++i) {
            const v = firstBirdPathPoints[i].p.clone()
            defaultPath.push({
                p: v,
                q: firstBirdPathPoints[i].q.clone(),
            })
        }


        for (let i = 0; i < places.length; ++i) {
            const path = []
            path.push ({
                q: places[i].q.clone(),
                p: places[i].p.clone().multiplyScalar(10),
            })
            for (let j = 1; j < defaultPath.length; ++j) {
                const p = defaultPath[j].p.clone()
                p.x += places[i].p.x * 10
                p.y += places[i].p.y * 10
                p.z += places[i].p.z * 10
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
            if (firstBirdPathPoints) {
                preparePaths()
            }
        },
        addFirstBirdPath: pathPoints => {
            firstBirdPathPoints = pathPoints
            if (places) {
                preparePaths()
            }
        },
        createBirds: () => {
            for (let i = 0; i < places.length; ++i) {
                const bird = createBird(gltf)
                root.studio.addToScene(bird.object)
                bird.object.quaternion.copy(places[i].q)
                bird.object.position.copy(places[i].p)
                bird.scaleSet(100)
                birds.push(bird)
            }
        },
        startAnimation: () => {
            const iterate = (i) => {
                if (!birds[i]) {
                    return;
                }

                console.log(i)
                console.log(paths[i][0].p.x)
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
