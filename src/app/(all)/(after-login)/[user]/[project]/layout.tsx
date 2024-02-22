
'use client'

import { Header } from '@/components/Header';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { useContrast } from '@/hooks/useContrast'
import { Project } from '@/models';
import { projectService } from '@/services';
import { Button } from '@/components/Button';
import Link from 'next/link';
import { PageComponent } from '@/components/@PageComponent';
import { SwiperSlide, Swiper } from 'swiper/react';
import { Pagination } from 'swiper/modules';

export default function Layout({ children, params }: { children: React.ReactNode, params: { project: number, user: string } }) {

    const [project, setProject] = useState<Project>();
    useEffect(() => {
        (async () => {
            const project = await projectService.findOne(params.project);
            setProject(project);
            console.log(project)
        })()
    }, [params.project])

    return (
        <div className='flex w-full h-full'>
            <div className='fixed z- bottom-0 h-full flex pt-14'>
                <div className='flex flex-col gap-2 h-full w-72 p-4' >
                    <div className='flex flex-col h-full overflow-auto p-1'>
                        <div className='flex flex-col gap-3 items-start h-min w-full '>
                            {project?.pages.map(page => {
                                return (
                                    <PageComponent key={page.id} page={page} username={params.user} project={project} />
                                )
                            })}
                        </div>
                    </div>
                    <Button width='w-full' text='Adicionar Página' padding='p-2' paddingY='p-1' textSize='font-[14re]' />
                </div>
            </div>
            {children}

        </div>
    )
}
