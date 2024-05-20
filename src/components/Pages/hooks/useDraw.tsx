import { RefObject, useContext, useEffect, useRef, useState } from "react";
import { pageService } from "@/services";
import { Page } from "@/models";
import { ProjectContext } from "@/contexts";

type Draw = {
  ctx: CanvasRenderingContext2D;
  currentPoint: Point;
  prevPoint: Point | null;
  button: boolean;
};

type Point = { x: number; y: number };

export const useDraw = (
  onDraw: ({ ctx, currentPoint, prevPoint }: Draw) => void,
  moving: boolean,
  page: Page | undefined
) => {
  const [mouseDown, setMouseDown] = useState<boolean>(false);
  const prevPoint = useRef<null | Point>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {project} = useContext(ProjectContext);

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!page || !canvasRef || !canvasRef.current || !project) return;
    canvasRef.current.toBlob((draw) => {
      if (draw) {
        pageService.updateDraw(project.id, draw, page.id);
      }
    });
  };

  useEffect(() => {
    const shape = localStorage.getItem("canvas_shape") ?? "line";

    const handlerLine = (e: MouseEvent) => {
      if (shape == "line") {
        if (!mouseDown || moving) return;
        const currentPoint = computePointInCanvas(e);
        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx || !currentPoint) return;
        onDraw({
          ctx,
          currentPoint,
          prevPoint: prevPoint.current,
          button: e.buttons == 1,
        });
        if (!currentPoint) return;
        prevPoint.current = currentPoint;
      }
    };

    const handlerOtherShape = (e: MouseEvent) => {
      if (e.button == 1 || moving) return;
      setMouseDown(true);
      const currentPoint = computePointInCanvas(e);
      if (!currentPoint) return;
      prevPoint.current = currentPoint;
    };

    const computePointInCanvas = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      return { x, y };
    };

    const mouseUpHandler = (e: MouseEvent) => {
      if (e.button == 1 || moving || !mouseDown) return;
      const currentPoint = computePointInCanvas(e);
      if (shape != "line") {
        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx || !currentPoint) return;
        onDraw({
          ctx,
          currentPoint: currentPoint,
          prevPoint: prevPoint.current,
          button: e.button == 0,
        });
      } else {
        prevPoint.current = null;
      }
      setMouseDown(false);
    };

    if (window.matchMedia("(any-pointer: coarse)").matches) {
      canvasRef.current?.addEventListener("pointermove", handlerLine);
      canvasRef.current?.addEventListener("pointerup", mouseUpHandler);
      canvasRef.current?.addEventListener("pointerdown", handlerOtherShape);
    } else {
      canvasRef.current?.addEventListener("mousemove", handlerLine);
      canvasRef.current?.addEventListener("mouseleave", mouseUpHandler);
      canvasRef.current?.addEventListener("mouseup", mouseUpHandler);
      canvasRef.current?.addEventListener("mousedown", handlerOtherShape);
      canvasRef.current?.addEventListener("contextmenu", (e) =>
        e.preventDefault()
      );
    }

    // Add event listeners

    // Remove event listeners
    return () => {
      if (window.matchMedia("(any-pointer: coarse)").matches) {
        canvasRef.current?.removeEventListener("pointerdown", handlerOtherShape);
        canvasRef.current?.removeEventListener("pointermove", handlerLine);
        canvasRef.current?.removeEventListener("pointerup", mouseUpHandler);
      }else{
        canvasRef.current?.removeEventListener("mousedown", handlerOtherShape);
        canvasRef.current?.removeEventListener("mousemove", handlerLine);
        canvasRef.current?.removeEventListener("mouseup", mouseUpHandler);
        canvasRef.current?.removeEventListener("mouseleave", mouseUpHandler);
      }
    };
  }, [onDraw, mouseDown, moving]);

  return { clear, canvasRef };
};
