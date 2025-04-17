import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import pool from "@/lib/db";
import { getUserPermissions } from "@/lib/permissions";

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email", required: true },
                password: { label: "Password", type: "password", required: true },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing email or password");
                }
              
                try {
                    // Get user from database with role
                    const [users] = await pool.query(`
                        SELECT u.*, r.name as role_name
                        FROM users u
                        JOIN roles r ON u.role_id = r.id
                        WHERE u.email = ?
                    `, [credentials.email]);

                    if (users.length === 0) {
                        throw new Error("Invalid credentials");
                    }

                    const user = users[0];

                    // Verify password
                    const isValid = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );
                    console.log(credentials,isValid);
                    if (!isValid) {
                        throw new Error("Invalid credentials");
                    }

                    // Get user permissions
                    const permissions = await getUserPermissions(user.id);

                    // Return user data without password
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role_name,
                        permissions: permissions
                    };
                } catch (error) {
                    console.error("Login error:", error.message);
                    throw new Error("Login failed. Please try again.");
                }
            },
        }),
    ],

    session: {
        strategy: 'jwt',
    },

    pages: {
        signIn: '/login',
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.permissions = user.permissions;
            }
            return token;
        },

        async session({ session, token }) {
            session.user = {
                ...session.user,
                id: token.id,
                role: token.role,
                permissions: token.permissions
            };
            return session;
        },
    },
};

export default NextAuth(authOptions);
