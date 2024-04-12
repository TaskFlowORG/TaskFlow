"use client";

import { Header } from "@/components/Header";
import { useContext, useEffect, useRef, useState } from "react";
import { useContrast } from "@/hooks/useContrast";
import { Project, ProjectSimple, Task, Theme } from "@/models";
import { SideBarProjects } from "@/components/SideBarProjects";
import { ProjectContext, ProjectsContext } from "@/contexts";
import { SideModal } from "@/components/Modal";
import { useClickAway } from "react-use";
import Projects from "./projects/page";
import { projectService, userService } from "@/services";
import { UserContext } from "@/contexts/UserContext";
import { useTheme } from "next-themes";
import Joyride from "react-joyride";
import { Loading } from "@/components/Loading";
import { steps } from "@/utils/tutorial";
import { TaskModalContext } from "@/utils/TaskModalContext";
import { PageContext } from "@/utils/pageContext";

//UseClickAway Hook
export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { project: number; user: string };
}) {
  const [project, setProject] = useState<Project>();
  const [projects, setProjects] = useState<ProjectSimple[]>([]);
  const { contrastColor } = useContrast();
  const [openSideBar, setOpenSideBar] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { setTheme, theme } = useTheme();
  const {user, setUser} = useContext(UserContext);
  const [pageId, setPageId] = useState<number>();
  const [inPage, setInPage] = useState(false);
  const [task, setSelectedTask] = useState<Task>();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    (async () => {
      if(!user) return;
      setTheme(user.configuration.theme.toLowerCase());
      document.documentElement.style.setProperty('--primary-color', user.configuration.primaryColor);
      document.documentElement.style.setProperty('--secondary-color', user.configuration.secondaryColor);
      document.documentElement.style.setProperty(
        "--contrast-color",
        contrastColor
      );
    })();
  },[user] );

  useEffect(() => {
    (async () => {
      if(!user || !setUser) return;
      user.configuration.theme = Theme[theme?.toUpperCase() as keyof typeof Theme];
      const userTemp = await userService.update(user);
      setUser(userTemp);
     })();
  } , [theme]);

  useEffect(() => {
    (async () => {
      setProjects(await projectService.findAllOfAUser());
    })();
  }, [params.user]);

  useEffect(() => {
    if(!project) return
      projectService.setVisualizedNow(project.id)
  }, [project]);

  useEffect(() => {
    (async () => {
      if(!setUser) return;
      const loggedUser = await userService.findLogged();
      setUser(loggedUser);
    })();
  }, []);

  if(!user) return <Loading/>
  return (
    <>
      <ProjectsContext.Provider value={{ projects, setProjects }}>

        <Joyride  steps={steps.steps} showProgress />
        <ProjectContext.Provider value={{ project, setProject }}>
        <PageContext.Provider value={{ inPage, setInPage, pageId, setPageId }}>
        <TaskModalContext.Provider
          value={{ isOpen, setIsOpen, task, setSelectedTask }}
        >
          <Header setSidebarOpen={setOpenSideBar}></Header>
          <main className="w-screen h-full flex flex-col items-center justify-start">
            <SideModal condition={openSideBar} setCondition={setOpenSideBar}>
              <SideBarProjects user={params.user} project={project} />
            </SideModal>
            {children}
          </main>
          </TaskModalContext.Provider>
          </PageContext.Provider>
        </ProjectContext.Provider>
      </ProjectsContext.Provider>
    </>
  );
}
