import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getUserSession } from "@/lib/auth";
import prisma from '@/lib/prisma'
import { Activity, Client, Project } from '@prisma/client'
import { revalidatePath } from "next/cache";
import ActivityDuration from "./duration";
import { Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

type TimeProps = {
    startAt: string
}

const Time = ({ startAt }: TimeProps) => {
    const date = new Date(startAt)
    const now = new Date()
    const elapsed = now.getTime() - date.getTime()
    console.log(elapsed)
    return (
        <div>
            {elapsed}
        </div>
    )

}
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
const DailyActivity = async () => {

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

    return (
        <main className="container mx-auto">
            <NewActivity activity={currentActivity} />

        </main>
    )
}
export default Track;