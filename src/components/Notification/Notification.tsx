import { UserContext } from "@/contexts/UserContext";
import { Notification as NotificationModel } from "@/models/Notification";
import { userService } from "@/services";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { set } from "zod";
import { NotificationIcon, NotificationTitle } from "./components";
import { If } from "../If";
import { TaskModalContext } from "@/utils/TaskModalContext";
import { ProjectContext } from "@/contexts";
import { PageContext } from "@/utils/pageContext";

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
  useEffect(() => {
    if (notification.type != "CHANGETASK") {
      setLink(notification.link);
      return;
    }
    //remove the last "/something" from the link
    const segmentos = notification.link.split("/");
    setIdTask(+segmentos[segmentos.length - 1]);
    segmentos.pop();
    setLink(segmentos.join("/"));
  }, [notification.link]);

  useEffect(() => {
    if (!project) return;
    const page = project.pages.find((p) => p.id == pageId);
    if (!page) return;
    const task = page.tasks.find((t) => t.task.id == idTask);
    if (!setSelectedTask || !task) return;
    setSelectedTask(task.task);
  }, [project]);

  return (
    <Link
      href={link}
      className="flex items-center gap-3 justify-between h-16  w-full pb-2 pt-4"
      onClick={() => {
        setIsOpen && setIsOpen(true);
        fnClick && fnClick();
      }}
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
