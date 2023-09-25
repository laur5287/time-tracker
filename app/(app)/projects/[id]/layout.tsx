import { getUserSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { ProjectsList, ProjectsListHeader } from '../projects'

export default async function ProjectLayout({
    children
}: {
    children: React.ReactNode
}) {
    const user = await getUserSession()
    const projects = await prisma.project.findMany({
        where: {
            tenantId: user.tenant.id
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    return (
        <div className="container flex gap-4 py-4 mx-auto divide-x-2">
            <div className="w-1/3 px-4">
                <ProjectsListHeader />
                <ProjectsList projects={projects} />
            </div>
            <div className="flex-grow px-4">{children}</div>
        </div>
    )
}