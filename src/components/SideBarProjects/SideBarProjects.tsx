
import { Project } from "@/models";
import { useState } from "react";
import { If } from "../If";
import { archiveToSrc } from "@/functions";
import { Button } from "../Button";
import { SideMain } from "./components";

interface Props {
    user: string;
    project?: Project;
}
export const SideBarProjects = ({ user, project }: Props) => {


    const [wantLeave, setWantLeave] = useState(false);
    const src = archiveToSrc(project?.picture!)
    const leave = () => {}
    return (
        <div className='flex fixed z-50 h-full left-0 '>
            <div className='h-full flex  w-[31rem] relative '>
                <div className='flex flex-col gap-14 pt-14 h-full p-4  bg-white shadow-blur-10 w-96 px-16' >
            <div className="bg-red-300 w-1 h-1"></div>
                    <If condition={project != undefined}>
                        <div className="w-full h-16 flex items-center justify-around rounded-md">
                            <If condition={src != ""}>
                                <img src={src}/>
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
                    <SideMain setWantLeave={setWantLeave} user={user} project={project}/>
                    <If condition={wantLeave && project != undefined}>
                        <>
                            <div className="fixed top-0 right-0 bottom-0 z-40 bg-white opacity-40 left-0 cursor-default" onClick={() => setWantLeave(false)}
                                onMouseOver={e => e.stopPropagation()} >
                            </div>
                            <div className="fixed bg-white shadow-blur-10 top-1/2 -translate-x-1/2 flex-col gap-16
                                -translate-y-1/2 left-1/2 z-50 rounded-md w-[35rem] h-80 flex justify-center items-center">
                                <h4 className="h4 text-primary flex-wrap w-3/4 text-center">Você tem certeza de que deseja sair de sua conta?</h4>
                                <div className="w-3/4 flex justify-between">
                                    <Button width="w-min" text="Cancelar" fnButton={() => setWantLeave(false)} />
                                    <Button width="w-min" fnButton={leave} secondary />
                                </div>
                            </div>
                        </>
                    </If>
                </div>

            </div>

        </div>

    )

}