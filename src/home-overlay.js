import * as THREE from 'three'
import React from 'react';
import { Logo } from '@pmndrs/branding'
import { motion, AnimatePresence } from 'framer-motion'
import { AiFillCamera, AiOutlineArrowLeft, AiOutlineHighlight, AiOutlineShopping } from 'react-icons/ai'
import { useSnapshot } from 'valtio'
import { state } from './store'
import { Canvas, extend } from '@react-three/fiber'
import { Html, useProgress } from "@react-three/drei";

import "./index.css";

extend({ motion, AnimatePresence, Canvas,  state, Logo, AiFillCamera, AiOutlineArrowLeft, AiOutlineHighlight, AiOutlineShopping });

export default function Overlay() {
  
  return (
   
    <Html>
      {/* <motion.header initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={transition}>
      
        <motion.div animate={{ x: snap.intro ? 0 : 100, opacity: snap.intro ? 1 : 0 }} transition={transition}>
       
        </motion.div>
      </motion.header> */}
      <motion.div className="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
        
        <h1></h1>
        <h2></h2>
        <button onClick={() => (state.intro = false)}>START</button>
      </motion.div>
    
    </Html>
  )
}

function Customizer() {
  const snap = useSnapshot(state)
  return (
    <div className="customizer">
      <div className="color-options">
        {snap.colors.map((color) => (
          <div key={color} className={`circle`} style={{ background: color }} onClick={() => (state.color = color)}></div>
        ))}
      </div>
      <div className="decals">
        <div className="decals--container">
          {snap.decals.map((decal) => (
            <div key={decal} className={`decal`} onClick={() => (state.decal = decal)}>
              <img src={decal + '_thumb.png'} alt="brand" />
            </div>
          ))}
        </div>
      </div>
      <button
        className="share"
        style={{ background: snap.color }}
        onClick={() => {
          const link = document.createElement('a')
          link.setAttribute('download', 'canvas.png')
          link.setAttribute('href', document.querySelector('canvas').toDataURL('image/png').replace('image/png', 'image/octet-stream'))
          link.click()
        }}>
        DOWNLOAD
        <AiFillCamera size="1.3em" />
      </button>
      <button className="exit" style={{ background: snap.color }} onClick={() => (state.intro = true)}>
        GO BACK
        <AiOutlineArrowLeft size="1.3em" />
      </button>
    </div>
  )
}


