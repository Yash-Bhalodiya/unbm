import React from 'react';
import { motion } from "motion/react"

const Card = ({ head, text }) => {
    return (
        <motion.div 
  initial={{ opacity: 0, y: 15 }} 
  whileInView={{ opacity: 1, y: 0 }} 
  transition={{ duration: 1 }} 
  className="relative h-auto w-full sm:w-3/4 md:w-1/2 lg:w-1/4 bg-[#373f51] text-white top-20 p-4 md:p-6 rounded-md"
>
  <h2 className="font-bold text-lg md:text-xl">{head}</h2>
  <p className="text-sm md:text-base mt-4">{text}</p>
</motion.div>

    );
};

export default Card;
