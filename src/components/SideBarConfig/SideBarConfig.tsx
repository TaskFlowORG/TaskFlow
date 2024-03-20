"use client";

// Adicione importações necessárias no início do arquivo

import React from 'react';
import { User } from "@/models";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  user: User;
}

export const SideBarConfig = ({ user }: Props) => {
  const [extendida, setExtendida] = useState(false);

  useEffect(() => {
    const sideBar = document.getElementById('sideBar');
    const handleMouseEnter = () => {
      setExtendida(true);
    };

    const handleMouseLeave = () => {
      setExtendida(false);
    };

    if (sideBar) {
      sideBar.addEventListener('mouseenter', handleMouseEnter);
      sideBar.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (sideBar) {
        sideBar.removeEventListener('mouseenter', handleMouseEnter);
        sideBar.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div className={`absolute z-[1]  h-full ${extendida ? "w-[16%]" : "w-[6%]"}`}>
      <div id="sideBar" className={` gap-72 h-full overflow-hidden text-contrast bg-primary grid ${extendida ? 'w-[100%]' : 'w-20'}`}>
        <div className="flex justify-center h-10  row-start-1 row-end-2 pt-20   ">
          <h3 className={`h3 whitespace-nowrap ${!extendida ? 'invisible' : 'visible'}`}>Perfil de usuário</h3>
        </div>
        <div className="w-full  h-full row-start-2 row-end-3 flex flex-col justify-center ">
          <div className="w-full flex px-2.5 flex-col items-center gap-8">
            <NavItem extendida={extendida} href={`/${user}/configurations/account`} icon="/img/whiteIconUser.svg" text="Minha conta" />
            <NavItem extendida={extendida} href={`/${user}/configurations/general`} icon="/img/configuracao.svg" text="Configurações" />
            <NavItem extendida={extendida} href={`/${user}/configurations/notifications`} icon="/img/notificacoes.svg" text="Notificações" />
          </div>
        </div>
        <div className="w-full flex px-4 flex-col items-center row-start-3">
          <button className="w-full h-12 duration-700 hover:bg-white-selected rounded-xl">
            <div className="flex  items-center gap-5  px-3 h-full ">
              <img className="w-6 h-6" src="/img/sair.svg" alt="" />
              <h4 className={`duration-0 ${!extendida ? 'invisible' : 'h4 visible'}`}>Logout</h4>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

const NavItem = ({ extendida, href, icon, text }: { extendida: boolean; href: string; icon: string; text: string }) => (
  <div className={`w-full h-12 duration-700 hover:backdrop-brightness-[115%] rounded-xl`}>
    <Link href={href}>
      <div className="flex  items-center gap-5  px-3 h-full">
        <img className="w-7 h-8" src={icon} alt="" />
        <h4 className={`duration-0 whitespace-nowrap ${!extendida ? 'invisible' : 'h4 visible}'}`}>{text}</h4>
      </div>
    </Link>
  </div>
)