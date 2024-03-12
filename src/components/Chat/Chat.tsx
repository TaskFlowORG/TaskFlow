"use client";

import { ChatContent } from "./components/ChatContent";
import { useState, useEffect } from "react";
import { getListChat, getSingleChat } from "../../services/http/api";
import { Chat } from "@/models";

export const Chatt = () => {
    const [chats, setChats] = useState<Chat[]>([]);
    const [chatContent, setChatContent] = useState<Chat[]>([]);

    useEffect(() => {
        async function getChats() {
            const response = await getListChat("private", "jonatas");
            setChats(response);
            console.log(response);
            
        }
        getChats();
    }, []);

    useEffect(() => {
        async function getChats() {
            const response = await getSingleChat("private", "jonatas");
            setChatContent(response);
        }
        getChats();
    }, []);

    return (
        <>
            <div className="mx-2 lg:h-[10%]">
                <div className="w-full h-full lg:block">
                    {chatContent.map((chatContentt) => (
                        <ChatContent
                            key={chatContentt.id}
                            id={chatContentt.id}
                            picture={chatContentt.picture}
                            name={chatContentt.name}
                            lastMessage={chatContentt.lastMessage}
                            quantityUnvisualized={chatContentt.quantityUnvisualized}
                            messages={chatContentt.messages}
                            type={chatContentt.type}
                            equals={chatContentt.equals}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}
