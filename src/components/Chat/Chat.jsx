"use client"

import { Chats } from "./components/Chats"
import { ChatContent } from "./components/ChatContent"
import { useState, useEffect } from "react"
import { getListData } from "@/services/http/api"
export const Chat = () => {
    const [mostrarChat, setMostrarChat] = useState(true)
    const [abrirChat, setAbrirChat] = useState(true)

    const mostrarChats = () => {
        if (window.innerWidth < 1024) {
            setMostrarChat(!mostrarChat)
            setAbrirChat(!abrirChat)
        }
    }

    useEffect()
    
    getListData(`chat/private/1`)

    return (
        <>
            <div className="w-full h-[89vh] flex mt-20 lg:px-14 gap-14 flex-col lg:justify-center lg:flex-row">
                <div className="w-full lg:w-[40%]  justify-center">
                    <div className="flex flex-col items-center lg:items-start w-full h-full">
                        <div className="flex items-center w-full  justify-center gap-[40%] lg:gap-[65%] bg-input-grey h-[10%] rounded-lg shadow-blur-10 ">
                            <div>
                                <h3 className="h3">Chats</h3>
                            </div>
                            <div>
                                <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-full">
                                    <img className=" rounded-full" src="/searchIcons/search.svg" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex justify-around my-5">
                            <div className="link link-underline link-underline-black">
                                <h5 className="h5 text-black">Perfis</h5>
                            </div>

                            <div className="link link-underline link-underline-black">
                                <h5 className="h5 text-black">Grupos</h5>
                            </div>
                        </div>
                        <div onClick={() => mostrarChats()} className={`w-full flex h-[72.5vh] lg:h-[73vh] overflow-scroll ${mostrarChat ? 'visible lg:block' : 'hidden lg:block'
                            }`}>
                            <div className="w-full">
                                {
                                    Chats.map((chat) => {
                                        return <Chats unvisualized={chat.quantitityUnvisualized} name={chat.name} lastMessage={chat.lastMessage}/>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`w-full  lg:block ${abrirChat ? 'hidden lg:block' : 'visible lg:block'}`}>
                    <ChatContent></ChatContent>
                </div>
            </div>
        </>
    )
}