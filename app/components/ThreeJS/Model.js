
import React from 'react'
import { useLoader } from 'react-three-fiber'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'


export const Model = (props) => {

    const { url } = props

    const model = useLoader(GLTFLoader, url)

    console.log('model:', model)


    /* const model = useLoader(GLTFLoader, url, loader => {
 
 
 
         const dracoLoader = new DRACOLoader()
         dracoLoader.setDecoderPath("/draco-gltf/")
         loader.setDRACOLoader(dracoLoader)
 
         console.log('draco loader:', dracoLoader)
 
 
 
     })
     */

    console.log('model:', model)



    return (

        <primitive position={[0, 0, 0]} scale={[1, 1, 1]} object={model.scene}></primitive>


        /* <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -7, 0]} scale={[1, 1, 1]}>
             {model.map(({ geometry, material }) => {
 
 
                 // console.log('model:', geometry, material)
 
                 // There are two buffergeometries in this gltf
                 // Save some GPU by rendering the rocks a little less vivd than the rocket
 
                 const Material = 'meshStandardMaterial'
                 return (
                     <mesh
                         key={geometry.uuid}
                         rotation={[Math.PI / 13.5, -Math.PI / 5.8, Math.PI / 5.6]}
                         geometry={geometry}
                         castShadow={true}
                         receiveShadow={true}>
                         <Material attach="material" map={material.map} roughness={1} />
                     </mesh>
                 )
             })}
         </group>
 
         */
    )
}
