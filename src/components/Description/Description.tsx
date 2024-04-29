import { useEffect, useState } from "react"
import { getListData, getData } from "@/services/http/api";
import { GroupAccess } from "../GroupAccess/GroupAccess";
import { Group, OtherUser, Project } from "@/models";
import { groupService } from "@/services";
import { SimpleGroup } from "@/models/user/group/SimpleGroup";


interface Props {
    user: OtherUser;
    project: Project;
    groupId?: number;
}


export const Description = ({ user, project, groupId } : Props) => {
    const [groups, setGroups] = useState<SimpleGroup[]>([]);


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
                        return <GroupAccess key={g.id} project={project} groupId={groupId ?? 0} user={user}/>
                    }
                    return null;
                })
            }
        </div>
    )
}



