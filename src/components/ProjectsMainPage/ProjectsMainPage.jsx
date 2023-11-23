"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Project } from "../Project";

export const ProjectsMainPage = () => {

  const [projects, setProjects] = useState([])

  useEffect(() => {
    //Consumir api
    setProjects([
      {
        id: 1,
        name: "Projeto A",
        description: "Descrição do Projeto A",
        groups:[{id:1, image:"/next.svg"}],
        percent:75
      }, {
        id: 2,
        name: "Projeto A",
        description: "Descrição do Projeto A",
        groups:[ {id:1, image:"/next.svg"},{id:2, image:"/next.svg"}, {id:3, image:"/next.svg"}],
        percent:75
      }, {
        id: 3,
        name: "Projeto A",
        description: "Descrição do Projeto A",
        groups:[],
        percent:75
      }, {
        id: 4,
        name: "Projeto A",
        description: "Descrição do Projeto A",
        groups:[],
        percent:75

      }, {
        id: 5,
        name: "Projeto A",
        description: "Descrição do Projeto A",
        groups:[],
        percent:75

      }, {
        id: 6,
        name: "Projeto A",
        description: "Descrição do Projeto A",
        groups:[],
        percent:75

      }, , {
        id: 7,
        name: "Projeto A",
        description: "Descrição do Projeto A",
        groups:[],
        percent:75

      }, , {
        id: 8,
        name: "Projeto A",
        description: "Descrição do Projeto A",
        groups:[],
        percent:75
      }
    ])
  }, [])

  return (
    <div className="w-2/3 lg:w-1/3 flex flex-col gap-5 h-[70vh]">
      <div className="w-full flex justify-center h-min p-2">
        <Link href={"./projects"} className="w-full">
          <button className="bg-primary w-full h-24 shadow-blur-10 text-white h4 rounded-md">
            PROJETOS
          </button>
        </Link>
      </div>
      <div className="w-full h-full p-2  overflow-scroll flex flex-wrap gap-6">
        {projects.map(p => {
          return <Project project={p} key={p.id} />
        })}
      </div>

    </div>
  )
}