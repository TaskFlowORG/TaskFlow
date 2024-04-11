"use client";
import { useContext, useEffect, useState } from "react";
import { ProjectContext } from "@/contexts/ContextProject";
import { UserContext } from "@/contexts/UserContext";
import { projectService, userService } from "@/services";
import { SideModal } from "@/components/Modal/SideModal";
import { RegisterProperty } from "@/components/RegisterProperty";
import { IconMenuTaskProperty, IconPages } from "@/components/icons";
import { PopUpModal } from "@/components/PopUpModal";
import { PageContext } from "@/utils/pageContext";
import { TaskModalContext } from "@/utils/TaskModalContext";
import { Task, TaskOrdered, User } from "@/models";
import { TaskModal } from "@/components/TaskModal";
import { IconPlus } from "@/components/icons/GeneralIcons/IconPlus";
import { NeedPermission } from "@/components/NeedPermission";
import { useHasPermission } from "@/hooks/useHasPermission";

interface Props {
  params: { project: number; user: string };
  children: React.ReactNode;
}

export default function Layout({ params, children }: Props) {
  const { project, setProject } = useContext(ProjectContext);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [pageId, setPageId] = useState<number>();
  const [inPage, setInPage] = useState(false);
  const [task, setSelectedTask] = useState<Task>();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const projectPromise = await projectService.findOne(params.project);
      setProject!(projectPromise);
      console.log(params);
      projectService.setVisualizedNow(projectPromise.id);
    })();
  }, [params.project]);


  const hasPermission = useHasPermission("create");
  const [modalProperty, setModalProperty] = useState(false);
  console.log(project?.properties)
  return (
    <>
      <PageContext.Provider value={{ inPage, setInPage, pageId, setPageId }}>
        <TaskModalContext.Provider
          value={{ isOpen, setIsOpen, task, setSelectedTask }}
        >
          <TaskModal
            task={task!}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            user={user!}
          />

          <div className="h-full w-full">
            <div
              className=" flex items-center justify-center h-10 w-10   bg-white z-50 rounded-full dark:bg-modal-grey 
            shadowww cursor-pointer bottom-10 right-10 fixed "
              onClick={() => {
                inPage && hasPermission ? setIsPopupOpen(true) : setModalProperty(true);
              }}
            >
              <NeedPermission permission="create">
                {inPage && (
                  <PopUpModal
                    user={user?.username}
                    condition={isPopupOpen}
                    modalProp={modalProperty}
                    setModalProp={setModalProperty}
                    setCondition={setIsPopupOpen}
                  ></PopUpModal>
                )}
              </NeedPermission>
              <p
                className="h3 text-primary rotate-45 p-3 flex z-50 items-center rounded-full hover:brightness-95 justify-center dark:text-secondary h-10 w-10 hover:text-white dark:hover:text-white "
                // onClick={() => setIsPopupOpen(true)}
              >
                <IconPlus />
              </p>
            </div>

            <SideModal
              condition={modalProperty}
              setCondition={setModalProperty}
              right
            >
              <RegisterProperty
                project={project!}
                properties={project?.properties ?? []}
              />
            </SideModal>
            {children}
          </div>
        </TaskModalContext.Provider>
      </PageContext.Provider>
    </>
  );
}
