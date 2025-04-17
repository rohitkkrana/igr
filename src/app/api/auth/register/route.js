import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import pool from "@/lib/db";

export async function POST(req) {
  try {
    // Get the request body
    const body = await req.json();
    const { email, password, name, roleName = 'user' } = body;

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get role ID
    const [roles] = await pool.query(
      'SELECT id FROM roles WHERE name = ?',
      [roleName]
    );

    if (roles.length === 0) {
      return NextResponse.json(
        { error: "Invalid role" },
        { status: 400 }
      );
    }

    const roleId = roles[0].id;

    // Check if user already exists
    const [existingUsers] = await pool.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, role_id) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, roleId]
    );

    // Get user permissions
    const [permissions] = await pool.query(`
      SELECT DISTINCT p.name, p.module
      FROM permissions p
      JOIN role_permissions rp ON p.id = rp.permission_id
      WHERE rp.role_id = ?
    `, [roleId]);

    return NextResponse.json({
      message: "User registered successfully",
      userId: result.insertId,
      role: roleName,
      permissions: permissions
    });

  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 