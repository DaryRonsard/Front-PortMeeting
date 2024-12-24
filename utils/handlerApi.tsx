import axios from "axios";
import apiClient from "@/utils/api-client";
import { jwtDecode } from "jwt-decode";
import { parseCookies,setCookie,destroyCookie} from "nookies";


export async function login(form:{pseudo:string,password:string}){

    try 
    {
        // DJANGO API
        const data = {username: form.pseudo, password: form.password}
        const response = await axios.post("http://localhost:8000/generate_token/",data) 

        // console.log(response.data)
        
        if(!response.data?.access)
        {
            return {success:false}
        }
        else
        {
            return {
                success:true,
                isConnected:true,
                access:response?.data?.access,
                refresh:response?.data?.refresh
            }
        }

    } 
    catch(error) 
    {
        return {success:false}
    }

}


export async function logout(){
    // const response = await apiClient.post("http://localhost:8000/logout")
    // if(response.status == 200) return {success:true}
    // destroyCookie(null,"access_token")
    return {success:true}
}


