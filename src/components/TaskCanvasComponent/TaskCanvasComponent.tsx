'use client'

import { TaskCanvas } from "@/model/relations/TaskCanvas"
import { RoundedCard } from "../RoundedCard"
import { CardContent } from "../CardContent"
import {useState, useRef, DragEvent, MouseEvent, useEffect} from "react"
import { useTheme } from "next-themes"




interface Props{
    task: TaskCanvas,
}

export const TaskCanvasComponent = ({task}:Props) => { 

    const[x, setX] = useState(task.x)
    const[y, setY] = useState(task.y)
    const[isDragging, setIsDragging] = useState<boolean>(false)
    const{theme, setTheme} = useTheme()
    const elementRef = useRef<HTMLDivElement>(null);

    const style:Object = {
        cursor: theme == "dark"? "url('/img/grabDark.svg'), auto" : "url('/img/grabLight.svg'), auto" ,
        top : y,
        left : x,
    }

    function changeXandY(e:MouseEvent<HTMLDivElement | MouseEvent>){
        if(!isDragging) return
        e.preventDefault()
        if(elementRef.current === null) return  
        const offsetX = window.scrollX + e.clientX - elementRef.current.clientWidth/2
        const offsetY = window.scrollY + e.clientY - elementRef.current.clientHeight/2

        console.log(e.clientX)
        console.log("scroll", window.scrollX)

        if(offsetX > 0 && offsetX < 3700) {
            setX(offsetX)
        }
        if(offsetY > 56 && offsetY < 2000){
            setY(offsetY)
        }
    }
    useEffect(()=> {
        window.addEventListener("mouseup", () => setIsDragging(false))
        return () => {
            window.removeEventListener("mouseup", () => setIsDragging(false))
        }
    }, [isDragging])

    return(
        <div className="w-min h-min p-2 absolute transition-none" onMouseDown={() => setIsDragging(true)}
        onMouseMove={e => changeXandY(e)} style={style} ref={elementRef} >
            <RoundedCard>
                {/* <CardContent task={task.task} /> */}
                <p>{task.task?.name}</p>
            </RoundedCard>
        </div>
    )
}