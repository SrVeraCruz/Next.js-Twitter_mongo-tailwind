import clientPromise from "@/lib/db";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    session: async ({token, session}) => {
      if(session?.user && token?.sub) {
        session.user.id = token.sub
      }

      return session
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }