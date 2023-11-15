export const UserConfig = () => {
    return (
        <>
            <div className=" flex  pt-40 justify-center w-full">
                <div className="flex h-48 gap-10">
                    <div className="h-full">
                        <div id="fotoDeUsuario" className=" relative rounded-full bg-slate-500 w-[12rem] h-[12rem]">
                            <img className="rounded-full" src="https://as2.ftcdn.net/v2/jpg/01/35/08/59/1000_F_135085967_K8tvXYKca02oD8X0zDkbl3V9N9Sonemy.jpg" alt="" />
                            <button>
                                <div className=" border-[#F76858] border-[2px] rounded-full bg-white w-[3rem] h-[3rem] absolute -right-1 bottom-3">
                                    <img className="rounded-full" src="/img/imagem.svg" alt="" />
                                </div>
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col h-full justify-center gap-4">
                        <div>
                            <h2 className="h2">[nome de usuario]</h2>
                        </div>
                        <div className="flex items-center gap-2">
                            <p className="p">[localizacao]</p>
                            <button>
                                <div>
                                    <img src="/img/editar.svg" alt="" />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}