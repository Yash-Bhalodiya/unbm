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
  <Route
    path="/"
    element={
      <>
        <LANDING />
        <Page2 /> {/* Render Page2 below LANDING */}
        <Page3 /> {/* Render Page3 below Page2 */}
      </>
    }
  />

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
