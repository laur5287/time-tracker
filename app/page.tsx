import Navbar from '@/components/navbar'
import Image from 'next/image'
import Card from '@/components/card'


export default async function Home() {


	return (
		<>
			<main className="flex flex-col gap-1 relative 	 bg-zinc-600  max-w-screen-2xl ">
				<section id='hero-wrapper' className=" relative gap-3 flex flex-col h-screen  border-fuchsia-300 border-[3px]">
					{/* <div id="wrapper" className="border grow-[4] border-yellow-400">
						<Card className='bg-white' />
					</div>
					<div id="wrapper" className="border grow-[3] border-blue-400">

					</div> */}
					<div id="wrapper" className="border grow-[1] border-green-100">
						<Navbar />

					</div>

				</section>
			</main>
		</>
	)
}