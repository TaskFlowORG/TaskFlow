'use client'

import { If } from "@/components/If";
import { VisualizedChatOrMessage } from "@/components/icons";
import { UserContext } from "@/contexts/UserContext";
import { Chat, Message, TypeOfChat } from "@/models";
import { chatService } from "@/services";
import { onConnect } from "@/services/webSocket/webSocketHandler";
import { useCallback, useContext, useEffect, useState } from "react";

interface ChatProps {
  key: number
  chat: Chat
  lastMessage: Message
  date: Date
  onChatClick: (chatId: number) => void
}
export const Chats = ({ chat, onChatClick, lastMessage, date }: ChatProps) => {
  const setarChat = () => {
    onChatClick(chat.id);
    chatService.upDateToVisualized(chat.id)
    setChatClicado(chatClicado)
  }


  const [chatClicado, setChatClicado] = useState<number>(chat.id)
  return (
    <>
      <div className="w-full h-32 lg:h-28 bg-white border rounded-xl flex shadow-blur-10 my-3 cursor-pointer duration- hover:bg-modal-grey hover:text-white">
        <div onClick={() => setarChat()}
          className="w-full h-full grid grid-cols-3 duration-0"
          style={{ gridTemplateColumns: "20% 55% 25%" }}>
          <div className="flex items-center pl-2">
            <div className=" col-start-1 col-end-2 w-14 h-14 bg-back-grey rounded-full border-primary border-2">
              <img src="{picture}" alt="" />
            </div>
          </div>
          <div className=" col-start-2 col-end-3 flex flex-col justify-center items-start">
            <div>
              <h5 className="h5">{chat.name}</h5>
            </div>
            <div>
              <p className="p">{lastMessage?.value}</p>
            </div>
          </div>
          <div className=" col-start-3 flex flex-col items-end justify-center px-2">
            <If condition={date != null}>
              <div>
                <h5 className="p">{new Date(date).toLocaleTimeString().slice(0, 5)}</h5>
              </div>
            </If>
            <If condition={chat.quantityUnvisualized != 0}>
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full">
                <p className="p text-white">{chat.quantityUnvisualized}</p>
              </div>
            </If>
            <If condition={chat.quantityUnvisualized == 0}>
              <div>
                <VisualizedChatOrMessage />
              </div>
            </If>

          </div>
        </div>
      </div >
    </>
  );
};
