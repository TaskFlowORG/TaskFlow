"use client";

import { RoundedCard } from "@/components/RoundedCard/RoundedCard";
import { useEffect, useState } from "react";
import { getListData } from "@/services/http/api";
import { verify } from "crypto";
import { CardContent } from "../CardContent";
import { Task } from "@/model/tasks/Task";
import { TaskValue } from "@/model/relations/TaskValue";
import { TextValued } from "@/model/values/TextValued";
import { TypeOfProperty } from "@/model/enums/TypeOfProperty";
import { UniOptionValued } from "@/model/values/UniPotionValued";
import { Option } from "@/model/Properties/Option";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { TaskCanvas } from "@/model/relations/TaskCanvas";

interface Props {
  color?: string;
  option?: Option;
  propertyId?: number;
  tasks: TaskCanvas[];
  verify?: boolean;
  input?: string;
}

export const ColumnKanban = ({
  color,
  option,
  propertyId,
  tasks,
  verify,
  input,
}: Props) => {
  const [colorUse, setColorUse] = useState<string>("");
  const [tasksColumn, setTasksColumn] = useState<Task[]>([]);

  // useEffect(() => {
  //   setColorUse(color ? color : "#FF0000");

  //   if (verify) {
  //     const filteredTasks: Task[] = tasks.filter((task) => {

  //       return task.properties?.some((property) => {
  //         // console.log(option,(property.value as UniOptionValued).value?.name )
  //         return property.property.id == propertyId && (property.value as UniOptionValued).value.id == option?.id;
  //       });
  //     });
  //     setTasksColumn(filteredTasks);
  //     console.log(filteredTasks)
  //   } else {
  //     setTasksColumn(tasks);
  //     console.log(tasks);
  //   }

  //   console.log(tasksColumn, verify);
  // }, [color, option, tasks]);
  return (
    <div
      className="w-min min-w-[360px] pb-4 h-full flex lg:flex-col gap-4"
      key={`${option?.id}`}
    >
      <div className="flex gap-6 items-center">
        <div
          className={`w-2 h-2 rounded-full`}
          style={{ backgroundColor: (option?.color as string) ?? "FF0000" }}
        ></div>
        <h4 className="h4 whitespace-nowrap text-black dark:text-white ">
          {option?.name}
        </h4>
      </div>
      <div className="rounded-full h-full">
        <Droppable droppableId={`${option?.id}`} key={`${option?.id}`}>
          {(provided, snapshot) => {
            return (
              <div
                ref={provided.innerRef}
                style={{
                  opacity: option?.name == "Não Marcadas" ? 0.75 : 1,
                  borderRadius: 16,
                  padding: 16,
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                  background: snapshot.isDraggingOver
                    ? (option?.color as string) ?? "#F04a94"
                    : "none",
                }}
                {...provided.droppableProps}
              >
                {tasks.map((item, index) => {
                  if (
                    item.task?.name
                      ?.toLowerCase()
                      .includes(input?.toLowerCase() ?? "") ||
                    item.task?.name == null 
                  ) {
                    return (
                      <Draggable
                        draggableId={`${item.id}`}
                        key={`${item.id}`}
                        index={item.indexAtColumn}
                      >
                        {(provided, snapshot) => {
                          return (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...provided.draggableProps.style,
                              }}
                            >
                              <RoundedCard color={option?.color}>
                                <CardContent task={item.task as Task} />
                              </RoundedCard>
                            </div>
                          );
                        }}
                      </Draggable>
                    );
                  }
                })}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </div>
    </div>
  );
};
