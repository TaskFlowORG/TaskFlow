'use client'

import { Chat } from "@/models";
import React from "react"
import { useState, useEffect } from "react"
import { Chats } from "../../../../../components/Chat/components/Chats"
import { ChatDontExists } from "@/components/Chat/components/ChatDontExists";
import { getListChat, getChatLike } from "../../../../../services/http/api";

export default function RootLayout({ children, params }: { children: React.ReactNode, params: { chatId: string } }) {

    const [listaChats, setListaChats] = useState<Chat[]>([]);
    const [abrir, setAbrir] = useState<boolean>(false);
    const [existe, setExiste] = useState<boolean>(true);

    async function handleKeyPress(e: any) {
        if ((await getChatLike(e.target.value))) {
            if (listaChats.length === 0) {
                setExiste(false);
            } else {
                setExiste(true);
                const response = await getChatLike(e.target.value);
                setListaChats(response);
            }

        } else {
            const response = await getListChat("private", "johndoeasdasd");
            setListaChats(response);
        }
    }

    useEffect(() => {
        async function buscarChats() {
            //Implementar a busca de id do usuário logado
            const response = await getListChat("private", "johndoeasdasd");
            setListaChats(response);
        }
        buscarChats();
    }, []);

    const abrirBusca = () => {
        setAbrir(!abrir);
    }

    return (

        <>
            <div className="w-full h-[80vh] lg:h-[89vh]  flex mt-20 lg:px-14 gap-4 lg:gap-14 flex-col lg:justify-center lg:flex-row">
                <div className={`w-full lg:w-[40%]  lg:h-full justify-center`}>
                    <div className="flex flex-col items-center w-full lg:h-full gap-4">

                        <div className="flex items-center w-full justify-between bg-input-grey h-full lg:h-[10%] rounded-lg shadow-blur-10">
                            <div className={`w-30 px-4  ${abrir ? "hidden" : "visible"}`}>
                                <h3 className="h3">Chats</h3>
                            </div>
                            <div className={`flex justify-center duration-200  ${abrir ? "w-full" : "w-20"}`}>
                                <div onClick={() => abrirBusca()} className={` cursor-pointer flex items-center justify-center duration-0 w-10 h-10 bg-primary 
                                ${!abrir ? "rounded-full" : "rounded-l-lg"}`}>
                                    <img className=" rounded-full" src="/searchIcons/search.svg" alt="" />
                                </div>
                                <div className={`w-[80%]  ${abrir ? "visible" : "hidden"}`}>
                                    <input onChange={handleKeyPress} className="w-full h-full bg-primary  rounded-r-lg text-white outline-none px-4" type="text" />
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

                        <div className={`w-full flex h-[72.5vh] lg:h-[73vh] overflow-scroll `}>
                            <div className="w-full">
                                {!existe ? <ChatDontExists /> : listaChats.map(chat => (
                                    <Chats key={chat.id}
                                        id={chat.id} name={chat.name}
                                        messages={chat.messages}
                                        picture={chat.picture}
                                        quantityUnvisualized={chat.quantityUnvisualized}
                                        lastMessage={chat.lastMessage} type={chat.type}
                                        equals={chat.equals} />
                                ))}

                            </div>
                        </div>
                    </div>

                </div>
                {children}
            </div>
        </>
    )
}
