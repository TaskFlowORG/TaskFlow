"use client";

import { RoundedCard } from "@/components/RoundedCard/RoundedCard";
import { useContext, useEffect, useState } from "react";
import { verify } from "crypto";
import { CardContent } from "../CardContent";
import {
  Direction,
  DragDropContext,
  Draggable,
  Droppable,
} from "@hello-pangea/dnd";
import { FilteredProperty } from "@/types/FilteredProperty";
import { Option, Task, TaskOrdered, TypeOfProperty, User } from "@/models";

import { useTheme } from "next-themes";
import { FilterContext } from "@/utils/FilterlistContext";
import { showTask } from "../Pages/functions";
import { useHasPermission } from "@/hooks/useHasPermission";

interface Props {
  color?: string;
  option?: Option;
  propertyId?: number;
  tasks: TaskOrdered[];
  verify?: boolean;
  input?: string;
  openModal?: (task: TaskOrdered) => void;
  allTasks: TaskOrdered[];
  user: User;
}

export const ColumnKanban = ({
  option,
  tasks,
  openModal,
  allTasks,
  user,
}: Props) => {
  const { theme } = useTheme();
  const context = useContext(FilterContext);
  const { filterProp, setFilterProp, input } = context;
  const [columnTasks, setTasks] = useState<TaskOrdered[]>([]);

  useEffect(() => {
    setTasks(tasks.filter((task) => showTask(task.task, context)) ?? []);
  }, [tasks, setFilterProp, filterProp]);

  const hasPermission = useHasPermission("update");

  return (
    <div
      className="w-min flex-1  min-h-full h-full flex flex-col gap-4"
      key={`${option?.id}`}
    >
      <div className="flex gap-6 items-center h-min">
          <div
            className={`w-2 h-2 rounded-full`}
            style={{
              backgroundColor:
                (option?.color as string) ??
                (theme == "dark" ? "#FCFCFC" : "#3d3d3d"),
            }}
          ></div>
          <h4 className="text-h4 font-alata whitespace-nowrap h-min text-black dark:text-white ">
            {option?.name ?? "Não marcadas"}
          </h4>
        </div>
      <Droppable
        droppableId={`${option?.id}`}
        key={`${option?.id}`}
      >
        {(provided, snapshot) => {
          return (



            <div
              style={{
                opacity: option?.name == "Não Marcadas" ? 0.75 : 1,
                borderRadius: 16,
                padding: 16,
                background: snapshot.isDraggingOver
                ? (option?.color as string) ??
                (theme == "dark" ? "#FCFCFC" : "#3d3d3d")
                : "none",
                // overflowY: "scroll",
              }}
              ref={provided.innerRef} {...provided.droppableProps}
              className="flex w-[360px] min-w-min max-h-full h-fit rounded-lg flex-col"
             
            >
              <div className="flex  h-min w-full gap-6 flex-col" >
                {columnTasks.map((item, index) => {
                  // if (showTask(item.task, context)) {
                  return (
                    <Draggable
                      draggableId={`${item.id}-${option?.id}`}
                      key={index}
                      isDragDisabled={!hasPermission || item.task.completed}
                      index={allTasks.indexOf(item)}
                      // draggableId={`${item.id}`}
                      // index={index}
                      // key={index}
                    >
                      {(provided) => {
                        return (
                          <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                          }}
                          id={item.task.id?.toString()}
                          onClick={() => openModal!(item)}
                          className="select-none"
                          ref={provided.innerRef}
                          >
                            <RoundedCard
                              completed={item.task.completed}
                              waiting={item.task.waitingRevision}
                              color={
                                option?.color ??
                                (theme == "dark" ? "#FCFCFC" : "#3d3d3d")
                              }
                            >
                              <CardContent
                                user={user}
                                task={item.task as Task}
                              />
                            </RoundedCard>
                            {/* <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">{item.indexAtColumn}</span> */}
                          </div>
                        );
                      }}
                    </Draggable>
                  );
                  // }
                })}
            </div>

              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
};
