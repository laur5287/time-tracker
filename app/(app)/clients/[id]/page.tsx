import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { getUserSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { MoreHorizontal } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

type ClientPageProps = {
	params: {
		id: string
	}
}
export const generateMetadata = ({ params }: { params: { id: string } }): Metadata => {
	return {
		title: `Client ${params.id}`
	}
}

export default async function ClientPage({ params }: ClientPageProps) {

	const { user }: any = await getUserSession()
	const client = await prisma.client.findFirst({
		where: {
			tenantId: user.tenant.id,
			id: params.id
		}
	})

	if (!client) {
		return <div>Client not found</div>
	}

	async function deleteClient() {
		'use server'
		if (!client) throw new Error('client not found')
		await prisma.client.deleteMany({
			where: {
				tenantId: user.tenant.id,
				id: client.id
			}
		})
		redirect('/clients')
	}

	return (
		<div className="">
			<div className="flex items-center justify-between">
				<h2 className="mb-2 text-lg font-medium">Client</h2>
				<Dialog>
					<DropdownMenu>
						<DropdownMenuTrigger>
							<MoreHorizontal />
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>
								<Link className='w-full' href={`/clients/${client.id}/edit`}>Edit</Link>
							</DropdownMenuItem>
							<DialogTrigger asChild>
								<DropdownMenuItem className="text-red-500">
									<span className="w-full">Delete</span>
								</DropdownMenuItem>
							</DialogTrigger>
						</DropdownMenuContent>
					</DropdownMenu>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Do you want to delete this client?</DialogTitle>
							<DialogDescription>
								This action cannot be undone. Are you sure you want to
								permanently delete this client?
							</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<form action={deleteClient}>
								<Button type="submit" variant="destructive">
									Delete
								</Button>
							</form>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
			<h3>{client.name}</h3>
		</div>
	)
}