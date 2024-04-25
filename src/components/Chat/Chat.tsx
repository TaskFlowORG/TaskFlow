"use client";

import { ChatContent } from "./components/ChatContent";
import { useState, useEffect, useContext } from "react";
import { chatService } from "@/services";
import { Chat, Message, NumberValued, OtherUser } from "@/models";
import { onConnect } from "@/services/webSocket/webSocketHandler";
import { UserContext } from "@/contexts/UserContext";
import { useEffectOnce, useMount } from "react-use";
type chattype = {
    chatId: number;
}

export const Chatt = ({ chatId }: chattype) => {
    const [chatContent, setChatContent] = useState<Chat>();
    const [messages, setMessages] = useState<Message[]>([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        (async function getChats() {
            const response = await chatService.findAllGroup()
            const response2 = await chatService.findAllPrivate()
            const chat = [...response, ...response2].find(chat => chat.id === chatId)
            setChatContent(chat);
            setMessages(chat?.messages || [])
            console.log("aaaaaaaaaaaaaaaaaaaaa" + chat);
            
        })()
    }, [chatId]);


    useEffect(() => {
        console.log("play")
        if (!chatContent) return;
        // Establish WebSocket connection and subscribe to chat channel
        const conect = onConnect(`/chat/${chatContent.id}`, (message) => {
            const messagetemp = JSON.parse(message.body);
            console.log(message.body);
            
            setMessages(prev => [...prev, messagetemp]);
        });
        return () => {
            conect.disconnect();
        }
    }, [chatContent]); 


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
                            messages={messages}
                            type={chatContent.type}
                            equals={chatContent.equals}
                        />
                    }
                </div>
            </div>
        </>
    )
}
