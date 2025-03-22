import { useState } from 'react'
import './index.css'
import './App.css'
import { motion } from "motion/react"
import NAV from './components/nav';
import LANDING from './components/landing';

function App() {

  return (
    <>
      <div> 
          <NAV></NAV>
          <LANDING></LANDING>
      </div>
    </>
  )
}

export default App
