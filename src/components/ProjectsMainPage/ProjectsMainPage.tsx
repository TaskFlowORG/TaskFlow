"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ProjectComponent } from "../Project";
import { Project } from "@/models";

export const ProjectsMainPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    //Consumir api
    setProjects([]);
  }, []);

  return (
    <div className="w-2/3 lg:w-1/3 flex flex-col gap-5 h-[70vh]">
      <div className="w-full flex justify-center h-min p-2">
        <Link href={"./projects"} className="w-full">
          <button className="bg-primary dark:bg-secondary w-full h-24 shadow-blur-10 text-contrast h4 rounded-md">
            PROJETOS
          </button>
        </Link>
      </div>
      <div className="w-full h-full p-2  overflow-scroll flex flex-wrap gap-6">
        {projects.map((p) => {
          return <ProjectComponent project={p} key={p.id} />;
        })}
      </div>
    </div>
  );
};
