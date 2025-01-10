import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {


    // Clonage de l'url de la page en cours
    const url = request.nextUrl.clone();


    // Récupération du token depuis un cookie
    let accessToken:any = request.cookies.get('access_token')?.value
    let refreshToken:any = request.cookies.get('refresh_token')?.value


    // /*
 
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

            const decoded = jwtDecode(accessToken)
            // console.log(decoded)

            if (url.pathname === '/login' || url.pathname == "/home") {
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
        '/home:path*', 
        '/dashboard:path*', 
        '/directions/:path*', 
        '/chat/:path*', 
        '/video/:path*', 
        // '/user/:path*', // User protected routes
        // '/admin/:path*', // Admin protected routes
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
    ],
};



