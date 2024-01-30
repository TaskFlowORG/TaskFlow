import { ChatGetDTO } from "@/model/chat/ChatGetDTO"
import { getListChat, getSingleChat } from "@/services/http/api";
import { useEffect, useState } from "react"

export const TextContent = ({ id, name, messages, picture, quantitityUnvisualized, lastMessage }: ChatGetDTO) => {
    const [mensagens, setMensagens] = useState<ChatGetDTO[]>([])

    useEffect(() => {
        async function getChats() {
            const response = await getSingleChat("private", 1, 7);
            setMensagens(response);
        }
        getChats();
    }, []);


    return (
        <div className="fancy-border-radius">
            {mensagens.map((mensagem) =>
                <h3 className="p lg:h4">
                    {mensagem.messages[0].value}
                </h3>)}
        </div>
    )
}