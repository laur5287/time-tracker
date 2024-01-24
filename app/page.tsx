import Navbar from '@/components/navbar'
import Image from 'next/image'
import Card from '@/components/card'
import Drawer from '@/components/Drawer'


export default async function Home() {


	return (
		<>
			<main className="flex  gap-1 relative 	   max-w-screen-2xl ">
				<section id='hero-wrapper' className=" relative gap-3 flex flex-col h-screen grow ">
					{/* <div id="wrapper" className="border grow-[4] border-yellow-400">
						<Card className='bg-white' />
					</div>
					<div id="wrapper" className="border grow-[3] border-blue-400">

					</div> */}
					<div id="wrapper" className=" grow-[1] ">
						<Navbar />
						<Drawer className='' />

					</div>

				</section>
			</main>
		</>
	)
}