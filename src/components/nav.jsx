import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Navbar */}
      <nav className="h-16 w-screen bg-[#d8dbe2] flex z-10 items-center justify-between px-5 pr-5 rounded-b-md md:fixed fixed top-0">
        <h2 className="font-bold text-2xl">Urban Nexus</h2>
        <div className="h-16 flex items-center gap-8 text-2xl">
          <i className="fa-solid fa-magnifying-glass md:visible invisible"></i>
          <i className="fa-solid fa-user md:visible invisible"></i>
          <i
            className="fa-solid fa-bars visible md:invisible cursor-pointer"
            onClick={() => setIsOpen(true)}
          ></i>
        </div>
      </nav>

      {/* Sliding Popup */}
      <div
        className={`fixed top-0 right-0 h-screen w-2/3 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-20 rounded-l-lg`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4 left-48 text-3xl absolute">
          <i
            className="fa-solid fa-times text-2xl cursor-pointer"
            onClick={() => setIsOpen(false)}
          ></i>
        </div>
        
        {/* Popup Content */}
        <div className="flex flex-col items-start gap-6 mt-20 px-6 text-2xl ">
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-magnifying-glass"></i>
            <span>Search</span>
          </div>
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-user"></i>
            <span>Login</span>
          </div>
        </div>
      </div>

      {/* Overlay to Close Popup */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-10"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
}
