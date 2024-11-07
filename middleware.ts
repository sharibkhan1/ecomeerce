import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from "./routes";

const {auth} = NextAuth(authConfig);
export default auth((req) => {
    const {nextUrl} = req;
    const isLoggingIn = !!req.auth;
    publicRoutes:["/api/:path*"];
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if(isApiAuthRoute){
        return;
    }
    
    if(isAuthRoute){
        if(isLoggingIn){
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT,nextUrl))
        }
        return;
    }

    if(!isLoggingIn && !isPublicRoute ){
        let callbackUrl = nextUrl.pathname;
        if(nextUrl.search){
            callbackUrl += nextUrl.search;
        }
        const encodedCallBackUrl = encodeURIComponent(callbackUrl);
        
        return Response.redirect(new URL(`/auth/login?callbackUrl=${encodedCallBackUrl}`,nextUrl));
    }
    return ;
})

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)",'/', "/(api|trpc)(.*)"], // Applies to all dynamic routes except for static files and _next folder
}