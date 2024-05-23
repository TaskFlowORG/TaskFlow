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
import { UserContext } from "@/contexts/UserContext";

type Props = {
  task: Task;
};

export const TaskName = ({ task }: Props) => {
  const { user } = useContext(UserContext);
  const { project, setProject } = useContext(ProjectContext);
  const { pageId } = useContext(PageContext);
  const { setSelectedTask } = useContext(TaskModalContext);
  const [taskName, setTaskName] = useState("");
  const taskNameRef = useRef<any>(null);
  const { t } = useTranslation();
  async function updateNameTask(e: any) {
    if (task.name != e.target.value) {
      // console.log("Atualizei o nome otário")
      task.name = e.target.value;
      setTaskName(e.target.value);
      await taskService.upDate(task as Task, project!.id);
    }
  }

  const style = twMerge(
    " text-p14  font-medium font-montserrat cursor-pointer  ",
    task?.waitingRevision
      ? "text-black dark:text-white"
      : "text-primary dark:text-secondary",
    !task?.completed
      ? !(project?.owner.id == user?.id && task?.waitingRevision) && "underline"
      : "text-emerald-600"
  );

  useEffect(() => {
    if (taskNameRef.current && hasPermission) {
      taskNameRef.current.focus();
    }
  }, [task]);

  const styleImage = twMerge(
    "w-7 aspect-square relative",
    task?.waitingRevision && "animate-pulse",
    !task?.completed && !task?.waitingRevision && "hidden"
  );

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
          disabled={task?.completed ? true : !hasPermission}
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
        <p
          className={style}
          onClick={async () => {
            if (!task?.completed) {
              let taskReturned = await taskService.complete(
                task.id,
                project!.id
              );
              let page = project?.pages.find((page) => pageId == page.id);
              task = taskReturned;
              setSelectedTask!(task);
              if (page) {
                const taskP = page.tasks.find(
                  (taskP) => taskP.task.id == task.id
                );
                if (taskP) {
                  taskP.task = taskReturned;
                }
              }

              setProject!({ ...project! });
            }
          }}
        >
          {task?.completed
            ? t("task-complete")
            : task?.waitingRevision
            ? user?.id == project?.owner.id
              ? t("request-complete-task")
              : t("task-in-review")
            : t("complete-task")}
          {user?.id == project?.owner.id && task?.waitingRevision && (
            <>
              <b className="px-2 underline">Sim</b>
              <b
                className="underline"
                onClick={async (e) => {
                  e.stopPropagation();
                  let taskReturned = await taskService.cancelComplete(
                    task.id,
                    project?.id!
                  );
                  let page = project?.pages.find((page) => pageId == page.id);
                  task = taskReturned;
                  setSelectedTask!(task);
                  if (page) {
                    const taskP = page.tasks.find(
                      (taskP) => taskP.task.id == task.id
                    );
                    if (taskP) {
                      taskP.task = taskReturned;
                    }
                  }

                  setProject!({ ...project! });
                }}
              >
                Não
              </b>
            </>
          )}
        </p>
      </div>
      <div className={styleImage}>
        <Image src="/Assets/completed.svg" alt="Completed" layout="fill" />
      </div>
    </div>
  );
};
