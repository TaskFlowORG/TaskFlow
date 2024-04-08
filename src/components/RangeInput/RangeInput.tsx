import { calcLength } from "framer-motion";
import { useRef } from "react";

interface Props {
  range: number;
  max: number;
    step: number;
  setRange: (range: number) => void;
}
export const RangeInput = ({ range, setRange, max, step }: Props) => {

    range = range < 0 ? 0 : range;
    const calculateWidth = (range: number) => {
        return (range / max) * 100;
    }
    const ref = useRef<HTMLDivElement>(null);
    const calcLeft = (range: number) => {
        if (ref.current) {
            const width = ref.current.clientWidth;
            const left = (range / max) * width;
            return left -4;
        }
        return 0;
    }
  return (
      <div  ref={ref}
      className="relative w-full select-none h-2 rounded-full ">
      <input
        className="w-full z-50 h-full absolute  top-0 opacity-0"
        type="range"
        min={0}
        step={step}
        value={range}
        max={max}
        onChange={(e) => setRange(+e.target.value)}
      />
      <div className="absolute flex w-full left-0 top-0 z-10 h-2">
        <div className="bg-primary rounded-l-full dark:bg-secondary" style={{width:calculateWidth(range)+"%"}} />
        <div className="bg-zinc-200 rounded-r-full dark:bg-zinc-600" style={{width:calculateWidth(max - range)+"%"}}  />
      </div>
      <div className="bg-primary h-3 w-3 rounded-full z-20 -top-[0.12rem] dark:bg-secondary absolute"
       style={{left:calcLeft(range)}}/>
      
    </div>
  );
};
