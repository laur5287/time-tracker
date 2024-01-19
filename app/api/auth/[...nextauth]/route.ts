import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import { PrismaClient } from "@prisma/client"; // Import PrismaClient
import { session } from "@/lib/auth";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";

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
			if (!profile?.email) {
				redirect('/')
				// throw new Error('no profile')
			}
			const inviteKey = cookies().get('invite_key')?.value
			const user = await prisma?.user.upsert({
				where: {
					email: profile.email,
				},
				create: {
					email: profile.email,
					name: profile?.name,
					avatar: (profile as any).picture,
					role: inviteKey ? 'USER' : 'OWNER',
					tenant: inviteKey
						? {
							connect: {
								inviteKey
							}
						}
						: {
							create: {}
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
			// console.log({ token, account, profile, user })
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