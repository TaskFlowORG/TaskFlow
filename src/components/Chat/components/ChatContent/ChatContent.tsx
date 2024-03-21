import { TextContent } from "../TextContent/TextContent"
import { Chat } from "@/models"
import { useState, useEffect } from "react"
import { getSingleChat, enviarMessage } from "@/services/http/api"
import Image from "next/image"


export const ChatContent = ({ name, messages }: Chat) => {

    const [mensagem, setMensagem] = useState('')

    const pegarMensagem = (event: any) => {
        setMensagem(event.target.value)
    }

    async function enviarMensagem() {
        //Só falta enviar a mensagem para o backend lidar com ela
        //const response = await enviarMessage();
        console.log(mensagem);
    }

    function verificarStatus() {
        //mais para frente será implementado sistema para verificar se o usuário está online ou offline
        return "Offline"
    }

    function alterarCorStatus() {
        //mais para frente será implementado sistema para verificar se o usuário está online ou offline
        return "bg-red-600"
    }

    return (
        <>
            <div className={`w-full h-full gap-10`}>
                <div className="flex bg-input-grey w-full h-full rounded-lg items-center justify-around shadow-blur-10">
                    <div className="flex bg-primary rounded-full lg:w-[4%] h-11 mx-5">
                    </div>
                    <div className="w-[80%] lg:mx-2">
                        <h5 className=" text-xl">{name}</h5>
                    </div>
                    <div className="w-[40%] lg:w-[20%] flex items-center lg:px-14 lg:justify-end ">
                        <div className="mx-2 rounded-full w-2 h-2 bg-red-600">

                        </div>
                        <div className="mx-2">
                            <p className="p">{verificarStatus()}</p>
                        </div>
                    </div>
                </div>
                <div className="h-[63vh] lg:h-[73.5vh] overflow-scroll">
                    <div className="flex w-full flex-col gap-5">
                        {messages.map((mensagem) => (
                            <TextContent key={mensagem.id} />
                        ))}
                    </div>
                </div>
                <div className="flex w-full h-[67%] gap-3">
                    <div className="w-full h-full  bg-input-grey flex  items-center px-5 shadow-blur-10 rounded-lg">
                        <div className="w-full">
                            <input value={mensagem} onChange={pegarMensagem} className="p w-full bg-transparent outline-none" type="text" placeholder="Digite aqui..." />
                        </div>
                        <button className="w-[10%] h-full">
                            <span className="relative w-[50%] h-[50%]">
                            <Image fill src="/img/audio.svg" alt="Audio" />
                            </span>
                        </button>
                        <button className="h-full">
                            <span className="relative w-[70%] h-[70%]" >
                            <Image fill src="/img/arquivo.svg" alt="Annex" />
                            </span>
                        </button>
                    </div>
                    <button onClick={() => enviarMensagem()} className="bg-primary w-[20%] lg:w-[6%] rounded-lg flex justify-center items-center">
                        <span className="relative w-[50%] h-[50%] lg:w-[60%] lg:h-[60%]">
                            <Image fill src="/img/enviar.svg" alt="Send" />
                        </span>
                    </button>
                </div>
            </div>
        </>
    )
}   