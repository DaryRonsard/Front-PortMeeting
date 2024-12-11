

export const login = async (form: any) => {

    const config = {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ pseudo: form.pseudo, password: form.password })
        // body: JSON.stringify({ pseudo:"user2024",password:"Bonjour2024"})
    }

    try {
        const response = await fetch("http://localhost:3000/api/auth/login", config)
        const result = await response.json();
    
        console.log(result)
    
        if (result.success) {
            return { message: result.message, success: result.success }
        }
        else {
            return { message: "Nom utilisateur ou mot de passe invalid", success: false }
        }
        
    } catch (error) {
        return { message: "Désolé, le serveur n'arrive pas à traiter votre requête !", success: false }
    }


}


export const getUtilisateurs = async () => {

    let utilisateurs: any = [];
    const response = await fetch("http://localhost:3000/api/utilisateurs")
    const result = await response.json();
    if (response.ok) {
        utilisateurs = result.data
    }
    return utilisateurs

}