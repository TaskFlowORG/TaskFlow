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

type Draw = {
  ctx: CanvasRenderingContext2D;
  currentPoint: Point;
  prevPoint: Point | null;
};

type Point = { x: number; y: number };

interface pageProps { }

const page: FC<pageProps> = ({ }) => {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [windowHeight, setWindowHeight] = useState<number>(0);
  const [isErasing, setIsErasing] = useState<boolean>(false);
  const [lineWidth, setLineWidth] = useState<number>(5);
  const [lineColor, setLineColor] = useState<string>("#000000");
  const optionsRef = useRef<HTMLDivElement>(null);
  const [tasks, setTasks] = useState<TaskCanvas[]>([
    new TaskCanvas(
      1,
      new Task(1, "AAAA", false, false, null, [], null, []),
      null,
      85,
      85
    ),
    new TaskCanvas(
      2,
      new Task(1, "BBB", false, false, null, [], null, []),
      null,
      50,
      50
    ),
  ]);
  const [shape, setShape] = useState<string>("line");
  const { canvasRef, clear } = useDraw(drawLine, shape, optionsRef);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    });
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  }, []);

  function drawLine({ prevPoint, currentPoint, ctx }: Draw) {
    const { x: currX, y: currY } = currentPoint;
    const { x: prevX, y: prevY } = prevPoint ?? currentPoint;

    if (isErasing) {
      ctx.globalCompositeOperation = "destination-out";
    } else {
      ctx.globalCompositeOperation = "source-over";
    }

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.beginPath();

    if (shape == "square") {
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(currX, prevY);
      ctx.lineTo(currX, currY);
      ctx.lineTo(prevX, currY);
      ctx.lineTo(prevX, prevY);
      ctx.lineTo(currX, prevY);
      ctx.stroke();
    } else if (shape == "circle") {
      if (currX > prevX && currY > prevY) {
        const center = { x: prevX + ((currX - prevX) / 2), y: prevY + ((currY - prevY) / 2) }
        ctx.ellipse(center.x, center.y, (currX - prevX) / 2, (currY - prevY) / 2, 0, 0, 2 * Math.PI);
      } else if (currX > prevX && currY < prevY) {
        const center = { x: prevX + ((currX - prevX) / 2), y: currY + ((prevY - currY) / 2) }
        ctx.ellipse(center.x, center.y, (currX - prevX) / 2, (prevY - currY) / 2, 0, 0, 2 * Math.PI);
      } else if (currX < prevX && currY > prevY) {
        const center = { x: currX + ((prevX - currX) / 2), y: prevY + ((currY - prevY) / 2) }
        ctx.ellipse(center.x, center.y, (prevX - currX) / 2, (currY - prevY) / 2, 0, 0, 2 * Math.PI);
      } else if (currX < prevX && currY < prevY) {
        const center = { x: currX + ((prevX - currX) / 2), y: currY + ((prevY - currY) / 2) }
        ctx.ellipse(center.x, center.y, (prevX - currX) / 2, (prevY - currY) / 2, 0, 0, 2 * Math.PI);
      } else {
        ctx.ellipse(prevX, prevY, (currX - prevX) / 2, (currY - prevY) / 2, 0, 0, 2 * Math.PI);
      }
      ctx.stroke();
    } else if (shape == "triangle") {
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(currX, prevY);
      ctx.lineTo(prevX + ((currX - prevX) / 2), currY);
      ctx.lineTo(prevX, prevY);
      ctx.lineTo(currX, prevY);
      ctx.stroke();
    } else if (shape == "line") {
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(currX, currY);
      ctx.stroke();
    }
    ctx.fillStyle = lineColor;
    ctx.beginPath();
    if (shape == "line") {
      ctx.arc(
        prevX,
        prevY,
        lineWidth / 2,
        0,
        (lineWidth / 2) * Math.PI
      );
    }
    ctx.fill();
  }

  return (
    <div className="overflow-clip">
      <canvas
        ref={canvasRef}
        width={windowWidth}
        height={windowHeight}
        className="w-full h-full relative"
      ></canvas>
      <div className="absolute bottom-0 flex  dark:bg-modal-grey items-center justify-around
       bg-input-grey rounded-t-2xl h-min w-full py-2 sm:py-6 sm:flex-col sm:rounded-l-2xl sm:h-[22rem] sm:w-min sm:top-14 sm:right-0" ref={optionsRef}>
        <button onClick={() => setIsErasing(!isErasing)}>
          <If condition={isErasing}>
            <Eraser />
            <Pencil />
          </If>
        </button>
        <input
          type="range"
          max={50}
          min={2}
          value={lineWidth}
          className=" -rotate-90 w-16 h-16 z-10"
          onChange={(e) => setLineWidth(parseInt(e.target.value))}
        />
        <div className="w-8 h-8 bg-transparent flex ">
          <SelectWithImage list={[{ value: "line", image: <Line /> }, { value: "square", image: <Square /> }, { value: "circle", image: <Circle /> }, { value: "triangle", image: <Triangle /> }]}
            selected={shape} onChange={s => setShape(s)} />
        </div>
        <span className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: lineColor }}>
          <input
            type="color"
            value={lineColor}
            className="w-6 h-6 opacity-0"
            onChange={(e) => setLineColor(e.target.value)}
          />
        </span>
        <button onClick={() => clear()}><Broom /></button>
        <button><AddTask /></button>
      </div>
      <SelectedArea canvasRef={canvasRef} shape={shape} />
      {tasks.map((t, index) => (
        <TaskCanvasComponent task={t} key={index} />
      ))}
    </div>
  );
};

export default page;
