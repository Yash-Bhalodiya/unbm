import React from 'react';
import { motion } from "motion/react";
import './page3style.css';

const Page3 = () => {
    return (
        <div className='h-screen w-screen top-100'>
            <motion.h2 initial={{opacity:0,y:20}} whileInView={{opacity:100,y:0}} transition={{duration:1}} className='text-white relative text-2xl md:text-4xl left-12  md:left-1/3 font-bold top-1/5 '>Used across a wide range of areas</motion.h2>
            <motion.p initial={{opacity:0,y:20}} whileInView={{opacity:100,y:0}} transition={{duration:1}} className='h-auto w-3/4 text-white text-md md:text-xl left-10   md:left-1/5 relative top-1/4  md:top-1/4 ml-5'>Our site selection solutions are trusted by market leaders across all areas of the retail industry, including:</motion.p>
            <div className='h-full relative w-screen ml-5 flex flex-col gap-10 left-1/12 top-0 md:flex-row '>
            <motion.div className='cardData h-1/3 w-4/5 md:w-1/4 bg-orange-400 rounded-md relative top-1/2 -left-5 flex justify-center items-center' initial={{opacity:0}} whileInView={{opacity:100}} transition={{duration:1}} ><i class="fa-solid fa-store p-7 text-7xl"></i><p className='text-3xl p-5 font-bold'>Cake shops</p></motion.div>
            <motion.div className='cardData h-1/3 w-4/5 md:w-1/4 bg-orange-400 rounded-md relative top-1/2 -left-5 flex justify-center items-center' initial={{opacity:0}} whileInView={{opacity:100}} transition={{duration:1}}><i class="fa-solid fa-prescription-bottle-medical p-7 text-7xl"></i><p className='text-3xl p-5 font-bold'>Pharmacy</p></motion.div>
            
            <motion.div className='cardData h-1/3 w-4/5 md:w-1/4 bg-orange-400 rounded-md relative top-1/2 -left-5 flex justify-center items-center' initial={{opacity:0}} whileInView={{opacity:100}} transition={{duration:1}}><i class="fa-solid fa-shirt p-7 text-7xl"></i><p className='text-3xl p-5 font-bold'>Laundary</p></motion.div>
            </div>
        </div>
    );
}

export default Page3;