export const SideBarConfig = () => {
    return (
        <>

            <div className="text-[#FCFCFC] bg-[#F04A94]  w-1/5 h-screen">
                <div className="flex flex-col items-center">
                    <h3 className="h3 pt-20 ">Perfil de usuário</h3>
                </div>
                <div className="flex pt-24 pl-4 flex-col gap-14">
                    <div className="w-72 h-12 duration-700 hover:bg-[#ffffff3f] rounded-xl">
                        <div className="flex  items-center gap-5">
                            <img className="w-8 h-8" src="/img/usuario.svg" alt="" />
                            <h4 className="h4">Informações Pessoais</h4>
                        </div>
                    </div>
                    <div className="w-72 h-12 duration-700 hover:bg-[#ffffff3f] rounded-xl">
                        <div className="flex  items-center gap-5">
                            <img className="w-8 h-8" src="/img/configuracao.svg" alt="" />
                            <h4 className="h4">Notificações</h4>
                        </div>
                    </div>
                    <div className="w-72 h-12 duration-700 hover:bg-[#ffffff3f] rounded-xl">
                        <div className="flex  items-center gap-5">
                            <img className="w-8 h-8" src="/img/notificacoes.svg" alt="" />
                            <h4 className="h4">Configurações</h4>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}