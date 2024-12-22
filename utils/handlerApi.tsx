import apiClient from "@/app/api-client";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { parseCookies,setCookie } from "nookies";


export async function login(form:any){

    try 
    {

        // NEXT JS API
        /*
            const config = {
                method: "POST",
                headers: { "Content-type": "application/json" },
                // body: JSON.stringify({ pseudo: form.pseudo, password: form.password }) // Next JS API
                // body: JSON.stringify({ pseudo:"user2024",password:"Bonjour2024"}) 
            }
            const response = await fetch("http://localhost:3000/api/auth/login", config) // Next JS API
            const result = await response.json();
            
            if(!response.ok) 
            {
                return {success:false}
            }
            else
            {
                // Successfully
                if(result.isConnected)
                {
                    return {success:true,isConnected:true}
                }
                // Invalid username
                else if(result.invalid_username) 
                {
                    return {success:false,invalid_username:true}
                }
                // Invalid password
                else if(result.invalid_password) 
                {
                    return {success:false,invalid_password:true}
                }
                // Unknow error
                else 
                {
                    return { success:false}
                }
            }
        */

        // DJANGO API

        const data = {username: form.pseudo, password: form.password}
        const response = await apiClient.post("http://localhost:8000/api/login",data) 

        console.log(response.data)
        
        if(!response.data?.access_token) 
        {
            return {success:false}
        }
        else
        {
            // Successfully
            if(response?.data?.access_token)
            {
                return {
                    success:true,
                    isConnected:true,
                    access:response?.data?.access_token,
                    refresh:response?.data?.refresh_token
                }
            }
            else 
            {
                return { success:false}
            }
        }

    } 
    catch(error) 
    {
        return {success:false}
    }


}


export async function logout(){
    const response = await apiClient.post("http://localhost:8000/api/logout")
    if(response.status == 200) return {success:true}
}


