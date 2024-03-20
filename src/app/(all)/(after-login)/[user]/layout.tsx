"use client";

import { Header } from "@/components/Header";
import { useEffect, useRef, useState } from "react";
import { useContrast } from "@/hooks/useContrast";
import { Project } from "@/models";
import { SideBarProjects } from "@/components/SideBarProjects";
import { ProjectContext } from "@/utils/ContextProject";
import { SideModal } from "@/components/Modal";
import { useClickAway } from "react-use";

//UseClickAway Hook
export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { project: number; user: string };
}) {
  const [project, setProject] = useState<Project>();
  const { contrastColor } = useContrast();
  const [openSideBar, setOpenSideBar] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      //const theme = await Promise
      //setTheme(theme)
      //document.documentElement.style.setProperty('--primary-color', await color);
      //document.documentElement.style.setProperty('--secondary-color', await color);
      document.documentElement.style.setProperty(
        "--contrast-color",
        contrastColor
      );
    })();
  });
  return (
    <>
      <ProjectContext.Provider value={{ project, setProject }}>
        <Header setSidebarOpen={setOpenSideBar}></Header>
        <main className='w-screen h-full flex flex-col items-center justify-start'>
          <SideModal condition={openSideBar} setCondition={setOpenSideBar}>
            <SideBarProjects user={params.user} project={project} />
          </SideModal>
          {children}
        </main>
      </ProjectContext.Provider>
    </>
  );
}
