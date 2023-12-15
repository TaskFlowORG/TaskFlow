"use client";

import { FC, MouseEventHandler, useEffect, useRef, useState } from "react";
import { useDraw } from "@/hooks/useDraw";
import { Task } from "@/model/tasks/Task";
import { TaskCanvasComponent } from "@/components/TaskCanvasComponent/TaskCanvasComponent";
import { TaskCanvas } from "@/model/relations/TaskCanvas";
import { Page } from "@/model/pages/Page";
import { TypeOfPage } from "@/model/enums/TypeOfPage";
import { AddTask, Broom, Circle, Eraser, Line, Pencil, Square, Triangle } from "@/components/icons";
import { If } from "@/components/If";
import { SelectWithImage } from "@/components/SelectWithImage/SelectwithImage";
import { SelectedArea } from "@/components/SelectedArea/SelectedArea";
import { drawLine } from "@/functions";
import { useNavigationWithScroll } from "@/hooks/useNavigationWithScrool";
import { useTheme } from "next-themes";
import { MapOfCanvas } from "@/components/MapOfCanvas/MapOfCanvas";


type Draw = {
  ctx: CanvasRenderingContext2D;
  currentPoint: Point;
  prevPoint: Point | null;
};

type Point = { x: number; y: number };

interface pageProps { }

const page: FC<pageProps> = ({ }) => {
  const [isErasing, setIsErasing] = useState<boolean>(false);
  const [lineWidth, setLineWidth] = useState<number>(5);
  const [lineColor, setLineColor] = useState<string>("#000000");
  const optionsRef = useRef<HTMLDivElement>(null);
  const [tasks, setTasks] = useState<TaskCanvas[]>([
    new TaskCanvas(1, new Task(1, "Task 1", true, true, null, null, null, null), null, 100, 50),
    new TaskCanvas(2, new Task(1, "Task 2", true, true, null, null, null, null), null, 50, 100),
  ]);
  const [shape, setShape] = useState<string>("line");
  const { canvasRef, clear } = useDraw(drawLine, shape, optionsRef, lineWidth, "#000000", isErasing);
  const { elementRef, scrollX: x, scrollY: y } = useNavigationWithScroll()
  const { theme, setTheme } = useTheme();


  const style = {
    cursor: "url('" + (isErasing ? theme == "dark" ? "/img/eraserDark.svg" : "/img/eraserLight.svg"
      : theme == "dark" ? "/img/pencilDark.svg" : "/img/pencilLight.svg") + "'), auto"
  }

  return (
    <div ref={elementRef} style={style} className="overflow-scroll flex justify-start items-start w-screen h-full">
      <MapOfCanvas canvas={canvasRef} x={x} y={y} />
      <div className="w-min h-min relative">
        <canvas
          ref={canvasRef}
          width={4000}
          height={2000}
          className="relative w-[4000px] h-[2000px]"
        />
        {tasks.map((t, index) => (
          <TaskCanvasComponent task={t} key={index} elementRef={elementRef} canvasRef={canvasRef} />
        ))}
      </div>

      <div className="fixed bottom-0 flex  dark:bg-modal-grey items-center justify-around bg-input-grey rounded-t-2xl cursor-default
        h-min w-full py-2 sm:py-6 sm:flex-col sm:rounded-l-2xl sm:rounded-r-none sm:h-[22rem] sm:w-min sm:top-14 sm:right-0" ref={optionsRef}>
        <button onClick={() => setIsErasing(!isErasing)}>
          <If condition={isErasing}>
            <Eraser />
            <Pencil />
          </If>
        </button>
        <input type="range" max={50} min={2} value={lineWidth}
          className=" -rotate-90 w-16 h-16 z-30 cursor-pointer" onChange={(e) => setLineWidth(parseInt(e.target.value))} />
        <div className="w-8 h-8 bg-transparent flex ">
          <SelectWithImage list={[{ value: "line", image: <Line /> }, { value: "square", image: <Square /> }, { value: "circle", image: <Circle /> }, { value: "triangle", image: <Triangle /> }]}
            selected={shape} onChange={s => setShape(s)} />
        </div>
        <span className="w-6 h-6 rounded-full flex cursor-pointer items-center justify-center" style={{ backgroundColor: lineColor }}>
          <input type="color" value={lineColor}
            className="w-6 h-6 opacity-0 cursor-pointer" onChange={(e) => setLineColor(e.target.value)}
          />
        </span>
        <button onClick={() => clear()}><Broom /></button>
        <button><AddTask /></button>
      </div>
      <SelectedArea canvasRef={canvasRef} shape={shape} />
    </div>
  );
};

export default page;
