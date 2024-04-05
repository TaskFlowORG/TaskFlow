import React, { useEffect, useState } from 'react';
import { User } from "@/models";
import Link from "next/link";

interface Props {
  user: User;
  pageTitle: string;
}

export const SideBarConfig = ({ user, pageTitle }: Props) => {
  const [extendida, setExtendida] = useState(false);

  useEffect(() => {
    const sideBar = document.getElementById('sideBar');
    const handleMouseEnter = () => setExtendida(true);
    const handleMouseLeave = () => setExtendida(false);

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
    <div className={`absolute z-[1] h-full ${extendida ? "w-[17.5%]" : "w-[6%]"}`}>
      <div id="sideBar" className={`gap-72 h-full overflow-hidden text-contrast bg-primary dark:bg-modal-grey grid ${extendida ? 'w-full' : 'w-20'}`}>
        <div id='pageName' className={`duration-0 flex items-center justify-center pt-28 h-10 w-full ${!extendida ? 'invisible ' : '  visible'}`}>
          <h3 className={` h3 w-[80%] text-center `}>{pageTitle}</h3>
        </div>
        <div className={`px-[24px] h-full flex  ${extendida ? "w-full" : "w-20"}`}>
          <div className="w-full flex justify-center flex-col items-center gap-8">
            <NavItem extendida={extendida} href={`/${user}/configurations/account`} icon="/img/whiteIconUser.svg" text="Informações pessoais" />
            <NavItem extendida={extendida} href={`/${user}/configurations/general`} icon="/img/configuracao.svg" text="Configurações" />
            <NavItem extendida={extendida} href={`/${user}/configurations/notifications`} icon="/img/notificacoes.svg" text="Notificações" />
          </div>
        </div>
        <div className={`px-[24px] h-full flex  ${extendida ? "w-full" : "w-20"}`}>
          <button className="w-full h-12 duration-700 hover:backdrop-brightness-[115%] rounded-xl">
            <div className="flex items-center gap-5 h-full">
              <img className="w-6 h-6" src="/img/sair.svg" alt="" />
              <h4 className={`duration-0 ${!extendida ? 'invisible' : 'h4 visible'}`}>Sair</h4>
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
      <div className="flex items-center gap-5 h-full">
        <img className="w-7 h-8" src={icon} alt="" />
        <h4 className={`duration-0 whitespace-nowrap ${extendida ? 'h4 visible' : 'hidden'}`}>{text}</h4>
      </div>
    </Link>
  </div>
)