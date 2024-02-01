import * as THREE from "three"
import { createContext, useContext, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Clouds, Cloud, CameraShake, Environment, OrbitControls, ContactShadows, PerspectiveCamera } from "@react-three/drei"
import { CuboidCollider, BallCollider, Physics, RigidBody } from "@react-three/rapier"
import { random } from "maath"
import './index.js'



const context = createContext()
export default function App() {
  const shake = useRef()
  const scene = useRef();
  return (
    <Canvas style={ {height: '100vh', backgroundColor : "black"} }>
       <scene ref={scene} background={new THREE.Color("black")}>
      <ambientLight intensity={Math.PI / 2} />
      <PerspectiveCamera makeDefault position={[0, -4, 18]} fov={90} onUpdate={(self) => self.lookAt(0, 0, 0)}>
        <spotLight position={[0, 40, 2]} angle={0.5} decay={1} distance={45} penumbra={1} intensity={4000} />
        <spotLight position={[-19, 0, -8]} color="red" angle={0.25} decay={0.75} distance={185} penumbra={-1} intensity={800} />
      </PerspectiveCamera>
      <context.Provider value={shake}>
    
        <Clouds limit={400} material={THREE.MeshLambertMaterial}>
          <Physics gravity={[0, 0, 0]}>
           
            <Puffycloud seed={10} position={[50, 0, 0]} />
            <Puffycloud seed={20} position={[0, 50, 0]} />
            <Puffycloud seed={30} position={[50, 0, 50]} />
            <Puffycloud seed={40} position={[0, 0, -50]} />
            <CuboidCollider position={[0, -15, 0]} args={[400, 10, 400]} />
          </Physics>
        </Clouds>
      </context.Provider>
      <mesh scale={200}>
        <sphereGeometry />
        <meshStandardMaterial color="#fb9062" roughness={0.7} side={THREE.BackSide} />
      </mesh>
      <ContactShadows opacity={0.25} color="white" position={[0, -10, 0]} scale={50} blur={2.5} far={40} />
      <OrbitControls makeDefault autoRotate enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 1.7} maxPolarAngle={Math.PI / 1.7} />
      <Environment preset="dawn" background blur={0.5}/>
      </scene>
    </Canvas>
  )
}

function Puffycloud({ seed, vec = new THREE.Vector3(), ...props }) {
  const api = useRef()
  const light = useRef()
  const rig = useContext(context)
  const [flash] = useState(() => new random.FlashGen({ count: 10, minDuration: 40, maxDuration: 200 }))
  const contact = (payload) => payload.other.rigidBodyObject.userData?.cloud && payload.totalForceMagnitude / 1000 > 100 && flash.burst()
  useFrame((state, delta) => {
    const impulse = flash.update(state.clock.elapsedTime, delta)
    light.current.intensity = impulse * 15000
    if (impulse === 1) rig?.current?.setIntensity(1)
    api.current?.applyImpulse(vec.copy(api.current.translation()).negate().multiplyScalar(10))
  })
  return (
    <RigidBody ref={api} userData={{ cloud: true }} onContactForce={contact} linearDamping={4} angularDamping={1} friction={0.1} {...props} colliders={false}>
      <BallCollider args={[4]} />
      <Cloud seed={seed} fade={30} speed={0.1} growth={4} segments={40} volume={10} opacity={0.4} bounds={[4, 3, 1]} />
      <Cloud seed={seed + 1} fade={30} position={[0, 1, 0]} speed={0.5} growth={4} volume={16} opacity={0.6} bounds={[6, 2, 1]}  />
      <pointLight position={[0, 0, 0.5]} ref={light} color="orange" />
    </RigidBody>
  )
}


