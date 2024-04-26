'use client'

import { If } from "@/components/If";
import { Chat, Message, TypeOfChat } from "@/models";
import { useEffect, useState } from "react";

interface ChatProps {
  id: number
  name: string
  lastMessage: Message
  onChatClick: (chatId: number) => void
  chatContenteType: TypeOfChat
  type: TypeOfChat
}
export const Chats = ({ id, name, lastMessage, onChatClick, chatContenteType, type}: ChatProps) => {
  //const hour = new Date(lastMessage.dateTime).getHours();
  //const minutes = new Date(lastMessage.dateTime).getMinutes();
  //const total = hour + ":" + minutes;

  const setarChat = () => {
    onChatClick(id);
    setChatClicado(chatClicado)
  }

  const [chatClicado, setChatClicado] = useState<number>(id)
  return (
    <>
      <If condition={chatContenteType == type }>
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
                <h5 className="h5">{name}</h5>
              </div>
              <div>
                <p className="p"></p>
              </div>
            </div>
            <div className=" col-start-3 flex flex-col items-end justify-center px-2">
              <div>
                <h5 className="p"></h5>
              </div>
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full">
                <p className="p text-white">1</p>
              </div>
            </div>
          </div>
        </div >
      </If>
    </>



  );
};
