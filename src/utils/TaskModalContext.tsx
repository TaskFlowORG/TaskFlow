"use client"
import { Project, Task, TaskOrdered } from "@/models";
import { createContext, useCallback, useContext, useState } from "react";

type TaskModalContext = {
    isOpen:boolean
    setIsOpen?: (boolean: boolean) => void;
    task?:Task;
    setSelectedTask?: (taskOrdered:Task) => void
}
// eslint-disable-next-line react-hooks/rules-of-hooks
export const TaskModalContext = createContext<TaskModalContext>({isOpen: false});