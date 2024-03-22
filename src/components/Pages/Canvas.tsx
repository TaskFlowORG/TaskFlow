"use client";

import React, { useEffect, useRef, useState } from "react";
import { TaskCanvasComponent } from "./components";
import { useNavigationWithScroll, useDraw } from "./hooks";
import { MapOfCanvas } from "./components";
import { CanvasComponents } from "./components";
import { drawLine } from "./functions";
import { SelectedArea } from "./components";
import { useTheme } from "next-themes";
import { CanvasPage, TaskCanvas, User } from "@/models";
import { pageService, taskService } from "@/services";

interface Props{
    user:User, 
    page:CanvasPage
} 


export const Canvas = ({page, user}: Props) => {

  const [moving, setMoving] = useState<boolean>(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const { scrollX: x, scrollY: y, grabbing } = useNavigationWithScroll(moving,elementRef);
  const optionsRef = useRef<HTMLDivElement>(null);
  const [shape, setShape] = useState<string>(localStorage.getItem("canvas_shape") ?? "line");
  const [isErasing, setIsErasing] = useState<boolean>(localStorage.getItem("canvas_is_erasing") === "true" ? true : false);
  const { clear, canvasRef } = useDraw( drawLine , moving, page);
  const {map, clearMap} = MapOfCanvas({canvas:canvasRef, x:x, y:y, page:page})
  const { theme } = useTheme();

  useEffect(() => {
    if (!elementRef.current) return;
    let cursor = "";
    if (moving || grabbing){
      cursor = theme == "dark"
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
    updateDraw();
});

const updateDraw = () => {
  if (!page || !canvasRef || !canvasRef.current) return;
  canvasRef.current.toBlob((draw) => {
    if (draw) {
      pageService.updateDraw(draw, page.id);
    }
  });
  setTimeout(updateDraw, 5000);
}

  useEffect(() => {
    const url = (page?.draw ?? {data:""}).data;
    const img = new Image();
    const ctx = canvasRef.current?.getContext("2d");
    if (!canvasRef.current || !url || !ctx) return;
    img.src = "data:" + page!.draw.type + ";base64," + page!.draw.data;
    img.onload = function () {
      ctx.drawImage(img, 0, 0, 4000, 2000);
    };
  }, [page, canvasRef]);

  async function createTask() {
    await taskService.insert(page.id,user.username);
  }

  return (
    <div ref={elementRef} className="overflow-hidden flex justify-start items-start w-screen h-full" onWheelCapture={e =>  e.stopPropagation()}>
      {map}
      <div className="w-min h-min relative">
        <canvas ref={canvasRef} width={4000} height={2000} className="relative w-[4000px] h-[2000px]"/>
        {page.tasks.map((t, index) => (
          <TaskCanvasComponent task={t as TaskCanvas}
            key={index} elementRef={elementRef} canvasRef={canvasRef}
            page={page} moving={moving}
          />
        ))}
        <CanvasComponents moving={moving} setMoving={setMoving}
          clear={() => {clear(); clearMap()}} isErasing={isErasing} setIsErasing={setIsErasing}
          optionsRef={optionsRef} shape={shape} setShape={setShape} postTask={createTask}
        />
        {/* <img src={archiveToSrc(page!.draw)} alt="" /> */}
      </div>
      <SelectedArea canvasRef={canvasRef} shape={shape} moving={moving} />
    </div>  
  );
}
