"use client"

import { ChatContext } from "@/contexts/ChatsContext";
import { useContext, useEffect } from "react";

export default function ChatPageConst() {
    const { setChat } = useContext(ChatContext);
    useEffect(() => {
        if(!setChat) return;
        setChat(undefined)
    },[setChat])
    return(
        <p>adsasdad</p>
    )
}