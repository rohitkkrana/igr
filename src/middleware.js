import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// Define role-based access control
const roleAccess = {
  admin: ['/admin', '/dashboard', '/api/admin'],
  manager: ['/dashboard', '/api/manager'],
  employee: ['/dashboard', '/api/employee'],
  user: ['/dashboard']
};

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  // Allow requests for public resources and the login page
  if (
    pathname.startsWith("/api/auth") || // Authentication API routes
    pathname === "/public" ||           // Any additional public routes
    pathname === "/login" ||            // Login page
    pathname === "/register"            // Registration page
  ) {
    return NextResponse.next();
  }

  const isTokenExpired = token ? Date.now() / 1000 > token.iat + 900 : true;

  // Redirect authenticated users away from login/register pages
  if (token && !isTokenExpired && (
    pathname === "/login" ||
    pathname === "/register"
  )) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Redirect unauthenticated users to the login page
  if (!token || isTokenExpired) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // Check role-based access
  const userRole = token.role || 'user';
  const allowedPaths = roleAccess[userRole] || [];

  // Check if the current path is allowed for the user's role
  const isPathAllowed = allowedPaths.some(path => 
    pathname.startsWith(path)
  );

  if (!isPathAllowed) {
    // Redirect to dashboard if user doesn't have access to the requested path
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // If authenticated and authorized, allow the request to proceed
  return NextResponse.next();
}

// Protect specific routes
export const config = {
  matcher: [
    "/",              // Protect root page
    "/admin/:path*",  // Protect all paths under /admin
    "/dashboard/:path*", // Protect all paths under /dashboard
    "/api/protected/:path*", // Protect protected API routes
    "/login",         // Protect login page
    "/register"       // Protect register page
  ],
};
