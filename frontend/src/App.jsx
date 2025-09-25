import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Claims from "./pages/Claims";
import AIInsights from "./pages/AIInsights";
import Map from "./pages/Map";
import Reports from "./pages/Reports";

function App() {
  return (
    <Router>
      <nav className="p-4 bg-gray-800 text-white flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/claims">Claims</Link>
        <Link to="/ai-insights">AI Insights</Link>
        <Link to="/map">Map</Link>
        <Link to="/reports">Reports</Link>
      </nav>
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/claims" element={<Claims />} />
          <Route path="/ai-insights" element={<AIInsights />} />
          <Route path="/map" element={<Map />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
