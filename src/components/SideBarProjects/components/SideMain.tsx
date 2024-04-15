import { If } from "@/components/If"
import { IconBurguerList, IconGroups, IconLogout, IconProjects } from "@/components/icons"
import { Project } from "@/models";
import Link from "next/link"
import { SideSecondary } from "./SideSecondary";
import { PageSide } from "./PageSide";
import { SideModal } from "@/components/Modal";
import { GroupSide } from "./GroupSide";
import { SideBarButton } from "./SideBarButton";


import { useContext } from "react";
import { ProjectContext } from "@/contexts";
import { useTranslation } from "next-i18next";


interface Props {
    project?: Project;
    user: string;
    setWantLeave: (value: boolean) => void;
    modalPages: boolean;
    setModalPages: (value: boolean) => void;
    modalGroups: boolean;
    setModalGroups: (value: boolean) => void;
    modalProjectGroups: boolean;
    setModalProjectGroups: (value: boolean) => void;
}

export const SideMain = ({ project, user, setWantLeave, modalGroups, 
    modalPages, setModalGroups, setModalPages, setModalProjectGroups, modalProjectGroups }: Props) => {

    const { setProject } = useContext(ProjectContext)
    const {t} = useTranslation()
    return (
        <div className="w-full h-full overflow-y-auto none-scrollbar">
            <If condition={!modalGroups && !modalPages}>
                <div className="h-full flex flex-col justify-between">

                    <div className="w-full h-min flex flex-col items-center relative">
                        <span className="">

                        <SideBarButton icon={<IconBurguerList />} link={`/${user}`} text={t("initial-page")} fnClick={() => setProject && setProject(undefined)} />
                        </span>
                        <span className="projects-sidebar">

                        <SideBarButton icon={<IconProjects />} text={t("projects")} link={`/${user}/projects`} fnClick={() => setProject && setProject(undefined)} />
                        </span>
                        <span className="groups-sidebar-options">
                        <SideBarButton icon={<IconGroups />} text={t("groups")} fnClick={() => setModalGroups(true)} />

                        </span>
                        <If condition={project != undefined}>
                            <SideSecondary modalGroups={modalGroups} setModalGroups={setModalGroups} setModalPages={setModalPages} user={user} project={project} />
                        </If>
                    </div>
                    <div className="w-full h-min flex flex-col justify-end items-center" >
                        <SideBarButton icon={<IconLogout />} text={t("logout")} fnClick={() => setWantLeave(true)} />
                    </div>
                </div>
        </If >
            <SideModal condition={modalPages && project != undefined} setCondition={setModalPages}>
                <PageSide setModalPages={setModalPages} user={user} project={project!} />
            </SideModal>
            <SideModal condition={modalGroups && project != undefined} setCondition={setModalGroups}>
                <GroupSide setModalGroups={setModalGroups} user={user} project={project!} global={true} />
            </SideModal>
            <SideModal condition={modalProjectGroups && project != undefined} setCondition={setModalProjectGroups}>
                <GroupSide setModalGroups={setModalGroups} user={user} project={project!} global={false} />
            </SideModal>
        </div>)
}


