import { ReactNode, useEffect, useRef, useState } from "react";
import { useClickAway } from "react-use";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";

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
    const {t} = useTranslation()

    return (
        <div ref={ref} className={"relative flex duration-100 select-nonecursor-pointer rounded-md " + (show ? " items-center shadow-[0_0_1px_1px_rgba(0,0,0,0.1)] justify-start  " : " items-center justify-center ") + (openToTop?"flex-col-reverse":"flex-col")}
        >
            <div onClick={() => !disabled && setShow(!show)} style={{ opacity: disabled ? "0.6" : '1' }} className={(show ?
                " rounded-t-md p-2 w-10 h-8 flex select-none justify-center items-center bg-white dark:bg-back-grey" : "h-8  p-2")}>
                {list.filter(item => item.value == selected)[0]?.image}
            </div>
            <AnimatePresence mode="wait" initial={false} >
                {
                    show &&
                    <motion.div
                    ref={refOptions}
                    initial={{height: "0px" }}
                    animate={{height: "min-content" }}
                    exit={{height: "0px"}}
                    transition={{ duration: 0.1 }}
                        className={`w-10 shadow-[0_0_1px_1px_rgba(0,0,0,0.1)] justify-start overflow-y-clip rounded-b-md bg-white dark:bg-back-grey overflow-hidden border-t-2 border-input-grey 
                    z-20 dark:border-modal-grey absolute flex  py-1 items-start ${openToTop ? `bottom-11 flex-col-reverse origin-bottom` : "top-8 flex-col origin-top"}`}>
                        {
                            list.map((item, index) => (
                                <div key={index} className="hover:bg-zinc-200  select-none hover:dark:bg-zinc-600 w-10 h-8 min-h-8  flex items-center justify-center px-2 bg-white dark:bg-back-grey  " title={t(item.value.toLowerCase())}
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