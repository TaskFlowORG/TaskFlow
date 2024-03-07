/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { RoundedCard } from "@/components/RoundedCard";
import { ColumnKanban } from "@/components/ColumnKanban/ColumnKanban";
import { SearchBar } from "@/components/SearchBar";
import { useContext, useEffect } from "react";
import { getData, getListData, getPage, putData } from "@/services/http/api";
import { useState } from "react";
import { OrderInput } from "@/components/OrderInput/OrderInput";
import { FilterAdvancedInput } from "@/components/FilterAdvancedInput/FilterAdvancedInput";
import { FilteredProperty } from "@/types/FilteredProperty";
import { RegisterTaskModal } from "@/components/RegisterTaskModal";
import { pageService, taskService } from "@/services";
import {
  MultiOptionValued,
  Option,
  OrderedPage,
  Property,
  Select,
  TaskOrdered,
  TaskValue,
  TypeOfProperty,
  UniOptionValued,
} from "@/models";

import {FilterContext } from "@/utils/FilterlistContext"

export const Kanban = () => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState<TaskOrdered[]>([]);
  const [id, setId] = useState<number>(0);
  const [options, setOptions] = useState<Option[]>([]);
  const [modal, setModal] = useState(false);
  const [page, setPage] = useState<OrderedPage | null>(null);
   const [filter, setFilter] = useState<FilteredProperty[]>([]);
   const [list, setList] = useState<FilteredProperty>();

  useEffect(() => {
    (async () => {
      const pg: OrderedPage = await getPage("page", 1);
      setTasks(pg.tasks as TaskOrdered[]);
      setOptions((pg.propertyOrdering as Select).options);
      setId(pg.propertyOrdering.id);
      setPage(pg);
    })();
  });

  function separateNumbers(stringComHifen: string): [number, number] | null {
    const separatedNumbers = stringComHifen.split("-");
    if (separatedNumbers.length === 2) {
      const numberOne = parseInt(separatedNumbers[0], 10);
      const numberTwo = parseInt(separatedNumbers[1], 10);

      return [numberOne, numberTwo];
    } else {
      return null;
    }
  }

  function compareByIndex(a: TaskOrdered, b: TaskOrdered) {
    return a.indexAtColumn - b.indexAtColumn;
  }

  function indexAtColumn(tasks: TaskOrdered[]) {
    tasks.sort(compareByIndex);
    return tasks;
  }

  function findDragDestinationColumn(destination: any) {
    return options.find((option) => {
      return option.id == destination.droppableId;
    });
  }
  function findDraggedTask(taskId: number) {
    return tasks.find((task) => {
      return task.id == taskId;
    })!;
  }

  function findPropertyInTask(draggedTask: TaskOrdered) {
    return draggedTask?.task?.properties?.find((property) => {
      return property.property.id == id;
    })!;
  }

  function updateOptions(
    propertyInTask: TaskValue,
    optionId: number,
    optionDestination: Option
  ) {
    return propertyInTask.value.value.filter((value: any) => {
      return value.id != optionId && value.id != optionDestination?.id;
    });
  }

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;

    const separatedNumbers = separateNumbers(result.draggableId);
    const [numberOne, numberTwo] = separatedNumbers!;
    let taskId = numberOne;
    let optionId = numberTwo;

    const optionDestination = findDragDestinationColumn(destination);
    const draggedTask: TaskOrdered = findDraggedTask(taskId!);
    const propertyInTask: TaskValue = findPropertyInTask(draggedTask);
    const [list, setList] = useState<FilteredProperty | null>();

    if (
      [TypeOfProperty.CHECKBOX, TypeOfProperty.TAG].includes(
        propertyInTask.property.type
      )
    ) {
      const updatedOptions = updateOptions(
        propertyInTask,
        optionId,
        optionDestination!
      );
      propertyInTask.value.value =
        [...(updatedOptions ?? []), optionDestination] ?? null;
    } else {
      propertyInTask.value.value = optionDestination ?? null;
    }

    const updatePageAndTask = async () => {
      try {
        if (draggedTask) {
          console.log(page);
          console.log(draggedTask);
          await taskService.upDate(draggedTask.task);

          await pageService.updateIndexesKanban(
            page!,
            draggedTask?.task?.id,
            destination.index,
            destination.droppableId != source.droppableId ? 1 : 0
          );
        }
      } catch (e) {}
    };
    updatePageAndTask();
  };

  return (
    <FilterContext.Provider value={{filterProp:filter, setFilterProp: setFilter, list,setList:setList}}>
    <div className="w-full h-full mt-[5em] flex flex-col dark:bg-back-grey">
      <div className="flex gap-5 items-end pb-16 justify-center relative   h-max">
        <h1
          className="h1 text-primary whitespace-nowrap dark:text-white"
          onClick={() => console.log(page)}
        >
          {page?.name}
        </h1>
        <div
          className=" flex items-center justify-center h-9 w-9 rounded-full shadowww mb-4 cursor-pointer "
          onClick={() => setModal(true)}
        >
          <p className="p text-primary text-4xl h-min w-min">+</p>
        </div>
        <SearchBar
          order={() => console.log("Ordering")}
          filter={() => console.log("Filtering")}
          search={(textInput: string) => setInput(textInput)}
        >
          <OrderInput
            page={page as OrderedPage}
            orderingId={id}
            propertiesPage={page?.properties ?? []}
          ></OrderInput>


          <FilterAdvancedInput
            orderingId={page?.propertyOrdering.id}
            page={page}
            properties={page?.properties as Property[]}
          />


        </SearchBar>
      </div>
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        <div className="flex gap-8 justify-start pl-3 w-full opss max-w-[1560px] overflow-auto self-center">
          {options?.map((option) => {
            return (
              <ColumnKanban
                input={input}
                key={`${option.id}`}
                tasks={indexAtColumn(
                  tasks.filter((task) => {
                    return task?.task?.properties?.some((property) => {
                      return (
                        (property.property.id == id &&
                          (property.value as UniOptionValued).value?.id ==
                            option?.id) ||
                        (property.property.type === TypeOfProperty.CHECKBOX &&
                          (property.value as MultiOptionValued).value.find(
                            (value) => value.id == option.id
                          ))
                      );
                    });
                  })
                )}
                propertyId={id}
                color={option.color}
                option={option}
                verify={true}
              />
            );
          })}
          {
            <ColumnKanban
              key={0}
              input={input}
              tasks={tasks.filter((task) => {
                return task?.task?.properties?.some((property) => {
                  return (
                    (property.property.id == id &&
                      (property.value as UniOptionValued).value == null) ||
                    (property.property.id == id &&
                      [TypeOfProperty.CHECKBOX, TypeOfProperty.TAG].includes(
                        property.property.type
                      ) &&
                      (property.value as MultiOptionValued).value.length == 0)
                  );
                });
              })}
              propertyId={id}
              color="#767867"
              option={new Option(0, "Não Marcadas", "#767867")}
            />
          }
        </div>
      </DragDropContext>
    </div>
    </FilterContext.Provider>
  );
};
