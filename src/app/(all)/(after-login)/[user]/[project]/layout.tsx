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
import { Page, Task, TaskOrdered, User } from "@/models";
import { TaskModal } from "@/components/TaskModal";
import { IconPlus } from "@/components/icons/GeneralIcons/IconPlus";
import { NeedPermission } from "@/components/NeedPermission";
import { useHasPermission } from "@/hooks/useHasPermission";
import { Loading } from "@/components/Loading";
import { useAsyncThrow } from "@/hooks/useAsyncThrow";

interface Props {
  params: { project: number; user: string };
  children: React.ReactNode;
}

export default function Layout({ params, children }: Props) {
  const { project, setProject } = useContext(ProjectContext);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { user } = useContext(UserContext);
  const { task, setIsOpen, isOpen } = useContext(TaskModalContext);
  const { inPage, pageId, setInPage, setPageId } = useContext(PageContext);
  const [page, setPage] = useState<Page>();
  const asynThrow = useAsyncThrow();

  useEffect(() => {
    setPage(project?.pages.find((p) => p.id === pageId));
  }, [project, pageId]);

  useEffect(() => {
    (async () => {
      const projectPromise = await  projectService.findOne(params.project).catch(asynThrow);
      if(!projectPromise) return;
      setProject!(projectPromise!);
      console.log(params);
      projectService.setVisualizedNow(projectPromise!.id).catch(e => {asynThrow(e); return null;});
    })();
  }, [params.project]);

  const hasPermission = useHasPermission("create");
  const [modalProperty, setModalProperty] = useState(false);

  if(!user || !project) return <Loading/>
  return (
    <>
      <TaskModal
        task={task!}
        setIsOpen={setIsOpen!}
        isOpen={isOpen}
        user={user!}
      />

          <div className="h-full w-full">
            <div
              className=" flex items-center justify-center h-10 w-10   bg-white z-50 rounded-full dark:bg-modal-grey 
            shadowww cursor-pointer bottom-16 right-16 fixed "
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
                className="h3 text-primary properties-configuration-button gap-px flex flex-col z-50 items-center rounded-full hover:brightness-95 justify-center dark:text-secondary h-10 w-10 hover:text-white dark:hover:text-white "
                // onClick={() => setIsPopupOpen(true)}
              >
                <span className="bg-primary dark:bg-secondary w-1.5 aspect-square rounded-full" /> 
                <span className="bg-primary dark:bg-secondary w-1.5 aspect-square rounded-full" /> 
                <span className="bg-primary dark:bg-secondary w-1.5 aspect-square rounded-full" /> 
              </p>
            </div>

     
          <RegisterProperty
            project={project!}
            page={page}
            setModalProperty={setModalProperty}
            modalProperty={modalProperty}
          />
        {children}
      </div>
    </>
  );
}
