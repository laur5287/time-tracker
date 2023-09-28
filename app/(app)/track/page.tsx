import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getUserSession } from "@/lib/auth";
import prisma from '@/lib/prisma'
import { Activity, Client, Project } from '@prisma/client'
import { revalidatePath } from "next/cache";
import ActivityDuration from "./duration";
import { Play, Pause, ArrowRight, Building2, FolderOpenDot } from "lucide-react";
import { cn } from "@/lib/utils";
import { ActivityItemRow } from "./activity-item-row";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from "@/components/ui/select";



type NewActivityProps = {
    activity?: Activity | null
    clients: Client[]
    projects: Project[]
}
const NewActivity = ({ activity, clients, projects }: NewActivityProps) => {

    async function upsertActivity(data: FormData) {
        'use server'
        const user = await getUserSession()
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
        <div className="">
            <h2 className="mb-2 text-lg font-medium">What are you working on</h2>
            <form action={activity ? stopActivity : upsertActivity}>
                <div className="flex items-center gap-4 ">
                    <Input className="bg-background" required type='string' name="name" autoFocus autoComplete="name your activity" defaultValue={activity?.name || ''} />
                    <input type="hidden" name="id" defaultValue={activity?.id || ''} />
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
                </div>
            </form>
        </div>
    )
}
type DailyActivitiesprops = {
    activities: Activity[]
}
const DailyActivity = ({ activities }: DailyActivitiesprops) => {
    return (
        <div>
            <h2>Here is what you`ve done today</h2>
            <ul className="flex flex-col items-center gap-2 p-4">
                {activities.map(activity => (
                    <ActivityItemRow activity={activity} key={activity.id} />

                ))}


            </ul>
        </div>
    )

}
const Track = async () => {
    const user = await getUserSession()
    const currentActivity = await prisma.activity.findFirst({
        where: {
            tenantId: user.tenant.id,
            userId: user.id,
            endAt: null,
        }
    })
    const clients = await prisma.client.findMany({
        where: {
            tenantId: user.tenant.id
        }
    })

    const projects = await prisma.project.findMany({
        where: {
            tenantId: user.tenant.id
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
            tenantId: user.tenant.id,
            userId: user.id,
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
        orderBy: {
            startAt: 'asc'
        }
    })
    return (
        <section className="container mx-auto space-y-10">
            <NewActivity activity={currentActivity} clients={clients} projects={projects} />
            <DailyActivity activities={dailyActivities} />

        </section>
    )
}
export default Track;