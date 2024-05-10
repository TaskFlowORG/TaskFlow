"use client";

import { Description } from "@/components/Description/Description";
import { SVGGroupPage } from "@/components/SVGGroupPage/SVGGroupPage";
import { UsersList } from "@/components/UsersList/UsersList";
import { useContext, useEffect, useState } from "react"
import { Group, OtherUser } from "@/models";
import { groupService, userService } from "@/services";
import { ProjectContext } from "@/contexts";
import { Loading } from "@/components/Loading";

export default function Home({ params }: { params: { user: string, group: number } }) {
    const { project } = useContext(ProjectContext);
    const [group, setGroup] = useState<Group>();
    const [user, setUser] = useState<OtherUser>()

    useEffect(() => {
        const fetchData = async () => {
            console.log("eitaaa");

            const fetchedGroup = await groupService.findOne(params.group);
            setGroup(fetchedGroup);
            const fetchedUser = await userService.findLogged();
            setUser(fetchedUser);
        }
        fetchData();
    }, [params.group]);

    if (!user) return <Loading />

    return (
        <div className="group-page w-screen h-screen">
            <div className="absolute hidden md:flex md:-bottom-36 xl:2xl:bottom-0 lg:z-10">
                <SVGGroupPage />
            </div>
            {/* 2xl:gap-52 */}
            <div className="w-full flex flex-col lg:flex-row lg:gap-32 mt-32">
                <div className="flex flex-col lg:flex-row w-1/2 lg:justify-end">
                    {project ? <></> : <Description user={user} groupId={params.group} />}
                </div>
                <div className="flex flex-col lg:flex-row lg:w-1/2 mt-12 lg:mt-0">
                    {project ? <></> : <UsersList group={group} user={user} setGroup={setGroup}/>}
                </div>
            </div>
        </div>
    )
}
