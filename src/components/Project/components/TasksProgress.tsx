import { Loading } from "@/components/Loading";
import { ProjectContext } from "@/contexts";
import { useTranslation } from "next-i18next";
import { useContext } from "react";

export const TasksProgress = () => {
  const { t } = useTranslation();
  const { project } = useContext(ProjectContext);
  if (!project) return <Loading />;
  const tasks = project?.pages.map((page) => page.tasks).flat().length;
  const completed = project.pages.flatMap((page) => page.tasks).filter((task) => task.task.completed).length;
  const percentage = (completed / tasks) * 100;
  return (
    <div className="h-2/5 w-full  shadow-blur-10 roudedn-md p-4">
      <h5 className=" h5 text-primary h-9 dark:text-secondary">
        {t("tasks-progress")}
      </h5>
      <div className="flex flex-col justify-center w-full pb-9 h-full">
        <span className="w-full text-center">
          {(tasks == 0 && completed == 0 ? 100 : percentage).toFixed(2)}%
        </span>
        <div className="flex h-min items-center gap-4">
          {completed}
          <span className="w-full h-8 rounded-md overflow-clip shadow-blur-10 flex">
            <div
              className="bg-primary dark:bg-secondary"
              style={{
                width: `${tasks == 0 && completed == 0 ? 100 : percentage}%`,
              }}
            />
            <div
              className="bg-whtie dark:bg-back-grey w-full"
              style={{
                width: `${tasks == 0 && completed == 0 ? 0 : 100 - percentage}`,
              }}
            />
          </span>
          {tasks}
        </div>
      </div>
    </div>
  );
};
