import { LocalModal } from "@/components/Modal";
import { OtherUserComponent } from "@/components/OtherUser";
import { ProjectContext } from "@/contexts";
import { archiveToSrc } from "@/functions";
import { Archive, OtherUser, Project } from "@/models";
import { userService } from "@/services";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { MouseEvent, useContext, useEffect, useState } from "react";
import { set } from "react-hook-form";

export const FeaturedUser = () => {
  const { project } = useContext(ProjectContext);
  const [users, setUsers] = useState<OtherUser[]>([]);
  useEffect(() => {
    (async () => {
      if (!project) return;
      const users = await userService.findAll();
      setUsers(
        users
          .filter(
            (user) =>
              user.permissions.find(
                (permission) => permission.project.id === project.id
              ) != undefined
          )
          .sort((a, b) => a.points - b.points)
      );
    })();
  }, [project]);
  const { t } = useTranslation();

  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<OtherUser | null>(new OtherUser(
    0,
    "jonatas",
    "",
    "",
    new Archive(0, "jpg", "pic", new Uint8Array()),
    "",
    "",
    "",
    0,
  ));

  const openUser = (e: MouseEvent<HTMLDivElement>, user: OtherUser) => {
    setX(e.clientX);
    setY(e.clientY);
    setSelectedUser(user);
    setIsOpened(!isOpened);
  };

  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);

  return (
    <div className=" h-64 md:h-2/5 w-full shadow-blur-10 rounded-md p-4">
      <h5 className=" h5 h-8 text-primary dark:text-secondary">
        {t("featured-user")}
      </h5>
      <span className="w-full h-8 flex justify-between border-b-[1px] border-back-grey">
        <p className="p ">{t("name")}</p>
        <p className="p ">{t("points")}</p>
      </span>
      <div className="overflow-y-scroll none-scrollbar max-h-full  gap-1 pt-1 h-full w-full flex flex-col">
        {users.length === 0 ? (
          <p className="w-full h-full flex justify-center text-center items-center pb-16">
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
                  <Image
                    src={archiveToSrc(user.picture)}
                    alt="User Picture"
                    fill
                  />
                </div>
                <p
                  className="w-40 truncate h-full items-center flex"
                  title={user.name + " " + user.surname}
                >
                  {user.name + " " + user.surname}
                </p>
              </span>
              <div>{user.points ?? 0}</div>
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
