'use client';

import { useState } from "react";
import { ProgressBar } from "./components/ProgressBar";
import { Groups } from "../Groups";

export const Project = ({ project }) => {

  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className={"w-80 flex flex-col shadow-blur-10 gap-16 bg-white duration-700 p-6 rounded-md overflow-clip relative " + (isHovering ? " h-80" : "h-24")}
      onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
      <div className="flex gap-2 w-full">
      {/* Imagem do Projeto */}
        <div className="bg-zinc-200 rounded-md w-12 h-12"></div>
        <div>
          <h4 className="font-alata text-[16px] text-modal-grey">{project.name}</h4>
          <p className="font-montserrat text-[12px] text-modal-grey">{project.description}</p>
        </div>
      </div>
      {isHovering &&
        <div className=" h-44 w-full justify-center flex flex-col gap-10">
          <Groups groups={project.groups} max={4}></Groups>
          <ProgressBar percent={project.percent} />
        </div>
      }
    </div>
  )
}
