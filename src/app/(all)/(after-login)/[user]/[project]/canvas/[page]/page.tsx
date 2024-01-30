"use client";

import React, { RefObject, useEffect, useRef, useState } from "react";
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
  const [canvasRef, setCavasRef] = useState<RefObject<HTMLCanvasElement>>(React.createRef<HTMLCanvasElement>());
  const [moving, setMoving] = useState<boolean>(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const { scrollX: x, scrollY: y } = useNavigationWithScroll( moving,elementRef);
  
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
        <CanvasComponents
          setCanvasRef={setCavasRef}
          elementRef={elementRef}
          moving={moving}
          setMoving={setMoving}
        />
      </div>
    </div>
  );
}
