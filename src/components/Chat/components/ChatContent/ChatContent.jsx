import { TextContent } from "../TextContent"
export const ChatContent = () => {
    return (
        <>

            <div className="w-full h-full ">
                <div className="flex bg-input-grey w-full h-[10%] rounded-lg items-center justify-around shadow-blur-10">
                    <div className="flex bg-primary rounded-full w-[5%] h-14 mx-5">

                    </div>
                    <div className="w-[80%] mx-5">
                        <h3 className="p lg:h4">Fabrício Stefano</h3>
                    </div>
                    <div className="w-[20%] flex items-center px-14 justify-end ">
                        <div className="mx-2">
                            <img src="/img/Status.svg" alt="" />
                        </div>
                        <div className="mx-2">
                            <p className="p">online</p>
                        </div>
                    </div>
                </div>
                <div className="h-[80%] w-full">
                    a
                </div>
                <div className="flex w-full h-[10%] gap-3">
                    <div className="w-[90%] bg-input-grey flex items-center px-5 shadow-blur-10 rounded-lg">
                        <div className="w-[88%]">
                            <input className="p w-full bg-transparent outline-none" type="text" placeholder="Digite aqui..." />
                        </div>
                        <button className="flex justify-center items-center w-[6%]">
                            <img className="" src="/img/audio.svg" alt="" />
                        </button>
                        <button className="flex justify-center items-center w-[6%]">
                            <img className="" src="/img/arquivo.svg" alt="" />
                        </button>
                    </div>
                    <button className="bg-primary w-[7%] rounded-lg flex justify-center items-center">
                        <img className="" src="/img/enviar.svg" alt="" />
                    </button>
                </div>

            </div>

        </>
    )
}   