import { CanvasPage } from "@/models";
import Image from "next/image";
import {useEffect, useRef, useState } from "react";

interface Props{
    canvas: React.RefObject<HTMLCanvasElement>,
    x: number,
    y: number,
    page:CanvasPage | undefined
}


export const MapOfCanvas = ({canvas, x, y}:Props) => {
    const [windowWidth, setWindowWidth] = useState<number>(0)
    const [windowHeight, setWindowHeight] = useState<number>(0)
    const mapRef = useRef<HTMLCanvasElement>(null)
    const mapCtx = mapRef.current?.getContext("2d")
    const canvasCtx = canvas.current?.getContext("2d")
    const [src, setSrc] = useState<string>("")
    
    // eslint-disable-next-line
    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowWidth(window.innerWidth)
            setWindowHeight(window.innerHeight)
        })
        setWindowWidth(window.innerWidth)
        setWindowHeight(window.innerHeight)
    })
    const width = windowWidth > 600 ? windowWidth/6 : windowWidth/2
    const style = {
        width:width/(4000/windowWidth),
        height:(width/2)/(2000/windowHeight),
        top: (((width/2)*y)/2000) + 64,
        left: ((width*x)/4000) + 8,
    }
    mapCtx?.clearRect(0, 0, width, width/2)
    mapCtx?.drawImage(canvas.current as HTMLCanvasElement, 0, 0, 4000, 2000, 0, 0, width, width/2)
    useEffect(() => {
        reloadSrc()
    })

    const reloadSrc = () => {
        const url = canvas.current?.toDataURL() ?? ""
        setSrc(url)
    }
  
    return {
        map:<div className="w-min h-min pointer-events-none select-none">
            <Image className="fixed top-16 bg-white dark:bg-back-grey select-none bg-opacity-75 left-2 brightness-75 z-20 border-2 dark:border-modal-grey" 
            width={width} height={width/2} src={src} alt="Map Of Canvas" />
            <div className="fixed z-30 backdrop-brightness-125" style={style}>
            </div>
        </div>,
        clearMap: () => setSrc("")
    }
}