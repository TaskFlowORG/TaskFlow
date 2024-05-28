"use client";

import { Description } from "@/components/Description/Description";
import { SVGGroupPage } from "@/components/SVGGroupPage/SVGGroupPage";
import { UsersList } from "@/components/UsersList/UsersList";
import { useContext, useEffect, useState } from "react"
import { Group, OtherUser} from "@/models";
import { groupService, userService } from "@/services";
import { ProjectContext } from "@/contexts";
import { useAsyncThrow } from "@/hooks/useAsyncThrow";
import { Loading } from "@/components/Loading";
import { SVGGroupMobile } from "@/components/SVGGroupMobile";

export default function Home({ params }: { params: { user: string, project: number, group: number } }) {
    const { project } = useContext(ProjectContext);
    const [group, setGroup] = useState<Group>();
    const [user, setUser] = useState<OtherUser>()
    const asynThrow = useAsyncThrow();

    useEffect(() => {
        const fetchData = async () => {
            const fetchedGroup = await groupService.findOne(params.group).catch(asynThrow);
            if (fetchedGroup) setGroup(fetchedGroup)
            const fetchedUser = await userService.findLogged().catch(asynThrow);
            if (fetchedUser) setUser(fetchedUser);
        }
        fetchData();
    }, [params.project]);
    if (!user) return <Loading />
    return (
        <div className="group-page w-screen h-screen">
        <div className="absolute hidden md:flex md:-bottom-36 xl:2xl:bottom-0 -z-50">
                <SVGGroupPage />
            </div>
            <div className="w-full flex flex-col lg:flex-row lg:gap-8 xl:gap-32  mt-20 md:mt-32">
                <div className="flex flex-col lg:flex-row md:w-1/2 lg:ml-10 lg:justify-end">
                    <Description project={project} user={user} groupId={params.group} />
                </div>
                <div className="flex flex-col lg:flex-row lg:w-1/2 mt-8 md:mt-16 lg:mt-0">
                    <UsersList project={project} group={group} user={user} setGroup={setGroup} />
                </div>
            </div>
        </div>
    )
}
