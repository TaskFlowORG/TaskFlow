"use client"

import { ChatContext } from "@/contexts/ChatsContext";
import { useContext, useEffect } from "react";

export default function ChatPageConst() {
    const { setChat } = useContext(ChatContext);

    useEffect(() => {
        if (!setChat) return;
        setChat(undefined)
    }, [setChat])

    return (
        <>
            <div className="flex flex-col justify-center items-center w-full h-full gap-10">
                <div className="flex justify-center text-p font-alata text-constrast">
                    <p>Inicie um chat com alguém para trocar mensagens!</p>
                </div >
            </div >
        </>
    )
}