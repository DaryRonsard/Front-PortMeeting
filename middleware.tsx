import { NextRequest, NextResponse } from "next/server";


export async function middleware(request: NextRequest) {


    // Clonage de l'url de la page en cours
    const url = request.nextUrl.clone();

    // Récupération du token depuis un cookie
    let accessToken: any = request.cookies.get('accessToken')?.value;
 
    // Décodage du token
    accessToken = accessToken ? JSON.parse(Buffer.from(accessToken,"base64").toString("utf8")) : null


    if(!accessToken) 
    {

        // Autoriser l'accès aux pages publiques comme 'sign-in'
        if (url.pathname === '/login') {
            return NextResponse.next();
        }
        
        // Accès non autorisé pour les utilisateurs non authentifié
        if (url.pathname.startsWith('/dashboard') || url.pathname.startsWith('/user') || url.pathname.startsWith('/admin')) {
            url.pathname = '/home';
            return NextResponse.redirect(url);
        }
        
    }
    else 
    {

        const now = Date.now(); // l'heure actuelle en millesecondes

        // Gestion du refresh token
        if(accessToken.expiresAt - now < 20 * 60 * 1000)  // Moins de 20 minutes restantes
        { 

            const response = NextResponse.next();

            const newExpiresAt = now + 30 * 60 * 1000; // Prolonge de 30 minutes

            const newAccessToken = Buffer.from(JSON.stringify({...accessToken,expiresAt:newExpiresAt})).toString('base64')
            
            response.cookies.set('accessToken',newAccessToken, {
              httpOnly: true,
              path: '/',
              sameSite: "lax",
              secure: process.env.NODE_ENV === 'production' ? true : true,
              maxAge: 2 * 3600, // égal à  2 * 60 * 60 = 2 heures 
            });

            return response
            
        }
        else
        {

            if (url.pathname === '/login') {
                url.pathname = "/dashboard";
                return NextResponse.redirect(url);
            }

        }


    }

}


// Configuration du matcher dans le middleware, pour spécifier les pages protégées
export const config = {
    matcher: [
        '/home', 
        '/dashboard', 
        // '/admin/:path*', // Admin protected routes
        // '/admin/:path*', // Admin protected routes
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
    ],
};



