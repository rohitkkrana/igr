import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          // Here you would typically:
          // 1. Validate the credentials
          // 2. Check against your database
          // 3. Return the user object if valid
          
          // For now, we'll use a simple check
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Please enter an email and password');
          }

          // This is a placeholder - replace with your actual database check
          const user = {
            id: "1",
            email: credentials.email,
            name: "Admin User",
            role: "admin"
          };

          // In a real app, you would verify the password here
          // const isValid = await compare(credentials.password, user.password);
          // if (!isValid) throw new Error('Invalid password');

          return user;
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
}; 