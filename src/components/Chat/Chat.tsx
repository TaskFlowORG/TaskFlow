"use client";

import { ChatContent } from "./components/ChatContent";
import { useState, useEffect } from "react";
import { chatService } from "@/services";
import { Chat, NumberValued, OtherUser } from "@/models";
type chattype = {
    chatId : number;
}

export const Chatt = ( {chatId} : chattype) => {
    const [chatContent, setChatContent] = useState<Chat>();

    useEffect(() => {
        (async function getChats() {
            const response = await chatService.findAllGroup()
            const response2 = await chatService.findAllPrivate()
            setChatContent([...response, ...response2].find(chat => chat.id === chatId));           
        })()
    }, [chatId]);

    return (
        <>
            <div className="mx-2 lg:h-[10%]">
                <div className="w-full h-full lg:block">
                    {
                        chatContent &&
                        <ChatContent
                            key={chatContent.id}
                            id={chatContent.id}
                            picture={chatContent.picture}
                            name={chatContent.name}
                            lastMessage={chatContent.lastMessage}
                            quantityUnvisualized={chatContent.quantityUnvisualized}
                            messages={chatContent.messages}
                            type={chatContent.type}
                            equals={chatContent.equals}
                        />
                    }
                </div>
            </div>
        </>
    )
}
