import { ProjectContext } from "@/contexts";
import { useHasPermission } from "@/hooks/useHasPermission";
import { Project, Task } from "@/models";
import { taskService } from "@/services";
import { TaskModalContext } from "@/utils/TaskModalContext";
import { PageContext } from "@/utils/pageContext";

import { useContext, useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

type Props = {
  task: Task;
};

export const TaskName = ({ task }: Props) => {
  const { project, setProject } = useContext(ProjectContext);
  const { pageId } = useContext(PageContext);
  const [taskName, setTaskName] = useState("");
  const taskNameRef = useRef<any>(null);
  const { t } = useTranslation();
  async function updateNameTask(e: any) {
    if (task.name != e.target.value ){
      task.name = e.target.value;
      setTaskName(e.target.value);
      await taskService.upDate(task as Task, project!.id);
    }
  }


const style = twMerge(" text-p14  font-medium font-montserrat  ", task?.waitingRevision ? "text-black dark:text-white" : "text-primary dark:text-secondary", !task?.completed ? "underline" : "text-emerald-600")

  useEffect(() => {
    if (taskNameRef.current && hasPermission) {
      taskNameRef.current.focus();
      console.log(`FOQUEI PA CARALHO`);
    }
  }, [task]);

  const styleImage  = twMerge(     "w-7 aspect-square relative"  ,       (task?.waitingRevision && !task.completed
    ? "animate-pulse"
    : ""))

  const hasPermission = useHasPermission("update");
  useEffect(() => {
    setTaskName(task?.name ?? "");
    if (task?.name) {
      let page = project?.pages.find((page) => pageId == page.id);
      if (page) {
        const taskP = page.tasks.find((taskP) => taskP.task.id == task.id);
        if (taskP) {
          taskP.task.name = task.name;
        }
      }

      setProject!({ ...project! });
    }
  }, [task?.name]);

  return (
    <div className="flex gap-4 items-center justify-between">
      <div className="flex flex-col flex-1">
      <input
        className=" text-h4 font-alata xl:text-h3 flex-1 whitespace-nowrap bg-white dark:bg-modal-grey w-full outline-none"
        ref={taskNameRef}
        disabled={!hasPermission}
        placeholder={t("withoutname")}
        value={taskName}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            updateNameTask(e);
          }
        }}
        onChange={(e) => setTaskName(e.target.value)}
        onBlur={(e) => updateNameTask(e)}
      ></input>
      <p className={style} onClick={()=> {
        if (!task?.completed){
          taskService.complete(task.id, project!.id)
        }
      }}>{ task?.completed ? "Tarefa completa!" : (task?.waitingRevision ? "Tarefa em revisão!" : "Completar Tarefa!")}</p>
      </div>
      <div className={styleImage  }>
      <Image src="/Assets/completed.svg" alt="Completed" layout="fill" />
      </div>
    </div>
  );
};
