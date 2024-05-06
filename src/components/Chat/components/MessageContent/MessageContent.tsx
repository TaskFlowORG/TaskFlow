import Image from "next/image";

import { If } from "@/components/If"
import { UserContext } from "@/contexts/UserContext";
import { archiveToSrc } from "@/functions";
import { Message } from "@/models"
import { useContext, useEffect, useState } from "react"
type chattype = {
    message: Message;
    lastMessage: Message
    penultimaMensagem: boolean
    key: number
}

export const MessageContent = ({ penultimaMensagem, lastMessage, message, key }: chattype) => {
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
                        <div className={"rounded-full w-7 h-7 " + (penultimaMensagem ? "bg-primary mb-4" : "")}>
                            <If condition={penultimaMensagem}>
                                <Image width={28} height={28} className="rounded-full w-7 h-7" src={photoUrl} alt="foto" />
                            </If>

                        </div>

                        <div className="flex flex-row-reverse">
                            <If condition={!penultimaMensagem}>
                                <div className="pr-5"></div>
                            </If>
                            <If condition={penultimaMensagem}>
                                <div className="w-5 h-5 rounded-br-[100%]" style={{ backgroundImage: "linear-gradient(to left, var(--secondary-color) 0%, var(--primary-color) 80%)" }}>
                                </div>
                            </If>

                            <div className={`p-[10px] h-fit w-fit max-w-[30rem] min-w-[3rem] rounded-b-lg rounded-tl-lg  flex-row-reverse justify-start  ${penultimaMensagem ? "mb-6" : ""}`} style={{ backgroundImage: "linear-gradient(to right, var(--secondary-color) 0%, var(--primary-color) 80%)" }}>
                                <p className="break-all max-w-[30rem]">{message.value}</p>
                                <div className="flex justify-end">
                                    <If condition={message.annex != null}>
                                        <div className="w-48 h-48">
                                            <img src={arquivoUrl} alt="" />
                                        </div>
                                    </If>
                                </div>
                                <div className="self-end h-3 opacity-60 pr-2 text-mn font-alata">
                                    <p>{hour}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pr-2">
                        <img src="" alt="" />
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
                        <div className="flex">
                            <If condition={!penultimaMensagem}>
                                <div className="pr-5"></div>
                            </If>
                            <If condition={penultimaMensagem}>
                                <div className="bg-[#E9E7E7] dark:bg-gray-400  w-5 h-5 rounded-bl-[100%]">
                                </div>
                            </If>

                            <div className={`bg-[#E9E7E7] dark:bg-gray-400 p-[10px] h-fit w-fit max-w-[30rem] min-w-[3rem] rounded-b-lg rounded-tr-lg flex flex-col justify-start ${penultimaMensagem ? "mb-6" : ""}`}>
                                <p className="break-all max-w-[30rem]">{message.value}</p>
                                <div className="flex justify-start">
                                    <If condition={message.annex != null}>
                                        <div className="w-48 h-48">
                                            <img src={arquivoUrl} alt="" />
                                        </div>
                                    </If>
                                </div>
                                <div className="self-end pl-2 text-mn font-alata h-3 opacity-60">
                                    <p>{hour}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* dar uma revisada dps */}
                    {/* <If condition={message.destinations[key].visualized == true}>
                        <VisualizedChatOrMessage />
                    </If> */}
                </div>
            </If >
        </>
    )
}
