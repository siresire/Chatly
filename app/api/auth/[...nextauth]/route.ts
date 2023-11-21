import bcrypt from "bcrypt"
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

import prisma from "@/app/libs/prismadb"

//  used to create a server options object that is passed to NextAuth
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [

    //  login with github provider if available and set the client id and secret in the .env file
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),

    // login with google provider if available and set the client id and secret in the .env file
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),

    
    //  basic login fucionality with email and password 
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },

      //authorize a user based on the credentials submitted
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        // find the user in the database based on the email submitted
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        // if the user is not found throw an error
        if (!user || !user?.hashedPassword) {
          throw new Error('Invalid credentials');
        }

        // compare the password submitted with the hashed password in the database using bcrypt
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        // if the password is incorrect throw an error
        if (!isCorrectPassword) {
          throw new Error('Invalid credentials');
        }
        return user;
      }
    })
  ],
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

// export the handler to be used in the api route
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
