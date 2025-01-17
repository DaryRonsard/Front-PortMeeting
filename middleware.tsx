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
            if (url.pathname.startsWith('/super-admin') || url.pathname.startsWith('/user') || url.pathname.startsWith('/admin') ) {
                url.pathname = '/home';
                return NextResponse.redirect(url);
            }
            
        }
        else 
        {

            const decoded:any = jwtDecode(accessToken)
            // console.log(decoded);

            if(url.pathname === '/login' || url.pathname == "/home") 
            {
            
                /*
                    if(decoded.role == "user")
                    {
                        url.pathname = "/user/dashboard"
                        return NextResponse.redirect(url);
                    }
                    else if(decoded.role == "admin")
                    {
                        url.pathname = "/admin/dashboard"
                        return NextResponse.redirect(url);
                    }
                    else if(decoded.role == "super_admin")
                    {
                        url.pathname = "/super-admin/dashboard"
                        return NextResponse.redirect(url);
                    }
                */

                if(decoded)
                {
                    switch(decoded?.role)
                    {
                        case "user":
                            url.pathname = "/user/dashboard"
                        break;
                        case "super_admin":
                            // url.pathname = "/super-admin/dashboard"
                            // url.pathname = "/admin/dashboard"
                            url.pathname = "/user/dashboard"
                        break;
                        case "admin":
                            url.pathname = "/admin/dashboard"
                        break;
                    }

                    return NextResponse.redirect(url);

                }
                
            }
            
            return NextResponse.next();
            
        }

    // */

}


// Configuration du matcher dans le middleware, pour spécifier les pages protégées
export const config = {
    matcher: [
        '/home:path*', 
        '/user:path*', 
        '/admin/:path*', 
        '/super-admin/:path*', 
        // '/user/:path*', // User protected routes
        // '/admin/:path*', // Admin protected routes
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
    ],
};



