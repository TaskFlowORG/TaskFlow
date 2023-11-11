"use client";

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
        groups:[{image:"/next.svg"}],
        percent:75
      }, {
        id: 2,
        name: "Projeto A",
        description: "Descrição do Projeto A",
        groups:[ {image:"/next.svg"},{image:"/next.svg"}, {image:"/next.svg"}],
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
    <div className="w-min flex flex-col gap-5">
      <div className="w-min h-min p-2">
        <button className="bg-pink w-80 h-24 text-white h4 rounded-md">
          PROJETOS
        </button>
      </div>
      <div className="flex flex-col scroll-smooth gap-5 scroll w-min relative overflow-y-scroll p-2 h-[50vh]">
        {projects.map(p => {
          return <Project project={p} key={p.id} />
        })}
      </div>

    </div>
  )
}