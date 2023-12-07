'use client'

import { TaskCanvas } from "@/model/relations/TaskCanvas"
import { RoundedCard } from "../RoundedCard"
import { CardContent } from "../CardContent"
import { useEffect, useState } from "react"
import { DraggableProvided, DraggableStyle, NotDraggingStyle } from "@hello-pangea/dnd"



interface Props{
    task: TaskCanvas,
    provided: DraggableProvided
}

export const TaskCanvasComponent = ({task, provided}:Props) => { 

    useEffect(() => {
    }, [task])

    return(
        <div className="w-min h-min p-2" 
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={{
            position: 'absolute',
            top: task.y,
            left: task.x,
            ...provided.draggableProps.style,
        }}
        onMouseDown={(e) => {
            console.log(e)
            //quero que o pai desse elemento tenha uma funcai drag
            e.currentTarget.parentElement?.dispatchEvent(new MouseEvent('mouseup', {clientX: e.clientX, clientY: e.clientY}))
        }}
        >
            <RoundedCard>
                <p>{task.task?.name}</p>
            </RoundedCard>
        </div>
    )
}