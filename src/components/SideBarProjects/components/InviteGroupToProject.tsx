import { LocalModal } from "@/components/Modal";
import { ProjectContext } from "@/contexts";
import { SimpleGroup } from "@/models/user/group/SimpleGroup";
import { groupService, projectService } from "@/services";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
interface Props {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}

export const InviteGroupToProject = ({openModal, setOpenModal}: Props) => {
  const [groupsGlobal, setGroupsGlobal] = useState<SimpleGroup[]>([]);
  const { project } = useContext(ProjectContext);
  const { t } = useTranslation();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const globalGroups = await groupService.findAll();
      console.log(globalGroups, "oq tá rolando?");

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
      <div className="w-52 h-52 rounded-md p-2 overflow-y-auto bg-white dark:bg-modal-grey">
        {groupsGlobal.length > 0 ? (
          groupsGlobal.map((group, index) => (
            <button
              key={index}
              className="w-full rounded-md h-12 shadow-blur-10"
              onClick={() => inviteToProject(group)}
            >
              <p>{group.name || t("withoutname")}</p>
            </button>
          ))
        ) : (
          <p className="text-center">{t("without-groups")}</p>
        )}
      </div>
    </LocalModal>
  );
};
