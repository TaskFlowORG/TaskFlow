import {
  Group,
  GroupPost,
  Permission,
  Project,
  TypePermission,
} from "@/models";
import { Navigate } from "./Navigate";
import { ProjectInformations } from "./ProjectInformations";
import { useState, useEffect, useContext } from "react";
import { GroupComponent } from "./GroupComponent";
import { useRouter } from "next/navigation";
import { groupService } from "@/services";
import { SimpleGroup } from "@/models/user/group/SimpleGroup";
import { InviteGroupToProject } from "./InviteGroupToProject";
import { useTranslation } from "react-i18next";
import { ErrorModal } from "@/components/ErrorModal";
import { UserContext } from "@/contexts/UserContext";

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
  const { t } = useTranslation();

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

    const newGroup = new GroupPost("", "", groupPermission, []);
    const group = await groupService.insert(newGroup);
    router.push("/" + user + "/group/" + group.id);
    fetchData();
  };

  const sendRoute = (groupId: number) => {
    if (project?.id != undefined && global == "projectGroups") {
      router.push("/" + user + "/"+project.id+"/group/" + groupId);
    } else {
      router.push("/" + user + "/group/" + groupId);
    }
  };
  const {user:userObj} = useContext(UserContext)

  const [error, setError] = useState(false);

  return (
    <>
      <div className="w-full h-max flex flex-col gap-10 pages">
        <Navigate modalPages={false} setCondition={setModalGroups} />
        {project != undefined && <ProjectInformations project={project} />}
      </div>

      <div className="flex items-start h-full w-full overflow-y-scroll none-scrollbar groups-side">
        <div className="flex flex-col items-start max-w-full h-min w-full">
          <div className="max-w-full h-min w-full pt-2">
            {Array.isArray(groups) &&
              groups.map((group, index) => (
                <div
                  key={index}
                  className="w-48 md:w-full h-min py-2 relative border-b-2 flex flex-col border-primary-opacity
                                     dark:border-secondary-opacity bg-white dark:bg-modal-grey cursor-pointer hover:brightness-95 dark:hover:brightness-110"
                >
                  <button onClick={() => sendRoute(group.id)}>
                    <GroupComponent
                      global={global}
                      user={user}
                      group={group}
                      setGroups={setGroups}
                      groups={groups}
                    />
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
      {global == "userGroups" ||
        (project != undefined &&
          global == "projectGroups" &&
          project.owner.id == userObj?.id) ? (
            <div className="h-min relative w-full flex justify-center pt-4 ">
              <InviteGroupToProject
                setError={setError}
                setOpenModal={setOpenModal}
                openModal={openModal}
              />
              <button
                className="h-10 create-group w-52 md:mr-0 md:w-64 rounded-lg bg-primary dark:bg-secondary text-contrast font-alata hover:brightness-110"
                onClick={() =>
                  global == "userGroups" ? addNewGroup() : setOpenModal(true)
                }
              >
                {" "}
                {t("addGroup")}
              </button>
            </div>):<> </>}
      <ErrorModal
        condition={error}
        setCondition={(bool: boolean) => {
          setError(bool);
          setOpenModal(bool);
        }}
        title={t("some-user-in-project")}
        message={t("some-user-in-project-desc")}
        fnOk={() => {
          setOpenModal(false);
          setError(false);
        }}
      />
    </>
  );
};
