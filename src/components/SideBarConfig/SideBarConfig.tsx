import React, { useEffect, useState } from "react";
import { User } from "@/models";
import Link from "next/link";

interface Props {
  user: User;
  pageTitle: string;
}

export const SideBarConfig = ({ user, pageTitle }: Props) => {
  const [extendida, setExtendida] = useState(false);

  useEffect(() => {
    const sideBar = document.getElementById("sideBar");
    const handleMouseEnter = () => setExtendida(true);
    const handleMouseLeave = () => setExtendida(false);

    if (sideBar) {
      sideBar.addEventListener("mouseenter", handleMouseEnter);
      sideBar.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (sideBar) {
        sideBar.removeEventListener("mouseenter", handleMouseEnter);
        sideBar.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div
      id="sideBar"
      className={`bg-primary overflow-hidden dark:bg-modal-grey lg:absolute fixed z-[1] inset-x-0 bottom-0 lg:h-full h-20 flex text-contrast lg:justify-normal justify-center w-full ${
        extendida ? "lg:w-[21rem]" : "lg:w-20"
      }`}
    >
      <div className={`flex flex-col duration-300 `}>
        <div
          className={`duration-0 h-20 pt-32 w-full hidden lg:flex justify-center items-center ${
            extendida ? "lg:visible" : "lg:invisible "
          }`}
        >
          <h3 className={`h3 w-[80%] text-center`}>{pageTitle}</h3>
        </div>
        <div className="w-full h-full flex justify-center lg:flex-col items-center gap-8">
          <NavItem
            extendida={extendida}
            href={`/${user.username}/configurations/account`}
            icon="/img/whiteIconUser.svg"
            text="Informações pessoais"
          />
          <NavItem
            extendida={extendida}
            href={`/${user.username}/configurations/general`}
            icon="/img/configuracao.svg"
            text="Configurações"
          />
          <NavItem
            extendida={extendida}
            href={`/${user.username}/configurations/notifications`}
            icon="/img/notificacoes.svg"
            text="Notificações"
          />
        </div>
      </div>
    </div>
  );
};

const NavItem = ({
  extendida,
  href,
  icon,
  text,
}: {
  extendida: boolean;
  href: string;
  icon: string;
  text: string;
}) => (
  <div
    className={`w-full h-12 duration-700 hover:backdrop-brightness-[115%] rounded-xl`}
  >
    <Link href={href}>
      <div className="flex items-center gap-5 h-full px-6">
        <img className="w-7 h-8" src={icon} alt="" />
        <h4
          className={`duration-0 whitespace-nowrap ${
            extendida ? "h4 lg:block hidden" : "hidden"
          }`}
        >
          {text}
        </h4>
      </div>
    </Link>
  </div>
);
