import './globals.css'
import { Metadata } from 'next'
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: {
		// absolute: '',
		default: 'Time-tracker default title',
		template: ' Time-tracker template | %s ',
	},
	description: 'Track your time',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {

	return (

		<html className='h-full' lang="en" suppressHydrationWarning>
			<body className={`${inter.className} selection:bg-fuchsia-300 selection:text-fuchsia-900 h-full p-1 md:container`}>
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
