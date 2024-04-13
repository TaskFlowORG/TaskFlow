import { Group, GroupPost, Permission, PermissionPost, Project, TypePermission, User } from "@/models";
import { Navigate } from "./Navigate";
import { ProjectInformations } from "./ProjectInformations";
import { useState, useEffect } from "react";
import { getListData } from "@/services/http/api";
import { GroupComponent } from "./GroupComponent";
import { useRouter } from 'next/navigation';
import { groupService, permissionService, userService } from "@/services";
import { group } from "console";

interface Props {
    project: Project;
    user: string;
    setModalGroups: (value: boolean) => void;
    global: string
}


export const GroupSide = ({ project, user, setModalGroups, global }: Props) => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                let fetchedGroups : Group[];
                if (global == "groupsUser") {
                    fetchedGroups = await groupService.findGroupsByUser();
                    setGroups(fetchedGroups)
                } else if (global == "groupsProject") {
                     fetchedGroups = await groupService.findGroupsByAProject(project.id);
                     setGroups(fetchedGroups)
                }
                const fetchedPermissions = await permissionService.findAll(project.id);
                 const permissionArray: Permission[] = [];

                 fetchedPermissions.map(p => {
                     if (p.project.id === project.id) {
                         permissionArray.push(p);
                     }
                 });

                setPermissions(permissionArray);
               
            } catch (error) {
                console.error("Error fetching groups:", error);
            }
        };
        
        fetchData();
    }, [project.id]);


    const addNewGroup = async () => {
        const name: string = "Nome do grupo";
        const description: string = "Descrição do grupo";
        let groupPermission: Permission[] = [];
        
    
        try {
            let deleteCreatePermission = permissions.find(p => p.permission === TypePermission.UPDATE_DELETE_CREATE);
    
            if (deleteCreatePermission) {
                groupPermission.push(deleteCreatePermission);
            }
    
            const newGroup = new GroupPost(name, description, groupPermission, []);
        
            await groupService.insert(newGroup);
    
        } catch (error) {
            console.error("Erro ao adicionar novo grupo:", error);
        }
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
                                        
                                        <GroupComponent group={group} />
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
