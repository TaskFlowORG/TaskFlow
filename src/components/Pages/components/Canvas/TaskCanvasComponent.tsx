'use client'


import { RoundedCard } from "../../../RoundedCard"
import { CardContent } from "../../../CardContent"
import {useState, useRef, useEffect, MouseEvent as MouseEventReact} from "react"
import { CanvasPage, TaskCanvas } from "@/models"
import { pageService } from "@/services"


interface Props{
    task: TaskCanvas,
    elementRef: React.RefObject<HTMLDivElement>,
    canvasRef: React.RefObject<HTMLCanvasElement>,
    page:CanvasPage | undefined;
    setDraggingInCanvas:(value:boolean) => void;
    moving:boolean;
}

export const TaskCanvasComponent = ({task, elementRef, page, setDraggingInCanvas, moving}:Props) => { 

    const[x, setX] = useState(task.x)
    const[y, setY] = useState(task.y)
    const[dragging, setDragging] = useState<boolean>(false)
    const draggableRef = useRef<HTMLDivElement>(null);
    const style:Object = {
        top : y,
        left : x,
    }
    const mouseDown = (e:MouseEventReact) => {
        if(e.button == 1) return
        setDragging(!moving); 
        setDraggingInCanvas(!moving)
    }

    useEffect(() => {task.x = x}, [x, task])
    useEffect(() => {task.y = y}, [y, task])
    useEffect(() => {
        const current = elementRef.current
        if(!current) return
        const changeXandY = (e:MouseEvent) => { 
            if(!draggableRef.current || !elementRef.current || !dragging) return
            const offsetX = elementRef.current.scrollLeft + e.pageX - draggableRef.current.clientWidth/2
            const offsetY = elementRef.current.scrollTop + e.pageY - draggableRef.current.clientHeight/2
            if(offsetX > 0 && offsetX < 3700) setX(offsetX)
            if(offsetY > 56 && offsetY < (2000)) setY(offsetY)
        }
        const mouseUp = () => {
            setDragging(false)
            if(!page) return
            pageService.updateXAndY(task)
        }
        current.addEventListener("mousemove", changeXandY)
        current.addEventListener("mouseup", mouseUp)
        return () => {
        if(!current) return
            current.removeEventListener("mousemove", changeXandY)
            current.removeEventListener("mouseup", mouseUp)
        }
    }, [dragging, elementRef, page, task])

    return(
        <div className="w-min h-min p-2 absolute transition-none select-none cursor-[url('/img/grabLight.svg'),auto] dark:cursor-[url('/img/grabDark.svg'),auto] " 
        style={style} onMouseDown={mouseDown} ref={draggableRef} >
            <RoundedCard>
                <CardContent task={task.task} />
            </RoundedCard> 
        </div>
    )
}