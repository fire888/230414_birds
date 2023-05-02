import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import birdSrc from './assets/testa4.glb'
import { clone } from "three/examples/jsm/utils/SkeletonUtils";

export const BIRDS_PLACES = [
    {
        "key": 0,
        "q": [
            -0.5958007667980337,
            -0.4428429851416758,
            0.2505741500322053,
            0.6213888735158704
        ],
        "p": [
            5.112341204493598,
            86.68592524737122,
            -16.84734839131591
        ],
        "s": [
            1,
            1,
            1
        ]
    },
    {
        "key": 1,
        "q": [
            -0.6069143358352752,
            -0.436499008104417,
            0.23983454732595622,
            0.61935692035404
        ],
        "p": [
            7.840205192565918,
            59.386104583740234,
            -21.13926887512207
        ],
        "s": [
            0.9999999999999999,
            1,
            1
        ]
    },
    {
        "key": 2,
        "q": [
            -0.5261689608978659,
            -0.31386965554479523,
            0.32734933901608987,
            0.7193569865939864
        ],
        "p": [
            -14.830116271972656,
            73.54730224609375,
            -17.092973709106445
        ],
        "s": [
            0.9086728607844151,
            0.9086728607844152,
            0.9086728607844153
        ]
    },
    {
        "key": 3,
        "q": [
            -0.5261689608978659,
            -0.31386965554479523,
            0.3273493390160899,
            0.7193569865939864
        ],
        "p": [
            -26.260934829711914,
            68.96524047851562,
            -14.042584419250488
        ],
        "s": [
            1.119858185538794,
            1.119858185538794,
            1.1198581855387941
        ]
    },
    {
        "key": 4,
        "q": [
            0.7183807810051731,
            0.5164828041348516,
            0.006135806534819134,
            -0.4659795257235722
        ],
        "p": [
            14.331875801086426,
            43.465755462646484,
            -14.707049369812012
        ],
        "s": [
            1.0234115312578738,
            1.0234115312578738,
            1.0234115312578738
        ]
    },
    {
        "key": 5,
        "q": [
            -0.5635254964875843,
            -0.4040637891035628,
            0.40105216962177503,
            0.5986055682879673
        ],
        "p": [
            -13.197797775268555,
            55.29816436767578,
            -21.802978515625
        ],
        "s": [
            1.119858185538794,
            1.119858185538794,
            1.119858185538794
        ]
    },
    {
        "key": 6,
        "q": [
            -0.26802002801829683,
            0.01818380116790369,
            0.531062546284337,
            0.8036212950701058
        ],
        "p": [
            -19.65137981743682,
            87.6500562172477,
            0.10329064064887639
        ],
        "s": [
            1.0234115312578738,
            1.0234115312578738,
            1.0234115312578738
        ]
    },
    {
        "key": 7,
        "q": [
            -0.34114796119940116,
            -0.01640723123621476,
            0.6192921076175093,
            0.7069838447767506
        ],
        "p": [
            -22.5213623046875,
            68.78307342529297,
            -0.43862384557724
        ],
        "s": [
            1.0234115312578738,
            1.0234115312578738,
            1.0234115312578738
        ]
    },
    {
        "key": 8,
        "q": [
            0.5705195769585507,
            0.6775020359736761,
            0.3247061740555422,
            -0.33175940693335576
        ],
        "p": [
            21.374635657389224,
            47.30331964185261,
            2.8240025773744977
        ],
        "s": [
            1.0234115312578738,
            1.0234115312578738,
            1.0234115312578738
        ]
    }
]

const BIRD_TRAJECTORY = [
    {
        "n": 0,
        "p": [
            -14.694927215576172,
            -4.7743682861328125,
            -14.795639038085938
        ],
        "q": [
            -0.5958007776027432,
            -0.4428429783603793,
            0.25057414705180736,
            0.6213888691907302
        ]
    },
    {
        "n": 1,
        "p": [
            -88.39997100830078,
            54.31535339355469,
            -70.5655517578125
        ],
        "q": [
            -0.49883864332464317,
            -0.4015784389543326,
            0.31246130003703426,
            0.7016143536674526
        ]
    },
    {
        "n": 2,
        "p": [
            -199.19244384765625,
            127.88566589355469,
            -103.56425476074219
        ],
        "q": [
            -0.3353625554684345,
            -0.3245320105566888,
            0.3918880972648511,
            0.7928648369904223
        ]
    },
    {
        "n": 3,
        "p": [
            -348.66961669921875,
            216.9891815185547,
            -114.24113464355469
        ],
        "q": [
            -0.14742119774942392,
            -0.24618180775719764,
            0.39441269204551316,
            0.8729834685358794
        ]
    },
    {
        "n": 4,
        "p": [
            -544.7535400390625,
            278.58563232421875,
            56.0211181640625
        ],
        "q": [
            -0.03141778043093221,
            -0.10876869983313023,
            0.3585120366458151,
            0.9266344546742658
        ]
    },
    {
        "n": 5,
        "p": [
            -693.72412109375,
            324.1771545410156,
            336.24114990234375
        ],
        "q": [
            0.0006792440900531984,
            -0.08134902992171252,
            0.20551202615514771,
            0.9752674920573681
        ]
    },
    {
        "n": 6,
        "p": [
            -748.6924438476562,
            305.06976318359375,
            719.7313232421875
        ],
        "q": [
            0.05199983455297712,
            0.09339952671686977,
            0.0035409515186609463,
            0.9942635502108433
        ]
    },
    {
        "n": 7,
        "p": [
            -500.68841552734375,
            340.77349853515625,
            1098.2384033203125
        ],
        "q": [
            -0.10010291218636487,
            0.4269248035460473,
            -0.03171354370007422,
            0.898169733533123
        ]
    },
    {
        "n": 8,
        "p": [
            -74.77998352050781,
            434.68450927734375,
            1263.9007568359375
        ],
        "q": [
            -0.06474781630369597,
            0.5972389205173907,
            -0.04487318062806203,
            0.7981853104157242
        ]
    },
    {
        "n": 9,
        "p": [
            529.7058715820312,
            467.93280029296875,
            1146.886962890625
        ],
        "q": [
            -0.046436464489288676,
            0.8420944742028218,
            -0.06354178284774899,
            0.5335569258432862
        ]
    },
    {
        "n": 10,
        "p": [
            873.9747924804688,
            403.79010009765625,
            482.4322204589844
        ],
        "q": [
            -0.08275151056929211,
            0.9907273215847601,
            -0.0829474937511918,
            0.06878426451147043
        ]
    },
    {
        "n": 11,
        "p": [
            740.0538330078125,
            252.2877655029297,
            -360.53717041015625
        ],
        "q": [
            -0.2898244581803477,
            0.9160518284638733,
            0.012578691992446425,
            -0.27693430180499784
        ]
    },
    {
        "n": 12,
        "p": [
            -254.70758056640625,
            37.35282897949219,
            -677.342529296875
        ],
        "q": [
            0.27995587314724096,
            -0.6398566257860397,
            0.07603383184848062,
            0.7116368905154558
        ]
    },
    {
        "n": 13,
        "p": [
            -1180.6729736328125,
            -181.30950927734375,
            -113.43646240234375
        ],
        "q": [
            -0.02274873681117777,
            -0.24771138970962686,
            0.10223936428315006,
            0.9631555818104355
        ]
    },
    {
        "n": 14,
        "p": [
            -1356.878173828125,
            -13.930343627929688,
            877.0396728515625
        ],
        "q": [
            -0.10482922633821527,
            0.07085866376583057,
            -0.1635675924141053,
            0.9783841401957134
        ]
    },
    {
        "n": 15,
        "p": [
            -642.805908203125,
            169.97946166992188,
            2386.917236328125
        ],
        "q": [
            -0.08500573167307354,
            0.15714164809686967,
            -0.2612123375427426,
            0.9486035224115402
        ]
    },
    {
        "n": 16,
        "p": [
            29.10736083984375,
            291.2981262207031,
            3565.5244140625
        ],
        "q": [
            -0.08713689372423801,
            0.10045099849589662,
            0.0938443981389187,
            0.9866660973152024
        ]
    },
    {
        "n": 17,
        "p": [
            42.808780670166016,
            1009.234130859375,
            6875.16455078125
        ],
        "q": [
            -0.09711861846161,
            -0.010917999949814319,
            0.0834720638185198,
            0.9917061993287535
        ]
    }
]

let scene = null

export const createBird = asset => {
    const gltf = asset
    const mesh = clone(gltf.scene)
    const object = new THREE.Object3D()
    object.add(mesh)
    const mixer = new THREE.AnimationMixer(mesh)
    const clip1 = gltf.animations[0]
    const action1 = mixer.clipAction(clip1)

    const clip2 = gltf.animations[1]
    const action2 = mixer.clipAction(clip2)

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
            setTimeout(() => {
                action1.fadeOut(.3)
                action2.play()
                setTimeout(() => {
                    action1.stop()
                }, 300)
            }, 4133)
            isUpdate = true
        },
    }
}

const createSystemBirds = () => {
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
                scene.add(bird.object)
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

const createStudio = () => {
    const PADDING = 0
    const CAM_POS = [0, 100, -200]
    const container = document.querySelector('.scene-container');


    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera( 45, (window.innerWidth - 30) / (window.innerHeight - 30), 0.01, 10000000)
    camera.position.set(...CAM_POS)
    scene.add(camera)


    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    container.appendChild(renderer.domElement)

    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(0, 100, -100)
    scene.add(light)

    const ambLight = new THREE.AmbientLight(0x333333, .7)
    scene.add(ambLight)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.update()

    const meshContainer = new THREE.Object3D()
    scene.scale.set(.01, .01, .01)
    scene.add(meshContainer)

    return {
        meshContainer,
        scene,
        addToScene(model) {
            meshContainer.add(model)
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

const start = () => {
    const studio = createStudio()
    const root = {
        studio,
    }
    scene = root.studio.scene

    const loader = new GLTFLoader()
    loader.load(birdSrc, model => {
        const systemBirds = createSystemBirds(root)
        systemBirds.addAsset(model)
        systemBirds.addPlaces(BIRDS_PLACES)
        systemBirds.addFirstBirdPath(BIRD_TRAJECTORY)
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
}


start()
