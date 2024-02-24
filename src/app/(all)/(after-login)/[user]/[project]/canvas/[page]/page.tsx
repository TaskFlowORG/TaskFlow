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
import { getData, postTask } from "@/services/http/api";
import page from "@/app/(all)/(before-login)/login/page";
import { CanvasPage as CanvasPageModel, TaskCanvas } from "@/models";
import { pageService, projectService } from "@/services";

export default function CanvasPage({
  params,
}: {
  params: { page: number; user: number; project: number };
}) {
  const [tasks, setTasks] = useState<TaskCanvas[]>([]);
  const [pageObj, setPageObj] = useState<CanvasPageModel>();
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
    isErasing
  );
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (!elementRef.current) return;
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
    elementRef.current.style.cursor = cursor;
  }, [moving, theme, isErasing]);

  useEffect(() => {
    updatePageAndTasks();
    // eslint-disable-next-line
  }, []);

  async function updatePageAndTasks() {
    const pagePromise = await pageService.findOne(params.page);
    const projectPromise = await projectService.findOne(params.project);
    setPageObj(pagePromise as CanvasPageModel);
    setTasks(pagePromise.tasks as TaskCanvas[]);
  }

  useEffect(() => {
    const url = (pageObj?.draw ?? {data:""}).data;
    const img = new Image();
    const ctx = canvasRef.current?.getContext("2d");
    if (!canvasRef.current || !url || !ctx) return;
    img.src = "data:" + pageObj!.draw.type + ";base64," + pageObj!.draw.data;
    img.onload = function () {
      ctx.drawImage(img, 0, 0, 4000, 2000);
    };
    // eslint-disable-next-line
  }, [pageObj]);
  async function createTask() {
    await postTask(params.user, params.page);
    updatePageAndTasks();
  }
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
          postTask={createTask}
        />
        {/* <img src={archiveToSrc(pageObj!.draw)} alt="" /> */}
      </div>
      <SelectedArea canvasRef={canvasRef} shape={shape} moving={moving} />
    </div>
  );
}
