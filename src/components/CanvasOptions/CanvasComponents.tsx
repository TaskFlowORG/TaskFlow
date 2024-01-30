import { useEffect, useRef, useState } from "react";
import { If } from "../If";
import { SelectWithImage } from "../SelectWithImage/SelectwithImage";
import {
  AddTask,
  Broom,
  Circle,
  Eraser,
  Line,
  Pencil,
  Square,
  Triangle,
} from "../icons";
import { MoveIcon } from "../icons/Canvas/Move";
import { drawLine } from "@/functions";
import { useDraw } from "@/hooks/useDraw";
import { useTheme } from "next-themes";
import { SelectedArea } from "../SelectedArea/SelectedArea";

interface Props {
  elementRef: React.RefObject<HTMLDivElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  moving: boolean;
  setMoving: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CanvasComponents = ({
  elementRef,
  canvasRef,
  moving,
  setMoving
}: Props) => {
  const optionsRef = useRef<HTMLDivElement>(null);
  const [lineColor, setLineColor] = useState<string>("#000000");
  const [lineWidth, setLineWidth] = useState<number>(2);
  const [shape, setShape] = useState<string>("line");
  const [isErasing, setIsErasing] = useState<boolean>(false);
  const { clear } = useDraw(
    drawLine,
    moving,
    shape,
    optionsRef,
    isErasing,
    lineColor,
    lineWidth,
    canvasRef
  );

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if(!elementRef.current) return 
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
    elementRef.current.style.cursor =  cursor;
  }, [moving, theme, isErasing]);
  return (
    <div>
      <div id="tools"
        className="fixed bottom-0 flex  dark:bg-modal-grey items-center justify-around bg-input-grey rounded-t-2xl cursor-default
        h-min w-full py-2 sm:py-6 sm:flex-col sm:rounded-l-2xl sm:rounded-r-none sm:h-[22rem] sm:w-min sm:top-14 sm:right-0"
        ref={optionsRef}
      >
        <button onClick={() => setIsErasing(!isErasing)} disabled={moving}>
          <If condition={isErasing}>
            <Eraser />
            <Pencil />
          </If>
        </button>
        <input
         disabled={moving}
          type="range"
          max={50}
          min={2}
          value={lineWidth}
          className=" -rotate-90 w-16 h-16 z-30 cursor-pointer"
          onChange={(e) => setLineWidth(parseInt(e.target.value))}
        />
        <div className="w-8 h-8 bg-transparent flex ">
          <SelectWithImage
           disabled={moving}
            list={[
              { value: "line", image: <Line /> },
              { value: "square", image: <Square /> },
              { value: "circle", image: <Circle /> },
              { value: "triangle", image: <Triangle /> },
            ]}
            selected={shape}
            onChange={(s) => setShape(s)}
          />
        </div>
        <span
          className="w-6 h-6 rounded-full flex cursor-pointer items-center justify-center"
          style={{ backgroundColor: lineColor, opacity:moving? "0.6":"1" }}
        >
          <input
            type="color"
            value={lineColor}
            className="w-6 h-6 opacity-0 cursor-pointer"
            onChange={(e) => setLineColor(e.target.value)}
          />
        </span>
        <button onClick={() => clear()}
         disabled={moving}>
          
          <Broom />
        </button>
        <button onClick={() => setMoving(!moving)}>
          <MoveIcon />
        </button>
        <button 
         disabled={moving}>
          <AddTask />
        </button>
      </div>
      <SelectedArea canvasRef={canvasRef} shape={shape} moving={moving} />
    </div>
  );
};
