import { UserContext } from "@/contexts/UserContext";
import { Notification as NotificationModel } from "@/models/Notification";
import { projectService, userService } from "@/services";
import Link from "next/link";
import {  useContext, useEffect, useState } from "react";
import { NotificationIcon, NotificationTitle } from "./components";
import { If } from "../If";
import { TaskModalContext } from "@/utils/TaskModalContext";
import { ProjectContext } from "@/contexts";
import { PageContext } from "@/utils/pageContext";
import { useTranslation } from "next-i18next";
import { TypeOfNotification } from "@/models/enums/TypeOfNotification";
import { IconTrashBin } from "../icons";
import { IconSave } from "../icons/Slidebarprojects/IconSave";
import { notificationService } from "@/services/services/NotificationService";
import {useRouter} from "next/navigation";

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
  const [message, setMessage] = useState<string>("");
  const { pageId } = useContext(PageContext);
  const { project } = useContext(ProjectContext);
  const [idTask, setIdTask] = useState<number>();
  const router = useRouter();
  useEffect(() => {
      setLink(notification.link);
      if(notification.type == TypeOfNotification.CHANGETASK || notification.type == TypeOfNotification.COMMENTS){
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
        return t("notification-task", {aux:notification.aux ? notification.aux : t("withoutname")});
      case TypeOfNotification.CHAT:
        return t("notification-chat", {aux:notification.aux ? notification.aux : t("withoutname")});
      case TypeOfNotification.ADDINGROUP:
        return t("notification-add-group", {aux:notification.aux ? notification.aux : t("withoutname")});
        case TypeOfNotification.REMOVEINGROUP:
          return t("notification-rmv-group", {aux:notification.aux ? notification.aux : t("withoutname")});
      case TypeOfNotification.CHANGEPERMISSION:
        return t("notification-permission", {aux:notification.aux ? notification.aux : t("withoutname")});
      case TypeOfNotification.COMMENTS:
        return t("notification-comment", {aux:notification.aux ? notification.aux : t("withoutname")});
      case TypeOfNotification.DEADLINE:
        return t("notification-deadline", {aux:notification.aux ? notification.aux : t("withoutname")});
      case TypeOfNotification.POINTS:
        return t("notification-points", {aux:notification.aux ? notification.aux : t("withoutname")});
      case TypeOfNotification.SCHEDULE:
        return t("notification-schedule", {aux:notification.aux ? notification.aux : t("withoutname")});
      case TypeOfNotification.INVITETOPROJECT:
        return t("notification-invite", {aux:notification.aux ? notification.aux : t("withoutname")})};
  };

  const clickNotification = async (e:any) => {
    e.stopPropagation()
    if (!setUser || !user) return;

     await notificationService.clickNotification(notification.id).catch((e) => {
        if(e.response.status == 409){
          setError(true);
          setMessageError("Esse convite já foi aceito por você, provavelmente quem o convidou mandou mais de um convite, caso ainda haja algum convite repetido do mesmo usuário, por favor, delete-o.");
          setTitleError("Convite já aceito");
        }
    });
    if(!user.notifications) return;
    user.notifications.splice(user.notifications.findIndex((n) => n.id == notification.id), 1);
    setUser({...user});
  };

  const handleClick = async (e:any) => {
    if(notification.type != TypeOfNotification.ADDINGROUP && notification.type != TypeOfNotification.INVITETOPROJECT){
      clickNotification(e);
    }
    if(notification.auxObjId == null && link) {
      router.push(link);
      return;
    }

    fnClick && fnClick();

    if(link) router.push(link);
    if([TypeOfNotification.COMMENTS, TypeOfNotification.CHANGETASK, TypeOfNotification.DEADLINE, TypeOfNotification.SCHEDULE].includes(notification.type)){
      const projectTemp = await projectService.findOne(1);
      setIsOpen && setIsOpen(true);
      const task = (projectTemp?.pages.flatMap((p) => p.tasks).find((t) => t.task.id == notification.objId)?.task);
      console.log("TASK", task);
      setSelectedTask && task && setSelectedTask(task);
    }
  }

  const deleteNotification = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (!setUser || !user) return;
    await notificationService.deleteNotification(notification.id);
    user.notifications = user.notifications.filter((n) => n.id != notification.id);
    setUser({...user});
  };

  useEffect(() => {
    const message = getMessage(notification);
    console.log("nOT", notification);
    
    setMessage(message);
  }, [notification]);

  return (
    <div
      className="flex items-center gap-3 justify-between min-h-16 h-min  w-full max-w-70 pb-2 pt-4"
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
          {message}
        </p>
      </div>
      <span className="w-min h-full flex flex-col gap-1 justify-between">

      <If condition={notification.type == TypeOfNotification.ADDINGROUP || notification.type == TypeOfNotification.INVITETOPROJECT}>
      <span onMouseDown={clickNotification} className="bg-primary dark:bg-secondary p-[0.65rem] h-8 aspect-square rounded-md stroke-contrast"><IconSave classes="text-contrast"/></span>
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
