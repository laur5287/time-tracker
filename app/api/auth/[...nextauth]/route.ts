import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import { PrismaClient } from "@prisma/client"; // Import PrismaClient
import { session } from "@/lib/auth";

const prisma = new PrismaClient(); // Initialize PrismaClient


const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        }),

    ],
    callbacks: {
        async signIn({ account, profile }) {
            console.log(' beggining sign In callback', account, profile)
            if (!profile?.email) {
                throw new Error('no profile')
            }
            const user = await prisma?.user.upsert({
                where: {
                    email: profile.email,
                },
                create: {
                    email: profile.email,
                    name: profile?.name,
                    avatar: (profile as any).picture,
                    tenant: {
                        create: {

                        }
                    }
                },
                update: {
                    name: profile.name,
                    avatar: (profile as any).picture,
                }
            })
            return true

        },
        session,
        async jwt({ token, user, account, profile }) {
            console.log({ token, account, profile, user })
            if (profile) {
                const user = await prisma.user.findUnique({
                    where: {
                        email: profile.email
                    }
                })
                if (!user) {
                    throw new Error('No User')
                }
                token.id = user.id
                token.tenant = {
                    id: user.tenantId
                }
            }
            return token
        }
    }
}
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }