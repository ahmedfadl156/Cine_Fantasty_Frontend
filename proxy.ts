import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest){
    const token = request.cookies.get("cineFantasty_Jwt")?.value;

    const isProtectedRoute = request.nextUrl.pathname.startsWith('/admin')
    || request.nextUrl.pathname.startsWith("/dashboard");

    const isAuthRoute = request.nextUrl.pathname.startsWith("/login")
    || request.nextUrl.pathname.startsWith("/signup");

    if(isProtectedRoute && !token){
        return NextResponse.redirect(new URL("/login" , request.url))
    }

    if(isAuthRoute && token) {
        return NextResponse.redirect(new URL("/" , request.url))
    }

    return NextResponse.next();
}