
import { Archive, Chat, Message } from "@/models";
import { getListChat, getSingleChat } from "@/services/http/api";
import { useEffect, useState } from "react"

interface Props {
    id: number,
    name: string,
    messages: Message[],
    picture: Archive,
    quantityUnvisualized: number,
    lastMessage?: Message
}

export const TextContent = ({ id, name, messages, picture, quantityUnvisualized, lastMessage }:Props) => {
    const [mensagens, setMensagens] = useState<Chat[]>([])

    useEffect(() => {
        async function getChats() {
            const response = await getSingleChat("private", 1, 6);
            setMensagens(response);
        }
        getChats();
    }, []);


    return (
        <div className="bg-black p-[10px] w-[100%] max-w-[250px] rounded-tr-xl">
            {mensagens.map((mensagem) =>
                //Tem q arrumar a key
                <h3 key={1} className="p lg:h4 text-white">
                    {mensagem.messages[0].value}
                </h3>)}
        </div>
    )
}