import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./index.css";
import "./App.css";
import NAV from "./components/nav";
import DashboardNav from "./components/dashboardNav"; 
import LANDING from "./components/landing";
import Page2 from "./components/page2";
import Page3 from "./components/page3";
import Dashboard from "./components/dashboard"; 

function Layout() {
  const location = useLocation();

  return (
    <div className="overflow-x-hidden">
      {/* Render different Navbars based on route */}
      {location.pathname === "/dashboard" ? <DashboardNav /> : <NAV />}

      <Routes>
        <Route path="/" element={<LANDING />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* FIXED */}
        <Route path="/page2" element={<Page2 />} />
        <Route path="/page3" element={<Page3 />} />
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
