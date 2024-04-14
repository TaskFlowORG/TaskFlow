import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { useClickAway } from "react-use";
import { twMerge } from "tailwind-merge";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  condition: boolean;
  setCondition: (value: boolean) => void;
  right?: boolean;
  y?: number;
  x?: number;
  bottom?: boolean;
  classesPosition?: string;
  classesOrigin?: string;
}
export const LocalModal = ({
  children,
  condition,
  setCondition,
  right,
  y,
  x,
  bottom,
  classesPosition,
  classesOrigin,
}: Props) => {
  const ref = useRef(null);
  useClickAway(ref, (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCondition(false);
  });

  const style = twMerge(
    "bg-inherit shadow-blur-10 flex z-[101] rounded-md w-auto ",
    classesPosition ? classesPosition : right ? `right-[105%]` : `left-[105%]`,
    classesOrigin
      ? classesOrigin
      : !x && right
      ? bottom
        ? "origin-bottom-right"
        : "origin-top-right"
      : bottom
      ? "origin-bottom-left"
      : "origin-top-left"
  );

  return (
    <AnimatePresence mode="wait" initial={false}>
      {condition && (
        <>
          <motion.div
            initial={{ transform: "scale(0, 0)" }}
            animate={{ transform: "scale(1,1)" }}
            exit={{ transform: "scale(0)", transition: { delay: 0 } }}
            transition={{ duration: 0.1 }}
            ref={ref}
            style={
              y != undefined
                ? { top: y, position: "fixed", left: x }
                : classesPosition
                ? {}
                : {
                    ...(bottom ? { bottom: 10 } : { top: 0 }),
                    position: "absolute",
                  }
            }
            className={style}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
