"use client";

import { useEffect, useRef, useState } from "react";
import { Task } from "@/model/tasks/Task";
import { TaskCanvasComponent } from "@/components/TaskCanvasComponent/TaskCanvasComponent";
import { TaskCanvas } from "@/model/relations/TaskCanvas";
import { useNavigationWithScroll } from "@/hooks/useNavigationWithScrool";
import { MapOfCanvas } from "@/components/MapOfCanvas/MapOfCanvas";
import { CanvasComponents } from "@/components/CanvasOptions/CanvasComponents";
import { set } from "zod";

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
  const [moving, setMoving] = useState<boolean>(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const { scrollX: x, scrollY: y } = useNavigationWithScroll( moving,elementRef);
  const [drawing, setDrawing] = useState<boolean>(false);
  
  return (
    <div
      ref={elementRef}
      className="overflow-scroll flex justify-start items-start w-screen h-full"
    >
      <MapOfCanvas canvas={canvasRef} x={x} y={y} drawing={drawing} />
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
        <CanvasComponents
          canvasRef={canvasRef}
          elementRef={elementRef}
          moving={moving}
          setMoving={setMoving}
          setDrawing={setDrawing}
        />
      </div>
    </div>
  );
}
