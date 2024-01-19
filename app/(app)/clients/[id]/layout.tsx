import { getUserSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { ClientList, ClientListHeader } from '../clients'

export default async function ClientLayout({
	children
}: {
	children: React.ReactNode
}) {
	const { user }: any = await getUserSession()
	const clients = await prisma.client.findMany({
		where: {
			tenantId: user.tenant.id
		}
	})
	return (
		<div className="container flex gap-4 py-4 mx-auto divide-x-2">
			<div className="w-1/2 px-4">
				<ClientListHeader />
				<ClientList clients={clients} />
			</div>
			<div className="flex-grow px-4">{children}</div>
		</div>
	)
}