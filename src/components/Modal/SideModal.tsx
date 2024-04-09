import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useRef } from "react";
import { useClickAway } from "react-use";

interface Props {
    children: React.ReactNode,
    condition: boolean,
    setCondition: (value: boolean) => void;
    right?:boolean;
}
export const SideModal = ({ children, condition, setCondition, right }: Props) => {

    const ref = useRef(null);
    useClickAway(ref, () => setCondition(false));

    return (
        <AnimatePresence mode="wait" initial={false} >
            {condition &&
                <>
                    <motion.div
                        initial={right?{right:-500}:{left:-500}}
                        animate={right?{right:0}:{left:0}}
                        exit={{transition: { delay: 0.1 }, ...(right?{right:-500}:{left:-500}) }}
                        transition={{ duration: 0.1 }} 
                        className={"fixed top-0 bottom-0 z-[70] flex items-center h-screen  w-[31rem] " + (right?" justify-end":" justify-start")}
                    >
                        <div className="w-min h-full relative" ref={ref}>
                        <p className={"absolute z-[80] top-8 cursor-pointer w-4 h-4 hover:brightness-200 hover:dark:brightness-90 " + 
                        (right? "left-16":"right-16")} onClick={() => setCondition(false)}>x</p>
                            {children}
                        </div>
                    </motion.div>
                </>
            }
        </AnimatePresence>
    )
}

