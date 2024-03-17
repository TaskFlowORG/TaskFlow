import { If } from "@/components/If";
import { LocalModal } from "@/components/Modal";
import { TaskTrash } from "./TaskTrash";
import { IconDashboard, IconPages, IconTrashBin } from "@/components/icons";
import { Project, Task } from "@/models";
import { taskService } from "@/services";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  user: string;
  project?: Project;
  setModalPages: (value: boolean) => void;
}

export const SideSecondary = ({ user, project, setModalPages }: Props) => {
  const [tasksTrash, setTasksTrash] = useState<Task[]>([]);
  const [modalTrash, setModalTrash] = useState(false);
  useEffect(() => {
    if (!project || !modalTrash) return;
    (async () => {
      const tasks = await taskService.getDeletedTasks(project?.id!);
      setTasksTrash(tasks);
    })();
  }, [modalTrash]);
  return (
    <>
      <Link
        className="w-full h-14  border-b-2 cursor-pointer border-primary-opacity  dark:border-secondary-opacity flex flex-row items-center px-6 hover:brightness-90 bg-white dark:bg-modal-grey"
        href={`${user}/${project?.id}`}
      >
        <div className="w-1/4 h-full flex justify-center items-center">
          <IconDashboard />
        </div>
        <p className="p">Dashboard</p>
      </Link>
      <div
        className="w-full h-14  border-b-2 cursor-pointer border-primary-opacity  dark:border-secondary-opacity flex flex-row items-center px-6 hover:brightness-90 bg-white dark:bg-modal-grey"
        onClick={() => setModalPages(true)}
      >
        <div className="w-1/4 h-full flex justify-center items-center">
          <IconPages />
        </div>
        <p className="p">Páginas</p>
      </div>
      <div
        className="w-full h-min relative flex flex-row items-center bg-white dark:bg-modal-grey"
        onClick={() => setModalTrash(true)}
      >
        <span className="w-full h-14  border-b-2 cursor-pointer relative border-primary-opacity  dark:border-secondary-opacity 
            flex flex-row items-center px-6 hover:brightness-90 bg-white dark:bg-modal-grey">
          <div className="w-1/4 h-full flex justify-center items-center">
            <IconTrashBin />
          </div>
          <p className="p">Lixeira</p>
        </span>
        <LocalModal condition={modalTrash} setCondition={setModalTrash}>
          <If condition={tasksTrash.length == 0}>
            <div className="flex items-center justify-center h-min w-80 text-primary h5 p-4">
              <p className="p flex flex-wrap text-center items-center h-min w-3/4 ">
                Parece que esse projeto não tem tarefas excluídas
              </p>
            </div>
            <span className="">

            <div className="flex overflow-y-auto flex-col gap-4 max-h-44 p-4">
              {tasksTrash.map((task, index) => {
                return (
                  <div key={task.id} className="flex flex-col gap-4 w-80">
                    <TaskTrash task={task} userId={user} />
                    <If condition={index < tasksTrash.length - 1}>
                      <div className="bg-zinc-200 w-3/4 h-1 self-center" />
                    </If>
                  </div>
                );
              })}
            </div>
            </span>
          </If>
        </LocalModal>
      </div>
    </>
  );
};
