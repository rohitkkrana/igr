import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
                    const res = await fetch(`${process.env.API_URL}/api/login/`, {
                        method: 'POST',
                        headers: { 
                            'Content-Type': 'application/json',
                            "Authorization": "Basic YWRtaW46YWRtaW4=" 
                        },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password
                        }),
                    });

                    if (!res.ok) {
                        throw new Error("Invalid credentials");
                    }

                    const user = await res.json();

                    if (user?.access && user?.refresh) {
                        return {
                            accessToken: user.access,
                            refreshToken: user.refresh,
                        };
                    }
                    
                    throw new Error("Invalid response from server");
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
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
            }
            return token;
        },

        async session({ session, token }) {
            session.user = {
                ...session.user,
                accessToken: token.accessToken,
                refreshToken: token.refreshToken,
            };
            return session;
        },
    },
};

export default NextAuth(authOptions);
