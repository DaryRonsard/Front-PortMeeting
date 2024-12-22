"use client"

import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import apiClient from "./api-client";
import { useRouter } from "next/navigation";


const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }:any) => {

    const router = useRouter()

    const token = localStorage.getItem("access_token") || null
    const decoded = token ? jwtDecode(token) : null;
    const [user,setUser] = useState(decoded || null);


    const login = async (data:any) => {
        console.log(data)
        localStorage.setItem("refresh_token",data.refresh)
        localStorage.setItem("access_token",data.access)
        const token_decoded = jwtDecode(data.access)
        setUser(token_decoded || null)
        router.push("/dashboard")
    }

    const logout = async () => {
        // Axios Config
        const response = await apiClient.post("http://localhost:8000/api/logout")
        console.log(response.data)
        if(response.status == 200)
        {
            setUser(null)
            localStorage.removeItem("access_token")
            localStorage.removeItem("refresh_token")
            router.push("/login")
        }
    }

    useEffect(() => {
        if(!user)        
        {
            router.push("/login")
        }
        else
        {
            router.push("/dashboard")
        }
    }, [router]);


    const authContextValue:any = {
        user,
        setUser,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    )

};

export const useAuth = () => {
    return useContext(AuthContext)
}