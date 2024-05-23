import { FilterContext } from "@/utils/FilterlistContext";
import { useState, useContext, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { Obj } from "../Obj";
import { ProjectContext } from "@/contexts";
import { groupService, projectService, userService } from "@/services";
import { Limited, OtherUser } from "@/models";
import { IconPlus } from "../icons/GeneralIcons/IconPlus";
import { Combobox } from "./Combobox/Combobox";
import { NeedPermission } from "../NeedPermission";
import { useIsDisabled } from "@/functions/modalTaskFunctions/isDisabled";

interface Props {
  id: number;
  name: string;
  value: string[];
  isInModal?: boolean;
  property: Limited;
}

export const UserFilter = ({
  id,
  name,
  value,
  isInModal = false,
  property,
}: Props) => {
  const [valued, setValued] = useState<string[]>([]);
  const { filterProp, setFilterProp } = useContext(FilterContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenRemove, setIsOpenRemove] = useState(false);
  const { project } = useContext(ProjectContext);
  const [users, setUsers] = useState<OtherUser[]>([]);
  const [actualCounter, setActualCounter] = useState(value?.length);

  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const style = twMerge(
    "flex gap-4 items-center border-b-[1px] relative  pb-2",
    isInModal ? " p-0 border-none pl-4" : " "
  );

  useEffect(() => {
    // setActualCounter(value.length)
    const findGroups = async () => {
      if (!project) return;
      let users = await userService.findAll();
      users = users.filter(
        (user) =>
          user.permissions.find(
            (permission) => permission.project.id === project.id
          ) != undefined
      );
      users.push(project.owner);
      const groups = await groupService.findGroupsByAProject(project.id);
      for (let group of groups) {
        users.push(await userService.findByUsername(group.ownerUsername));
      }
      // setUsers([...list])
      const finalList = users.filter((user, index) => {
        let indexL = users.findLastIndex((userL) => userL.id == user.id);
        return indexL == index;
      });
      setUsers([...finalList]);
    };
    findGroups();
    const prop = filterProp!.find((bah) => id == bah.id);
    if (prop) {
      setValued(prop.value ?? []);
    } else {
      setValued(value ?? []);
    }
  }, [value, setFilterProp, filterProp]);

  const isDisabled = useIsDisabled(isInModal, "update");

  return (
    <div className={style}>
      {!isInModal && <p className=" text-black dark:text-white">{name}:</p>}
      <div className="flex  justify-end">
        <div className="flex gap-4">
          <div className="z-50 relative">
            <Obj
              openUser
              resposiveClasses="hover:brightness-95"
              objs={valued
                ?.map((userD) => users.find((user) => user.username == userD)!)
                .filter((user) => user != null && user != undefined)}
              mawWidth="w-max"
              max={3}
              functionObj={() => {
                console.log("");
              }}
              isOtherUser
            />
          </div>

          <div className="relative">
            {isOpen && (
              <Combobox
                setOptionalCounter={(number: number) =>
                  setActualCounter(number)
                }
                optionalCounter={actualCounter}
                condition={isOpen}
                x={x}
                y={y}
                setCondition={setIsOpen}
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
                setOptionalCounter={(number: number) =>
                  setActualCounter(number)
                }
                x={x}
                y={y}
                optionalCounter={actualCounter}
                condition={isOpenRemove}
                setCondition={setIsOpenRemove}
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
            {!isDisabled && (
              <div className="flex gap-2">
                {(property.maximum == undefined ||
                  actualCounter < property.maximum) && (
                  <div
                    className="w-8 h-8 relative  bg-primary flex justify-center items-center dark:bg-secondary rounded-full "
                    onClick={(e) => {
                      setIsOpen(!isOpen);
                    }}
                  >
                    <div className="stroke-contrast rotate-45">
                      <IconPlus></IconPlus>
                    </div>
                  </div>
                )}
                {actualCounter != 0 && (
                  <div
                    className="w-8 h-8  bg-primary flex justify-center items-center dark:bg-secondary rounded-full "
                    onClick={() => setIsOpenRemove(!isOpenRemove)}
                  >
                    <div className=" rotate-90">
                      <p className="font-semibold leading-none text-[10px] text-contrast">
                        l
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};
