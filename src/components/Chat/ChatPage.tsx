"use client";

import { ChatContent } from "./components/ChatContent";
import { useState, useEffect, useContext } from "react";
import { chatService } from "@/services";
import { Chat, Message } from "@/models";
import { onConnect } from "@/services/webSocket/webSocketHandler";
import { ChatContext } from "@/contexts/ChatsContext";
import { useAsyncThrow } from "@/hooks/useAsyncThrow";

type chattype = {
    chatId: number;
}

export const ChatPage = ({ chatId }: chattype) => {
    const [chatContent, setChatContent] = useState<Chat>();
    const [messages, setMessages] = useState<Message[]>([]);
    const { setChat } = useContext(ChatContext);
    const asynThrow = useAsyncThrow();

    useEffect(() => {
        if(setChat) setChat(chatContent)
    },[chatContent, setChat])
    useEffect(() => {
        (async function getChats() {
            const response = await chatService.findAllGroup().catch(asynThrow)

            const response2 = await chatService.findAllPrivate().catch(asynThrow)
            if (!response || !response2) return;
            const chat = [...response, ...response2].find(chat => chat.id === chatId)
            setChatContent(chat);
            setMessages(chat?.messages || [])
        })()
    }, [chatId]);

    useEffect(() => {
        if (!chatContent) return;
        const connect = onConnect(`/chat/${chatContent.id}`, (message) => {
            const messagetemp = JSON.parse(message.body);
            setMessages(prev => [...prev, messagetemp]);
        },);
        return () => {
            connect.disconnect();
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
                            name={chatContent.name}
                            messages={messages}
                            chatContent={chatContent}
                            lastMessage={chatContent.lastMessage}
                            message={chatContent.messages[chatContent.id]}
                            isFirst={true}
                        />
                    }
                </div>
            </div>
        </>
    )
}