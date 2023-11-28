
export const SideBarConfig = () => {
    return (
        <>

            <div className="text-[#FCFCFC] bg-primary  w-[23%] h-screen grid" style={{gridAutoRows:'20% 40% 38%'}}>
                <div className="flex flex-col items-center justify-center h-full row-start-1 row-end-2 ">
                    <h3 className="h3 ">Perfil de usuário</h3>
                </div>
                <div className="w-full  h-full row-start-2 row-end-3 flex flex-col justify-center ">
                <div className="w-full flex px-4 flex-col items-center gap-8">
                    <a href="http://localhost:3000/1/user-config/personal-informations"  className="w-full h-12 duration-700 hover:bg-[#ffffff3f] rounded-xl ">
                        <div className="flex  items-center gap-5  px-3 h-full">
                            <img className="w-8 h-8" src="/img/usuario.svg" alt="" />
                            <h4 className="h4 ">Informações Pessoais</h4>
                        </div>
                    </a>
                    <a href="http://localhost:3000/1/user-config/general-config" className="w-full h-12 duration-700 hover:bg-[#ffffff3f] rounded-xl">
                        <div className="flex  items-center gap-5 h-full px-3">
                            <img className="w-8 h-8" src="/img/configuracao.svg" alt="" />
                            <h4 className="h4">Configurações</h4>
                        </div>
                    </a>
                    <a href="http://localhost:3000/1/user-config/notification-config" className="w-full h-12 duration-700 hover:bg-[#ffffff3f] rounded-xl">
                        <div className="flex  items-center gap-5 h-full  px-3">
                            <img className="w-8 h-8" src="/img/notificacoes.svg" alt="" />
                            <h4 className="h4">Notificações</h4>
                        </div>
                    </a>
                </div>
                </div>
                <div className="w-full flex px-4 flex-col items-center row-start-3 justify-end ">
                    <button className="w-full h-12 duration-700 hover:bg-[#ffffff3f] rounded-xl">
                        <div className="flex  items-center gap-5  px-3 h-full ">
                            <img className="w-8 h-8" src="/img/sair.svg" alt="" />
                            <h4 className="h4">Logout</h4>
                        </div>
                    </button>
                </div>
            </div>

        </>
    )
}