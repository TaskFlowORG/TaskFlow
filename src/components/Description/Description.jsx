"use client"
import { useEffect, useState } from "react"
import { getListData, getData } from "@/services/http/api";
import { GroupAccess } from "../GroupAccess/GroupAccess"

export const Description = ({ project, groupId = 1 }) => {
    const [groups, setGroups] = useState([])
    const [group, setGroup] = useState({});

    useEffect(() => {
        const getList = async () => {
            const fetchedGroups = await getListData("group");
            setGroups(fetchedGroups);
            const fetchedGroup = await getData("group", groupId);
            setGroup(fetchedGroup);
        }
        getList();
    }, []);

    return (
        <div className="md:ml-20">
            {
                groups.map((g) => {
                    if (g.id === groupId) {
                        return <GroupAccess key={g.id} name={g.name} description={g.description} project={project} group={group} />
                    }
                })
            }
        </div>
    )
}