'use client'

import { FC, MouseEventHandler, useRef, useState } from 'react'
import { useDraw } from '@/hooks/useDraw'
import { Task } from '@/model/tasks/Task'
import { TaskPage } from '@/model/relations/TaskPage'
import { TaskCanvas } from '@/components/TaskCanvas'
import { Page } from '@/model/pages/Page'
import { TypeOfPage } from '@/model/enums/TypeOfPage'

type Draw = {
    ctx: CanvasRenderingContext2D
    currentPoint: Point
    prevPoint: Point | null
  }
  
  type Point = { x: number; y: number }
  
interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const { canvasRef, onMouseDown, clear } = useDraw(drawLine)
  const [isErasing, setIsErasing] = useState<boolean>(false)
  const [lineWidth, setLineWidth] = useState<number>(5)
  const [lineColor, setLineColor] = useState<string>('#000000')
  const [tasks, setTasks] = useState<TaskPage[]>([
    new TaskPage(1, 1, new Task(1, "AAAA", [], [], [], [], false, [], []), null, 600, 600),
    new TaskPage(2, 1, new Task(1, "BBB", [], [], [], [], false, [], []), null, 600, 600)
  ]);


  function drawLine({ prevPoint, currentPoint, ctx }: Draw) {
    const { x: currX, y: currY } = currentPoint


    if(isErasing){
        ctx.globalCompositeOperation = 'destination-out'
    }else{
        ctx.globalCompositeOperation = 'source-over'
    }

    let startPoint = prevPoint ?? currentPoint
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = lineColor
    ctx.beginPath()
    ctx.moveTo(startPoint.x, startPoint.y)
    ctx.lineTo(currX, currY)
    ctx.stroke()

    ctx.fillStyle = lineColor
    ctx.beginPath()
    ctx.arc(startPoint.x, startPoint.y, (lineWidth/2), 0, (lineWidth/2) * Math.PI)
    ctx.fill()
  }

  return (

    <>
    
    <canvas
    ref={canvasRef}
    onMouseDown={onMouseDown}
    width={1920}
    height={930}
    className='w-full h-full'
    >
    </canvas>
    <button onClick={() => setIsErasing(!isErasing)}>A</button>
    <input type="color" value={lineColor} onChange={e => setLineColor(e.target.value)} />
    <input type="range" max={50} min={2} value={lineWidth} onChange={e => setLineWidth(parseInt(e.target.value))} />
    {
        tasks.map((t, index) =>  <TaskCanvas task={t} key={index}/>)
    }
    </>
    
  )
}

export default page