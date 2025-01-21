import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  // Allow requests for public resources and the login page
  if (
    pathname.startsWith("/api/auth") || // Authentication API routes
    pathname === "/public"              // Any additional public routes
  ) {
    return NextResponse.next();
  }

  const isTokenExpired = token ? Date.now() / 1000 > token.iat + 900 : true;

  if (token && !isTokenExpired && (
    pathname.startsWith(" ") ||
    pathname.startsWith("/login")
  )) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // Redirect unauthenticated users to the login page
  if (!token || isTokenExpired) {
    const loginUrl = new URL("/api/auth/signin", req.url);
    loginUrl.searchParams.set("callbackUrl", req.url); // Add callback for redirect after login
    return NextResponse.redirect(loginUrl);
  }

  // If authenticated, allow the request to proceed
  return NextResponse.next();
}

// Protect specific routes
export const config = {
  matcher: [
    "/",              // Protect this specific page
    "/admin/:path*",  // Protect all paths under /admin
    "/api/protected", // Protect this API route
  ],
};
