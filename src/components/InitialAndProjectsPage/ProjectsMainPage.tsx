

import Link from "next/link";
import { ProjectComponent } from "./";
import { Project, ProjectSimple } from "@/models";
import { useTranslation } from "next-i18next";

export const ProjectsMainPage = ({projects, user}:{projects?:ProjectSimple[], user:string}) => {

  const {t} = useTranslation()

  return (
    <div className=" w-2/3 lg:w-1/3 flex flex-col gap-5 lg:h-[70vh]">
      <div className="w-full flex justify-center h-min p-2">
        <Link href={`/home/projects`} className="w-full">
          <button className="bg-primary projects-initial-page-button dark:bg-secondary w-full h-24 shadow-blur-10 text-contrast text-h4 font-alata rounded-md">
            {t("projects").toUpperCase()}
          </button>
        </Link>
      </div>
      <div className="w-full projects-initial-page lg:h-full p-2 hidden  lg:flex overflow-scroll none-scrollbar  flex-col gap-6">
        {projects?.sort((p1, p2) => new Date(p2.visualizedAt).getTime()- new Date(p1.visualizedAt).getTime()).map((p) => {
          return <ProjectComponent project={p} key={p.id} user={user} />;
        })}
      </div>
    </div>
  );
};
