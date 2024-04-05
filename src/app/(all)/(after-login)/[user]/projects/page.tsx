"use client";

import { ProjectComponent } from "@/components/InitialAndProjectsPage";
import { SVGProjectsPage } from "@/components/Shapes";
import { getData, getListData } from "@/services/http/api";
import { Project, ProjectPost, ProjectSimple, User } from "@/models";
import { useContext, useEffect, useState } from "react";
import { projectService, userService } from "@/services";
import { useRouter } from "next/navigation";
import { ProjectsContext } from "@/contexts";

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
      setUser(await userService.findLogged());
    })()
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
    projects?.forEach((project) => {
      listOfLists[count].push(project);
      count = count === quantity - 1 ? 0 : count + 1;
    });
    setListOfLists(listOfLists);
  };

  const postProject = async () => {
    const newProject = await projectService.insert(
      new ProjectPost(undefined, undefined )
    );
      const projectsTemp = [...projects!];
      projectsTemp.push(newProject);
      setProjects!(projectsTemp);

    router.push(`/${params.user}/${newProject.id}`);
  };
  // separar em tres, duas e uma lista vai ser a melhor opção, cansei de me estressar com isso, vou fazer isso depois

  return (
    <div className="h-[99vh] flex flex-col justify-center items-center w-screen">
      <SVGProjectsPage />
      <div className=" flex flex-col gap-6 items-center justify-center w-full h-full">
        <div className="flex items-center flex-col w-full h-4/5">
          <h1 className="h2 sm:text-[68px] sm:w-3/5 w-full stroke-text-white text-center px-6 lg:text-start text-white lg:stroke-text-white lg:text-primary dark:lg:text-white">
            Projetos
          </h1>
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
