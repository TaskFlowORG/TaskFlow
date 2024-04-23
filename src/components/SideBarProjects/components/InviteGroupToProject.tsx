import { LocalModal } from "@/components/Modal";
import { ProjectContext } from "@/contexts";
import { SimpleGroup } from "@/models/user/group/SimpleGroup";
import { groupService, projectService } from "@/services";
import { useContext, useEffect, useState } from "react";
interface Props {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}

export const InviteGroupToProject = ({
  openModal,
  setOpenModal,
}: Props) => {
  const [groupsGlobal, setGroupsGlobal] = useState<SimpleGroup[]>([]);
  const { project } = useContext(ProjectContext);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const globalGroups = await groupService.findAll();
      const alreadyInvitedGroups = await groupService.findGroupsByAProject(project!.id);
        const availableGroups = globalGroups.filter((group) => !alreadyInvitedGroups.some((invitedGroup) => invitedGroup.id === group.id));
      setGroupsGlobal(availableGroups);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const inviteToProject = (group: SimpleGroup) => {
    if (!project) return;
    setOpenModal(false);
    projectService.inviteGroup(project.id, group);
  };

  return (
    <LocalModal condition={openModal} setCondition={setOpenModal} bottom>
      <div className="w-40 h-52 rounded-md p-2 overflow-y-auto bg-white dark:bg-modal-grey">
        {groupsGlobal.length > 0 ? (
          groupsGlobal.map((group, index) => (
            <button
              key={index}
              className="w-full rounded-md h-12 shadow-blur-10"
              onClick={() => inviteToProject(group)}
            >
              <p>{group.name}</p>
            </button>
          ))
        ) : (
          <p>Não há grupos disponíveis</p>
        )}
      </div>
    </LocalModal>
  );
};
