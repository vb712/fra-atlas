import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Claims from "./pages/Claims.jsx";
import AIInsights from "./pages/AIInsights.jsx";
import Map from "./pages/Map.jsx";
import Reports from "./pages/Reports.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import NewClaim from "./pages/NewClaim.jsx";
import Status from "./pages/Status.jsx";
import Digitalise from "./pages/Digitalise.jsx";
import Help from "./pages/Help.jsx";
import About from "./pages/About.jsx";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PublicRoute from "./components/PublicRoute.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/map" element={<Map />} />
              <Route path="/help" element={<Help />} />
              <Route path="/about" element={<About />} />

              <Route element={<PublicRoute redirectTo="/" />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>

              <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
                <Route path="/new-claim" element={<NewClaim />} />
                <Route path="/status" element={<Status />} />
                <Route path="/digitalise" element={<Digitalise />} />
              </Route>

              <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/claims" element={<Claims />} />
                <Route path="/ai-insights" element={<AIInsights />} />
                <Route path="/reports" element={<Reports />} />
              </Route>

              <Route path="*" element={<Home />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
