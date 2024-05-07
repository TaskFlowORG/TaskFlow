import { MessageContent } from "../MessageContent/MessageContent"
import { Chat, Message, OtherUser } from "@/models"
import { useState, useEffect, useContext, use, useRef } from "react"
import { chatService, userService } from "@/services";
import { UserContext } from "@/contexts/UserContext";
import { Keyboard } from "@/components/Keyboard";
import { Dictophone } from "@/components/Dictophone";
import { If } from "@/components/If";
import { compareDates } from "@/components/Pages/functions";
import { archiveToSrc } from "@/functions";
import Image from 'next/image'

interface MessageGroup {
    id: number,
    lastMessage: Message,
    name: string,
    messages: Message[],
    message: Message,
    isFirst: boolean
    chatContent: Chat
}

export const ChatContent = ({ id, lastMessage, name, messages, isFirst, chatContent }: MessageGroup) => {

    const [mensagem, setMensagem] = useState<string>("")
    const [mensagens, setMensagens] = useState<MessageGroup[]>()
    const { user } = useContext(UserContext)
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [photoUrl, setPhotoUrl] = useState<string>(chatContent ? archiveToSrc(chatContent.picture) : "");


    useEffect(() => {
        setPhotoUrl(archiveToSrc(chatContent?.picture));
    }, [chatContent]);

    useEffect(() => {

        scrollToBottom();
        const k:any = messages.map((message, index) => ({
            message: message, isFirst: messages.indexOf(message) == messages.length - 1 ? true : message.sender.id != messages[index + 1].sender.id
        }))
        setMensagens(k)
    }, [messages]);

    const pegarMensagem = (event: any) => {
        setMensagem(event.target.value)
    }

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'instant' });
        }
    };

    async function enviarMensagem() {
        if (mensagem != "") {
            await chatService.updateMessages(id, new Message(mensagem, (user as OtherUser), new Date(), [],))
            setMensagem("")
        }
        else {
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

    const firstMessageToday = (date: Date) => {
        return messages.find((message) => {
            const messageDate = new Date(message.dateCreate);
            return compareDates(date, messageDate)
        })
    }

    const firstMessageOfYesterday = (date: Date) => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return messages.find((message) => {
            const messageDate = new Date(message.dateCreate);
            return compareDates(yesterday, messageDate);
        });
    };

    const firstMessageOfOtherDay = (date: Date) => {
        const otherDay = new Date();
        otherDay.setDate(otherDay.getDate() - 2);
        return messages.find((message) => {
            const messageDate = new Date(message.dateCreate);
            return compareDates(otherDay, messageDate);
        });
    }

    return (
        <>
            <div className={`w-full h-full gap-10`}>
                <div className="flex bg-input-grey dark:bg-back-grey w-full h-full rounded-lg items-center justify-around shadow-blur-10">
                    <div className="relative flex bg-primary rounded-full lg:w-[4%] h-11 mx-5  border-2 border-primary dark:border-secondary">
                        <Image fill className="rounded-full w-full h-full" src={photoUrl} alt="foto" />
                    </div>
                    <div className="w-[80%] lg:mx-2 text-black dark:text-white text-xl font-montserrat">
                        <h5 >{name}</h5>
                    </div>
                    <div className="w-[40%] lg:w-[20%] flex items-center lg:px-14 lg:justify-end  ">
                        <div className="mx-2 rounded-full w-2 h-2 bg-red-600">

                        </div>
                        <div className="mx-2 text-black dark:text-white text-p font-montserrat">
                            <p>{verificarStatus()}</p>
                        </div>
                    </div>
                </div>
                <div className="h-[63vh] lg:h-[73.5vh] overflow-y-scroll px-3 py-4">
                    <div className="flex  w-full flex-col gap-1">
                        <div className="flex justify-center py-5 text-p font-alata text-constrast">
                            <p>Este é o começo de sua conversa com {name} </p>
                        </div>
                        {mensagens?.map((mensagem, index) => (
                            <>
                                <If condition={firstMessageToday(new Date())?.id === mensagem.message.id}>
                                    <div className="w-full flex justify-center">
                                        <div className="flex justify-center w-fit min-w-14 max-w-20 h-6 rounded-md" style={{ backgroundImage: "linear-gradient(to right, var(--secondary-color) 0%, var(--primary-color) 80%)" }}>
                                            <p className="text-p font-montserrat text-contrast">Hoje</p>
                                        </div>
                                    </div>
                                </If>
                                <If condition={firstMessageOfYesterday(new Date())?.id === mensagem.message.id}>
                                    <div className="w-full flex justify-center">
                                        <div className="flex justify-center w-fit min-w-16 max-w-20 h-6 rounded-md" style={{ backgroundImage: "linear-gradient(to right, var(--secondary-color) 0%, var(--primary-color) 80%)" }}>
                                            <p className="text-p font-montserrat text-contrast">Ontem</p>
                                        </div>
                                    </div>
                                </If>
                                <If condition={firstMessageOfOtherDay(new Date())?.id === mensagem.message.id}>
                                    <div className="w-full flex justify-center">
                                        <div className="flex justify-center min-w-[5rem] max-w-24 h-6 rounded-md" style={{ backgroundImage: "linear-gradient(to right, var(--secondary-color) 0%, var(--primary-color) 80%)" }}>
                                            <p className="text-p font-montserrat text-contrast">{new Date(mensagem.message.dateCreate).getDay() + "/" + new Date(mensagem.message.dateCreate).getMonth() + "/" + new Date(mensagem.message.dateCreate).getFullYear()}</p>
                                        </div>
                                    </div>
                                </If>
                                <MessageContent penultimaMensagem={mensagem.isFirst} lastMessage={lastMessage} message={mensagem.message} key={index} />
                            </>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
                <div className="flex w-full h-[67%] gap-3">
                    <div className=" w-full h-full  bg-input-grey dark:bg-back-grey flex  items-center px-5 shadow-blur-10 rounded-lg">
                        <div className="w-full">
                            <input onKeyDown={(event) => { if (event.key === "Enter") { enviarMensagem() } }} onChange={pegarMensagem} value={mensagem} className=" p w-full bg-transparent outline-none" type="text" placeholder="Digite aqui..." />
                        </div>
                        <Keyboard setValue={setMensagem} bottom></Keyboard>
                        <Dictophone setText={setMensagem}></Dictophone>
                    </div>
                    <button onClick={() => enviarMensagem()} className="bg-primary dark:bg-secondary w-[20%] lg:w-[6%] rounded-lg flex justify-center items-center">
                        <img className="w-[50%] h-[50%] lg:w-[60%] lg:h-[60%]" src="/img/enviar.svg" alt="" />
                    </button>
                </div>
            </div>
        </>
    )
}   