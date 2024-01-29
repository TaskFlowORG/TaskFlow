"use client";

import { useEffect, useRef, useState } from "react";
import { useDraw } from "@/hooks/useDraw";
import { Task } from "@/model/tasks/Task";
import { TaskCanvasComponent } from "@/components/TaskCanvasComponent/TaskCanvasComponent";
import { TaskCanvas } from "@/model/relations/TaskCanvas";
import { SelectedArea } from "@/components/SelectedArea/SelectedArea";
import { useNavigationWithScroll } from "@/hooks/useNavigationWithScrool";
import { useTheme } from "next-themes";
import { MapOfCanvas } from "@/components/MapOfCanvas/MapOfCanvas";
import { CanvasOptions } from "@/components/CanvasOptions/CanvasOptions";
import { drawLine } from "@/functions";

export default function canvas() {
  const [tasks, setTasks] = useState<TaskCanvas[]>([
    new TaskCanvas(
      1,
      new Task(1, "Task 1", true, true, null, null, null, null),
      null,
      100,
      50,
      1
    ),
    new TaskCanvas(
      2,
      new Task(1, "Task 2", true, true, null, null, null, null),
      null,
      50,
      100,
      1
    ),
  ]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const[x, setX] = useState(0)
  const[y, setY] = useState(0)
  const [shape, setShape] = useState<string>("line");

  return (
    <div
      ref={elementRef}
      className="overflow-scroll flex justify-start items-start w-screen h-full"
    >
      <MapOfCanvas canvas={canvasRef} x={x} y={y} />
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
          />
        ))}
        <CanvasOptions
          canvasRef={canvasRef}
          elementRef={elementRef}
          setX={setX}
          setY={setY}
          getShape={setShape}
        />
      </div>
    </div>
  );
}
