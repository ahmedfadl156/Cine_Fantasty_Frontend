import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest){
    const token = request.cookies.get("cineFantasty_Jwt")?.value;

    const isProtectedRoute = request.nextUrl.pathname.startsWith('/admin')
    || request.nextUrl.pathname.startsWith("/dashboard");

    const isAuthRoute = request.nextUrl.pathname.startsWith("/login")
    || request.nextUrl.pathname.startsWith("/signup");

    if(isAuthRoute && token) {
        return NextResponse.redirect(new URL("/" , request.url))
    }

    if(isProtectedRoute && !token){
        return NextResponse.redirect(new URL("/login" , request.url))
    }

    if(isProtectedRoute && token){
        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            const {payload} = await jwtVerify(token , secret);

            if(payload.role !== "admin"){
                return NextResponse.redirect(new URL("/" , request.url));
            }
        } catch (error) {
            console.error("Invalid token in middleware:", error);
            
            const response = NextResponse.redirect(new URL("/login", request.url));
            response.cookies.delete("cineFantasty_Jwt");
            return response;
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/dashboard/:path*', '/login', '/signup'],
};