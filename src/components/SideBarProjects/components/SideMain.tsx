
import { If } from "@/components/If"
import { IconBurguerList, IconGroups, IconLogout, IconProjects } from "@/components/icons"
import {  } from "@/services";
import { Project } from "@/models";
import Link from "next/link"
import {  useState } from "react";
import { PageSide, SideSecondary } from "./";

interface Props {
    project?: Project;
    user: string;
    setWantLeave: (value: boolean) => void;
}

export const SideMain = ({ project, user, setWantLeave }: Props) => {

    const [modalPages, setModalPages] = useState(false);
    const [modalGroups, setModalGroups] = useState(false);

    return (
        <>
            <If condition={!modalGroups && !modalPages}>
                <>
                <div className="w-full h-full flex flex-col items-center cursor-pointer relative">
                    <Link href={`/${user}/initial-page`} className="w-full h-14  border-b-2 border-primary flex flex-row items-center px-6 hover:brightness-90 bg-white">
                        <div className="w-1/4 h-full flex justify-center items-center">
                            <IconBurguerList />
                        </div>
                        <p className="p">Página Inicial</p>
                    </Link>
                    <Link href={`/${user}/projects`} className="w-full h-14  border-b-2 border-primary flex flex-row items-center px-6 hover:brightness-90 bg-white">
                        <div className="w-1/4 h-full flex justify-center items-center">
                            <IconProjects />
                        </div>
                        <p className="p">Projetos </p>
                    </Link>
                    <div className="w-full h-14  border-b-2 border-primary flex flex-row items-center px-6 hover:brightness-90 bg-white"
                        onClick={() => setModalGroups(true)}>
                        <div className="w-1/4 h-full flex justify-center items-center">
                            <IconGroups />
                        </div>
                        <p className="p">Grupos</p>
                    </div>
                    <If condition={project != undefined}>
                        <SideSecondary setModalPages={setModalPages} user={user} project={project} />
                    </If>
                </div>
                <div className="w-full h-1/4 flex flex-col justify-end items-center" onClick={() => setWantLeave(true)}>
                    <div className="w-full h-14  border-b-2 border-primary flex flex-row items-center px-6 hover:brightness-90 bg-white">
                        <div className="w-1/3 h-full flex justify-center items-center">
                            <IconLogout />
                        </div>
                        <p className="p">Logout</p>
                    </div>
                </div>
                </>
            </If>
            <If condition={modalPages && project != undefined}>
                <PageSide user={user} project={project!} />
            </If>
            <If condition={modalGroups && project != undefined}>
                <PageSide user={user} project={project!} />
            </If>
        </>)
}