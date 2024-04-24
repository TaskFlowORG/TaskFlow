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
import { ErrorModal } from "../ErrorModal";

export const Notification = ({
  notification,
  fnClick,
  setError, 
  setMessageError,
  setTitleError
}: {
  notification: NotificationModel;
  fnClick?: () => void;
  setError: (value: boolean) => void;
  setMessageError: (value: string) => void;
  setTitleError: (value: string) => void;

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
        return t("notification-schedule", {aux:notification.aux});
      case TypeOfNotification.INVITETOPROJECT:
        return t("notification-invite", {aux:notification.aux})};
  };

  const clickNotification = async () => {
    if (!setUser || !user) return;

     await notificationService.clickNotification(notification.id).catch((e) => {
        if(e.response.status == 409){
          console.log("ALOU")
          setError(true);
          setMessageError("Esse convite já foi aceito por você, provavelmente quem o convidou mandou mais de um convite, caso ainda haja algum convite repetido do mesmo usuário, por favor, delete-o.");
          setTitleError("Convite já aceito");
        }
    });
    user.notifications = user.notifications.filter((n) => n.id != notification.id);
    setUser({...user});
  };

  const handleClick = async () => {
    clickNotification();
    fnClick && fnClick();
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
      className="flex items-center gap-3 justify-between min-h-16 h-min  w-full pb-2 pt-4"
      onMouseUp={handleClick}
    >
      <div className="w-1/12 h-full flex items-center">
        <NotificationIcon type={notification.type} />
      </div>
      <div className="w-11/12 flex justify-center flex-col items-start">
        <span className="text-primary text-[14px] font-alata dark:text-secondary [&_*]:text-start [&_*]:w-full">
          <NotificationTitle type={notification.type} />
        </span>
        <p className="font-montserrat text-[12px] w-full text-start whitespace-pre-wrap" title={getMessage(notification)}>
          {getMessage(notification)}
        </p>
      </div>
      <span className="w-min h-full flex flex-col gap-1 justify-between">

      <If condition={notification.type == TypeOfNotification.ADDINGROUP || notification.type == TypeOfNotification.INVITETOPROJECT}>
      <button onClick={clickNotification} className="bg-primary dark:bg-secondary p-[0.65rem] h-8 aspect-square rounded-md stroke-contrast"><IconSave classes="text-contrast"/></button>
      </If>
      <button onMouseUp={deleteNotification} className="bg-primary dark:bg-secondary p-[0.65rem] h-8 aspect-square rounded-md stroke-contrast"><IconTrashBin/></button>
      </span>
      <If condition={!notification.visualized}>
        <div className="h-full flex items-center">
          <div className="w-2 h-2 bg-secondary dark:bg-primary rounded-full" />
        </div>
      </If>
    </div>
  );
};
