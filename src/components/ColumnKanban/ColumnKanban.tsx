"use client";

import { RoundedCard } from "@/components/RoundedCard/RoundedCard";
import { useContext, useEffect, useState } from "react";
import { getListData } from "@/services/http/api";
import { verify } from "crypto";
import { CardContent } from "../CardContent";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { FilteredProperty } from "@/types/FilteredProperty";
import { Option, Task, TaskOrdered, TaskValue, TypeOfProperty } from "@/models";

import { useTheme } from "next-themes";
import { FilterContext } from "@/utils/FilterlistContext";

interface Props {
  color?: string;
  option?: Option;
  propertyId?: number;
  tasks: TaskOrdered[];
  verify?: boolean;
  input?: string;
}

export const ColumnKanban = ({
  option,
  tasks,
  input,
}: Props) => {
  const { theme } = useTheme();
  const { filterProp, setFilterProp } = useContext(FilterContext)
  const multiOptionTypes: TypeOfProperty[] = [
    TypeOfProperty.TAG,
    TypeOfProperty.CHECKBOX,
  ];
  const optionTypes: TypeOfProperty[] = [
    ...multiOptionTypes,
    TypeOfProperty.SELECT,
    TypeOfProperty.RADIO,
  ];

  function findPropertyInTask(item: TaskOrdered, prop: FilteredProperty) {
    return item.task.properties.find(
      (property) => property.property.id == prop.id
    )!;
  }
  return (
    <div
      className="w-min min-w-[360px]  pb-4 h-full lg:max-h-[650px]   flex flex-col  lg:flex-col gap-4"
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
        <h4 className="h4 whitespace-nowrap text-black dark:text-white ">
          {option?.name ?? "Não marcadas"}
        </h4>
      </div>
        <Droppable droppableId={`${option?.id}`} key={`${option?.id}`}>
          {(provided, snapshot) => {
            return (
              <div className="none-scrollbar h-full flex lg:flex-col  lg:overflow-y-auto"
                ref={provided.innerRef}
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
                {...provided.droppableProps}
              >
                {tasks.map((item, index) => {
                  if (
                    item.task?.name
                      ?.toLowerCase()
                      .includes(input?.toLowerCase()!) ||
                    input?.toLowerCase() == ""
                  ) {
                    let render = false;
                    let counter = 0;
                    filterProp.map((prop) => {

                      const propertyInTask = findPropertyInTask(item, prop);
                      if (
                        multiOptionTypes.includes(propertyInTask?.property.type)
                      ) {
                        let localRender = false;
                        prop.value.forEach((value: any) => {
                          propertyInTask.value.value.forEach(
                            (option: Option) => {
                              if (option.name == value) {
                                render = true;
                                localRender = true;
                                return;
                              }
                            }
                          );
                        });
                        if (localRender) {
                          counter++;
                        }
                      } else if (
                        optionTypes.includes(propertyInTask?.property.type)
                      ) {
                        const option: Option = propertyInTask.value.value;
                        if (option?.name == prop.value) {
                          render = true;
                          counter++;
                        }
                      } else {
                        if (
                          propertyInTask?.value?.value
                            ?.toLowerCase()
                            .includes(prop.value.toLowerCase())
                        ) {
                          render = true;
                          counter++;
                        }
                      }
                    });
                    if (
                      (render && counter == filterProp.length) ||
                      filterProp.length == 0
                    ) {
                      return (
                        <Draggable
                          draggableId={`${item.id}-${option?.id}`}
                          key={`${item.id}${option?.id}`}
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
                    }
                  }
                })}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
    </div>
  );
};
