import { SidebarListItem } from './sidebar-list-item'

const links = [
    { href: '/admin/profile', label: 'Profile' },
    { href: '/admin/team', label: 'Team' },
    { href: '/admin/billing', label: 'Billing' }
]

const Sidebar = () => {
    return (
        <ul className="w-1/5 px-4">
            {links.map((link) => (
                <SidebarListItem key={link.href} {...link} />
            ))}
        </ul>
    )
}

export default async function AdminLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="container flex gap-4 py-4 mx-auto divide-x-2">
            <Sidebar />
            <div className="flex-grow px-4">{children}</div>
        </div>
    )
}