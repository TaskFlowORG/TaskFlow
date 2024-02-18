import { TextContent } from "../TextContent/TextContent"
import { useState, useEffect } from "react"
import { getSingleChat, enviarMessage } from "@/services/http/api"
import { Archive, Chat } from "@/models";
import { Message } from "@/models";

interface Props {
    id: number,
    name: string,
    messages: Message[],
    picture: Archive,
    quantityUnvisualized: number,
    lastMessage?: Message
}

export const ChatContent = ({ id, name, messages, picture, quantityUnvisualized, lastMessage }:Props) => {

    async function enviarMensagem() {
        const response = await enviarMessage();
    }

    function verificarStatus(){
        //mais para frente será implementado sistema para verificar se o usuário está online ou offline
        return "Offline"
    }

    function alterarCorStatus(){
        //mais para frente será implementado sistema para verificar se o usuário está online ou offline
        return "bg-red-500"
    }

    return (
        <>
            <div className={`w-full h-full gap-10`}>
                <div className="flex bg-input-grey w-full h-full rounded-lg items-center justify-around shadow-blur-10">
                    <div className="flex bg-primary rounded-full lg:w-[4%] h-11 mx-5">
                    </div>
                    <div className="w-[80%] lg:mx-2">
                        <h3>{name}</h3>
                    </div>
                    <div className="w-[40%] lg:w-[20%] flex items-center lg:px-14 lg:justify-end ">
                        <div className="mx-2">
                            <img src="/img/Status.svg" alt="" />
                        </div>
                        <div className="mx-2">
                            <p className="p">{verificarStatus()}</p>
                        </div>
                    </div>
                </div>
                <div className="h-[63vh] lg:h-[73.5vh] overflow-scroll">
                    <div className="flex w-full flex-col gap-5">
                        {messages.map((message) => (
                            <TextContent key={message.id} id={message.id} messages={[message]} name={name} picture={picture} quantityUnvisualized={quantityUnvisualized} lastMessage={lastMessage} />
                        ))}
                    </div>
                </div>
                <div className="flex w-full h-[67%] gap-3">
                    <div className="w-full h-full lg:w-[93%] bg-input-grey flex  items-center px-5 shadow-blur-10 rounded-lg">
                        <div className="w-[88%]">
                            <input className="p w-full bg-transparent outline-none" type="text" placeholder="Digite aqui..." />
                        </div>
                        <button className="flex justify-center items-center w-[6%]">
                            <img className="" src="/img/audio.svg" alt="" />
                        </button>
                        <button className="flex justify-center items-center w-[6%]">
                            <img className="" src="/img/arquivo.svg" alt="" />
                        </button>
                    </div>
                    <button onClick={() => enviarMensagem()} className="bg-primary w-[20%] lg:w-[6%] rounded-lg flex justify-center items-center">
                        <img className="w-[50%] h-[50%] lg:w-[60%] lg:h-[60%]" src="/img/enviar.svg" alt="" />
                    </button>
                </div>

            </div>

        </>
    )
}   