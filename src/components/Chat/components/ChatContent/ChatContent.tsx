import { TextContent } from "../TextContent/TextContent"
import { useState, useEffect } from "react"
import { ChatGetDTO } from "@/model/chat/ChatGetDTO"
import { getSingleChat } from "@/services/http/api"


export const ChatContent = () => {
    const [receptor, setReceptor] = useState(false)
    const [mostrarChat, setMostrarChat] = useState(true)
    const [mensagens, setMensagens] = useState<ChatGetDTO[]>([])
    const [abrirChat, setAbrirChat] = useState(false)

    const mostrarChats = () => {
        if (window.innerWidth < 1024) {
            setMostrarChat(!mostrarChat)
            setAbrirChat(!abrirChat)
        }
    }

    useEffect(() => {
        async function getChats() {
            const response = await getSingleChat("private", 1, 7);
            setMensagens(response);
        }
        getChats();
    }, []);
    

    return (
        <>

            <div className={`w-full h-full ${abrirChat ? 'invisible lg:block' : 'visible lg:block'}`}>
                <div className="flex bg-input-grey w-full h-[10%] lg:h-[10%] rounded-lg items-center justify-around shadow-blur-10">
                    <div className="flex bg-primary rounded-full w-[17.5%] lg:w-[4%] h-11 mx-5">
                    </div>
                    <div className="w-[80%] lg:mx-2">
                        {mensagens.map((mensagem) => <h3 className="p lg:h4">{mensagem.name}</h3>)}
                    </div>
                    <div className="w-[40%] lg:w-[20%] flex items-center lg:px-14 lg:justify-end ">
                        <div className="mx-2">
                            <img src="/img/Status.svg" alt="" />
                        </div>
                        <div className="mx-2">
                            <p className="p">online</p>
                        </div>
                    </div>
                </div>
                <div className="h-[63vh] lg:h-[73.5vh] overflow-scroll">
                    <div className="flex  w-full  flex-col">
                        {mensagens.map((mensagem) => <TextContent id={mensagem.id} name={mensagem.name} picture={mensagem.picture} messages={[]} quantitityUnvisualized={mensagem.quantitityUnvisualized} lastMessage={mensagem.lastMessage} />)}
                    </div>
                </div>
                <div className="flex w-full h-[8%] lg:h-[8%] gap-3">
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
                    <button className="bg-primary w-[20%] lg:w-[6%] rounded-lg flex justify-center items-center">
                        <img className="w-[50%] h-[50%] lg:w-[60%] lg:h-[60%]" src="/img/enviar.svg" alt="" />
                    </button>
                </div>

            </div>

        </>
    )
}   