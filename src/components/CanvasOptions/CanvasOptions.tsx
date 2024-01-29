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
import { useNavigationWithScroll } from "@/hooks/useNavigationWithScrool";
import { useTheme } from "next-themes";
import { SelectedArea } from "../SelectedArea/SelectedArea";

interface Props {
  elementRef: React.RefObject<HTMLDivElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  setX: (value: number) => void;
  setY: (value: number) => void;
  getShape: (value: string) => void;
}

export const CanvasOptions = ({
  elementRef,
  canvasRef,
  setX,
  setY,
  getShape,
}: Props) => {
  const optionsRef = useRef<HTMLDivElement>(null);
  const [lineColor, setLineColor] = useState<string>("#000000");
  const [lineWidth, setLineWidth] = useState<number>(2);
  const [shape, setShape] = useState<string>("line");
  const [isErasing, setIsErasing] = useState<boolean>(false);
  const [moving, setMoving] = useState<boolean>(false);
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
  const { scrollX: x, scrollY: y } = useNavigationWithScroll(
    moving,
    elementRef
  );
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setX(x);
    setY(y);
  }, [x, y]);

  useEffect(() => {
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
    elementRef.current?.setAttribute("cursor", cursor);
  }, [moving, theme, isErasing]);

  useEffect(() => {
    getShape(shape);
  }, [shape]);

  return (
    <div>
      <div
        className="fixed bottom-0 flex  dark:bg-modal-grey items-center justify-around bg-input-grey rounded-t-2xl cursor-default
        h-min w-full py-2 sm:py-6 sm:flex-col sm:rounded-l-2xl sm:rounded-r-none sm:h-[22rem] sm:w-min sm:top-14 sm:right-0"
        ref={optionsRef}
      >
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
          className=" -rotate-90 w-16 h-16 z-30 cursor-pointer"
          onChange={(e) => setLineWidth(parseInt(e.target.value))}
        />
        <div className="w-8 h-8 bg-transparent flex ">
          <SelectWithImage
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
          style={{ backgroundColor: lineColor }}
        >
          <input
            type="color"
            value={lineColor}
            className="w-6 h-6 opacity-0 cursor-pointer"
            onChange={(e) => setLineColor(e.target.value)}
          />
        </span>
        <button onClick={() => clear()}>
          <Broom />
        </button>
        <button onClick={() => setMoving(!moving)}>
          <MoveIcon />
        </button>
        <button>
          <AddTask />
        </button>
      </div>
      <SelectedArea canvasRef={canvasRef} shape={shape} moving={moving} />
    </div>
  );
};
