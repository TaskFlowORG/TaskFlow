
import { useTheme } from "next-themes";
import { LegacyRef, useEffect, useRef, useState } from "react";
import { set } from "zod";

export const useNavigationWithScroll = (moving:boolean, elementRef:React.RefObject<HTMLDivElement>) => {
    const [mouseDown, setMouseDown] = useState(false)
    const [prevX, setPrevX] = useState(0);
    const [prevY, setPrevY] = useState(0);
    const{theme, setTheme} = useTheme()
    const [scrollX, setScrollX] = useState(0);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {

        const handleMouseDown = (e:MouseEvent) => {
            if(!elementRef.current) return
            if(e.button != 1 && !moving) return
            e.preventDefault()
            setMouseDown(true)
            setPrevX(elementRef.current?.scrollLeft + e.pageX);
            setPrevY(elementRef.current?.scrollTop + e.pageY);
        }

        const handleMouseMove = (e:MouseEvent) => {
            if(!mouseDown) return
            if(!elementRef.current) return
        
            const currentX = elementRef.current?.scrollLeft + e.pageX;
            const currentY = elementRef.current?.scrollTop + e.pageY;

            const difX = prevX - currentX;
            const difY = prevY - currentY;

            const deltaX =  elementRef.current?.scrollLeft + difX;
            const deltaY =  elementRef.current?.scrollTop + difY;
            elementRef.current?.scrollTo({left:deltaX, top:deltaY})

        }
        const whileWheel = (e:WheelEvent) => {
            e.preventDefault();
            if(!elementRef.current) return
            elementRef.current?.scrollTo({ left:(elementRef.current?.scrollLeft + e.deltaX), top:(elementRef.current?.scrollTop + e.deltaY)})
        }
        const handeMouseUp = (e:MouseEvent) => {
            if(e.button != 1  && !moving) return
            if(!elementRef.current) return
            setMouseDown(false)
            setPrevX(elementRef.current?.scrollLeft + e.pageX);
            setPrevY(elementRef.current?.scrollTop + e.pageY);
            setScrollX(elementRef.current?.scrollLeft)
            setScrollY(elementRef.current?.scrollTop)
        }

        elementRef.current?.addEventListener("mousedown", handleMouseDown)
        elementRef.current?.addEventListener("mousemove", handleMouseMove)
        window.addEventListener("mouseup", handeMouseUp)
        elementRef.current?.addEventListener("wheel", whileWheel)

        return () => {
            elementRef.current?.removeEventListener("mousedown", handleMouseDown)
            elementRef.current?.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("mouseup", handeMouseUp)
            elementRef.current?.removeEventListener("wheel", whileWheel)
        }
    }, [elementRef, mouseDown, theme,moving])

    return { scrollX, scrollY, grabbing:mouseDown }
}