"use client"
import { Chat} from "@/models";
import { createContext} from "react";

type ChatsContext = {
    chats?: Chat[];
    setChats?: (chats: Chat[]) => void;
}
// eslint-disable-next-line react-hooks/rules-of-hooks
export const ChatsContext = createContext<ChatsContext>({});

