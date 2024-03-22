

import Link from "next/link";
import { ProjectComponent } from "./";
import { Project } from "@/models";

export const ProjectsMainPage = ({projects, user}:{projects:Project[], user:string}) => {

  return (
    <div className="w-2/3 lg:w-1/3 flex flex-col gap-5 lg:h-[70vh]">
      <div className="w-full flex justify-center h-min p-2">
        <Link href={"./projects"} className="w-full">
          <button className="bg-primary dark:bg-secondary w-full h-24 shadow-blur-10 text-contrast h4 rounded-md">
            PROJETOS
          </button>
        </Link>
      </div>
      <div className="w-full lg:h-full p-2 hidden lg:flex overflow-scroll none-scrollbar  flex-wrap gap-6">
        {projects.map((p) => {
          return <ProjectComponent project={p} key={p.id} user={user} />;
        })}
      </div>
    </div>
  );
};
