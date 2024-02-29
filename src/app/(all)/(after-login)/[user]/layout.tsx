
'use client'

import { useEffect, useState } from 'react';
import { Project } from '@/models';
import { projectService } from '@/services';
import { PageSide } from '@/components/PagesSideBar';
import { SideBarProjects } from '@/components/SideBarProjects/SideBarProjects';
import { ProjectContext } from '@/utils/ContextProject';

export default function Layout({ children, params }: { children: React.ReactNode, params: { project: number, user: string } }) {

    const [project, setProject] = useState<Project>();
    useEffect(() => {
        (async () => {
            if (params.project == undefined) return
            const project = await projectService.findOne(params.project);
            setProject(project);
        })()
        console.log(params.project)
    }, [params.project])

    return (
            <ProjectContext.Provider value={{ project, setProject }}>
                <SideBarProjects user={params.user} project={project} />
                {
                    children
                }
            </ProjectContext.Provider>
    )
}
