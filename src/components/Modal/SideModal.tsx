import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { useClickAway } from "react-use";

interface Props {
  children: React.ReactNode;
  condition: boolean;
  setCondition: (value: boolean) => void;
  right?: boolean;
}
export const SideModal = ({
  children,
  condition,
  setCondition,
  right,
}: Props) => {
  const ref = useRef(null);
  useClickAway(ref, () => setCondition(false));

  return (
    <AnimatePresence mode="wait" initial={false}>
      {condition && (
        <>
          <motion.div
            initial={right ? { right: -500 } : { left: -500 }}
            animate={right ? { right: 0 } : { left: 0 }}
            exit={{
              transition: { delay: 0.1 },
              ...(right ? { right: -500 } : { left: -500 }),
            }}
            transition={{ duration: 0.1 }}
            className={
              "fixed top-0 bottom-0 z-[70] flex items-center h-screen  w-[31rem] " +
              (right ? " justify-end" : " justify-start")
            }
          >
            <div className="w-min h-full relative" ref={ref}>
              <div className="max-h-screen h-full flex  relative">
                <div className="flex flex-col sodebar  max-h-screen gap-8 py-16 h-full p-4 bg-white dark:bg-modal-grey shadow-blur-10 dark:shadow-blur-20 w-64 smm:w-72 sm:w-96 px-16">
                  {children}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
