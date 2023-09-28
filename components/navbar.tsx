import { getUserSession } from '@/lib/auth'
import Link from 'next/link'

import { Avatar } from '@/components/Avatar'
import { ThemeToggle } from "@/components/theme-toggle"


const links = [
    { href: '/track', label: 'Track' },
    { href: '/analytics', label: 'Analytics' },
    { href: '/clients', label: 'Clients' },
    { href: '/projects', label: 'Projects' }
]

const Navbar = async () => {
    const user = await getUserSession()

    return (
        <>
            <section className="shadow">
                <div className="container flex items-center py-2 mx-auto space-x-4">
                    <Link href="/" className="px-2 py-1 rounded hover:bg-slate-100">
                        <span className="font-semibold">Time Tracker</span>
                    </Link>
                    <nav>
                        <ul className="flex items-center gap-4">
                            {links.map(({ href, label }) => (
                                <li key={href}>
                                    <Link
                                        className="px-2 py-1 text-blue-500 rounded hover:bg-slate-100 hover:text-blue-600"
                                        href={href}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <span className="flex-grow" />
                    <ThemeToggle />
                    <Avatar user={user} />

                </div>

            </section>
        </>
    )
}
export default Navbar