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
    <div className="w-min flex flex-col gap-5 h-full">
      <div className="w-min h-min p-2">
        <Link href={"./projects"}>
          <button className="bg-primary w-80 h-24 text-white h4 rounded-md">
            PROJETOS
          </button>
        </Link>
      </div>
      <div className="w-min h-[60vh] p-2 overflow-scroll flex flex-wrap gap-6">
        {projects.map(p => {
          return <Project project={p} key={p.id} />
        })}
      </div>

    </div>
  )
}