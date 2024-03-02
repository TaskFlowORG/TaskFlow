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
                        className="fixed top-0 bottom-0 z-50 w-full h-screen max-w-min"
                        ref={ref}
                    >
                        {children}
                    </motion.div>
                </>
            }
        </AnimatePresence>
    )
}

