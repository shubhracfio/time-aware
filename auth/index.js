"server-only"
import NextAuth from "next-auth"
import SequelizeAdapter from "@auth/sequelize-adapter"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import {getUserFromDb} from "@/auth/actions/user.actions"
import { v4 as uuid } from 'uuid';
import authDB from "./database"

let adapter= SequelizeAdapter(authDB.AuthSequelize,{ 
  models: { 
    User: authDB.Users 
  }
})
export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter,
    providers:[
        Google,
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                const { email, password } = credentials
        
                const res = await getUserFromDb(email, password)
                if (res.success) {
                  return res.data
                }
        
                return {}
              },
        })

    ],
    callbacks: {
        async jwt({ token, user, account }) {
          if (account?.provider === "credentials") {
            token.credentials = true
          }
          return token
        },
    },
    jwt: {
        encode: async function (params) {
          if (params.token?.credentials) {
            const sessionToken = uuid()
    
            if (!params.token.sub) {
              throw new Error("No user ID found in token")
            }
    
            const createdSession = await adapter?.createSession?.({
              sessionToken: sessionToken,
              userId: params.token.sub,
              expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
            })
    
            if (!createdSession) {
              throw new Error("Failed to create session")
            }
    
            return sessionToken
          }
          return defaultEncode(params)
        },
    },
    secret: process.env.AUTH_SECRET,

})
