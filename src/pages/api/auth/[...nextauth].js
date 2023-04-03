import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../../models/User";
import dbConnect from "../../../../utils/dbConnect";

export const authOption = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials;
        console.log(email, password);
        await dbConnect();
        const user = await User.findOne({ email: credentials.email });

        if (email == user.email && password == user.password) {
          console.log(user, "............................................");
          return {
            id: user._id,
            name: user.name,
            email: user.email,
          };
        } else {
          throw new Error("User not found");
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  pages: { signIn: "/auth/login" },
};

export default NextAuth(authOption);
