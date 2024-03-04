import { RefObject, useEffect, useRef, useState } from "react";
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
import { drawLine, setLineColor, setLineWidth } from "@/functions";
import { useDraw } from "@/hooks/useDraw";
import { useTheme } from "next-themes";
import { SelectedArea } from "../SelectedArea/SelectedArea";
import { set } from "react-hook-form";
import { Pointer } from "../icons/Canvas/Pointer";
import { TypeOfProperty } from "@/models";

interface Props {
  moving: boolean;
  setMoving: React.Dispatch<React.SetStateAction<boolean>>;
  clear: () => void;
  isErasing: boolean;
  setIsErasing: React.Dispatch<React.SetStateAction<boolean>>;
  optionsRef: RefObject<HTMLDivElement>;
  shape: string;
  setShape: React.Dispatch<React.SetStateAction<string>>;
  postTask: () => void;
}

export const CanvasComponents = ({
  moving,
  setMoving,
  clear,
  isErasing,
  setIsErasing,
  optionsRef,
  shape,
  setShape,
  postTask
}: Props) => {

  const [lineColor, setLocalLineColor] = useState<string>("#000000");
  const [lineWidth, setLocalLineWidth] = useState<number>(2);

  useEffect(() => {
    setLineColor(lineColor);
  }, [lineColor]);
  useEffect(() => {
    setLineWidth(lineWidth);
  }, [lineWidth]);


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
          onChange={(e) => setLocalLineWidth(parseInt(e.target.value))}
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
            onChange={(e) => setLocalLineColor(e.target.value)}
          />
        </span>
        <button onClick={() => clear()}
         disabled={moving}>
          
          <Broom />
        </button>
        <button onClick={() => setMoving(!moving)}>
          <If condition={moving}>
            <Pointer />
            <MoveIcon />
          </If>
        </button>
        <button 
         disabled={moving}
         onClick={postTask}>
          <AddTask />
        </button>
      </div>
    </div>
  );
};
