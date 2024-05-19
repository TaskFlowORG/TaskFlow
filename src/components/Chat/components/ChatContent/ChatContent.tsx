import Image from 'next/image'
import { MessageContent } from "@/components/Chat/components/MessageContent";
import { Chat, Message, OtherUser } from "@/models"
import { useState, useEffect, useContext, useRef, ChangeEvent, use } from "react"
import { chatService } from "@/services";
import { UserContext } from "@/contexts/UserContext";
import { Keyboard } from "@/components/Keyboard";
import { Dictophone } from "@/components/Dictophone";
import { If } from "@/components/If";
import { compareDates } from "@/components/Pages/functions";
import { archiveToSrc } from "@/functions";
import { AudioFile, PdfIcon, SendMessage } from "@/components/icons";
import { SelectArchive } from "../SelectArchive";
import { useTranslation } from 'react-i18next';
import { useAsyncThrow } from '@/hooks/useAsyncThrow';
import { IconSend } from '@/components/icons/GeneralIcons/IconSend';

interface MessageGroup {
    id: number,
    lastMessage: Message,
    name: string,
    messages: Message[],
    message: Message,
    isFirst: boolean
    chatContent: Chat
}
export const ChatContent = ({ id, lastMessage, name, messages, chatContent }: MessageGroup) => {

    const { user } = useContext(UserContext)
    const [mensagem, setMensagem] = useState<string>("")
    const [mensagens, setMensagens] = useState<MessageGroup[]>()
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [photoUrl, setPhotoUrl] = useState<string>(chatContent ? archiveToSrc(chatContent.picture) : "");
    const [arquivoUrl, setArquivoUrl] = useState<string>();
    const [arquivo, setArquivo] = useState<File | null>();
    const arquivoParaEnviar = useRef<HTMLInputElement>(null);
    const { t } = useTranslation();

    useEffect(() => {
        setPhotoUrl(archiveToSrc(chatContent?.picture));
    }, [chatContent])

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef!.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        scrollToBottom();
        const k: any = messages.map((message, index) => {
            const yesterday = new Date();
            const otherDay = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const IsFirstMessage = messages.indexOf(message) == messages.length ? false : message.sender.id != messages[index - 1]?.sender.id
            const isFirstMessageDateYesterday = compareDates(new Date(message.dateCreate), yesterday) && !compareDates(new Date(messages[index - 1]?.dateCreate), yesterday)
            const isFirstMessageDateToday = compareDates(new Date(message.dateCreate), otherDay) && !compareDates(new Date(messages[index - 1]?.dateCreate), otherDay)
            return {
                message: message,
                isFirst: IsFirstMessage || isFirstMessageDateToday || isFirstMessageDateYesterday
            };
        });
        setMensagens(k);
    }, [messages]);
    
    const pegarMensagem = (event: any) => {
        setMensagem(event.target.value)
    }
    const asynThrow = useAsyncThrow();

    async function enviarMensagem() {
        if (mensagem != "" || arquivoUrl != "") {
            await chatService.updateMessages(id, new Message(mensagem, (user as OtherUser), new Date(), [], new Date()), arquivo!).catch(asynThrow);
            setMensagem("")
            setArquivo(null)
            setArquivoUrl("")
        } return
    }

    const firstMessageToday = (date: Date) => {
        return messages.find((message) => {
            const messageDate = new Date(message.dateCreate);
            return compareDates(date, messageDate)
        })
    }

    const firstMessageOfYesterday = (yesterday: Date) => {
        yesterday.setDate(yesterday.getDate() - 1);
        return messages.find((message) => {
            const messageDate = new Date(message.dateCreate);
            return compareDates(yesterday, messageDate);
        });
    };

    const firstMessageOfOtherDay = (otherDay: Date) => {
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
            <If condition={chatContent != null}>
                <div className={`lg:block flex flex-col items-center w-full h-full gap-10`}>
                    <div className="flex bg-input-grey dark:bg-back-grey lg:w-full w-[95%] lg:h-full h-20 rounded-md items-center  shadow-blur-10">
                        <div className="relative flex bg-primary rounded-full w-11 h-11 mx-5  border-2 border-primary dark:border-secondary">
                            <Image fill className="rounded-full w-full h-full" src={photoUrl} alt="foto" />
                        </div>
                        <div className="w-[80%] lg:mx-2 text-black dark:text-white text-xl font-montserrat">
                            <h5 >{name || "Grupo sem nome"}</h5>
                        </div>
                    </div>
                    <div className="h-[63vh] lg:h-[73.5vh] overflow-y-scroll px-3 py-4">
                        <div className="flex  w-full flex-col gap-1">
                            <div className="flex justify-center py-5 text-p font-alata text-constrast">
                                <p>{t("beginning-conversation")} {name || t("group-without-name")}</p>
                            </div>
                            {mensagens?.map((mensagem, index) => (
                                <>
                                    <If condition={firstMessageToday(new Date())?.id === mensagem.message.id}>
                                        <div className="w-full flex justify-center">
                                            <div className="flex justify-center w-fit min-w-[6rem] max-w-20 h-6 rounded-md my-5" style={{ backgroundImage: "linear-gradient(to right, var(--secondary-color) 0%, var(--primary-color) 80%)" }}>
                                                <p className="text-p font-montserrat text-contrast">{t("today")}</p>
                                            </div>
                                        </div>
                                    </If>
                                    <If condition={firstMessageOfYesterday(new Date())?.id === mensagem.message.id}>
                                        <div className="w-full flex justify-center">
                                            <div className="flex justify-center w-fit min-w-[6rem] max-w-36 h-6 rounded-md my-5" style={{ backgroundImage: "linear-gradient(to right, var(--secondary-color) 0%, var(--primary-color) 80%)" }}>
                                                <p className="text-p font-montserrat text-contrast">{t("yesterday")}</p>
                                            </div>
                                        </div>
                                    </If>
                                    <If condition={firstMessageOfOtherDay(new Date())?.id === mensagem.message.id}>
                                        <div className="w-full flex justify-center">
                                            <div className="flex justify-center min-w-[6rem] max-w-24 h-6 rounded-md my-5" style={{ backgroundImage: "linear-gradient(to right, var(--secondary-color) 0%, var(--primary-color) 80%)" }}>
                                                <p className="text-p font-montserrat text-contrast">{new Date(mensagem.message.dateCreate).getDay() + "/" + new Date(mensagem.message.dateCreate).getMonth() + "/" + new Date(mensagem.message.dateCreate).getFullYear()}</p>
                                            </div>
                                        </div>
                                    </If><div>
                                    </div>
                                    <MessageContent firstMessageSequency={mensagem.isFirst} lastMessage={lastMessage} message={mensagem.message} key={index} chatContent={chatContent} />
                                </>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>
                    <div className="flex w-full lg:h-[67%] h-16 gap-3 lg:pb-0 pb-2 relative">
                        <div className=" w-full h-full  bg-input-grey dark:bg-back-grey flex  items-center px-5 shadow-blur-10 rounded-md   ">
                            <div className="w-full">
                                <input onKeyDown={(event) => { if (event.key === "Enter") { enviarMensagem() } }} onChange={pegarMensagem} value={mensagem} className=" p w-full bg-transparent outline-none" type="text" placeholder={t("write-here")} />
                            </div>
                            <div className="flex items-center justify-center w-12">
                                <Keyboard setValue={setMensagem} bottom></Keyboard>
                            </div>
                            <div className="flex items-center justify-center w-12 ">
                                <Dictophone setText={setMensagem}></Dictophone>
                            </div>
                            <div className="w-14">
                                <SelectArchive arquivoParaEnviar={arquivoParaEnviar} previewArquivo={previewArquivo} />
                            </div>
                            <If condition={arquivo != null}>
                                <div className={` flex items-center justify-center opacity-80 absolute rounded-md bg-slate-500 left-0  max-w-72  min-w-28 h-28 -top-32 ${arquivo?.type == "application/pdf" || arquivo?.type.startsWith("audio/") ? "w-full" : "w-fit"}`}>
                                    <div onClick={() => setArquivo(null)} className="z-10  left-2 top-2 cursor-pointer flex justify-center items-center bg-primary dark:bg-secondary w-7 h-7 rounded-full absolute">
                                        <p className="text-p font-montserrat">X</p>
                                    </div>
                                    <div className="w-full flex justify-around">
                                        <If condition={arquivo != null && arquivo?.type.startsWith("image/")}>
                                            <div className="w-[90%] h-[90%] flex-tem">
                                                <Image fill className="rounded-md " src={arquivoUrl!} alt="foto" />
                                            </div>
                                        </If>
                                        <If condition={arquivo != null && arquivo?.type.startsWith("video/")}>
                                            <video className="rounded-md" src={arquivoUrl} controls ></video>
                                        </If>
                                        <If condition={arquivo != null && arquivo?.type == "application/pdf"}>
                                            <div className="flex items-center justify-center ">
                                                <PdfIcon classes="w-9 h-9"></PdfIcon>
                                                <p className="underline underline-offset-1 ">{arquivo?.name}</p>
                                            </div>
                                        </If>
                                        <If condition={arquivo != null && arquivo?.type.startsWith("audio/")}>
                                            <div className="flex items-center  ">
                                                <AudioFile classes="w-9"></AudioFile>
                                                <p className="underline underline-offset-1 break-all">{arquivo?.name}</p>
                                            </div>
                                        </If>
                                    </div>
                                </div>
                            </If>
                        </div >
                        <button onClick={() => enviarMensagem()} className="bg-primary dark:bg-secondary p-1 w-[20%] lg:w-[6%] rounded-md flex justify-center items-center">
                            <IconSend/>
                        </button>
                    </div >
                </div >
            </If>
        </>
    )
}