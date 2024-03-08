import { register } from "module";
import { ComponentProps, PointerEventHandler, useEffect, useRef, useState } from "react";
import { set } from "react-hook-form";


interface Props {
    children: React.ReactNode
}

export const Scrollable = ({ children }: Props) => {
    const ref = useRef<HTMLDivElement>(null);
    const [dragging, setDragging] = useState<boolean>(false)
    const [clickX, setClickX] = useState<number>(0)
    const mouseMove = (ev: PointerEvent) => {
        if (!ref.current) return
        dragging && (ref.current.scrollLeft -=  ev.movementX)
        setClickX(ref.current.scrollLeft)
    }
    const handleMouseUp = () => setDragging(false)

    useEffect(() => {
        window.addEventListener("mouseup", handleMouseUp)
        window.addEventListener("pointermove", mouseMove)
        return () => { 
            window.removeEventListener("mouseup", handleMouseUp) 
            window.removeEventListener("pointermove", mouseMove)
        }
    }, [window, dragging])

    return (
        <div className="overflow-y-auto h-min w-min select-none cursor-grab aria-pressed:cursor-grabbing " aria-pressed={dragging} ref={ref}
            onPointerDown={e => { setDragging(true); ref.current && setClickX(ref.current.scrollLeft) }} >
            {children}
        </div>
    )
}