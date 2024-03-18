
import { If } from "@/components/If"
import { IconBurguerList, IconGroups, IconLogout, IconProjects } from "@/components/icons"
import { Project } from "@/models";
import Link from "next/link"
import {  SideSecondary } from "./SideSecondary";
import {  PageSide } from "./PageSide";
import { SideModal } from "@/components/Modal";
import { SideBarButton } from "./SideBarButton";

interface Props {
    project?: Project;
    user: string;
    setWantLeave: (value: boolean) => void;
    modalPages: boolean;
    setModalPages: (value: boolean) => void;
    modalGroups: boolean;
    setModalGroups: (value: boolean) => void;
}

export const SideMain = ({ project, user, setWantLeave, modalGroups, modalPages, setModalGroups, setModalPages }: Props) => {



    return (
        <>
            <If condition={!modalGroups && !modalPages}>
                <>
                <div className="w-full h-full flex flex-col items-center relative">
                    <Link href={`/${user}/initial-page`} className="w-full ">
                        <SideBarButton icon={<IconBurguerList />} text="Página Inicial" />
                    </Link>
                    <Link href={`/${user}/projects`} className="w-full ">
                    <SideBarButton icon={<IconProjects />} text="Projetos" />
                    </Link>
                    <SideBarButton icon={<IconGroups />} text="Grupos" fnClick={() => setModalGroups(true)} />
                    <If condition={project != undefined}>
                        <SideSecondary setModalPages={setModalPages} user={user} project={project} />
                    </If>
                </div>
                <div className="w-full h-1/4 flex flex-col justify-end items-center" >
                    <SideBarButton icon={<IconLogout />} text="Logout" fnClick={() => setWantLeave(true)} />
                </div>
                </>
            </If>
            <SideModal condition={modalPages && project != undefined} setCondition={setModalPages}>
                <PageSide setModalPages={setModalPages} user={user} project={project!} />
            </SideModal>
            <SideModal condition={modalGroups && project != undefined} setCondition={setModalGroups}>
                <PageSide setModalPages={setModalPages}  user={user} project={project!} />
            </SideModal>
        </>)
}