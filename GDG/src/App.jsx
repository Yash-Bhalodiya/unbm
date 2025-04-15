import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./index.css";
import "./App.css";

import NAV from "./components/nav";
import DashboardNav from "./components/dashboardNav";
import LANDING from "./components/landing";
import Page2 from "./components/page2";
import Page3 from "./components/page3";
import Dashboard from "./components/dashboard";
import Signup from "./components/signUp";
import Login from "./components/login"; // ✅ new import for Login page
import Profile from "./components/profile";

function Layout() {
  const location = useLocation();

  // Define which paths use DashboardNav
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <div className="overflow-x-hidden">
      {/* Render conditional Navbar */}
      {isDashboard ? <DashboardNav /> : <NAV />}

      <Routes>
        {/* 🏠 Landing Pages */}
        <Route
          path="/"
          element={
            <>
              
              <LANDING />
              <Page2 />
              <Page3 />
            </>
          }
        />

        {/* 🔐 Auth Pages */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />

        {/* 📊 Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
