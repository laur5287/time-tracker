import { getUserSession } from '@/lib/auth'
import Link from 'next/link'

import { Avatar } from '@/components/Avatar'

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
                <div className="container mx-auto flex items-center py-2 space-x-4">
                    <Link href="/" className="py-1 px-2 hover:bg-slate-100 rounded">
                        <span className="font-semibold">Time Tracker</span>
                    </Link>
                    <nav>
                        <ul className="flex items-center gap-4">
                            {links.map(({ href, label }) => (
                                <li key={href}>
                                    <Link
                                        className="py-1 px-2 hover:bg-slate-100 rounded text-blue-500 hover:text-blue-600"
                                        href={href}
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <span className="flex-grow" />
                    <Avatar user={user} />

                </div>

            </section>
        </>
    )
}
export default Navbar