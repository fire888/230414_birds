import * as THREE from 'three'
import { clone } from "three/examples/jsm/utils/SkeletonUtils";

export const createBird = asset => {
    const gltf = asset
    const mesh = clone(gltf.scene)
    const object = new THREE.Object3D()
    object.add(mesh)
    const mixer = new THREE.AnimationMixer(mesh)
    const clip1 = gltf.animations[0]
    const action1 = mixer.clipAction(clip1)

    let pathPoints = null
    let isUpdate = false
    let dist = 0.001

    return {
        object,
        scaleSet: s => {
            mesh.scale.set(s, s, s)
        },
        update: (delta) => {
            if (!isUpdate) {
                return
            }

            dist += 0.01
            const phase = dist % 1
            const prevPoint = pathPoints[Math.floor(dist)]
            const newPoint = pathPoints[Math.ceil(dist)]
            if (newPoint) {
                object.position.lerpVectors(prevPoint.p, newPoint.p, phase)
                object.position.multiplyScalar(.1)
                object.quaternion.slerpQuaternions(prevPoint.q, newPoint.q, phase)
            }


            mixer.update(delta)
        },
        startAnimation: (pP) => {
            pathPoints = pP
            action1.play()
            isUpdate = true
        },
    }
}
