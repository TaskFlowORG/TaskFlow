import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { archiveToSrc } from "@/functions";
import { groupService, userService } from "@/services";
import { SimpleGroup } from "@/models/user/group/SimpleGroup";
import { useTranslation } from "react-i18next";
import { IconLogout } from "@/components/icons";
import { ProjectContext } from "@/contexts";
import { OtherUser } from "@/models";
import { UserContext } from "@/contexts/UserContext";

interface Props {
  user: string;
  group: SimpleGroup;
  setGroups: (groups: SimpleGroup[]) => void;
  groups: SimpleGroup[];
  global: string;
}

const useWindowSize = () => {
  const [size, setSize] = useState<"sm" | "md" | "lg" | null>(null);

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 640) {
        setSize("sm");
      } else if (window.innerWidth < 768) {
        setSize("md");
      } else {
        setSize("lg");
      }
    };

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
};

export const GroupComponent = ({
  user,
  group,
  setGroups,
  groups,
  global,
}: Props) => {
  const [showIcon, setShowIcon] = useState(false);
  const router = useRouter();
  const screenSize = useWindowSize();
  const[owner, setOwner] = useState<OtherUser>();
  const {user:userObj} = useContext(UserContext);

  useEffect(() => {
    (async()=> {
      const ownerTemp = await userService.findByUsername(group.ownerUsername);
      if(ownerTemp) setOwner(ownerTemp);
    })()
  }, [group])
  const { t } = useTranslation();

  const getDescription = () => {
    const len = screenSize === "sm" ? 10 : screenSize === "md" ? 13 : 15;
    return group?.description && group.description.length > len
      ? `${group.description.substring(0, len)}...`
      : group?.description;
  };

  const getName = () => {
    const len = screenSize === "sm" ? 8 : screenSize === "md" ? 8 : screenSize === "lg" ? 12 : 10;
    return group?.name && group.name.length > len
      ? `${group.name.substring(0, len)}...`
      : group?.name;
};


  const{project} = useContext(ProjectContext);

  const deleteGroup = async () => {
    if (global === "userGroups") {
      try {
        await groupService.delete(group.id);
        const updatedGroups = groups.filter((g) => g.id !== group.id);
        setGroups([...updatedGroups]);
        router.push("/" + user);
      } catch (error) {
        console.error("Error deleting the group:", error);
      }
    } else {
      //remove from project
      
      try {
        await groupService.removeOfPoject(group.id, project?.id);
        const updatedGroups = groups.filter((g) => g.id !== group.id);
        setGroups([...updatedGroups]);
        router.push("/" + user+"/"+project?.id);
      } catch (error) {
        console.error("Error deleting the group:", error);
      }
    }
  };

  const getOutGroup = async () => {
    try {
      await userService.getOutOfAGroup(group.id);
      const updatedGroups = groups.filter((g) => g.id !== group.id);
      setGroups([...updatedGroups]);
      router.push("/" + user);
    } catch (error) {
      console.error("Error getting out of the group:", error);
    }
  };

  const [src, setSrc] = useState<string>("/Assets/noImage.png");
  useEffect(() => {
    setSrc(archiveToSrc(group?.picture));
  }, [group]);

  return (
    <div
      className="flex flex-row w-full gap-2 justify-between"
      onMouseEnter={() => setShowIcon(true)}
      onMouseLeave={() => setShowIcon(false)}
    >
      <div className="flex flex-row items-center flex-grow">
        {screenSize != "sm" ? (
          <div className="relative rounded-full w-14 h-14 bg-zinc-300">
            <Image
              src={src}
              alt="Group Picture"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </div>
        ) : (
          ""
        )}
        <div className="flex flex-col ml-2">
          <div className="text-start text-p font-montserrat rounded-md">
            {getName() || t("withoutname")}
          </div>
          <div className="text-start text-p14 font-montserrat rounded-md">
            {getDescription() || t("withoutdescription")}
          </div>
        </div>
      </div>
      <div className="flex items-center pr-9 md:pr-2">
        {global === "userGroups" ? (
          showIcon && owner?.id == userObj?.id ? (
            <div onClick={(e)=> {e.stopPropagation(); deleteGroup()}}>
              <span className="h-8 w-8 rounded-lg bg-white dark:bg-modal-grey hover:brightness-95 flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="19"
                  viewBox="0 0 47 54"
                  fill="none"
                  className="text-primary dark:text-secondary stroke-current"
                >
                  <title>{t("delete-group")}</title>
                  <path
                    d="M42.6111 19.5L37.8453 47.865C37.6508 49.0234 37.0724 50.073 36.2117 50.8293C35.351 51.5856 34.263 52.0001 33.1392 52H13.8608C12.737 52.0001 11.649 51.5856 10.7883 50.8293C9.92758 50.073 9.34915 49.0234 9.15472 47.865L4.38889 19.5M45 12H31.5625M31.5625 12V7C31.5625 5.67392 31.0591 4.40215 30.1631 3.46447C29.2671 2.52678 28.0519 2 26.7847 2H20.2153C18.9481 2 17.7329 2.52678 16.8369 3.46447C15.9409 4.40215 15.4375 5.67392 15.4375 7V12M31.5625 12H15.4375M2 12H15.4375"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          ) : (
            showIcon && owner?.id != userObj?.id &&(
              <div onClick={(e)=> {e.stopPropagation(); getOutGroup()}}>
                <span className="h-8 w-8 rounded-lg bg-white dark:bg-modal-grey hover:brightness-95 flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 44 44"
                    fill="currentColor"
                    className="text-primary dark:text-secondary stroke-none"
                  >
                    <title>{t("leave-group")}</title>
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M19.5 0C16.6268 0 13.8713 1.14137 11.8397 3.17301C9.80803 5.20465 8.66667 7.96015 8.66667 10.8333C8.66667 13.7065 9.80803 16.462 11.8397 18.4937C13.8713 20.5253 16.6268 21.6667 19.5 21.6667C22.3732 21.6667 25.1287 20.5253 27.1603 18.4937C29.192 16.462 30.3333 13.7065 30.3333 10.8333C30.3333 7.96015 29.192 5.20465 27.1603 3.17301C25.1287 1.14137 22.3732 0 19.5 0ZM19.5 23.8333C14.3108 23.8333 9.5875 25.337 6.11433 27.456C4.381 28.5133 2.899 29.7613 1.82867 31.1177C0.775667 32.448 0 34.0448 0 35.75C0 37.5808 0.8905 39.0238 2.17317 40.053C3.3865 41.028 4.98767 41.6737 6.6885 42.1243C10.1075 43.0278 14.6705 43.3333 19.5 43.3333C19.9983 43.3333 20.4967 43.329 20.9842 43.3225C21.347 43.3175 21.7028 43.2215 22.0189 43.0432C22.335 42.8649 22.6012 42.61 22.7932 42.3021C22.9851 41.9941 23.0967 41.6428 23.1175 41.2805C23.1383 40.9182 23.0679 40.5565 22.9125 40.2285C22.0891 38.4902 21.6635 36.5902 21.6667 34.6667C21.6667 31.954 22.4965 29.4407 23.9135 27.3585C24.1241 27.0491 24.251 26.6904 24.2817 26.3173C24.3125 25.9443 24.2461 25.5696 24.089 25.2299C23.9319 24.8902 23.6894 24.5969 23.3853 24.3788C23.0812 24.1606 22.7257 24.0249 22.3535 23.985C21.4218 23.8853 20.4685 23.8333 19.5 23.8333ZM28.1667 32.5C27.592 32.5 27.0409 32.7283 26.6346 33.1346C26.2283 33.5409 26 34.092 26 34.6667C26 35.2413 26.2283 35.7924 26.6346 36.1987C27.0409 36.6051 27.592 36.8333 28.1667 36.8333H41.1667C41.7413 36.8333 42.2924 36.6051 42.6987 36.1987C43.1051 35.7924 43.3333 35.2413 43.3333 34.6667C43.3333 34.092 43.1051 33.5409 42.6987 33.1346C42.2924 32.7283 41.7413 32.5 41.1667 32.5H28.1667Z"
                    />
                  </svg>
                </span>
              </div>
            )
          )
        ) : (
          (owner?.id == userObj?.id || project?.owner.id == userObj?.id) && (
            <div onClick={(e)=> {e.stopPropagation(); deleteGroup()}}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="text-primary dark:text-secondary"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>{t("delete-group-project")}</title>
              <path
                d="M10 20C7.34784 20 4.8043 18.9464 2.92893 17.0711C1.05357 15.1957 0 12.6522 0 10C0 7.34784 1.05357 4.8043 2.92893 2.92893C4.8043 1.05357 7.34784 0 10 0C12.6522 0 15.1957 1.05357 17.0711 2.92893C18.9464 4.8043 20 7.34784 20 10C20 12.6522 18.9464 15.1957 17.0711 17.0711C15.1957 18.9464 12.6522 20 10 20ZM15 9H5V11H15V9Z"
              />
            </svg>
          </div>
          )

        
         
        )}
      </div>
    </div>
  );
};
