'use client'

import { Chatt } from "@/components/Chat";
import React from "react";

export default function ChatPage({params}:{params:{chatId:number}}){
    return (
        
        <div className="w-full h-full">
            <React.StrictMode>
           <Chatt chatId ={JSON.parse(params.chatId.toString())}/>
            </React.StrictMode>
        </div>
    )
}