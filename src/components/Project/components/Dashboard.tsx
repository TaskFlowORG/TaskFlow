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
    <div className="w-full  h-full  none-scrollbar overflow-y-auto sm:flex  p-6 gap-4 ">
      <div className="w-full h-min  sm:mr-[9.8rem] gap-4 flex flex-col md:flex-row">
        <div className="w-full  flex gap-4 flex-col h-full">
          <FeaturedUser />
          <div className="flex gap-4 flex-col w-full h-1/2">
            <span className="flex gap-4 items-start w-full max-h-[50%] h-min">
              <div className="shadow-blur-10 h-full aspect-square w-full rounded-md">
                <h5 className=" h5 text-primary dark:text-secondary">
                  {t("pages")}
                </h5>
                <p>{project?.pages.length}</p>
              </div>
              <div className="shadow-blur-10 h-full aspect-square w-full rounded-md">
                <h5 className=" h5 text-primary dark:text-secondary">
                  {t("groups")}
                </h5>
                <p>{groups.length}</p>
              </div>
            </span>
            <TasksProgress />
          </div>
        </div>
        <div className="h-full w-full md:w-5/6 gap-4 flex flex-col">
          <SelectPropertiesSection />
          <TasksDate />
        </div>
      </div>
      <PermissionsAndCalendar />
    </div>
  );
};
