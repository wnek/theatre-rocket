import { Vector3 } from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls, Sparkles, Environment, Billboard, Text, Stars } from "@react-three/drei";
import { EffectComposer, DepthOfField, Bloom, Vignette, ChromaticAberration, Noise } from "@react-three/postprocessing"
import { KernelSize, BlendFunction } from "postprocessing"
import { useRef } from "react";
import { proxy, useSnapshot } from 'valtio'
import useMeasure from "react-use-measure";
const modes = ['translate', 'rotate', 'scale']
const state = proxy({ current: null, mode: 0 })


function PlanetSpotlight({ vec = new Vector3(), ...props }) {
  const light = useRef()
  // const viewport = useThree((state) => state.viewport)

  useFrame((state) => {
    light.current.target.position.set(-300, 0, 200)
    light.current.target.updateMatrixWorld()
  })
  return <spotLight position={[-400, 400, -10]} ref={light} penumbra={1} distance={400} angle={Math.PI / 3} intensity={300} {...props} />
}

function BigPlanetSpotlight({ vec = new Vector3(), ...props }) {
  const light = useRef()
  // const viewport = useThree((state) => state.viewport)

  useFrame((state) => {
    light.current.target.position.set(-100, 200, -300)
    light.current.target.updateMatrixWorld()
  })
  return <spotLight position={[-300, 240, -10]} ref={light} penumbra={1} distance={330} angle={Math.PI / 3} intensity={400} power={1000} {...props} />
}


function Controls() {
  // Get notified on changes to state
  const snap = useSnapshot(state)
  const scene = useThree((state) => state.scene)
  return (
    <>
      {snap.current && <TransformControls object={scene.getObjectByName(snap.current)} mode={modes[snap.mode]} />}
      <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.77} />
    </>
  )
}

function Space({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/space-transformed.glb')
  return ( 
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.Cube001.geometry} material={nodes.Cube001.material} castShadow/>
      <mesh geometry={nodes.BackPlanet.geometry} material={materials.backPlanetMaterial} />
      <mesh geometry={nodes.smallPlanet.geometry} material={materials.smallPlanetMaterial} />
      <mesh geometry={nodes.nebula.geometry} material={materials.nebulaMaterial} />
      <mesh geometry={nodes.atmosphericGradient.geometry} material={materials.atmosphericGradientMaterial} />
      <mesh geometry={nodes.ground.geometry} material={materials.groundMaterial} receiveShadow/>
      <mesh geometry={nodes.Rock_1.geometry} material={materials.Rock_set} position={[16.29, -5.49, -11.8]} rotation={[Math.PI / 2, 0, 0]} scale={0.16} castShadow />
      <mesh geometry={nodes.Rock_1001.geometry} material={materials.Rock_set} position={[17.08, -5.93, -2.42]} rotation={[Math.PI / 2, 0, 0]} scale={0.37} castShadow/>
      <mesh geometry={nodes.Rock_1002.geometry} material={materials.Rock_set} position={[15.85, -5.75, -2.17]} rotation={[1.58, 0.82, -2.97]} scale={0.14} castShadow/>
      <mesh geometry={nodes.Rock_2.geometry} material={materials.Rock_set} position={[4.11, -9.71, 0]} rotation={[Math.PI / 2, 0, 0]} scale={0.16} castShadow/>
      <mesh geometry={nodes.Rock_3.geometry} material={materials.Rock_set} position={[0, -5.18, 0]} rotation={[Math.PI / 2, 0, 0]} scale={0.16} castShadow/>
      <mesh geometry={nodes.Rock_4.geometry} material={materials.Rock_set} position={[-18.35, -5.18, -5.13]} rotation={[Math.PI / 2, 0, 0]} scale={0.16} castShadow/>
      <mesh geometry={nodes.Rock_5.geometry} material={materials.Rock_set} position={[-10.28, -5.18, -24.31]} rotation={[Math.PI / 2, 0, 0]} scale={0.16} castShadow/>
      <mesh geometry={nodes.Rock_5001.geometry} material={materials.Rock_set} position={[-23.58, -6.01, 12.33]} rotation={[-0.41, -0.96, -1.55]} scale={0.44} castShadow/>
      <mesh geometry={nodes.Rock_5002.geometry} material={materials.Rock_set} position={[4.81, -6.42, 12.36]} rotation={[Math.PI / 2, 0, 0]} scale={0.28} castShadow/>
      <mesh geometry={nodes.Rock_5003.geometry} material={materials.Rock_set} position={[-14.15, -5.37, 3.85]} rotation={[-0.03, -0.2, 0.03]} scale={[0.31, 0.17, 0.31]} castShadow/>
      <mesh geometry={nodes.Rock_5004.geometry} material={materials.Rock_set} position={[5.89, -5.04, -13.11]} rotation={[Math.PI / 2, 0, 0]} scale={0.09} castShadow/>
      <mesh geometry={nodes.Rock_5005.geometry} material={materials.Rock_set} position={[20.17, -5.04, 7.28]} rotation={[Math.PI / 2, 0, 0]} scale={0.09} castShadow/>
      <mesh geometry={nodes.Rock_5006.geometry} material={materials.Rock_set} position={[-0.29, -5.04, 2.93]} rotation={[Math.PI / 2, 0, 0]} scale={0.09} castShadow/>
      <mesh geometry={nodes.Rock_5007.geometry} material={materials.Rock_set} position={[-16.48, -5.04, -11.43]} rotation={[Math.PI / 2, 0, -1.53]} scale={0.07} castShadow/>
      <mesh geometry={nodes.Rock_5008.geometry} material={materials.Rock_set} position={[1.46, -5.04, -27.84]} rotation={[Math.PI / 2, 0, 2.35]} scale={0.07} castShadow/>
      <mesh geometry={nodes.Rock_5009.geometry} material={materials.Rock_set} position={[-0.32, -5.04, -6.7]} rotation={[Math.PI / 2, 0, -1.87]} scale={0.05} castShadow/>
      <mesh geometry={nodes.Rock_5010.geometry} material={materials.Rock_set} position={[-6.38, -5.04, -14.08]} rotation={[Math.PI / 2, 0, 2.27]} scale={0.06} castShadow/>
      <mesh geometry={nodes.Rock_5011.geometry} material={materials.Rock_set} position={[-16.92, -5.04, -12.3]} rotation={[Math.PI / 2, 0, 0.76]} scale={0.11} castShadow/>
      <mesh geometry={nodes.Rock_5012.geometry} material={materials.Rock_set} position={[-6.3, -6.42, 24.86]} rotation={[0.84, 0.82, -1.89]} scale={0.28} castShadow/>
      <mesh geometry={nodes.Rock_5013.geometry} material={materials.Rock_set} position={[32.46, -9.13, 20.6]} rotation={[-0.41, -0.96, -1.55]} scale={[0.69, 1.57, 1.47]} castShadow/>
      <mesh geometry={nodes.Rock_5014.geometry} material={materials.Rock_set} position={[-25.35, -6.31, -30.91]} rotation={[-0.03, -0.2, 0.03]} scale={[1.36, 0.73, 1.36]} castShadow/>
      <mesh geometry={nodes.Rock_5015.geometry} material={materials.Rock_set} position={[-32.81, -7.48, -23.64]} rotation={[-3, 1.36, 3.04]} scale={[1.02, 0.55, 1.02]} castShadow/>
      <mesh geometry={nodes.Rock_5016.geometry} material={materials.Rock_set} position={[-27.97, -5.9, -20.23]} rotation={[Math.PI / 2, 0, 0.76]} scale={0.11} castShadow/>
      <mesh geometry={nodes.Rock_5017.geometry} material={materials.Rock_set} position={[-35.51, -6.91, -17.98]} rotation={[2.63, 0.57, 2.61]} scale={[0.42, 0.43, 0.44]} castShadow/>
      <mesh geometry={nodes.Rock_5018.geometry} material={materials.Rock_set} position={[23.2, -9.53, 25.16]} rotation={[0.45, 0.36, -1]} scale={[1.33, 1.27, 0.93]} castShadow/>
      <mesh geometry={nodes.Rock_5019.geometry} material={materials.Rock_set} position={[28.02, -6.49, 30.35]} rotation={[-2.73, 0.68, 1.63]} scale={[1.33, 1.27, 0.93]} castShadow/>
      <mesh geometry={nodes.Rock_5020.geometry} material={materials.Rock_set} position={[21.53, -9, 35.68]} rotation={[-0.78, 0.42, -2.59]} scale={[1.07, 1.02, 0.75]} castShadow/>
      <mesh geometry={nodes.Rock_5021.geometry} material={materials.Rock_set} position={[15.64, -7.63, 34.08]} rotation={[-0.78, 0.42, -2.59]} scale={[0.3, 0.28, 0.21]} castShadow/>
      <mesh geometry={nodes.Rock_5022.geometry} material={materials.Rock_set} position={[19.64, -6.55, 28.77]} rotation={[-0.78, 0.42, -2.59]} scale={[0.09, 0.08, 0.06]} castShadow/>
      <mesh geometry={nodes.Rock_5023.geometry} material={materials.Rock_set} position={[28.5, -6.94, 17.62]} rotation={[-0.78, 0.42, -2.59]} scale={[0.09, 0.08, 0.06]} castShadow/>
      <mesh geometry={nodes.Rock_5024.geometry} material={materials.Rock_set} position={[5.53, 1.14, 13.14]} rotation={[-2.88, -1.29, -2.36]} scale={-0.02} castShadow/>
      <mesh geometry={nodes.Rock_5025.geometry} material={materials.Rock_set} position={[7.2, 6.77, 12.01]} rotation={[2.95, 0.28, -3.03]} scale={0.02} castShadow/>
      <mesh geometry={nodes.Rock_5026.geometry} material={materials.Rock_set} position={[4.2, 6.77, 2.7]} rotation={[2.95, 0.28, -3.03]} scale={0.01} castShadow/>
      <mesh geometry={nodes.Rock_5027.geometry} material={materials.Rock_set} position={[7.46, 6.77, -5.11]} rotation={[0.43, 0.97, -3.13]} scale={0.01} castShadow/>
      <mesh geometry={nodes.Rock_5028.geometry} material={materials.Rock_set} position={[-4.93, 2.18, -7.59]} rotation={[0.43, 0.97, -3.13]} scale={0.02} castShadow/>
      <mesh geometry={nodes.Rock_5029.geometry} material={materials.Rock_set} position={[6.31, -2.67, 13.3]} rotation={[-0.72, 0.64, 2.51]} scale={0.05} castShadow/>
      <mesh geometry={nodes.Rock_5030.geometry} material={materials.Rock_set} position={[-16.23, 1.86, -0.96]} rotation={[-1.01, -0.44, 1.49]} scale={[0.07, 0.04, 0.07]} castShadow/>
      <mesh geometry={nodes.Rock_5031.geometry} material={materials.Rock_set} position={[-26.59, 1.21, -6.64]} rotation={[-1.01, -0.44, 1.49]} scale={[0.03, 0.02, 0.03]} castShadow/>
      <mesh geometry={nodes.Rock_5032.geometry} material={materials.Rock_set} position={[-10.51, 1.46, -26.05]} rotation={[-1.01, -0.44, 1.49]} scale={[0.02, 0.01, 0.02]} castShadow/>
      <mesh geometry={nodes.Rock_5033.geometry} material={materials.Rock_set} position={[4.27, -0.13, -19.85]} rotation={[-1.01, -0.44, 1.49]} scale={[0.02, 0.01, 0.02]} castShadow/>
      <mesh geometry={nodes.Rock_5034.geometry} material={materials.Rock_set} position={[10.94, 1.55, -2.61]} rotation={[-1.01, -0.44, 1.49]} scale={[0.02, 0.01, 0.02]} castShadow/>
      <mesh geometry={nodes.Rock_5035.geometry} material={materials.Rock_set} position={[-3.18, -1.14, 6.63]} rotation={[-1.01, -0.44, 1.49]} scale={[0.02, 0.01, 0.02]} castShadow/>
      <mesh geometry={nodes.Rock_5036.geometry} material={materials.Rock_set} position={[3.03, 1.12, 13.49]} rotation={[-1.01, -0.44, 1.49]} scale={0.01} castShadow/>
      <mesh geometry={nodes.Rock_5037.geometry} material={materials.Rock_set} position={[-2.45, -0.77, 2.08]} rotation={[-1.01, -0.44, 1.49]} scale={0.01} castShadow/>
      <mesh geometry={nodes.Rock_5038.geometry} material={materials.Rock_set} position={[-2.45, -0.77, 2.08]} rotation={[-1.01, -0.44, 1.49]} scale={0.01} castShadow/>
      <mesh geometry={nodes.Rock_5039.geometry} material={materials.Rock_set} position={[-0.06, -7.98, -41.68]} rotation={[0.65, -1.18, 1.23]} scale={[0.93, 0.37, 1.09]} castShadow/>
      <mesh geometry={nodes.Rock_5040.geometry} material={materials.Rock_set} position={[-18.33, -4.91, -5.34]} rotation={[-3.14, -0.5, -3.13]} scale={[0.31, 0.12, 0.37]} castShadow/>
      <mesh geometry={nodes.Rock_5041.geometry} material={materials.Rock_set} position={[-38.25, -21.28, 43.17]} rotation={[-0.97, 0.4, -2.06]} scale={[2.42, 5.57, 5.19]} castShadow/>
      <mesh geometry={nodes.Rock_5042.geometry} material={materials.Rock_set} position={[38.31, -23.79, -41.08]} rotation={[-0.13, 0.73, 2.21]} scale={[3.9, 8.97, 8.35]} castShadow/>
      <mesh geometry={nodes.shoes_geo.geometry} material={materials['Material.002']} position={[-4.75, -4.84, 13.45]} rotation={[0, -0.66, 0]} castShadow/>
      <mesh geometry={nodes.cha_geo.geometry} material={materials['Material.002']} position={[-4.73, -3.87, 13.48]} rotation={[0, -0.66, 0]} castShadow/>
    </group>
  )
}

export default function App() {
  return (
      <Canvas
       gl={{ alpha: false }}
       camera={{ fov: 67, near: 0.01, far: 1000, position: [0, -4, 20] }}
       shadows
      >

      {/* <Environment
        files="/Stars.hdr"
        background={"true"}
      />

   */}
      <Space />
      <Stars
      radius={400}
      depth={50}
      count={5000}
      factor={10}
      saturation={0}
      fade
      speed={1} />

      <color attach="background" args={["#000000"]} /> 
      {/* <fog attach="fog" color="#020717" near={1} far={20} /> */}
      
      <ambientLight
        intensity={0.05}
        color={"#ffffff"}
      />
      <BigPlanetSpotlight />
      <PlanetSpotlight />
  

      <spotLight
        intensity={20}
        angle={Math.PI/15}
        position={[-200, 70, -100]}
        penumbra={1}
        castShadow
        distance={270}
        power={100}
        color={"#F8E7B8"}
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
      />

      <Sparkles
        count={400}
        scale={40}
        size={40}
        speed={0.4}
        opacity={0.001}
      />
      
      <Controls />
      
      <EffectComposer>
        {/* <DepthOfField target={[0, 0, 1]} focalLength={ 0.2 } bokehScale={1}/> */}
      <Bloom
        kernelSize={3}
        luminanceThreshold={0.45}
        luminanceSmoothing={7}
        intensity={1}
        opacity={0.4}
      />

      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={[0.0004, 0.0004]}
      />

      <Noise
        premultiply // enables or disables noise premultiplication
        blendFunction={BlendFunction.SCREEN} // blend mode
        opacity={0.3}
      />
      
      <Vignette
        offset={0.5}
        darkness={0.6}
        eskil={false}
        blendFunction={BlendFunction.NORMAL}
      />

      </EffectComposer>

    </Canvas>
  )
}
