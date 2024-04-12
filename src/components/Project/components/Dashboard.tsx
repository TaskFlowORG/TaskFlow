import { useTranslation } from "next-i18next";
import { FeaturedUser } from "./FeaturedUser";
import { useContext, useEffect, useState } from "react";
import { ProjectContext } from "@/contexts";
import { SimpleGroup } from "@/models/user/group/SimpleGroup";
import { Group } from "@/models";
import { groupService, projectService } from "@/services";
import { TasksProgress } from "./TasksProgress";
import { SelectPropertiesSection } from "./SelectPropertiesSection";
import { TasksDate } from "./TasksDate";
import { PermissionsAndCalendar } from "./PermissionsAndCalendar";

export const Dashboard = () => {
  const { t } = useTranslation();
  const { project } = useContext(ProjectContext);
  const [groups, setGroups] = useState<Group[]>([]);
  useEffect(() => {
    (async () => {
      if (!project) return;
      const groups = await groupService.findGroupsByAProject(project.id);
      setGroups(groups);
    })();
  }, [project]);
  return (
    <div className="w-full  h-full  none-scrollbar overflow-y-auto sm:flex px-6 py-1  md:p-6 gap-4 ">
      <div className="w-full h-min md:h-full  md:mr-4  sm:mr-[9.8rem] gap-4 flex flex-col md:flex-row">
        <div className="w-full md:w-2/5  flex gap-4 flex-col h-min md:h-full">
          <FeaturedUser />
          <div className="flex flex-col w-full h-1/5   ">
            <span className="flex gap-4 items-start w-full h-full">
              <div className="shadow-blur-10 flex flex-col gap-2 justify-center items-center h-40 md:h-full w-full rounded-md">
                <h5 className=" leading-none p font-semibold  text-primary dark:text-secondary">
                  {t("pages")}
                </h5>
                <p className="text-[36px] h-min leading-none font-alata text-primary">{project?.pages.length}</p>
              </div>
              <div className="shadow-blur-10 flex flex-col justify-center gap-2 items-center h-40 md:h-full w-full rounded-md">
                <h5 className=" leading-none p font-semibold text-primary dark:text-secondary">
                  {t("groups")}
                </h5>
                <p className="text-[36px] h-min leading-none font-alata text-primary">{groups.length}</p>
              </div>
            </span>
          </div>
            <TasksProgress />
        </div>
        <div className="h-full md:w-3/5 gap-4 flex flex-col">
          <SelectPropertiesSection />
          <TasksDate />
        </div>
      </div>
      <PermissionsAndCalendar />
    </div>
  );
};
