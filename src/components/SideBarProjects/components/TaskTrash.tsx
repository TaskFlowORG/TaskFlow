import { Action, Task } from "@/models"
import { taskService } from "@/services"
import { useState } from "react"
import { If } from "../../If"
import { Button } from "../../Button"

interface Props {
    task: Task
    userId: string
}

export const TaskTrash = ({ task, userId }: Props) => {

    const [modalDelete, setModalDelete] = useState(false)


    const [user] = useState(task.logs.find(l => l.action == Action.DELETE)?.user)
    const deleteTask = () => {
        taskService.deletePermanent(task.id)
    }
    const redo = () => {
        taskService.redo(task.id, userId)
    }

    return (
        <>
            <div className="flex justify-between gap-3 items-center z-50 w-full">
                <button className="bg-primary dark:bg-secondary cursor-pointer min-w-[2rem] min-h-[2rem] rounded-md" onClick={() => setModalDelete(true)}>E</button>
                <div className="truncate  h-full w-min flex items-center cursor-default"
                    title={`Tarefa ${task.name ?? '"Sem Nome"'} foi exluida por "${user?.name}"`}>
                    <span className="truncate h-full w-min">

                        Tarefa {task.name ?? '"Sem Nome"'} foi exluida por {`"${user?.name}"`}
                    </span>
                </div>
                <button className="bg-primary dark:bg-secondary cursor-pointer min-w-[2rem] min-h-[2rem] rounded-md" onClick={redo}>R</button>
            </div>
            <If condition={modalDelete}>
                <>

                    <div className="fixed top-0 right-0 bottom-0 z-[60] bg-white opacity-40 left-0 cursor-default" onClick={() => setModalDelete(false)}
                        onMouseOver={e => e.stopPropagation()} >
                    </div>
                    <div className="fixed bg-white shadow-blur-10 top-1/2 -translate-x-1/2 flex-col  gap-16
                                -translate-y-1/2 left-1/2 z-[60] rounded-md w-[35rem] h-80 flex justify-center items-center">
                        <h4 className="h4 text-primary dark:text-secondary flex-wrap w-3/4 text-center">Você tem certeza de que deseja deletar essa tarefa permanentemente?</h4>
                        <div className="flex justify-between w-3/4">
                            <Button text="Cancelar" width="w-min" fnButton={() => setModalDelete(false)} />
                            <Button text="Excluir" width="w-min" secondary fnButton={deleteTask} />
                        </div>
                    </div>
                </>
            </If>
        </>
    )
}