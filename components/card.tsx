import Image from "next/image"
import { cn } from '@/lib/utils'

type Props = {
	className?: string,
}

const Card = ({ className }: Props) => {
	return (

		<section className={cn("items-start  flex w-[100%] flex-col px-[2%] rounded-xl max-md:px-[1.5%]", className)}
		>
			<article className="items-start self-stretch flex flex-col w-full my-[1.5%]">
				<div className="bg-neutral-200 relative self-stretch flex w-full h-[40vh] flex-col rounded-xl" >
					<Image alt='image' fill src='/next.svg' />
				</div>
				<div className="items-start self-stretch flex flex-col mt-[1.5%]">
					<h2 className="text-black text-lg font-medium self-stretch">Headline</h2>
					<p className="text-stone-500 text-sm self-stretch mt-[0.5%]">
						Please add your content here. Keep it short and simple. And smile :)
					</p>
				</div>
				<a
					href="#"
					className="text-white text-sm self-stretch whitespace-nowrap justify-center items-end border bg-zinc-700 w-full grow mt-[1.5%] px-[0.5%] py-[0.5%] rounded-[100px] border-solid border-zinc-700"
				>
					Button
				</a>
			</article>
		</section>
	)
}
export default Card