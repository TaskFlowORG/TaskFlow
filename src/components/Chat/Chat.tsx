"use client";

import { Chats } from "./components/Chats";
import { ChatContent } from "./components/ChatContent";
import { useState, useEffect } from "react";
import { getListChat, getSingleChat } from "../../services/http/api";
import { ChatGetDTO } from "@/model/chat/ChatGetDTO";

export const Chatt = () => {
    const [mostrarChat, setMostrarChat] = useState(true);
    const [abrirChat, setAbrirChat] = useState(true);
    const [chats, setChats] = useState<ChatGetDTO[]>([]);
    const [chatContent, setChatContent] = useState<ChatGetDTO[]>([]);
    const [chatClicado, setChatClicado] = useState<number | null>(null);

    const mostrarChats = () => {
        if (window.innerWidth < 1024) {
            setMostrarChat(!mostrarChat);
            setAbrirChat(!abrirChat);
        }
    };

    useEffect(() => {
        async function getChats() {
            const response = await getListChat("private", 1);
            setChats(response);
        }
        getChats();
    }, []);

    useEffect(() => {
        async function getChats() {
            const response = await getSingleChat("private", 1, chatClicado || 7);
            setChatContent(response);
        }
        getChats();
    }, [chatClicado]);

    return (
        <>
            <div className="mx-2 lg:h-[10%] ">
                <div className="w-full h-full  lg:block">
                    {chatContent.map((chatContentt) => (
                        <ChatContent
                            key={chatContentt.id}
                            id={chatContentt.id}
                            picture={chatContentt.picture}
                            name={chatContentt.name}
                            lastMessage={chatContentt.lastMessage}
                            quantitityUnvisualized={chatContentt.quantitityUnvisualized}
                            messages={chatContentt.messages}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}