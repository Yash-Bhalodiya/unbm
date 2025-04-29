import React from 'react';
import { motion } from "framer-motion"; 
import { Link } from "react-router-dom";
import UrbanMap from '../assets/urban-map.jpg'; // Make sure it's in the right path

const Landing = () => {
  return (
    <div className="bg-black text-white min-h-screen w-full overflow-x-hidden flex items-center justify-center px-6 md:px-20 py-16">
      
      {/* Two Column Layout */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl gap-12">

        {/* Left Column: Brand & Image */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }}
          className="flex flex-col items-start md:w-1/2 space-y-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold underline">Urban Nexus</h1>
          <h3 className="text-2xl md:text-3xl tracking-wide">Business Mapper</h3>
          <motion.img 
            src={UrbanMap} 
            alt="Urban Mapper Visual" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.6, duration: 0.8 }} 
            className="mt-4 w-3/4 rounded-md shadow-lg"
          />
        </motion.div>

        {/* Right Column: Info Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="md:w-1/2 space-y-6 text-left"
        >
          <h2 className="text-xl md:text-2xl font-semibold">
            Best solution to locate your business!
          </h2>
          <p>
            A relentless data-driven pursuit to identify opportunities and create
            value others can’t see. Whether it’s expansion, consolidation, or
            performance monitoring - location data is critical to avoid
            million-dollar mistakes in brick & mortar site selection.
          </p>
          <p>
            Automate data collection, leverage real-time analytics, and shorten the
            real estate site selection cycle to boost revenue, identify prime
            locations faster, and accelerate your build process.
          </p>
        </motion.div>

      </div>
    </div>
  );
};

export default Landing;
