'use client'

import { TaskCanvas } from "@/model/relations/TaskCanvas"
import { RoundedCard } from "../RoundedCard"
import { CardContent } from "../CardContent"
import {useState, useRef, DragEvent} from "react"




interface Props{
    task: TaskCanvas,
}

export const TaskCanvasComponent = ({task}:Props) => { 

    const[x, setX] = useState(task.x)
    const[y, setY] = useState(task.y)
    const elementRef = useRef<HTMLDivElement>(null);

    const style:Object = {
        top : y+"%",
        left : x+"%"
    }

    function changeXandY(e:DragEvent<HTMLDivElement>){
        e.preventDefault()
        if(elementRef.current === null) return  
        const offsetX = e.clientX - elementRef.current.clientWidth/2
        const offsetY = e.clientY - elementRef.current.clientHeight/2
        
        const percentageX = offsetX/window.innerWidth*100
        const percentageY = offsetY/window.innerHeight*100
        if(percentageX > 1 && percentageX < 85) {
            setX(percentageX)
        }
        if(percentageY > 5 && percentageY < 100){
            setY(percentageY)
        }
    }

    function removeGhost(e:DragEvent<HTMLDivElement>){
        const ghostImage = new Image();
        ghostImage.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABXElEQVR42mL8//8/AyURP6Ksgx3oDAzQA6oU2GLiqAVxGbgTWcEPsCIzIyWskBoFwZoh0GkAwMEJyQFOwYOQPYIE2BthFuGwBwKtA9gcRRiwCmEXYRnwCGmAQdBFoCnIyD8QFgAWvA0wwA1AAE9QMgThmQA0yCXrAkQMv0DDQBJMIgS1BDQCY1IuYFAFHAazAJwDVQISkBS4BqgPqkAHAakAbIMjyIYADP9AAkAAmwQ9SAIzIyWwAowFowT6FBMRCgCLyDgFUKL0YAcAo8AOkJAhBUBGQCRaR8EG8IRCBJ4R6gDpAGQJFhwCHAEeQFHtYJhIACMKYjyINwCmEIqA2YKsZBojBwGNoA9AgDoA9gEZAHYCgAADPAF8jGL8vH9UAAAAASUVORK5CYII=';
        e.dataTransfer.setDragImage(ghostImage, 0, 0);
    }
    return(
        <div className="w-min h-min p-2 absolute transition-none" draggable onDragStart={e => removeGhost(e)}
        onDrag={e => changeXandY(e)} style={style} ref={elementRef}>
            <RoundedCard>
                {/* <CardContent task={task.task} /> */}
                <p>{task.task?.name}</p>
            </RoundedCard>
        </div>
    )
}