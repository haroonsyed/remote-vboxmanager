import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "johndoe" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { REMOTE_VBOX_USER, REMOTE_VBOX_PASSWORD } = process.env;
        const isValidUser =
          credentials?.username == REMOTE_VBOX_USER &&
          credentials?.password == REMOTE_VBOX_PASSWORD;

        if (isValidUser) {
          // Any object returned will be saved in `user` property of the JWT
          return {
            id: "1",
            name: REMOTE_VBOX_USER,
            username: REMOTE_VBOX_USER,
          };
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
        }
      },
    }),
  ],
  jwt: {
    secret: process.env.REMOTE_VBOX_SECRET,
  },
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, authOptions);
