'use client'

import { TaskCanvas } from "@/model/relations/TaskCanvas"
import { RoundedCard } from "../RoundedCard"
import { CardContent } from "../CardContent"
import {useState, useRef, DragEvent, MouseEvent, useEffect} from "react"
import { useTheme } from "next-themes"


interface Props{
    task: TaskCanvas,
    elementRef: React.RefObject<HTMLDivElement>,
    canvasRef: React.RefObject<HTMLCanvasElement>
}

export const TaskCanvasComponent = ({task, elementRef, canvasRef}:Props) => { 

    const[x, setX] = useState(task.x)
    const[y, setY] = useState(task.y)
    const{theme, setTheme} = useTheme()
    const draggableRef = useRef<HTMLDivElement>(null);

    const style:Object = {
        cursor: theme == "dark"? "url('/img/grabDark.svg'), auto" : "url('/img/grabLight.svg'), auto" ,
        top : y,
        left : x,
    }

    function changeXandY(e:DragEvent){
        e.preventDefault()
        if(!draggableRef.current || !elementRef.current) return  
        const offsetX = elementRef.current.scrollLeft + e.pageX - draggableRef.current.clientWidth/2
        const offsetY = elementRef.current.scrollTop + e.pageY - draggableRef.current.clientHeight/2

        if(offsetX > 0 && offsetX < 3700) {
            setX(offsetX)
        }
        if(offsetY > 56 && offsetY < (2000)){
            setY(offsetY)
        }

    }
    elementRef.current?.addEventListener("dragover", e => {
        e.preventDefault()
    })

    function removeGhost(e:DragEvent){
        e.dataTransfer.setDragImage(new Image(), 0, 0)
    }
    return(
        <div className="w-min h-min p-2 absolute transition-none draggable select-none " draggable onDragStart={removeGhost}
        onDrag={changeXandY} style={style} ref={draggableRef} onDragEnd={changeXandY}>
            <RoundedCard>
                {/* <CardContent task={task.task} /> */}
                <p>{task.task?.name}</p>
            </RoundedCard>
        </div>
    )
}