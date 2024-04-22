"use client";

import { useEffect, useState } from "react";
import { ProgressBar } from "../ProgressBar";
import { Obj } from "../Obj";
import { getListData } from "@/services/http/api";
import { set } from "zod";
import { Group, Project, ProjectSimple } from "@/models";
import Link from "next/link";
import { projectService } from "@/services";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { SimpleGroup } from "@/models/user/group/SimpleGroup";
import { useTranslation } from "next-i18next";
interface Props {
  project: ProjectSimple;
  user: string;
}
export const ProjectComponent = ({ project, user }: Props) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Link
      href={`/${user}/${project.id}`}
      className={`w-full flex flex-col shadow-blur-10 gap-8 static z-0 bg-white 
    dark:bg-modal-grey p-6 rounded-md h-min `}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex gap-2 w-full">
        {/* Imagem do Projeto */}
        <div className="w-min">
          <div className="bg-zinc-200 rounded-md w-12 h-12"></div>
        </div>
        <div className="w-full whitespace-nowrap overflow-hidden">
          <h4
            className="w-full font-alata text-[16px] text-modal-grey dark:text-white text-ellipsis overflow-hidden"
            style={!project.name ? { opacity: 0.5 } : {}}
          >
            {project.name ?? t("withoutname")}
          </h4>
          <p
            className="w-full font-montserrat text-[12px] text-modal-grey dark:text-white truncate"
            style={!project.description ? { opacity: 0.5 } : {}}
          >
            {project.description ?? t("withoutdescription")}
          </p>
        </div>
      </div>
      <AnimatePresence initial={false} mode="wait">
        {isHovering && (
          <motion.div
            className="w-full items-center relative overflow-y-clip flex flex-col"
            initial={{ height: 0 }}
            // 11rem
            animate={{ height: "150px" }}
            exit={{ transition: { delay: 0.1, duration: 0.1 }, height: 0 }}
            transition={{ duration: 0.1 }}
          >
            <div className=" absolute flex w-full h-10 z-10">
              <Obj
                objs={project.groups}
                max={4}
                functionObj={(o) =>
                  router.push(
                    `/${user}/${project.id}/group/${(o as SimpleGroup).id}`
                  )
                }
                mawWidth="w-full"
                isGroup
              ></Obj>
            </div>
            <div className="mt-12">
              <ProgressBar percent={project.progress} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Link>
  );
};
