"use client"
import { useEffect, useState } from "react"
import { getData, getListData } from "@/services/http/api";
import { GroupAccess } from "../GroupAccess/GroupAccess"

export const Description = () => {
    const [groups, setGroups] = useState([])

    useEffect(() => {
        const getList = async () =>{

        }})

    return (
        <div className="flex gap-4 h-max pr-12">
            {
                groups && groups.map(g => (
                    <GroupAccess key={g.id} name={g.name} description={g.description} />
                ))
            }

        </div>
    )
}
