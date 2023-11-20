'use client'

import { useEffect, useState } from "react"

export const TaskCalendar = ({ task }) => {
    const [color, setColor] = useState("");
    useEffect(() => {
        setColor(task.color ? "bg-[" + task.color + "]" : "bg-pink")
    }, [task])



    return (
        <div title={task.name} className={`h-full border-[1px] border-white -mx-1 aspect-square rounded-full `
            + (color)}>
        </div>
    )

}