import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserService } from "@/lib/services"
import { getRequestContext } from "@cloudflare/next-on-pages";
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { getDrizzleDB } from "./cf";

export const runtime = "edge";

const { handlers, auth } = NextAuth({
  // pages: {
  // 	signIn: '/auth/signin',
  // 	// signOut: '/auth/signout',
  // 	// error: '/auth/error',
  // 	// verifyRequest: '/auth/verify-request',
  // 	// newUser: '/auth/new-user'
  // },
  adapter: DrizzleAdapter(getDrizzleDB()),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "gardner.ethan10@gmail.com",
        },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        const userService = new UserService();
        const user = await userService.loginUser(await req.json())
        console.log(user)
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
});

export { handlers, auth }
