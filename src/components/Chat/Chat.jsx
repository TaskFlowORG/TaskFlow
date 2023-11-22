export const Chat = () => {
    return (
        <>
            <div className="pt-5 grid grid-cols-2 " style={{ gridTemplateColumns: "30% 70%" }}>
                <div className="flex justify-center">
                    <div className="">
                        <div className="flex items-center justify-around bg-input-grey w-80 rounded-lg">
                            <h3 className="h3">Chats</h3>
                            <div className="flex items-center justify-center w-10 h-10 bg-[url('/img/notificacao.svg')]">
                                <img className="w-4 h-4" src="/searchIcons/search.svg" alt="" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-10" style={{ gridTemplateColumns: "30% 30%" }}>
                            <div className="col-start-1">
                                <p className="h5">Perfis</p>
                            </div>
                            <div className="col-start-2">
                                <p className="h5">Grupos</p>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className="col-start-2">
                    <p>1</p>
                </div>
            </div>
        </>
    )
}