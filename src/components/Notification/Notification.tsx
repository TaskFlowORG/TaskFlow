import { UserContext } from "@/contexts/UserContext";
import { Notification as NotificationModel } from "@/models/Notification";
import { userService } from "@/services";
import Link from "next/link";
import {  MouseEventHandler, useContext, useEffect, useState } from "react";
import { set } from "zod";
import { NotificationIcon, NotificationTitle } from "./components";
import { If } from "../If";
import { TaskModalContext } from "@/utils/TaskModalContext";
import { ProjectContext } from "@/contexts";
import { PageContext } from "@/utils/pageContext";
import { useTranslation } from "next-i18next";
import { TypeOfChat } from "@/models";
import { TypeOfNotification } from "@/models/enums/TypeOfNotification";
import { Button } from "../Button";
import { IconTrashBin } from "../icons";
import { IconSave } from "../icons/Slidebarprojects/IconSave";
import { notificationService } from "@/services/services/NotificationService";
import {useRouter} from "next/navigation";

export const Notification = ({
  notification,
  fnClick,
}: {
  notification: NotificationModel;
  fnClick?: () => void;
}) => {
  const [link, setLink] = useState<string>("");
  const { user, setUser } = useContext(UserContext);
  const { setIsOpen, setSelectedTask } = useContext(TaskModalContext);
  const { pageId } = useContext(PageContext);
  const { project } = useContext(ProjectContext);
  const [idTask, setIdTask] = useState<number>();
  const router = useRouter();
  useEffect(() => {
      setLink(notification.link);
      if(notification.type == TypeOfNotification.CHANGETASK || notification.type == TypeOfNotification.COMMENT){
        setIdTask(notification.objId);
      }
  }, [notification.link]);

  useEffect(() => {
    if (!project) return;
    const page = project.pages.find((p) => p.id == pageId);
    if (!page) return;
    const task = page.tasks.find((t) => t.task.id == idTask);
    if (!setSelectedTask || !task) return;
    setSelectedTask(task.task);
  }, [project]);

  const { t } = useTranslation();
  const getMessage = (notification: NotificationModel) => {
    switch (notification.type) {
      case TypeOfNotification.CHANGETASK:
        return t("notification-task", {aux:notification.aux});
      case TypeOfNotification.CHAT:
        return t("notification-chat", {aux:notification.aux});
      case TypeOfNotification.ADDINGROUP:
        return t("notification-add-group", {aux:notification.aux});
        case TypeOfNotification.REMOVEINGROUP:
          return t("notification-rmv-group", {aux:notification.aux});
      case TypeOfNotification.CHANGEPERMISSION:
        return t("notification-permission", {aux:notification.aux});
      case TypeOfNotification.COMMENT:
        return t("notification-comment", {aux:notification.aux});
      case TypeOfNotification.DEADLINE:
        return t("notification-deadline", {aux:notification.aux});
      case TypeOfNotification.POINTS:
        return t("notification-points", {aux:notification.aux});
      case TypeOfNotification.SCHEDULE:
        return t("notification-schedule", {aux:notification.aux});}
  };

  const clickNotification = async () => {
    if (!setUser || !user) return;
    const updated = await notificationService.clickNotification(notification.id);
    user.notifications = user.notifications.map((n) => {
      if(n.id == notification.id){
        n.clicked = true;
      }
      return n;
    });
    setUser({...user});
  };

  const handleClick = async () => {
    clickNotification();
    fnClick && fnClick();
    router.push(link);
    if(notification.type == TypeOfNotification.CHANGETASK || notification.type == TypeOfNotification.COMMENT){
      setIsOpen && setIsOpen(true);
      const task = (project?.pages.flatMap((p) => p.tasks).find((t) => t.task.id == idTask)?.task);
      setSelectedTask && task && setSelectedTask(task);
    }
  }

  const deleteNotification = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (!setUser || !user) return;
    user.notifications = user.notifications.filter((n) => n.id != notification.id);
    setUser({...user});
    await notificationService.deleteNotification(notification.id);
  };

  return (
    <div
      className="flex items-center gap-3 justify-between h-16  w-full pb-2 pt-4"
      onMouseUp={handleClick}
    >
      <div className="w-4 h-full flex items-center">
        <NotificationIcon type={notification.type} />
      </div>
      <div className="w-full flex justify-center flex-col items-start">
        <span className="text-primary text-[12px] font-alata dark:text-secondary [&_*]:text-start [&_*]:w-full">
          <NotificationTitle type={notification.type} />
        </span>
        <p className="font-montserrat text-[10px] w-full text-start whitespace-pre-wrap">
          {getMessage(notification)}
        </p>
      </div>
      <If condition={notification.type == TypeOfNotification.ADDINGROUP}>
      <button onClick={clickNotification} className="bg-primary dark:bg-secondary p-[0.65rem] h-8 aspect-square rounded-md stroke-contrast"><IconSave classes="text-contrast"/></button>
      </If>
      <button onMouseUp={deleteNotification} className="bg-primary dark:bg-secondary p-[0.65rem] h-8 aspect-square rounded-md stroke-contrast"><IconTrashBin/></button>
      <If condition={!notification.visualized}>
        <div className="h-full flex items-center">
          <div className="w-2 h-2 bg-secondary dark:bg-primary rounded-full" />
        </div>
      </If>
    </div>
  );
};
