import { If } from "@/components/If";
import { LocalModal, SideModal } from "@/components/Modal";
import { TaskTrash } from "./TaskTrash";
import {
  Arrow,
  IconDashboard,
  IconGroups,
  IconPages,
  IconTrashBin,
} from "@/components/icons";
import { Project, Task } from "@/models";
import { taskService } from "@/services";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SideBarButton } from "./SideBarButton";
import { useTranslation } from "next-i18next";
import { GroupSide } from "./GroupSide";
import { useClickAway } from "react-use";

interface Props {
  user: string;
  project?: Project;
  setModalPages: (value: boolean) => void;
  setModalProjectGroups: (value: boolean) => void;
}

export const SideSecondary = ({
  user,
  project,
  setModalPages,
  setModalProjectGroups,
}: Props) => {
  const [tasksTrash, setTasksTrash] = useState<Task[]>([]);
  const [modalTrash, setModalTrash] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!project || !modalTrash) return;
    (async () => {
      const tasks = await taskService.getDeletedTasks(project?.id!);
      setTasksTrash(tasks);
    })();
  }, [modalTrash]);

  const refOpenOptions = useRef<HTMLDivElement>(null);
  useClickAway(refOpenOptions, () => setModalTrash(false));

  const { t } = useTranslation();
  return (
    <>
      <SideBarButton
        icon={<IconGroups />}
        text={t("projects-groups")}
        fnClick={() => setModalProjectGroups(true)}
      />

      <SideBarButton
        icon={<IconDashboard />}
        text={t("project")}
        link={`/${user}/${project?.id}`}
      />
      <SideBarButton
        icon={<IconPages />}
        fnClick={() => {
          setModalPages(true);
        }}
        text={t("pages")}
      />
      <div
        className="relative w-full"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <SideBarButton
          icon={<IconTrashBin />}
          openOptions={modalTrash}
          fnClick={() => setModalTrash(!modalTrash)}
          text={t("trash")}
          iconOptions={<Arrow className="rotate-90" />}
          hasButton
          isHovering={isHovering}
          openOptionsRef={refOpenOptions}
        >
          <If condition={tasksTrash.length == 0}>
            <div className="flex items-center justify-center bg-white dark:bg-modal-grey h-full w-80 text-primary dark:text-secondary h5 p-4">
              <p className="text-p flex pb-10 flex-wrap text-center items-center h-min w-3/4 ">
                {t("no-tasks-trash")}
              </p>
            </div>
            <span className=" bg-white dark:bg-modal-grey h-full max-h-64 justify-center w-full overflow-y-auto none-scrollbar flex">
              <div className="flex justify-center flex-col gap-4 h-min py-4 w-full">
                {tasksTrash.map((task, index) => {
                  return (
                    <div key={task.id} className="flex flex-col gap-4 w-full justify-center items-center">
                      <TaskTrash task={task} userId={user} arrayTasks={tasksTrash} setArrayTasks={setTasksTrash} />
                      <If condition={index < tasksTrash.length - 1}>
                        <div className="bg-zinc-200 w-3/4 h-px self-center" />
                      </If>
                    </div>
                  );
                })}
              </div>
            </span>
          </If>
        </SideBarButton>
      </div>
    </>
  );
};
