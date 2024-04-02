import { useEffect, useState } from "react"
import { getListData, getData } from "@/services/http/api";
import { GroupAccess } from "../GroupAccess/GroupAccess";

interface Props {
    project: any; // Altere para o tipo correto, se possível
    groupId?: number;
}

export const Description: React.FC<Props> = ({ project, groupId }) => {
    const [groups, setGroups] = useState<any[]>([]);
    const [group, setGroup] = useState<any>({});

    useEffect(() => {
        const getList = async () => {
            try {
                const fetchedGroups = await getListData("group");
                setGroups(fetchedGroups);
                const fetchedGroup = await getData("group", Number(groupId));
                setGroup(fetchedGroup);
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
                        return <GroupAccess key={g.id} name={g.name} description={g.description} project={project} group={g} />
                    }
                    return null;
                })
            }
        </div>
    )
}
