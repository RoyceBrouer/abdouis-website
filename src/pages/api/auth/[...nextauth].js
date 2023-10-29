import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { username, password } = credentials;

        const adminUsername = process.env.ADMIN_USERNAME;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (username === adminUsername && password === adminPassword) {
          return Promise.resolve({ name: "admin" });
        } else {
          return Promise.resolve(null);
        }
      },
    }),
  ],
  session: {
    jwt: true, //enabling JSON Web Tokens
    strategy: "jwt",
    secret: process.env.AUTH_SECRET,
    maxAge: 2 * 60 * 60, //in seconds (2 hours)
    updateAge: 30 * 60, //in seconds (30 minutes)
  },
  pages: {
    signIn: "/admin",
    signOut: "/admin",
  },
  callbacks: {
    async session(session) {
      session.user.name = "Admin";
      return session;
    },
  },
};

export default NextAuth(authOptions);
