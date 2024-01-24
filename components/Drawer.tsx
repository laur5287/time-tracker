'use client'
import {
	Drawer as DrawerShadcn,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

type DrawerProps = React.InputHTMLAttributes<HTMLInputElement>

const Drawer = ({ className }: DrawerProps) => {

	const [open, setOpen] = useState(false)
	// const isDesktop = useMediaQuery("(min-width: 768px)")
	return (
		<section className={cn('', className)} id='drawer'>
			<DrawerShadcn open={open} onOpenChange={setOpen}>
				<DrawerTrigger><Button>Drawer</Button></DrawerTrigger>
				<DrawerContent className="">
					<DrawerHeader>
						<DrawerTitle>Are you absolutely sure?</DrawerTitle>
						<DrawerDescription>This action cannot be undone.</DrawerDescription>
					</DrawerHeader>
					<DrawerFooter>
						<Button>Submit</Button>
						<DrawerClose>
							<Button variant="outline">Cancel</Button>
						</DrawerClose>
					</DrawerFooter>
				</DrawerContent>
			</DrawerShadcn>

		</section>
	);
};
export default Drawer;