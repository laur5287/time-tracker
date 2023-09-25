'use client'
import { Button } from "@/components/ui/button"
import { Project } from "@prisma/client"
import Link from "next/link"

type ProjectsListProps = {
    projects: Project[]
}
export const ProjectsList = ({ projects }: ProjectsListProps) => {
    return (
        <ul>
            {projects.map(project => (
                <li key={project.id}>
                    <Link href={`/projects/${project.id}`}>{project.name}</Link>

                </li>
            ))}

        </ul>
    )
}
export const ProjectsListHeader = () => {
    return (
        <div className="flex items-center justify-between">
            <h2 className="mb-2 font-bold text-2lg ">Projects List</h2>
            <Button asChild>
                <Link href="/projects/new">Create</Link>
            </Button>
        </div>
    )
}
