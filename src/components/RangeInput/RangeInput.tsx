import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  range: number | null;
  max: number;
  min?: number;
  step: number;
  setRange: (range: number | null) => void;
  disable?: boolean;
  bgColor?: string;
}
export const RangeInput = ({
  range,
  setRange,
  max,
  step,
  disable,
  min = 0,
  bgColor = "bg-white dark:bg-back-grey",
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [left, setLeft] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const calculateWidth = (range: number | null) => {
    if (range == null) return min;
    return ((range - min) / (max - min)) * 100;
  };
  const calcLeft = (range: number) => {
    if (ref.current) {
      const width = ref.current.clientWidth;
      const left = ((range - min) / (max - min)) * width;
      return left - 4;
    }
    return min;
  };

  useEffect(() => {
    setLeft(range ? calcLeft(range) : 0);
    setWidth(calculateWidth(range));
  }, [range]);

  const classes = twMerge(
    "relative w-full select-none h-2 rounded-full ",
    disable && "opacity-10 pointer-events-none"
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
      <AnimatePresence mode="wait" initial={false}>
        <div className="absolute flex  w-full left-0 top-0 z-10 h-2">
          <motion.div
            className="bg-primary rounded-l-full dark:bg-secondary"
            style={{ width: width + "%" }}
          />
          <motion.div
            className={
              " rounded-r-full  " +
              bgColor +
              (range == null ? " rounded-l-full" : "")
            }
            style={{ width: 100 - width + "%" }}
          />
        </div>
        {range == null ? null : (
          <motion.div
            className="bg-primary h-3 w-3 rounded-full z-20 -top-[0.12rem] dark:bg-secondary absolute"
            style={{ left: left }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
