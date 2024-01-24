import { Loader2 } from 'lucide-react'
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
	return (
		<div className="flex flex-col justify-center w-full">
			<Loader2 size={32} className="animate-spin" />
			{/* <Skeleton className='w-full h-[32px]' />
			<Skeleton className='w-full h-[32px] bg-red-500' /> */}
		</div>
	)
}