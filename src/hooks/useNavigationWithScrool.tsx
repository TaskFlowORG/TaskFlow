
import { useTheme } from "next-themes";
import { LegacyRef, useEffect, useRef, useState } from "react";

export const useNavigationWithScroll = () => {
    const elementRef = useRef<HTMLDivElement>(null)
    const [mouseDown, setMouseDown] = useState(false)
    const [prevX, setPrevX] = useState(0);
    const [oldCursor, setOldCursor] = useState('')
    const [prevY, setPrevY] = useState(0);
    const{theme, setTheme} = useTheme()

    useEffect(() => {

        const handleMouseDown = (e:MouseEvent) => {
            if(!elementRef.current) return
            if(e.button != 1) return
            e.preventDefault()
            if (e.button != 1) return
            setMouseDown(true)
            setPrevX(window.scrollX + e.pageX);
            setPrevY(window.scrollY + e.pageY);
            setOldCursor(getComputedStyle(elementRef.current).cursor)
            elementRef.current.style.cursor = "url('"+(theme == "dark" ? "/img/grabDark.svg" : "/img/grabLight.svg")+"'), auto"
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
        const handeMouseUp = (e:MouseEvent) => {
            if(e.button != 1) return
            if(!elementRef.current) return
            elementRef.current.style.cursor = oldCursor
            setMouseDown(false)
        }

        window.addEventListener("mousedown", handleMouseDown)
        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("mouseup", handeMouseUp)
        window.addEventListener("wheel", whileWheel)


        return () => {
            window.removeEventListener("mousedown", handleMouseDown)
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("mouseup", handeMouseUp)
            window.removeEventListener("wheel", whileWheel)
        }
    }, [elementRef, mouseDown, theme])

    return { elementRef }
}