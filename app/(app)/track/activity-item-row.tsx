'use client'
import { Input } from "@/components/ui/input"
import { Activity } from "@prisma/client"
import { ArrowRight, CalendarIcon } from "lucide-react"
import { useState } from "react"
import { deleteActivity, updateActivity } from "./actions"
import { Button } from "@/components/ui/button"
import { pad } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


type Props = {
    activity: Activity
}
type EditItemRowProps = Props & {
    onSave: () => void
}
type EditDateTimeProps = {
    name?: string,
    value: Date,
    onChange?: (date: Date) => void
}
const EditDateTime = ({ name, value, onChange }: EditDateTimeProps) => {
    const [date, setDate] = useState(value)
    const onDate = (d: Date | undefined) => {
        if (!d) return
        d.setHours(date.getHours())
        d.setMinutes(date.getMinutes())
        d.setSeconds(date.getSeconds())
        setDate(d)
        onChange && onChange(d)
        console.log('onDate', date)

    }
    return (
        <div className="">
            <div className="relative flex items-center">
                <input type="hidden" name={name} defaultValue={date.toISOString()} />
                <Input type="time"
                    className="pr-8 "
                    value={`${pad(date.getHours())}:${pad(date.getMinutes())}`}
                    onChange={(e) => {
                        const [hours, minutes] = e.target.value.split(':')
                        const newDate = new Date(date)
                        newDate.setHours(parseInt(hours) | 0)
                        newDate.setMinutes(parseInt(minutes) | 0)
                        setDate(newDate)
                        onChange && onChange(newDate)
                    }}
                />
                <Popover>
                    <PopoverTrigger className='absolute right-2'>
                        <CalendarIcon size={16} />
                    </PopoverTrigger>
                    <PopoverContent>
                        <Calendar
                            className=''
                            mode="single"
                            selected={date}
                            onSelect={onDate}
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}

const EditItemRow = ({ activity, onSave }: EditItemRowProps) => {
    return (

        <li id='editable_row' key={activity.id} className="py-2">
            <form
                className="flex items-center space-x-2"
                action={async (data) => {
                    await updateActivity(data) //server action
                    onSave() //this is client side execution
                }} >
                <input type="hidden" name="id" defaultValue={activity.id} />
                <Input autoFocus className='w-full' type="text" name="name" defaultValue={activity.name || ""} />
                <EditDateTime name='startAt' value={activity.startAt} />
                <EditDateTime name='endAt' value={activity.endAt || new Date()} />
                <span className="flex-grow"></span>
                <Button type="submit">Save</Button>

            </form>
        </li>
    )

}
type ReadItemRowProps = Props & {
    edit: () => void,
    onDelete: (id: string) => void,
}
const ReadItemRow = ({ activity, edit, onDelete }: ReadItemRowProps) => {
    return (

        <li key={activity.id} id="read_only" className="flex space-x-2 py-2 w-full  items-center">
            <span>
                {activity.name}
            </span>
            <span className="bg-red-400">
                {new Intl.DateTimeFormat(undefined, {
                    hour: 'numeric',
                    minute: 'numeric'
                }).format(activity.startAt)}
            </span>
            <ArrowRight />
            <span className="bg-red-400">
                {new Intl.DateTimeFormat('en-US', {
                    hour: 'numeric',
                    minute: 'numeric'
                }).format(activity.endAt || new Date())}
            </span>
            <span className="flex-grow"></span>

            <span className="">
                <Button onClick={edit} variant='outline'>Edit</Button>
                <Button onClick={async () => onDelete(activity.id)}
                    variant='destructive'>Delete</Button>
            </span>
        </li>
    )
}
export const ActivityItemRow = ({ activity }: Props) => {
    const [isEditing, setIsEditing] = useState(false)
    return isEditing ? (
        <EditItemRow activity={activity} onSave={() => setIsEditing(false)} />
    ) : (
        <ReadItemRow
            activity={activity}
            edit={() => setIsEditing(true)}
            onDelete={deleteActivity}
        />
    )


}