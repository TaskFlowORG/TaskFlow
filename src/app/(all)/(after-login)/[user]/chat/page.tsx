"use client"

import { ChatContext } from "@/contexts/ChatsContext";
import { useContext, useEffect } from "react";
import { useTranslation } from "next-i18next";

export default function ChatPageConst() {
    const { setChat } = useContext(ChatContext);
    const { t } = useTranslation();

    useEffect(() => {
        if (!setChat) return;
        setChat(undefined)
    }, [setChat])


    return (
        <>
            <div className="lg:flex flex-col justify-center items-center w-full h-full gap-10 hidden">
                <div className="flex justify-center text-p font-alata text-constrast">
                    <p>{t("no-chat-opened")}</p>
                </div >
            </div>
        </>
    )
}