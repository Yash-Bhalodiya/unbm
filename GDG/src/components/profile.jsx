import React from "react";
import profilePic from "../assets/6997676.png"; 
import ProfileNavbar from "./profilenav"; // Navbar on top

export default function Profile() {
  return (
    <>
      <ProfileNavbar /> {/* Top Navbar */}
      
      <div className="flex justify-center items-center h-screen bg-gray-100 pt-20">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl flex gap-10">
          
          {/* Left: Profile Picture */}
          <div className="w-1/3 flex justify-center items-center">
            <img
              src={profilePic}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-gray-300"
            />
          </div>

          {/* Right: User Info */}
          <div className="w-2/3">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">User Profile</h2>

            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">Username</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                placeholder="john.doe@example.com"
                disabled
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                placeholder="********"
                disabled
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm text-gray-600 mb-1">Change Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter new password"
              />
            </div>

            <div className="flex justify-between gap-4">
              <button className="bg-lime-600 text-white px-6 py-2 rounded hover:bg-lime-700">
                Update Password
              </button>
              <button className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
