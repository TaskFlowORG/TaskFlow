
import { Project } from "@/models";
import {  useState } from "react";
import { If } from "../If";
import { archiveToSrc } from "@/functions";
import { Button } from "../Button";
import { SideMain } from "./components";
import { CenterModal } from "../Modal";

interface Props {
    user: string;
    project?: Project;
}
export const SideBarProjects = ({ user, project }: Props) => {

    const [modalPages, setModalPages] = useState(false);
    const [modalGroups, setModalGroups] = useState(false);
    const [wantLeave, setWantLeave] = useState(false);
    const src = archiveToSrc(project?.picture!)
    const leave = () => { }
    return (
            <div className='h-full flex  w-[31rem] relative '>
                <div className='flex flex-col gap-14 pt-14 h-full p-4  bg-white shadow-blur-10 w-96 px-16' >
                    <div className="w-full h-1  text-primary font-alata decoration-solid">
                        <If condition={modalGroups}>
                            <span className="flex gap-2" onClick={() => setModalGroups(false)}>
                                <span className="hover:underline cursor-pointer">
                                    Main
                                </span>
                                /
                                <span className="underline">
                                    Groups
                                </span>
                            </span>
                            <If condition={modalPages}>
                                <span className="flex gap-2" onClick={() => setModalPages(false)}>
                                    <span className="hover:underline cursor-pointer">
                                        Main
                                    </span>
                                    /
                                    <span>
                                        Pages
                                    </span>
                                </span>
                            </If>
                        </If>
                    </div>
                    <If condition={project != undefined}>
                        <div className="w-full h-16 flex items-center justify-around rounded-md">
                            <If condition={src != ""}>
                                <img src={src} />
                                <div className="bg-zinc-200 w-16 h-16 rounded-md"></div>
                            </If>
                            <div>
                                <p className="h4 text-primary truncate" style={{ opacity: project?.name ? 1 : 0.5 }}>{project?.name ?? "Sem nome"}</p>
                                <p className="p text-modal-grey truncate" style={{ opacity: project?.description ? 1 : 0.5 }}>{project?.description ?? "Sem descrição"}</p>
                            </div>
                        </div>
                        <div className="w-full h-16 flex items-center justify-between">
                            <img src="/Assets/logo/IconLight.svg" alt="logo" className="w-20 h-20" />
                            <div>
                                <p className="text-3xl font-alata text-primary truncate">Task Flow</p>
                            </div>
                        </div>
                    </If>
                    <SideMain setModalGroups={setModalGroups} modalGroups={modalGroups} setModalPages={setModalPages}
                        modalPages={modalPages} setWantLeave={setWantLeave} user={user} project={project} />
  
                        <CenterModal condition={wantLeave} setCondition={setWantLeave} >

                                <h4 className="h4 text-primary flex-wrap w-3/4 text-center">Você tem certeza de que deseja sair de sua conta?</h4>
                                <div className="w-3/4 flex justify-between">
                                    <Button width="w-min" text="Cancelar" fnButton={() => setWantLeave(false)} />
                                    <Button width="w-min" fnButton={leave} secondary />
                                </div>
                        </CenterModal>
                </div>

            </div>


    )

}