"use client"
import { ProjectContext } from "@/utils/ContextProject"
import { useContext } from "react"

export default function Dashboard({params}:{params:{project:number}})  {

    const {project} = useContext(ProjectContext)
    return (
        <div>
            <h1 className="mt-14">Dashboard</h1>
        </div>
    ) 
}