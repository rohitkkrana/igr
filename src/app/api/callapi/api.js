import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function getData(req) {
  try {
    // Retrieve the token from the request
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Parse the request body
    const body = await req.json(); // Extract request body
    console.log(body);

    // Make API request with dynamic URI and method
    const response = await fetch(`${process.env.API_URL}${body.uri}`, {
      method: body.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.accessToken}`, // Use the access token from the JWT
      },
      body: body.method === "POST" ? JSON.stringify(body.data) : undefined, // Only send body for POST requests
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error("Error in getData function:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
