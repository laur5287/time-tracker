'use client'

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
export default function ErrorBoundary({
	error,
	reset //tries to re render the content
}: {
	error: Error
	reset: () => void
}) {
	const router = useRouter()
	const pathName = usePathname()
	console.log('this is the error obj', error)

	return (
		<>
			<div className="flex w-full justify-between">
				<h1>Something went wrong in layout </h1>
				<p className="">error caught by error.tsx in app folder</p>
				<Button onClick={() => router.back()}>Go back</Button>
			</div>
			<div className="flex flex-col">
				<h2>The current path is :</h2>
				<p className="text-red-500">{pathName}</p>
				<h3>this is the error object</h3>
				<p className="text-red-500">{error.message}</p>

				<Button onClick={() => reset()}>Try to recover</Button>

				<p className="text-red-500">{error.stack}</p>
				<p className="font bold text-blue-500">
					<pre>{JSON.stringify(error, null, 2)}</pre>
				</p>


			</div>
		</>
	)
}