'use client'

import { If } from "@/components/If";
import { Archive, Chat, Message } from "@/models";
import { useEffect,useState } from "react";

interface Props{
  id: number;
  name: string;
  messages: Message[];
  picture: Archive;
  quantityUnvisualized: number;
  lastMessage?: Message;
}

export const Chats = ({id, name, messages, picture, quantityUnvisualized, lastMessage}: Props) => {
  const hour = new Date(lastMessage?.dateCreate ?? new Date()).getHours();
  const minutes = new Date(lastMessage?.dateCreate ?? new Date()).getMinutes();
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
          <If condition={lastMessage!=undefined}>
            <div>
              <p className="p">{lastMessage?.value}</p>
            </div>
          </If>
        </div>
        <div className=" col-start-3 flex flex-col items-end justify-center px-2">
        <If condition={lastMessage!=undefined}>
          <span>
          <div>
            <h5 className="p">{total}</h5>
          </div>

          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full">
            <p className="p text-white">1</p>
          </div>
          </span>
          </If>

        </div>
      </div>
    </div>
  );
};
