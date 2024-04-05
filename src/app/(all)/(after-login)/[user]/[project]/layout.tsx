
'use client'

import { useContext, useEffect, useState } from 'react';
import { ProjectContext } from '@/contexts';
import { projectService } from '@/services';
import { SideModal } from '@/components/Modal/SideModal';
import { RegisterProperty } from '@/components/RegisterProperty';
import { IconMenuTaskProperty } from '@/components/icons';

interface Props {
  params:{project:number},
  children: React.ReactNode
}

export default function Layout({ params, children } : Props ){

  const {project,setProject} = useContext(ProjectContext)

  useEffect(() => {
    (async () => {
      const projectPromise = await projectService.findOne(params.project)
      setProject!(projectPromise)
      projectService.setVisualizedNow(projectPromise.id)
    })()
  }, [params.project])  

  const [modalProperty, setModalProperty] = useState(false)
  return (
    <>
     <div className="h-full w-screen">
          <div className="z-40 bg-white flex items-center justify-center h-[3.8rem] w-[3.8rem]  rounded-full  shadowww cursor-pointer bottom-10 right-10 fixed hover:bg-primary dark:hover:bg-secondary" onClick={() => { setModalProperty(true) }}>
            <p className="h3 text-primary flex items-center justify-center dark:text-secondary h-[3.8rem] w-[3.8rem] hover:text-white dark:hover:text-white " onClick={() => setModalProperty(true)}>+</p>
          </div>
          <SideModal condition={modalProperty} setCondition={setModalProperty} right>
            <RegisterProperty project={project!} properties={project?.properties ?? []} />
          </SideModal>
          {children}
        </div>
        
    </>
    );
}
