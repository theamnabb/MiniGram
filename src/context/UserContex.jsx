
// import { createContext, useContext, useEffect, useState } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import axios from "axios";

// const UserContext = createContext();
// const backendUrl = import.meta.env.VITE_BACKEND_URL;

// export const UserContextProvider = ({children}) =>{

//     const [user, setUser] = useState([]);
//     const [isAuth,setIsAuth] = useState(false);
//     const [loading, setIsLoading] = useState(true);
//     async function registerUser(data) {
//   try {
//     const response = await axios.post(`${backendUrl}/api/auth/register`, data); 
//     toast.success(response.data.message);
//     setIsAuth(true);
//     setUser(response.data.user);
//     return true;
//   } catch (error) {
//     toast.error(error?.response?.data?.message || "Registration failed");
//     return false;
//   }
// }

// async function loginUser(email, password) {
//   try {
//     const { data } = await axios.post(`${backendUrl}/api/auth/login`, { email, password });
//     toast.success(data.message);
//     setIsAuth(true);
//     setUser(data.user);
//     return true;
//   } catch (error) {
//     toast.error(error.response.data.message || "Login failed");
//     return false;
//   }
// }

// async function logoutUser() {
//   try {
//     await axios.get(`${backendUrl}/api/auth/logout`, { withCredentials: true });
//     setUser(null);
//     setIsAuth(false);
//     setIsLoading(false);
//   } catch (error) {
//     console.error("Logout failed:", error.response?.data?.message || error.message);
//   }
// }

// async function fetchUser() {
//   try {
//     const { data } = await axios.get(`${backendUrl}/api/user/me`, { withCredentials: true });
//     setUser(data);
//     setIsAuth(true);
//     setIsLoading(false);
//   } catch (error) {
//     console.log(error);
//     setIsAuth(false);
//     setIsLoading(false);
//   }
// }

// async function createPost(file, caption, type = "post") {
//   try {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("caption", caption);
//     formData.append("type", type);

//     const { data } = await axios.post(`${backendUrl}/api/post/new`, formData);
//     toast.success(data.message);
//     return data.post;
//   } catch (error) {
//     toast.error(error?.response?.data?.message || "Post creation failed");
//     return null;
//   }
// }





//     useEffect(() =>{
//         fetchUser()
//     },[])


//     return (
//         <UserContext.Provider value={{loginUser,isAuth,user,setUser,loading,registerUser,createPost,logoutUser}}>
//             {children} <Toaster/>
//         </UserContext.Provider>
//     )

// }

// export const UserData = () => useContext(UserContext)


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
