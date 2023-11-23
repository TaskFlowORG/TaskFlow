'use client'

import { Project } from "@/components/Project"
import { SVGProjectsPage } from "@/components/Shapes"
import { useEffect, useState } from "react";

export default function InitialPage({ color }) {

    const [windowWidth, setWindowWidth] = useState(0);
    const [projects, setProjects] = useState([])

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
        <div className="h-full flex flex-col justify-center items-center w-screen">
            <SVGProjectsPage />
            <div className=" flex flex-col gap-6 items-center justify-center w-4/5 h-4/5">
                <div className="flex  items-center lg:items-start flex-col w-fit">
                    <h1 className="h1 stroke-text-white text-start px-6 text-white lg:stroke-text-white lg:text-primary">Projetos</h1>
                    <div className="w-fit h-[60vh] flex justify-center overflow-y-scroll">
                        <div className={" justify-start grid-flow-col grid p-6 gap-y-5 gap-x-12 h-min "}>
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