import { motion, AnimatePresence } from "framer-motion"
import React, { useEffect, useRef } from "react";
import { useClickAway } from "react-use";
import { twMerge } from "tailwind-merge";

interface Props extends React.HTMLAttributes<HTMLDivElement>{
    children: React.ReactNode,
    condition: boolean,
    setCondition: (value: boolean) => void,
    right?: boolean;
    y?: number;
    x?: number;
    //thats in percentage
    bottom?: boolean;
}
export const LocalModal = ({ children, condition, setCondition, right, y, x, bottom }: Props) => {

    const ref = useRef(null);
    useClickAway(ref, () => setCondition(false));

    const style = twMerge(
        "bg-inherit shadow-blur-10 flex z-[80] rounded-md w-min ", 
        right ? `right-[105%]` : `left-[105%]`,
        (!x && right ? 
            (bottom? "origin-bottom-right" : "origin-top-right") 
            : 
            (bottom? "origin-bottom-left" : "origin-top-left"))
      );

    return (
        <AnimatePresence mode="wait" initial={false} >
            {condition &&
                <>
                    <motion.div
                        className={style}
                        initial={{ transform: "scale(0, 0)" }}
                        animate={{ transform: "scale(1,1)" }}
                        exit={{ transform: "scale(0)", transition: { delay: 0 } }}
                        transition={{ duration: 0.1 }}
                        ref={ref}
                        style={y? {top: y, position:"fixed", left:x} : {...(bottom?{bottom: 10}:{top:0}), position:"absolute"}}
                    >
                        {children}
                    </motion.div>
                </>
            }
        </AnimatePresence>
    )
}

