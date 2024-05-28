import { Action, Task } from "@/models";
import { projectService, taskService } from "@/services";
import { useContext, useState } from "react";
import { If } from "../../If";
import { Button } from "../../Button";
import { useTranslation } from "next-i18next";
import { ProjectComponent } from "@/components/InitialAndProjectsPage";
import { ProjectContext } from "@/contexts";
import { IconTrashBin, IconRedo } from "@/components/icons";
import { UserContext } from "@/contexts/UserContext";
interface Props {
  task: Task;
  userId: string;
  arrayTasks: Task[];
  setArrayTasks: (value: Task[]) => void;
}

export const TaskTrash = ({
  task,
  userId,
  arrayTasks,
  setArrayTasks,
}: Props) => {
  const [modalDelete, setModalDelete] = useState(false);
  const { project, setProject } = useContext(ProjectContext);
  const { t: translate } = useTranslation();

  const [user] = useState(
    task.logs.find((l) => l.action == Action.DELETE)?.user
  );
  const deleteTask = () => {
    if (!project) return;
    taskService.deletePermanent(task.id, project.id);
    setArrayTasks(arrayTasks.filter((t) => t.id != task.id));
  };
  const redo = async () => {
    if (project?.id != undefined && setProject != undefined) {
      await taskService.redo(task.id, project.id);

      setArrayTasks(arrayTasks.filter((t) => t.id != task.id));
      const projectGet = await projectService.findOne(project.id);
      setProject({...projectGet});
    }
  };
  const { t } = useTranslation();
  const{user:logged} = useContext(UserContext)

  return (
    <>
      <div className={"flex justify-between gap-3 items-center z-50 w-[80%] " + (logged?.id == project?.owner.id ? "":"shadow-[0_0_1px_1px_rgba(0,0,0,0.1)]  p-2 h-min w-[99%] m-1 rounded-md")}>
        {logged?.id == project?.owner.id && (
          <button
            className="bg-primary dark:bg-secondary cursor-pointer p-2 min-w-[2rem] min-h-[2rem] rounded-md"
            onClick={() => setModalDelete(true)}
          >
            <span className="stroke-contrast">
              <IconTrashBin />
            </span>
          </button>
        )}
        <div
          className="truncate  text-p font-montserrat  h-full w-full flex items-center cursor-default"
          title={
            (task.name ? task.name : translate("withoutname")) +
            " " +
            translate("by") +
            " @" +
            task.logs.reverse().find((l) => l.action == Action.DELETE)?.user
              ?.username
          }
        >
          <span className="truncate h-full w-min flex flex-col text-start items-start">
            &quot;{task.name ? task.name : translate("withoutname")}&quot;
            <span className="text-primary-opacity dark:text-secondary-opacity text-mn">
              {"@" +
                task.logs.reverse().find((l) => l.action == Action.DELETE)?.user
                  ?.username}
            </span>
          </span>
        </div>
        {logged?.id == project?.owner.id && (
          <button
            className="bg-primary dark:bg-secondary cursor-pointer p-1 min-w-[2rem] min-h-[2rem] rounded-md"
            onClick={redo}
          >
            <IconRedo />
          </button>
        )}{" "}
      </div>
      <If condition={modalDelete}>
        <>
          <div
            className="fixed top-0 right-0 bottom-0 z-[60] bg-white opacity-40 left-0 cursor-default"
            onClick={() => setModalDelete(false)}
            onMouseOver={(e) => e.stopPropagation()}
          ></div>
          <div
            className="fixed bg-white shadow-blur-10 top-1/2 -translate-x-1/2 flex-col  gap-16
                                -translate-y-1/2 left-1/2 z-[60] rounded-md w-[35rem] h-80 flex justify-center items-center"
          >
            <h4 className="text-h4 font-alata text-primary dark:text-secondary flex-wrap w-3/4 text-center">
              {t("have-sure-delete-permanently")}
            </h4>
            <div className="flex justify-between w-3/4">
              <Button
                text="Cancelar"
                textSize="font-p"
                width="w-min"
                fnButton={() => setModalDelete(false)}
              />
              <Button
                text="Excluir"
                textSize="font-p"
                width="w-min"
                secondary
                fnButton={deleteTask}
              />
            </div>
          </div>
        </>
      </If>
    </>
  );
};
