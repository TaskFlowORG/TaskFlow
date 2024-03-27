"use client";

import { Header } from "@/components/Header";
import { useEffect, useRef, useState } from "react";
import { useContrast } from "@/hooks/useContrast";
import { Project } from "@/models";
import { SideBarProjects } from "@/components/SideBarProjects";
import { ProjectContext, ProjectsContext } from "@/contexts";
import { SideModal } from "@/components/Modal";
import { useClickAway } from "react-use";
import Projects from "./projects/page";
import { projectService } from "@/services";

//UseClickAway Hook
export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { project: number; user: string };
}) {
  const [project, setProject] = useState<Project>();
  const [projects, setProjects] = useState<Project[]>([]);
  const { contrastColor } = useContrast();
  const [openSideBar, setOpenSideBar] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      //const theme = await Promise
      //setTheme(theme)
      //document.documentElement.style.setProperty('--primary-color', await color);
      //document.documentElement.style.setProperty('--secondary-color', await color);
      document.documentElement.style.setProperty(  "--contrast-color", contrastColor );
      setProjects(await projectService.findAllOfAUser(params.user));
    })();
});  
  return (
    <>
    <ProjectsContext.Provider value={{ projects, setProjects }}>
      <ProjectContext.Provider value={{ project, setProject }}>
        <Header setSidebarOpen={setOpenSideBar}></Header>
        <main className='w-screen h-full flex flex-col items-center justify-start'>
          <SideModal condition={openSideBar} setCondition={setOpenSideBar}>
            <SideBarProjects user={params.user} project={project} />
          </SideModal>
          {children}
        </main>
      </ProjectContext.Provider>
    </ProjectsContext.Provider>
    </>
  );
}
