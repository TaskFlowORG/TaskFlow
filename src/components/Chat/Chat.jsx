import { Chats } from "./components/Chats"
import { ChatContent } from "./components/ChatContent"

export const Chat = () => {
    return (
        <>
            <div className="flex mt-10">
                <div className="w-full grid justify-center grid-cols-2 gap-10 overflow-hidden" style={{ gridTemplateColumns: " 25% 50%" }}>
                    <div className="">
                        <div className="flex flex-col col-1">
                            <div className="flex items-center justify-center gap-[65%] bg-input-grey h-20 rounded-lg">
                                <h3 className="h3">Chats</h3>
                                <div>
                                    <div className="flex items-center justify-center w-10 h-10 bg-[url('/img/notificacao.svg')]">
                                        <img src="/searchIcons/search.svg" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="grid pt-10 grid-cols-2 " style={{ gridTemplateColumns: "25% 33%" }}>
                                <div className="flex gap-8 ">
                                    <div className="col-start-1 pr-10  link link-underline link-underline-black">
                                        <h5 className="h5 text-black">Perfis</h5>
                                    </div>

                                    <div className="col-start-2 pr-10 ml link link-underline link-underline-black">
                                        <h5 className="h5 text-black">Grupos</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex h-[73vh]  overflow-scroll">
                                <div className="w-full">
                                    <Chats></Chats>
                                    <Chats></Chats>
                                    <Chats></Chats>
                                    <Chats></Chats>
                                    <Chats></Chats>
                                    <Chats></Chats>
                                    <Chats></Chats>
                                    <Chats></Chats>
                                    <Chats></Chats>
                                    <Chats></Chats>
                                    <Chats></Chats>
                                    <Chats></Chats>
                                </div>
                            </div>
                        </div>
                    </div>
                        <div className="w-full">
                            <ChatContent></ChatContent>
                        </div>
                </div>
            </div>
        </>
    )
}