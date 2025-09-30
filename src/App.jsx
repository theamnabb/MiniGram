// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";


// import Index from "./pages/Index";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Feed from "./pages/Feed";
// import Profile from "./pages/Profile";
// import Notifications from "./pages/Notifications";
// import NotFound from "./pages/NotFound";
// import Search from "./pages/Search";
// import Messages from "./pages/Messages";

// import { UserData } from "@/context/UserContex"; // your context

// function App() {
//   const { loading, isAuth } = UserData(); // get auth state from context

//   const handleLogin = () => {
    
//   };

//   const handleLogout = () => {
    
//   };

//   const handleRegister = () => {
    
//   };

//   if (loading) {
//     // Show loader while checking auth
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <Router>
//       <div className="min-h-screen bg-background">
//         <Routes>
//           {/* Default route → redirect to /login */}
//           <Route path="/" element={<Navigate to="/login" replace />} />

//           {/* Auth routes */}
//           <Route
//   path="/login"
//   element={
//     isAuth && !location.state?.fromRegister
//       ? <Navigate to="/feed" replace />
//       : <Login onLogin={handleLogin} />
//   }
// />

//          <Route
//   path="/register"
//   element={<Register onRegister={handleRegister} />}
// />


//           {/* Protected routes */}
//           <Route
//             path="/feed"
//             element={
//               isAuth ? (
//                 <Feed onLogout={handleLogout} />
//               ) : (
//                 <Navigate to="/login" replace />
//               )
//             }
//           />
//           <Route
//             path="/profile"
//             element={
//               isAuth ? (
//                 <Profile onLogout={handleLogout} />
//               ) : (
//                 <Navigate to="/login" replace />
//               )
//             }
//           />
//           <Route
//             path="/notifications"
//             element={
//               isAuth ? (
//                 <Notifications onLogout={handleLogout} />
//               ) : (
//                 <Navigate to="/login" replace />
//               )
//             }
//           />
//           <Route
//             path="/messages"
//             element={
//               isAuth ? (
//                 <Messages onLogout={handleLogout} />
//               ) : (
//                 <Navigate to="/login" replace />
//               )
//             }
//           />
//           <Route
//             path="/search"
//             element={
//               isAuth ? <Search /> : <Navigate to="/login" replace />
//             }
//           />

//           {/* 404 fallback */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { UserData } from "@/context/UserContex";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Messages from "./pages/Messages";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";

function AppRoutes() {
  const { isAuth, loading } = UserData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Auth routes */}
      <Route path="/login" element={isAuth ? <Navigate to="/feed" replace /> : <Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes */}
      <Route path="/feed" element={isAuth ? <Feed /> : <Navigate to="/login" replace />} />
      <Route path="/profile" element={isAuth ? <Profile /> : <Navigate to="/login" replace />} />
      <Route path="/notifications" element={isAuth ? <Notifications /> : <Navigate to="/login" replace />} />
      <Route path="/messages" element={isAuth ? <Messages /> : <Navigate to="/login" replace />} />
      <Route path="/search" element={isAuth ? <Search /> : <Navigate to="/login" replace />} />

      {/* 404 fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

