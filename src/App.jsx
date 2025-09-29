import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search"; 
import Messages from "./pages/Messages"; // ✅ Import Messages component

import { UserData } from "@/context/UserContex"; // Make sure this is your context

function App() {
  const { loading, isAuth, user } = UserData(); // get auth state from context

  const handleLogin = () => {
    // optional, context should manage it
  };

  const handleLogout = () => {
    // optional, context should manage it
  };

  const handleRegister = () => {
    // optional, context should manage it
  };

  if (loading) {
    // Show loader while checking auth
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route 
            path="/login" 
            element={
              isAuth ? <Navigate to="/feed" replace /> : <Login onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/register" 
            element={
              isAuth ? <Navigate to="/feed" replace /> : <Register onRegister={handleRegister} />
            } 
          />
           <Route path="/messages" element={<Messages onLogout={handleLogout} />} /> {/* ✅ Added Messages Route */}
            <Route path="/search" element={<Search />} />
          <Route 
            path="/feed" 
            element={
              isAuth ? <Feed onLogout={handleLogout} /> : <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/profile" 
            element={
              isAuth ? <Profile onLogout={handleLogout} /> : <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/notifications" 
            element={
              isAuth ? <Notifications onLogout={handleLogout} /> : <Navigate to="/login" replace />
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
