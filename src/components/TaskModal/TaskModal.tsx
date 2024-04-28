"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { CenterModal } from "../Modal";
import { Task, User, OtherUser } from "@/models";

import { taskService, userService } from "@/services";
import { ProjectContext } from "@/contexts/ContextProject";
import { FilterContext } from "@/utils/FilterlistContext";
import { FilteredProperty } from "@/types/FilteredProperty";
import { useTranslation } from "next-i18next";
import { PageContext } from "@/utils/pageContext";
import { PropertiesSide } from "./PropertiesSide";
import { CommentsSection } from "./CommentsAndHistoric/CommentsSection";
import { HeaderCommentAndHistoric } from "./CommentsAndHistoric/HeaderCommentAndHistoric";

type isOpenBro = {
  isOpen: boolean;
  setIsOpen: (boolean: boolean) => void;
  task: Task;
  user: User;
};

export const TaskModal = ({ setIsOpen, isOpen, task, user }: isOpenBro) => {
  const [filter, setFilter] = useState<FilteredProperty[]>([]);
  const [list, setList] = useState<FilteredProperty | null>();
  const [isInComments, setIsInComments] = useState(true);
  const [isInHistorics, setIsInHistorics] = useState(false);
  const [taskName, setTaskName] = useState("");
  const { project, setProject } = useContext(ProjectContext);
  const { pageId } = useContext(PageContext);
  const [users, setUsers] = useState<OtherUser[]>([]);
  const taskNameRef = useRef<any>(null);

  useEffect(() => {
    const findGroups = async () => {
      const users = await userService.findAll();
      setUsers(
        users.filter(
          (user) =>
            user.permissions.find(
              (permission) => permission.project.id === project?.id
            ) != undefined
        )
      );
    };
    findGroups();
  }, [project]);

  useEffect(() => {
    setList(undefined);
    setFilter([]);

    if (taskNameRef.current) {
      taskNameRef.current.focus();
      console.log(`FOQUEI PA CARALHO`);
    }
  }, [isOpen]);

  useEffect(() => {
    setTaskName(task?.name ?? "");
    if (task?.name) {
      let page = project?.pages.find((page) => pageId == page.id);
      if (page) {
        const taskP = page.tasks.find((taskP) => taskP.task.id == task.id);
        if (taskP) {
          taskP.task.name = task.name;
        }
      }

      setProject!({ ...project! });
    }
  }, [task?.name]);

  async function updateNameTask(e: any) {
    task.name = e.target.value;
    setTaskName(e.target.value);
    await taskService.upDate(task, project!.id);
  }

  const { t } = useTranslation();

  return (
    <CenterModal
      stylesTailwind={"w-[1306px]  shadow-blur-10 p-12"}
      condition={isOpen}
      setCondition={() => {
        setIsOpen(false);
      }}
    >
      <div className="flex gap-[102px]  w-full h-full ">
        <div className="flex flex-col gap-12 w-[453px]">
          <div className="flex flex-col gap-12 w-[453px]">
            <div className="flex gap-4 items-center">
              <input
                className="h3 whitespace-nowrap bg-white dark:bg-modal-grey w-full outline-none"
                ref={taskNameRef}
                placeholder={t("withoutname")}
                value={taskName}
                onChange={(e) => updateNameTask(e)}
              ></input>
            </div>
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

             { isInComments && <CommentsSection task={task} user={user} />}
            </div>
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
          <div className=" w-[2px] min-h-full bg-[#F2F2F2]"></div>
          <PropertiesSide
            filter={filter}
            setFilter={setFilter}
            setIsOpen={setIsOpen}
            setList={setList}
            task={task}
            users={users}
          ></PropertiesSide>
        </FilterContext.Provider>
      </div>
    </CenterModal>
  );
};
