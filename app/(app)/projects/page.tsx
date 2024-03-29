import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { getUserSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import Link from 'next/link'
import { ProjectsList } from './projects'
import { redirect } from 'next/navigation'


export const generateMetadata = ({ params }: { params: { id: string } }): Metadata => {
	return {
		title: `Projects ${params.id}`
	}
}

const Blankslate = () => {
	return (
		<div className="flex flex-col items-center gap-4 p-4 rounded-lg bg-slate-200">
			<h2 className="text-lg font-semibold">Create a Project</h2>
			<p>
				A project represents work you are doing for a client. A client often will have multiple projects and you can track time for each project.
			</p>
			<Button asChild>
				<Link href="/projects/new">Create Project</Link>
			</Button>
		</div>
	)
}

export default async function ProjectsPage() {
	const { user }: any = await getUserSession()
	// console.log(user)

	const projects = await prisma.project.findMany({
		where: {
			tenantId: user.tenant.id
		},
		orderBy: {
			createdAt: 'asc'
		}

	})
	if (projects.length > 0) {
		redirect(`/projects/${projects[0].id}`)
	}

	return (
		<div className="container py-4 mx-auto">
			<Blankslate />
		</div>
	)
}