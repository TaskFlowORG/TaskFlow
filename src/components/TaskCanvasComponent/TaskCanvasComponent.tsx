'use client'

import { TaskCanvas } from "@/model/relations/TaskCanvas"
import { RoundedCard } from "../RoundedCard"
import { CardContent } from "../CardContent"
import {useState, useRef, useEffect} from "react"
import { useTheme } from "next-themes"




interface Props{
    task: TaskCanvas,
    elementRef: React.RefObject<HTMLDivElement>,
    canvasRef: React.RefObject<HTMLCanvasElement>
}

export const TaskCanvasComponent = ({task, elementRef, canvasRef}:Props) => { 

    const[x, setX] = useState(task.x)
    const[y, setY] = useState(task.y)
    const[dragging, setDragging] = useState<boolean>(false)
    const{theme, setTheme} = useTheme()
    const draggableRef = useRef<HTMLDivElement>(null);

    const style:Object = {
        cursor: theme == "dark"? "url('/img/grabDark.svg'), auto" : "url('/img/grabLight.svg'), auto" ,
        top : y,
        left : x,
    }

    function changeXandY(e:MouseEvent){
            if(!draggableRef.current || !elementRef.current || !dragging) return  
            const offsetX = elementRef.current.scrollLeft + e.pageX - draggableRef.current.clientWidth/2
            const offsetY = elementRef.current.scrollTop + e.pageY - draggableRef.current.clientHeight/2
    
            if(offsetX > 0 && offsetX < 3700) {
                setX(offsetX)
            }
            if(offsetY > 56 && offsetY < (2000)){
                setY(offsetY)
            }
    }

    useEffect(() => {
        if(dragging){
            elementRef.current?.addEventListener("mousemove", changeXandY)
            elementRef.current?.addEventListener("mouseup", () => setDragging(false))
        }
        return () => {
            elementRef.current?.removeEventListener("mousemove", changeXandY)
            elementRef.current?.removeEventListener("mouseup", () => setDragging(false))

        }
    }, [dragging])




    return(
        <div className="w-min h-min p-2 absolute transition-none select-none " style={style} onMouseDown={() => setDragging(true)} ref={draggableRef} >
            <RoundedCard>
                <CardContent task={task.task} />
            </RoundedCard> 
        </div>
    )
}