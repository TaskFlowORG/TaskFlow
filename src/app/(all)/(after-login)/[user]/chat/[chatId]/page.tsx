'use client'

import React from "react";
import { ChatPage } from "@/components/Chat";

export default function ChatPageConst({ params }: { params: { chatId: number } }) {
    return (
        <div className={`w-full lg:h-full justify-center" ${params.chatId != 0 ? "absolute lg:relative" : ""}`}>
            <React.StrictMode>
                <ChatPage chatId={JSON.parse(params.chatId.toString())} />
            </React.StrictMode>
        </div>
    )
}