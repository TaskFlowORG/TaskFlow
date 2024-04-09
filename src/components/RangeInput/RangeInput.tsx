import { calcLength } from "framer-motion";
import { useRef } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  range: number | null;
  max: number;
  min?: number;
  step: number;
  setRange: (range: number | null) => void;
  disable?: boolean;
}
export const RangeInput = ({ range, setRange, max, step, disable, min = 0 }: Props) => {
  const calculateWidth = (range: number | null) => {
    if (range == null) return 0;
    return (range / max) * 100;
  };
  const ref = useRef<HTMLDivElement>(null);
  const calcLeft = (range: number ) => {
    if (ref.current) {
      const width = ref.current.clientWidth;
      const left = (range / max) * width;
      return left - 4;
    }
    return 0;
  };

   const classes = twMerge(
    "relative w-full select-none h-2 rounded-full ", disable && "opacity-10 pointer-events-none"
   );
  return (
    <div ref={ref} className={classes}>
      <input
        className="w-full z-50 h-full absolute  top-0 opacity-0"
        type="range"
        min={min}
        step={step}
        value={range == null ? "" : range}
        max={max}
        onChange={(e) => setRange(+e.target.value)}
      />
      <div className="absolute flex w-full left-0 top-0 z-10 h-2">
        <div
          className="bg-primary rounded-l-full dark:bg-secondary"
          style={{ width: calculateWidth(range) + "%" }}
        />
        <div
          className={"bg-zinc-200 rounded-r-full dark:bg-zinc-600 " + (range == null ? "rounded-l-full" : "")}
          style={{ width: calculateWidth(range == null ? 100 : max - range) + "%" }}
        />
      </div>
      {
        range == null ? null : (
          <div
          className="bg-primary h-3 w-3 rounded-full z-20 -top-[0.12rem] dark:bg-secondary absolute"
          style={{ left: calcLeft(range) }}
        />
        )
      }

    </div>
  );
};
