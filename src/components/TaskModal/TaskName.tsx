import { ProjectContext } from "@/contexts";
import { Task } from "@/models";
import { taskService } from "@/services";
import { PageContext } from "@/utils/pageContext";

import { useContext, useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

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
    task.name = e.target.value;
    setTaskName(e.target.value);
    await taskService.upDate(task, project!.id);
  }

  useEffect(() => {
    if (taskNameRef.current) {
      taskNameRef.current.focus();
      console.log(`FOQUEI PA CARALHO`);
    }
  }, [task]);

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
        placeholder={t("withoutname")}
        value={taskName}
        onChange={(e) => updateNameTask(e)}
      ></input>
    </div>
  );
};
