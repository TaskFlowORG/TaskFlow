import { UserContext } from "@/contexts/UserContext";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { LocalModal } from "../Modal";
import { Notification as NotificationModel } from "@/models/Notification";
import { Notification } from "../Notification";
import { log } from "console";
import { userService } from "@/services";
import { IconSwitcherTheme } from "../icons/GeneralIcons/IconSwitcherTheme";
import { SelectWithImage } from "../SelectWithImage/SelectwithImage";
import { languageToString } from "@/functions/selectLanguage";
import { Language } from "@/models";
import { IconArchive } from "../icons";
import Image from "next/image";
export const Header = ({
  setSidebarOpen,
}: {
  setSidebarOpen: (value: boolean) => void;
}) => {
  const { theme, setTheme } = useTheme();
  const { user, setUser } = useContext(UserContext);
  const [showNotification, setShowNotification] = useState(false);
  const [thereAreNotifications, setThereAreNotifications] = useState(false);
  const [notifications, setNotifications] = useState<NotificationModel[]>([]);
  const [lang, setLang] = useState<string>(languageToString(user?.configuration.language ?? Language.PORTUGUESE));
  



  useEffect(() => {
    if (!user?.notifications) return;
    setThereAreNotifications(
      user?.notifications.find((notification) => !notification.visualized)
        ? true
        : false
    );
    setNotifications(user?.notifications);
    if(!user) {
      setLang(navigator.language)
    }else{
      setLang(languageToString(user.configuration.language));
    }
  }, [user]);

  const changeLanguage = async  (value: string) => {
    if (!setUser || !user) return;
    user.configuration.language = Language[value.toUpperCase() as keyof typeof Language];
    const updatedUser = await userService.patch(user)
    setUser(updatedUser);
    console.log(value);
  }

  const closeModal = () => {
    setShowNotification(false);
    (async () => {
      if (!setUser) return;
      const updated = await userService.visualizeNotifications();
      setUser(updated);
    })();
  };

  return (
    <div className="h-14 w-full fixed z-[1] bg-white shadow-md flex items-center dark:bg-modal-grey justify-between px-6">
      <img
        src="/Icon.svg"
        alt=""
        className="w-12 select-none h-12 cursor-pointer dark:grayscale dark:brightness-[60]"
        onClick={() => setSidebarOpen(true)}
      />

      <div className=" w-1/4 h-full flex space-x-[48px] items-center justify-end">
        <img
          src="/Assets/themeLight/notification.svg"
          alt=""
          className=" select-none dark:invert  cursor-pointer h-5 w-5"
        />

        <div className="w-10 h-min  " >

        <SelectWithImage onChange={changeLanguage} selected={user?.configuration.language ?? Language.PORTUGUESE} 
        list={[{ value:Language.PORTUGUESE, image:<Image  alt="Portuguese" width={24} height={12} src="/img/flags/brazil.jpg" className="select-none rounded-sm" />}, 
        { value:Language.ENGLISH, image:<Image  alt="English" width={24} height={12} src="/img/flags/eua.jpg" className="select-none rounded-sm" />}, 
        { value:Language.SPANISH, image:<Image  alt="Spanish" width={24} height={12} src="/img/flags/spain.jpg" className="select-none rounded-sm" />}]} />


        </div>
        <IconSwitcherTheme />
        <div className="w-min h-min relative">
          <Link href={`/${user?.username}/configurations/account`}>
            <svg
              width="26"
              height="29"
              viewBox="0 0 26 29"
              className=" text-primary dark:text-white cursor-pointer "
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Profile">
                <path
                  id="Vector"
                  d="M10 16.7487C15.4233 16.7487 20 17.6299 20 21.03C20 24.4312 15.3933 25.2812 10 25.2812C4.57797 25.2812 0 24.4 0 21C0 17.5987 4.60673 16.7487 10 16.7487ZM10 0.28125C13.6739 0.28125 16.6175 3.22378 16.6175 6.89507C16.6175 10.5664 13.6739 13.5101 10 13.5101C6.32737 13.5101 3.38252 10.5664 3.38252 6.89507C3.38252 3.22378 6.32737 0.28125 10 0.28125Z"
                  fill=""
                />
              </g>
            </svg>
          </Link>
          <div className="absolute bottom-0 right-0">
            {notifications.length > 0 && (
              <div
                className={
                  `cursor-pointer border-2 border-white dark:border-modal-grey w-4 h-4 
         rounded-full ` +
                  (thereAreNotifications
                    ? " bg-secondary dark:bg-primary "
                    : " bg-secondary-opacity dark:bg-primary-opacity ")
                }
                onClick={() => setShowNotification(true)}
              ></div>
            )}
            <LocalModal
              condition={showNotification}
              setCondition={closeModal}
              right
            >
              <div className="h-min max-h-48 bg-white none-scrollbar dark:bg-modal-grey rounded-sm flex flex-col overflow-y-auto w-72">
                {notifications.map((notification, index) => {
                  return (
                    <span
                      key={index}
                      className="w-full flex flex-col justify-between  gap-2 px-4 items-center bg-white dark:bg-modal-grey hover:brightness-95 "
                    >
                      <Notification
                        notification={notification}
                        fnClick={closeModal}
                      />
                      {index < notifications.length - 1 ? (
                        <div className="w-[90%] bg-primary h-px" />
                      ) : (
                        <div className="w-[90%] bg-transparent h-px" />
                      )}
                    </span>
                  );
                })}
              </div>
            </LocalModal>
          </div>
        </div>
      </div>
    </div>
  );
};
