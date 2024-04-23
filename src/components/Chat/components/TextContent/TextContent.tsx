import { Chat } from "@/models"
import { chatService } from "@/services"
import { useEffect, useState } from "react"

export const TextContent = () => {
    const [mensagens, setMensagens] = useState<Chat[]>([])

    useEffect(() => {
        async function getChats() {
            const response = await chatService.findAllGroup()
            const response2 = await chatService.findAllPrivate()
            setMensagens([...response, ...response2]);
            console.log(response);
        }
        getChats();
    }, []);


    return (
        <div className="flex">
            <div className="bg-[#E9E7E7] w-5 h-5 rounded-bl-[100%]">
            </div>
            <div className="bg-[#E9E7E7] p-[10px] w-[100%] max-w-[250px] rounded-b-lg rounded-tr-lg">
                {mensagens.map((mensagem) =>
                    //Tem q arrumar a key
                    <h3 key={0} className="p lg:h4 text-black">
                         {mensagem.messages[0].value} 
                    </h3>)}
            </div>
        </div>
    )
}