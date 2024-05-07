import { MessageContent } from "../MessageContent/MessageContent"
import { Chat, Message, OtherUser } from "@/models"
import { useState, useEffect, useContext, useRef, ChangeEvent } from "react"
import { chatService } from "@/services";
import { UserContext } from "@/contexts/UserContext";
import { Keyboard } from "@/components/Keyboard";
import { Dictophone } from "@/components/Dictophone";
import { If } from "@/components/If";
import { compareDates } from "@/components/Pages/functions";
import { archiveToSrc } from "@/functions";
import Image from 'next/image'
import { IconArchive, SendMessage } from "@/components/icons";

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

    const { user } = useContext(UserContext)
    const [mensagem, setMensagem] = useState<string>("")
    const [mensagens, setMensagens] = useState<MessageGroup[]>()
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [photoUrl, setPhotoUrl] = useState<string>(chatContent ? archiveToSrc(chatContent.picture) : "");
    const [arquivoUrl, setArquivoUrl] = useState<string>();
    const [arquivo, setArquivo] = useState<File | null>();
    const arquivoParaEnviar = useRef<HTMLInputElement>(null);
    const [modalArquivo, setModalArquivo] = useState<boolean>(false);

    useEffect(() => {
        setPhotoUrl(archiveToSrc(chatContent?.picture));
    }, [chatContent]);

    const scrollToBottom = () => {

        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'instant' });
        }
    };

    useEffect(() => {
        scrollToBottom();
        const k: any = messages.map((message, index) => ({
            message: message, isFirst: messages.indexOf(message) == messages.length - 1 ? true : message.sender.id != messages[index + 1].sender.id
        }))
        setMensagens(k)
    }, [messages]);

    const pegarMensagem = (event: any) => {

        setMensagem(event.target.value)
    }



    async function enviarMensagem() {
        if (mensagem != "" || arquivoUrl != null) {
            await chatService.updateMessages(id, new Message(mensagem, (user as OtherUser), new Date(), [], new Date()), arquivo!)
            setMensagem("")
            setArquivo(null)
        }
        else {
            alert("Mensagem vazia")
        }
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

    const previewArquivo = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        setArquivo(e.target.files[0]);
        setArquivoUrl(URL.createObjectURL(e.target.files[0]));
    };

    return (
        <>
            <div className={`w-full h-full gap-10`}>
                <div className="flex bg-input-grey dark:bg-back-grey w-full h-full rounded-lg items-center  shadow-blur-10">
                    <div className="relative flex bg-primary rounded-full lg:w-11 h-11 mx-5  border-2 border-primary dark:border-secondary">
                        <Image fill className="rounded-full w-full h-full" src={photoUrl} alt="foto" />
                    </div>
                    <div className="w-[80%] lg:mx-2 text-black dark:text-white text-xl font-montserrat">
                        <h5 >{name}</h5>
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
                        <div className="">
                            <Keyboard setValue={setMensagem} bottom></Keyboard>
                        </div>
                        <div className="ml-[5px]">
                            <Dictophone setText={setMensagem}></Dictophone>
                        </div>

                        <div onClick={() => setModalArquivo(true)} className="w-[45px]">
                            <div>
                                <IconArchive></IconArchive>
                                <input
                                    ref={arquivoParaEnviar}
                                    id="photo"
                                    className="opacity-0 w-[25px] h-fit absolute bottom-10"
                                    type="file"
                                    accept="image/*"
                                    onChange={previewArquivo}
                                />
                            </div>
                        </div>
                        <If condition={arquivo != null}>
                            <div className="opacity-80 relative rounded-md bg-slate-500 lg:w-48 lg:h-48 w-28 h-28">
                                <div onClick={() => setArquivo(null)} className="relative z-10  left-2 top-2 cursor-pointer">
                                    <div className="flex justify-center items-center bg-red-600 w-7 h-7 rounded-full">
                                        <p>X</p>
                                    </div>
                                </div>
                                <Image fill className=" rounded-md w-full h-full" src={arquivoUrl!} alt="foto" />
                            </div>
                        </If>
                    </div>

                    <button onClick={() => enviarMensagem()} className="bg-primary dark:bg-secondary w-[20%] lg:w-[6%] rounded-lg flex justify-center items-center">
                        <SendMessage></SendMessage>
                    </button>
                </div>
            </div>
        </>
    )
}