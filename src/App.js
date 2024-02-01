import React from 'react';
import * as THREE from 'three'
import { forwardRef, useState, useEffect } from 'react'
import { Canvas } from "@react-three/fiber";
import { EffectComposer, GodRays, Bloom } from '@react-three/postprocessing'
import { Suspense } from 'react';
import './App.css'; 
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import page1font from "/Users/xiaowenyuan/3DWeb/3DReflectionWeb/src/Assets/page1.json"
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { CubeCamera, OrbitControls } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import Overlay from '/Users/xiaowenyuan/3DWeb/3DReflectionWeb/src/home-overlay.js';
import Shapes from './shapes';
import { Html } from "@react-three/drei";
import "./index.css";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';



extend ({TextGeometry})


const Emitter = forwardRef((props, forwardRef) => {
  const [video] = useState(() => Object.assign(document.createElement('video'), { src: '/think.mp4', crossOrigin: 'Anonymous', loop: true, muted: true }))
  useEffect(() => void video.play(), [video])
  return (
    <mesh ref={forwardRef} position={[16, 1.5, -16]} rotation={[0, -Math.PI / 12, 0]} {...props}>
      <planeGeometry args={[16, 10]} />
      <meshBasicMaterial>
        <videoTexture attach="map" args={[video]} colorSpace={THREE.SRGBColorSpace} />
      </meshBasicMaterial>
      <mesh scale={[18.05, 12.05, 1]} position={[0, 0, -0.01]} >
        <planeGeometry />
        <meshBasicMaterial color="black" />
      </mesh>
    </mesh>
  )
})



function Screen() {
  const [material, set] = useState()
  return (
    <>
      <Emitter ref={set} />
      {material && (
        <EffectComposer disableNormalPass multisampling={8}>
          <GodRays sun={material} exposure={0.34} decay={0.8} blur />
          <Bloom luminanceThreshold={0} mipmapBlur luminanceSmoothing={0.0} intensity={1} />
        </EffectComposer>
      )}
    </>
  )
}


function App() {
 

  const font = new FontLoader().parse(page1font);
  return (
    <div className="App">
      
     
      <Canvas style={ {height: '100vh', backgroundColor: 'black'}}>
        <ambientLight intensity={1.2} />
        <directionalLight color={"#fb9062"} position={[-1, -0.2, 5]} intensity={0.8} />
       <CubeCamera position={[-5, 0.8, 0]} resolution={256} frames={Infinity} rotation={[0, Math.PI / 20, 0]}>
          {(texture) => (
            <mesh>
              <textGeometry args= {["What's on your \nmind?", {font, size: 0.75, height: 1}]}/>
              <meshStandardMaterial metalness={1} roughness={0.3} envMap={texture} />
            </mesh>
          )}
        </CubeCamera>

        <Suspense fallback={null}>
          <Screen />
        
          
         
         
          <OrbitControls />
          
        </Suspense>
       
       
      </Canvas>

      <button className='custom-button' >
          <Link to="/input"> 
          <span className="btn-inner">
              
            <span className="btn-text">Answer</span>
      </span>
      </Link>
      
      </button>
      </div>
  );
}


export default App; 