import Image from "next/image";

interface Props {
    text: string
}

export const TextToSpeechTeste = ({ text }: Props) => {


    const speak = () => {
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));

    }
    return (
        <div onClick={speak} className="bg-orange-600 w-9 h-9 absolute right-3 rounded-md" style={{ cursor: "url('https://winaero.com/blog/wp-content/uploads/2018/06/mouse-icon-big-256-2.png'), auto" }}>
            {/* Conteúdo do componente */}
        </div>
    )
}