'use client'

import { TaskPage } from "@/model/relations/TaskPage"
import { RoundedCard } from "../RoundedCard"
import { CardContent } from "../CardContent"
import { DragEvent, useEffect, useRef, useState } from "react"

interface Props{
    task: TaskPage
}

export const TaskCanvas = ({task}:Props) => {

    const[x, setX] = useState(task.x)
    const[y, setY] = useState(task.y)
    const elementRef = useRef<HTMLDivElement>(null);

    const style:Object = {
        top : y,
        left : x
    }

    function changeXandY(e:DragEvent<HTMLDivElement>){

        const offsetX = e.pageX
        const offsetY = e.pageY
        
        if(offsetX > 0 && offsetX < window.innerWidth-50){
            setX(offsetX)
        }
        if(offsetY > 0){
            setY(offsetY)
        }
    }
    return(
        <div className="w-min h-min p-2 absolute" draggable onDrag={e => changeXandY(e)} style={style} ref={elementRef}>
            <RoundedCard>
                <CardContent task={task.task} />
            </RoundedCard>
        </div>
    )
}