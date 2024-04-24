import { TextContent } from "../TextContent/TextContent"
import { Chat, Message, OtherUser } from "@/models"
import { useState, useEffect, useContext, use } from "react"
import { chatService, userService } from "@/services";   
import { UserContext } from "@/contexts/UserContext";

export const ChatContent = ({name, messages, id}: Chat) => {

    const [mensagem, setMensagem] = useState<string>("")
    const {user, setUser} = useContext(UserContext)

    const pegarMensagem = (event: any) => {
        setMensagem(event.target.value)
    }


    async function enviarMensagem() {
        if (mensagem != ""){
            await chatService.updateMessages(id, new Message(mensagem, (user as OtherUser) , new Date(), [], ))
            setMensagem("")
        }
        else{
            alert("Mensagem vazia")
        }
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
                    <div className="flex  w-full flex-col gap-5">
                        <div className="flex justify-center py-5 p text-primary">
                            <p>Este é o começo de sua conversa com {name} </p>
                        </div>
                        {messages.map((mensagem, index) => (
                            <TextContent message={mensagem} key={index} />
                        ))}
                    </div>
                </div>
                <div className="flex w-full h-[67%] gap-3">
                    <div className=" w-full h-full  bg-input-grey flex  items-center px-5 shadow-blur-10 rounded-lg">
                        <div className="w-full">
                            <input id="inputMensagem" onChange={pegarMensagem} value={mensagem} className=" p w-full bg-transparent outline-none" type="text" placeholder="Digite aqui..."/>
                        </div>
                        <button className="w-[10%] h-full">
                            <img className="w-[50%] h-[50%]" src="/img/audio.svg" alt="" />
                        </button>
                        <button className="h-full">
                            <img className="w-[70%] h-[70%]" src="/img/arquivo.svg" alt="" />
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