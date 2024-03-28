import { Group, GroupPost, Permission, Project, User } from "@/models";
import { Navigate } from "./Navigate";
import { ProjectInformations } from "./ProjectInformations";
import { useState, useEffect } from "react";
import { getData, getListData } from "@/services/http/api";
import { GroupComponent } from "./GroupComponent";
import { useRouter } from 'next/navigation';
import { groupService, permissionService, userService } from "@/services";
import { PermissionGet } from "@/models/project/permission/PermissionGetDTO";
import { UserGet } from "@/models/user/user/UserGetDTO";

interface Props {
    project: Project;
    user: string;
    setModalGroups: (value: boolean) => void;
}

export const GroupSide = ({ project, user, setModalGroups }: Props) => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [newGroup, setNewGroup] = useState<GroupPost>();
    const [owner, setOwner] = useState<UserGet>();
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedGroups = await getListData("project/" + project.id + "/groups");
                const fetchedUser = await userService.findByUsername("heloisa")
                setGroups(fetchedGroups);
                setOwner(fetchedUser)
            } catch (error) {
                console.error("Error fetching groups:", error);
            }
            console.log(groups)
        };

        fetchData();
    }, [project.id]);

    const addNewGroup = async () => {
        const name: string = "Nome do grupo";
        const description: string = "Descrição do grupo";

        try {
            const fetchedUser = await userService.findByUsername("heloisa");
            if (fetchedUser) {
                const newGroup = new GroupPost(name, description, [], fetchedUser, []);
                await groupService.insert(newGroup);
                // groups = [...groups, newGroup]
            } else {
                console.error("Owner não está definido!");
            }
        } catch (error) {
            console.error("Erro ao adicionar novo grupo:", error);
        }
    };


    return (
        <span className="flex flex-col max-h-screen gap-14 pt-[4.5rem] h-full p-4 bg-white dark:bg-modal-grey shadow-blur-10 w-96 px-16">
            <Navigate modalPages setCondition={setModalGroups} />
            <ProjectInformations project={project} />
            <div className="flex flex-col w-72 justify-center items-center h-4/6 gap-8">
                <div className="flex items-start h-[95%] w-full overflow-y-auto">
                    <div className="flex flex-col items-start max-w-full h-min w-full">
                        <button className="flex self-end shadowww cursor-pointer hover:bg-primary dark:hover:bg-secondary rounded-full w-7 h-7" onClick={() => addNewGroup()}>
                            <div className="flex text-primary dark:text-secondary hover:text-white dark:hover:text-white justify-center items-center font-alata text-xl text-[#F04A94] dark:text-[#F76858]" style={{ width: '100%', height: '100%' }}>+</div>
                        </button>

                        {Array.isArray(groups) && groups.map((group, index) => (
                            <div className="w-full h-min py-2 relative border-b-2 flex flex-col border-primary-opacity 
                                 dark:border-secondary-opacity bg-white dark:bg-modal-grey cursor-pointer hover:brightness-95 dark:hover:brightness-110">
                                <button onClick={() => router.push("/1/" + group.id + "/group")}>
                                    <GroupComponent group={group} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </span>
    );
};
