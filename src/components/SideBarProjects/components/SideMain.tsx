
import { If } from "@/components/If"
import { IconBurguerList, IconGroups, IconLogout, IconProjects } from "@/components/icons"
import { Project } from "@/models";
import Link from "next/link"
import { PageSide, SideSecondary } from "./";
import { SideModal } from "@/components/Modal";

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
                    <Link href={`/${user}/initial-page`} className="w-full h-14 cursor-pointer  border-b-2 border-primary-opacity dark:border-secondary-opacity  flex flex-row items-center px-6 hover:brightness-90 bg-white dark:bg-modal-grey">
                        <div className="w-1/4 h-full flex justify-center items-center">
                            <IconBurguerList />
                        </div>
                        <p className="p">Página Inicial</p>
                    </Link>
                    <Link href={`/${user}/projects`} className="w-full h-14 cursor-pointer  border-b-2 border-primary-opacity dark:border-secondary-opacity flex flex-row items-center px-6 hover:brightness-90 bg-white dark:bg-modal-grey">
                        <div className="w-1/4 h-full flex justify-center items-center">
                            <IconProjects />
                        </div>
                        <p className="p">Projetos </p>
                    </Link>
                    <div className="w-full h-14 cursor-pointer  border-b-2 border-primary-opacity dark:border-secondary-opacity flex flex-row items-center px-6 hover:brightness-90 bg-white dark:bg-modal-grey"
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
                <PageSide setModalPages={setModalPages}  user={user} project={project!} />
            </SideModal>
        </>)
}