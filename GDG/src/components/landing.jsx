import React from 'react';
import { motion } from "framer-motion"; 
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className='relative top-0 left-0 bg-black text-2xl h-screen w-screen overflow-x-hidden'>
      <div id='prName' className='relative text-white md:left-32 md:top-1/2 left-1/6 top-24'>
        <motion.h1 
          initial={{opacity:0, y:-100}} 
          animate={{y:0, opacity:1}} 
          transition={{duration:1}} 
          className='text-6xl underline md:left-0 -left-10 relative'
        >
          Urban Nexus
        </motion.h1>
        <br />
        <motion.h3 
          initial={{opacity:0, y:100}} 
          animate={{y:0, opacity:1}} 
          transition={{duration:1}} 
          className='text-3xl -mt-5 tracking-widest'
        >
          Business Mapper
        </motion.h3>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="landInfo h-auto w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto mt-16 p-6 relative md:left-48 md:top-20 top-32 rounded-md"
      >
        <h2 className="text-center font-bold text-xl text-white md:text-2xl">
          Best solution to locate your business!
        </h2>
        <p className="mt-6 text-center md:text-left text-white relative md:left-10 md:px-10">
          A relentless data-driven pursuit to identify opportunities and create
          value others can’t see. Whether it’s expansion, consolidation, or
          performance monitoring - location data is critical to avoid
          million-dollar mistakes in brick & mortar site selection.
        </p>
        <p className="mt-6 text-center md:text-left relative text-white md:left-10 md:px-10">
          Automate data collection, leverage real-time analytics, and shorten the
          real estate site selection cycle to boost revenue, identify prime
          locations faster, and accelerate your build process.
        </p>

        {/* 🚀 Buttons for Login & Signup */}
      
      </motion.div>
    </div>
  );
};

export default Landing;
