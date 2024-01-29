"use client";

import { LegacyRef, useEffect, useState } from "react";
import { If } from "../If";
import { setTimeout } from "timers";

export const SelectedArea = ({
  canvasRef,
  shape,
  moving,
}: {
  canvasRef?: LegacyRef<HTMLCanvasElement>;
  shape: string;
  moving: boolean;
}) => {
  const [prevX, setPrevX] = useState<number>(0);
  const [prevY, setPrevY] = useState<number>(0);
  const [currX, setCurrX] = useState<number>(0);
  const [currY, setCurrY] = useState<number>(0);
  const [show, setShow] = useState<boolean>(false);

  function setBiggest(n1: number, n2: number) {
    if (n1 > n2) {
      return n1 - n2;
    }
    return n2 - n1;
  }

  let style = {};
  style = {
    left: currX > prevX ? prevX : currX,
    width: setBiggest(prevX, currX),
  };
  style = {
    ...style,
    top: currY > prevY ? prevY : currY,
    height: setBiggest(prevY, currY),
  };
  if (shape == "triangle" || shape == "circle") {
    style = {
      ...style,
      clipPath:
        shape == "circle"
          ? "ellipse(50% 50% at 50% 50%)"
          : prevY > currY
          ? "polygon(50% 0%, 0% 100%, 100% 100%)"
          : "polygon(50% 100%, 0% 0%, 100% 0%)",
    };
  }

  useEffect(() => {
    if (!canvasRef) return;
    if (shape == "line") return;
    if (typeof canvasRef === "string" || typeof canvasRef === "function") return;

    canvasRef.current?.addEventListener("mousedown", (e) => {
      if (e.button == 1) return;
      if(!canvasRef.current?.scrollLeft || !canvasRef.current?.scrollTop) return
      setPrevX(e.pageX + canvasRef.current?.scrollTop);
      setPrevY(e.pageY + canvasRef.current?.scrollLeft);
      setCurrX(e.pageX + canvasRef.current?.scrollTop);
      setCurrY(e.pageY + canvasRef.current?.scrollLeft);
      setShow(true);
    });
    canvasRef.current?.addEventListener("mousemove", (e) => {
      if (!show) return;
      if(!canvasRef.current?.scrollLeft || !canvasRef.current?.scrollTop) return
      setCurrX(e.pageX + canvasRef.current?.scrollTop);
      setCurrY(e.pageY +  canvasRef.current?.scrollLeft);
    });
    window.addEventListener("mouseup", (e) => {
      setShow(false);
    });
  });

  return (
    <If condition={show}>
      <If condition={shape == "square"}>
        <div
          className="bg-zinc-500 dark:bg-white opacity-20 absolute transition-none"
          style={style}
        ></div>
        <If condition={shape == "circle"}>
          <div
            className="bg-zinc-500 dark:bg-white opacity-20 absolute transition-none"
            style={style}
          ></div>
          <If condition={shape == "triangle"}>
            <div
              className=" bg-zinc-500 opacity-20 dark:bg-white absolute transition-none"
              style={style}
            ></div>
          </If>
        </If>
      </If>
    </If>
  );
};
