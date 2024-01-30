
import React, { ElementRef, LegacyRef, MutableRefObject, RefObject, useEffect, useRef, useState } from 'react'
import { drawLine } from "@/functions";

type Draw = {
  ctx: CanvasRenderingContext2D
  currentPoint: Point
  prevPoint: Point | null
}

type Point = { x: number; y: number }

export const useDraw = (onDraw: ({ ctx, currentPoint, prevPoint }: Draw, shape:string, isErasing:boolean) => void, 
moving:boolean, shape:string, optionsRef:RefObject<HTMLDivElement>, isErasing:boolean) => {
 
  const [mouseDown, setMouseDown] = useState<boolean>(false)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const prevPoint = useRef<null | Point>(null)
  const [tool, setTool] = useState<boolean>(isErasing)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  

  const clear = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  function testIfInOptions(point:Point, e:MouseEvent):boolean{
    const{x:x, y:y} = point;
    if(!optionsRef) return false
    const rect = optionsRef.current?.getBoundingClientRect();
    if(!rect) return false
    return (x >= rect.x && y <= rect.y + rect.height && y >= rect.y)
  }


  useEffect(() => {
    const handlerLine = (e: MouseEvent) => {
      if(shape == "line" ) {
        if (!mouseDown || moving) return
        const currentPoint = computePointInCanvas(e)
        const ctx = canvasRef.current?.getContext('2d')
        if (!ctx || !currentPoint) return
        onDraw({ ctx, currentPoint, prevPoint: prevPoint.current }, shape, tool)
        if (!currentPoint) return
        prevPoint.current = currentPoint
      }
    }

    const handlerOtherShape = (e: MouseEvent) => {
      if(e.button == 1 || moving) return
      setTool(e.button == 0 ?  isErasing : !isErasing )
      setMouseDown(true)
      const currentPoint = computePointInCanvas(e)
      if (!currentPoint) return
      prevPoint.current = currentPoint
    }

    const computePointInCanvas = (e: MouseEvent) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      if(testIfInOptions({x:e.pageX, y:e.pageY}, e)) {
        return null
      }
      return { x, y }
    }

    const mouseUpHandler = (e:MouseEvent) => {
      if(e.button == 1 || moving) return
      const currentPoint = computePointInCanvas(e)
      if(shape != "line") {
        const ctx = canvasRef.current?.getContext('2d')
        if (!ctx || !currentPoint) return
        onDraw({ ctx, currentPoint: currentPoint, prevPoint: prevPoint.current }, shape, tool)
      }else{
        prevPoint.current = null
      }
      setMouseDown(false)
    }
      // Add event listeners
      canvasRef.current?.addEventListener('mousemove', handlerLine)
      window.addEventListener('mouseup', mouseUpHandler)
      canvasRef.current?.addEventListener('mousedown', handlerOtherShape)
      canvasRef.current?.addEventListener('contextmenu', e => e.preventDefault() )

      // Remove event listeners
      return () => {
      canvasRef.current?.removeEventListener('mousedown', handlerOtherShape)
      canvasRef.current?.removeEventListener('mousemove', handlerLine)
        window.removeEventListener('mouseup', mouseUpHandler)
      }

  }, [onDraw, shape, mouseDown, isErasing, moving])

  return { clear , canvasRef}
}