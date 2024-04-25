"use client";

import { Description } from "@/components/Description/Description";
import { SVGGroupPage } from "@/components/SVGGroupPage/SVGGroupPage";
import { UsersList } from "@/components/UsersList/UsersList";
import { useEffect, useState } from "react"
import { useTheme } from "next-themes";
import { Group, GroupPut, OtherUser, Project, User } from "@/models";
import { groupService, projectService } from "@/services";

export default function Home({ params }: { params: { user: string, project: number, group: number } }) {
    const { theme, setTheme } = useTheme();
    const [project, setProject] = useState<Project | undefined>();
    const [group, setGroup] = useState<Group>();

    useEffect(() => {
        const fetchData = async () => {
            const fetchedProject = await projectService.findOne(params.project);
            setProject(fetchedProject);
            const fetchedGroup = await groupService.findOne(params.group);
            setGroup(fetchedGroup);
        }
        fetchData();
    }, [params.project]);

    return (
        <div className="w-screen h-screen">
            <div className="absolute hidden md:flex md:-bottom-36 xl:2xl:bottom-0 lg:z-10">
                <SVGGroupPage />
            </div>
            <div className="w-full flex flex-col lg:flex-row lg:gap-32 mt-32">
                <div className="flex flex-col lg:flex-row w-1/2 lg:justify-end">
                    {project && <Description project={project} user={params.user} groupId={params.group} />}
                </div>
                <div className="flex flex-col lg:flex-row lg:w-1/2 mt-12 lg:mt-0">
                    {project && <UsersList project={project} group={group} />}
                </div>
            </div>
        </div>
    )
}
