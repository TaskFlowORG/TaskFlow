import { Group, GroupPost, Permission, PermissionPost, Project, TypePermission, User } from "@/models";
import { Navigate } from "./Navigate";
import { ProjectInformations } from "./ProjectInformations";
import { useState, useEffect } from "react";
import { getData, getListData } from "@/services/http/api";
import { GroupComponent } from "./GroupComponent";
import { useRouter } from 'next/navigation';
import { groupService, permissionService, userService } from "@/services";

interface Props {
    project: Project;
    user: string;
    setModalGroups: (value: boolean) => void;
    global: boolean
}


export const GroupSide = ({ project, user, setModalGroups, global }: Props) => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [newGroup, setNewGroup] = useState<GroupPost>();
    const [owner, setOwner] = useState<User>();
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedUser = await userService.findLogged();
                setOwner(fetchedUser)

                let fetchedGroups : Group[];
                if (global == true) {
                    fetchedGroups = await groupService.findGroupsByUser();
                    setGroups(fetchedGroups)
                } else if (global == false) {
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

    const verOsGrupos = (): void => {
        groups.map(g => {
            console.log(g);
        });
    };

    const addNewGroup = async () => {
        const name: string = "Nome do grupo";
        const description: string = "Descrição do grupo";
        let groupPermission: Permission[] = [];
        let userList: User[] = []

        try {
             const fetchedUser = await userService.findLogged();
             if (!fetchedUser) {
                 console.error("Owner não está definido!");
                 return;
             }
             userList.push(fetchedUser)

            let deleteCreatePermission = permissions.find(p => p.permission === TypePermission.READ);

            if (!(deleteCreatePermission)) {
                const newPermission = new PermissionPost("Permissão", TypePermission.READ, project);
                await permissionService.insert(newPermission, project.id);
                if(deleteCreatePermission){
                    groupPermission.push(deleteCreatePermission);
                }
            }else {
                    groupPermission.push(deleteCreatePermission);
            }

            const newGroup = new GroupPost(name, description, permissions, userList);
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
                                    {()=> verOsGrupos()}
                                    <button onClick={() => router.push("/" + owner?.username + "/" + project.id + "/group/" + group.id)}>
                                        
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
