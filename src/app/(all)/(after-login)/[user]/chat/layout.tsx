"use client";

import React, { useContext, useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "next-i18next";
import { Chat, ChatGroupPost, ChatPrivatePost } from "@/models";
import { ChatsBar } from "../../../../../components/Chat/components/ChatsBar";
import { ChatDontExists } from "@/components/Chat/components/ChatDontExists";
import { IconPlus } from "@/components/icons/GeneralIcons/IconPlus";
import { IconSearch } from "@/components/icons/OptionsFilter/Search";
import { UserContext } from "@/contexts/UserContext";
import { ChatContext } from "@/contexts/ChatsContext";
import { ProjectsContext } from "@/contexts";
import { LocalModal } from "@/components/Modal";
import { chatService, groupService } from "@/services";
import { onConnect } from "@/services/webSocket/webSocketHandler";
import { If } from "@/components/If";
import { ErrorModal } from "@/components/ErrorModal";
import { useAsyncThrow } from "@/hooks/useAsyncThrow";

export default function ChatMessages({ children }: { children: React.ReactNode }) {
  const route = useRouter();
  const { t } = useTranslation();
  const { user } = useContext(UserContext);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const { projects } = useContext(ProjectsContext);
  const [listaChats, setListaChats] = useState<Chat[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [searchin, setSearching] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [possibleChats, setPossibleChats] = useState<Array<ChatGroupPost | ChatPrivatePost>>([]);
  const [chatContenteType, setChatContentType] = useState<String>("PRIVATE");
  const [creatingChat, setCreatingChat] = useState<boolean>(false);
  const [searchNewChat, setSearchNewChat] = useState<string>("");
  const [filteredChats, setFilteredChats] = useState<Chat[]>([]);
  const [filteredPossibleChats, setFilteredPossibleChats] = useState<Array<ChatGroupPost | ChatPrivatePost>>([]);
  const [chatAberto, setChatAberto] = useState<number>();
  const [chat, setChat] = useState<Chat>();
  const [chatsPrivados, setChatsPrivados] = useState<Chat[]>([]);
  const [chatsGrupos, setChatsGrupos] = useState<Chat[]>([]);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

  const asynThrow = useAsyncThrow();

  useEffect(() => {
    async function buscarChats() {
      const response = await chatService.findAllGroup().catch(asynThrow);
      const response2 = await chatService.findAllPrivate().catch(asynThrow);
      if (response && response2) setChats([...response, ...response2]), setChatsPrivados(response2), setChatsGrupos(response);
    }
    buscarChats();
  }, [user]);

  useEffect(() => {
    (async () => {
      if (!user || !projects) return;
      const alreadyExistsGroups = await chatService.findAllGroup().catch(asynThrow);
      const myGrous = await groupService.findGroupsByUser().catch(asynThrow);
      if (!myGrous || !alreadyExistsGroups) return;
      const possibleGroups = myGrous.filter(
        (g) => !alreadyExistsGroups.find((ag) => ag.group.id === g.id)
      );
      const possibleChatsGroups = possibleGroups.map(
        (g) => new ChatGroupPost(g)
      );
      const alreadyExistsPrivates = await chatService.findAllPrivate().catch(asynThrow);
      if (!alreadyExistsPrivates) return;
      let myCoparticipants = projects.map((p) => p.owner);
      const groups = await groupService.findGroupsByUser().catch(asynThrow);
      if (!groups) return;
      for (let group of groups) {
        const g = await groupService.findOne(group.id).catch(asynThrow);
        if (!g) return;
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
    const connect = onConnect(`/chats/${user.id}`, (chatRes) => {
      const chatTemp: Chat = JSON.parse(chatRes.body);
      const list = [...listaChats];
      const oldChat = list.find((c) => c.id == chatTemp.id);
      if (!oldChat) return;
      if (chat && chat.id == chatTemp.id) {
        const qtty = oldChat.quantityUnvisualized;
        chatTemp.quantityUnvisualized = qtty + 1;
      } else {
        chatTemp.quantityUnvisualized = 0;
      }
      list.splice(list.indexOf(oldChat), 1);
      const newList = [chatTemp, ...list];
      setListaChats(newList);
    });
    return () => {
      connect.disconnect();
    };
  }, [user, chats, listaChats]);

  useEffect(() => {
    setListaChats(chats);
  }, [chats])

  const handleChatClick = (chatId: number) => {
    setChatAberto(chatId)
    route.replace(`/${user?.username}/chat/${chatId}`);
  };

  const postChat = async (chat: ChatGroupPost | ChatPrivatePost) => {
    let chatPost;
    if (chat instanceof ChatGroupPost) {
      chatPost = await chatService.saveGroup(chat).catch(e => setError(true));
    } else {
      chatPost = await chatService.savePrivate(chat, chat.users[0].id).catch(e => setError(true));
    }
    if (!chatPost) return;
    setPossibleChats(possibleChats.filter((c) => c != chat));
    setCreatingChat(false);
    setFilteredChats([...filteredChats, chatPost]);
  };

  const [error, setError] = useState<boolean>(false);

  return (
    <>
      <ChatContext.Provider value={{ chat, setChat }}>
        <div className="w-full h-[80vh] lg:h-[89vh] configs flex mt-20 lg:px-14 gap-4 lg:gap-14 flex-col lg:justify-center lg:flex-row">
          <div className={`w-full lg:w-[40%] lg:h-full justify-center`}>
            <div className="flex flex-col items-center w-full lg:h-full gap-4">
              <div className="flex items-center lg:w-full w-[90%] justify-between bg-input-grey dark:bg-back-grey h-full lg:h-[10%]  rounded-lg shadow-blur-10 ">
                <div className="flex items-center w-30 px-6 lg:h-full h-20">
                  <h3 className="text-h3 font-alata">{t("chat")}</h3>
                </div>
                <span className="flex w-full gap-2 lg:gap-0">
                  <div className={`flex justify-center duration-200 w-full`}>
                    <div className={"flex items-center justify-center w-10 h-10 bg-primary dark:bg-secondary rounded-l-lg"}>
                      <div>
                        <IconSearch classes="text-contrast" />
                      </div>
                    </div>
                    <div className="w-[80%]">
                      <input
                        placeholder={t("search-chat")}
                        onChange={(e) => setSearch(e.target.value)}
                        className="rounded-r-lg  w-full h-full text-constrast font-montserrat shadow-blur-10 outline-none px-4 text-p"
                        type="text"
                      />
                    </div>
                  </div>
                  <span className="relative justify-center duration-200 w-20">
                    <button className="w-10 h-10 bg-primary rounded-full dark:bg-secondary p-2 rotate-45 relative" onClick={() => setCreatingChat(!creatingChat)}>
                      <IconPlus classes="w-full h-full text-contrast" />
                    </button>
                    <LocalModal condition={creatingChat} setCondition={setCreatingChat} right={windowWidth < 1024}>
                      <div className="h-min max-h-72 rounded-md w-72 bg-white p-4 dark:bg-modal-grey flex flex-col gap-2">
                        <>
                          <div className="flex justify-center duration-200 w-full">
                            <div className="flex items-center justify-center w-10 h-10 bg-primary dark:bg-secondary rounded-l-lg">
                              <div>
                                <IconSearch classes="text-contrast" />
                              </div>
                            </div>
                            <div className="w-[85%]">
                              <input type="text" onChange={(e) => setSearchNewChat(e.target.value)}
                                className="px-4 font-montserrat w-full h-10 shadow-blur-10 rounded-r-md" placeholder={t("search-chat")} />

                            </div>
                          </div>
                          <If condition={filteredPossibleChats.length == 0}>
                            <p className="w-full font-alata text-center h-full">
                              {t("no-possible-chats-create")}
                            </p>
                          </If>
                          <div className="w-full h-full flex flex-col gap-1">
                            {filteredPossibleChats.map((chat, index) => (
                              <div onClick={() => (postChat(chat))} className="w-full cursor-pointer h-10 font-alata shadow-blur-10 rounded-md flex justify-center items-center" key={index}>
                                {chat.getName() || t("withoutname")}
                              </div>
                            ))}
                          </div>
                        </>
                      </div>
                    </LocalModal>
                  </span>
                </span>
              </div>
              <div className="w-full flex justify-around  ">
                <div onClick={() => setChatContentType("PRIVATE")} className=" cursor-pointer link-underline link-underline-black">
                  <h5 className="text-h5 font-alata ">{t("profiles")}</h5>
                </div>
                <div onClick={() => setChatContentType("GROUP")} className=" cursor-pointer link-underline link-underline-black">
                  <h5 className="text-h5 font-alata">{t("groups")}</h5>
                </div>
              </div>
              <div className={`w-full flex h-[72.5vh] lg:h-[73.5vh] lg:overflow-y-scroll overflow-auto`}>
                <div className="w-full h-full flex  flex-col items-center ">
                  {chatContenteType == "GROUP" && chatsGrupos.length == 0 || chatContenteType == "PRIVATE" && chatsPrivados.length == 0 ? (
                    <div className="h-full flex justify-center items-center">
                      <ChatDontExists />
                    </div>
                  ) : (
                    filteredChats.map((chat) => (
                      <>
                        <If condition={chatContenteType == chat.type.toString()}>
                          <ChatsBar key={chat.id} chat={chat} lastMessage={chat.lastMessage} date={chat.lastMessage?.dateCreate} onChatClick={handleChatClick} />
                        </If>
                      </>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
          {children}
        </div>
        <ErrorModal condition={error} fnOk={() => setError(false)} message={t("error-create-chat")} title={t("error-create-chat-title")} setCondition={setError} />
      </ChatContext.Provider>
    </>
  )
}