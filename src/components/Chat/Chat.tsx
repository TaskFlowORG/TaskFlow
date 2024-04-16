"use client";

import { ChatContent } from "./components/ChatContent";
import { useState, useEffect } from "react";
import { chatService } from "@/services";
import { Chat } from "@/models";

export const Chatt = () => {
    const [chatContent, setChatContent] = useState<Chat[]>([]);

    useEffect(() => {
        async function getChats() {
            const response = await chatService.findAllGroup()
            const response2 = await chatService.findAllPrivate()
            setChatContent([...response, ...response2]);
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
