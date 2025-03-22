import React from 'react';

const Nav = () => {
    return (
        <div>
            <nav className='h-16 w-screen bg-[#d8dbe2] flex  z-10 items-center justify-between px-5 pr-5 rounded-b-md fixed top-0'><h2 className='font-bold text-2xl'>Urban Nexus</h2> <div className='h-16 w-1/8 flex items-center justify-around gap-0.5 text-2xl '><i className="fa-solid fa-magnifying-glass md:visible invisible"></i><i className="fa-solid fa-user md:visible invisible"></i><i className="fa-solid fa-bars visible md:invisible  absolute"></i></div></nav>
        </div>
    );
}

export default Nav;
