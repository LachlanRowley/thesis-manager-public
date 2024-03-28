import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from "next-auth/providers/google";
import { compare } from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import { PrismaAdapter } from '@auth/prisma-adapter'

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {

  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
            label: 'Email',
            type: 'email',
            placeholder: 'hello@example.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // no credentials, didn't pass email or password
        if (!credentials?.email || !credentials.password) {
            console.log('No credentials')
            return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }, 
          include: {
            user_type: true,
            academic: true, 
            student: true
          }
        })
        if (!user) {
          return null
        }

        const isPasswordVaild = await compare(credentials.password, user.password)
        console.log(isPasswordVaild)

        if (!isPasswordVaild) {
          console.log('Invalid password')
          return null
        }

        return {
          id: user.id + '',
          email: user.email, 
          uni_id: user.uni_id,
          firstname: user.firstname,
          lastname: user.lastname,
          user_type: user.user_type,
          user_type_id: user.user_type_id,
          student: user.student,
          academic: user.academic,
        }
      }
    }), 
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
      async profile(profile) {

        console.log("Profile info from route", profile); 
        console.log("Profile info from route end"); 
        
        return {
          id: profile.sub, 
          name: profile.given_name,
          email: profile.email,
          image: profile.picture, 
          uni_id: profile.email, 
          password: 'test', // Since it’s OAuth, you can set a dummy password or handle it another way
          firstname: profile.given_name,  
          lastname: profile.family_name, 
          user_type_id: 'user_type_id_1', // Provide a default user type ID or get it based on your app’s logic
          program_lead: false, // Set a default value or get it based on your app’s logic
          emailVerified: profile.email_verified
        };
      }

    })
  ], 
  session: {
    strategy: 'jwt', 

    // ** Seconds - How long until an idle session expires and is no longer valid
    maxAge: 30 * 24 * 60 * 60 // ** 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "gmail") {
        return profile?.email_verified && profile.email.endsWith("@gmail.com")
      }
      return true // Do different verification for other providers that don't have `email_verified`
    },
    session: ({ session, token }) => {
      return {
        ...session, 
        user: {
          ...session.user, 
          id: token.id, 
          email: token.email,
          uni_id: token.uni_id,
          firstname: token.firstname,
          lastname: token.lastname,
          user_type: token.user_type,
          user_type_id: token.user_type_id,
          student: token.student,
          academic: token.academic,
        }
      }
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any
        return {
          ...token, 
          id: u.id, 
          email: u.email,
          uni_id: u.uni_id,
          firstname: u.firstname,
          lastname: u.lastname,
          user_type: u.user_type,
          user_type_id: u.user_type_id,
          student: u.student,
          academic: u.academic,
        }
      }
      return token
    },
    redirect: ({url, baseUrl}) => {
      return baseUrl
    }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }