import { Task, TaskPage } from "@/models"
import { TaskModalContext } from "@/utils/TaskModalContext";
import { useTranslation } from "next-i18next";
import { useContext } from "react";

interface Props {
    t: TaskPage;
    closeModal: (value:boolean) => void;
}
export const TaskTagCalendar = ({t, closeModal}:Props) => {
  const {t: translate} = useTranslation();
  const {setSelectedTask, setIsOpen} = useContext(TaskModalContext);

  const openTask = () => {
    if(!setIsOpen || !setSelectedTask) return
    closeModal(false)
    setIsOpen(true)
    setSelectedTask(t.task)
  }

    return <div key={t.task.id} onClick={openTask}
    className={"bg-primary dark:bg-secondary box-border text-contrast cursor-pointer hover:brightness-95 w-max h-min p py-2 px-4 rounded-md " + 
    (t.task.completed || t.task.waitingRevision ? " border-green-500 border-4" : "") + (t.task.waitingRevision ? " animation-delay-1000 animate-border-pulser " : "")

    } >
    <span className="w-max h-min whitespace-nowrap " style={{ opacity: t.task.name ? 1 : 0.7 }}>
        {t.task.name ? t.task.name : translate("withoutname")}
    </span>
    </div>
}