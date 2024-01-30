'use client'

import { ChatGetDTO } from "@/model/chat/ChatGetDTO";
import { useEffect,useState } from "react";

export const Chats = ({
  id,
  name,
  messages,
  picture,
  quantitityUnvisualized,
  lastMessage,
}: ChatGetDTO) => {
  const hour = new Date(lastMessage.dateTime).getHours();
  const minutes = new Date(lastMessage.dateTime).getMinutes();
  const total = hour + ":" + minutes;
  const [chatClicado] = useState<number>(id);

  return (
    <div className="w-full h-32 lg:h-28 bg-white border rounded flex shadow-blur-10 my-1 cursor-pointer hover:bg-modal-grey ">
      <div
        className="w-full h-full grid grid-cols-3 hover:text-white "
        style={{ gridTemplateColumns: "20% 55% 25%" }}
      >
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
            <p className="p">{lastMessage.value}</p>
          </div>
        </div>
        <div className=" col-start-3 flex flex-col items-end justify-center px-2">
          <div>
            <h5 className="p">{total}</h5>
          </div>
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full">
            <p className="p text-white">{quantitityUnvisualized.toString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
