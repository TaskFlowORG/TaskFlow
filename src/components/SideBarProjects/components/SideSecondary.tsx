

import { If } from "@/components/If"
import { TaskTrash } from "@/components/TaskTrash";
import { IconDashboard, IconPages, IconTrashBin } from "@/components/icons"
import { Project, Task } from "@/models";
import { taskService } from "@/services";
import Link from "next/link"
import { useEffect, useState } from "react";

interface Props{
    user: string;
    project?: Project;
    setModalPages: (value: boolean) => void;
}

export const SideSecondary = ({user, project, setModalPages}:Props) => {

    const [tasksTrash, setTasksTrash] = useState<Task[]>([]);
    const [modalTrash, setModalTrash] = useState(false);
    useEffect(() => {
        if (!project || !modalTrash) return
        (async () => {
            const tasks = await taskService.getDeletedTasks(project?.id!)
            setTasksTrash(tasks)
        })()
    }, [modalTrash])
    return (
        <>
            <Link className="w-full h-14  border-b-2 border-primary flex flex-row items-center px-6 hover:brightness-90 bg-white"
                href={`${user}/${project?.id}`}>
                <div className="w-1/4 h-full flex justify-center items-center">
                    <IconDashboard />
                </div>
                <p className="p">Dashboard</p>
            </Link>
            <div className="w-full h-14  border-b-2 border-primary flex flex-row items-center px-6 hover:brightness-90 bg-white"
                onClick={() => setModalPages(true)}>
                <div className="w-1/4 h-full flex justify-center items-center">
                    <IconPages />
                </div>
                <p className="p">Páginas</p>
            </div>
            <div className="w-full h-14  border-b-2 border-primary relative flex flex-row items-center px-6 hover:brightness-90 bg-white"
                onClick={() => setModalTrash(true)}>
                <div className="w-1/4 h-full flex justify-center items-center">
                    <IconTrashBin />
                </div>
                <p className="p">Lixeira</p>
            </div>
            <If condition={modalTrash && project != undefined}>
                <>
                    <div className="fixed top-0 right-0 bottom-0 z-40 left-0 cursor-default" onClick={() => setModalTrash(false)}
                        onMouseOver={e => e.stopPropagation()} >
                    </div>
                    <div className="absolute bg-white shadow-blur-10 top-72 flex rounded-md right-[-25rem] w-96 max-h-56 p-4">
                        <If condition={tasksTrash.length == 0}>
                            <div className="flex items-center justify-center h-full text-primary h5">
                                <p className="p flex flex-wrap text-center items-center h-min w-3/4 ">
                                    Parece que esse projeto não tem tarefas excluídas
                                </p>
                            </div>
                            <div className="flex overflow-y-auto flex-col gap-4 ">
                                {tasksTrash.map((task, index) => {
                                    console.log("task", task)
                                    return (
                                        <div key={task.id} className="flex flex-col gap-4">
                                            <TaskTrash task={task} userId={user} />
                                            <If condition={index < tasksTrash.length - 1}>
                                                <div className="bg-zinc-200 w-3/4 h-1 self-center"></div>
                                            </If>
                                        </div>
                                    )
                                }
                                )}
                            </div>
                        </If>
                    </div>
                </>
            </If>
        </>
    )
}