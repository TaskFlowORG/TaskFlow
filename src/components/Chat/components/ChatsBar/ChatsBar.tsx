'use client'

import { If } from "@/components/If";
import { ImagemEnviada, Visualized } from "@/components/icons";
import { UserContext } from "@/contexts/UserContext";
import { Chat, Message } from "@/models";
import { chatService } from "@/services";
import { useContext, useEffect, useState } from "react";
import Image from 'next/image'
import { archiveToSrc } from "@/functions";

interface ChatProps {
  key: number
  chat: Chat
  lastMessage: Message
  date: Date
  onChatClick: (chatId: number) => void
}
export const ChatsBar = ({ chat, onChatClick, lastMessage, date }: ChatProps) => {

  const [quantityUnvisualized, setQuantityUnvisualized] = useState<number>(chat.quantityUnvisualized)
  const [chatClicado, setChatClicado] = useState<number>()
  const [photoUrl, setPhotoUrl] = useState<string>(chat ? archiveToSrc(chat.picture) : "");
  const { user } = useContext(UserContext);

  const setarChat = () => {
    onChatClick(chat.id);
    chatService.upDateToVisualized(chat.id)
    setQuantityUnvisualized(0)
    setChatClicado(chat.id)
  }

  useEffect(() => {
    if (chatClicado == chat.id) return
    setQuantityUnvisualized(chat.quantityUnvisualized)
  }, [chat])

  useEffect(() => {
    setPhotoUrl(archiveToSrc(chat?.picture));
  }, [chat]);

  return (
    <>
      <div className={`lg:w-[96%] w-[90%] h-28 rounded-md flex shadow-blur-10 my-3 cursor-pointer `} >
        <div onClick={() => setarChat()} className="w-full h-28 grid grid-cols-3 duration-0" style={{ gridTemplateColumns: "20% 55% 25%" }}>
          <div className="flex items-center pl-2">
            <div className="relative col-start-1 col-end-2 w-14 h-14 bg-back-grey rounded-full border-primary dark:border-secondary border-2">
              <Image fill className="rounded-full w-full h-full" src={photoUrl} alt="foto" />
            </div>
          </div>
          <div className=" col-start-2 col-end-3 flex flex-col justify-center items-start">
            <div>
              <h5 className="h5">{chat.name}</h5>
            </div>

            {/* Verificações usuario logado */}

            <If condition={user?.username == lastMessage?.sender.username}>

              {/* Arquivo com foto */}

              <If condition={lastMessage?.value != "" && lastMessage?.annex != null}>
                <div className="flex flex-col items-start ">
                  <p className="text-p font-montserrat truncate w-72 ">Você : {lastMessage?.value}</p>
                  <div className="flex items-center w-16 justify-between">
                    <ImagemEnviada></ImagemEnviada>
                    <div>
                      <p className="text-p font-montserrat">Foto</p>
                    </div>
                  </div>
                </div>
              </If>
            </If>

            {/* Arquivo sem texto */}

            <If condition={user?.username == lastMessage?.sender.username}>
              <If condition={lastMessage?.value == "" && lastMessage?.annex != null}>
                <div className="flex items-center w-16 justify-between">
                  <ImagemEnviada></ImagemEnviada>
                  <div>
                    <p className="text-p font-montserrat">Foto</p>
                  </div>
                </div>
              </If>
            </If>

            {/* Texto sem arquivo */}

            <If condition={user?.username == lastMessage?.sender.username}>
              <If condition={lastMessage?.value != "" && lastMessage?.annex == null}>
                <div className="flex flex-col items-start">
                  <p className="text-p font-montserrat truncate w-72">Você : {lastMessage?.value}</p>
                </div>
              </If>
            </If>

            {/* Verificações usuario que recebe as mensagens */}

            <If condition={user?.username != lastMessage?.sender.username}>

              {/* Arquivo com foto */}

              <If condition={lastMessage?.value != "" && lastMessage?.annex != null}>
                <div className="flex flex-col items-start">
                  <p className="text-p font-montserrat truncate w-72">{lastMessage?.sender.name}  : {lastMessage?.value}</p>
                  <div className="flex items-center w-16 justify-between">
                    <ImagemEnviada></ImagemEnviada>
                    <div>
                      <p className="text-p font-montserrat">Foto</p>
                    </div>
                  </div>
                </div>
              </If>
            </If>

            {/* Arquivo sem texto */}

            <If condition={user?.username != lastMessage?.sender.username}>
              <If condition={lastMessage?.value == "" && lastMessage?.annex != null}>
                <div className="flex items-center w-16 justify-between">
                  <ImagemEnviada></ImagemEnviada>
                  <div>
                    <p className="text-p font-montserrat">Foto</p>
                  </div>
                </div>
              </If>
            </If>

            {/* Texto sem arquivo */}

            <If condition={user?.username != lastMessage?.sender.username}>
              <If condition={lastMessage?.value != "" && lastMessage?.annex == null && lastMessage?.sender != null}>
                <div className="flex flex-col items-start">
                  <p className="text-p font-montserrat truncate w-72">{lastMessage?.sender.name} : {lastMessage?.value}</p>
                </div>
              </If>
            </If>

            <If condition={lastMessage?.sender == null}>
              <div>
                <p className="text-p font-montserrat">Tudo quieto por aqui 😢</p>
              </div>
            </If>
          </div>
          <div className=" col-start-3 flex flex-col items-end justify-center px-2">
            <If condition={date != null}>
              <div>
                <h5 className="text-p font-montserrat">{new Date(date).toLocaleTimeString().slice(0, 5)}</h5>
              </div>
            </If>
            <If condition={quantityUnvisualized > 0}>
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full">
                <p className="text-p font-montserrat text-white">{quantityUnvisualized}</p>
              </div>
            </If>
            <If condition={quantityUnvisualized == 0}>
              <div>
                <Visualized />
              </div>
            </If>
          </div>
        </div>
      </div >
    </>
  );
};