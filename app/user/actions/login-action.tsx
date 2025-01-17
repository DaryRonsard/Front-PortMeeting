"use server"


export async function LoginAction(prevState: any,formData:FormData) {

    const pseudo = formData.get("pseudo") as string
    const password = formData.get("password") as string

    const config = {
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({pseudo,password})
    }

    // Laravel API
    const response =  await fetch("http://127.0.0.1:8000/api/login",config)
    const result = await response.json();

    if(response.ok)
    {
        
        return {
            message:result.message,
            isConnected:true,
            accessToken:result.accessToken,
            data:result.userInfo
        }
    }
    else
    {
        return { message:'Nom utilisateur ou mot de passe invalid'};
    }

}