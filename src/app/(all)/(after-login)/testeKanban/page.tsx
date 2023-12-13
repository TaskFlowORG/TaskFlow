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

export default function otherTry() {
  const [s, setTasks] = useState<Task[]>([]);
  const [defaultTasks, setDefaultTasks] = useState<any[]>([]);
  const [id, setId] = useState<Number>(0);
  const [options, setOptions] = useState<Option[]>([]);
  const [paged, setPage] = useState<Page | null>(null);

  useEffect(() => {
    (async () => {
      const pg: CommonPage = await getPage("page", 1);
      console.log(pg);
      setTasks(pg.tasks);
      setOptions((pg.propertyOrdering as Select).options);
      setId(pg.propertyOrdering.id);
      setPage(pg);
    })();
  }, []);

  const onDragEnd = (result: any, columns: any[], setColumns: any) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const finded: Task | undefined = s.find((task) => {
        return task.id == result.draggableId;
      });
      console.log(finded);
      //       let property:TaskValue | undefined = finded?.properties?.find((property)=>{
      // return property.id == id
      //       })

      if (finded?.properties != undefined)
        for (let property of finded?.properties) {
          if (property.property.id == id) {
            let propa: UniOptionValued = property?.value as UniOptionValued;

            propa.uniOption = new Option(2, "Doing", "#FF0000");
            postt(finded)
          }
        }

      async function postt(task: Task) {
        await putData("task", task);
      }

      console.log(finded);

      //   putData("task", finded)
      //   const sourceColumn: Column = columns.find(
      //     (column) => column.id == source.droppableId
      //   );
      //   const destColumn: Column = columns.find(
      //     (column) => column.id == destination.droppableId
      //   );

      //   const sourceItems = [...sourceColumn.items];
      //   const destItems = [...destColumn.items];
      //   const [removed] = sourceItems.splice(source.index, 1);
      //   destItems.splice(destination.index, 0, removed);
      //   sourceColumn.items = sourceItems;
      //   destColumn.items = destItems;
      //   columns[columns.indexOf(sourceColumn)] = sourceColumn;
      //   columns[columns.indexOf(destColumn)] = destColumn;
      //   setColumns([...columns]);
    } else {
      //   const column: Column = columns.find(
      //     (column) => column.id == source.droppableId
      //   );
      //   const copiedItems = [...column.items];
      //   const [removed] = copiedItems.splice(source.index, 1);
      //   copiedItems.splice(destination.index, 0, removed);
      //   column.items = copiedItems;
      //   columns[columns.indexOf(column)] = column;
      //   setColumns([...columns]);
    }
  };

  return (
    <div className="w-full h-full mt-[5em] flex flex-col dark:bg-back-grey">
      <div className="flex gap-5 items-end pb-16 justify-center    h-max">
        <h1
          className="h1 text-primary whitespace-nowrap dark:text-white"
          onClick={() => console.log(paged)}
        >
          {paged?.name}
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
                tasks={s.filter((task) => {
                  return task.properties?.some((property) => {
                    // console.log(option,(property.value as UniOptionValued).value?.name )
                    return (
                      property.property.id == id &&
                      (property.value as UniOptionValued).value.id == option?.id
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
        </div>
      </DragDropContext>
    </div>
  );
}
