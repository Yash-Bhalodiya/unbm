import React from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function ProfileNavbar() {
  return (
    <nav className="w-full h-16 bg-white shadow-md flex items-center justify-between px-6 fixed top-0 z-50">
      {/* Logo / Brand */}
      <Link to="/">
      <h2 className="text-2xl font-bold text-gray-800">Urban Nexus</h2>
      </Link> 

      {/* Right Side */}
      <div className="flex items-center gap-6 text-lg">
        {/* Dashboard Link */}
        <Link to="/" className="text-gray-600 hover:text-lime-600 transition ">
          <i className="fas fa-home mr-1"></i> 
        </Link>
        <Link to="/dashboard" className="text-gray-600 hover:text-lime-600 transition" >
          <i className="fa-solid fa-location-dot"></i>
        </Link>
      </div>
    </nav>
  );
}
