import { If } from "@/components/If";
import { LocalModal } from "@/components/Modal";
import { TaskTrash } from "./TaskTrash";
import { IconDashboard, IconPages, IconTrashBin } from "@/components/icons";
import { Project, Task } from "@/models";
import { taskService } from "@/services";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SideBarButton } from "./SideBarButton";

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
      <SideBarButton icon={<IconDashboard />} text="Dashboard" link={`/${user}/${project?.id}`}/>
      <SideBarButton icon={<IconPages />} fnClick={() => {setModalPages(true)}} text="Páginas" />
      <SideBarButton icon={<IconTrashBin />} fnClick={() => setModalTrash(true)} text="Lixeira">
        <LocalModal condition={modalTrash} setCondition={setModalTrash}>
          <If condition={tasksTrash.length == 0}>
            <div className="flex items-center justify-center bg-white dark:bg-modal-grey h-min w-80 text-primary dark:text-secondary h5 p-4">
              <p className="p flex flex-wrap text-center items-center h-min w-3/4 ">
                Parece que esse projeto não tem tarefas excluídas
              </p>
            </div>
            <span className=" bg-white dark:bg-modal-grey ">
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
      </SideBarButton>
    </>
  );
};
