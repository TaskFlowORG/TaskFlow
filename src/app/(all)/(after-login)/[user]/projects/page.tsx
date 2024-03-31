"use client";

import { ProjectComponent } from "@/components/InitialAndProjectsPage";
import { SVGProjectsPage } from "@/components/Shapes";
import { getData, getListData } from "@/services/http/api";
import { Project, ProjectPost, ProjectSimple, User } from "@/models";
import { useContext, useEffect, useState } from "react";
import { projectService, userService } from "@/services";
import { useRouter } from "next/navigation";
import { ProjectsContext } from "@/contexts";
import { LocalModal } from "@/components/Modal";
import { RangeInput } from "@/components/RangeInput";
import { InputNumber } from "@/components/Properties/InputNumber";

export default function Projects({ params }: { params: { user: string } }) {
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const { projects, setProjects } = useContext(ProjectsContext);
  const [user, setUser] = useState<User>();
  const [listOfLists, setListOfLists] = useState<ProjectSimple[][]>([]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
      generateList(projects);
    });
    setWindowWidth(window.innerWidth);
    generateList(projects);
    (async () => {
      setUser(await userService.findByUsername(params.user));
    })();
    // eslint-disable-next-line
  }, [projects]);

  useEffect(() => {
    generateList(projects);
    // eslint-disable-next-line
  }, [windowWidth]);

  const generateList = (projects?: ProjectSimple[]) => {
    const listOfLists: ProjectSimple[][] = [];
    const quantity =
      window.innerWidth > 1440 ? 3 : window.innerWidth > 1024 ? 2 : 1;
    for (let i = 0; i < quantity; i++) {
      listOfLists.push([]);
    }
    let count = 0;
    console.log(projects);
    projects
      ?.filter((p) => {
        const progressIsOk = progress < 0 || p.progress >= progress;
        const ownerIsOk = isOwner === undefined || isOwner && p.owner?.username === user?.username || !isOwner && p.owner?.username !== user?.username;
        return progressIsOk && ownerIsOk;
      })
      .forEach((project) => {
        listOfLists[count].push(project);
        count = count === quantity - 1 ? 0 : count + 1;
      });
    setListOfLists(listOfLists);
  };

  const postProject = async () => {
    const newProject = await projectService.insert(
      new ProjectPost(undefined, undefined, undefined, user!)
    );
    const projectsTemp = [...projects!];
    projectsTemp.push(newProject);
    setProjects!(projectsTemp);

    router.push(`/${params.user}/${newProject.id}`);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [progress, setProgress] = useState(-1);
  const [isOwner, setIsOwner] = useState<boolean>();

  const cleanFilter = () => {
    setProgress(-1);
  };

  useEffect(() => {
    generateList(projects);
  }, [progress, isOwner]);
  return (
    <div className="h-[99vh] flex flex-col justify-center items-center w-screen">
      <SVGProjectsPage />
      <div className=" flex flex-col gap-6 items-center justify-center w-full h-full">
        <div className="flex items-center flex-col w-full h-4/5">
          <div className=" w-full justify-between items-center flex sm:text-[68px] sm:w-3/5 stroke-text-white text-center px-6 lg:text-start text-white lg:stroke-text-white lg:text-primary dark:lg:text-white">
            <h1 className="h2">Projetos</h1>
            <div className="w-min h-min relative">
              <div
                className="w-12 h-12 bg-white dark:bg-back-grey rounded-full text-[16px] flex justify-center items-center"
                onClick={() => setIsModalOpen((prev) => !prev)}
              >
                F
              </div>
              <LocalModal
                right
                condition={isModalOpen}
                setCondition={setIsModalOpen}
              >
                <div className="h-72 w-56 p-4 rounded-md text-[16px] overflow-y-auto bg-input-grey dark:bg-modal-grey">
                  <button onClick={cleanFilter}>Limpar</button>
                  <div className="flex flex-col gap-2">
                    <span className="flex justify-between">
                      <p>Progresso</p>
                      <span className="flex gap-1">
                        <input
                          type="number"
                          value={progress < 0 ? 0 : progress}
                          onChange={(e) => setProgress(+e.target.value)}
                          className="w-12 text-end appearance-none"
                        />
                        <p>%</p>
                      </span>
                    </span>
                    <RangeInput
                      range={progress}
                      step={0.01}
                      setRange={setProgress}
                      max={100}
                    />
                  </div>
                  <div>
                    <p>Dono/Membro</p>
                    <input onChange={e => setIsOwner(undefined)} defaultChecked type="radio" name="filterOwner" id="all" />
                    <label htmlFor="all">Todos</label>
                    <input onChange={e => setIsOwner(true)} type="radio" name="filterOwner" id="owner" />
                    <label htmlFor="owner">Dono</label>
                    <input onChange={e => setIsOwner(false)} type="radio" name="filterOwner" id="member" />
                    <label htmlFor="member">Membro</label>
                  </div>
                </div>
              </LocalModal>
            </div>
          </div>
          <div className="w-full lg:w-3/5 h-[70vh] flex justify-center none-scrollbar overflow-y-scroll">
            <div
              className={
                "justify-start flex p-6 px-12 smm:px-24 sm:px-6 gap-x-12  h-full w-full  sm:w-1/2 lg:w-full "
              }
            >
              {listOfLists.map((list, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col gap-5 h-full w-full"
                  >
                    {list.map((p) => {
                      return (
                        <ProjectComponent
                          user={params.user}
                          project={p}
                          key={p.id}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={postProject}
        className="rounded-full fixed bottom-10 right-10 w-10  h-10 flex justify-center items-center shadow-blur-10 bg-white 
            text-primary dark:bg-modal-grey dark:text-secondary hover:brightness-95 cursor-pointer"
      >
        +
      </button>
    </div>
  );
}
