import React, { useEffect, useState } from "react";
import { User } from "@/models";
import { useTranslation } from "react-i18next";
import { NavItems } from "./components/NavItems/NavItems";
import { IconUser } from "../icons";
import { AnimatePresence, motion } from "framer-motion";
import { IconConfig, IconNotification } from "../icons";

interface Props {
  user: User;
  pageTitle: string;
}

export const SideBarConfig = ({ user, pageTitle }: Props) => {
  const [extendida, setExtendida] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  const { t } = useTranslation();

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
    return () =>
      window.removeEventListener("resize", () =>
        setWindowWidth(window.innerWidth)
      );
  }, []);

  useEffect(() => {
    const sideBar = document.getElementById("sideBar");
    const handleMouseEnter = () => setExtendida(true);
    const handleMouseLeave = () => setExtendida(false);
    if (windowWidth > 1024) {
      if (sideBar) {
        sideBar.addEventListener("mouseenter", handleMouseEnter);
        sideBar.addEventListener("mouseleave", handleMouseLeave);
      }
    } else {
      if (sideBar) {
        sideBar.removeEventListener("mouseenter", handleMouseEnter);
        sideBar.removeEventListener("mouseleave", handleMouseLeave);
      }
    }
  }, [windowWidth]);

  return (
    <div
      id="sideBar"
      className={`bg-primary overflow-hidden dark:bg-modal-grey lg:fixed fixed z-30 
      inset-x-0 bottom-0 lg:h-full h-20 flex text-contrast lg:justify-normal justify-center w-screen  duration-300 ${extendida ? "lg:w-[341px]" : "lg:w-16"
        } `}
    >
      <div className={`flex flex-col items-center w-min dark:text-white `}>
        <span className="flex justify-center items-center h-7 w-full">
          <div
            className={` h-max pt-40 w-full overflow-x-clip justify-center items-center ${extendida ? "flex" : "invisible"
              }`}
          >
            <h3 className={`hidden lg:block font-alata text-h3 whitespace-pre-wrap text-center`}>{pageTitle}</h3>
          </div>
        </span>
        <div className="w-min h-full flex justify-center dark:text-white lg:flex-col items-start gap-8">
          <NavItems
            extendida={extendida}
            href={`/${user.username}/configurations/account`}
            icon={<IconUser sidebar />}
            text={t("personal-informations-side-bar")}
          />
          <NavItems
            extendida={extendida}
            href={`/${user.username}/configurations/general`}
            icon={<IconConfig />}
            text={t("configurations-side-bar")}
          />
          <NavItems
            extendida={extendida}
            href={`/${user.username}/configurations/notifications`}
            icon={<IconNotification />}
            text={t("notifications-side-bar")}
          />
        </div>
      </div>
    </div>
  );
};
