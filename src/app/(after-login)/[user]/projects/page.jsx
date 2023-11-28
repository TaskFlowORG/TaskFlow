'use client'

import { Project } from "@/components/Project"
import { SVGProjectsPage } from "@/components/Shapes"
import { useEffect, useState } from "react";

export default function InitialPage({ color }) {

    const [windowWidth, setWindowWidth] = useState(0);
    const [projects, setProjects] = useState([{
        id: 1,
        name: "Projeto A",
        description: "Descrição do Projeto A",
        groups: [{ id: 1, image: "/next.svg" }],
        percent: 75
    }, {
        id: 2,
        name: "Projeto B",
        description: "Descrição do Projeto A",
        groups: [{ id: 1, image: "/next.svg" }, { id: 2, image: "/next.svg" }, { id: 3, image: "/next.svg" }],
        percent: 75
    }, {
        id: 3,
        name: "Projeto C",
        description: "Descrição do Projeto A",
        groups: [],
        percent: 75
    }, {
        id: 4,
        name: "Projeto D",
        description: "Descrição do Projeto A",
        groups: [],
        percent: 75

    }, {
        id: 5,
        name: "Projeto E",
        description: "Descrição do Projeto A",
        groups: [],
        percent: 75

    }, {
        id: 6,
        name: "Projeto F",
        description: "Descrição do Projeto A",
        groups: [],
        percent: 75

    }, {
        id: 7,
        name: "Projeto G",
        description: "Descrição do Projeto A",
        groups: [],
        percent: 75

    }, {
        id: 8,
        name: "Projeto H",
        description: "Descrição do Projeto A",
        groups: [],
        percent: 75
    }, {
        id: 5,
        name: "Projeto I",
        description: "Descrição do Projeto A",
        groups: [],
        percent: 75

    }, {
        id: 6,
        name: "Projeto J",
        description: "Descrição do Projeto A",
        groups: [],
        percent: 75

    }, {
        id: 7,
        name: "Projeto K",
        description: "Descrição do Projeto A",
        groups: [],
        percent: 75

    }, {
        id: 8,
        name: "Projeto L",
        description: "Descrição do Projeto A",
        groups: [],
        percent: 75
    }, {
        id: 5,
        name: "Projeto M",
        description: "Descrição do Projeto A",
        groups: [],
        percent: 75

    }, {
        id: 6,
        name: "Projeto N",
        description: "Descrição do Projeto A",
        groups: [],
        percent: 75

    }, {
        id: 7,
        name: "Projeto O",
        description: "Descrição do Projeto A",
        groups: [],
        percent: 75

    }, {
        id: 8,
        name: "Projeto P",
        description: "Descrição do Projeto A",
        groups: [],
        percent: 75
    }])

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWindowWidth(window.innerWidth)
        })
        setWindowWidth(window.innerWidth)
    }, [])

    function getCol2Xl(index) {
        if (index % 3 == 0) {
            return 1
        } else if ((index + 1) % 3 == 0) {
            return 3
        }
        return 2
    }
    function getColLg(index) {
        if (index % 2 == 0) {
            return 1
        } else if ((index + 1) % 2 == 0) {
            return 2
        }
        return 1
    }
    function getCol(p) {
        const index = projects.indexOf(p)
        if (windowWidth > 1440) {
            return getCol2Xl(index)
        } else if (windowWidth > 1024) {
            return getColLg(index)
        }
        return 1
    }

    return (
        <div className="h-[99vh] flex flex-col justify-center items-center w-screen">
            <SVGProjectsPage />
            <div className=" flex flex-col gap-6 items-center justify-center w-full h-full">
                <div className="flex items-center flex-col w-full h-4/5">
                    <h1 className="h2 sm:text-[68px] sm:w-3/5 w-full stroke-text-white text-center px-6 lg:text-start text-white lg:stroke-text-white lg:text-primary">
                        Projetos
                    </h1>
                    <div className="w-full lg:w-3/5 h-[70vh] flex justify-center overflow-y-scroll">
                        <div className={"justify-start grid-flow-col grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 grid p-6 gap-y-5 gap-x-12 h-min w-fit sm:w-1/2 lg:w-full "}>
                            {projects.map(p => {
                                return <Project project={p} key={p.id} col={getCol(p)} />
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}