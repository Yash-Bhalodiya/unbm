import React from 'react';
import { motion } from "framer-motion"; // corrected to framer-motion
import Card from './card'; // Assuming you have a Card component
import img1 from '../assets/unbm-3.jpeg'; // Update the correct path
import img2 from '../assets/unbm_2.jpg'; // Update the correct path

const Page2 = () => {
    return (
        <div className='h-screen w-screen relative text-white flex flex-col lg:flex-row items-center justify-between p-8'>
            
            {/* Left Side - Text and Cards */}
            <div className='flex flex-col w-full lg:w-2/3'>
                <motion.h2 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 1 }}
                    className='text-2xl font-bold mb-10 md:text-3xl'
                >
                    Drive Success with Comprehensive Functionality
                </motion.h2>

                <div className="grid grid-cols-2 md:grid-cols-1 gap-6 ">
                    <motion.div 
                        initial={{ opacity: 0, x: 100 }} 
                        whileInView={{ opacity: 1, x: 0 }} 
                        transition={{ duration: 0.8 }}
                    >
                        <Card 
                            head="Advanced Dashboard & Analytics" 
                            text="Real-time insights to help you make better site decisions and boost your speed to market."
                        />
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 100 }} 
                        whileInView={{ opacity: 1, x: 0 }} 
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <Card 
                            head="Automated Functionalities" 
                            text="Streamline document handling and automate workflows from site selection to project management."
                        />
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 100 }} 
                        whileInView={{ opacity: 1, x: 0 }} 
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <Card 
                            head="Real Estate Planner and Monitoring" 
                            text="Plan expansion strategies and monitor key real estate targets effectively."
                        />
                    </motion.div>
                </div>
            </div>

            {/* Right Side - Images */}
            <div className="flex flex-col gap-6 w-full lg:w-1/4 mt-10 lg:mt-0">
                <motion.img 
                    src={img1} 
                    alt="Image 1" 
                    initial={{ opacity: 0, y: 50 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.8 }}
                    className="rounded-lg shadow-lg"
                />
                <motion.img 
                    src={img2} 
                    alt="Image 2" 
                    initial={{ opacity: 0, y: 50 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="rounded-lg shadow-lg"
                />
            </div>

        </div>
    );
}

export default Page2;
