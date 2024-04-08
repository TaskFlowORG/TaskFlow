"use client";

import { useContext, useEffect, useState } from "react";
import { ProjectContext } from "@/utils/ContextProject";
import { projectService, userService } from "@/services";
import { SideModal } from "@/components/Modal/SideModal";
import { RegisterProperty } from "@/components/RegisterProperty";
import { IconMenuTaskProperty } from "@/components/icons";
import { PopUpModal } from "@/components/PopUpModal";
import { PageContext } from "@/utils/pageContext";
import { TaskModalContext } from "@/utils/TaskModalContext";
import { Task, TaskOrdered, User } from "@/models";
import { TaskModal } from "@/components/TaskModal";


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
  const [user, setUser] = useState<User>()

  useEffect(() => {
    (async () => {
      const projectPromise = await projectService.findOne(params.project);
      setProject!(projectPromise);
      console.log(params);
        projectService.setVisualizedNow(projectPromise)
      const user = await userService.findByUsername(params.user)
      console.log(user)
      setUser(user)
    })();
  }, [params.project]);

  const [modalProperty, setModalProperty] = useState(false);
  return (
    <>
      <PageContext.Provider value={{ inPage, setInPage, pageId, setPageId }}>
        <TaskModalContext.Provider value={{isOpen, setIsOpen,task, setSelectedTask}}>
        <TaskModal
          task={task!}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          user={user!}
        />
          

        <div className="h-full w-full">
          <div
            className=" flex items-center justify-center h-[3.8rem] w-[3.8rem]  rounded-full  shadowww cursor-pointer bottom-10 right-10 fixed hover:bg-primary dark:hover:bg-secondary"
            onClick={() => {
              inPage ? setIsPopupOpen(true) : setModalProperty(true);
            }}
          >
            {inPage && (
              <PopUpModal
              user={user?.username}
                condition={isPopupOpen}
                modalProp={modalProperty}
                setModalProp={setModalProperty}
                setCondition={setIsPopupOpen}
              ></PopUpModal>
            )}
            <p
              className="h3 text-primary flex items-center justify-center dark:text-secondary h-[3.8rem] w-[3.8rem] hover:text-white dark:hover:text-white "
              // onClick={() => setIsPopupOpen(true)}
            >
              +
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
