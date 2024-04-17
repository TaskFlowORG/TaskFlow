import { useState } from "react";

interface Props {
    text: string
}

export const TextToSpeechTeste = ( ) => {
    const [extendida, setExtendida] = useState(true)

    const speak = () => {
        window.speechSynthesis.speak(new SpeechSynthesisUtterance("boa tarde miguel"));
    }

    return (
        <div className="absolute right-3 duration-700 ">
            <div className="w-48 h-9 flex justify-end duration-700">
                <div onMouseEnter={() => setExtendida(true)} onMouseLeave={() => setExtendida(false)} onClick={speak} className=" bg-orange-600 w-9 h-9 rounded-md"></div>
                <div className={`duration-700 bg-orange-600 absolute rounded-md hover:-translate-x-12 hover:w-32 h-9 ${extendida ? "block" : "hidden"}`}></div>
            </div>
        </div>
    )
}
