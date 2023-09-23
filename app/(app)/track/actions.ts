'use server'

import { revalidatePath } from "next/cache"

export async function updateActivity(data: FormData) {
    console.log('data server action', data)
    await prisma?.activity.update({
        where: {
            id: data.get('id') as string,
        },
        data: {
            name: data.get('name') as string,
            startAt: data.get('startAt') as string,
            endAt: data.get('endAt') as string,
        }
    })
    revalidatePath('/track')
}
export async function deleteActivity(id: string) {
    await prisma?.activity.delete({
        where: {
            id: id,
        },

    })
    revalidatePath('/track')
}