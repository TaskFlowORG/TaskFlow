import React, { useEffect, useState } from "react";
import { User } from "@/models";
import { useTranslation } from "react-i18next";
import { NavItems } from "./components/NavItems/NavItems";

interface Props {
  user: User;
  pageTitle: string;
}

export const SideBarConfig = ({ user, pageTitle }: Props) => {
  const [extendida, setExtendida] = useState(false);

  const { t } = useTranslation();

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
    <div id="sideBar"
      className={`bg-primary overflow-hidden dark:bg-modal-grey lg:absolute fixed z-[0] inset-x-0 bottom-0 lg:h-full h-20 flex text-contrast lg:justify-normal justify-center w-full ${extendida ? "lg:w-[21rem]" : "lg:w-20"}`}>
      <div className={`flex flex-col duration-300 `}>
        <div className={`duration-0 h-20 pt-32 w-full hidden lg:flex justify-center items-center ${extendida ? "lg:visible" : "lg:invisible "}`}>
          <h3 className={`h3 w-[80%] text-center`}>{pageTitle}</h3>
        </div>
        <div className="w-full h-full flex justify-center lg:flex-col items-center gap-8">
          <NavItems
            extendida={extendida}
            href={`/${user.username}/configurations/account`}
            icon="/img/whiteIconUser.svg"
            text={t("personal-informations-side-bar")}
          />
          <NavItems
            extendida={extendida}
            href={`/${user.username}/configurations/general`}
            icon="/img/configuracao.svg"
            text={t("configurations-side-bar")}
          />
          <NavItems
            extendida={extendida}
            href={`/${user.username}/configurations/notifications`}
            icon="/img/notificacoes.svg"
            text={t("notifications-side-bar")}
          />
        </div>
      </div>
    </div>
  );
};