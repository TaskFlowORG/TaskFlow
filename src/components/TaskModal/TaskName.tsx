import { ProjectContext } from "@/contexts";
import { useHasPermission } from "@/hooks/useHasPermission";
import { Project, Task } from "@/models";
import { taskService } from "@/services";
import { PageContext } from "@/utils/pageContext";

import { useContext, useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  task: Task | Project;
};

export const TaskName = ({ task }: Props) => {
  const { project, setProject } = useContext(ProjectContext);
  const { pageId } = useContext(PageContext);
  const [taskName, setTaskName] = useState("");
  const taskNameRef = useRef<any>(null);
  const { t } = useTranslation();
  async function updateNameTask(e: any) {
    if (task.name != e.target.value){
      task.name = e.target.value;
      setTaskName(e.target.value);
      await taskService.upDate(task as Task, project!.id);
    }
  }

  useEffect(() => {
    if (taskNameRef.current && hasPermission) {
      taskNameRef.current.focus();
      console.log(`FOQUEI PA CARALHO`);
    }
  }, [task]);

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
    <div className="flex gap-4 items-center">
      <input
        className=" text-h4 font-alata xl:text-h3 whitespace-nowrap bg-white dark:bg-modal-grey w-full outline-none"
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
    </div>
  );
};
