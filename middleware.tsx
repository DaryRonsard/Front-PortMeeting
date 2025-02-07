import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {

    // Clonage de l'url de la page en cours
    const url = request.nextUrl.clone();

    // Récupération du token depuis un cookie
    let accessToken:any = request.cookies.get('access_token')?.value
    // let refreshToken:any = request.cookies.get('refresh_token')?.value

    if(!accessToken) 
    {

        // Autoriser l'accès aux pages publiques (utilisateur non authentifié)
        if (url.pathname === '/login') 
        {
            return NextResponse.next();
        }
        
        // Accès non autorisé pour les utilisateurs non authentifié
        if (url.pathname.startsWith('/super-admin') || url.pathname.startsWith('/user') || url.pathname.startsWith('/admin') ) 
        {
            url.pathname = '/home';
            return NextResponse.redirect(url);
        }
        
    }
    else 
    {

        // Décodage du cookie (accessToken) pour une utilisation des données de l'utilisateur
        const decoded:any = jwtDecode(accessToken)
        // console.log(decoded);

        if(url.pathname === '/login' || url.pathname == "/home") 
        {
        
            switch(decoded?.role)
            {
                case "employe":
                    url.pathname = "/user/dashboard"
                break;
                case "super_admin":
                    url.pathname = "/super-admin/dashboard"
                break;
                case "secretaire":
                    url.pathname = "/admin/dashboard"
                break;
            }

            return NextResponse.redirect(url);
        
        }
        else
        {

            // Sécretaire
            if(decoded.role == "secretaire" && (url.pathname.startsWith('/super-admin') || url.pathname.startsWith('/user')))
            {
                url.pathname = "/401"
                return NextResponse.rewrite(url);
            }
            else if(decoded.role == "secretaire" && (url.pathname.startsWith('/admin')))
            {
                return NextResponse.next();
            }

            // Super Admin
            if(decoded.role == "super_admin" && url.pathname.startsWith('/super-admin'))
            {
                return NextResponse.next();
            }
            else if(decoded.role == "super_admin" && (url.pathname.startsWith('/admin') || url.pathname.startsWith('/user')))
            {
                url.pathname = "/401"
                return NextResponse.rewrite(url);
            }

            // Utilisateur
            if(decoded.role == "employe" && url.pathname.startsWith('/user'))
            {
                return NextResponse.next();
            }
            else if(decoded.role == "employe" && (url.pathname.startsWith('/super-admin') || url.pathname.startsWith('/admin')))
            {
                url.pathname = "/401"
                return NextResponse.rewrite(url);
            }

            return NextResponse.next();

        }
        
    }


}


// Configuration du matcher dans le middleware, pour spécifier les pages protégées
export const config = {
    matcher: [
        '/user:path*', 
        '/admin/:path*', 
        '/super-admin/:path*', 
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
    ],
};



