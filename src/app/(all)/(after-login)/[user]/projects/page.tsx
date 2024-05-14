"use client";

import {
  FilterProject,
  ProjectComponent,
} from "@/components/InitialAndProjectsPage";
import { SVGProjectsPage } from "@/components/Shapes";
import { Archive, PermissionPost, Project, ProjectPost, ProjectSimple, TypeOfProperty, TypePermission, User } from "@/models";
import { useContext, useEffect, useState } from "react";
import { permissionService, projectService } from "@/services";
import { useRouter } from "next/navigation";
import { ProjectsContext } from "@/contexts";
import { LocalModal } from "@/components/Modal";
import { useTranslation } from "next-i18next";
import { UserContext } from "@/contexts/UserContext";
import { SearchBar, SearchIcon } from "@/components/SearchBar";
import { IconFilter } from "@/components/icons/OptionsFilter/Filter";
import { IconPlus } from "@/components/icons/GeneralIcons/IconPlus";
import { FilterContext } from "@/utils/FilterlistContext";

export default function Projects({ params }: { params: { user: string } }) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState<string>("");
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const { projects, setProjects } = useContext(ProjectsContext);
  const { user } = useContext(UserContext);
  const [listOfLists, setListOfLists] = useState<ProjectSimple[][]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
      generateList(projects);
    });
    setWindowWidth(window.innerWidth);
    generateList(projects);
    // eslint-disable-next-line
  }, [projects]);

  useEffect(() => {
    generateList(projects);
    // eslint-disable-next-line
  }, [windowWidth, search]);

  const generateList = (projects?: ProjectSimple[]) => {
    const listOfLists: ProjectSimple[][] = [];
    const quantity =
      window.innerWidth > 1440 ? 3 : window.innerWidth > 1024 ? 2 : 1;
    for (let i = 0; i < quantity; i++) {
      listOfLists.push([]);
    }
    let count = 0;
    projects?.filter(p => searchProject(p)).forEach((project) => {
      listOfLists[count].push(project);
      count = count === quantity - 1 ? 0 : count + 1;
    });
    setListOfLists(listOfLists);
  };

  const searchProject = (project: ProjectSimple) => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return (
      project.name?.toLowerCase().includes(searchLower) ||
      project.description?.toLowerCase().includes(searchLower)
    );
  }

  const postProject = async () => {
    projectService.insert(
      new ProjectPost(undefined, undefined)
    ).then(async (newProject) => {
      const permission = new PermissionPost("", TypePermission.READ, true, newProject);
      console.log(permission);
      await permissionService.insert(permission, newProject.id)
      const projectsTemp = [...projects!];
      projectsTemp.push(newProject);
      setProjects!(projectsTemp);
      router.push(`/${params.user}/${newProject.id}`);
    });
  };

  return (
    <div className="h-[99vh] projects-page flex flex-col justify-center items-center w-screen">
      <SVGProjectsPage />
      <div className=" flex flex-col gap-6 items-center justify-center w-full h-full">
        <div className="flex items-center flex-col w-full h-4/5">
          <div className=" w-full justify-between items-center flex sm:text-[68px] sm:w-3/5  text-center px-6 lg:text-start text-white lg:stroke-text-white lg:text-primary dark:lg:text-white">
            <h1 className="text-h1 font-alata stroke-text-white w-min">{t("projects")}</h1>
            <div className="w-full h-14 text-[16px] flex justify-end items-center gap-2 relative">
              <FilterContext.Provider
                value={{
                  input: search,
                  setInput: setSearch,
                }}
              >
                <SearchBar search={true} invert />
              </FilterContext.Provider>
              <div className="w-min relative h-min">

                <div
                  className="w-12 h-12 p-3 cursor-pointer bg-contrast aspect-square  rounded-full flex justify-center items-center"
                  onClick={() => setIsModalOpen((prev) => !prev)}
                >
                  <IconFilter classes="text-primary dark:text-secondary" />
                </div>
                <LocalModal
                  right
                  condition={isModalOpen}
                  setCondition={setIsModalOpen}
                >
                  <FilterProject
                    projects={projects}
                    generateList={generateList}
                  />
                </LocalModal>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-3/5 h-[70vh] flex justify-center none-scrollbar overflow-y-scroll">
            <div
              className={
                "justify-start flex p-6 px-12 smm:px-24 sm:px-6 gap-x-12  h-full w-full  sm:w-3/5 lg:w-full "
              }
            >
              {listOfLists.map((list, index) => {
                return (
                  <div key={index} className="flex flex-col gap-5 h-full w-full lg:w-1/2 :w-1/3">
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
        className="rounded-full fixed bottom-16 right-16 w-10 p-3 rotate-45  h-10 flex justify-center items-center shadow-blur-10 bg-contrast 
            text-primary  dark:text-secondary hover:brightness-95 cursor-pointer"
      >
        <IconPlus />
      </button>
    </div>
  );
}
