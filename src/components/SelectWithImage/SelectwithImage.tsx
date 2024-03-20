import { ReactNode, useEffect, useRef, useState } from "react";
import { If } from "../If";
import { useClickAway } from "react-use";
import { AnimatePresence, motion } from "framer-motion";
import { transform } from "next/dist/build/swc";
import { set } from "react-hook-form";

interface Props {
    list: { value: string, image: ReactNode }[];
    onChange: (value: string) => void;
    selected: string;
    disabled?: boolean
}


export const SelectWithImage = ({ list, onChange, selected, disabled }: Props) => {

    const [show, setShow] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);
    useClickAway(ref, () => setShow(false))
    const [openToTop, setOpenToTop] = useState<boolean>(false)
    const [height, setHeight] = useState<number>(0)
    const refOptions = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (refOptions.current) {
            const { top } = refOptions.current.getBoundingClientRect()
            setOpenToTop(top > window.innerHeight / 2)
            setHeight(refOptions.current.clientHeight)
        }
    }, [show])

    return (
        <div ref={ref} className={"relative flex items-center cursor-pointer rounded-md " + (show ? "shadow-blur-10 " : "") + (openToTop?"flex-col-reverse":"flex-col")}
        >
            <div onClick={() => !disabled && setShow(!show)} style={{ opacity: disabled ? "0.6" : '1' }} className={(show ?
                "py-2 rounded-md h-full w-10 flex justify-center items-center bg-white dark:bg-back-grey" : "")}>
                {list.filter(item => item.value === selected)[0].image}
            </div>
            <AnimatePresence mode="wait" initial={false} >
                {
                    show &&
                    <motion.div
                    ref={refOptions}
                    initial={{ opacity: 0, scale: "1, 0" }}
                    animate={{ opacity: 1, scale: "1, 1" }}
                    exit={{ opacity: 0, scale: "1, 0"}}
                    transition={{ duration: 0.2 }}
                        className={`w-10 shadow-blur-10 justify-center rounded-md bg-white dark:bg-back-grey overflow-hidden border-t-2 border-input-grey 
                    z-20 dark:border-modal-grey absolute flex  py-1 items-start ${openToTop ? `bottom-11 flex-col-reverse origin-bottom` : "top-11 flex-col origin-top"}`}>
                        {
                            list.map((item, index) => (
                                <div key={index} className="hover:bg-zinc-200  hover:dark:bg-zinc-600 w-10 h-8  flex items-center justify-center px-2 bg-white dark:bg-back-grey  "
                                    onClick={() => { onChange(item.value); setShow(false) }}>
                                    {item.image}
                                </div>
                            ))
                        }
                    </motion.div>
                }

            </AnimatePresence>
        </div>

    )

}