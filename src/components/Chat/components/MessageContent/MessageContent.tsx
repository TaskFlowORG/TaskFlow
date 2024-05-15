import Image from "next/image";

import { If } from "@/components/If"
import { UserContext } from "@/contexts/UserContext";
import { archiveToSrc } from "@/functions";
import { Chat, Message } from "@/models"
import { useContext, useEffect, useState } from "react"
import { PdfIcon } from "@/components/icons";

interface messageContent {
    message: Message;
    lastMessage: Message
    penultimaMensagem: boolean
    key: number
    chatContent: Chat
}

export const MessageContent = ({ penultimaMensagem, lastMessage, message, key, chatContent }: messageContent) => {
    const messageDate = new Date(message.dateCreate);
    const hour = messageDate.toLocaleTimeString().slice(0, 5);
    const { user } = useContext(UserContext);
    const [photo, setPhoto] = useState(message.sender.picture)
    const [photoUrl, setPhotoUrl] = useState<string>(user ? archiveToSrc(message.sender.picture) : "");
    const [arquivoUrl, setArquivoUrl] = useState<string>(message ? archiveToSrc(message.annex) : "");

    useEffect(() => {
        setPhoto(message.sender.picture)
        setPhotoUrl(archiveToSrc(message.sender.picture));
        setArquivoUrl(archiveToSrc(message.annex))
    }, [user])

    return (
        <>
            <If condition={message.sender.id === user?.id}>
                <div className="flex flex-row-reverse items-end">
                    <div className="flex flex-row-reverse text-contrast text-p font-montserrat gap-2">
                        <div className={"rounded-full w-7 h-7 " + (penultimaMensagem ? "bg-primary" : "")}>
                            <If condition={penultimaMensagem}>
                                <Image width={28} height={28} className="rounded-full w-7 h-7" src={photoUrl} alt="foto" />
                            </If>
                        </div>
                        <div className="flex flex-row-reverse">
                            <If condition={!penultimaMensagem}>
                                <div className="pr-5"></div>
                            </If>
                            <If condition={penultimaMensagem}>
                                <div className="w-5 h-5 rounded-br-[60%]" style={{ backgroundImage: "linear-gradient(to left, var(--secondary-color) 0%, var(--primary-color) 80%)" }}>
                                </div>
                            </If>
                            <div className={`p-[10px] h-fit w-fit max-w-[30rem] min-w-[3rem] rounded-b-md rounded-tl-md ${message.annex != null ? "flex-col" : "flex justify-end items-end"} `} style={{ backgroundImage: "linear-gradient(to right, var(--secondary-color) 0%, var(--primary-color) 80%)" }}>
                                <div className="flex flex-col justify-end items-end">
                                    <div className="flex justify-center w-full ">
                                        <If condition={message.annex != null && message.annex.type.startsWith("image/")}>
                                            <img className="rounded-md w-48 h-fit" src={arquivoUrl} alt="" />
                                        </If>
                                        <If condition={message.annex != null && message.annex.type.startsWith("video/")}>
                                            <video className="rounded-md" src={arquivoUrl} controls ></video>
                                        </If>
                                        <If condition={message.annex != null && message.annex.type == ("application/pdf")}>
                                            <div className="flex items-center justify-center">
                                                <a href={arquivoUrl} download={message.annex?.name}>
                                                    <div className="flex items-center justify-center gap-3">
                                                        <PdfIcon classes="w-9 h-9"></PdfIcon>
                                                        <div>
                                                            <p className="underline underline-offset-1 w-fit">{message.annex?.name}</p>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </If>
                                        <If condition={message.annex != null && message.annex.type.startsWith("audio/")}>
                                            <audio src={arquivoUrl} controls></audio>
                                        </If>
                                    </div>
                                    <div>
                                        <p className="break-all max-w-[30rem]">{message.value}</p>
                                    </div>
                                </div>
                                <div className="flex justify-end text-mn font-alata h-3 opacity-60 pl-2">
                                    <p>{hour}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </If>
            <If condition={message.sender.id != user?.id}>
                <div className="flex items-end">
                    <div className="flex dark:text-white text-black text-p font-montserrat gap-2">
                        <div className={"rounded-full w-7 h-7 " + (penultimaMensagem ? "bg-primary mb-4" : "")}>
                            <If condition={penultimaMensagem}>
                                <Image width={28} height={28} className="rounded-full w-7 h-7" src={photoUrl} alt="foto" />
                            </If>
                        </div>
                        <div className="flex flex-col">
                            <div className="ml-5">
                                <If condition={penultimaMensagem && chatContent.type.toString() == "GROUP"}>
                                    <div className="self-start  text-p font-alata h-fit opacity-100">
                                        <p>{message.sender.name}</p>
                                    </div>
                                </If>
                            </div>
                            <div className="flex ">
                                <If condition={!penultimaMensagem}>
                                    <div className="pr-5"></div>
                                </If>
                                <If condition={penultimaMensagem}>
                                    <div className="bg-[#E9E7E7] dark:bg-gray-400  w-5 h-5 rounded-bl-[60%]">
                                    </div>
                                </If>
                                <div className={`bg-[#E9E7E7] dark:bg-gray-400 p-[10px] h-fit w-fit max-w-[30rem] min-w-[3rem] rounded-b-md rounded-tr-md ${message.annex != null ? "flex-col" : "flex justify-end items-end"}`}>
                                    <div className="flex justify-end items-end">
                                        <div className="flex flex-col gap-2">

                                            <p className="break-all max-w-[30rem]">{message.value}</p>
                                            <div className="flex justify-start">
                                                <If condition={message.annex != null && message.annex.type.startsWith("image/")}>
                                                    <img className="rounded-md w-48 h-fit" src={arquivoUrl} alt="" />
                                                </If>
                                                <If condition={message.annex != null && message.annex.type.startsWith("video/")}>
                                                    <video className="rounded-md" src={arquivoUrl} controls ></video>
                                                </If>
                                                <If condition={message.annex != null && message.annex.type == ("application/pdf")}>
                                                    <div className="flex items-center justify-center">
                                                        <a href={arquivoUrl} download={message.annex?.name}>
                                                            <div className="flex items-center justify-center">
                                                                <PdfIcon classes="w-9 h-9"></PdfIcon>
                                                                <p className="underline underline-offset-1 w-fit">{message.annex?.name}</p>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </If>
                                                <If condition={message.annex != null && message.annex.type.startsWith("audio/")}>
                                                    <audio src={arquivoUrl} controls></audio>
                                                </If>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end text-mn font-alata h-3 opacity-60 ">
                                        <p className="">{hour}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </If >
        </>
    )
}