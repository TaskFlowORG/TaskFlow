"use client";

import { useEffect, useState } from "react";
import { ProgressBar } from "../ProgressBar";
import { Obj } from "../Obj";
import { set } from "zod";
import { Group, Project, ProjectSimple } from "@/models";
import Link from "next/link";
import { projectService } from "@/services";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { SimpleGroup } from "@/models/user/group/SimpleGroup";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { archiveToSrc } from "@/functions";
interface Props {
  project: ProjectSimple;
  user: string;
}
export const ProjectComponent = ({ project, user }: Props) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const router = useRouter();
  const src = archiveToSrc(project.picture);
  const { t } = useTranslation();

  return (
    <Link
      href={`/${user}/${project.id}`}
      className={`w-full flex flex-col shadow-blur-10 gap-8 static z-0 bg-white 
    dark:bg-modal-grey p-6 rounded-md h-min `}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex gap-2 w-full h-min items-center">
        {/* Imagem do Projeto */}
        <div className="w-min">
          <div className="bg-zinc-200 rounded-md w-12 h-12 relative">
            <Image  src={src} fill alt="Image Project" />
          </div>
        </div>
        <div className="w-full h-full flex flex-col justify-center whitespace-nowrap overflow-hidden">
          <h4
            className="w-full h-min font-alata text-p text-modal-grey dark:text-white text-ellipsis overflow-hidden"
            style={!project.name ? { opacity: 0.5 } : {}}
          >
            {project.name ?? t("withoutname")}
          </h4>
          <p
            className="w-full h-min font-montserrat text-mn text-modal-grey dark:text-white truncate"
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
      resposiveClasses=""
      functionObj={(o) =>
                  router.push(
                    `/${user}/${project.id}/group/${(o as SimpleGroup).id}`
                  )
                }
                mawWidth="w-full"
                isGroup
              ></Obj>
            </div>
            <div className="mt-12 min-h-[5rem] min-w-[5rem]">
              <ProgressBar percent={project.progress} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Link>
  );
};
