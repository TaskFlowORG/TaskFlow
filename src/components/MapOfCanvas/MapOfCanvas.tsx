import { use, useEffect, useState } from "react";

interface Props{
    canvas: React.RefObject<HTMLCanvasElement>,
    x: number,
    y: number,
}


export const MapOfCanvas = ({canvas, x, y}:Props) => {
    const imageUrl = canvas.current?.toDataURL() || "";
    const [windowWidth, setWindowWidth] = useState<number>(0)
    const [windowHeight, setWindowHeight] = useState<number>(0)
    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowWidth(window.innerWidth)
            setWindowHeight(window.innerHeight)
        })
        setWindowWidth(window.innerWidth)
        setWindowHeight(window.innerHeight)
    }, [])

    const width = windowWidth > 600 ? windowWidth/6 : windowWidth/2
    const focusWidth = width/(4000/windowWidth)
    const focusHeight = (width/2)/(2000/windowHeight)
    const topFocus = (((width/2)*y)/2000) + 64
    const leftFocus = ((width*x)/4000) + 8

    

    const style = {
        width:focusWidth,
        height:focusHeight,
        top: topFocus,
        left: leftFocus,
    }
    return (
        <div className="w-min h-min pointer-events-none">

            <img src={imageUrl} className="fixed top-16 bg-white dark:bg-back-grey bg-opacity-75 left-2 brightness-75 z-40 border-2 dark:border-modal-grey" width={width} height={width/2} />
            <div className="fixed z-50 backdrop-brightness-125" style={style}>
                
            </div>
        </div>
    )
}