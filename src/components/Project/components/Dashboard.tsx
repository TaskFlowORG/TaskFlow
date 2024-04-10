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
    <div className="w-[85vw] h-full flex p-6  gap-4 flex-wrap">
      <div>
        <FeaturedUser />
        <span className="flex gap-4">
          <div className="shadow-blur-10 w-32 h-32 rounded-md">
            <h5 className=" h5 text-primary dark:text-secondary">
              {t("pages")}
            </h5>
            <p>{project?.pages.length}</p>
          </div>
          <div className="shadow-blur-10 w-32 h-32 rounded-md">
            <h5 className=" h5 text-primary dark:text-secondary">
              {t("groups")}
            </h5>
            <p>{groups.length}</p>
          </div>
        </span>
        <TasksProgress />
      </div>
      <div className="h-full flex flex-col gap-2">

      <SelectPropertiesSection />
      <TasksDate />
      </div>
      <PermissionsAndCalendar />
    </div>
  );
};
