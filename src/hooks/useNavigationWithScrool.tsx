
import { LegacyRef, useEffect, useRef, useState } from "react";

export const useNavigationWithScroll = () => {
    const elementRef = useRef<HTMLDivElement>(null)
    const [mouseDown, setMouseDown] = useState(false)
    const [prevX, setPrevX] = useState(0);
    const [prevY, setPrevY] = useState(0);

    useEffect(() => {

        const handleMouseDown = (e:MouseEvent) => {
            e.preventDefault()
            if (e.button != 1) return
            setMouseDown(true)
            setPrevX(window.scrollX + e.pageX);
            setPrevY(window.scrollY + e.pageY);

        }
        const handleMouseMove = (e:MouseEvent) => {
            if(!mouseDown) return
            if(!elementRef.current) return
        
            const currentX = window.scrollX + e.pageX;
            const currentY = window.scrollY + e.pageY;

            const difX = prevX - currentX;
            const difY = prevY - currentY;

            const deltaX =  window.scrollX + difX;
            const deltaY =  window.scrollY + difY;

            window.scrollTo({left:deltaX, top:deltaY})

        }
        const whileWheel = (e:WheelEvent) => {
            e.preventDefault();
            if(!window) return
            window.scrollTo({ left:(window.scrollX + e.deltaX), top:(window.scrollY + e.deltaY)})
        }

        window.addEventListener("mousedown", handleMouseDown)
        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("mouseup", () => setMouseDown(false))
        window.addEventListener("wheel", whileWheel)


        return () => {
            window.removeEventListener("mousedown", handleMouseDown)
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("mouseup", () => setMouseDown(false))
            window.removeEventListener("wheel", whileWheel)
        }
    }, [elementRef, mouseDown])

    return { elementRef }
}