
import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const UserContext = createContext();

export const UserContextProvider = ({children}) =>{

    const [user, setUser] = useState([]);
    const [isAuth,setIsAuth] = useState(false);
    const [loading, setIsLoading] = useState(true);

async function registerUser(data) {
  try {
    const response = await axios.post("/api/auth/register", data); // JSON automatically
    toast.success(response.data.message);
    setIsAuth(true);
    setUser(response.data.user);
    return true;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Registration failed");
    return false;
  }
}




    



    async function loginUser(email,password) {
        try {
            const { data} = await axios.post("/api/auth/login",{email,password})
            toast.success(data.message);
            setIsAuth(true)
            setUser(data.user)
           return true
        } catch (error) {
            toast.error(error.response.data.message || "Login failed")
            return false;
        }
        
    }

    async function fetchUser() {
        try {
            const {data} = await axios.get('/api/user/me')
            setUser(data)
            setIsAuth(true);
            setIsLoading(false)
            
        } catch (error) {
            console.log(error)
            setIsAuth(false)
            setIsLoading(false)
            
        }
    }

//   async function logoutUser(){
//     try {
//         const {data} = await axios.get('/api/auth/logout')
//         if(data.message){
//             toast.success(data.message);
//             setUser([])
//             setIsAuth(false);
           
//         }
        
//     } catch (error) {
//         toast.error(error.response.data.message)
        
//     }
//   }


    useEffect(() =>{
        fetchUser()
    },[])


    return (
        <UserContext.Provider value={{loginUser,isAuth,user,setUser,loading,registerUser}}>
            {children} <Toaster/>
        </UserContext.Provider>
    )

}

export const UserData = () => useContext(UserContext)