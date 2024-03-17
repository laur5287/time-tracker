import Navbar from '@/components/navbar'


export default function AppLayout({
	children,
}: {
	children: React.ReactNode

}) {


	return (
		<section id='app_layout' className=' h-full flex flex-col w-full relative'>
			<Navbar />
			<section id='main-content' className="  border grow relative">
				{children}

			</section>

		</section>
	)
}
