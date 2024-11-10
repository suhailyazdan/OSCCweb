import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
const axios = require("axios");

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",  // Forces Google to show the login screen every time
          access_type: "offline",  // Ensures a fresh token each time
          response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.SECRET,

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        
        try {
          // Send a request to the Express API to save the user
          await axios.post("https://osc-cweb-backend.vercel.app/api/saveUser", {
            email: user.email,
            name: user.name,
            image: user.image,
          });
        } catch (error) {
          console.error("Failed to save user:", error);
        }
        return true;
      }
      return false;
    },

    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
