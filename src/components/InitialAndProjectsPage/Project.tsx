"use client";

import { useEffect, useState } from "react";
import { ProgressBar } from "../ProgressBar";
import { Obj } from "../Obj";
import { getListData } from "@/services/http/api";
import { set } from "zod";
import { Group, Project } from "@/models";
import Link from "next/link";
import { projectService } from "@/services";
import { AnimatePresence, motion } from "framer-motion";
interface Props {
  project: Project;
  col?: number;
  user: string
}
export const ProjectComponent = ({ project, col, user }: Props) => {
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    // (async () => {
    //   const groupsPromise = []
    //   setGroups(groupsPromise)
    // })()
    // eslint-disable-next-line
  }, []);

  const generatePercentage = (): number => {
    const tasks = [];
    for (let page of project.pages) {
      for (let task of page.tasks) {
        tasks.push(task);
      }
    }
    const total = tasks.length;
    const done = tasks.filter((t) => t.task.completed === true).length
    return (done / total) * 100;
  };

  const [isHovering, setIsHovering] = useState<boolean>(false);
  const style: Object = { gridColumn: col };

  return (
    
    <Link href={`/${user}/${project.id}`} onClick={() => projectService.setVisualizedNow(project)} className={`w-full flex flex-col shadow-blur-10 gap-16 bg-white 
    dark:bg-modal-grey p-6 rounded-md h-min ` + (isHovering ? "row-span-3": "row-span-1") }
    style={style}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}>
      <div className="flex gap-2 w-full">
        {/* Imagem do Projeto */}
        <div className="w-min">
          <div className="bg-zinc-200 rounded-md w-12 h-12"></div>
        </div>
        <div className="w-full whitespace-nowrap overflow-hidden">
          <h4
            className="w-11/12 font-alata text-[16px] text-modal-grey dark:text-white text-ellipsis overflow-hidden"
            style={!project.name ? { opacity: 0.5 } : {}}
          >
            {project.name ?? "Sem Nome"}
          </h4>
          <p
            className="w-11/12 font-montserrat text-[12px] text-modal-grey dark:text-white text-ellipsis overflow-hidden"
            style={!project.description ? { opacity: 0.5 } : {}}
          >
            {project.description ?? "Sem descrição"}
          </p>
        </div>
      </div>
      <AnimatePresence initial={false} mode="wait">
      {isHovering && 
    <motion.div className="w-full justify-center overflow-clip flex flex-col gap-10"
        initial={{ height: 0 }}
        // 11rem
        animate={{ height: "150px" }}
         exit={{ transition:{delay:0.1, duration:0.1}, height: 0 }}
         transition={{ duration: 0.1 }}
        >
          <>
        <Obj objs={groups} max={4} functionObj={() => { }}></Obj>
        <ProgressBar percent={generatePercentage()} />
          </>
      </motion.div >
      }
      </AnimatePresence> 
    </Link>
  );
};
