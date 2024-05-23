import { RefObject, useEffect, useState } from "react";
import { If } from "../../../If";
import { SelectWithImage } from "../../../SelectWithImage/SelectwithImage";
import {
  Broom,
  Circle,
  Eraser,
  Line,
  Pencil,
  Square,
  Triangle,
} from "../../../icons";
import { MoveIcon } from "../../../icons/Canvas/Move";
import { Pointer } from "../../../icons/Canvas/Pointer";
import { RangeInput } from "@/components/RangeInput";

interface Props {
  moving: boolean;
  setMoving: React.Dispatch<React.SetStateAction<boolean>>;
  clear: () => void;
  isErasing: boolean;
  setIsErasing: React.Dispatch<React.SetStateAction<boolean>>;
  optionsRef: RefObject<HTMLDivElement>;
  shape: string;
  setShape: React.Dispatch<React.SetStateAction<string>>;
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
}: Props) => {
  const [lineColor, setLocalLineColor] = useState<string>(
    localStorage.getItem("canvas_line_color") ?? "#000000"
  );
  const [lineWidth, setLocalLineWidth] = useState<number>(
    +(localStorage.getItem("canvas_line_width") ?? "2")
  );

  useEffect(() => {
    localStorage.setItem("canvas_line_color", lineColor);
  }, [lineColor]);
  useEffect(() => {
    localStorage.setItem("canvas_line_width", JSON.stringify(lineWidth));
  }, [lineWidth]);

  return (
    <div>
      <div
        id="tools"
        className="fixed bottom-0 flex  dark:bg-modal-grey items-center justify-around bg-input-grey rounded-t-2xl cursor-default
        h-14 w-full py-2 sm:py-6 sm:flex-col sm:rounded-l-2xl sm:rounded-r-none sm:h-[22rem] sm:w-min sm:top-14 sm:right-0"
        ref={optionsRef}
      >
        <button
          onClick={() => {
            setIsErasing(!isErasing);
            localStorage.setItem(
              "canvas_is_erasing",
              JSON.stringify(!isErasing)
            );
          }}
          disabled={moving}
        >
          <If condition={isErasing}>
            <Eraser />
            <Pencil />
          </If>
        </button>

        <span className="sm:-rotate-90 h-2 my-6 w-16 z-30 cursor-pointer">
          <RangeInput
            step={1}
            disable={moving}
            max={50}
            min={2}
            range={lineWidth}
            setRange={(v) => v && setLocalLineWidth(v)}
          />
        </span>
        <div className="h-12 w-10 justify-center items-center bg-transparent flex ">
          <SelectWithImage
            disabled={moving}
            list={[
              { value: "line", image: <Line /> },
              { value: "square", image: <Square /> },
              { value: "circle", image: <Circle /> },
              { value: "triangle", image: <Triangle /> },
            ]}
            selected={shape}
            onChange={(s) => {
              setShape(s);
              localStorage.setItem("canvas_shape", s);
            }}
          />
        </div>
        <span
          className="w-6 h-6 rounded-full flex cursor-pointer items-center justify-center"
          style={{ backgroundColor: lineColor, opacity: moving ? "0.6" : "1" }}
        >
          <input
            type="color"
            value={lineColor}
            className="w-6 h-6 opacity-0 cursor-pointer"
            onChange={(e) => setLocalLineColor(e.target.value)}
          />
        </span>
        <button onClick={() => clear()} disabled={moving}>
          <Broom />
        </button>
        <button onClick={() => setMoving(!moving)}>
          <If condition={moving}>
            <Pointer />
            <MoveIcon />
          </If>
        </button>
      </div>
    </div>
  );
};
