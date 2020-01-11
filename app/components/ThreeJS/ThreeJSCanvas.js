import * as THREE from 'three'
import React, { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useThree, useRender, extend } from 'react-three-fiber'
import { apply as useTransition, a, } from 'react-spring/three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Box } from './Box'
import { Model } from '../../components/ThreeJS/Model'
import { themeColor } from '../../css/theme'



extend({ OrbitControls })
const Controls = props => {
    const { gl, camera } = useThree()
    const ref = useRef()

    useRender(() => ref.current.update())
    return <orbitControls ref={ref} args={[camera, gl.domElement]} {...props} />
}


function Loading() {
    const [finished, set] = useState(false)
    const [width, setWidth] = useState(0)

    useEffect(() => {
        THREE.DefaultLoadingManager.onLoad = () => set(true)
        THREE.DefaultLoadingManager.onProgress = (url, itemsLoaded, itemsTotal) =>
            setWidth((itemsLoaded / itemsTotal) * 200)
    }, [])

    const props = useTransition(finished, null, {
        from: { opacity: 1, width: 0 },
        leave: { opacity: 0 },
        update: { width },
    })

    return props.map(
        ({ item: finished, key, props: { opacity, width } }) =>
            !finished && (
                <a.div className="loading" key={key} style={{ opacity }}>
                    <div className="loading-bar-container">
                        <a.div className="loading-bar" style={{ width }} />
                    </div>
                </a.div>
            ),
    )
}

const ThreeJSComponent = () => {

    console.log('render!s')

    const angle = 1
    const intensity = 0.5

    const xPosition = 0
    const yPosition = 0
    const zPosition = 40

    return (

        <Canvas
            style={{
                height: 400,
                width: 400,
                background: 'whitesmoke'
            }}
            camera={{ position: [0, 0, 20] }} shadowMap>

            <pointLight intensity={4} color="black" />


            {/*Front Side */}
            <spotLight
                color={themeColor}
                intensity={intensity}
                angle={angle}

                position={[xPosition, yPosition, zPosition]}
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
            />

            <spotLight

                intensity={intensity}
                angle={angle}
                position={[xPosition, yPosition, zPosition]}
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
            />


            {/* Back Side */}

            <spotLight

                intensity={intensity}
                angle={angle}
                position={[xPosition, yPosition, -zPosition]}
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
            />

            <spotLight
                color={themeColor}
                intensity={intensity}
                angle={angle}
                position={[xPosition, yPosition, -zPosition]}
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
            />


            {/* Underlights */}

            <directionalLight

                color={"rgb(0,0,0)"}
                intensity={1}
                position={[0, -1000, 20]}
            />



            }


            <Suspense fallback={<Box />}>
                <Model url="/bull.gltf" />
            </Suspense>


            <Controls
                autoRotate
                enablePan={false}
                enableZoom={true}
                enableDamping
                dampingFactor={0.5}
                rotateSpeed={1}
                maxPolarAngle={Math.PI / 2.5}
                minPolarAngle={Math.PI / 2}
            />



        </Canvas>

    )
}


export default ThreeJSComponent
