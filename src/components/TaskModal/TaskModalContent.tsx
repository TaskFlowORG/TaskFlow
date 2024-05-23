import { FilterContext } from "@/utils/FilterlistContext";
import { CommentsSection } from "./CommentsAndHistoric/CommentsSection";
import { HeaderCommentAndHistoric } from "./CommentsAndHistoric/HeaderCommentAndHistoric";
import { ProjectContext } from "@/contexts";
import { OtherUser, Project, Task, User } from "@/models";
import { groupService, userService } from "@/services";
import { FilteredProperty } from "@/types/FilteredProperty";
import { useState, useContext, useEffect } from "react";
import { TaskName } from "./TaskName";
import { HistoricSection } from "./CommentsAndHistoric/HistoricSection";
import { TesPropertiesSide } from "./PropertiesSide/TesPropertiesSide";
import { twMerge } from "tailwind-merge";
import { useAsyncThrow } from "@/hooks/useAsyncThrow";
import { TaskModalContext } from "@/utils/TaskModalContext";

type Props = {
  isOpen?: boolean;
  setIsOpen?: (boolean: boolean) => void;
  task: Task | Project;
  user: User;
  isInModal?: boolean;
};
export const TaskModalContent = ({
  isOpen,
  isInModal = false,
  setIsOpen,
  task,
  user,
}: Props) => {
  const [filter, setFilter] = useState<FilteredProperty[]>([]);
  const [list, setList] = useState<FilteredProperty | null>();
  const [isInComments, setIsInComments] = useState(true);
  const [isInHistorics, setIsInHistorics] = useState(false);
  const { project } = useContext(ProjectContext);
  const [users, setUsers] = useState<OtherUser[]>([]);
  const asynThrow = useAsyncThrow();



  useEffect(() => {
    setList(undefined);
    setFilter([]);
    
  }, [isOpen]);

  useEffect(() => {
    const findGroups = async () => {
      if (!project) return;
      let users = await userService.findAll();
      users = users.filter(
        (user) => user.permissions.find(
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

  }, [project]);

  const style = twMerge(
    "flex gap-8 lg:justify-between lg:gap-0 flex-col lg:flex-row pr-4 lg:pr-0  w-full max-h-full overflow-y-auto",
    isInModal ? "max-w-[1300px]" : ""
  );

  return (
    <div className={style}>
      <div className="flex flex-col gap-12 w-full lg:w-2/5">
        {isInModal && <TaskName task={task as Task} />}
        <div className="flex flex-col w-full gap-6">
          <div className="flex gap-0 w-full">
            <HeaderCommentAndHistoric
              title="comments"
              isSelected={isInComments}
              setIsInComments={() => {
                setIsInComments(!isInComments);
                setIsInHistorics(!isInHistorics);
              }}
            />
            <HeaderCommentAndHistoric
              title="historical"
              isSelected={isInHistorics}
              setIsInComments={() => {
                setIsInComments(!isInComments);
                setIsInHistorics(!isInHistorics);
              }}
            />
          </div>
          {isInComments && <CommentsSection task={task} user={user} />}
          {isInHistorics && (
            <HistoricSection isInModal={isInModal} user={user} task={task} />
          )}
        </div>
      </div>
      <FilterContext.Provider
        value={{
          filterProp: filter,
          setFilterProp: setFilter,
          list: list ?? undefined,
          setList: setList,
        }}
      >
        <div className="hidden lg:block w-[2px]  min-h-full bg-[#F2F2F2]"></div>
        <div className=" lg:hidden w-full min-h-[2px] bg-[#F2F2F2]"></div>

        <TesPropertiesSide
          filter={filter}
          setFilter={setFilter}
          setIsOpen={setIsOpen}
          setList={setList}
          task={task as Task}
          users={users}
        ></TesPropertiesSide>
      </FilterContext.Provider>
    </div>
  );
};