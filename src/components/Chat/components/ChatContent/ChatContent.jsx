export const ChatContent = () => {
    return (
        <>

            <div className="w-full h-full grid grid-rows-3" style={{ gridTemplateRows: "20% 60% 20%" }}>
                <div className=" row-start-1 row-end-2 bg-input-grey h-20 rounded-lg grid  grid-cols-2">
                    <div className=" px-4 flex items-center">
                        <div className=" col-start-1  flex items-center justify-center w-10 h-10 bg-[url('/img/notificacao.svg')]">
                            <img src="" alt="" />
                        </div>
                        <div className="px-4">
                            <h4 className="h4">Fernando Pessoa</h4>
                        </div>
                    </div>
                    <div className="col-start-2 px-4 flex items-center justify-end">
                        <div className="flex gap-4 px-6">
                            <img src="/img/Status.svg" alt="" />
                            <p className="p">online</p>
                        </div>
                    </div>
                </div>
                <div className="row-start-2 h-96 ">
                    <div>
                        <p>tem q progredir mais pra fazer o sistema de mensagens</p>
                    </div>
                </div>
                <div className="flex  row-start-3 w-full h-4/6  gap-6 ">
                    <div className="bg-input-grey w-full  flex rounded-xl shadow-blur-10">
                        <input type="text" placeholder="Digite aqui..." className="p p-5 outline-none col-start-1 bg-input-grey w-full rounded-2xl" />
                        <div className="flex justify-end items-center w-1/6 gap-3 px-5">
                            <button>
                                <img className="  w-10 h-10" src="/img/audio.svg" alt="" />
                            </button>

                            <button>
                                <img className="w-10 h-10" src="/img/arquivo.svg" alt="" />
                            </button>
                        </div>
                    </div>
                    <div className="  bg-input-grey w-[7%] rounded-2xl bg-primary flex justify-center items-center">
                        <img className="w-10 h-10" src="/img/enviar.svg" alt="" />
                    </div>
                </div>
            </div>

        </>
    )
}