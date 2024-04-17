import { If } from "@/components/If";
import { LocalModal, SideModal } from "@/components/Modal";
import { TaskTrash } from "./TaskTrash";
import {
  IconDashboard,
  IconGroups,
  IconPages,
  IconTrashBin,
} from "@/components/icons";
import { Project, Task } from "@/models";
import { taskService } from "@/services";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SideBarButton } from "./SideBarButton";
import { useTranslation } from "next-i18next";
import { GroupSide } from "./GroupSide";
import React from "react";
import { useClickAway } from "react-use";

interface Props {
  user: string;
  project?: Project;
  setModalPages: (value: boolean) => void;
  setModalGroups: (value: boolean) => void;
  modalGroups: boolean;
}

export const SideSecondary = ({
  user,
  project,
  setModalPages,
  setModalGroups,
  modalGroups,
}: Props) => {
  const [tasksTrash, setTasksTrash] = useState<Task[]>([]);
  const [modalTrash, setModalTrash] = useState(false);

  useEffect(() => {
    if (!project || !modalTrash) return;
    (async () => {
      const tasks = await taskService.getDeletedTasks(project?.id!);
      setTasksTrash(tasks);
    })();
  }, [modalTrash]);

  const[hovering, setHovering] = useState(false);
  const refTash = React.useRef<HTMLDivElement>(null);

  useClickAway(refTash, () => setModalTrash(false));
    
  const { t } = useTranslation();
  return (
    <>
      <SideBarButton
        icon={<IconDashboard />}
        text={t("project")}
        link={`/${user}/${project?.id}`}
      />
      <span className=" w-full h-min create-page-button">

      <SideBarButton
        icon={<IconPages />}
        fnClick={() => {
          setModalPages(true);
        }}
        text={t("pages")}
      />
      </span>
      <span className=" w-full h-min add-group-project-message">

      <SideBarButton
        icon={<IconGroups />}
        fnClick={() => {
          setModalPages(true);
        }}
        text={t("projects-groups")}
      />
      </span>
      <div className="relative w-full" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}  >
        <SideBarButton
          icon={<IconTrashBin />}
          fnClick={() => setModalTrash(true)}
          text={t("trash")}
          isHovering={hovering}
          openOptions={modalTrash}
          fnOpenOptions={() => setModalTrash(!modalTrash)}
          openOptionsRef={refTash}
        >
          <If condition={tasksTrash.length == 0}>
            <div className="flex items-center justify-center bg-white dark:bg-modal-grey h-full w-full text-primary dark:text-secondary h5 p-4">
              <p className="p flex flex-wrap text-center items-center h-min w-3/4 ">
                {t("no-tasks-trash")}
              </p>
            </div>
            <span className=" bg-white dark:bg-modal-grey w-full">
              <div className="flex overflow-y-auto flex-col gap-4 h-full p-4">
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
        </SideBarButton>
        <SideModal
          condition={modalGroups && project != undefined}
          setCondition={setModalGroups}
        >
          <GroupSide
            setModalGroups={setModalGroups}
            user={user}
            project={project!}
            global={false}

          />
        </SideModal>
      </div>
    </>
  );
};
