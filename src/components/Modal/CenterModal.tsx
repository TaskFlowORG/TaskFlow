import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useRef } from "react";
import { useClickAway } from "react-use";

interface Props {
    children: React.ReactNode,
    condition: boolean,
    setCondition: (value: boolean) => void
}
export const CenterModal = ({ children, condition, setCondition }: Props) => {

    const ref = useRef(null);
    useClickAway(ref, () => setCondition(false));

    return (
        <AnimatePresence mode="wait" initial={false} >
            {condition &&
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { delay: 0 } }}
                        transition={{ duration: 0.1 }}
                        className="fixed top-0 bottom-0 left-0 z-40 w-full h-screen flex justify-center 
                        items-center bg-black bg-opacity-10 backdrop-blur-[2px]"

                    >
                        <motion.div
                            className="bg-white dark:bg-modal-grey shadow-blur-10 flex-col gap-16 z-50 
                            rounded-md w-[35rem] h-80 flex justify-center items-center"
                            initial={{ transform: "scale(0)" }}
                            animate={{ transform: "scale(1)" }}
                            exit={{ transform: "scale(0)", transition: { delay: 0 } }}
                            transition={{ duration: 0.1 }}
                            ref={ref}
                        >
                            {children}
                        </motion.div>
                    </motion.div>
                </>
            }
        </AnimatePresence>
    )
}

