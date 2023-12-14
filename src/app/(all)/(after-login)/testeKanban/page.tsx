"use client";

import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { RoundedCard } from "@/components/RoundedCard";
import { ColumnKanban } from "@/components/ColumnKanban/ColumnKanban";
import { SearchBar } from "@/components/SearchBar";
import { useEffect } from "react";
import { getData, getListData, getPage, putData } from "@/services/http/api";
import { useState } from "react";
import { Page } from "@/model/pages/Page";
import { CommonPage } from "@/model/pages/CommonPage";
import { Select } from "@/model/Properties/Select";
import { Option } from "@/model/Properties/Option";
import { UniOptionValued } from "@/model/values/UniPotionValued";
import { Task } from "@/model/tasks/Task";
import { TaskValue } from "@/model/relations/TaskValue";
import { TypeOfProperty } from "@/model/enums/TypeOfProperty";
import { TextValued } from "@/model/values/TextValued";
import { TaskCanvas } from "@/model/relations/TaskCanvas";

export default function otherTry() {
  const [tasks, setTasks] = useState<TaskCanvas[]>([]);
  const [defaultTasks, setDefaultTasks] = useState<any[]>([]);
  const [id, setId] = useState<Number>(0);
  const [options, setOptions] = useState<Option[]>([]);
  const [page, setPage] = useState<Page | null>(null);

  useEffect(() => {
    (async () => {
      const pg: CommonPage = await getPage("page", 1);
      setTasks(pg.tasks);
      console.log(1);
      setOptions((pg.propertyOrdering as Select).options);
      setId(pg.propertyOrdering.id);
      setPage(pg);
      console.log();
    })();
  }, []);

  const onDragEnd = (result: any, columns: any[], setColumns: any) => {
    if (!result.destination) return;
    const { source, destination } = result;

    const optionOrder = options.find((option) => {
      return option.id == destination.droppableId;
    });

    const draggedTask: TaskCanvas | undefined = tasks.find((task) => {
      return task?.id == result.draggableId;
    });

    const copiedItems = [...tasks];

    const property: TaskValue | undefined = draggedTask?.task?.properties?.find(
      (property) => {
        return property.property.id == id;
      }
    );
    const valueOfTaskInOrderingProperty: UniOptionValued =
      property?.value as UniOptionValued;

    const properties: TaskValue[] =
      draggedTask?.task?.properties?.filter((property) => {
        return property.property?.type == TypeOfProperty.TEXT;
      }) ?? [];

    properties.map((property) => {
      return ((property.value as TextValued).text = property.value.value);
    });
    valueOfTaskInOrderingProperty.uniOption = optionOrder ?? null;
    valueOfTaskInOrderingProperty.value = optionOrder ?? null;
    if (draggedTask) {
      postt(draggedTask.task as Task);
    }

    async function postt(task: Task) {
      await putData("task", task);
    }

    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);

    // No corpo passa a page, de indice, primeiro a task, e depois indice que ela estará
    setTasks(copiedItems);
    const copiedColumns = [...options];
    setOptions(copiedColumns);
    console.log(tasks);
  };

  return (
    <div className="w-full h-full mt-[5em] flex flex-col dark:bg-back-grey">
      <div className="flex gap-5 items-end pb-16 justify-center    h-max">
        <h1
          className="h1 text-primary whitespace-nowrap dark:text-white"
          onClick={() => console.log(page)}
        >
          {page?.name}
        </h1>
        <div className=" flex items-center justify-center h-9 w-9 rounded-full shadowww mb-4 ">
          <p className="p text-primary text-4xl h-min w-min">+</p>
        </div>
        <SearchBar
          order={() => console.log("Ordering")}
          filter={() => console.log("Filtering")}
          search={() => console.log("Searching")}
        />
      </div>
      <DragDropContext onDragEnd={(result) => onDragEnd(result, [], null)}>
        <div className="flex gap-8 justify-center w-full">
          {options.map((option) => {
            return (
              <ColumnKanban
                key={`${option.id}`}
                tasks={tasks.filter((task) => {
                  return task?.task?.properties?.some((property) => {
                    // console.log(option,(property.value as UniOptionValued).value?.name )
                    return (
                      property.property.id == id &&
                      (property.value as UniOptionValued).value?.id ==
                        option?.id
                    );
                  });
                })}
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
              tasks={tasks.filter((task) => {
                return task?.task?.properties?.some((property) => {
                  // console.log(option,(property.value as UniOptionValued).value?.name )
                  return (
                    property.property.id == id &&
                    (property.value as UniOptionValued).value == null
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
  );
}
