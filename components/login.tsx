
'use client'

import { LogInIcon } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { DropdownMenuItem } from './ui/dropdown-menu'

export const LogIn = () => (
	<div
		className="text-green-500 text-bold text-xl cursor-pointer"
		onClick={() => signIn()}
	>
		{/* <LogInIcon className="mr-2 h-4 w-4" /> */}
		<span>Log In</span>
	</div>
)