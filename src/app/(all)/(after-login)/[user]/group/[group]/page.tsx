"use client";

import { Description } from "@/components/Description/Description";
import { SVGGroupPage } from "@/components/SVGGroupPage/SVGGroupPage";

import { UsersList } from "@/components/UsersList/UsersList";
import { useContext, useEffect, useState } from "react"
import { Group, OtherUser } from "@/models";
import { groupService, userService } from "@/services";
import { ProjectContext } from "@/contexts";
import { Loading } from "@/components/Loading";
import { useAsyncThrow } from "@/hooks/useAsyncThrow";
import { AxiosError, AxiosResponse } from "axios";
import { SVGGroupMobile } from "@/components/SVGGroupMobile";

export default function Groups({ params }: { params: { user: string, group: number } }) {
    const { project } = useContext(ProjectContext);
    const [group, setGroup] = useState<Group>();
    const [user, setUser] = useState<OtherUser>()
    const asynThrow = useAsyncThrow();

    useEffect(() => {
        const fetchData = async () => {
            const fetchedGroup = await groupService.findOne(params.group).catch(asynThrow);
            if (fetchedGroup) setGroup(fetchedGroup);
            const fetchedUser = await userService.findLogged().catch(asynThrow);
            if (fetchedUser) setUser(fetchedUser);
        }
        fetchData();
    }, [params.group]);

    if (!user) return <Loading />
    if (group?.owner.id !== user.id && !group?.users.find(u => u.id === user.id)) throw new AxiosError("Unauthorized", undefined, undefined, undefined, { status: 403 } as AxiosResponse<any>)

    return (
        <div className="group-page w-screen h-screen">
            <div className="absolute hidden md:flex md:-bottom-36 xl:2xl:bottom-0 -z-50">
                <SVGGroupPage />
            </div>
            <div className="absolute flex h-[99vh] w-[130%] md:hidden top-44">
                <SVGGroupMobile />
            </div>
            <div className="w-full flex flex-col lg:flex-row lg:gap-8 xl:gap-32 mt-32">
                <div className="flex flex-col lg:flex-row w-1/2 lg:ml-10 lg:justify-end">
                    {<Description user={user} groupId={params.group} />}
                </div>
                <div className="flex flex-col lg:flex-row lg:w-1/2 mt-12 lg:mt-0">
                    {<UsersList group={group} user={user} setGroup={setGroup} />}
                </div>
            </div>
        </div>
    )
}
