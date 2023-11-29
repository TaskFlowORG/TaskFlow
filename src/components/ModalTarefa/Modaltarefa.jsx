'use client'

export const ModalTarefa = () => {



    return (
        <>
            <div className="w-[1306px] h-[800px] bg-white flex justify-center items-center rounded-sm">
                <div className="w-[1206px] h-[689px] grid grid-cols-2">
                    <div className="w-full h-full">
                        <input type="text" className=" w-full h-16 h3 text-modal-grey border-none  outline-none focus:shadow-blur-10 p-2 rounded-md" placeholder="Nome da Tarefa" />
                        <div className="w-[421px] h-[272px]">

                        </div>
                        <div className="w-[421px] h-[226px]"></div>
                    </div>

                    <div className="w-full h-full">
                        <div className="w-full h-16">
                            <div className="w-16 h-full shadow-blur-10 rounded-md flex justify-center items-center">
                                <img src="./Assets/pages/modalTarefas/icon.svg" alt="" />
                            </div>

                        </div>
                        <div className="w-full h-[150px]"></div>
                        <div className="w-full h-[107px]"></div>
                        <div className="w-full h-16"></div>
                        <div className="w-full h-16"></div>
                        <div className="w-full h-16"></div>
                        <div className="w-full h-16"></div>
                    </div>

                </div>
            </div>
        </>
    )
}