import { Button } from '@/components/ui/button'
import { getUserSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import { ClientList, ClientListHeader } from './clients'
import { redirect } from 'next/navigation'

const Blankslate = () => {
    return (
        <div className="flex flex-col items-center gap-4 p-4 rounded-lg bg-slate-200">
            <h2 className="text-lg font-semibold">Create a Client</h2>
            <p>
                A client represents an entity that you are doing work for. Clients often
                have many projects you do for them. Create a client to keep your work
                organized.
            </p>
            <Button asChild>
                <Link href="/clients/new">Create</Link>
            </Button>
        </div>
    )
}

export default async function ClientPage() {
    const user = await getUserSession()
    const clients = await prisma.client.findMany({
        where: {
            tenantId: user.tenant.id
        }
    })
    if (clients.length > 0) {
        redirect(`/clients/${clients[0].id}`)
    }

    return (
        <div className="container py-4 mx-auto">
            <ClientListHeader />
            {/* {clients.length > 0 ? <ClientList clients={clients} /> */}
            {/* : */}
            <Blankslate />
            {/* } */}
        </div>
    )
}