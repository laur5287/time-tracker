'use client'

import { Button } from '@/components/ui/button'
import { Client } from '@prisma/client'
import Link from 'next/link'

type ClientListProps = {
    clients: Client[]
}

export const ClientList = ({ clients }: ClientListProps) => {
    return (
        <ul>
            {clients.map((client) => (
                <li key={client.id + client.name}>
                    <Link href={`/clients/${client.id}`}>{client.name}</Link>
                </li>
            ))}
        </ul>
    )
}

export const ClientListHeader = () => {
    return (
        <div className="flex items-center justify-between">
            <h2 className="mb-2 text-lg font-medium">Clients</h2>
            <Button asChild>
                <Link href="/clients/new">Create</Link>
            </Button>
        </div>
    )
}