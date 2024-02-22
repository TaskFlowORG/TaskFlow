"use client"
import { useEffect, useState } from "react"
import { getListData } from "@/services/http/api";
import { GroupAccess } from "../GroupAccess/GroupAccess"

export const Description = ({ project, groupId = 1 }) => {
    const [groups, setGroups] = useState([])

    useEffect(() => {
        const getList = async () => {
            const fetchedGroups = await getListData("group");
            setGroups(fetchedGroups);
        }
        getList();
    }, []);

    return (
        <div className="flex h-max pr-72 lg:pr-28">
            {
                groups.map((g) => {
                    if (g.id === groupId) {
                        return <GroupAccess key={g.id} name={g.name} description={g.description} projectId={project.id} groupId={groupId} />
                    }
                })
            }
        </div>
    )
}