import { useTranslation } from "next-i18next";
import { useContext, useEffect, useRef, useState } from "react";
import { If } from "../If";
import { DashboardSide } from "./components/DashBoardSide";
import { DashboardBottom } from "./components/DashBoardBottom";
import Image from "next/image";
import { ProjectContext, ProjectsContext } from "@/contexts";
import { archiveToSrc } from "@/functions";
import { UserContext } from "@/contexts/UserContext";
import { groupService, projectService, userService } from "@/services";
import { LocalModal } from "../Modal";
import { OtherUser, Project as ProjectModel, ProjectPut } from "@/models";
import { IconRedo } from "../icons";
import { IconEditColoured } from "../icons/PageOtpions/IconEditCoulored";
import { Loading } from "../Loading";
import { TaskModalContent } from "../TaskModal/TaskModalContent";
import { TaskModalWrapper } from "../TaskModal/TaskModalWrapper";

export const Project = () => {
  const { t } = useTranslation();
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const { project, setProject } = useContext(ProjectContext);
  const { user } = useContext(UserContext);
  const [name, setName] = useState<string | undefined>(project?.name);
  const [description, setDescription] = useState<string | undefined>(
    project?.description
  );

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

  const saveName = async () => {
    if (!project || !setProject) return;
    project.name = name;
    const updated = await projectService.patch(
      projectToPutDTO(project),
      project.id
    );
    setProject(updated);
  };

  const projectToPutDTO = (project: ProjectModel) => {
    return new ProjectPut(
      project.id,
      project.name,
      project.description,
      project.comments,
      project.values,
      project.revision
    );
  };

  const saveDescription = async () => {
    if (!project || !setProject) return;
    project.description = description;
    const updated = await projectService.patch(
      projectToPutDTO(project),
      project.id
    );
    setProject(updated);
  };

  const refDescription = useRef<HTMLTextAreaElement>(null);
  const refName = useRef<HTMLInputElement>(null);

  const [changingOwner, setChangingOwner] = useState<boolean>(false);
  const [possibleOwners, setPossibleOwners] = useState<OtherUser[]>([]);

  const updatePicture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!project || !setProject) return;
    const file = e.target.files?.[0];
    if (!file) return;
    const updated = await projectService.updatePicture(file, project.id);
    setProject(updated);
  };

  useEffect(() => {
    (async () => {
      if (!project || !user) return;
      const groups = await groupService.findGroupsByAProject(project?.id);
      let list: OtherUser[] = [];
      for (let group of groups) {
        list.push(await userService.findByUsername(group.ownerUsername));
      }
      setPossibleOwners(
        list.filter((u, index) => list.indexOf(u) === index && u.id !== user.id)
      );
    })();
  }, [project]);
  const updateRevision = async (revision: boolean) => {
    if (!project) return;
    const projectDto = projectToPutDTO(project);
    projectDto.revision = revision;
    projectService.update(projectDto, project.id).then((updated) => {
      if (!setProject) return;
      setProject(updated);
    });
  };

  const [src, setSrc] = useState<string>("/Assets/noImage.png");
  useEffect(() => {
    setSrc(archiveToSrc(project?.picture));
  }, [project]);

  if (!user || !project) return <Loading />;
  return (
    <div className="w-screen project-page h-screen pt-14 items-center  relative flex">
      <div className="w-full h-full flex-col justify-center items-center  py-8 400:flex 400:px-8 sm:px-24 md:px-48">
        <div className="400:h-1/6 w-full justify-center  400:justify-start flex flex-col gap-2 400:flex-row">
          <div className="w-full gap-2 400:gap-4 400:flex-row flex-col items-center flex ">
            <div className="400:h-full h-16 w-16 400:w-auto aspect-square  bg-zinc-400 relative rounded-md">
              <Image
                className="rounded-md"
                src={src}
                alt="Project Picture"
                fill
              />
              <If condition={project?.owner?.id == user?.id}>
                <span
                  className="absolute rounded-full -bottom-2 -right-2 border-2 border-primary 
              dark:border-secondary h-8 w-8 p-1 flex justify-center items-center  bg-white shadow-blur-10 dark:bg-modal-grey"
                >
                  <IconEditColoured />
                  <input
                    onChange={updatePicture}
                    type="file"
                    accept="image/*"
                    className="w-full h-full absolute cursor-pointer opacity-0"
                  />
                </span>
              </If>
            </div>
            <div className="flex flex-col justify-between  white text-center w-2/3 ">
              <input
                ref={refName}
                disabled={project?.owner?.id != user?.id}
                className="bg-transparent w-full text-center text-primary 400:text-start dark:text-secondary rounderd-md text-h4 font-alata"
                style={{ opacity: name ? 1 : 0.5 }}
                type="text"
                value={name ?? t("withoutname")}
                onKeyUp={(e) => e.key == "Enter" && refName.current?.blur()}
                onChange={(e) => setName(e.target.value)}
                onBlur={saveName}
              />
              <textarea
                style={{ opacity: description ? 1 : 0.5, resize: "none" }}
                value={description ?? t("withoutdescription")}
                onChange={(e) => setDescription(e.target.value)}
                onBlur={saveDescription}
                ref={refDescription}
                disabled={project?.owner.id != user?.id}
                className="bg-transparent w-full text-p font-montserrat rounderd-md text-center 400:text-start"
                rows={2}
                cols={2}
              />
            </div>
          </div>
          <div className="400:w-52 w-full gap-2  h-full justify-center smm:justify-end relative  text-h5 font-alata text-modal-grey dark:text-white flex  items-center">
            <span>
              <span className="flex w-full justify-between">

              <p>
                <span className="text-primary dark:text-secondary">
                  {t("owner") + ": "}
                </span>

                {project?.owner?.id == user?.id
                  ? t("you")
                  : project?.owner?.username}
              </p>
            <If condition={project?.owner?.id == user?.id}>
              <span className="relative">
                <LocalModal
                  condition={changingOwner}
                  setCondition={setChangingOwner}
                  right
                >
                  <div className="w-44 h-min max-h-44 bg-white p-3 gap-1 flex flex-col rounded-md overflow-y-auto dark:bg-modal-grey">
                    <If condition={possibleOwners.length > 0}>
                      <div className="w-full h-min overflow-y-auto gap-1 flex flex-col none-scrollbar p-1">
                        {possibleOwners.map((user) => (
                          <button
                          key={user.id}
                          className="text-p14 font-montserrat w-full min-h-10 rounded-md shadow-blur-10"
                          onClick={() =>
                            project &&
                            projectService.updateOwner(user, project.id)
                          }
                          >
                            @{user.username}
                          </button>
                        ))}
                      </div>
                      <p className="w-full h-full flex justify-center font-montserrat text-p items-center text-center">
                        {t("no-possible-users")}
                      </p>
                    </If>
                  </div>
                </LocalModal>
                <button
                  className="p-1 rounded-md bg-primary w-6 h-6 dark:bg-secondary"
                  onClick={() => setChangingOwner(!changingOwner)}
                >
                  <IconRedo />
                </button>
              </span>
        </If>
              </span>
        <If condition={project?.owner.id == user?.id}>
          <span className="self-end w-full whitespace-nowrap smm:w-min justify-center smm:justify-end flex items-center gap-2 h-min ">
            <input
              type="checkbox"
              onChange={(e) => updateRevision(e.target.checked)}
              checked={project.revision}
            />
            {t("revision")}
          </span>

            </If>
      </span>
          </div>
        </div>
          <TaskModalWrapper>
            <TaskModalContent
              task={project}
              user={user}
              isInModal={false}
            />
          </TaskModalWrapper>

        <div className="h-5/6 w-full "></div>
      </div>
      <If condition={windowWidth > 768}>
        <DashboardSide />
        <DashboardBottom />
      </If>
    </div>
  );
};
