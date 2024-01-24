import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react'
import Link from 'next/link';
type NavBarMenuProps = {
	children: React.ReactNode,
	content?: React.ReactNode,
	className?: string,

}

const NavBarMenu = ({ children, content = <Content />, className }: NavBarMenuProps) => {
	return (
		<>
			<DropdownMenu >
				<DropdownMenuTrigger>
					{children}
				</DropdownMenuTrigger>
				<DropdownMenuContent asChild>
					<ul id='dropdown_menu_content' className={cn('md:hidden min-w-[50vw] min-h-screen border', className)}>
						{content}

					</ul>

				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};

export default NavBarMenu;

const Content = () => {

	const links = [
		{ href: '/track', label: 'Track' },
		{ href: '/analytics', label: 'Analytics' },
		{ href: '/clients', label: 'Clients' },
		{ href: '/projects', label: 'Projects' }
	]
	return (
		<>

			{links.map(({ href, label }) => (
				<>
					<DropdownMenuItem asChild key={href}>
						<Link
							className="px-2 py-1 focus:bg-slate-100 text-blue-500 rounded hover:bg-slate-100 hover:text-blue-600"
							href={href}
						>
							{label}
						</Link>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
				</>
			))}

		</>
	);
};