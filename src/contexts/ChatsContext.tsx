"use client"
import { Chat} from "@/models";
import { createContext} from "react";

type ChatContext = {
    chat?: Chat;
    setChat?: (chat?: Chat) => void;
}
// eslint-disable-next-line react-hooks/rules-of-hooks
export const ChatContext = createContext<ChatContext>({});

