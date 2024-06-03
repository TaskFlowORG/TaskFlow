import { LocalModal } from "@/components/Modal";
import { ImageObj } from "@/components/Obj/components/ImageObj";
import { OtherUserComponent } from "@/components/OtherUser";
import { ProjectContext } from "@/contexts";
import { UserContext } from "@/contexts/UserContext";
import { archiveToSrc } from "@/functions";
import { useAsyncThrow } from "@/hooks/useAsyncThrow";
import { Archive, OtherUser, Project, User } from "@/models";
import { groupService, userService } from "@/services";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { MouseEvent, useContext, useEffect, useState } from "react";
import { set } from "react-hook-form";

export const FeaturedUser = () => {
  const { project } = useContext(ProjectContext);
  const [users, setUsers] = useState<Array<OtherUser | User>>([]);
  const asyncThrow = useAsyncThrow();
  const { user } = useContext(UserContext);
  useEffect(() => {
    (async () => {
      if (!project || !user) return;
      const users = await userService.findAll().catch(asyncThrow);
      if (!users) return;
      const filtered = users.filter(
        (user) =>
          user.permissions.find(
            (permission) => permission.project.id === project.id
          ) != undefined
      );
      filtered.push(project.owner);
      const groups = await groupService.findGroupsByAProject(project.id);
      for (let group of groups) {
        users.push(await userService.findByUsername(group.ownerUsername));
      }
      // setUsers([...list])
      const finalList = users.filter((user, index) => {
        let indexL = users.findLastIndex((userL) => userL.id == user.id);
        return indexL == index;
      });
      setUsers([...finalList.sort((a, b) => a.points - b.points)]);
    })();
  }, [project, user]);
  const { t } = useTranslation();

  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<OtherUser | null>(
    new OtherUser(
      0,
      "jonatas",
      "",
      "",
      new Archive(0, "jpg", "pic", new Uint8Array()),
      "",
      "",
      "",
      0
    )
  );

  const openUser = (e: MouseEvent<HTMLDivElement>, user: OtherUser) => {
    setX(e.clientX);
    setY(e.clientY);
    setSelectedUser(user);
    setIsOpened(!isOpened);
  };

  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);

  return (
    <div className=" h-64 md:h-[58%] w-full shadow-blur-10 rounded-md p-4">
      <h5 className=" font-alata text-h5 h-8 text-primary dark:text-secondary">
        {t("featured-user")}
      </h5>
      <span className="w-full h-8 flex justify-between border-b-[1px] border-back-grey">
        <p className="text-p font-montserrat ">{t("name")}</p>
        <p className="text-p font-montserrat ">{t("points")}</p>
      </span>
      <div className="overflow-y-scroll none-scrollbar max-h-full  gap-1 pt-1 h-full w-full flex flex-col">
        {users.length === 0 ? (
          <p className="w-full h-full text-p font-montserrat flex justify-center text-center items-center pb-16">
            {t("no-featured-users")}
          </p>
        ) : (
          users.map((user, index) => (
            <div
              key={index}
              onClick={(e) => openUser(e, user)}
              className="w-full cursor-pointer hover:brightness-95 relative bg-white dark:bg-modal-grey flex justify-between text-primary dark:text-secondary"
            >
              <span className="flex gap-2 ">
                <div className="w-8 h-8 rounded-full relative overflow-clip bg-zinc-400">
                  <ImageObj obj={user} />
                </div>
                <p
                  className="w-40 truncate h-full items-center flex text-p font-montserrat"
                  title={user.name + " " + user.surname}
                >
                  {user.name + " " + user.surname}
                </p>
              </span>
              <div className="font-alata h-full flex items-center justify-end text-p">
                {user.points ?? 0}
              </div>
            </div>
          ))
        )}
        <LocalModal
          z="z-[60]"
          x={x}
          y={y}
          condition={isOpened}
          setCondition={setIsOpened}
        >
          <OtherUserComponent user={selectedUser!} />
        </LocalModal>
      </div>
    </div>
  );
};
