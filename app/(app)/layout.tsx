import Navbar from '@/components/navbar'


export default function AppLayout({
	children,
}: {
	children: React.ReactNode

}) {

	// function generateRandomNo(count: number) {
	// 	return Math.floor(Math.random() * count)
	// }
	// const random = generateRandomNo(2)
	// if (!random) {
	// 	throw new Error("error from layout (app)");

	// }
	return (
		<section id='app_layout' className=' h-full flex flex-col w-full relative'>
			<Navbar />
			<section id='main-content' className="  border grow relative">
				{children}

			</section>

		</section>
	)
}
