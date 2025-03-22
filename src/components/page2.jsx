import React from 'react';
import { motion } from "motion/react"
import Card from './card';

const Page2 = () => {
    return (
        <div className='h-screen w-screen relative text-white '>
            <motion.h2 initial={{opacity:0,y:10}} animate={{y:0}} whileInView={{opacity:100}} transition={{duration:1}} className='relative md:left-[26.5rem] left-10 text-2xl font-bold p-5  md:text-3xl top-20'>Drive Success with Comprehensive Functionality</motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 h-auto w-full">
  <Card 
    head="Advanced Dashboard & Analytics" 
    text="Real-time, comprehensive data can help your organization make informed site selection decisions and maximize your speed to market. Capture and combine key market insight data and review comprehensive dashboards with email notifications."
  />
  
  <Card 
    head="Automated Functionalities" 
    text="Manual processes can cause major problems with document version control and speed to market. Site selection software provides key automations such as electronic deal binders with automated distribution and automated workflows from site selection to development and project management."
  />
  
  <Card 
    head="Real Estate Planner and Target Monitoring" 
    text="Strategically plan for where you would like to expand in the future to support your mission. Set up different regions and markets in the tool to define real estate targets that may interest you and monitor these targets throughout the process."
  />
</div>


        </div>
    );
}

export default Page2;
