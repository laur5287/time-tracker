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
import { revalidatePath } from 'next/cache'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'

type ProjectPageProps = {
    params: {
        id: string
    }
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
    const user = await getUserSession()
    const project = await prisma.project.findFirst({
        where: {
            id: params.id,
            tenantId: user.tenant.id,
        },
        include: {
            client: true,
        }
    })

    if (!project) {
        throw notFound();

    }


    async function deleteProject() {
        'use server'
        if (!project) throw new Error('project not found')
        await prisma.project.deleteMany({
            where: {
                tenantId: user.tenant.id,
                id: project.id
            }
        })
        revalidatePath('/projects')
        redirect('/projects')
    }

    return (
        <div >
            <div className="flex items-center justify-between">
                <h1 className="mb-2 text-lg font-medium">Project Detail</h1>
                <Dialog>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <MoreHorizontal />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                <Link className='w-full' href={`/projects/${project.id}/edit`}>Edit</Link>
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
                            <DialogTitle>Do you want to delete this project?</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. Are you sure you want to
                                permanently delete this project?
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <form action={deleteProject}>
                                <Button type="submit" variant="destructive">
                                    Delete
                                </Button>
                            </form>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <h3>{project.name}</h3>
            {project.client && (
                <div className='flex flex-col items-start'>
                    <h2>Client</h2>
                    <div>{project.client.name}</div>
                </div>
            )}
        </div>
    )
}