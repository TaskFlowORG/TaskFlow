"use client";

import { FC, MouseEventHandler, useRef, useState } from "react";
import { useDraw } from "@/hooks/useDraw";
import { Task } from "@/model/tasks/Task";

import { TaskCanvas } from "@/model/relations/TaskCanvas";
import { Page } from "@/model/pages/Page";
import { TypeOfPage } from "@/model/enums/TypeOfPage";
import { TaskCanvasComponent } from "@/components/TaskCanvasComponent";

import { Draw } from "@/types/Draw";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { set } from "zod";
import { DragUpdate } from "react-beautiful-dnd";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const { canvasRef, onMouseDown, clear } = useDraw(drawLine);
  const [isErasing, setIsErasing] = useState<boolean>(false);
  const [lineWidth, setLineWidth] = useState<number>(5);
  const [lineColor, setLineColor] = useState<string>("#000000");
  const [draggingX, setDraggingX] = useState<number>(0);
  const [draggingY, setDraggingY] = useState<number>(0);

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

  function handleDragEnd(result: any) {
    const task:TaskCanvas = tasks[result.source.index];
    console.log(draggingX, draggingY)
    task.x = draggingX;
    task.y = draggingY;
    setTasks([...tasks]);
  }

  return (
    <>
      <DragDropContext onDragEnd={ handleDragEnd }>
        <Droppable droppableId="tasks">
          {(provided) => (
          
            <div
            className="w-full h-full relative mt-14"
              ref={provided.innerRef}
            {...provided.droppableProps}
            >

              <canvas
                ref={canvasRef}
                onMouseDown={onMouseDown}
                width={1920}
                height={930}
                className="w-full h-full"
                
              ></canvas>
              {tasks.map((task, index) => {
                return (
                <Draggable draggableId={index+""} key={index} index={index} >
                  {(provided) => (
                    <TaskCanvasComponent task={task} provided={provided}/>
                  )}
                </Draggable>
                )
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button onClick={() => setIsErasing(!isErasing)}>A</button>
      <input
        type="color"
        value={lineColor}
        onChange={(e) => setLineColor(e.target.value)}
      />
      <input
        type="range"
        max={50}
        min={2}
        value={lineWidth}
        onChange={(e) => setLineWidth(parseInt(e.target.value))}
      />
    </>
  );
};

export default page;
