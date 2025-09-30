


import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const UserContext = createContext();
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setIsLoading] = useState(true); // true until we check auth

  // Fetch current user from backend to check auth
  async function fetchUser() {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/me`, { withCredentials: true });
      setUser(data);
      setIsAuth(true);
    } catch (error) {
      setIsAuth(false);
      setUser(null);
    } finally {
      setIsLoading(false); // auth check complete
    }
  }

  // Register user (do NOT auto-login)
  async function registerUser(data) {
    try {
      const response = await axios.post(`${backendUrl}/api/auth/register`, data);
      toast.success(response.data.message);
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Registration failed");
      return false;
    }
  }

  // Login user
  async function loginUser(email, password) {
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/login`, { email, password }, { withCredentials: true });
      toast.success(data.message);
      setIsAuth(true);
      setUser(data.user);
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
      return false;
    }
  }

  // Logout user
  async function logoutUser() {
    try {
      await axios.get(`${backendUrl}/api/auth/logout`, { withCredentials: true });
      setIsAuth(false);
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error?.response?.data?.message || error.message);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, isAuth, loading, registerUser, loginUser, logoutUser }}>
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
