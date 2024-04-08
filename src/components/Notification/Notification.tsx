import { UserContext } from "@/contexts/UserContext";
import { Notification as NotificationModel } from "@/models/Notification";
import { userService } from "@/services";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { set } from "zod";
import { NotificationIcon, NotificationTitle } from "./components";
import { If } from "../If";

export const Notification = ({

  notification,
  fnClick,
}: {
  notification: NotificationModel;
    fnClick?: () => void;
}) => {
  const [link, setLink] = useState<string>("");
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    if (notification.type != "CHANGETASK") {
      setLink(notification.link);
      return;
    }
    //remove the last "/something" from the link
    const segmentos = notification.link.split("/");
    segmentos.pop();
    setLink(segmentos.join("/"));
  }, [notification.link]);

  return (
    <Link
      href={link}
      className="flex items-center gap-3 justify-between h-16  w-full pb-2 pt-4"
      onClick={fnClick}
    >
      <div className="w-4 h-full flex items-center">
        <NotificationIcon type={notification.type} />
      </div>
      <div className="w-full flex justify-center flex-col items-start">
        <span className="text-primary text-[12px] font-alata dark:text-secondary [&_*]:text-start [&_*]:w-full">
          <NotificationTitle type={notification.type} />
        </span>
        <p className="font-montserrat text-[10px] w-full text-start whitespace-pre-wrap">
          {notification.message}
        </p>
      </div>
      <If condition={!notification.visualized}>
        <div className="h-full flex items-center">
          <div className="w-2 h-2 bg-secondary dark:bg-primary rounded-full" />
        </div>
      </If>
    </Link>
  );
};
