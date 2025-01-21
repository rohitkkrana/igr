import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function getData(req) {
  try {
    // Ensure environment variables are set
    const nextAuthSecret = process.env.NEXTAUTH_SECRET;
    const apiUrl = process.env.API_URL;

    if (!nextAuthSecret || !apiUrl) {
      return NextResponse.json(
        { error: "Server misconfiguration: Missing environment variables." },
        { status: 500 }
      );
    }

    // Retrieve the token from the request
    const token = await getToken({
      req,
      secret: nextAuthSecret,
    });

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get page number from query params (defaults to 1 if not provided)
    const page = req.nextUrl.searchParams.get('page') || '1';

    // Make API request with dynamic page number
    const response = await fetch(`${apiUrl}/igr?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.accessToken}`, // Use the access token from the JWT
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data", details: await response.text() }, // Added details for debugging
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error("Error in api/igr/igr.js getData function:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
