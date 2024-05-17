import { useEffect, useState } from "react"
import { GroupAccess } from "../GroupAccess/GroupAccess";
import { OtherUser, Project } from "@/models";
import { groupService } from "@/services";
import { SimpleGroup } from "@/models/user/group/SimpleGroup";
import { useAsyncThrow } from "@/hooks/useAsyncThrow";


interface Props {
    user: OtherUser;
    project?: Project;
    groupId?: number;
}


export const Description = ({ user, project, groupId } : Props) => {
    const [groups, setGroups] = useState<SimpleGroup[]>([]);
    const asynThrow = useAsyncThrow();


    useEffect(() => {
        const getList = async () => {
                const fetchedGroups = await groupService.findGroupsByUser().catch(asynThrow);
                if (fetchedGroups)
                setGroups(fetchedGroups);

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



