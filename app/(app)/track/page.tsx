import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getUserSession } from "@/lib/auth";
import { User } from 'next-auth'
import prisma from '@/lib/prisma'
import { Activity, Client, Project } from '@prisma/client'
import { revalidatePath } from "next/cache";
import ActivityDuration from "./duration";
import { Play, Pause, ArrowRight, Building2, FolderOpenDot } from "lucide-react";
import { cn } from "@/lib/utils";
import { ActivityItemRow } from "./activity-item-row";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from "@/components/ui/select";
import { columns } from "./columns"
import { DataTable } from "./data-table"
import Drawer from "@/components/Drawer";
import Sheet from "@/components/Sheet";




type NewActivityProps = {
	activity?: Activity | null
	clients: Client[]
	projects: Project[]
}
const NewActivity = ({ activity, clients, projects }: NewActivityProps) => {

	async function upsertActivity(data: FormData) {
		'use server'
		try {
			const { user }: any = await getUserSession()
			const client = data.get('client') as string
			const project = data.get('project') as string
			await prisma.activity.upsert({
				where: {
					id: data.get('id') as string
				},
				create: {
					user: { connect: { id: user.id } },
					tenant: { connect: { id: user.tenant.id } },
					name: data.get('name') as string,
					startAt: new Date(),
					client: !!client ? { connect: { id: client } } : undefined,
					project: !!project ? { connect: { id: project } } : undefined
				},
				update: {
					name: data.get('name') as string,
					client: !!client ? { connect: { id: client } } : undefined,
					project: !!project ? { connect: { id: project } } : undefined
				}
			})
			revalidatePath('/track')
		} catch (error) {
			console.error('Error in upsertActivity:', error);
		}

	}

	async function stopActivity(data: FormData) {
		'use server'
		const client = data.get('client') as string
		const project = data.get('project') as string
		const activity = await prisma.activity.update({
			where: {
				id: data.get('id') as string
			},
			data: {
				endAt: new Date(),
				name: data.get('name') as string,
				client: !!client ? { connect: { id: client } } : undefined,
				project: !!project ? { connect: { id: project } } : undefined
			}
		})
		revalidatePath('/track')

	}
	return (
		<div id='NewActivity_wrapper' className='sticky backdrop-blur-xl  w-full px-2 md:pr-16 drop-shadow-md py-2 '>

			<h2 className=" mb-2 text-lg font-medium ">What are you working on?</h2>
			<form action={activity ? stopActivity : upsertActivity}>

				<div id='input wrapper' className="flex flex-col md:flex-row  items-center gap-4 ">
					<Input placeholder='Name your activity' required type='string' name="name" autoFocus autoComplete="name your activity" defaultValue={activity?.name || ''} />
					<Input type="hidden" name="id" defaultValue={activity?.id || ''} />

					<ul className=" flex justify-around w-full" id="buttons-wrapper">

						<Select name="client">
							<SelectTrigger className="w-[50px]">
								<Building2 size={32} />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Client</SelectLabel>
									<SelectItem value="">None</SelectItem>
									{clients.map((client) => (

										<SelectItem value={client.id} key={client.id}>
											{client.name}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>

						<Select name="project">
							<SelectTrigger className="w-[50px]">
								<FolderOpenDot size={32} />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Project</SelectLabel>
									<SelectItem value="">None</SelectItem>
									{projects.map((project) => (
										project.name &&
										<SelectItem value={project.id} key={project.id}>
											{project.name}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>

						{activity &&
							<ActivityDuration startAt={activity.startAt.toString()} />
						}
						<Button
							className={cn('', activity ? 'bg-red-700' : 'bg-blue-900')}
							type="submit">{activity ? <Pause /> : <Play />} </Button>
					</ul>
				</div>
			</form>
		</div>
	)
}
type DailyActivitiesprops = {
	activities: Activity[]
	clients: Client[],
	projects: Project[]
}
const DailyActivity = ({ activities, clients, projects }: DailyActivitiesprops) => {
	return (
		<>
			<div className=" grow flex flex-col">
				<h2 className=' text-lg font-medium mb-2'>Here is what you`ve done today</h2>
				<DataTable clients={clients} projects={projects} columns={columns} data={activities} />
			</div>
		</>
	)

}
const Track = async () => {

	const user: User | null = await getUserSession()
	console.log('current user', user)

	const currentActivity = await prisma.activity.findFirst({
		where: {
			tenantId: user?.tenant?.id,
			userId: user?.id,
			endAt: null,
		}
	})

	const clients = await prisma.client.findMany({
		where: {
			tenantId: user?.tenant?.id
		}
	})
	const projects = await prisma.project.findMany({
		where: {
			tenantId: user?.tenant?.id
		}
	})

	const now = new Date()

	const startOfToday = new Date(
		now.getFullYear(),
		now.getMonth(),
		now.getDate()
	)

	const endOfToday = new Date(
		now.getFullYear(),
		now.getMonth(),
		now.getDate(),
		23,
		59,
		59
	)

	const dailyActivities = await prisma.activity.findMany({
		where: {
			tenantId: user?.tenant?.id,
			userId: user?.id,
			OR: [{
				startAt: {
					equals: startOfToday,
				}
			}, {
				endAt: {
					lte: endOfToday
				}
			}],
		},
		include: {
			client: true,   // Include the related Client if exists
			project: true,  // Include the related Project if exists
		},
		orderBy: {
			startAt: 'desc'
		}
	})

	return (
		<section className=" mx-auto flex  flex-col h-full border-red-700 relative   space-y-10">
			<NewActivity activity={currentActivity} clients={clients} projects={projects} />
			<div className="  flex grow   " id="activity-wrapper">
				<DailyActivity clients={clients} projects={projects} activities={dailyActivities} />

			</div>

		</section>
	)
}
export default Track;