
// env
import nx from '../assets/env00/nx.jpg'
import px from '../assets/env00/px.jpg'
import ny from '../assets/env00/ny.jpg'
import py from '../assets/env00/py.jpg'
import nz from '../assets/env00/nz.jpg'
import pz from '../assets/env00/pz.jpg'


// floor
import floor00map from '../assets/floor01/tavern-wood-planks1_albedo.jpg'
import floor00aoMap from '../assets/floor01/floorA0.jpg'
import floor00normalMap from '../assets/floor01/tavern-wood-planks1_normal-ogl.jpg'
import floor00specularMap from '../assets/floor01/tavern-wood-planks1_roughness.jpg'


import wall00aoMap from '../assets/wallinner00/fiber-textured-wall1_ao.jpg'
import wall00normalMap from '../assets/wallinner00/fiber-textured-wall1_normal-ogl.jpg'


import aoMap from '../assets/w_ao.jpg'
import craneT from '../assets/Crane_testAnim_v01.glb'


const X = -25.6
const Z = -20


import rzev from '../assets/Rzhev_test01.fbx'



export const ASSETS = [
    { key: 'env00', src: [px, nx, py, ny, pz, nz], typeLoader: 'imgCube' },


    { key: 'aoMap', src: aoMap, typeLoader: 'img' },

    //{ key: 'picture', src: picture, typeLoader: 'img' },

    //{ key: 'ceiling00ao', src: ceiling00ao, typeLoader: 'img', repeat: true },

    { key: 'floor00map', src: floor00map, typeLoader: 'img', repeat: true },
    { key: 'floor00aoMap', src: floor00aoMap, typeLoader: 'img', repeat: true },
    { key: 'floor00normalMap', src: floor00normalMap, typeLoader: 'img', repeat: true },
    { key: 'floor00specularMap', src: floor00specularMap, typeLoader: 'img', repeat: true },

    //{ key: 'wall00map', src: wall00Map, typeLoader: 'img',  repeat: true },
    { key: 'wall00aoMap', src: wall00aoMap, typeLoader: 'img',  repeat: true },
    { key: 'wall00normalMap', src: wall00normalMap, typeLoader: 'img',  repeat: true },
    { key: 'rzev', src: rzev, typeLoader: 'fbx',  pos: [0, 0, 0], rot: 0, hideWall: null  }, // sofa
    { key: 'craneT', src: craneT, typeLoader: 'gltf' },
]


export const MATERIALS_AO = {
    'm01': {
        '0': 'm1_ao',
    },
    'm02': {
        '0': 'm1_ao',
    },
    'm03': {
        '0': 'm3_ao',
    },
    'm04': {
        '0': 'm4_ao',
    },
    'm05': {
        '0': 'm4_ao',
    },
    'm06': {
        '0': 'm6_ao',
    },
    'm07': {
        '0': 'm6_ao',
    },
    'm08': {
        '0': 'm8_ao',
    },
    'm12': {
        '0': 'm12.1_ao',
        '1': 'm12.2_ao',
        '2': 'm12.3_ao',
    },
    'm13': {
        '0': 'm13_ao',
    },
    'm14': {
        '0': 'm14_ao',
    },
    'm16': {
        '0': 'm16_ao',
    },
}
