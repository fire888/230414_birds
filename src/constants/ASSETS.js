
// env
import nx from '../assets/env00/nx.jpg'
import px from '../assets/env00/px.jpg'
import ny from '../assets/env00/ny.jpg'
import py from '../assets/env00/py.jpg'
import nz from '../assets/env00/nz.jpg'
import pz from '../assets/env00/pz.jpg'


import craneT from '../assets/testa4.glb'
import rzev from '../assets/Rzhev_test01.fbx'
import flyPoints from '../assets/points.fbx'


export const ASSETS = [
    { key: 'env00', src: [px, nx, py, ny, pz, nz], typeLoader: 'imgCube' },
    { key: 'rzev', src: rzev, typeLoader: 'fbx',  },
    { key: 'craneT', src: craneT, typeLoader: 'gltf' },
    { key: 'flyPoints', src: flyPoints, typeLoader: 'fbx' },
]
