import { If } from "@/components/If";
import { IconTextToSpeechOn, IconTextToSpeechOff } from "@/components/icons";
import { UserContext } from "@/contexts/UserContext";
import { useEffect, useState } from "react";
import { useContext } from "react";
export const TextToSpeechTeste = () => {

    const { user } = useContext(UserContext);
    const [ttsAtivo, setTtsAtivo] = useState(Boolean);

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
    }, []);

    const toggleCursor = () => {
        const body = document.getElementById("body");
        if (!body) return;
        body.classList.toggle("mouseTts");
        
    }

    return (
        <div onClick={() => (toggleCursor(), setTtsAtivo(!ttsAtivo))} className="fixed z-[999] right-3 top-96 duration-700 pt-20 lg:pt-0">
            <div className="w-[2.40rem] h-10 flex flex-row-reverse justify-between duration-700 ">
                <div className="flex items-center justify-center cursor-pointer bg-blue-500 w-12 h-10 rounded-md">
                    <If condition={ttsAtivo}>
                        <IconTextToSpeechOn classes="w-8 h-8 text-white" />
                    </If>
                    <If condition={!ttsAtivo}>
                        <IconTextToSpeechOff classes="w-8 h-8 text-white" />
                    </If>
                </div>
            </div>
        </div>
    )
}