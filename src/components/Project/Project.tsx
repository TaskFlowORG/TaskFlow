import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import { useContext, useEffect, useRef, useState } from "react";
import { useClickAway } from "react-use";
import { set } from "zod";
import { Dashboard } from "./components";
import { If } from "../If";
import { DashboardSide } from "./components/DashBoardSide";
import { DashboardBottom } from "./components/DashBoardBottom";
import Image from "next/image";
import { ProjectContext, ProjectsContext } from "@/contexts";
import { archiveToSrc } from "@/functions";
import { UserContext } from "@/contexts/UserContext";
import { groupService, projectService } from "@/services";
import { Button } from "../Button";
import { LocalModal } from "../Modal";
import { OtherUser } from "@/models";
import { EditIcon } from "../icons";
import { IconEditColoured } from "../icons/PageOtpions/IconEditCoulored";
import { log } from "console";

export const Project = () => {
  const { t } = useTranslation();
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const { project, setProject } = useContext(ProjectContext);
  const { projects } = useContext(ProjectsContext);
  const { user } = useContext(UserContext);
  const [name, setName] = useState<string>(project?.name ?? "");
  const [description, setDescription] = useState<string>(
    project?.description ?? ""
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
    const updated = await projectService.patch(project, project.id);
    setProject(updated);
  };

  const saveDescription = async () => {
    if (!project || !setProject) return;
    project.description = description;
    const updated = await projectService.patch(project, project.id);
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
      if (!project) return;
      const groups = await groupService.findGroupsByAProject(project?.id);
      const users = groups.map(async (group) => setPossibleOwners([...possibleOwners, (await groupService.findOne(group.id)).owner]));
    })();
  }, [project]);

  return (
    <div className="w-screen project-page h-screen pt-14 items-center  relative flex">
      <div className="w-full h-full flex-col items-center  py-8 flex  px-48">
        <div className="h-1/6 w-full justify-start flex ">
          <div className="w-full gap-4 flex">
            <div className="h-full aspect-square  bg-zinc-400 relative rounded-md">
              <Image
                className="rounded-md"
                src={archiveToSrc(project?.picture)}
                alt="Project Picture"
                fill
              />
              <If condition={project?.owner.id == user?.id}>
                <span
                  className="absolute rounded-full -bottom-2 -right-2 border-2 border-primary 
              dark:border-secondary h-8 w-8 p-1 flex justify-center items-center  bg-white shadow-blur-10 dark:bg-modal-grey"
                >
                  <IconEditColoured />
                  <input
                    onChange={updatePicture}
                    type="file"
                    className="w-full h-full absolute cursor-pointer opacity-0"
                  />
                </span>
              </If>
            </div>
            <div className="flex flex-col justify-between w-1/3 ">
              <input
                ref={refName}
                disabled={project?.owner.id != user?.id}
                className="bg-transparent w-full outline-none rounderd-md"
                style={{ opacity: name ? 1 : 0.5 }}
                type="text"
                value={name ?? "Sem Nome"}
                onKeyUp={(e) => e.key == "Enter" && refName.current?.blur()}
                onChange={(e) => setName(e.target.value)}
                onBlur={saveName}
              />
              <textarea
                style={{ opacity: description ? 1 : 0.5, resize: "none" }}
                value={description ?? "Sem Descrição"}
                onChange={(e) => setDescription(e.target.value)}
                onBlur={saveDescription}
                ref={refDescription}
                disabled={project?.owner.id != user?.id}
                className="bg-transparent w-full outline-none rounderd-md"
                rows={2}
                cols={2}
              />
            </div>
          </div>
          <div className="w-52  h-full justify-center relative flex flex-col items-center">
            <p>
              <span className="text-primary dark:text-secondary text-[20px]">
                {t("owner") + ": "}
              </span>

              {project?.owner.id == user?.id
                ? t("you")
                : project?.owner.username}
            </p>
            <If condition={project?.owner.id == user?.id}>
              <span className="relative">
                <LocalModal
                  condition={changingOwner}
                  setCondition={setChangingOwner}
                >
                  <div className="w-44 h-44 bg-white p-4 rounded-md dark:bg-modal-grey">
                    <If condition={possibleOwners.length > 0}>
                      <ul>
                        {possibleOwners.map((user) => (
                          <button key={user.id} onClick={() => project && projectService.updateOwner(user, project.id)}>{user.username}</button>
                        ))}                 
                      </ul>
                      <p className="w-full h-full flex justify-center items-center text-center">
                        {t("no-possible-users")}
                      </p>
                    </If>
                  </div>
                </LocalModal>
                <Button
                  text={t("change-owner")}
                  padding="p-2"
                  paddingY="py-1"
                  textSize="text-[16px]"
                  fnButton={() => setChangingOwner(!changingOwner)}
                />
              </span>
            </If>
          </div>
        </div>
        <div className="h-5/6 w-full "></div>
      </div>
      <If condition={windowWidth > 768}>
        <DashboardSide />
        <DashboardBottom />
      </If>
    </div>
  );
};
