"use client";

import { RoundedCard } from "@/components/RoundedCard/RoundedCard";
import { useEffect, useState } from "react";
import { getListData } from "@/services/http/api";
import { verify } from "crypto";
import { CardContent } from "../CardContent";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { FilteredProperty } from "@/types/FilteredProperty";
import { Option, Task, TaskOrdered, TaskValue, TypeOfProperty } from "@/models";

interface Props {
  color?: string;
  option?: Option;
  propertyId?: number;
  tasks: TaskOrdered[];
  verify?: boolean;
  input?: string;
  propsFiltered: FilteredProperty[];
}

export const ColumnKanban = ({
  option,
  tasks,
  input,
  propsFiltered = [],
}: Props) => {
  const multiOptionTypes: TypeOfProperty[] = [
    TypeOfProperty.TAG,
    TypeOfProperty.CHECKBOX,
  ];
  const optionTypes: TypeOfProperty[] = [
    ...multiOptionTypes,
    TypeOfProperty.SELECT,
    TypeOfProperty.RADIO,
  ];

  return (
    <div
      className="w-min min-w-[360px] pb-4 h-full flex lg:flex-col gap-4"
      key={`${option?.id}`}
    >
      <div className="flex gap-6 items-center">
        <div
          className={`w-2 h-2 rounded-full`}
          style={{ backgroundColor: (option?.color as string) ?? "#FCFCFC" }}
        ></div>
        <h4 className="h4 whitespace-nowrap text-black dark:text-white ">
          {option?.name ?? "Não marcadas"}
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
                    ? (option?.color as string) ?? "#FCFCFC"
                    : "none",
                }}
                {...provided.droppableProps}
              >
                {tasks.map((item, index) => {
                  if (
                    item.task?.name
                      ?.toLowerCase()
                      .includes(input?.toLowerCase() ?? "") ||
                    input?.toLowerCase() == "" ||
                    input?.toLowerCase() == undefined
                  ) {
                    let render = false;
                    let counter = 0;
                    console.log(propsFiltered);
                    propsFiltered.map((prop) => {
                      const propertyOnTask = item.task.properties.find(
                        (property) => property.property.id == prop.id
                      )!;
                      console.log(propertyOnTask);
                      if (
                        multiOptionTypes.includes(propertyOnTask?.property.type)
                      ) {
                        // console.log(prop.value)
                        let localRender = false;
                        prop.value.forEach((value: any) => {
                          console.log(propertyOnTask.value.value);
                          propertyOnTask.value.value.forEach(
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
                        optionTypes.includes(propertyOnTask?.property.type)
                      ) {
                        const option: Option = propertyOnTask.value.value;
                        console.log(propertyOnTask.value.value);
                        console.log(prop.value);
                        if (option.name == prop.value) {
                          render = true;
                          counter++;
                        }
                      } else {
                        if (propertyOnTask?.value?.value.contains(prop.value)) {
                          render = true;
                          counter++;
                        }
                      }
                    });

                    console.log(counter);

                    // let render = true;
                    // let important = false;
                    // propsFiltered.map((prop) => {
                    //   const propFilter = item.task?.properties.find(
                    //     (property) => property.property.id == prop.id
                    //   );
                    //   console.log("Property", JSON.stringify(propFilter));
                    //   console.log("Meu value nela", JSON.stringify(prop.value));

                    //   // console.log(item.task?.properties)
                    //   if (
                    //     !(propFilter?.value.value == prop.value) &&
                    //     !(render == false)
                    //   ) {
                    //     // console.log(prop.value,propFilter?.value.value)
                    //     // console.log(propFilter?.value.value)
                    //     render = false;
                    //     if (
                    //       [
                    //         TypeOfProperty.SELECT,
                    //         TypeOfProperty.CHECKBOX,
                    //         TypeOfProperty.TAG,
                    //         TypeOfProperty.RADIO,
                    //       ].includes(
                    //         propFilter?.property.type ?? TypeOfProperty.ARCHIVE
                    //       )
                    //     ) {
                    //       const opt: Option | Option[] =
                    //         propFilter?.value.value;
                    //       console.log(opt);
                    //       console.log(prop.value);

                    //       if (opt != null) {
                    //         console.log("To na primeria bagaça");
                    //         if (
                    //           [
                    //             TypeOfProperty.CHECKBOX,
                    //             TypeOfProperty.TAG,
                    //           ].includes(
                    //             propFilter?.property.type ??
                    //               TypeOfProperty.ARCHIVE
                    //           )
                    //         ) {
                    //           const arr = opt as Option[];
                    //           console.log(arr);
                    //           console.log("Em cima de mim são as options");
                    //           arr.map((item) => {
                    //             if (item.name == prop.value) {
                    //               render = true;
                    //             }
                    //           });
                    //         } else {
                    //           const option = opt as Option;
                    //           if (option.name) {
                    //             console.log("To aqui");
                    //             if (option.name == prop.value) {
                    //               console.log(
                    //                 "To aqui e setei true essa caralha"
                    //               );
                    //               render = true;
                    //             }
                    //           }
                    //         }
                    //       }
                    //     } else {
                    //       render = false;
                    //     }
                    //   }
                    // });

                    if (
                      (render && counter == propsFiltered.length) ||
                      propsFiltered.length == 0
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
                                <RoundedCard color={option?.color}>
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
    </div>
  );
};
