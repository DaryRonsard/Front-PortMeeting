

export async function login(form: any){

    const config = {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ pseudo: form.pseudo, password: form.password })
        // body: JSON.stringify({ pseudo:"user2024",password:"Bonjour2024"})
    }

    try {

        const response = await fetch("http://localhost:3000/api/auth/login", config)
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

    } 
    catch (error) {
        return {success:false}
    }


}

export async function  getUtilisateurs(){

    let utilisateurs: any = [];
    const response = await fetch("http://localhost:3000/api/utilisateurs")
    const result = await response.json();
    if (response.ok) {
        utilisateurs = result.data
    }
    return utilisateurs

}

export async function logout(){
    const response = await fetch("http://localhost:3000/api/auth/logout",{method:"POST"})
    const result = await response.json()
    if(response.ok) return result
}