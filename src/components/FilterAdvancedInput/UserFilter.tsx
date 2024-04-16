import { FilterContext } from "@/utils/FilterlistContext";
import { useState, useContext, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { Obj } from "../Obj";
import { ProjectContext } from "@/contexts";
import { groupService, projectService, userService } from "@/services";
import { OtherUser } from "@/models";
import { IconPlus } from "../icons/GeneralIcons/IconPlus";
import { Combobox } from "./Combobox/Combobox";

interface Props {
  id: number;
  name: string;
  value: string[];
  isInModal?: boolean;
}

export const UserFilter = ({ id, name, value, isInModal }: Props) => {
  const [valued, setValued] = useState<string[]>([]);
  const { filterProp, setFilterProp } = useContext(FilterContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenRemove, setIsOpenRemove] = useState(false);
  const { project } = useContext(ProjectContext);
  const [users, setUsers] = useState<OtherUser[]>([]);

  const style = twMerge(
    "flex gap-4 w-full items-center border-b-[1px] relative  pb-2",
    isInModal ? " p-0 border-none pl-4" : " "
  );

  useEffect(() => {
    if (project) {
      const findGroups = async () => {
        if (!project) return;
        const users = await userService.findAll();
        setUsers(
          users.filter(
            (user) =>
              user.permissions.find(
                (permission) => permission.project.id === project.id
              ) != undefined
          )
        );
      };
      findGroups();
    }
    const prop = filterProp.find((bah) => id == bah.id);
    console.log(prop);
    console.log(value);
    if (prop) {
      setValued(prop.value ?? []);
    } else {
      setValued(value ?? []);
    }
  }, [value, setFilterProp, filterProp]);

  return (
    <div className={style}>
      {!isInModal && <p className=" text-black dark:text-white">{name}:</p>}
      <div className="flex flex-1 justify-end">
        <div className="flex gap-4">
          <div className="z-50 relative">
            <Obj
              objs={valued
                ?.map((userD) => users.find((user) => user.username == userD)!)
                .filter((user) => user != null && user != undefined)}
              mawWidth="w-max"
              max={3}
              functionObj={(o) => console.log(o)}
              color
              isOtherUser
            />
          </div>

          <div className="relative">
            {isOpen && (
              <Combobox
                options={users}
                value={valued
                  ?.map(
                    (userD) => users.find((user) => user.username == userD)!
                  )
                  .filter((user) => user != null && user != undefined)}
                id={id}
              />
            )}

            {isOpenRemove && (
              <Combobox
              isRemoving={true}
                options={valued
                  ?.map(
                    (userD) => users.find((user) => user.username == userD)!
                  )
                  .filter((user) => user != null && user != undefined)}
                value={valued
                  ?.map(
                    (userD) => users.find((user) => user.username == userD)!
                  )
                  .filter((user) => user != null && user != undefined)}
                id={id}
              />
            )}
            <div className="flex gap-2">
              <div
                className="w-8 h-8  bg-primary flex justify-center items-center dark:bg-secondary rounded-full "
                onClick={() => setIsOpen(!isOpen)}
              >
                <div className="stroke-white rotate-45">
                  <IconPlus></IconPlus>
                </div>
              </div>
              <div
                className="w-8 h-8  bg-primary flex justify-center items-center dark:bg-secondary rounded-full "
                onClick={() => setIsOpenRemove(!isOpenRemove)}
              >
                <div className="stroke-white rotate-45">
                  <IconPlus></IconPlus>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};
