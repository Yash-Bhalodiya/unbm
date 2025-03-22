import { useState } from 'react'
import './index.css'
import './App.css'
import { motion } from "motion/react"
import NAV from './components/nav';
import LANDING from './components/landing';
import Page2 from './components/page2';

function App() {

  return (
    <>
      <div className='overflow-x-hidden'> 
          <NAV></NAV>
          <LANDING></LANDING>
          <hr className='h-5 md:w-4/5 w-4/5 top-10 md:left-32 left-10  relative'></hr>
          <Page2></Page2>
      </div>
    </>
  )
}

export default App
