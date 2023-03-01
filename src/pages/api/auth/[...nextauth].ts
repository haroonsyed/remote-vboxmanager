import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Add a naive rate limiter
const MAX_LOGIN_ATTEMPTS = 1000;
let hitCount = 0;

// Decrease the hit count by 1 every second
setInterval(() => {
  if (hitCount > 0) {
    hitCount--;
  }
}, 1000);

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "johndoe" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (hitCount > MAX_LOGIN_ATTEMPTS) {
          return null;
        }

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
