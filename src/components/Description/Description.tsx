import { useEffect, useState } from "react"
import { getListData, getData } from "@/services/http/api";
import { GroupAccess } from "../GroupAccess/GroupAccess";
import { Group, Project } from "@/models";
import { groupService } from "@/services";

interface Props {
    user: string;
    project: Project;
    groupId?: number;
}

export const Description: React.FC<Props> = ({user, project, groupId}) => {
    const [groups, setGroups] = useState<Group[]>([]);

    useEffect(() => {
        const getList = async () => {
            try {
                const fetchedGroups = await groupService.findGroupsByUser();
                setGroups(fetchedGroups);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        getList();
    }, [groupId]);


    return (
        <div>
            {
                groups.map((g) => {
                    if (g.id === Number(groupId)) {
                        return <GroupAccess key={g.id} project={project} group={g} />
                    }
                    return null;
                })
            }
        </div>
    )
}
