import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useClickAway } from "react-use";
import { AnimatePresence, motion } from "framer-motion";
import { AudioFile, GaleryIcon, IconArchive, PdfIcon } from "@/components/icons";

interface Props {
    disabled?: boolean
    arquivoParaEnviar: React.RefObject<HTMLInputElement>
    previewArquivo: (e: ChangeEvent<HTMLInputElement>) => void
}

export const SelectArchive = ({ arquivoParaEnviar, previewArquivo, disabled }: Props) => {

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
        <div ref={ref} className={"relative flex items-center select-none cursor-pointer rounded-md " + (openToTop ? "flex-col-reverse" : "flex-col")}>
            <div onClick={() => !disabled && setShow(!show)} style={{ opacity: disabled ? "0.6" : '1' }} className={(show ?
                "py-2 rounded-b-md h-full w-10 flex select-none justify-center items-center" : "")}>
                <IconArchive classes="text-[#BDBDBD]"></IconArchive>
            </div>
            <AnimatePresence mode="wait" initial={false} >
                {
                    show &&
                    <motion.div
                        ref={refOptions}
                        initial={{ opacity: 0, scale: "1, 0" }}
                        animate={{ opacity: 1, scale: "1, 1" }}
                        exit={{ opacity: 0, scale: "1, 0" }}
                        transition={{ duration: 0.2 }}
                        className={`w-10 shadow-blur-10 justify-center rounded-b-md bg-white dark:bg-back-grey overflow-hidden border-t-2 border-input-grey 
                    z-20 dark:border-modal-grey absolute flex  py-1 items-start ${openToTop ? `bottom-10 flex-col-reverse origin-bottom` : "top-8 flex-col origin-top"}`}>
                        <div className="hover:bg-zinc-200  select-none hover:dark:bg-zinc-600 w-10 h-10  flex items-center justify-center px-2 bg-white dark:bg-back-grey  ">
                            <div className="flex flex-col items-center justify-center h-full w-full">
                                <AudioFile></AudioFile>
                            </div>
                            <input
                                ref={arquivoParaEnviar}
                                id="photo"
                                className="opacity-0 absolute w-10 h-10 cursor-pointer"
                                type="file"
                                accept="audio/*"
                                onChange={previewArquivo}
                            />
                        </div>
                        <div className="hover:bg-zinc-200  select-none hover:dark:bg-zinc-600 w-10 h-10  flex items-center justify-center px-2 bg-white dark:bg-back-grey  ">
                            <div className="flex flex-col items-center justify-center w-6 h-6">
                                <GaleryIcon classes="w-6 h-6"></GaleryIcon>
                            </div>
                            <input
                                ref={arquivoParaEnviar}
                                id="photo"
                                className="opacity-0 absolute w-10 h-10 cursor-pointer"
                                type="file"
                                accept="images/*"
                                onChange={previewArquivo}
                            />
                        </div>
                        <div className="hover:bg-zinc-200  select-none hover:dark:bg-zinc-600 w-10 h-10  flex items-center justify-center px-2 bg-white dark:bg-back-grey  ">
                            <div className="flex flex-col items-center justify-center h-full w-full">
                                <PdfIcon></PdfIcon>
                            </div>
                            <input
                                ref={arquivoParaEnviar}
                                id="photo"
                                className="opacity-0 absolute w-10 h-10 cursor-pointer"
                                type="file"
                                accept="application/*"
                                onChange={previewArquivo}
                            />
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}