"use client";

import React, { RefObject, useEffect, useRef, useState } from "react";
import { TaskCanvasComponent } from "@/components/TaskCanvasComponent/TaskCanvasComponent";
import { useNavigationWithScroll } from "@/hooks/useNavigationWithScrool";
import { MapOfCanvas } from "@/components/MapOfCanvas/MapOfCanvas";
import { CanvasComponents } from "@/components/CanvasOptions/CanvasComponents";
import { archiveToSrc, drawLine } from "@/functions";
import { useDraw } from "@/hooks/useDraw";
import { SelectedArea } from "@/components/SelectedArea/SelectedArea";
import { useTheme } from "next-themes";
import { CanvasPage, CanvasPage as CanvasPageModel, TaskCanvas } from "@/models";
import { pageService, taskService } from "@/services";

interface Props{
    user:string, 
    page:CanvasPage
} 


export const Canvas = ({
  page, user
}: Props) => {
  const [moving, setMoving] = useState<boolean>(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const { scrollX: x, scrollY: y } = useNavigationWithScroll(
    moving,
    elementRef
  );
  const optionsRef = useRef<HTMLDivElement>(null);
  const [shape, setShape] = useState<string>("line");
  const [isErasing, setIsErasing] = useState<boolean>(false);
  const { clear, canvasRef } = useDraw(
    drawLine,
    moving,
    shape,
    optionsRef,
    isErasing,
    page
  );
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (!elementRef.current) return;
    let cursor = "";
  
    if (moving){
      cursor =
        theme == "dark"
          ? "url('/img/grabDark.svg'), auto"
          : "url('/img/grabLight.svg'), auto";
    }else if (theme == "dark"){
    cursor = isErasing 
        ? "url('/img/eraserDark.svg'), auto"
        : "url('/img/pencilDark.svg'), auto";
    }else if (theme == "light"){
    cursor = isErasing 
        ? "url('/img/eraserLight.svg'), auto"
        : "url('/img/pencilLight.svg'), auto";
    }
    if(!canvasRef || !canvasRef.current) return
    canvasRef.current.style.cursor = cursor;
});


  useEffect(() => {
    const url = (page?.draw ?? {data:""}).data;
    const img = new Image();
    const ctx = canvasRef.current?.getContext("2d");
    if (!canvasRef.current || !url || !ctx) return;
    img.src = "data:" + page!.draw.type + ";base64," + page!.draw.data;
    img.onload = function () {
      ctx.drawImage(img, 0, 0, 4000, 2000);
    };
    // eslint-disable-next-line
  }, [page]);
  async function createTask() {
    await taskService.insert(page.id,user);
  }
  return (
    <div
      ref={elementRef}
      className="overflow-scroll flex justify-start items-start w-screen h-full"
    >
      <MapOfCanvas canvas={canvasRef} x={x} y={y} page={page} />
      <div className="w-min h-min relative" 
     >
        
        <canvas
          ref={canvasRef}
          width={4000}
          height={2000}
          className="relative w-[4000px] h-[2000px]"
        />
        {page.tasks.map((t, index) => (
          <TaskCanvasComponent
            task={t as TaskCanvas}
            key={index}
            elementRef={elementRef}
            canvasRef={canvasRef}
            page={page}
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
          postTask={createTask}
        />
        {/* <img src={archiveToSrc(page!.draw)} alt="" /> */}
      </div>
      <SelectedArea canvasRef={canvasRef} shape={shape} moving={moving} />
    </div>
  );
}
