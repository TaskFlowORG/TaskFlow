'use client'

import React from "react";
import { ChatPage } from "@/components/Chat";

export default function ChatPageConst({ params }: { params: { chatId: number } }) {
    return (
        <div className="w-full h-full ">
            <React.StrictMode>
                <ChatPage chatId={JSON.parse(params.chatId.toString())} />
            </React.StrictMode>
        </div>
    )
}