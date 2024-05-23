import { If } from "@/components/If";
import { IconTextToSpeechOn, IconTextToSpeechOff } from "@/components/icons";
import { UserContext } from "@/contexts/UserContext";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
export const TextToSpeech = () => {

    const { user } = useContext(UserContext);
    const [ttsAtivo, setTtsAtivo] = useState(Boolean);
    const [modal, setModal] = useState(false);
    const {t}  = useTranslation();

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            let speaker = new SpeechSynthesisUtterance()
            const body = document.getElementById("body");
            const clickedElement = event.target as HTMLElement;
            const content = clickedElement.textContent || '';
            if (body?.classList.contains("mouseTts")) {
                if (user?.configuration.language == "PORTUGUESE") {
                    speaker.lang = "pt-BR";
                    speaker.text = content;
                    window.speechSynthesis.speak(speaker);
                } else if (user?.configuration.language == "ENGLISH") {
                    speaker.lang = "en-US";
                    speaker.text = content;
                    window.speechSynthesis.speak(speaker);
                } else {
                    speaker.lang = "es-ES";
                    speaker.text = content;
                    window.speechSynthesis.speak(speaker);
                }
            }
        }
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [modal]);

    const toggleCursor = () => {
        const body = document.getElementById("body") as any;
        if (body) {
            body.classList.toggle("mouseTts");
        }
    }

    return (
        <div className={`fixed z-[999] right-3 duration-700 top-[40%] flex `}>
            <div onMouseEnter={() => { setModal(true) }} onMouseLeave={() => { setModal(false) }} onClick={() => (toggleCursor(), setTtsAtivo(!ttsAtivo))} className="z-30 w-[2.40rem] h-10 flex flex-row-reverse justify-between duration-700 ">
                <div className="flex items-center justify-center cursor-pointer bg-blue-500 w-12 h-10 rounded-md">
                    <If condition={ttsAtivo}>
                        <IconTextToSpeechOn classes="w-8 h-8 text-white" />
                    </If>
                    <If condition={!ttsAtivo}>
                        <IconTextToSpeechOff classes="w-8 h-8 text-white" />
                    </If>
                </div>
            </div>
            <AnimatePresence mode="wait" initial={false}>
                {
                    modal && (
                        <motion.div
                            initial={{ width: "38.8px" }}
                            animate={{ width: "128px", left: "-138px" }}
                            exit={{ width: "38px", left: "0px", transition: { delay: 0.2 } }}
                            transition={{ duration: 0.3 }}
                            className="bg-blue-500 absolute z-20 origin-left overflow-clip justify-start text-white rounded-md w-40 h-10 flex items-center"
                        >
                            <div className="w-full h-12 flex items-center justify-center ">
                                <span className="text-p font-alata whitespace-nowrap">{t("accessibility-config-text-speech")}</span>
                            </div>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </div>
    )
}