import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function DashboardNav() {
  return (
    <div>
      <nav className="h-16 w-screen bg-blue-600 flex items-center justify-between px-5 fixed top-0 text-white">
        <h2 className="font-bold text-2xl">Dashboard</h2>
        <div className="h-16 flex items-center gap-8 text-2xl">
          <Link to="/">
            <i className="fa-solid fa-arrow-left cursor-pointer"></i> {/* Back to Home */}
          </Link>
          <i className="fa-solid fa-cog cursor-pointer"></i> {/* Settings */}
          <i className="fa-solid fa-user cursor-pointer"></i> {/* Profile */}
        </div>
      </nav>
      {/* Add margin below the navbar */}
      <div className="mt-16"></div>
    </div>
  );
}