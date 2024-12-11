import { NextRequest, NextResponse } from "next/server";


export async function middleware(request: NextRequest) {

    // /*
    // Clonage de l'url de la page en cours
    const url = request.nextUrl.clone();

    // Récupération du token depuis un cookie
    let authToken: string | undefined | null = request.cookies.get('accessToken')?.value;
 
    // Décodage du token
    authToken = authToken ? Buffer.from(authToken,"base64").toString("utf8") : null

    if(!authToken) 
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

        if (url.pathname === '/login') {
            url.pathname = "/dashboard";
            return NextResponse.redirect(url);
        }

        return NextResponse.next();

    }

    // */

}


// Configuration du matcher dans le middleware, pour spécifier les pages protégées
export const config = {
    matcher: [
        '/dashboard',  // User protected routes
        // '/auth-supabase/admin/:path*', // Admin protected routes
        // '/auth-supabase/admin/:path*', // Admin protected routes
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
    ],
};



