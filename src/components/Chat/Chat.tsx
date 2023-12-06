"use client"

import { Chats } from "./components/Chats"
import { ChatContent } from "./components/ChatContent"
import { useState, useEffect } from "react"
import { getListChat } from "../../services/http/api"
import { ChatGetDTO } from "@/model/chat/ChatGetDTO"

export const Chatt = () => {
    const [mostrarChat, setMostrarChat] = useState(true)
    const [abrirChat, setAbrirChat] = useState(true)
    const [chats, setChats] = useState<ChatGetDTO[]>([])
    const [id, setId] = useState(0)

    const mostrarChats = () => {
        if (window.innerWidth < 1024) {
            setMostrarChat(!mostrarChat)
            setAbrirChat(!abrirChat)
        }
    }
    useEffect(() => {
        async function getChats() {
            const response = await getListChat("private", 1);
            setChats(response);
        }
        getChats();
    }, []);
    

    return (
        <>
            <div className="mx-2">
                <div className="w-full h-[80vh] lg:h-[89vh]  flex mt-20 lg:px-14 gap-4 lg:gap-14 flex-col lg:justify-center lg:flex-row">
                    <div className={`w-full lg:w-[40%]  lg:h-full justify-center ${abrirChat  ? 'blur-none': 'blur-sm '}`}>
                        <div className="flex flex-col items-center lg:items-start w-full lg:h-full gap-4">
                            <div className="flex items-center w-full justify-center gap-[40%] lg:gap-[65%] bg-input-grey h-full lg:h-[10%] rounded-lg shadow-blur-10">
                                <div>
                                    <h3 className="h3">Chats</h3>
                                </div>
                                <div>
                                    <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-full">
                                        <img className=" rounded-full" src="/searchIcons/search.svg" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex justify-around ">
                                <div className="link link-underline link-underline-black">
                                    <h5 className="h5 text-black">Perfis</h5>
                                </div>
                                <div className="link link-underline link-underline-black">
                                    <h5 className="h5 text-black">Grupos</h5>
                                </div>
                            </div>
                            <div onClick={mostrarChats} className={`w-full flex h-[72.5vh] lg:h-[73vh] overflow-scroll ${mostrarChat ? 'visible' : 'hidden'}`}>
                                <div className="w-full">
                                    { chats.map((chat) => <Chats id={chat.id} picture={chat.picture} name={chat.name} lastMessage={chat.lastMessage} quantitityUnvisualized={chat.quantitityUnvisualized} messages={[]} />)}
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="w-full h-full  lg:block">
                        <ChatContent></ChatContent>
                    </div>
                </div>
            </div>
        </>
    )
}