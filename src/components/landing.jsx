import React from 'react';
import { motion } from "motion/react"

const Landing = () => {
    return (
        <div className='relative top-0 left-0 bg-[#a9bcd0] text-2xl h-screen w-screen'>
            <div className='relative left-32  top-1/2'><motion.h1 initial={{opacity:0,y:100}} whileInView={{y:0,opacity:100}} transition={{duration:1}} className='text-6xl underline'>Urban Nexus</motion.h1><br></br><motion.h3 initial={{opacity:0,y:100}} animate={{y:0,opacity:100}} transition={{duration:1}} className='text-4xl -mt-5'>Business Mapper</motion.h3></div>
            
        </div>
    );
};




export default Landing;
