import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";
// import { Toaster } from "./components/ui/toaster";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleRegister = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          {/* <Route path="/" element={<Index />} /> */}
          <Route 
            path="/login" 
            element={
              isAuthenticated ? 
              <Navigate to="/feed" replace /> : 
              <Login onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/register" 
            element={
              isAuthenticated ? 
              <Navigate to="/feed" replace /> : 
              <Register onRegister={handleRegister} />
            } 
          />
          <Route 
            path="/feed" 
            element={
              isAuthenticated ? 
              <Feed onLogout={handleLogout} /> : 
              <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/profile" 
            element={
              isAuthenticated ? 
              <Profile onLogout={handleLogout} /> : 
              <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/notifications" 
            element={
              isAuthenticated ? 
              <Notifications onLogout={handleLogout} /> : 
              <Navigate to="/login" replace />
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* <Toaster /> */}
      </div>
    </Router>
  );
}

export default App;