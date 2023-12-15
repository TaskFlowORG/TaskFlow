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
import { MultiOptionValued } from "@/model/values/MultiOptionValued";
import { ArchiveValued } from "@/model/values/ArchiveValued";
import { NumberValued } from "@/model/values/NumberValued";
import { TimeValued } from "@/model/values/TimeValued";

export default function otherTry() {
  const [tasks, setTasks] = useState<TaskCanvas[]>([]);
  const [defaultTasks, setDefaultTasks] = useState<any[]>([]);
  const [id, setId] = useState<number>(0);
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
  }, [tasks]);

  function compararPorIndice(a: TaskCanvas, b: TaskCanvas) {
    return a.indexAtColumn - b.indexAtColumn;
  }

  function indiceNaColuna(tasks: TaskCanvas[]) {
    tasks.sort(compararPorIndice);
    return tasks;
  }

  function verificaProperties(task: TaskCanvas) {
    const properties: TaskValue[] = task?.task?.properties ?? [];
    properties.map((property) => {
      console.log(property.property.type == TypeOfProperty.SELECT);
      switch (property.property.type) {
        case TypeOfProperty.TEXT:
          return ((property.value as TextValued).text = property.value.value);
        case TypeOfProperty.SELECT:
        case TypeOfProperty.RADIO:
          console.log("Entrei uma hora");
          return ((property.value as UniOptionValued).uniOption =
            property.value.value);
        case (TypeOfProperty.CHECKBOX, TypeOfProperty.USER, TypeOfProperty.TAG):
          return ((property.value as MultiOptionValued).multiOptions =
            property.value.value);
        case TypeOfProperty.ARCHIVE:
          return ((property.value as ArchiveValued).archive =
            property.value.value);
        case TypeOfProperty.NUMBER:
          return ((property.value as NumberValued).number =
            property.value.value);
        case TypeOfProperty.TIME:
          return ((property.value as TimeValued).time = property.value.value);
        case TypeOfProperty.DATE:
          return ((property.value as TimeValued).time = property.value.value);
        case TypeOfProperty.PROGRESS:
          return ((property.value as NumberValued).number =
            property.value.value);
      }
    });
  }

  const onDragEnd = (result: any, columns: any[], setColumns: any) => {
    tasks.map((task) => verificaProperties(task));
    console.log(result);
    if (!result.destination) return;
    const { source, destination } = result;

    const optionOrder = options.find((option) => {
      return option.id == destination.droppableId;
    });

    const draggedTask: TaskCanvas | undefined = tasks.find((task) => {
      return task?.id == result.draggableId;
    });

    const property: TaskValue | undefined = draggedTask?.task?.properties?.find(
      (property) => {
        return property.property.id == id;
      }
    );

    // const taskPushed = tasks.find((task) => {
    //   return task?.task?.id == destination.index;
    // });


    const valueOfTaskInOrderingProperty: UniOptionValued =
    property?.value as UniOptionValued;

    valueOfTaskInOrderingProperty.uniOption = optionOrder ?? null;
    valueOfTaskInOrderingProperty.value = optionOrder ?? null;
    console.log(destination.index)
    
    if (draggedTask) {
      const updateTask = async() => {
        await putData("task", draggedTask.task);
      }
      updateTask();
    }
    const updatePage = async ()=> {
      await putData(`page/${draggedTask?.task?.id}/${destination.index}/${destination.droppableId!=source.droppableId ? 1 : 0}`, page )
    }
    updatePage()

    };

  return (
    <div
      className="w-full h-full mt-[5em] flex flex-col dark:bg-back-grey"
      onClick={() => indiceNaColuna(tasks)}
    >
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
                tasks={indiceNaColuna(
                  tasks.filter((task) => {
                    return task?.task?.properties?.some((property) => {
                      // console.log(option,(property.value as UniOptionValued).value?.name )
                      return (
                        property.property.id == id &&
                        (property.value as UniOptionValued).value?.id ==
                          option?.id
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
