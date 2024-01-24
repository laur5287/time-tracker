import { getUserSession } from '@/lib/auth'
import Link from 'next/link'
import { Avatar } from '@/components/Avatar'
import { ThemeToggle } from "@/components/theme-toggle"
import { LogIn } from './login'
import { Menu } from 'lucide-react'
import NavBarMenu from './NavbarMenu'

const links = [
	{ href: '/track', label: 'Track' },
	{ href: '/analytics', label: 'Analytics' },
	{ href: '/clients', label: 'Clients' },
	{ href: '/projects', label: 'Projects' }
]

const Navbar = async () => {

	const { user }: any = await getUserSession() || {}
	return (
		<>
			<section id='navbar' className=" backdrop-blur-sm z-10  md:container w-full shadow h-16 sticky  inset-0">
				<div className=" flex items-center py-2 mx-auto space-x-4">

					<NavBarMenu
						className=''>
						<Menu className='md:hidden' />
					</NavBarMenu>

					<Link href="/track" className="hidden md:relative px-2 py-1 rounded hover:bg-slate-100">
						<span className="font-semibold">Time Tracker</span>
					</Link>
					<nav className=''>
						<ul className="hidden md:flex items-center gap-4">
							{links.map(({ href, label }) => (
								<li key={href}>
									<Link
										className="px-2 py-1 focus:bg-slate-100 text-blue-500 rounded hover:bg-slate-100 hover:text-blue-600"
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
					{user ?
						<Avatar user={user} /> : <LogIn />


					}

				</div>

			</section>
		</>
	)
}

export default Navbar