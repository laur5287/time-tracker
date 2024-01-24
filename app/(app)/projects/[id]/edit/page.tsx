import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getUserSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { notFound, redirect } from 'next/navigation'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'

type ProjectPageProps = {
	params: {
		id: string
	}
}

export default async function EditProjectPage({ params }: ProjectPageProps) {
	const user = await getUserSession()
	const clients = (
		await prisma.client.findMany({
			where: {
				tenantId: user.tenant.id
			}
		})
	).map((client) => ({
		value: client.id,
		label: client.name
	}))
	const project = await prisma.project.findFirst({
		where: {
			tenantId: user.tenant.id,
			id: params.id
		},
		include: {
			client: true,
		}
	})

	if (!project) {
		return redirect('/projects')
	}

	async function editProject(data: FormData) {
		'use server'
		if (!project) return redirect('/projects')

		const user = await getUserSession()
		const client = data.get('client') as string
		await prisma.project.updateMany({
			where: {
				tenant: {
					id: user.tenant.id
				},
				id: project.id
			},
			data: {
				name: data.get('name') as string,
				color: data.get('color') as string,
				clientId: client ? client : null,
			}
		})
		revalidatePath(`/projects/${project?.id}`)
		redirect(`/projects/${project?.id}`)
	}
	if (!project) notFound()

	return (
		<form action={editProject} className='flex flex-col max-w-3xl gap-4 pt-4 mx-auto'>
			<div className="flex items-center justify-between">
				<h2 className="mb-2 text-lg font-medium">Edit Project</h2>
			</div>
			<div className="flex items-center gap-4">
				<input type="hidden" defaultValue={project?.id} />
				<Input
					type="color"
					name="color"
					placeholder="Color"
					className="w-12"
					defaultValue={project.color || ''}
				/>
				<Input
					required
					type="text"
					name="name"
					placeholder="Project name"
					className="w-full"
					defaultValue={project.name}
				/>
			</div>
			<div>
				<Label htmlFor="email">Client</Label>
				<Select name="client" defaultValue={project.clientId ?? ''}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Assign a Client" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Client</SelectLabel>
							<SelectItem value="">None</SelectItem>
							{clients.map((client) => (
								<SelectItem value={client.value} key={client.value}>
									{client.label}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>

			<div className="">
				<Button type="submit">Save Project</Button>

			</div>
		</form>
	)
}