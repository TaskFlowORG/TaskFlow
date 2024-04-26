import { Group, GroupPost, Permission, Project, TypePermission } from "@/models";
import { Navigate } from "./Navigate";
import { ProjectInformations } from "./ProjectInformations";
import { useState, useEffect } from "react";
import { GroupComponent } from "./GroupComponent";
import { useRouter } from 'next/navigation';
import { groupService, permissionService } from "@/services";
import { SimpleGroup } from "@/models/user/group/SimpleGroup";

interface Props {
    project: Project;
    user: string;
    setModalGroups: (value: boolean) => void;
    global: string;
}


export const GroupSide = ({ project, user, setModalGroups, global }: Props) => {
    const [groups, setGroups] = useState<SimpleGroup[]>([]);
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const router = useRouter();

    useEffect(() => {
        fetchData();
    }, [project.id]);

    const fetchData = async () => {
        try {
            let fetchedGroups: SimpleGroup[];

            if (global === "userGroups") {
                fetchedGroups = await groupService.findGroupsByUser();
                setGroups(fetchedGroups)
            } else if (global === "projectGroups") {
                fetchedGroups = await groupService.findGroupsByAProject(project.id);
                setGroups(fetchedGroups)
            }
            const fetchedPermissions = await permissionService.findAll(project.id);
            setPermissions(fetchedPermissions);

        } catch (error) {
            console.error("Error fetching groups:", error);
        }
    };


    const addNewGroup = async () => {
        let groupPermission: Permission[] = [];

        let deleteCreatePermission = permissions.find(p => p.permission === TypePermission.UPDATE_DELETE_CREATE);

        if (deleteCreatePermission) {
            groupPermission.push(deleteCreatePermission);
        }

        const newGroup = new GroupPost("Nome do grupo", "Descrição do Grupo", groupPermission, []);

        await groupService.insert(newGroup);

        fetchData();
    };

    return (
        <span className="flex flex-col gap-14 max-h-screen pt-[4.5rem] h-full bg-white dark:bg-modal-grey shadow-blur-10 w-96 px-12">
            <Navigate modalPages setCondition={setModalGroups} />
            <ProjectInformations project={project} />

            <div className="flex flex-col w-72 justify-center items-center h-4/6">
                <div className="flex items-start h-[95%] w-full overflow-y-scroll none-scrollbar ">
                    <div className="flex flex-col items-start max-w-full h-min w-full">
                        <div className="max-w-full h-min w-full pt-2">
                            {Array.isArray(groups) && groups.map((group, index) => (

                                <div key={index} className="w-full h-min py-2 relative border-b-2 flex flex-col border-primary-opacity 
                                 dark:border-secondary-opacity bg-white dark:bg-modal-grey cursor-pointer hover:brightness-95 dark:hover:brightness-110">
                                    <button onClick={() => router.push("/" + user + "/" + project.id + "/group/" + group.id)}>
                                        <GroupComponent user={user} groupId={group} project={project} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="h-min relative w-full flex justify-center pt-4">
                    <button className="h-10 w-64 rounded-lg bg-primary dark:bg-secondary text-white font-alata hover:brightness-110" onClick={() => addNewGroup()}> Adicionar Grupo</button>
                </div>
            </div>
        </span>
    );
};