import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'time-tracker',
	description: 'Track your time',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {

	return (

		<html className='h-full' lang="en" suppressHydrationWarning>
			<body className={`${inter.className} h-full`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>

					{children}
				</ThemeProvider>
			</body>
		</html >
	)
}
