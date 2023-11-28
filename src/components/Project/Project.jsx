'use client';

import { useEffect, useState } from "react";
import { ProgressBar } from "../ProgressBar";
import { Groups } from "../Groups";

export const Project = ({ project, col }) => {

  const [isHovering, setIsHovering] = useState(false);
  const style = { gridColumn: col }

  return (
    <div className={"min-w-full flex flex-col shadow-blur-10 gap-16 bg-white duration-0 p-6 rounded-md overflow-clip h-24 hover:h-80 hover:row-span-3 hover:duration-300"}
      style={style} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
      <div className="flex gap-2 w-full">
        {/* Imagem do Projeto */}
        <div className="w-min">
          <div className="bg-zinc-200 rounded-md w-12 h-12">
          </div>
        </div>
        <div className="w-full whitespace-nowrap overflow-hidden">
          <h4 className="w-11/12 font-alata text-[16px] text-modal-grey text-ellipsis overflow-hidden">{project.name}</h4>
          <p className="w-11/12 font-montserrat text-[12px] text-modal-grey text-ellipsis overflow-hidden">{project.description}</p>
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
