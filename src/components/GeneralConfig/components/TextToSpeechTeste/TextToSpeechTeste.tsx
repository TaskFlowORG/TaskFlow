import { useEffect } from "react";

export const TextToSpeechTeste = () => {

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const body = document.getElementById("body");
            const clickedElement = event.target as HTMLElement;
            const content = clickedElement.textContent || '';
            if (body?.classList.contains("mouseTts")){
                window.speechSynthesis.speak(new SpeechSynthesisUtterance(content));
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
        <div onClick={toggleCursor} className="fixed z-[999] right-3 top-96 duration-700 ">
            <div className="w-48 h-9 flex flex-row-reverse justify-between duration-700 ">
                <div className="cursor-pointer bg-orange-600 w-9 h-9 rounded-md"></div>
            </div>
        </div>
    )
}