import { LegacyRef, RefObject, useEffect, useRef, useState } from 'react'

type Draw = {
  ctx: CanvasRenderingContext2D
  currentPoint: Point
  prevPoint: Point | null
}

type Point = { x: number; y: number }

export const useDraw = (onDraw: ({ ctx, currentPoint, prevPoint }: Draw,) => void, shape:string, optionsRef:RefObject<HTMLDivElement>) => {
  const [mouseDown, setMouseDown] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const prevPoint = useRef<null | Point>(null)

  const clear = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  function testIfInOptions(point:Point):boolean{
    const{x:x, y:y} = point;
    if(!optionsRef) return false
    const rect = optionsRef.current?.getBoundingClientRect();
    if(!rect) return false
    return x >= rect.left &&
            x <= rect.right &&
            y >= rect.top &&
            y <= rect.bottom
  }

  useEffect(() => {
    const handlerLine = (e: MouseEvent) => {
      if(shape == "line" ) {
        if (!mouseDown) return
        const currentPoint = computePointInCanvas(e)
        const ctx = canvasRef.current?.getContext('2d')
        if (!ctx || !currentPoint) return
        onDraw({ ctx, currentPoint, prevPoint: prevPoint.current })
        if (!currentPoint) return
        prevPoint.current = currentPoint
      }
    }

    const handlerOtherShape = (e: MouseEvent) => {
      const currentPoint = computePointInCanvas(e)
      setMouseDown(true)
      if (!currentPoint) return
      prevPoint.current = currentPoint
    }

    const computePointInCanvas = (e: MouseEvent) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      if(testIfInOptions({x:x, y:y})) {
        return null
      }

      return { x, y }
    }

    const mouseUpHandler = (e:MouseEvent) => {
      const currentPoint = computePointInCanvas(e)
      if(shape != "line") {
        const ctx = canvasRef.current?.getContext('2d')
        if (!ctx || !currentPoint) return
        onDraw({ ctx, currentPoint: currentPoint, prevPoint: prevPoint.current })
      }else{
        prevPoint.current = null
      }
      setMouseDown(false)
    }
      // Add event listeners
      canvasRef.current?.addEventListener('mousemove', handlerLine)
      window.addEventListener('mouseup', mouseUpHandler)
      canvasRef.current?.addEventListener('mousedown', handlerOtherShape)

      
      // Remove event listeners
      return () => {
      canvasRef.current?.removeEventListener('mousedown', handlerOtherShape)
      canvasRef.current?.removeEventListener('mousemove', handlerLine)
        window.removeEventListener('mouseup', mouseUpHandler)
      }

  }, [onDraw, shape])

  return { canvasRef, clear }
}