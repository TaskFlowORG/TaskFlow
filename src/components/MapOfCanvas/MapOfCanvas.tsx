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
    const topFocus = y/(2000/windowHeight) + 64
    const leftFocus = x/(4000/windowWidth) + 8
    

    const style = {
        width:focusWidth,
        height:focusHeight,
        top: topFocus,
        left: leftFocus,
    }
    return (
        <div className="w-min h-min">

            <img src={imageUrl} className="fixed top-16 bg-white bg-opacity-75 left-2 brightness-75 z-40 border-2" width={width} height={width/2} />
            <div className="fixed z-50 backdrop-brightness-125" style={style}>
                
            </div>
        </div>
    )
}