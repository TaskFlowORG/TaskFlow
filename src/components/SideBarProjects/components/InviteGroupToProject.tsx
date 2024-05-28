import { ErrorModal } from "@/components/ErrorModal";
import { LocalModal } from "@/components/Modal";
import { IconSearch } from "@/components/icons/OptionsFilter/Search";
import { ProjectContext } from "@/contexts";
import { SimpleGroup } from "@/models/user/group/SimpleGroup";
import { groupService, projectService } from "@/services";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
interface Props {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  setError: (value: boolean) => void;
}

export const InviteGroupToProject = ({ openModal, setOpenModal, setError }: Props) => {
  const [groupsGlobal, setGroupsGlobal] = useState<SimpleGroup[]>([]);
  const { project } = useContext(ProjectContext);
  const [filteredGroups, setFilteredGroups] = useState<SimpleGroup[]>([]);
  const { t } = useTranslation();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      if(!project) return;
      const globalGroups = await groupService.findAll();


      const alreadyInvitedGroups = await groupService.findGroupsByAProject(
        project!.id
      );
      const availableGroups = globalGroups.filter(
        (group) =>
          !alreadyInvitedGroups.some(
            (invitedGroup) => invitedGroup.id === group.id
          )
      );
      setGroupsGlobal(availableGroups);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const inviteToProject = (group: SimpleGroup) => {
    if (!project) return;
    projectService.inviteGroup(project.id, group).then(() => setOpenModal(false)).catch((error) => setError(true));
  };

  const [search, setSearch] = useState("");

  useEffect(() => {
    const filteredGroups = groupsGlobal.filter((group) =>
      group.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredGroups(filteredGroups);
  }, [search, groupsGlobal]);

  return (
    <>
    
    <LocalModal condition={openModal} setCondition={setOpenModal} bottom>
      <div className="w-52 h-min max-h-52 rounded-md p-2 flex bg-white dark:bg-modal-grey">
        {groupsGlobal.length > 0 ? (
          <span className="flex flex-col gap-2 h-full">
            <span className="relative">
            <span className="w-4 h-4 absolute right-1 top-2"><IconSearch classes="text-zinc-300"/></span>
            <input
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-md h-8 border-2 pr-6"
            />
            </span>
            <span className="border-t-2 rounded-md w-full max-h-36 none-scrollbar  flex flex-col overflow-y-auto ">
              {filteredGroups.map((group, index) => (
                <button
                  key={index}
                  className="flex-1 p-1 py-1 text-black options  dark:text-white border-2 border-t-0 focus:dark:border-zinc-400 focus:border-zinc-500 border-zinc-200 outline-none dark:border-zinc-600  text-sm"
                  onClick={() => inviteToProject(group)}
                >
                  <p>{group.name || t("withoutname")}</p>
                </button>
              ))}
            </span>
          </span>
        ) : (
          <p className="text-center h-full w-full flex justify-center items-center">
            {t("without-groups")}
          </p>
        )}
      </div>
    </LocalModal>
    </>
  );
};
