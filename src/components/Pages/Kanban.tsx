/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { RoundedCard } from "@/components/RoundedCard";
import { ColumnKanban } from "@/components/ColumnKanban/ColumnKanban";
import { SearchBar, SearchInput } from "@/components/SearchBar";
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
  PropertyValue,
  TypeOfProperty,
  UniOptionValued,
} from "@/models";
import { TaskModalContext } from "@/utils/TaskModalContext";
import { FilterContext } from "@/utils/FilterlistContext";
import { TaskModal } from "../TaskModal";

import { User } from "@/models/user/user/User";
type UserLogged = {
  user:User
}


export const Kanban = ({ user }: UserLogged) => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState<TaskOrdered[]>([]);
  const [id, setId] = useState<number>(0);
  const [options, setOptions] = useState<Option[]>([]);
  const [page, setPage] = useState<OrderedPage | null>(null);
  const [filter, setFilter] = useState<FilteredProperty[]>([]);
  const [list, setList] = useState<FilteredProperty>();
  const [openedOrder, setOpenedOrder] = useState(false);

  useEffect(() => {
    (async () => {
      const pg: OrderedPage = await getPage("page", 4);
      setTasks(
        (pg.tasks as TaskOrdered[]).filter((task) => task.task.deleted == false)
      );
      setOptions((pg.propertyOrdering as Select).options);
      setId(pg.propertyOrdering.id);
      setPage(pg);
    })();
  });

  const { setSelectedTask, setIsOpen } = useContext(TaskModalContext);

  function openModal(task: TaskOrdered) {
    setIsOpen!(true);
    setSelectedTask!(task.task);
  }

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
    propertyInTask: PropertyValue,
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
    const propertyInTask: PropertyValue = findPropertyInTask(draggedTask);

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
        }
      } catch (e) {}
    };
    updatePageAndTask();
  };

  return (
    <FilterContext.Provider
      value={{
        filterProp: filter,
        setFilterProp: setFilter,
        list,
        setList: setList,
        input: input,
        setInput: setInput,
      }}
    >
      <div className="w-full h-full mt-[5em] flex flex-col dark:bg-back-grey">
        <div className=" flex gap-5 justify-between px-8 self-center w-full items-center  pb-4 max-w-[1560px] relative   h-max">
          <div className="flex gap-4 items-center">
            <h1
              className=" text-[32px] md:text-[40px] leading-none lg:text-[48px] 1.5xl:text-[56px] font-alata text-primary whitespace-nowrap    dark:text-white"
              onClick={() => console.log(page)}
            >
              {page?.name}
            </h1>
          </div>

          <SearchBar
            order
            filter
            search
            page={page as OrderedPage}
            properties={page?.properties as Property[]}
          >
          </SearchBar>
        </div>
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
          <div
            id="scrollKanban"
            // Da um salve nesse overflow-y-auto aí mano
            className="flex gap-8 justify-start bah flex-row pl-3 w-[90%] md:w-[750px] lg:w-[950px] xl:w-[1150px] 1.5xl:w-[1360px] 2xl:w-[1560px]  h-full mb-6 overflow-x-auto  self-center"
          >
            {options?.map((option) => {
              return (
                <ColumnKanban
                  input={input}
                  openModal={openModal}
                  key={`${option.id}`}
                  tasks={indexAtColumn(
                    tasks.filter((task) => {
                      return task?.task?.properties?.some((property) => {
                        return (
                          (property.property.id == id &&
                            (property.value as UniOptionValued).value?.id ==
                              option?.id) ||
                          ((property.property.type ===
                            TypeOfProperty.CHECKBOX ||
                            property.property.type === TypeOfProperty.TAG) &&
                            (property.value as MultiOptionValued).value.find(
                              (value:Option) => value.id == option.id
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
                openModal={openModal}
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
