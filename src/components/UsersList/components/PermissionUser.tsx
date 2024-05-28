"use client";
import { useTheme } from "next-themes";
import { MouseEvent, useContext, useEffect, useState } from "react"
import { GroupOptions } from "./GroupOptions"
import { permissionService, userService } from "@/services";
import { Group, OtherUser, Permission, Project, User } from "@/models";
import { PermissionComponent } from "./UPermissionComponent";
import { LocalModal } from "@/components/Modal";
import { OtherUserComponent } from "@/components/OtherUser";
import { UserContext } from "@/contexts/UserContext";
import { useAsyncThrow } from "@/hooks/useAsyncThrow";
import Image from "next/image";

interface Props {
  group: Group;
  showUser: OtherUser;
  project?: Project;
  setGroup: (group: Group) => void;

}

export const PermissionUser = ({ group, showUser, project, setGroup }: Props) => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const { user } = useContext(UserContext);
  const { theme } = useTheme();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const asynThrow = useAsyncThrow();

  useEffect(() => {
    fetchData();
  }, [group]);

  const fetchData = async () => {
    
    if (project) {
      const fetchedPermissions = await permissionService.findAll(project.id).catch(asynThrow);
      if (fetchedPermissions)
        setPermissions(fetchedPermissions);
    }
  };
  const openUser = (e: MouseEvent<HTMLDivElement>) => {
    setX(e.clientX);
    setY(e.clientY);
    setIsOpened(!isOpened);
  };

  const userIcon = theme === "dark" ? <Image width={24} height={24} src="/img/whiteIconUser.svg" alt="User" /> : <Image width={24} height={24}  src="/img/darkIconUser.svg" alt="User" />;

  const fullName = `${showUser.name} ${showUser.surname}`;

  let displayFullName = ""
  if (project != null) {
    displayFullName = fullName.length > 7 ? `${fullName.slice(0, 7)}...` : fullName;
  } else {
    displayFullName = fullName.length > 15 ? `${fullName.slice(0, 15)}...` : fullName;
  }

  return (
    <div className="">
      <div className="border rounded-md relative border-primary px-4 bg-[#FCFCFC] dark:bg-[#3C3C3C] dark:border-secondary h-10 md:h-12 lg:h-12 flex items-center justify-between">

        {
          user?.id === group.owner.id && user?.id !== showUser.id ? (
            <button className="flex justify-end" onClick={() => openModal ? setOpenModal(false) : setOpenModal(true)}>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="3" height="20" viewBox="0 0 5 22" fill="currentColor" className="text-primary dark:text-secondary stroke-none">
                  <path d="M0.00366211 10.7705C0.00366211 11.4667 0.267055 12.1344 0.735896 12.6267C1.20474 13.1189 1.84062 13.3955 2.50366 13.3955C3.1667 13.3955 3.80259 13.1189 4.27143 12.6267C4.74027 12.1344 5.00366 11.4667 5.00366 10.7705C5.00366 10.0743 4.74027 9.40664 4.27143 8.91435C3.80259 8.42207 3.1667 8.14551 2.50366 8.14551C1.84062 8.14551 1.20474 8.42207 0.735896 8.91435C0.267055 9.40664 0.00366211 10.0743 0.00366211 10.7705ZM0.00366211 2.89551C0.00366211 3.5917 0.267055 4.25938 0.735896 4.75166C1.20474 5.24395 1.84062 5.52051 2.50366 5.52051C3.1667 5.52051 3.80259 5.24395 4.27143 4.75166C4.74027 4.25938 5.00366 3.5917 5.00366 2.89551C5.00366 2.19931 4.74027 1.53164 4.27143 1.03935C3.80259 0.547069 3.1667 0.270508 2.50366 0.270508C1.84062 0.270508 1.20474 0.547069 0.735896 1.03935C0.267055 1.53164 0.00366211 2.19931 0.00366211 2.89551ZM0.00366211 18.6455C0.00366211 19.3417 0.267055 20.0094 0.735896 20.5017C1.20474 20.9939 1.84062 21.2705 2.50366 21.2705C3.1667 21.2705 3.80259 20.9939 4.27143 20.5017C4.74027 20.0094 5.00366 19.3417 5.00366 18.6455C5.00366 17.9493 4.74027 17.2816 4.27143 16.7894C3.80259 16.2971 3.1667 16.0205 2.50366 16.0205C1.84062 16.0205 1.20474 16.2971 0.735896 16.7894C0.267055 17.2816 0.00366211 17.9493 0.00366211 18.6455Z"
                  />
                </svg>
              </div>
            </button>
          ) : (
            ""
          )
        }

        <div className="flex gap-6 w-full ml-2" onClick={(e) => openUser(e)}>
          <button>{userIcon}</button>
          <p className="whitespace-nowrap text-p truncate font-montserrat dark:text-[#FCFCFC] text-black">{displayFullName}</p>
        </div>

        <div className="text-primary dark:text-secondary w-36 flex justify-between ">
          {
            project?.id != null && (
              <p className={showUser.id === group.owner.id ? 'hidden lg:flex md:flex justify-end' : 'hidden lg:flex md:flex'}>|</p>

            )
          }

          {project?.id != null && (
            <div className="flex md:justify-end relative">
              <PermissionComponent permissions={permissions} group={group} showUser={showUser} project={project} />
            </div>
          )}
        </div>
      </div>

      <GroupOptions isOpen={openModal} group={group} showUser={showUser} setGroup={setGroup} />

      <LocalModal
        z="z-[60]"
        x={x}
        y={y}
        condition={isOpened}
        setCondition={setIsOpened}
      >
        <OtherUserComponent user={showUser!} />
      </LocalModal>
    </div>
  );
};
