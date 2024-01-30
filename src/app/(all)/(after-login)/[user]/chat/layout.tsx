'use client'

import React from "react"
import { useState } from "react"
import { Chats } from "../../../../../components/Chat/components/Chats"
import { getListChat} from "../../../../../services/http/api";
export default function RootLayout({children }: { children: React.ReactNode }) {

    const [listaChats, setListaChats] = useState<any>();

    setListaChats = getListChat("private", 1);

    

    return (

        <>

            <div className="w-full h-[80vh] lg:h-[89vh]  flex mt-20 lg:px-14 gap-4 lg:gap-14 flex-col lg:justify-center lg:flex-row">
                <div className={`w-full lg:w-[40%]  lg:h-full justify-center`}>
                    <div className="flex flex-col items-center lg:items-start w-full lg:h-full gap-4">
                        <div className="flex items-center w-full justify-center gap-[40%] lg:gap-[65%] bg-input-grey h-full lg:h-[10%] rounded-lg shadow-blur-10">
                            <div>
                                <h3 className="h3">Chats</h3>
                            </div>
                            <div>
                                <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-full">
                                    <img className=" rounded-full" src="/searchIcons/search.svg" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex justify-around ">
                            <div className="link link-underline link-underline-black">
                                <h5 className="h5 text-black">Perfis</h5>
                            </div>
                            <div className="link link-underline link-underline-black">
                                <h5 className="h5 text-black">Grupos</h5>
                            </div>
                        </div>
                        <div className={`w-full flex h-[72.5vh] lg:h-[73vh] overflow-scroll`}>
                            <div className="w-full">
                                {list.map((chat) => (
                                    <Chats key={chat.id} id={chat.id} name={chat.name} messages={chat.messages} picture={chat.picture} quantitityUnvisualized={chat.quantitityUnvisualized} lastMessage={chat.lastMessage} />
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
