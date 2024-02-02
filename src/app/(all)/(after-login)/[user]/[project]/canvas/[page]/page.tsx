"use client";

import React, { RefObject, useEffect, useRef, useState } from "react";
import { Task } from "@/model/tasks/Task";
import { TaskCanvasComponent } from "@/components/TaskCanvasComponent/TaskCanvasComponent";
import { TaskCanvas } from "@/model/relations/TaskCanvas";
import { useNavigationWithScroll } from "@/hooks/useNavigationWithScrool";
import { MapOfCanvas } from "@/components/MapOfCanvas/MapOfCanvas";
import { CanvasComponents } from "@/components/CanvasOptions/CanvasComponents";
import { drawLine } from "@/functions";
import { useDraw } from "@/hooks/useDraw";
import { SelectedArea } from "@/components/SelectedArea/SelectedArea";
import { useTheme } from "next-themes";
import { Canvas } from "@/model/pages/Canvas";
import { getData } from "@/services/http/api";
import page from "@/app/(all)/(before-login)/login/page";

export default function CanvasPage({params}:{params:{page:number}}) {
  const [tasks, setTasks] = useState<TaskCanvas[]>([]);
  const[pageObj, setPageObj] = useState<Canvas>()
  const [moving, setMoving] = useState<boolean>(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const { scrollX: x, scrollY: y } = useNavigationWithScroll( moving,elementRef);
  const optionsRef = useRef<HTMLDivElement>(null);
  const [shape, setShape] = useState<string>("line");
  const [isErasing, setIsErasing] = useState<boolean>(false);
  const { clear, canvasRef } = useDraw(drawLine, moving, shape, optionsRef, isErasing);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if(!elementRef.current) return 
    let cursor = "";
    if (moving)
      cursor =
        theme == "dark"
          ? "url('/img/grabDark.svg'), auto"
          : "url('/img/grabLight.svg'), auto";
    else if (theme == "dark")
      cursor = isErasing
        ? "url('/img/eraserDark.svg'), auto"
        : "url('/img/pencilDark.svg'), auto";
    else if (theme == "light")
      cursor = isErasing
        ? "url('/img/eraserLight.svg'), auto"
        : "url('/img/pencilLight.svg'), auto";
    elementRef.current.style.cursor =  cursor;
  }, [moving, theme, isErasing]);

  useEffect(() => {
    (async () => {
        const pagePromise = await getData("canvas", params.page)
        setPageObj(pagePromise);
        setTasks(pagePromise.tasks);
    })()
  }, [])

  return (
    <div
      ref={elementRef}
      className="overflow-scroll flex justify-start items-start w-screen h-full"
    >
      <MapOfCanvas canvas={canvasRef} x={x} y={y} page={pageObj} />
      <div className="w-min h-min relative">
        <canvas
          ref={canvasRef}
          width={4000}
          height={2000}
          className="relative w-[4000px] h-[2000px]"
        />
        {tasks.map((t, index) => (
          <TaskCanvasComponent
            task={t}
            key={index}
            elementRef={elementRef}
            canvasRef={canvasRef}
            page={pageObj}
          />
        ))}
        <CanvasComponents
          moving={moving}
          setMoving={setMoving}
          clear={clear}
          isErasing={isErasing}
          setIsErasing={setIsErasing}
          optionsRef={optionsRef}
          shape={shape}
          setShape={setShape}          
        />
      </div>
      <SelectedArea canvasRef={canvasRef} shape={shape} moving={moving} />

    </div>
  );
}
