"use client";

import { useEffect, useState } from "react";

export const SideBarConfig = () => {
  const [invisible, setInvisble] = useState(true);
  useEffect(() => {
    mostrarSidebar();
  });

  const mostrarSidebar = () => {
    if (window.innerWidth <= 768) {
      setInvisble(true);
      // console.log(window.innerWidth)
    }
  };
  return (
    <>
      <div
        className={`text-contrast bg-primary  md:w-[23%] h-screen md:grid ${invisible ? "hidden" : "visible"
          }`}
        style={{ gridAutoRows: "25% 43% 30%" }}
      >
        <div className="flex flex-col items-center justify-center h-full row-start-1 row-end-2 ">
          <h3 className="h3 ">Perfil de usuário</h3>
        </div>
        <div className="w-full  h-full row-start-2 row-end-3 flex flex-col justify-center ">
          <div className="w-full flex px-4 flex-col items-center gap-8">
            {/* Mudar a rota dinamica posteriormente(ou alterar o meio para enviar para outra pagina) */}

            <a
              href="http://localhost:3000/1/user-config/personal-informations"
              className="w-full h-12 duration-700 hover:backdrop-brightness-[115%] rounded-xl "
            >
              <div className="flex  items-center gap-5  px-3 h-full">
                <img className="w-8 h-8" src="/img/usuario.svg" alt="" />
                <h4 className="h4 ">Informações Pessoais</h4>
              </div>
            </a>
            {/* Mudar a rota dinamica posteriormente(ou alterar o meio para enviar para outra pagina) */}
            <a
              href="http://localhost:3000/1/user-config/general-config"
              className="w-full h-12 duration-700 hover:backdrop-brightness-[115%] rounded-xl"
            >
              <div className="flex  items-center gap-5 h-full px-3">
                <img className="w-8 h-8" src="/img/configuracao.svg" alt="" />
                <h4 className="h4">Configurações</h4>
              </div>
            </a>
            {/* Mudar a rota dinamica posteriormente(ou alterar o meio para enviar para outra pagina) */}
            <a
              href="http://localhost:3000/1/user-config/notification-config"
              className="w-full h-12 duration-700 hover:backdrop-brightness-[115%] rounded-xl"
            >
              <div className="flex  items-center gap-5 h-full  px-3">
                <img className="w-8 h-8" src="/img/notificacoes.svg" alt="" />
                <h4 className="h4">Notificações</h4>
              </div>
            </a>
          </div>
        </div>
        <div className="w-full flex px-4 flex-col items-center row-start-3 justify-end ">
          <button className="w-full h-12 duration-700 hover:bg-white-selected rounded-xl">
            <div className="flex  items-center gap-5  px-3 h-full ">
              <img className="w-8 h-8" src="/img/sair.svg" alt="" />
              <h4 className="h4">Logout</h4>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};
