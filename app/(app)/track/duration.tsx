'use client'

import { useEffect, useState } from "react"
import { pad } from '@/lib/utils'


type Props = {
    startAt: string
}
const ActivityDuration = ({ startAt }: Props) => {

    const now = new Date()
    const [elapsed, setElapsed] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            const date = new Date(startAt) // transform startAt prop from string format to Date format
            const elapsed = now.getTime() - date.getTime()
            setElapsed(elapsed);

        }, 1000)

        return () => {
            clearInterval(interval)
        }
    })
    const hours = Math.floor(elapsed / 1000 / 60 / 60)
    const minutes = Math.floor((elapsed / 1000 / 60) % 60)
    const seconds = Math.floor((elapsed / 1000) % 60)




    return <div className="font-lg slashed-zero tabular-nums  ">
        {pad(hours)}:
        {pad(minutes)}:
        {pad(seconds)}
    </div>
}
export default ActivityDuration
