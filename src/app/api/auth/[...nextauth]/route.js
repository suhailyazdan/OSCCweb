import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

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
        // You can add any custom logic here if needed
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
