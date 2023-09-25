import Link from 'next/link'

export default function ProjectNotFound() {
    return (
        <div>
            <h2>Not Found</h2>
            <p>Could not find that project</p>
            <Link href="/projects">View all Projects</Link>
        </div>
    )
}