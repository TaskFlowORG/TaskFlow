import { If } from "@/components/If"
import { IconBurguerList, IconGroups, IconLogout, IconProjects } from "@/components/icons"
import { Project } from "@/models";
import Link from "next/link"
import { SideSecondary } from "./SideSecondary";
import { PageSide } from "./PageSide";
import { SideModal } from "@/components/Modal";
import { GroupSide } from "./GroupSide";
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
                        <SideBarButton icon={<IconBurguerList />} link={`/${user}/initial-page`} text="Página Inicial" />
                        <SideBarButton icon={<IconProjects />} text="Projetos" link={`/${user}/projects`} />
                        <SideBarButton icon={<IconGroups />} text="Grupos" fnClick={() => setModalGroups(true)} />
                        <If condition={project != undefined}>
                            <SideSecondary setModalPages={setModalPages} user={user} project={project} />
                        </If>
                    </div>
                    <div className="w-full h-1/4 flex flex-col justify-end items-center" >

                        <div className="w-full h-14 cursor-pointer  border-b-2 border-primary-opacity dark:border-secondary-opacity
                    flex flex-row items-center px-6 hover:brightness-90 bg-white dark:bg-modal-grey" onClick={() => setWantLeave(true)}>
                            <div className="w-1/3 h-full flex justify-center items-center">
                                <IconLogout />
                            </div>
                            <p className="p">Logout</p>
                        </div>

                    </div>
                </>
            </If>
            <SideModal condition={modalPages && project != undefined} setCondition={setModalPages}>
                <PageSide setModalPages={setModalPages} user={user} project={project!} />
            </SideModal>

            <SideModal condition={modalGroups && project != undefined} setCondition={setModalGroups}>
                <GroupSide setModalGroups={setModalGroups} user={user} project={project!} />
            </SideModal>
        </>)
}