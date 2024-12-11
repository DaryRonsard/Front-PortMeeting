import db from "@/lib/mysql";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";


export async function POST(request:NextRequest) {

    const body = await request.json()

    const { pseudo, password } = body

    const [utilisateur]: any = await db.query("SELECT * FROM utilisateurs WHERE pseudo_utilisateur = ? ", [pseudo])

    if (utilisateur && utilisateur.length > 0) {

        // if(true) 
        if(await bcrypt.compare(password,utilisateur[0].password)) 
        {

            const userData = { 
                id_utilisateur: utilisateur[0].id, 
                pseudo_utilisateur: utilisateur[0].pseudo_utilisateur, 
                nom_utilisateur: utilisateur[0].nom_utilisateur, 
                prenom_utilisateur: utilisateur[0].prenom_utilisateur, 
                role: utilisateur[0].role_utilisateur 
            }

            const accessToken = Buffer.from(JSON.stringify(userData)).toString('base64')

            const response = NextResponse.json({
                success: true,
                message:"Connexion successfully !"
            })

            // Génération du Token de connexion via un cookie (authToken)
            response.cookies.set('accessToken', accessToken, {
                httpOnly: true,
                path: '/',
                sameSite: "lax",
                secure: true,
                maxAge: 3600, // 1 heure
                //secure: process.env.NODE_ENV === "production"
                // maxAge: 30 * 24 * 60 * 60, // 30 jours
            });

            return response;

        }
        else if (pseudo == utilisateur[0].pseudo_utilisateur && !await bcrypt.compare(password,utilisateur[0].password)) {
            return NextResponse.json({ invalid_password: true })
        }

    }
    else {
        return NextResponse.json({ invalid_username: true })
    }

}