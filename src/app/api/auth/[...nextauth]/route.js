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
    async signIn({ account, profile }) {
      // Ensure that only Google accounts are allowed to sign in
      return account.provider === "google";
    },

    // async jwt({ token, user, account }) {
    //   // When user is defined (on first sign-in), store user info in token
    //   if (account && user) {
    //     token.email = user.email;
    //     token.name = user.name;
    //     token.image = user.image;

    //     try {
    //       // Send a request to the Express API to save the user data
    //       await axios.post("https://osc-cweb-backend.vercel.app/api/saveUser", {
    //         email: user.email,
    //         name: user.name,
    //         image: user.image,
    //       });
    //     } catch (error) {
    //       console.error("Failed to save user to MySQL:", error);
    //     }
    //   }
    //   return token;
    // },

    async jwt({ token, user, account }) {
      if (account && user) {
        console.log("User info to save:", user);  // Log user data
    
        try {
          // Send a request to the Express API to save the user data
          const response = await axios.post("https://osc-cweb-backend.vercel.app/api/saveUser", {
            email: user.email,
            name: user.name,
            image: user.image,
          });
          console.log("API response:", response.data);  // Log API response
        } catch (error) {
          console.error("Failed to save user to MySQL:", error);
        }
      }
      return token;
    },

    async session({ session, token }) {
      // Attach user info to session from token
      session.user.id = token.sub;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.image = token.image;
      return session;
    }
  }


  // callbacks: {
  //   async signIn({ account, profile }) {
  //     // Ensure that only Google accounts are allowed to sign in
  //     return account.provider === "google";
  //   },
  //   async signIn({ user, account, profile }) {
  //     if (account.provider === "google") {
        
  //       try {
  //         // Send a request to the Express API to save the user
  //         await axios.post("https://osc-cweb-backend.vercel.app/api/saveUser", {
  //           email: user.email,
  //           name: user.name,
  //           image: user.image,
  //         });
  //       } catch (error) {
  //         console.error("Failed to save user:", error);
  //       }
  //       return true;
  //     }
  //     return false;
  //   },

  //   async session({ session, token }) {
  //     session.user.id = token.sub;
  //     return session;
  //   },
  // }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
