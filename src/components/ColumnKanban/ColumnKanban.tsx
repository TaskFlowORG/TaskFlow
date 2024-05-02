"use client";

import { RoundedCard } from "@/components/RoundedCard/RoundedCard";
import { useContext, useEffect, useState } from "react";
import { getListData } from "@/services/http/api";
import { verify } from "crypto";
import { CardContent } from "../CardContent";
import { 
  Direction,
  DragDropContext,
  Draggable,
  Droppable,
} from "@hello-pangea/dnd";
import { FilteredProperty } from "@/types/FilteredProperty";
import { Option, Task, TaskOrdered, TypeOfProperty } from "@/models";

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
}

export const ColumnKanban = ({ option, tasks, openModal, allTasks }: Props) => {
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
      className="w-min min-w-[360px] flex-grow pt-8   pb-4 h-full md:h-[650px] self-start   flex  flex-col gap-4"
      key={`${option?.id}`}
    >
      <div className="flex gap-6 items-center">
        <div
          className={`w-2 h-2 rounded-full`}
          style={{
            backgroundColor:
              (option?.color as string) ??
              (theme == "dark" ? "#FCFCFC" : "#3d3d3d"),
          }}
        ></div>
        <h4 className="text-h4 font-alata whitespace-nowrap text-black dark:text-white ">
          {option?.name ?? "Não marcadas"}
        </h4>
      </div>
      <Droppable
        direction={"vertical"}
        droppableId={`${option?.id}`}
        key={`${option?.id}`}
      >
        {(provided, snapshot) => {
          return (
            <div
              // Se tirar o overflow tudo funfa lg:overflow-y-auto
              // cuidado aqui com o overflow-auto
              className="none-scrollbar  max-w-[360px]"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <div
                className="none-scrollbar  flex min-h-[200px] w-[360px] h-max rounded-lg  flex-col"
                style={{
                  opacity: option?.name == "Não Marcadas" ? 0.75 : 1,
                  borderRadius: 16,
                  padding: 16,
                  gap: "24px",
                  background: snapshot.isDraggingOver
                    ? (option?.color as string) ??
                      (theme == "dark" ? "#FCFCFC" : "#3d3d3d")
                    : "none",
                }}
              >
                {columnTasks.map((item, index) => {
                  // if (showTask(item.task, context)) {
                    return (
                      <Draggable
                        draggableId={`${item.id}-${option?.id}`}
                        key={index}
                        isDragDisabled={!hasPermission}
                        index={allTasks.indexOf(item)}
                        // draggableId={`${item.id}`}
                        // index={index}
                        // key={index}
                      >
                        {(provided) => {
                          return (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...provided.draggableProps.style,
                              }}
                              id={item.task.id.toString()}
                              onClick={() => openModal!(item)}
                            >
                              <RoundedCard
                                color={
                                  option?.color ??
                                  (theme == "dark" ? "#FCFCFC" : "#3d3d3d")
                                }
                              >
                                <CardContent task={item.task as Task} />
                              </RoundedCard>
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
