"use client";

import { FC, MouseEventHandler, useRef, useState } from "react";
import { useDraw } from "@/hooks/useDraw";
import { Task } from "@/model/tasks/Task";
import { TaskCanvasComponent } from "@/components/TaskCanvasComponent/TaskCanvasComponent";
import { TaskCanvas } from "@/model/relations/TaskCanvas";
import { Page } from "@/model/pages/Page";
import { TypeOfPage } from "@/model/enums/TypeOfPage";

type Draw = {
  ctx: CanvasRenderingContext2D;
  currentPoint: Point;
  prevPoint: Point | null;
};

type Point = { x: number; y: number };

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const [isErasing, setIsErasing] = useState<boolean>(false);
  const [lineWidth, setLineWidth] = useState<number>(5);
  const [lineColor, setLineColor] = useState<string>("#000000");
  const [tasks, setTasks] = useState<TaskCanvas[]>([
    new TaskCanvas(
      1,
      new Task(1, "AAAA", false, false, null, [], null, []),
      null,
      600,
      600
      ),
      new TaskCanvas(
        2,
        new Task(1, "BBB", false, false, null, [], null, []),
        null,
        600,
        600
        ),
      ]);
      const [shape, setShape] = useState<string>("square");
      const { canvasRef, onMouseDown, clear } = useDraw(drawLine, shape);
      
  function drawLine({ prevPoint, currentPoint, ctx }: Draw) {
    const { x: currX, y: currY } = currentPoint;

    if (isErasing) {
      ctx.globalCompositeOperation = "destination-out";
    } else {
      ctx.globalCompositeOperation = "source-over";
    }

    let startPoint = prevPoint ?? currentPoint;
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currX, currY);
    ctx.stroke();
    ctx.fillStyle = lineColor;
    ctx.beginPath();
    ctx.arc(
      startPoint.x,
      startPoint.y,
      lineWidth / 2,
      0,
      (lineWidth / 2) * Math.PI
    );
    ctx.fill();
  }

  return (
    <>
      <canvas
    
        ref={canvasRef}
        onMouseDown={onMouseDown}
        width={1920}
        height={930}
        className="w-full h-full"
      ></canvas>
      <div className="absolute top-14 right-0 flex flex-col items-center justify-center bg-input-grey rounded-l-2xl h-48 w-min gap-2 py-6">
        <button onClick={() => setIsErasing(!isErasing)}>
          {isErasing ? "P" : "E"}
        </button>
        <span className="w-6 h-6 rounded-full flex items-center justify-center" style={{backgroundColor: lineColor}}>
          <input
            type="color"
            value={lineColor}
            className="w-6 h-6 opacity-0"
            onChange={(e) => setLineColor(e.target.value)}
          />
        </span>
        <input
          type="range"
          max={50}
          min={2}
          value={lineWidth}
          className=" -rotate-90 w-16 h-16"
          onChange={(e) => setLineWidth(parseInt(e.target.value))}
        />
        <select name="shape" >
          <option value="square">square</option>
          <option value="circle">circle</option>
          <option value="triangle">triangle</option>
          <option value="line">line</option>
        </select>
        <button>+</button>
      </div>
      {tasks.map((t, index) => (
        <TaskCanvasComponent task={t} key={index} />
      ))}
    </>
  );
};

export default page;
