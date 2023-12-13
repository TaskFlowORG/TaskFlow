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

interface Props {
  color?: String;
  option?: Option;
  propertyId?: Number;
  tasks: Task[];
  verify?: boolean;
}

export const ColumnKanban = ({
  color,
  option,
  propertyId,
  tasks,
  verify,
}: Props) => {
  const [colorUse, setColorUse] = useState<String>("");
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
      className="w-min min-w-[360px] flex lg:flex-col gap-4   brightness-[0.95] hover:brightness-[1]"
      key={`${option?.id}`}
    >
      <div className="flex gap-6 items-center">
        <div
          className={`w-2 h-2 rounded-full`}
          style={{ backgroundColor: "FF0000" }}
        ></div>
        <h4 className="h4 whitespace-nowrap text-black dark:text-white ">
          {option?.name}
        </h4>
      </div>
      <div className="rounded-full">
        <Droppable droppableId={`${option?.id}`} key={`${option?.id}`}>
          {(provided, snapshot) => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  borderRadius: 8,
                  background: snapshot.isDraggingOver
                    ? "lightblue"
                    : "lightgrey",
                }}
              >
                {tasks.map((item, index) => {
                  return (
                    <Draggable
                      draggableId={`${item.id}`}
                      key={`${item.id}`}
                      index={index}
                    >
                      {(provided, snapshot) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <RoundedCard>
                              <CardContent task={item} />
                            </RoundedCard>
                          </div>
                        );
                      }}
                    </Draggable>
                  );
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
