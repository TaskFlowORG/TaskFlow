"use client";

import { useContext, useEffect, useState } from "react";
import { CenterModal } from "../Modal";
import { Task, User, OtherUser } from "@/models";

import { userService } from "@/services";
import { ProjectContext } from "@/contexts/ContextProject";

import { TaskModalContent } from "./TaskModalContent";

type isOpenBro = {
  isOpen: boolean;
  setIsOpen: (boolean: boolean) => void;
  task: Task;
  user: User;
};

export const TaskModal = ({ setIsOpen, isOpen, task, user }: isOpenBro) => {

  return (
    <CenterModal
      stylesTailwind={"w-[1306px]  shadow-blur-10 p-12"}
      condition={isOpen}
      setCondition={() => {
        setIsOpen(false);
      }}
    >
      <TaskModalContent
        task={task}
        user={user}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isInModal={true}
      />
    </CenterModal>
  );
};
