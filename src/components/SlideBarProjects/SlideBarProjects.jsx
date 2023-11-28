import { IconProjects } from "../icons/Slidebarprojects";
import { IconDashboard } from "../icons/Slidebarprojects";
import { IconMyTasks } from "../icons/Slidebarprojects";
import { IconBurguerList } from "../icons/Slidebarprojects";
import { IconGroups } from "../icons/Slidebarprojects";
import { IconPages } from "../icons/Slidebarprojects";
import { IconProjectP } from "../icons/Slidebarprojects";
import { IconTrashBin } from "../icons/Slidebarprojects";
import { IconLogout } from "../icons/Slidebarprojects";

export const SlideBarProjects = () => {


    return (
        <>
            <div className="h-full w-[20%] flex justify-center items-center shadow-blur-10">
                <div className="h-[95%] w-[90%] flex flex-col justify-center items-center">
                    <div className="w-full h-1/4 flex items-center justify-around">
                        <div className="h-1/3 w-1/5  bg-modal-grey rounded-md"></div>
                        <div>
                            <p className="h4 text-primary">Nome do projeto</p>
                            <p className="p text-modal-grey">Início da descrição...</p>
                        </div>
                    </div>
                    <div className="w-full h-2/4 flex flex-col items-center">
                        <div className="w-[60%] h-1/4  border-b-2 border-primary flex flex-row items-center">
                            <div className="w-1/4 h-full flex justify-center items-center">
                                <IconBurguerList></IconBurguerList>
                            </div>

                            <p className="p">Página Inicial</p>
                        </div>
                        <div className="w-[60%] h-1/4  border-b-2 border-primary flex flex-row items-center">
                            <div className="w-1/4 h-full flex justify-center items-center">
                                <IconProjects></IconProjects>
                            </div>

                            <p className="p">Projetos </p>
                        </div>
                        <div className="w-[60%] h-1/4  border-b-2 border-primary flex flex-row items-center">
                            <div className="w-1/4 h-full flex justify-center items-center">
                                <IconProjectP></IconProjectP>
                            </div>

                            <p className="p">Projeto pessoal</p>
                        </div>
                        <div className="w-[60%] h-1/4  border-b-2 border-primary flex flex-row  items-center">
                            <div className="w-1/4 h-full flex justify-center items-center">
                                <IconMyTasks></IconMyTasks>
                            </div>

                            <p className="p">Minhas Tarefas</p>
                        </div>
                        <div className="w-[60%] h-1/4  border-b-2 border-primary flex flex-row  items-center">
                            <div className="w-1/4 h-full flex justify-center items-center">
                                <IconDashboard></IconDashboard>
                            </div>

                            <p className="p">Dashboard</p>
                        </div>
                        <div className="w-[60%] h-1/4  border-b-2 border-primary flex flex-row  items-center">
                            <div className="w-1/4 h-full flex justify-center items-center">
                                <IconPages></IconPages>
                            </div>

                            <p className="p">Páginas</p>
                        </div>
                        <div className="w-[60%] h-1/4  border-b-2 border-primary flex flex-row  items-center">
                            <div className="w-1/4 h-full flex justify-center items-center">
                                <IconGroups></IconGroups>
                            </div>

                            <p className="p">Grupos</p>
                        </div>
                        <div className="w-[60%] h-1/4  border-b-2 border-primary flex flex-row items-center">
                            <div className="w-1/4 h-full flex justify-center items-center">
                                <IconTrashBin></IconTrashBin>
                            </div>

                            <p className="p">Lixeira</p>
                        </div>
                    </div>
                    <div className="w-full h-1/4 flex flex-col justify-end items-center">


                        <div className="w-[60%] h-1/4  border-b-2 border-primary flex flex-row items-center">
                            <div className="w-1/4 h-full flex justify-center items-center">
                               <IconLogout></IconLogout>
                            </div>

                            <p className="p">Logout</p>
                        </div>
                    </div>
                </div>

            </div>

        </>

    )

}