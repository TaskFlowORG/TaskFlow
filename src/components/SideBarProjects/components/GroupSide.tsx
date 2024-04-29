import { Group, GroupPost, Permission, Project, TypePermission } from "@/models";
import { Navigate } from "./Navigate";
import { ProjectInformations } from "./ProjectInformations";
import { useState, useEffect, useContext } from "react";
import { GroupComponent } from "./GroupComponent";
import { useRouter } from "next/navigation";
import { groupService, permissionService, projectService } from "@/services";
import { SimpleGroup } from "@/models/user/group/SimpleGroup";
import { LocalModal } from "@/components/Modal";
import { ProjectContext } from "@/contexts";
import { InviteGroupToProject } from "./InviteGroupToProject";
import { useDebounce } from "react-use";




interface Props {
    project?: Project;
    user: string;
    setModalGroups: (value: boolean) => void;
    global: string;
}




export const GroupSide = ({ project, user, setModalGroups, global }: Props) => {
    const [groups, setGroups] = useState<SimpleGroup[]>([]);
    const router = useRouter();
    const [groupsGlobal, setGroupsGlobal] = useState<SimpleGroup[]>([]);
    const [openModal, setOpenModal] = useState<boolean>(false);  

    useEffect(() => {
      fetchData();
    }, []);
 
    const fetchData = async () => {
      try {
        const globalGroups = await groupService.findAll();
        setGroupsGlobal(globalGroups);
        let fetchedGroups: SimpleGroup[];
 
        if (global === "userGroups") {
          fetchedGroups = await groupService.findGroupsByUser();
          setGroups(fetchedGroups);
        } else if (global === "projectGroups") {
          fetchedGroups = await groupService.findGroupsByAProject(project!.id);
          setGroups(fetchedGroups);
        }
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };
 
    const addNewGroup = async () => {
      let groupPermission: Permission[] = [];
 
      const newGroup = new GroupPost(
        "Nome do grupo",
        "Descrição do Grupo",
         groupPermission,
         []
      );
      await groupService.insert(newGroup);
      fetchData();
    };

    const sendRoute = (groupId : number) =>{
       if(project?.id != undefined){
        console.log("sem projeto");
        router.push(
            "/" + user + "/group/" + groupId)
       } else{
        console.log("com projeto");
        
        router.push(
            "/" + user + "/" + project?.id + "/group/" + groupId)
       }
    }


    return (
       <>
          <Navigate modalPages={false} setCondition={setModalGroups} />
          <ProjectInformations project={project} />
   
          <div className="flex flex-col w-72 justify-center items-center h-4/6">
            <div className="flex items-start h-[95%] w-full overflow-y-scroll none-scrollbar ">
              <div className="flex flex-col items-start max-w-full h-min w-full">
                <div className="max-w-full h-min w-full pt-2">
                  {Array.isArray(groups) &&
                    groups.map((group, index) => (
                      <div
                        key={index}
                        className="w-full h-min py-2 relative border-b-2 flex flex-col border-primary-opacity
                                     dark:border-secondary-opacity bg-white dark:bg-modal-grey cursor-pointer hover:brightness-95 dark:hover:brightness-110"
                      >
                        <button
                          onClick={() => router.push(
                            "/" + user + "/" + project?.id + "/group/" + group.id)
                            
                          }
                        >
                          <GroupComponent
                            user={user}
                            group={group}
                          />
                        </button>
                      </div>
                    ))}
                </div>
                </div>
        </div>
        <div className="h-min relative w-full flex justify-center pt-4 ">
          <InviteGroupToProject setOpenModal={setOpenModal} openModal={openModal} />
          <button
            className="h-10 w-64 rounded-lg bg-primary dark:bg-secondary text-white font-alata hover:brightness-110"
            onClick={() =>
              global == "userGroups" ? addNewGroup() : setOpenModal(true)
            }
          >
            {" "}
            Adicionar Grupo
          </button>
        </div>
      </div>
      </>
  );
};

