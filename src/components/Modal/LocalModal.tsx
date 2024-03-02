import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useRef } from "react";
import { useClickAway } from "react-use";

interface Props {
    children: React.ReactNode,
    condition: boolean,
    setCondition: (value: boolean) => void
}
export const LocalModal = ({ children, condition, setCondition }: Props) => {

    const ref = useRef(null);
    useClickAway(ref, () => setCondition(false));


    return (
        <AnimatePresence mode="wait" initial={false} >
            {condition &&
                <>
                    <motion.div
                        className="absolute bg-white shadow-blur-10 origin-top-left top-0 flex rounded-md left-[105%] w-min max-h-min p-4"
                        initial={{ transform: "scale(0, 0)" }}
                        animate={{ transform: "scale(1,1)" }}
                        exit={{ transform: "scale(0)", transition: { delay: 0 } }}
                        transition={{ duration: 0.1 }}
                        ref={ref}
                    >
                        {children}
                    </motion.div>
                </>
            }
        </AnimatePresence>
    )
}

