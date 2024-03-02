
'use client'

import { Header } from '@/components/Header';
import { useContext, useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { useContrast } from '@/hooks/useContrast'
import { projectService } from '@/services';
import { Project } from '@/models';
import { SideBarProjects } from '@/components/SideBarProjects';
import { AnimatePresence, motion } from 'framer-motion';
import { useClickAway } from 'react-use'
import { ProjectContext } from '@/utils/ContextProject';
import { SideModal } from '@/components/Modal';

//UseClickAway Hook
export default function Layout({ children, params }: { children: React.ReactNode, params: { project: number, user: string } }) {

  const [project, setProject] = useState<Project>();
  const { contrastColor } = useContrast();
  const [openSideBar, setOpenSideBar] = useState(false);
  const ref = useRef(null);
  useClickAway(ref, () => setOpenSideBar(false));

  useEffect(() => {
    (async () => {//const theme = await Promise
      //setTheme(theme)
      //document.documentElement.style.setProperty('--primary-color', await color);
      //document.documentElement.style.setProperty('--secondary-color', await color);
      document.documentElement.style.setProperty('--contrast-color', contrastColor);
    })()
  })
  return (
    <>
      <ProjectContext.Provider value={{ project, setProject }}>
        <Header setSidebarOpen={setOpenSideBar}></Header>
        <main className='w-full h-full flex flex-col items-center justify-start'>
          <SideModal condition={openSideBar} setCondition={setOpenSideBar} >
                <SideBarProjects user={params.user} project={project} />
          </SideModal>
          {
            children
          }
        </main >
      </ProjectContext.Provider>
    </>
  )


}



