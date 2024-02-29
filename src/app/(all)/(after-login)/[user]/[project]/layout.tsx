
'use client'

import { Header } from '@/components/Header';
import { useContext, useEffect } from 'react';
import { useTheme } from 'next-themes';
import {useContrast} from '@/hooks/useContrast'
import { ProjectContext } from '@/utils/ContextProject';
import { projectService } from '@/services';

interface Props {
  params:{project:number},
  children: React.ReactNode
}

export default function Layout({ params, children } : Props ){

  const {setProject} = useContext(ProjectContext)

  useEffect(() => {
    (async () => {
      const projectPromise = await projectService.findOne(params.project)
      setProject!(projectPromise)
    })()
  }, [params.project])  

  return children;
}
