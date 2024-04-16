'use client'

import { Chatt } from "@/components/Chat";

export default function ChatPage({params}:{params:{chatId:number}}){
    
    return (
        <div className="w-full h-full">
           <Chatt chatId ={params.chatId}/>
        </div>
    )
}