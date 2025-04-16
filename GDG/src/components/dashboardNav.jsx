import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function DashboardNav() {
  return (
    <div>
      <nav className="h-16 w-screen bg-[#424242] flex items-center justify-between px-5 fixed top-0 text-white">
        <Link to="/">
        <h2 className="text-2xl font-bold text-[#F5F5F5]">Urban Nexus</h2>

        </Link>
       
        <div className="h-16 flex items-center gap-8 text-2xl">
          <Link to="/profile">
            <i className="fa-solid fa-user md:visible invisible cursor-pointer"></i>
          </Link>
        </div>
      </nav>
      {/* Add margin below the navbar */}
      <div className="mt-16"></div>
    </div>
  );
}