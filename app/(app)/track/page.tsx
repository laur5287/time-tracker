import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getUserSession } from "@/lib/auth";
import prisma from '@/lib/prisma'
import { Activity, Client, Project } from '@prisma/client'
import { revalidatePath } from "next/cache";
import ActivityDuration from "./duration";
import { Play, Pause, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ActivityItemRow } from "./activity-item-row";



type NewActivityProps = {
    activity?: Activity | null
}
const NewActivity = ({ activity }: NewActivityProps) => {

    async function startActivity(data: FormData) {
        'use server'
        const user = await getUserSession()
        const activity = await prisma.activity.create({
            data: {
                user: { connect: { id: user.id } },
                name: data.get('name') as string,
                startAt: new Date(),
                tenant: { connect: { id: user.tenant.id } },
            }
        })
        revalidatePath('/track')
    }

    async function stopActivity(data: FormData) {
        'use server'
        const activity = await prisma.activity.update({
            where: {
                id: data.get('id') as string
            },
            data: {
                endAt: new Date()
            }
        })
        revalidatePath('/track')

    }
    return (
        <div className="">
            <h2 className="text-lg font-medium mb-2">What are you working on</h2>
            <form action={activity ? stopActivity : startActivity}>
                <div className="flex items-center gap-4">
                    <Input type='string' name="name" autoFocus autoComplete="name your activity" defaultValue={activity?.name || ''} />
                    <input type="hidden" name="id" defaultValue={activity?.id || ''} />
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
        <main>
            <h2>Here is what you`ve done today</h2>
            <ul className="flex flex-col gap-2 p-4 items-center">
                {activities.map(activity => (
                    <ActivityItemRow activity={activity} key={activity.id} />

                ))}


            </ul>
        </main>
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
        <main className="container mx-auto space-y-10">
            <NewActivity activity={currentActivity} />
            <DailyActivity activities={dailyActivities} />

        </main>
    )
}
export default Track;