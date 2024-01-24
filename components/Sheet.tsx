import {
	Sheet as SheetShadcn,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"


type SheetProps = React.InputHTMLAttributes<HTMLInputElement>

const Sheet = ({ className }: SheetProps) => {

	return (
		<>
			<SheetShadcn >
				<SheetTrigger>Open</SheetTrigger>
				<SheetContent side='left' className={cn('', className)}>
					<SheetHeader>
						<SheetTitle>Are you absolutely sure?</SheetTitle>
						<SheetDescription>
							This action cannot be undone. This will permanently delete your account
							and remove your data from our servers.
						</SheetDescription>
					</SheetHeader>
				</SheetContent>
			</SheetShadcn>
		</>
	);
};
export default Sheet;
