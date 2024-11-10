import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent", // Forces Google to show the login screen every time
          access_type: "offline", // Ensures a fresh token each time
          response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.SECRET,

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        try {
          // Send a request to the Express API to save the user with only email and name
          await axios.post("https://osc-cweb-backend.vercel.app/api/saveUser", {
            email: user.email,
            name: user.name
          });
        } catch (error) {
          console.error("Failed to save user:", error);
          return false; // Return false to prevent login if saving fails
        }
      }
      return true; // Continue with login if successful
    },

    async session({ session, token }) {
      session.user.id = token.sub; // Attach user ID to session
      return session;
    },

    async jwt({ token, account }) {
      if (account) {
        token.sub = account.providerAccountId; // Store Google user ID in token on initial login
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
