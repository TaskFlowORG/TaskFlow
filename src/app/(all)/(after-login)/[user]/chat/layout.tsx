"use client";

import { Chat, ChatGroupPost, ChatPrivatePost } from "@/models";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { Chats } from "../../../../../components/Chat/components/Chats";
import { ChatDontExists } from "@/components/Chat/components/ChatDontExists";
import { chatService, groupService } from "@/services";
import { IconPlus } from "@/components/icons/GeneralIcons/IconPlus";
import { UserContext } from "@/contexts/UserContext";
import { ProjectsContext } from "@/contexts";
import { LocalModal } from "@/components/Modal";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/navigation";
import { onConnect } from "@/services/webSocket/webSocketHandler";
import { IconSearch } from "@/components/icons/OptionsFilter/Search";

export default function ChatMessages({
  children,
}: {
  children: React.ReactNode;
  params: { chatId: string };
}) {

  const route = useRouter();
  const [listaChats, setListaChats] = useState<Chat[]>([]);
  const [searchin, setSearching] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [possibleChats, setPossibleChats] = useState<Array<ChatGroupPost | ChatPrivatePost>>([]);
  const [chatContenteType, setChatContentType] = useState<String>("PRIVATE")
  const { projects } = useContext(ProjectsContext);
  const { user } = useContext(UserContext);
  const [creatingChat, setCreatingChat] = useState<boolean>(false);
  const [searchNewChat, setSearchNewChat] = useState<string>("");
  const { t } = useTranslation();
  const [filteredChats, setFilteredChats] = useState<Chat[]>([]);
  const [filteredPossibleChats, setFilteredPossibleChats] = useState<Array<ChatGroupPost | ChatPrivatePost>>([]);

  const handleChatClick = (chatId: number) => {
    route.replace(`/${user?.username}/chat/${chatId}`);
  };

  useEffect(() => {
    async function buscarChats() {
      const response = await chatService.findAllGroup();
      const response2 = await chatService.findAllPrivate();
      setListaChats([...response, ...response2]);
    }
    buscarChats();
  }, [user]);

  useEffect(() => {
    (async () => {
      if (!user || !projects) return;
      const alreadyExistsGroups = await chatService.findAllGroup();
      const myGrous = await groupService.findGroupsByUser();
      const possibleGroups = myGrous.filter(
        (g) => !alreadyExistsGroups.find((ag) => ag.group.id === g.id)
      );
      const possibleChatsGroups = possibleGroups.map(
        (g) => new ChatGroupPost(g)
      );
      const alreadyExistsPrivates = await chatService.findAllPrivate();
      let myCoparticipants = projects.map((p) => p.owner);
      const groups = await groupService.findGroupsByUser();
      for (let group of groups) {
        const g = await groupService.findOne(group.id);
        myCoparticipants = [...myCoparticipants, g.owner, ...g.users];
      }
      myCoparticipants = myCoparticipants
        .filter((u) => u.id !== user.id)
        .filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i);
      const possiblePrivates = myCoparticipants.filter(
        (u) => !alreadyExistsPrivates.find((ap) => ap.users[0].id == u.id || ap.users[1].id == u.id)
      );
      const possibleChatsPrivates = possiblePrivates.map(
        (u) => new ChatPrivatePost([u])
      );
      setPossibleChats([...possibleChatsGroups, ...possibleChatsPrivates]);
    })();
  }, [search]);


  const postChat = async (chat: ChatGroupPost | ChatPrivatePost) => {
    if (chat instanceof ChatGroupPost) {
      await chatService.saveGroup(chat);
    } else {
      await chatService.savePrivate(chat, chat.users[0].id);
    }
    setCreatingChat(false);
  };

  useEffect(() => {
    setFilteredChats(
      listaChats.filter((c) =>
        c.name.toUpperCase().includes(search.toUpperCase())
      )
    );
  }, [search, listaChats]);

  useEffect(() => {
    setFilteredPossibleChats(
      possibleChats.filter((c) =>
        c.getName().toUpperCase().includes(searchNewChat.toUpperCase())
      )
    );
  }, [searchNewChat, possibleChats]);

  useEffect(() => {
    if (!user) return;
    const connect = onConnect(`/chats/${user.id}`, (chat) => {
      const chatTemp: Chat = JSON.parse(chat.body);
      const list = [...listaChats]
      const oldChat = list.find((c) => c.id == chatTemp.id
      );
      if (!oldChat) return
      const index = list.indexOf(oldChat);
      list[index].quantityUnvisualized++;
      list[index].lastMessage = chatTemp.lastMessage;
      setListaChats(list);
    });
    return () => {
      connect.disconnect();
    };
  }, [user, listaChats]);


  return (
    <>
      <div className="w-full h-[80vh] lg:h-[89vh]  flex mt-20 lg:px-14 gap-4 lg:gap-14 flex-col lg:justify-center lg:flex-row">
        <div className={`w-full lg:w-[40%]  lg:h-full justify-center`}>
          <div className="flex flex-col items-center w-full lg:h-full gap-4">
            <div className="flex items-center w-full justify-between bg-input-grey h-full lg:h-[10%] rounded-lg shadow-blur-10">
              <div className="w-30 px-4 ">
                <h3 className="h3">Chats</h3>
              </div>
              <span className="flex w-full justify-end">
                <div className={`flex justify-center duration-200  ${searchin ? "w-full" : "w-20"}`}>
                  <div onClick={() => setSearching(!searchin)}
                    className={`flex-row-reverse cursor-pointer flex items-center justify-center w-10 h-10 bg-primary ${!searchin ? "rounded-full" : "rounded-l-lg"}`}>
                    <div>
                      <IconSearch classes="text-contrast" />
                    </div>
                  </div>
                  <div className={`w-[80%]  ${searchin ? "visible" : "hidden"}`}>
                    <input
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full h-full bg-primary  rounded-r-lg text-white outline-none px-4"
                      type="text"
                    />
                  </div>
                </div>
                <span className="relative justify-center duration-200  w-20">
                  <button
                    className="w-10 h-10 bg-primary rounded-full dark:bg-secondary p-2 rotate-45 relative"
                    onClick={() => setCreatingChat(!creatingChat)}
                  >
                    <IconPlus classes="w-full h-full text-contrast" />
                  </button>
                  <LocalModal
                    condition={creatingChat}
                    setCondition={setCreatingChat}
                  >
                    <div className="h-min max-h-72 rounded-md w-52 bg-white p-4 dark:bg-modal-grey flex flex-col gap-2">
                      {filteredPossibleChats.length == 0 ? (
                        <p className="w-full font-alata text-center h-full">
                          {t("no-possible-chats")}
                        </p>
                      ) : (
                        <>
                          <input
                            type="text"
                            placeholder={t("search-chat")}
                            className="w-full h-10 shadow-blur-10 rounded-md"
                            onChange={(e) => setSearchNewChat(e.target.value)}
                          />
                          <div className="w-full h-full flex flex-col gap-1">
                            {filteredPossibleChats
                              .map((chat, index) => (
                                <div
                                  onClick={() => postChat(chat)}
                                  className="w-full cursor-pointer h-10 shadow-blur-10 rounded-md"
                                  key={index}
                                >
                                  {chat.getName()}
                                </div>
                              ))}
                          </div>
                        </>
                      )}
                    </div>
                  </LocalModal>
                </span>
              </span>
            </div>
            <div className="w-full flex justify-around ">
              <div onClick={() => setChatContentType("PRIVATE")} className=" cursor-pointer link link-underline link-underline-black">
                <h5 className="h5 text-black">Perfis</h5>
              </div>
              <div onClick={() => setChatContentType("GROUP")} className=" cursor-pointer link link-underline link-underline-black">
                <h5 className="h5 text-black">Grupos</h5>
              </div>
            </div>

            <div
              className={`w-full flex h-[72.5vh] lg:h-[73vh] overflow-y-scroll `}
            >
              <div className="w-full">
                {filteredChats.length == 0 ? (
                  <ChatDontExists />
                )
                  :
                  filteredChats.map((chat, key) => (

                    (chat.type.toString() == chatContenteType ?
                      <Chats
                        key={chat.id}
                        chat={chat}
                        lastMessage={chat.lastMessage}
                        date={chat.lastMessage?.dateCreate}
                        onChatClick={handleChatClick}
                      /> : (filteredChats.length == 0 ? <ChatDontExists /> : null))
                  ))}

              </div>
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
}