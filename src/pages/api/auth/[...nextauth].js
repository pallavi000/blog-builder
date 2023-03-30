import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../../models/User";
import dbConnect from "../../../../utils/dbConnect";

export const authOption = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials;
        console.log(email, password);
        await dbConnect();
        const user = await User.findOne({ email: credentials.email });
        console.log(user, "wwwwwwwwwwwwwwwwww");
        if (email == user.email && password == user.password) {
          return { id: user._id, email: user.email, name: user.name };
        } else {
          throw new Error("User not found");
        }
      },
    }),
  ],
  pages: { signIn: "/auth/login" },
};

export default NextAuth(authOption);
